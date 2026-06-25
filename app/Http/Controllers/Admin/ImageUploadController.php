<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = 'md_' . time() . '_' . Str::random(10) . '.' . $extension;
            
            $path = $file->storeAs('markdown', $filename, 'public');

            return response()->json([
                'success' => true,
                'url' => '/storage/' . $path,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'No image provided.',
        ], 400);
    }
}
