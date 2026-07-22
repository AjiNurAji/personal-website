<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class WakaTimeController extends Controller
{
    /**
     * Fetch WakaTime share embed JSON data.
     *
     * Accepts share URLs or IDs and returns parsed daily coding activity.
     * Data is cached for 1 hour to avoid hitting WakaTime on every request.
     *
     * GET /api/wakatime/{username}/{shareId}
     */
    public function show(string $username, string $shareId): JsonResponse
    {
        $cacheKey = "wakatime_{$username}_{$shareId}";

        $data = Cache::remember($cacheKey, now()->addHour(), function () use ($username, $shareId) {
            $url = "https://wakatime.com/share/@{$username}/{$shareId}.json";

            $response = Http::timeout(10)->get($url);

            if (! $response->successful()) {
                return null;
            }

            $json = $response->json();

            // WakaTime returns an array of daily summaries
            if (! is_array($json) || empty($json)) {
                return null;
            }

            return $json;
        });

        if ($data === null) {
            return response()->json(['error' => 'Failed to fetch WakaTime data'], 502);
        }

        return response()->json($data);
    }
}
