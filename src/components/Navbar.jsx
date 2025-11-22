import { Link } from "react-router-dom";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isMusicShowOpen, setIsMusicShowOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  return (
    <nav className="w-full absolute top-0 left-0 z-50 text-white px-6 py-4 flex items-center justify-between">
      
      {/* LEFT - LOGO */}
      <div className="flex items-center gap-3">
        {/* Sound Wave Icon */}
        <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-white/10 backdrop-blur-md">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12c3-8 6 8 9 0s6 8 9 0" />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold tracking-wide drop-shadow-lg">
          RhythmX
        </h1>
      </div>

      {/* CENTER - NAV LINKS */}
      <div className="hidden md:flex items-center gap-10 text-lg">
        <Link to="/" className="hover:text-purple-300 transition">Home</Link>
        <Link to="/performers" className="hover:text-purple-300 transition">Performers</Link>
        
        {/* MUSIC SHOW DROPDOWN */}
        <div 
          className="relative"
          onMouseEnter={() => setIsMusicShowOpen(true)}
          onMouseLeave={() => setIsMusicShowOpen(false)}
        >
          <button className="flex items-center gap-1 hover:text-purple-300 transition">
            Music Show
            <ChevronDown size={18} className={`transition-transform ${isMusicShowOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isMusicShowOpen && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden">
              <Link 
                to="/events" 
                className="block px-6 py-3 hover:text-purple-600 transition"
              >
                Event
              </Link>
              <Link 
                to="/event-schedule" 
                className="block px-6 py-3 hover:text-purple-600 transition"
              >
                Event Schedule
              </Link>
            </div>
          )}
        </div>

        {/* PAGES DROPDOWN */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPagesOpen(true)}
          onMouseLeave={() => setIsPagesOpen(false)}
        >
          <button className="flex items-center gap-1 hover:text-purple-300 transition">
            Pages
            <ChevronDown size={18} className={`transition-transform ${isPagesOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isPagesOpen && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-white text-gray-800  rounded-lg shadow-xl overflow-hidden">
              <Link 
                to="/about" 
                className="block px-6 py-3 hover:text-purple-600 transition"
              >
                About Us
              </Link>
              <Link 
                to="/vanue" 
                className="block px-6 py-3 hover:text-purple-600 transition"
              >
                Vanue
              </Link>
              <Link 
                to="/ticket" 
                className="block px-6 py-3 hover:text-purple-600 transition"
              >
                Ticket
              </Link>
              <Link 
                to="/style" 
                className="block px-6 py-3 hover:text-purple-600 transition"
              >
                Style Guide
              </Link>
              <Link 
                to="/licenses" 
                className="block px-6 py-3 hover:text-purple-600 transition"
              >
                Licenses
              </Link>
              <Link 
                to="/changelog" 
                className="block px-6 py-3 hover:text-purple-600 transition"
              >
                Changelog
              </Link>
            </div>
          )}
        </div>

        <Link to="/blog" className="hover:text-purple-300 transition">Blog</Link>
        <Link to="/contact" className="hover:text-purple-300 transition">Contacts</Link>
      </div>

      {/* RIGHT - Cart + Buy Ticket */}
      <div className="flex items-center gap-4">
        <button className="relative">
          <ShoppingCart size={26} className="text-white hover:text-purple-300" />
        </button>

        <button className="bg-pink-600 hover:bg-pink-700 px-5 py-2 rounded-full font-semibold shadow-md transition">
          Buy Ticket
        </button>
      </div>
    </nav>
  );
}

export default Navbar;