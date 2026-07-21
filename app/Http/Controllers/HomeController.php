<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $cacheKey = 'home_page_data';

        $data = Cache::remember($cacheKey, now()->addMinutes(30), function () {
            $experiences = Experience::orderBy('start_date', 'desc')
                ->orderBy('priority', 'asc')
                ->get();

            $settings = \App\Models\Setting::all()->pluck('value', 'key')->toArray();

            return [
                'projects' => Project::where('featured', true)
                    ->latest()
                    ->take(6)
                    ->get()
                    ->toArray(),
                'skills' => Skill::orderBy('priority', 'asc')->get()->toArray(),
                'achievements' => Achievement::latest()->take(6)->get()->toArray(),
                'work_experiences' => $experiences->where('type', 'work')->values()->toArray(),
                'education_experiences' => $experiences->where('type', 'education')->values()->toArray(),
                'settings' => $settings,
            ];
        });

        return Inertia::render('Home', $data);
    }
}
