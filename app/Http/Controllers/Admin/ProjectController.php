<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use App\Models\Setting;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::latest()->get();
        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Projects/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects',
            'description' => 'required|string',
            'content' => 'nullable|string',
            'image' => 'required|image|max:2048',
            'link' => 'nullable|string',
            'github' => 'nullable|string',
            'demo' => 'nullable|string',
            'badges' => 'nullable|string',
            'featured' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }

        if (isset($validated['badges']) && is_string($validated['badges'])) {
            $validated['badges'] = collect(explode(',', $validated['badges']))->map(fn($b) => trim($b))->filter()->values()->toJson();
        }

        Project::create($validated);

        Cache::forget('home_page_data_public_v2');

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        // Decode badges back to comma separated string for the form if it is json
        if ($project->badges && is_array($project->badges)) {
            $project->badges = implode(', ', $project->badges);
        } else if (is_string($project->badges)) {
            $badgesArray = json_decode($project->badges, true);
            if (is_array($badgesArray)) {
                $project->badges = implode(', ', $badgesArray);
            }
        }

        return Inertia::render('Admin/Projects/Edit', [
            'project' => $project
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug,' . $project->id,
            'description' => 'required|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'link' => 'nullable|string',
            'github' => 'nullable|string',
            'demo' => 'nullable|string',
            'badges' => 'nullable|string',
            'featured' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($project->image && !str_starts_with($project->image, 'http')) {
                Storage::disk('public')->delete($project->image);
            }
            $validated['image'] = $request->file('image')->store('projects', 'public');
        } else {
            unset($validated['image']);
        }

        if (isset($validated['badges']) && is_string($validated['badges'])) {
            $validated['badges'] = collect(explode(',', $validated['badges']))->map(fn($b) => trim($b))->filter()->values()->toJson();
        }

        $project->update($validated);

        Cache::forget('home_page_data_public_v2');

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        if ($project->image && !str_starts_with($project->image, 'http')) {
            Storage::disk('public')->delete($project->image);
        }
        $project->delete();

        Cache::forget('home_page_data_public_v2');

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }

    /**
     * Fetch README from GitHub for a project and return it as JSON.
     * Supports private repos via GITHUB_TOKEN.
     */
    public function fetchReadme(Project $project)
    {
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

        // Get token from settings or .env
        $token = Setting::getValue('github_token');
        if (!$token) {
            $token = env('GITHUB_TOKEN');
        }

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
                    $readmeContent = base64_decode($data['content']);

                    // Also clear the public cache
                    $cacheKey = "github_readme_{$owner}_{$repo}";
                    Cache::forget($cacheKey);
                    Cache::put($cacheKey, $readmeContent, now()->addHours(6));

                    return response()->json([
                        'readme_content' => $readmeContent,
                        'repo_name' => $data['name'] ?? null,
                        'repo_html_url' => $data['html_url'] ?? null,
                    ]);
                }
            }

            $statusCode = $response->status();
            if ($statusCode === 404) {
                return response()->json([
                    'readme_content' => null,
                    'error' => $token
                        ? 'README not found in this repository (404). Check if the repo name is correct.'
                        : 'Repository not found or is private. Add a GitHub token in Settings to access private repos.',
                ]);
            }

            if ($statusCode === 401 || $statusCode === 403) {
                return response()->json([
                    'readme_content' => null,
                    'error' => 'GitHub token is invalid or expired. Please check your token in Settings.',
                ]);
            }

            return response()->json([
                'readme_content' => null,
                'error' => "GitHub API returned status {$statusCode}",
            ]);

        } catch (\Exception $e) {
            \Log::warning("Admin GitHub README fetch failed for {$owner}/{$repo}: " . $e->getMessage());
            return response()->json([
                'readme_content' => null,
                'error' => 'Failed to connect to GitHub: ' . $e->getMessage(),
            ]);
        }
    }
}
