<?php

namespace Tests\Feature;

use App\Models\Movie;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class HeroCarouselTest extends TestCase
{
    use RefreshDatabase;

    public function test_homepage_loads_five_movie_posters_for_the_hero_carousel(): void
    {
        Movie::query()->delete();

        foreach (range(1, 5) as $index) {
            Movie::create([
                'movie_name' => "Movie {$index}",
                'director' => "Director {$index}",
                'description' => "Description {$index}",
                'movie_thumbnail' => "thumbnails/{$index}.jpg",
                'movie_poster' => "posters/{$index}.jpg",
            ]);
        }

        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('Welcome')
                ->has('movie_posters', 5)
                ->where('movie_posters.0.movie_name', 'Movie 1'));
    }
}
