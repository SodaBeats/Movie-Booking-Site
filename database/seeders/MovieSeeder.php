<?php

namespace Database\Seeders;

use App\Models\Movie;
use Illuminate\Database\Seeder;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Movie::query()->delete();

        Movie::create([
            'movie_name' => 'Inception',
            'director' => 'Christopher Nolan',
            'description' => 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
            'movie_thumbnail' => 'thumbnails/moviethumbnail.png',
            'movie_poster' => 'posters/movieposter.png',
        ]);

        Movie::create([
            'movie_name' => 'The Grand Budapest Hotel',
            'director' => 'Wes Anderson',
            'description' => 'The adventures of a legendary concierge at a famous European hotel between the wars.',
            'movie_thumbnail' => 'thumbnails/moviethumbnail.png',
            'movie_poster' => 'posters/movieposter.png',
        ]);

        Movie::create([
            'movie_name' => 'Into the Woods',
            'director' => 'Ben Stiller',
            'description' => 'A movie about strange happenings in the woods.',
            'movie_thumbnail' => 'thumbnails/moviethumbnail.png',
            'movie_poster' => 'posters/movieposter.png',
        ]);

        Movie::create([
            'movie_name' => 'Resident Evil: Veronica',
            'director' => 'Leon Kennedy',
            'description' => 'Zombies, badassery, and a lot of action.',
            'movie_thumbnail' => 'thumbnails/moviethumbnail.png',
            'movie_poster' => 'posters/movieposter.png',
        ]);

        Movie::create([
            'movie_name' => 'The Men Who Stare at Goats',
            'director' => 'Mr. Bean',
            'description' => 'Some weird things about goats.',
            'movie_thumbnail' => 'thumbnails/moviethumbnail.png',
            'movie_poster' => 'posters/movieposter.png',
        ]);
    }
}
