<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Achievement;

class DashboardController extends Controller
{
    public function index()
    {
        $projectCount = Project::count();
        $skillCount = Skill::count();
        $achievementCount = Achievement::count();

        $githubCommits = \Illuminate\Support\Facades\Cache::remember('github_commits', 300, function () {
            try {
                $response = \Illuminate\Support\Facades\Http::timeout(3)
                    ->withHeaders(['User-Agent' => 'Laravel'])
                    ->get('https://api.github.com/repos/AjiNurAji/personal-website/commits', [
                        'per_page' => 5
                    ]);

                if ($response->successful()) {
                    $commits = $response->json();
                    return collect($commits)->map(function ($commit) {
                        return [
                            'message' => str($commit['commit']['message'])->limit(60)->toString(),
                            'url' => $commit['html_url'],
                            'date' => \Carbon\Carbon::parse($commit['commit']['author']['date'])->diffForHumans(),
                            'sha' => substr($commit['sha'], 0, 7),
                        ];
                    })->toArray();
                }
            } catch (\Exception $e) {
                // Return empty array on failure
            }
            return [];
        });

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'projects' => $projectCount,
                'skills' => $skillCount,
                'achievements' => $achievementCount,
            ],
            'githubCommits' => $githubCommits
        ]);
    }
}
