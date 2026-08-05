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
            'about_title' => 'nullable|string|max:180',
            'about_title_en' => 'nullable|string|max:180',
            'about_title_id' => 'nullable|string|max:180',
            'about_description' => 'nullable|string',
            'about_description_en' => 'nullable|string',
            'about_description_id' => 'nullable|string',
            'about_page_intro' => 'nullable|string|max:300',
            'about_page_intro_en' => 'nullable|string|max:300',
            'about_page_intro_id' => 'nullable|string|max:300',
            'hero_title' => 'nullable|string|max:180',
            'hero_subtitle' => 'nullable|string|max:300',
            'hero_subtitle_en' => 'nullable|string|max:300',
            'hero_subtitle_id' => 'nullable|string|max:300',
            'role' => 'nullable|string|max:120',
            'role_en' => 'nullable|string|max:120',
            'role_id' => 'nullable|string|max:120',
            'home_eyebrow' => 'nullable|string|max:80',
            'home_eyebrow_en' => 'nullable|string|max:80',
            'home_eyebrow_id' => 'nullable|string|max:80',
            'home_location' => 'nullable|string|max:120',
            'home_location_en' => 'nullable|string|max:120',
            'home_location_id' => 'nullable|string|max:120',
            'home_status' => 'nullable|string|max:120',
            'home_status_en' => 'nullable|string|max:120',
            'home_status_id' => 'nullable|string|max:120',
            'home_intro' => 'nullable|string|max:600',
            'home_intro_en' => 'nullable|string|max:600',
            'home_intro_id' => 'nullable|string|max:600',
            'home_focus' => 'nullable|string|max:600',
            'home_focus_en' => 'nullable|string|max:600',
            'home_focus_id' => 'nullable|string|max:600',
            'home_cta_label' => 'nullable|string|max:80',
            'home_cta_label_en' => 'nullable|string|max:80',
            'home_cta_label_id' => 'nullable|string|max:80',
            'skills_title' => 'nullable|string|max:120',
            'skills_title_en' => 'nullable|string|max:120',
            'skills_title_id' => 'nullable|string|max:120',
            'skills_subtitle' => 'nullable|string|max:180',
            'skills_subtitle_en' => 'nullable|string|max:180',
            'skills_subtitle_id' => 'nullable|string|max:180',
            'availability_messages' => 'nullable|array',
            'availability_messages.*' => 'required|string|max:80',
            'availability_messages_en' => 'nullable|array',
            'availability_messages_en.*' => 'required|string|max:80',
            'availability_messages_id' => 'nullable|array',
            'availability_messages_id.*' => 'required|string|max:80',
            'nav_links' => 'nullable|array',
            'nav_links.*.label' => 'required|string',
            'nav_links.*.href' => 'required|string',
            'nav_links.*.icon' => 'nullable|string|max:80',
            'nav_links_en' => 'nullable|array',
            'nav_links_en.*.label' => 'required|string',
            'nav_links_en.*.href' => 'required|string',
            'nav_links_en.*.icon' => 'nullable|string|max:80',
            'nav_links_id' => 'nullable|array',
            'nav_links_id.*.label' => 'required|string',
            'nav_links_id.*.href' => 'required|string',
            'nav_links_id.*.icon' => 'nullable|string|max:80',
            'is_available' => 'nullable|boolean',
            'contact_email' => 'nullable|email|max:255',
            'github_url' => 'nullable|url|max:2048',
            'github_token' => 'nullable|string|max:255',
            'wakatime_username' => 'nullable|string',
            'wakatime_share_ids' => 'nullable|array',
            'wakatime_share_ids.*.label' => 'required|string',
            'wakatime_share_ids.*.url' => 'required|string',
            'wakatime_share_ids_en' => 'nullable|array',
            'wakatime_share_ids_en.*.label' => 'required|string',
            'wakatime_share_ids_en.*.url' => 'required|string',
            'wakatime_share_ids_id' => 'nullable|array',
            'wakatime_share_ids_id.*.label' => 'required|string',
            'wakatime_share_ids_id.*.url' => 'required|string',
            'social_links' => 'nullable|array',
            'social_links.*.platform' => 'required|string',
            'social_links.*.url' => 'required|string',
            'site_title' => 'nullable|string|max:120',
            'site_title_en' => 'nullable|string|max:120',
            'site_title_id' => 'nullable|string|max:120',
            'site_description' => 'nullable|string|max:300',
            'site_description_en' => 'nullable|string|max:300',
            'site_description_id' => 'nullable|string|max:300',
            'google_site_verification' => 'nullable|string',
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

        Cache::forget('home_page_data_public_v2');
        Cache::forget('home_page_data_public_v2_en');
        Cache::forget('home_page_data_public_v2_id');

        return redirect()->route('admin.settings.index')->with('success', 'Settings updated successfully.');
    }
}
