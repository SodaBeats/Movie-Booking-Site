<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
  public function index()
  {
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

      $movieList = Movie::query()
        ->oldest('id')
        ->take(20)
        ->get()
        ->map(fn ($movie) => [
          'id' => $movie->id,
          'movie_name' => $movie->movie_name,
          'director' => $movie->director,
          'movie_thumbnail' => $movie->movie_thumbnail
              ? Storage::url($movie->movie_thumbnail)
              : null,
        ])
        ->values();

      return Inertia::render('Welcome', [
          'canLogin' => Route::has('login'),
          'canRegister' => Route::has('register'),
          'movie_posters' => $moviePosters,
          'movie_list' => $movieList,
      ]);
  }

  public function show($id)
  {
      $movie = Movie::query()->findOrFail($id);

      return Inertia::render('MoviePage', [
          'canLogin' => Route::has('login'),
          'canRegister' => Route::has('register'),
          'movie' => [
              'id' => $movie->id,
              'movie_name' => $movie->movie_name,
              'director' => $movie->director,
              'description' => $movie->description,
              'movie_thumbnail' => $movie->movie_thumbnail
                  ? Storage::url($movie->movie_thumbnail)
                  : null,
          ],
      ]);
  }
}
