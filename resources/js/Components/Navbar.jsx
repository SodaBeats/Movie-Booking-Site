import ApplicationLogo from "./ApplicationLogo";
import Dropdown from "./Dropdown";

export default function Navbar({ Link, auth = null }) {
  const user = auth?.user ?? null;

  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
      <ApplicationLogo />
      <nav className="flex items-center gap-3">
        {user ? (
          <Dropdown>
            <Dropdown.Trigger>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:text-white"
              >
                {user.name}
                <svg
                  className="-me-0.5 ms-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Dropdown.Trigger>

            <Dropdown.Content>
              <Dropdown.Link
                href={route("profile.edit")}
                className="text-slate-700"
              >
                Profile
              </Dropdown.Link>
              <Dropdown.Link
                href={route("logout")}
                method="post"
                as="button"
                className="text-slate-700"
              >
                Log Out
              </Dropdown.Link>
            </Dropdown.Content>
          </Dropdown>
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
