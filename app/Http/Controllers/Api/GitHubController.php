<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class GitHubController extends Controller
{
    /**
     * Proxy GitHub GraphQL API to fetch user stats, contribution calendar, and pinned repos.
     *
     * Data is cached for 1 hour to avoid rate limiting.
     *
     * GET /api/github/{username}
     */
    public function show(string $username): JsonResponse
    {
        $cacheKey = "github_v2_{$username}";

        $data = Cache::remember($cacheKey, now()->addHour(), function () use ($username) {
            $token = Setting::getValue('github_token');

            $profileResponse = Http::timeout(15)
                ->withHeaders(['Accept' => 'application/vnd.github+json'])
                ->get("https://api.github.com/users/{$username}");

            if (! $profileResponse->successful()) {
                return ['error' => 'GitHub profile request failed: ' . $profileResponse->status()];
            }

            $profile = $profileResponse->json();
            $reposResponse = Http::timeout(15)
                ->withHeaders(['Accept' => 'application/vnd.github+json'])
                ->get("https://api.github.com/users/{$username}/repos", [
                    'visibility' => 'public',
                    'sort' => 'updated',
                    'per_page' => 6,
                ]);
            $repos = $reposResponse->successful() ? $reposResponse->json() : [];
            $result = [
                'followers' => $profile['followers'] ?? 0,
                'following' => $profile['following'] ?? 0,
                'repositories' => $profile['public_repos'] ?? 0,
                'totalContributions' => null,
                'contributionCalendar' => null,
                'pinnedRepos' => array_map(fn ($repo) => [
                    'name' => $repo['name'], 'description' => $repo['description'] ?? null,
                    'url' => $repo['html_url'], 'stars' => $repo['stargazers_count'] ?? 0,
                    'forks' => $repo['forks_count'] ?? 0, 'language' => $repo['language'] ?? null,
                    'languageColor' => null,
                ], is_array($repos) ? $repos : []),
            ];

            if (! $token) {
                return $result;
            }

            $query = <<<'GRAPHQL'
query($username: String!) {
  user(login: $username) {
    followers { totalCount }
    following { totalCount }
    repositories(privacy: PUBLIC) { totalCount }
    contributionsCollection {
      totalCommitContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            weekday
          }
        }
      }
    }
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage { name color }
        }
      }
    }
  }
}
GRAPHQL;

            $response = Http::timeout(15)
                ->withToken($token)
                ->withHeaders(['Content-Type' => 'application/json'])
                ->post('https://api.github.com/graphql', [
                    'query' => $query,
                    'variables' => ['username' => $username],
                ]);

            if (! $response->successful()) {
                return ['error' => 'GitHub API request failed: ' . $response->status()];
            }

            $json = $response->json();

            if (isset($json['errors'])) {
                return ['error' => $json['errors'][0]['message'] ?? 'GitHub GraphQL error'];
            }

            $user = $json['data']['user'] ?? null;

            if (! $user) {
                return ['error' => 'GitHub user not found'];
            }

            $result['followers'] = $user['followers']['totalCount'];
            $result['following'] = $user['following']['totalCount'];
            $result['repositories'] = $user['repositories']['totalCount'];
            $result['totalContributions'] = $user['contributionsCollection']['totalCommitContributions'];
            $result['contributionCalendar'] = $user['contributionsCollection']['contributionCalendar'];
            $result['pinnedRepos'] = array_map(function ($repo) {
                    return [
                        'name' => $repo['name'],
                        'description' => $repo['description'],
                        'url' => $repo['url'],
                        'stars' => $repo['stargazerCount'],
                        'forks' => $repo['forkCount'],
                        'language' => $repo['primaryLanguage']['name'] ?? null,
                        'languageColor' => $repo['primaryLanguage']['color'] ?? null,
                    ];
                }, $user['pinnedItems']['nodes'] ?? []);

            return $result;
        });

        if (isset($data['error'])) {
            return response()->json($data, 502);
        }

        return response()->json($data);
    }

    /**
     * Fetch the README content for a given GitHub username.
     * Uses the GitHub REST API: GET /repos/{owner}/{repo}/readme
     * First tries the username's profile repo (username/username), then
     * falls back to username/username (standard profile README convention).
     *
     * GET /api/github/{username}/readme
     */
    public function readme(string $username): JsonResponse
    {
        $cacheKey = "github_readme_{$username}";

        $data = Cache::remember($cacheKey, now()->addHours(6), function () use ($username) {
            $token = Setting::getValue('github_token');

            $headers = ['Accept' => 'application/vnd.github.v3.raw'];
            if ($token) {
                $headers['Authorization'] = 'Bearer ' . $token;
            }

            // GitHub README convention: look in the user's profile repo
            // Standard profile README: owner/repo = username/username
            $repo = $username . '/' . $username;

            $response = Http::timeout(15)
                ->withHeaders($headers)
                ->get("https://api.github.com/repos/{$repo}/readme");

            if (! $response->successful()) {
                // Fallback: try fetching from a differently-named repo, or return error
                return ['error' => 'README not found for this user', 'status' => $response->status()];
            }

            return [
                'content' => $response->body(),
                'username' => $username,
            ];
        });

        if (isset($data['error'])) {
            return response()->json($data, $data['status'] ?? 404);
        }

        return response()->json($data);
    }
}
