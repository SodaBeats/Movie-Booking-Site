import { Link } from "@inertiajs/react";

export default function ApplicationLogo(props) {
  return (
    <div className="text-2xl font-bold tracking-tight text-white">
      <Link href={route("home")}>MovieBooking</Link>
    </div>
  );
}
