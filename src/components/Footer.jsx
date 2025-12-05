import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaMusic, FaWaveSquare } from "react-icons/fa";

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-purple-900 via-purple-950 to-black text-white pt-20">
      
      <img
        src="https://t4.ftcdn.net/jpg/05/80/01/65/360_F_580016501_PFoRrHIWJYYwd2vLSRHTd1Ez0U1dvp0A.jpg"
        alt="wave overlay"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-10"
      />

      <div className="relative z-10">
        
        {/* NEWSLETTER */}
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-semibold tracking-wider">
            SUBSCRIBE OUR NEWSLETTER
          </h2>

          <div className="flex justify-center mt-6 px-4">
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full max-w-md px-6 py-3 rounded-l-full bg-purple-800/40 border border-purple-500 outline-none"
            />
            <button className="px-8 py-3 rounded-r-full bg-pink-600 hover:bg-pink-700 font-semibold">
              Subscribe
            </button>
          </div>

          <p className="text-purple-300 text-sm mt-4">
            * For weekly latest update and offers!
          </p>
        </div>

        <div className="border-t border-purple-700 w-11/12 mx-auto my-10"></div>

        {/* FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-10 md:px-20 pb-14">
          
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-pink-500 text-3xl">
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
              </span>
              RhythmX
            </h2>

            <p className="text-sm text-purple-300 mt-3 leading-relaxed">
              Musical shows organized worldwide — Join the rhythm experience!
            </p>

            <div className="flex gap-4 mt-4 text-purple-300 text-xl">
              <FaFacebookF className="hover:text-white cursor-pointer" />
              <FaInstagram className="hover:text-white cursor-pointer" />
              <FaTwitter className="hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">USEFUL LINK</h3>
            <ul className="space-y-2 text-purple-300">
              <li>About us</li>
              <li>Upcoming Events</li>
              <li>Performer</li>
              <li>Latest News</li>
              <li>Contact us</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">INFORMATION</h3>
            <ul className="space-y-2 text-purple-300">
              <li>Purchase Ticket</li>
              <li>Login/Register</li>
              <li>Style Guide</li>
              <li>Licenses</li>
              <li>Change Log</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">CONTACT</h3>
            <p className="text-purple-300 text-sm">
              254B, Main Town, North Street <br />
              Selex Tower, New York, USA
            </p>
            <p className="mt-3 text-sm text-purple-300">+14562 874 658</p>
            <p className="text-sm text-purple-300">+98745 612 321</p>
            <p className="mt-3 text-sm text-purple-300">info@rhythmx.com</p>
            <p className="text-sm text-purple-300">www.rhythmx.com</p>
          </div>
        </div>

        <div className="text-center border-t border-purple-700 py-4 text-sm text-purple-300">
          Copyright © RhythmX | Designed by Brandbes - Powered by Webflow
        </div>
      </div>

      {/* BACK TO TOP BUTTON */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-4 bg-pink-600 hover:bg-pink-700 rounded-full shadow-xl transition"
        >
          ↑
        </button>
      )}
    </footer>
  );
}
