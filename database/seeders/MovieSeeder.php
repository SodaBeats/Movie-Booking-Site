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
            'movie_name' => 'Deadpool and Wolverine',
            'director' => 'Christopher Nolan',
            'description' => 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
            'movie_thumbnail' => 'thumbnails/portrait1.jpg',
            'movie_poster' => 'posters/landscape1.jpg',
        ]);

        Movie::create([
            'movie_name' => 'Land of Mine',
            'director' => 'Wes Anderson',
            'description' => 'The adventures of a legendary concierge at a famous European hotel between the wars.',
            'movie_thumbnail' => 'thumbnails/portrait2.jpg',
            'movie_poster' => 'posters/landscape2.jpg',
        ]);

        Movie::create([
            'movie_name' => 'Midway',
            'director' => 'Ben Stiller',
            'description' => 'A movie about strange happenings in the woods.',
            'movie_thumbnail' => 'thumbnails/portrait3.jpg',
            'movie_poster' => 'posters/landscape3.jpg',
        ]);

        Movie::create([
            'movie_name' => 'Resident Evil: Veronica',
            'director' => 'Leon Kennedy',
            'description' => 'Zombies, badassery, and a lot of action.',
            'movie_thumbnail' => 'thumbnails/portrait1.jpg',
            'movie_poster' => 'posters/landscape1.jpg',
        ]);

        Movie::create([
            'movie_name' => 'The Men Who Stare at Goats',
            'director' => 'The Goatman',
            'description' => 'Some weird things about goats.',
            'movie_thumbnail' => 'thumbnails/portrait2.jpg',
            'movie_poster' => 'posters/landscape2.jpg',
        ]);
    }
}
