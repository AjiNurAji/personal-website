<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AchievementController extends Controller
{
    public function index()
    {
        return Inertia::render('Achievements/Index', [
            'achievements' => Achievement::latest('year')->get()
        ]);
    }

    public function show(Achievement $achievement)
    {
        return Inertia::render('Achievements/Show', [
            'achievement' => $achievement
        ]);
    }
}
