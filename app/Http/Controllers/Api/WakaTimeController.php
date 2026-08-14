<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class WakaTimeController extends Controller
{
    /** Fetch private WakaTime stats server-side. The API key never reaches the browser. */
    public function stats(): JsonResponse
    {
        $apiKey = trim((string) Setting::where('key', 'wakatime_api_key')->value('value'));

        if ($apiKey === '') {
            return response()->json(['error' => 'WakaTime API key is not configured'], 404);
        }

        $cacheKey = 'wakatime_api_v2_stats_last_7_days';
        $cached = Cache::get($cacheKey);
        if (is_array($cached)) {
            return response()->json($cached);
        }

        $response = Http::timeout(15)
            ->withToken($apiKey)
            ->acceptJson()
            ->get('https://api.wakatime.com/api/v1/users/current/stats/last_7_days');

        if (! $response->successful()) {
            return response()->json([
                'error' => "WakaTime API request failed: {$response->status()}",
            ], $response->status() >= 400 && $response->status() < 600 ? $response->status() : 502);
        }

        $data = $response->json('data', []);
        Cache::put($cacheKey, $data, now()->addMinutes(30));

        return response()->json($data);
    }

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
