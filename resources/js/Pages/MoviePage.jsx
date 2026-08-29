import Navbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";

export default function MoviePage({ movie, auth }) {
  const poster =
    movie?.movie_thumbnail ||
    "https://placehold.co/500x700/0f172a/f8fafc?text=Movie";

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
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
