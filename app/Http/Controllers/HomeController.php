<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Experience;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $experiences = Experience::orderBy('priority', 'desc')->orderBy('start_date', 'desc')->get();
        $settings = \App\Models\Setting::all()->pluck('value', 'key');

        return Inertia::render('Home', [
            'projects' => Project::where('featured', true)->latest()->take(6)->get(),
            'skills' => Skill::orderBy('priority', 'desc')->get(),
            'achievements' => Achievement::latest()->take(6)->get(),
            'work_experiences' => $experiences->where('type', 'work')->values(),
            'education_experiences' => $experiences->where('type', 'education')->values(),
            'settings' => $settings,
        ]);
    }
}
