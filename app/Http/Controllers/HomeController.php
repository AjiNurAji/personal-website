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
        return Inertia::render('Home', [
            'projects' => Project::where('featured', true)->latest()->take(6)->get(),
            'skills' => Skill::orderBy('priority', 'desc')->get(),
            'achievements' => Achievement::latest()->take(6)->get(),
            'experiences' => Experience::orderBy('priority', 'desc')->orderBy('start_date', 'desc')->get(),
        ]);
    }
}
