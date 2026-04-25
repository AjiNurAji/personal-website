<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key');
        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'about_title' => 'nullable|string',
            'about_description' => 'nullable|string',
            'hero_title' => 'nullable|string',
            'hero_subtitle' => 'nullable|string',
            'about_image' => 'nullable|string',
            'nav_links' => 'nullable|array',
            'nav_links.*.label' => 'required|string',
            'nav_links.*.href' => 'required|string',
            'is_available' => 'nullable|boolean',
            'contact_email' => 'nullable|string',
            'github_url' => 'nullable|string',
            'social_links' => 'nullable|array',
            'social_links.*.platform' => 'required|string',
            'social_links.*.url' => 'required|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => is_array($value) ? json_encode($value) : $value]
            );
        }

        return redirect()->route('admin.settings.index')->with('success', 'Settings updated successfully.');
    }
}
