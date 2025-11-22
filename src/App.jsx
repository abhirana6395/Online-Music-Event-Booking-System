import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventSchedule from "./pages/EventSchedule";
import Login from "./pages/Login";
import Performers from "./pages/Performers";

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
      </Routes>
    </Router>
  );
}

export default App;
