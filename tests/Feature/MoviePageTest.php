<?php

namespace Tests\Feature;

use Database\Seeders\MovieSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class MoviePageTest extends TestCase
{
    use RefreshDatabase;
    use WithoutMiddleware;

    public function test_movie_booking_page_loads(): void
    {
        $this->seed(MovieSeeder::class);

        $response = $this->get('/movies/1');

        $response->assertOk();
    }

    public function test_movie_page_uses_compact_header_spacing(): void
    {
        $moviePageSource = file_get_contents(resource_path('js/Pages/MoviePage.jsx'));
        $navbarSource = file_get_contents(resource_path('js/Components/Navbar.jsx'));

        $this->assertStringNotContainsString('py-10', $moviePageSource);
        $this->assertStringContainsString('mt-6 max-w-5xl', $moviePageSource);
        $this->assertStringNotContainsString('py-5', $navbarSource);
    }
}
