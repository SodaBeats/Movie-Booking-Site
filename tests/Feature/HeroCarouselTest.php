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

    public function test_homepage_search_filters_movies_by_name_or_director(): void
    {
        Movie::query()->delete();

        Movie::create([
            'movie_name' => 'The Matrix',
            'director' => 'Lana Wachowski',
            'description' => 'A sci-fi classic.',
            'movie_thumbnail' => 'thumbnails/matrix.jpg',
            'movie_poster' => 'posters/matrix.jpg',
        ]);

        Movie::create([
            'movie_name' => 'Dune',
            'director' => 'Denis Villeneuve',
            'description' => 'A desert epic.',
            'movie_thumbnail' => 'thumbnails/dune.jpg',
            'movie_poster' => 'posters/dune.jpg',
        ]);

        $this->get('/?q=wachowski')
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('Welcome')
                ->has('movie_list', 1)
                ->where('movie_list.0.movie_name', 'The Matrix'));
    }
}
