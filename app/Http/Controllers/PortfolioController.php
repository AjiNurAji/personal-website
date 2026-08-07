<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Setting;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    private function shared(): array
    {
        return [
            'settings' => Setting::localizedPublicValues(),
        ];
    }

    public function about()
    {
        return Inertia::render('About', array_merge($this->shared(), [
            'work_experiences' => Experience::where('type', 'work')->orderByDesc('start_date')->get()->toArray(),
            'education_experiences' => Experience::where('type', 'education')->orderByDesc('start_date')->get()->toArray(),
        ]));
    }

}
