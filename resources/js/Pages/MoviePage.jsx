import Navbar from "@/Components/Navbar";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";

export default function MoviePage({ movie, auth, showtimes = [] }) {
  const poster =
    movie?.movie_thumbnail ||
    "https://placehold.co/500x700/0f172a/f8fafc?text=Movie";

  const availableDates = useMemo(
    () => [...new Set(showtimes.map((showtime) => showtime.show_date))],
    [showtimes],
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState(availableDates[0] ?? "");
  const [selectedShowtimeId, setSelectedShowtimeId] = useState(
    showtimes.find((showtime) => showtime.show_date === availableDates[0])
      ?.id ?? "",
  );
  const [seatCount, setSeatCount] = useState(1);

  useEffect(() => {
    if (!availableDates.length) {
      setSelectedDate("");
      setSelectedShowtimeId("");
      return;
    }

    if (!selectedDate || !availableDates.includes(selectedDate)) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates, selectedDate]);

  useEffect(() => {
    if (!selectedDate) {
      setSelectedShowtimeId("");
      return;
    }

    const firstSlotForDate = showtimes.find(
      (showtime) => showtime.show_date === selectedDate,
    );

    if (firstSlotForDate) {
      setSelectedShowtimeId((current) =>
        current &&
        showtimes.some(
          (showtime) =>
            showtime.id === current && showtime.show_date === selectedDate,
        )
          ? current
          : firstSlotForDate.id,
      );
    }
  }, [selectedDate, showtimes]);

  const slotsForSelectedDate = showtimes.filter(
    (showtime) => showtime.show_date === selectedDate,
  );

  const handleBookNow = () => {
    if (!auth?.user) {
      window.location.href = route("login");
      return;
    }

    setIsModalOpen(true);
  };

  const handleSubmitBooking = (event) => {
    event.preventDefault();

    if (!selectedShowtimeId || !movie?.id || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    router.post(
      route("bookings.store"),
      {
        movie_id: movie.id,
        showtime_id: selectedShowtimeId,
        seat_count: Number(seatCount),
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          setIsSubmitting(false);
          setIsModalOpen(false);
          setSeatCount(1);
        },
        onError: () => {
          setIsSubmitting(false);
        },
      },
    );
  };

  return (
    <>
      <Head
        title={
          movie?.movie_name ? `${movie.movie_name} | Booking` : "Movie Booking"
        }
      />

      <div className="min-h-screen bg-slate-950 px-4 pb-10 text-white sm:px-6 lg:px-8">
        <Navbar Link={Link} auth={auth} />
        <div className="mx-auto mt-6 max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
            <div className="w-full shrink-0 sm:w-44 md:w-48 lg:w-52">
              <img
                src={poster}
                alt={movie?.movie_name || "Movie poster"}
                className="h-auto w-full rounded-2xl object-cover shadow-lg shadow-red-950/40"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
                    Now showing
                  </p>
                  <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {movie?.movie_name || "Movie Title"}
                  </h1>
                  <p className="mt-2 text-lg text-slate-300">
                    Directed by {movie?.director || "Unknown Director"}
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300">
                {movie?.description ||
                  "A thrilling cinematic experience awaits. Book your seats and enjoy the show."}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <button
                  type="button"
                  className="rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
                  onClick={handleBookNow}
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl shadow-black/50">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Book {movie?.movie_name || "this movie"}
              </h2>
              <button
                type="button"
                className="text-sm text-slate-400 hover:text-white"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>

            {availableDates.length === 0 ? (
              <p className="text-slate-300">
                No showtimes are available for this movie right now.
              </p>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmitBooking}>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Date
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none ring-0 focus:border-red-500"
                  >
                    {availableDates.map((date) => (
                      <option key={date} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Time slot
                  </label>
                  <select
                    value={selectedShowtimeId}
                    onChange={(event) =>
                      setSelectedShowtimeId(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none ring-0 focus:border-red-500"
                  >
                    {slotsForSelectedDate.length > 0 ? (
                      slotsForSelectedDate.map((showtime) => (
                        <option key={showtime.id} value={showtime.id}>
                          {showtime.show_time}
                        </option>
                      ))
                    ) : (
                      <option value="">No slots available</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Seats
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={seatCount}
                    onChange={(event) => setSeatCount(event.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none ring-0 focus:border-red-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !selectedShowtimeId}
                  className="w-full rounded-full bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-slate-700"
                >
                  {isSubmitting ? "Processing..." : "Confirm booking"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
