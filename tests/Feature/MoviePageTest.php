<?php

namespace Tests\Feature;

use App\Models\Movie;
use App\Models\Showtime;
use App\Models\User;
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

    public function test_movie_page_book_now_redirects_guests_to_login(): void
    {
        $moviePageSource = file_get_contents(resource_path('js/Pages/MoviePage.jsx'));
        $welcomePageSource = file_get_contents(resource_path('js/Pages/Welcome.jsx'));

        $this->assertStringContainsString('route("login")', $moviePageSource);
        $this->assertStringContainsString('route("login")', $welcomePageSource);
        $this->assertStringContainsString('!auth?.user', $moviePageSource);
        $this->assertStringContainsString('!auth?.user', $welcomePageSource);
    }

    public function test_movie_page_tracks_booking_submit_state_and_disables_button(): void
    {
        $pageSource = file_get_contents(resource_path('js/Pages/MoviePage.jsx'));

        $this->assertStringContainsString('const [isSubmitting, setIsSubmitting] = useState(false);', $pageSource);
        $this->assertStringContainsString('setIsSubmitting(true);', $pageSource);
        $this->assertStringContainsString('setIsSubmitting(false);', $pageSource);
        $this->assertStringContainsString('disabled={isSubmitting || !selectedShowtimeId}', $pageSource);
    }

    public function test_authenticated_user_can_create_booking_for_selected_showtime(): void
    {
        $movie = Movie::create([
            'movie_name' => 'Test Movie',
            'director' => 'Test Director',
            'description' => 'A test description.',
            'movie_thumbnail' => null,
        ]);
        $showtime = Showtime::create([
            'movie_id' => $movie->id,
            'show_date' => '2026-09-01',
            'show_time' => '18:30',
        ]);
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/bookings', [
                'movie_id' => $movie->id,
                'showtime_id' => $showtime->id,
                'seat_count' => 2,
            ])
            ->assertRedirect('/movies/' . $movie->id);

        $this->assertDatabaseHas('bookings', [
            'user_id' => $user->id,
            'movie_id' => $movie->id,
            'showtime_id' => $showtime->id,
            'seat_count' => 2,
        ]);
    }
}
