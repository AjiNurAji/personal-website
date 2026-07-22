<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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
        $rules = [
            'about_title' => 'nullable|string',
            'about_description' => 'nullable|string',
            'hero_title' => 'nullable|string',
            'hero_subtitle' => 'nullable|string',
            'nav_links' => 'nullable|array',
            'nav_links.*.label' => 'required|string',
            'nav_links.*.href' => 'required|string',
            'is_available' => 'nullable|boolean',
            'contact_email' => 'nullable|string',
            'github_url' => 'nullable|string',
            'github_token' => 'nullable|string',
            'wakatime_username' => 'nullable|string',
            'wakatime_share_ids' => 'nullable|array',
            'wakatime_share_ids.*.label' => 'required|string',
            'wakatime_share_ids.*.id' => 'required|string',
            'social_links' => 'nullable|array',
            'social_links.*.platform' => 'required|string',
            'social_links.*.url' => 'required|string',
        ];

        // Only validate about_image as image file when a new file is uploaded.
        // When no new image, the form sends the existing path as a string.
        if ($request->hasFile('about_image')) {
            $rules['about_image'] = 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120';
        }

        $validated = $request->validate($rules);

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

        Cache::forget('home_page_data');

        return redirect()->route('admin.settings.index')->with('success', 'Settings updated successfully.');
    }
}
