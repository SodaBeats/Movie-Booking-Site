<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Movie;
use App\Models\Showtime;

class ShowtimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      $times = ['14:00', '17:30', '20:00'];

        Movie::all()->each(function (Movie $movie) use ($times) {
            foreach (range(0, 6) as $dayOffset) {
                $date = now()->addDays($dayOffset)->toDateString();

                foreach ($times as $time) {
                    Showtime::create([
                        'movie_id' => $movie->id,
                        'show_date' => $date,
                        'show_time' => $time,
                    ]);
                }
            }
        });
    }
}
