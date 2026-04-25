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

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/projects', [PublicProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{slug}', [PublicProjectController::class, 'show'])->name('projects.show');

Route::get('/achievements', [\App\Http\Controllers\AchievementController::class, 'index'])->name('achievements.index');
Route::get('/achievements/{achievement}', [\App\Http\Controllers\AchievementController::class, 'show'])->name('achievements.show');

Route::get('/admin', function () {
    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('projects', ProjectController::class);
    Route::resource('skills', SkillController::class);
    Route::resource('achievements', AchievementController::class);
    Route::resource('experiences', ExperienceController::class);
    Route::get('/settings', [App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
