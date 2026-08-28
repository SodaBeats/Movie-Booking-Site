import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
  return (
    <>
      <Head title="Welcome" />

      <div className="min-h-screen bg-gray-50 text-gray-900">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-2xl font-bold tracking-tight text-gray-900">
            MovieBooking
          </div>

          <nav className="flex items-center gap-3">
            {auth.user ? (
              <Link
                href={route("dashboard")}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-gray-900"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href={route("login")}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-gray-900"
                >
                  Log in
                </Link>
                <Link
                  href={route("register")}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-gray-900"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </header>
      </div>
    </>
  );
}
