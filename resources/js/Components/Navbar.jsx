export default function Navbar({ Link, auth = null }) {
  const user = auth?.user ?? null;

  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
      <div className="text-2xl font-bold tracking-tight text-white">
        <Link href={route("home")}>MovieBooking</Link>
      </div>

      <nav className="flex items-center gap-3">
        {user ? (
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
  );
}
