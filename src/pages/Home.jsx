import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [countdown, setCountdown] = useState({
    days: 40,
    hours: 16,
    minutes: 30,
    seconds: 15,
  });

  useEffect(() => {
    api.get("/events").then((res) => setEvents(res.data));
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Function to get progress percentage
  const getProgress = (label, value) => {
    switch (label) {
      case "Day":
        return (value / 40) * 100; // Total 40 days (your initial value)
      case "Hour":
        return (value / 24) * 100;
      case "Min":
        return (value / 60) * 100;
      case "Sec":
        return (value / 60) * 100;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen">
      {/* HERO Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1686242585106-f6f3547bc4ae?auto=format&fit=crop&w=1500&q=80')",
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-purple-800/60 to-blue-900/70"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-start h-full px-6 md:px-20 text-white pt-32 md:pt-40">
          <p className="text-sm md:text-base uppercase tracking-widest mb-1 text-purple-200 drop-shadow-lg">
            Welcome To
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-xl">
            RhythmX
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold mt-2 drop-shadow-xl">
            Feel The Beat. Live The Moment.
          </h2>
          <p className="max-w-xl mt-4 text-base text-purple-100 drop-shadow-md">
            Join the most electrifying musical events across the world. Book
            your tickets now and be part of the unforgettable night.
          </p>
          <button className="mt-6 bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-full text-base font-semibold transition-all duration-300 shadow-lg w-fit">
            Book Tickets
          </button>

          {/* COUNTDOWN TIMER */}
          <div className="mt-10 flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Left Text */}
            <div className="text-left">
              <p className="text-lg font-semibold tracking-wide">OUR NEXT</p>
              <p className="text-lg font-semibold tracking-wide">SHOW</p>
            </div>

            {/* TIMER CIRCLES */}
            <div className="flex gap-4 md:gap-6">
              {[
                { value: countdown.days, label: "Day" },
                { value: countdown.hours, label: "Hour" },
                { value: countdown.minutes, label: "Min" },
                { value: countdown.seconds, label: "Sec" },
              ].map((item, index) => {
                const radius = 42;
                const circumference = 2 * Math.PI * radius;
                const progress = getProgress(item.label, item.value);
                const offset = circumference - (progress / 100) * circumference;

                return (
                  <div
                    key={index}
                    className="relative flex flex-col items-center justify-center w-20 h-20 md:w-28 md:h-28"
                  >
                    {/* SVG PROGRESS RING */}
                    <svg
                      width="120"
                      height="120"
                      className="absolute top-0 left-0"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        stroke="white"
                        strokeWidth="6"
                        fill="transparent"
                        opacity="0.3"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        stroke="#fffeffff"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>

                    {/* VALUE TEXT */}
                    <div className="relative z-10 text-center">
                      <span className="text-2xl md:text-3xl font-bold">
                        {item.value}
                      </span>
                      <p className="text-xs md:text-sm uppercase">
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
