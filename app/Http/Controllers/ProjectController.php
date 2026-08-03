<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use App\Models\Setting;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Projects/Index', [
            'projects' => Project::latest()->get(),
            'settings' => Setting::publicValues(),
        ]);
    }

    public function show($slug)
    {
        $project = Project::where('slug', $slug)->firstOrFail();

        return Inertia::render('Projects/Show', [
            'project' => $project,
            'settings' => Setting::publicValues(),
        ]);
    }

    /**
     * Fetch README.md from GitHub repository.
     * Uses GitHub token from settings or .env for private repos.
     */
    public function readme($slug)
    {
        $project = Project::where('slug', $slug)->firstOrFail();

        if (!$project->github) {
            return response()->json(['readme_content' => null, 'error' => 'No GitHub URL configured']);
        }

        $urlPath = parse_url($project->github, PHP_URL_PATH);
        if (!$urlPath) {
            return response()->json(['readme_content' => null, 'error' => 'Invalid GitHub URL']);
        }

        $pathParts = explode('/', trim($urlPath, '/'));
        if (count($pathParts) < 2) {
            return response()->json(['readme_content' => null, 'error' => 'Invalid GitHub URL format']);
        }

        $owner = $pathParts[0];
        $repo = $pathParts[1];

        $cacheKey = "github_readme_{$owner}_{$repo}";
        $readmeContent = Cache::remember($cacheKey, now()->addHours(6), function () use ($owner, $repo) {
            return $this->fetchReadmeFromGitHub($owner, $repo);
        });

        if ($readmeContent === null) {
            return response()->json(['readme_content' => null, 'error' => 'README not found or repo is private without valid token']);
        }

        return response()->json(['readme_content' => $readmeContent]);
    }

    /**
     * Fetch README from GitHub API with optional token for private repos.
     */
    private function fetchReadmeFromGitHub(string $owner, string $repo): ?string
    {
        $token = $this->getGitHubToken();

        try {
            $headers = [
                'User-Agent' => 'AjiNurAji-Portfolio-App',
                'Accept' => 'application/vnd.github.v3+json',
            ];

            if ($token) {
                $headers['Authorization'] = "Bearer {$token}";
            }

            $response = Http::withHeaders($headers)
                ->timeout(10)
                ->get("https://api.github.com/repos/{$owner}/{$repo}/readme");

            if ($response->successful()) {
                $data = $response->json();
                if (isset($data['content']) && isset($data['encoding']) && $data['encoding'] === 'base64') {
                    return base64_decode($data['content']);
                }
            }

            // If public API fails with 404, it might be a private repo without valid token
            if ($response->status() === 404 && !$token) {
                // Try to return null gracefully - repo might be private
                return null;
            }

        } catch (\Exception $e) {
            \Log::warning("GitHub README fetch failed for {$owner}/{$repo}: " . $e->getMessage());
        }

        return null;
    }

    /**
     * Get GitHub token from settings or .env.
     */
    private function getGitHubToken(): ?string
    {
        // First check settings table
        $token = Setting::getValue('github_token');
        if ($token && is_string($token) && !empty($token)) {
            return $token;
        }

        // Fallback to .env
        $envToken = env('GITHUB_TOKEN');
        if ($envToken && !empty($envToken)) {
            return $envToken;
        }

        return null;
    }

    /**
     * Force-refresh README from GitHub (bypasses cache).
     * Useful for admin when they want to re-fetch.
     */
    public function refreshReadme($slug)
    {
        $project = Project::where('slug', $slug)->firstOrFail();

        if (!$project->github) {
            return response()->json(['readme_content' => null, 'error' => 'No GitHub URL configured']);
        }

        $urlPath = parse_url($project->github, PHP_URL_PATH);
        if (!$urlPath) {
            return response()->json(['readme_content' => null, 'error' => 'Invalid GitHub URL']);
        }

        $pathParts = explode('/', trim($urlPath, '/'));
        if (count($pathParts) < 2) {
            return response()->json(['readme_content' => null, 'error' => 'Invalid GitHub URL format']);
        }

        $owner = $pathParts[0];
        $repo = $pathParts[1];

        $cacheKey = "github_readme_{$owner}_{$repo}";
        Cache::forget($cacheKey);

        $readmeContent = $this->fetchReadmeFromGitHub($owner, $repo);

        // Re-cache
        if ($readmeContent !== null) {
            Cache::put($cacheKey, $readmeContent, now()->addHours(6));
        }

        return response()->json([
            'readme_content' => $readmeContent,
            'error' => $readmeContent === null ? 'README not found' : null,
        ]);
    }
}
