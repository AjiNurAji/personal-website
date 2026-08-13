<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class StatsController extends Controller
{
    public function index()
    {
        $settings = Setting::localizedPublicValues();

        return Inertia::render('Stats', [
            'settings' => $settings,
        ]);
    }
}
