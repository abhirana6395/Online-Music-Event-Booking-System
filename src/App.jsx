import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventSchedule from "./pages/EventSchedule";
import Login from "./pages/Login";
import Performers from "./pages/Performers";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import LatestNews from "./pages/LatestNews";
import BlogDetail from "./pages/BlogDetail";
import Ticket from "./pages/Ticket";
import Venue from "./pages/Venue";
import Register from "./pages/Register";

// ADMIN
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminEvents from "./admin/pages/AdminEvents";
import AdminPerformers from "./admin/pages/AdminPerformers";
import AdminBlogs from "./admin/pages/AdminBlogs";
import AdminVenue from "./admin/pages/AdminVenue";
import AdminTickets from "./admin/pages/AdminTickets";
import AdminLogin from "./admin/pages/AdminLogin";

function Layout() {
  const location = useLocation();

  // pages jaha NAVBAR blur & FOOTER hide hoga
  const authPages = ["/login", "/register"];

  const isAuthOrAdminPage = authPages.includes(location.pathname) || location.pathname.startsWith("/admin");

  return (
    <>
      {/* Navbar -> always shown but blur on auth pages */}
      <Navbar isBlur={isAuthOrAdminPage} />

      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/performers" element={<Performers />} />
        <Route path="/event-schedule" element={<EventSchedule />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<LatestNews />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN PANEL - NO NAV, NO FOOTER */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="performers" element={<AdminPerformers />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="venue" element={<AdminVenue />} />
          <Route path="tickets" element={<AdminTickets />} />
        </Route>
      </Routes>

      {/* Footer hide on login/register and admin */}
      {!isAuthOrAdminPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
