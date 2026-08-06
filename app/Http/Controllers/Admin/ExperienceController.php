<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Experiences/Index', [
            'experiences' => Experience::orderBy('priority')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Experiences/Create');
    }

    public function edit(Experience $experience)
    {
        return Inertia::render('Admin/Experiences/Edit', ['experience' => $experience]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateExperience($request);
        $validated['logo'] = $this->storeLogo($request);
        $validated['documentation_images'] = $this->storeDocumentation($request);

        Experience::create($validated);
        Cache::forget('home_page_data');

        return redirect()->route('admin.experiences.index')->with('success', 'Experience created successfully.');
    }

    public function update(Request $request, Experience $experience)
    {
        $validated = $this->validateExperience($request);

        if ($request->hasFile('logo')) {
            if ($experience->logo) Storage::disk('public')->delete($experience->logo);
            $validated['logo'] = $this->storeLogo($request);
        }

        $newDocumentation = $this->storeDocumentation($request);
        if ($newDocumentation) {
            $validated['documentation_images'] = array_merge($experience->documentation_images ?? [], $newDocumentation);
        }

        $experience->update($validated);
        Cache::forget('home_page_data');

        return redirect()->route('admin.experiences.index')->with('success', 'Experience updated successfully.');
    }

    public function destroy(Experience $experience)
    {
        if ($experience->logo) Storage::disk('public')->delete($experience->logo);
        foreach ($experience->documentation_images ?? [] as $image) Storage::disk('public')->delete($image);

        $experience->delete();
        Cache::forget('home_page_data');

        return redirect()->route('admin.experiences.index')->with('success', 'Experience deleted successfully.');
    }

    private function validateExperience(Request $request): array
    {
        return $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'title_id' => 'nullable|string|max:255',
            'company' => 'required|string|max:255',
            'company_en' => 'nullable|string|max:255',
            'company_id' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'type' => 'required|in:work,education',
            'description' => 'nullable|string',
            'description_en' => 'nullable|string',
            'description_id' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'logo' => 'nullable|image|max:2048',
            'documentation_images' => 'nullable|array',
            'documentation_images.*' => 'image|max:4096',
            'url' => 'nullable|url|max:255',
            'priority' => 'integer',
        ]);
    }

    private function storeLogo(Request $request): ?string
    {
        return $request->hasFile('logo')
            ? $request->file('logo')->store('experiences', 'public')
            : null;
    }

    private function storeDocumentation(Request $request): array
    {
        return collect($request->file('documentation_images', []))
            ->map(fn ($file) => $file->store('experiences/documentation', 'public'))
            ->values()
            ->all();
    }
}
