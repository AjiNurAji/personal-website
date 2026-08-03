<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Versioned key prevents serving an older cache entry that may contain secrets.
        $cacheKey = 'home_page_data_public_v2_'.app()->getLocale();

        $data = Cache::remember($cacheKey, now()->addMinutes(30), function () {
            return [
                'skills' => Skill::orderBy('priority', 'asc')->get()->toArray(),
                'settings' => \App\Models\Setting::localizedPublicValues(),
            ];
        });

        return Inertia::render('Home', $data);
    }
}
