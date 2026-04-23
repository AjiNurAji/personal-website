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

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'projects' => $projectCount,
                'skills' => $skillCount,
                'achievements' => $achievementCount,
            ]
        ]);
    }
}
