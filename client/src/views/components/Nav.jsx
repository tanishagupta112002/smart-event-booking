import { NavLink } from "react-router-dom";

export default function Nav() {
  const baseLinkClass =
    "rounded-md px-3 py-2 text-lg font-medium transition-colors duration-300";

  const inactiveClass = "text-gray-300 hover:bg-indigo-500 hover:text-white";
  const activeClass = "bg-indigo-600 text-white";

  return (
    <nav className="bg-gray-800 relative z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center">
          <h2 className="text-[32px] font-semibold text-white">Smart Event Booking</h2>

          <div className="ml-auto flex space-x-4">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/events"
              className={({ isActive }) =>
                `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Events
            </NavLink>

            <NavLink
              to="/bookings"
              className={({ isActive }) =>
                `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Bookings
            </NavLink>

            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Admin
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
