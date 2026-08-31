<x-mail::message>
# Booking Confirmed!

Hi {{ $booking->user->name }},

Your booking is confirmed. Here are the details:

<x-mail::table>
| Detail        | Info                                             |
|:------------- |:------------------------------------------------ |
| Movie         | {{ $booking->movie->movie_name }}                |
| Director      | {{ $booking->movie->director }}                  |
| Date          | {{ $booking->showtime->show_date }}               |
| Time          | {{ $booking->showtime->show_time }}               |
| Seats         | {{ $booking->seat_count }}                        |
</x-mail::table>

<x-mail::button :url="url('/bookings/' . $booking->id)">
View Booking
</x-mail::button>

Thanks for booking with us!

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>