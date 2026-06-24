<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AchievementController extends Controller
{
    public function index(Request $request)
    {
        $query = Achievement::latest('year')->latest('id');
        
        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('organization', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $achievements = $query->paginate(9);

        if ($request->wantsJson()) {
            return response()->json($achievements);
        }

        return Inertia::render('Achievements/Index', [
            'achievements' => $achievements
        ]);
    }

    public function show(Achievement $achievement)
    {
        return Inertia::render('Achievements/Show', [
            'achievement' => $achievement
        ]);
    }
}
