<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Projects/Index', [
            'projects' => Project::latest()->get()
        ]);
    }

    public function show($slug)
    {
        $project = Project::where('slug', $slug)->firstOrFail();
        
        $readmeContent = null;
        if ($project->github) {
            $urlPath = parse_url($project->github, PHP_URL_PATH);
            if ($urlPath) {
                $pathParts = explode('/', trim($urlPath, '/'));
                if (count($pathParts) >= 2) {
                    $owner = $pathParts[0];
                    $repo = $pathParts[1];
                    
                    $cacheKey = "github_readme_{$owner}_{$repo}";
                    $readmeContent = Cache::remember($cacheKey, now()->addDay(), function () use ($owner, $repo) {
                        try {
                            // Using a user-agent as GitHub API requires it
                            $response = Http::withHeaders([
                                'User-Agent' => 'AjiNurAji-Portfolio-App'
                            ])->get("https://api.github.com/repos/{$owner}/{$repo}/readme");
                            
                            if ($response->successful()) {
                                $data = $response->json();
                                if (isset($data['content']) && isset($data['encoding']) && $data['encoding'] === 'base64') {
                                    return base64_decode($data['content']);
                                }
                            }
                        } catch (\Exception $e) {
                            return null;
                        }
                        return null;
                    });
                }
            }
        }

        return Inertia::render('Projects/Show', [
            'project' => $project,
            'readme_content' => $readmeContent
        ]);
    }
}
