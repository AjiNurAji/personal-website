<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'about_image' => 'nullable',
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

        if ($request->hasFile('about_image')) {
            $oldImageSetting = Setting::where('key', 'about_image')->first();
            if ($oldImageSetting && $oldImageSetting->value) {
                $oldPath = $oldImageSetting->value;
                if (!str_starts_with($oldPath, 'http') && Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }

            $path = $request->file('about_image')->store('settings', 'public');
            $validated['about_image'] = $path;
        }

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => is_array($value) ? json_encode($value) : $value]
            );
        }

        return redirect()->route('admin.settings.index')->with('success', 'Settings updated successfully.');
    }
}
