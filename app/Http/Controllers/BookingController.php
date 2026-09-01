<?php

namespace App\Http\Controllers;

use App\Mail\BookingConfirmation;
use App\Models\Booking;
use App\Models\Movie;
use App\Models\Showtime;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $duplicateBookingMessage = 'You have already booked this showtime.';

        $validated = $request->validate([
            'movie_id' => ['required', 'integer', 'exists:movies,id'],
            'showtime_id' => [
                'required',
                'integer',
                'exists:showtimes,id',
                Rule::unique('bookings')->where(fn ($query) =>
                    $query->where('user_id', $request->user()->id)
                ),
            ],
            'seat_count' => ['required', 'integer', 'min:1', 'max:20'],
        ], [
            'showtime_id.unique' => $duplicateBookingMessage,
        ]);

        $movie = Movie::findOrFail($validated['movie_id']);
        $showtime = Showtime::with('movie')->findOrFail($validated['showtime_id']);

        if ($showtime->movie_id !== $movie->id) {
            return back()->withErrors([
                'showtime_id' => 'The selected showtime does not belong to this movie.',
            ])->withInput();
        }

        try {
            $booking = Booking::create([
                'user_id' => $request->user()->id,
                'movie_id' => $movie->id,
                'showtime_id' => $showtime->id,
                'seat_count' => $validated['seat_count'],
            ]);
        } catch (QueryException $e) {
            return back()->withErrors([
                'showtime_id' => $duplicateBookingMessage,
            ])->withInput();
        }

        $booking->load(['user', 'movie', 'showtime']);

        Mail::to($booking->user->email)->queue(new BookingConfirmation($booking));

        return Redirect::route('movies.show', ['id' => $movie->id])->with('success', 'Booking created successfully.');
    }
}