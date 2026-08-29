import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Welcome({ auth, movie_posters = [], movie_list = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (movie_posters.length < 2) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % movie_posters.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movie_posters.length]);

  const activeMovie = movie_posters[activeIndex] ?? null;

  return (
    <>
      <Head title="Welcome" />

      <div className="min-h-screen bg-slate-950 text-white">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-2xl font-bold tracking-tight text-white">
            MovieBooking
          </div>

          <nav className="flex items-center gap-3">
            {auth.user ? (
              <Link
                href={route("dashboard")}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-200 transition hover:text-white"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href={route("login")}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-200 transition hover:text-white"
                >
                  Log in
                </Link>
                <Link
                  href={route("register")}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </header>

        <main className="mx-auto w-full max-w-7xl px-6 pb-16">
          <section className="hero-carousel">
            {movie_posters.length > 0 ? (
              <>
                {movie_posters.map((movie, index) => (
                  <div
                    key={movie.id ?? `${movie.movie_name}-${index}`}
                    className={`hero-slide ${index === activeIndex ? "active" : ""}`}
                    style={{
                      backgroundImage: movie.movie_poster
                        ? `linear-gradient(90deg, rgba(2,6,23,0.78), rgba(2,6,23,0.25)), url(${movie.movie_poster})`
                        : "linear-gradient(90deg, rgba(2,6,23,0.8), rgba(2,6,23,0.3))",
                    }}
                  >
                    <div className="hero-content">
                      <p className="hero-kicker">Now showing</p>
                      <h1>{movie.movie_name}</h1>
                      <p className="hero-meta">Directed by {movie.director}</p>
                      <p className="hero-description">{movie.description}</p>
                      <div className="hero-actions">
                        <button type="button" className="hero-primary">
                          Book now
                        </button>
                        <button type="button" className="hero-secondary">
                          View trailer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div
                  className="hero-controls"
                  aria-label="Hero carousel controls"
                >
                  <button
                    type="button"
                    className="control-button"
                    onClick={() =>
                      setActiveIndex(
                        (current) =>
                          (current - 1 + movie_posters.length) %
                          movie_posters.length,
                      )
                    }
                    aria-label="Previous slide"
                  >
                    ‹
                  </button>

                  <div className="dots" aria-label="Carousel dots">
                    {movie_posters.map((movie, index) => (
                      <button
                        key={`${movie.movie_name}-dot-${index}`}
                        type="button"
                        className={`dot ${index === activeIndex ? "active" : ""}`}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Go to ${movie.movie_name}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    className="control-button"
                    onClick={() =>
                      setActiveIndex((current + 1) % movie_posters.length)
                    }
                    aria-label="Next slide"
                  >
                    ›
                  </button>
                </div>
              </>
            ) : (
              <div className="hero-empty-state">
                <p>No movies available yet.</p>
              </div>
            )}
          </section>

          {activeMovie && (
            <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-200 shadow-2xl shadow-black/20">
              <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                Featured release
              </p>
              <div className="mt-3 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {activeMovie.movie_name}
                  </h2>
                  <p className="mt-1 text-slate-300">{activeMovie.director}</p>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-white hover:border-red-500 hover:text-red-400"
                >
                  Explore
                </button>
              </div>
            </section>
          )}

          <section className="mt-12">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Now showing</h2>
              <span className="text-sm text-slate-400">
                {movie_list.length} titles
              </span>
            </div>

            <div className="movie-list">
              {movie_list.map((movie, index) => (
                <article
                  key={`${movie.movie_name}-${index}`}
                  className="movie-card group cursor-pointer transition duration-300 ease-out"
                  onClick={() => router.visit(`/movies/${movie.id}`)}
                >
                  <img
                    src={
                      movie.movie_thumbnail ||
                      "https://placehold.co/300x450/0f172a/f8fafc?text=Movie"
                    }
                    alt={movie.movie_name}
                    className="movie-thumbnail transition duration-500 ease-out group-hover:scale-[1.06] group-hover:brightness-110 group-hover:blur-[0.4px]"
                  />
                  <div className="movie-card-body hover:text-orange-500">
                    <h3>{movie.movie_name}</h3>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
