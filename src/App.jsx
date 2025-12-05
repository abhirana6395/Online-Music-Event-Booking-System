import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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


function App() {
  return (
    <Router>
      <Navbar />
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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
