import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1a103d] text-white p-5 space-y-6">
        <h1 className="text-2xl font-bold tracking-wide">Admin Panel</h1>

        <nav className="flex flex-col space-y-3">
          <NavLink to="dashboard" className="hover:bg-[#2b1a5a] p-2 rounded">
            Dashboard
          </NavLink>
          <NavLink to="events" className="hover:bg-[#2b1a5a] p-2 rounded">
            Events
          </NavLink>
          <NavLink to="performers" className="hover:bg-[#2b1a5a] p-2 rounded">
            Performers
          </NavLink>
          <NavLink to="blogs" className="hover:bg-[#2b1a5a] p-2 rounded">
            Blogs
          </NavLink>
          <NavLink to="venue" className="hover:bg-[#2b1a5a] p-2 rounded">
            Venue
          </NavLink>
          <NavLink to="tickets" className="hover:bg-[#2b1a5a] p-2 rounded">
            Tickets
          </NavLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
