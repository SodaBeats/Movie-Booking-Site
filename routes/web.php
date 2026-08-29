<?php

use App\Http\Controllers\ProfileController;
use App\Models\Movie;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function () {
    $moviePosters = Movie::query()
        ->oldest('id')
        ->take(5)
        ->get()
        ->map(fn ($movie) => [
            'id' => $movie->id,
            'movie_name' => $movie->movie_name,
            'director' => $movie->director,
            'description' => $movie->description,
            'movie_poster' => $movie->movie_poster
                ? Storage::url($movie->movie_poster)
                : null,
        ])
        ->values();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'movie_posters' => $moviePosters,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
