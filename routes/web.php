<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\AchievementController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\ProjectController as PublicProjectController;
use App\Http\Controllers\PortfolioController;

Route::post('/locale/{locale}', [\App\Http\Controllers\LocaleController::class, 'update'])
    ->where('locale', 'en|id')
    ->name('locale.update');

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [PortfolioController::class, 'about'])->name('about');
Route::get('/experience', [PortfolioController::class, 'experience'])->name('experience');
Route::get('/projects', [PublicProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{slug}', [PublicProjectController::class, 'show'])->name('projects.show');
Route::get('/projects/{slug}/readme', [PublicProjectController::class, 'readme'])->name('projects.readme');


Route::get('/achievements', [\App\Http\Controllers\AchievementController::class, 'index'])->name('achievements.index');
Route::get('/achievements/{achievement}', [\App\Http\Controllers\AchievementController::class, 'show'])->name('achievements.show');

Route::get('/admin', function () {
    return redirect()->route('login');
});

Route::middleware(['auth', 'verified', 'admin', 'throttle:60,1'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('projects', ProjectController::class);
    Route::get('/projects/{project}/fetch-readme', [ProjectController::class, 'fetchReadme'])->name('projects.fetch-readme');
    Route::resource('skills', SkillController::class);
    Route::resource('achievements', AchievementController::class);
    Route::resource('experiences', ExperienceController::class);
    Route::get('/settings', [App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
    Route::post('/upload-image', [App\Http\Controllers\Admin\ImageUploadController::class, 'store'])->name('upload-image');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// SEO routes
Route::get('/og-image', [App\Http\Controllers\OgImageController::class, '__invoke'])->name('og-image');
Route::get('/sitemap.xml', function () {
    $projects = \App\Models\Project::all();
    $achievements = \App\Models\Achievement::all();

    $urls = collect();

    // Home
    $urls->push(['loc' => url('/'), 'changefreq' => 'daily', 'priority' => '1.0']);

    // Projects index
    $urls->push(['loc' => url('/projects'), 'changefreq' => 'weekly', 'priority' => '0.9']);

    // Project detail pages
    foreach ($projects as $p) {
        $urls->push([
            'loc' => url("/projects/{$p->slug}"),
            'lastmod' => $p->updated_at?->toAtomString(),
            'changefreq' => 'monthly',
            'priority' => '0.7',
        ]);
    }

    // Achievements index
    $urls->push(['loc' => url('/achievements'), 'changefreq' => 'weekly', 'priority' => '0.8']);

    // Achievement detail pages
    foreach ($achievements as $a) {
        $urls->push([
            'loc' => url("/achievements/{$a->id}"),
            'lastmod' => $a->updated_at?->toAtomString(),
            'changefreq' => 'monthly',
            'priority' => '0.6',
        ]);
    }

    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
    foreach ($urls as $u) {
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$u['loc']}</loc>\n";
        if (!empty($u['lastmod'])) $xml .= "    <lastmod>{$u['lastmod']}</lastmod>\n";
        $xml .= "    <changefreq>{$u['changefreq']}</changefreq>\n";
        $xml .= "    <priority>{$u['priority']}</priority>\n";
        $xml .= "  </url>\n";
    }
    $xml .= '</urlset>';

    return response($xml, 200)->header('Content-Type', 'application/xml');
})->name('sitemap');

// Public API routes
Route::prefix('api')->name('api.')->group(function () {
    Route::middleware('throttle:30,1')->group(function () {
        Route::get('/wakatime/{username}/{shareId}', [App\Http\Controllers\Api\WakaTimeController::class, 'show'])
            ->where(['username' => '[A-Za-z0-9_-]{1,39}', 'shareId' => '[A-Za-z0-9_-]{1,100}'])
            ->name('wakatime.show');
        Route::get('/github/{username}', [App\Http\Controllers\Api\GitHubController::class, 'show'])
            ->where('username', '[A-Za-z0-9-]{1,39}')
            ->name('github.show');
        Route::get('/github/{username}/readme', [App\Http\Controllers\Api\GitHubController::class, 'readme'])
            ->where('username', '[A-Za-z0-9-]{1,39}')
            ->name('github.readme');
    });
});

require __DIR__.'/auth.php';
