<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\JpegEncoder;

class AchievementController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $achievements = Achievement::when($search, function($query, $search) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('organization', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        })
        ->latest('year')
        ->paginate(10)
        ->withQueryString();

        return Inertia::render('Admin/Achievements/Index', [
            'achievements' => $achievements,
            'filters' => $request->only('search')
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Achievements/Create');
    }

    public function edit(Achievement $achievement)
    {
        return Inertia::render('Admin/Achievements/Edit', [
            'achievement' => $achievement
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'title_id' => 'nullable|string|max:255',
            'description' => 'required|string',
            'description_en' => 'nullable|string',
            'description_id' => 'nullable|string',
            'content' => 'nullable|string',
            'content_en' => 'nullable|string',
            'content_id' => 'nullable|string',
            'organization' => 'nullable|string|max:255',
            'organization_en' => 'nullable|string|max:255',
            'organization_id' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:255',
            'category' => 'required|in:event,award,certification',
            'certificate' => 'nullable|file|mimes:pdf,png,jpg,jpeg,webp|max:5120',
            'preview_image_file' => 'nullable|file|mimes:png,jpg,jpeg|max:5120',
            'embed_code' => 'nullable|string',
            'documentation_images' => 'nullable|array',
            'documentation_images.*' => 'image|max:4096',
        ]);

        if ($request->hasFile('certificate')) {
            $file = $request->file('certificate');
            $extension = strtolower($file->getClientOriginalExtension());
            $validated['certificate_path'] = $file->store('achievements/certificates', 'public');

            if (in_array($extension, ['jpg', 'jpeg', 'png', 'webp'])) {
                try {
                    $manager = new ImageManager(new Driver());
                    $image = $manager->decode($file->getPathname());
                    $image->scaleDown(width: 600);
                    $previewPath = 'achievements/previews/preview_' . uniqid() . '.webp';
                    Storage::disk('public')->put($previewPath, (string) $image->encode(new JpegEncoder(80)));
                    $validated['preview_image'] = $previewPath;
                } catch (\Exception $e) {
                    // Keep the certificate when preview generation is unavailable.
                }
            } elseif ($extension === 'pdf' && $request->hasFile('preview_image_file')) {
                $previewFile = $request->file('preview_image_file');
                $validated['preview_image'] = $previewFile->storeAs(
                    'achievements/previews',
                    'preview_' . uniqid() . '.' . $previewFile->getClientOriginalExtension(),
                    'public'
                );
            }
        }

        unset($validated['certificate'], $validated['preview_image_file']);
        $validated['documentation_images'] = $this->storeDocumentation($request);

        Achievement::create($validated);
        Cache::forget('home_page_data');

        return redirect()->route('admin.achievements.index')->with('success', 'Achievement created successfully.');
    }

    public function update(Request $request, Achievement $achievement)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'title_id' => 'nullable|string|max:255',
            'description' => 'required|string',
            'description_en' => 'nullable|string',
            'description_id' => 'nullable|string',
            'content' => 'nullable|string',
            'content_en' => 'nullable|string',
            'content_id' => 'nullable|string',
            'organization' => 'nullable|string|max:255',
            'organization_en' => 'nullable|string|max:255',
            'organization_id' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:255',
            'category' => 'required|in:event,award,certification',
            'certificate' => 'nullable|file|mimes:pdf,png,jpg,jpeg,webp|max:5120',
            'preview_image_file' => 'nullable|file|mimes:png,jpg,jpeg|max:5120',
            'embed_code' => 'nullable|string',
            'documentation_images' => 'nullable|array',
            'documentation_images.*' => 'image|max:4096',
        ]);

        if ($request->hasFile('certificate')) {
            if ($achievement->certificate_path) Storage::disk('public')->delete($achievement->certificate_path);
            if ($achievement->preview_image) Storage::disk('public')->delete($achievement->preview_image);

            $file = $request->file('certificate');
            $extension = strtolower($file->getClientOriginalExtension());
            $validated['certificate_path'] = $file->store('achievements/certificates', 'public');
            $validated['preview_image'] = null;

            if (in_array($extension, ['jpg', 'jpeg', 'png', 'webp'])) {
                try {
                    $manager = new ImageManager(new Driver());
                    $image = $manager->decode($file->getPathname());
                    $image->scaleDown(width: 600);
                    $previewPath = 'achievements/previews/preview_' . uniqid() . '.webp';
                    Storage::disk('public')->put($previewPath, (string) $image->encode(new JpegEncoder(80)));
                    $validated['preview_image'] = $previewPath;
                } catch (\Exception $e) {
                    // Keep the certificate when preview generation is unavailable.
                }
            } elseif ($extension === 'pdf' && $request->hasFile('preview_image_file')) {
                $previewFile = $request->file('preview_image_file');
                $validated['preview_image'] = $previewFile->storeAs(
                    'achievements/previews',
                    'preview_' . uniqid() . '.' . $previewFile->getClientOriginalExtension(),
                    'public'
                );
            }
        }

        unset($validated['certificate'], $validated['preview_image_file']);
        $newDocumentation = $this->storeDocumentation($request);
        if ($newDocumentation) {
            $validated['documentation_images'] = array_merge($achievement->documentation_images ?? [], $newDocumentation);
        }

        $achievement->update($validated);
        Cache::forget('home_page_data');

        return redirect()->route('admin.achievements.index')->with('success', 'Achievement updated successfully.');
    }

    public function destroy(Achievement $achievement)
    {
        foreach ([$achievement->certificate_path, $achievement->preview_image] as $path) {
            if ($path) Storage::disk('public')->delete($path);
        }
        foreach ($achievement->documentation_images ?? [] as $image) {
            Storage::disk('public')->delete($image);
        }

        $achievement->delete();
        Cache::forget('home_page_data');
        return redirect()->route('admin.achievements.index')->with('success', 'Achievement deleted successfully.');
    }

    private function storeDocumentation(Request $request): array
    {
        return collect($request->file('documentation_images', []))
            ->map(fn ($file) => $file->store('achievements/documentation', 'public'))
            ->values()
            ->all();
    }
}
