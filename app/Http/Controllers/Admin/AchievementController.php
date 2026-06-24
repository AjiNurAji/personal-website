<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\Request;
use Inertia\Inertia;
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
            'description' => 'required|string',
            'content' => 'nullable|string',
            'organization' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:255',
            'category' => 'required|in:event,award,certification',
            'certificate' => 'nullable|file|mimes:pdf,png,jpg,jpeg|max:5120',
            'preview_image_file' => 'nullable|file|mimes:png,jpg,jpeg|max:5120',
            'embed_code' => 'nullable|string',
        ]);

        if ($request->hasFile('certificate')) {
            $file = $request->file('certificate');
            $extension = strtolower($file->getClientOriginalExtension());
            $path = $file->store('achievements/certificates', 'public');
            $validated['certificate_path'] = $path;

            if (in_array($extension, ['jpg', 'jpeg', 'png'])) {
                try {
                    $manager = new ImageManager(new Driver());
                    $image = $manager->decode($file->getPathname());
                    $image->scaleDown(width: 600);
                    
                    $previewName = 'preview_' . uniqid() . '.jpg';
                    $previewPath = 'achievements/previews/' . $previewName;
                    
                    Storage::disk('public')->put($previewPath, (string) $image->encode(new JpegEncoder(80)));
                    $validated['preview_image'] = $previewPath;
                } catch (\Exception $e) {
                    // Fallback if image processing fails
                }
            } elseif ($extension === 'pdf' && $request->hasFile('preview_image_file')) {
                $previewFile = $request->file('preview_image_file');
                $previewName = 'preview_' . uniqid() . '.' . $previewFile->getClientOriginalExtension();
                $previewPath = $previewFile->storeAs('achievements/previews', $previewName, 'public');
                $validated['preview_image'] = $previewPath;
            }
        }

        unset($validated['certificate']);
        unset($validated['preview_image_file']);

        Achievement::create($validated);

        return redirect()->route('admin.achievements.index')->with('success', 'Achievement created successfully.');
    }

    public function update(Request $request, Achievement $achievement)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'nullable|string',
            'organization' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:255',
            'category' => 'required|in:event,award,certification',
            'certificate' => 'nullable|file|mimes:pdf,png,jpg,jpeg|max:5120',
            'preview_image_file' => 'nullable|file|mimes:png,jpg,jpeg|max:5120',
            'embed_code' => 'nullable|string',
        ]);

        if ($request->hasFile('certificate')) {
            // Delete old files
            if ($achievement->certificate_path) {
                Storage::disk('public')->delete($achievement->certificate_path);
            }
            if ($achievement->preview_image) {
                Storage::disk('public')->delete($achievement->preview_image);
            }

            $file = $request->file('certificate');
            $extension = strtolower($file->getClientOriginalExtension());
            $path = $file->store('achievements/certificates', 'public');
            $validated['certificate_path'] = $path;

            $validated['preview_image'] = null; // Reset preview
            if (in_array($extension, ['jpg', 'jpeg', 'png'])) {
                try {
                    $manager = new ImageManager(new Driver());
                    $image = $manager->decode($file->getPathname());
                    $image->scaleDown(width: 600);
                    
                    $previewName = 'preview_' . uniqid() . '.jpg';
                    $previewPath = 'achievements/previews/' . $previewName;
                    
                    Storage::disk('public')->put($previewPath, (string) $image->encode(new JpegEncoder(80)));
                    $validated['preview_image'] = $previewPath;
                } catch (\Exception $e) {
                    // Fallback
                }
            } elseif ($extension === 'pdf' && $request->hasFile('preview_image_file')) {
                $previewFile = $request->file('preview_image_file');
                $previewName = 'preview_' . uniqid() . '.' . $previewFile->getClientOriginalExtension();
                $previewPath = $previewFile->storeAs('achievements/previews', $previewName, 'public');
                $validated['preview_image'] = $previewPath;
            }
        }

        unset($validated['certificate']);
        unset($validated['preview_image_file']);

        $achievement->update($validated);

        return redirect()->route('admin.achievements.index')->with('success', 'Achievement updated successfully.');
    }

    public function destroy(Achievement $achievement)
    {
        if ($achievement->certificate_path) {
            Storage::disk('public')->delete($achievement->certificate_path);
        }
        if ($achievement->preview_image) {
            Storage::disk('public')->delete($achievement->preview_image);
        }
        
        $achievement->delete();
        return redirect()->route('admin.achievements.index')->with('success', 'Achievement deleted successfully.');
    }
}
