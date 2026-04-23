<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::latest()->get();
        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Projects/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects',
            'description' => 'required|string',
            'content' => 'nullable|string',
            'image' => 'required|image|max:2048',
            'link' => 'nullable|string',
            'github' => 'nullable|string',
            'demo' => 'nullable|string',
            'badges' => 'nullable|string',
            'featured' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }

        if (isset($validated['badges']) && is_string($validated['badges'])) {
            $validated['badges'] = collect(explode(',', $validated['badges']))->map(fn($b) => trim($b))->filter()->values()->toJson();
        }

        Project::create($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        // Decode badges back to comma separated string for the form if it is json
        if ($project->badges && is_array($project->badges)) {
            $project->badges = implode(', ', $project->badges);
        } else if (is_string($project->badges)) {
            $badgesArray = json_decode($project->badges, true);
            if (is_array($badgesArray)) {
                $project->badges = implode(', ', $badgesArray);
            }
        }

        return Inertia::render('Admin/Projects/Edit', [
            'project' => $project
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug,' . $project->id,
            'description' => 'required|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'link' => 'nullable|string',
            'github' => 'nullable|string',
            'demo' => 'nullable|string',
            'badges' => 'nullable|string',
            'featured' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($project->image && !str_starts_with($project->image, 'http')) {
                Storage::disk('public')->delete($project->image);
            }
            $validated['image'] = $request->file('image')->store('projects', 'public');
        } else {
            unset($validated['image']);
        }

        if (isset($validated['badges']) && is_string($validated['badges'])) {
            $validated['badges'] = collect(explode(',', $validated['badges']))->map(fn($b) => trim($b))->filter()->values()->toJson();
        }

        $project->update($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        if ($project->image && !str_starts_with($project->image, 'http')) {
            Storage::disk('public')->delete($project->image);
        }
        $project->delete();
        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}
