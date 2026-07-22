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
        $cacheKey = "github_{$username}";

        $data = Cache::remember($cacheKey, now()->addHour(), function () use ($username) {
            $token = Setting::getValue('github_token');

            if (! $token) {
                return ['error' => 'GitHub token not configured'];
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

            return [
                'followers' => $user['followers']['totalCount'],
                'following' => $user['following']['totalCount'],
                'repositories' => $user['repositories']['totalCount'],
                'totalContributions' => $user['contributionsCollection']['totalCommitContributions'],
                'contributionCalendar' => $user['contributionsCollection']['contributionCalendar'],
                'pinnedRepos' => array_map(function ($repo) {
                    return [
                        'name' => $repo['name'],
                        'description' => $repo['description'],
                        'url' => $repo['url'],
                        'stars' => $repo['stargazerCount'],
                        'forks' => $repo['forkCount'],
                        'language' => $repo['primaryLanguage']['name'] ?? null,
                        'languageColor' => $repo['primaryLanguage']['color'] ?? null,
                    ];
                }, $user['pinnedItems']['nodes'] ?? []),
            ];
        });

        if (isset($data['error'])) {
            return response()->json($data, 502);
        }

        return response()->json($data);
    }
}
