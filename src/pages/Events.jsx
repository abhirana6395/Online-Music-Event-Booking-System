import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

export default function MusicShow() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await api.get("/event");
      setEvents(res.data || []);
    } catch (err) {
      console.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const getDayMonth = (dateStr) => {
    const d = new Date(dateStr);
    return {
      day: d.getDate(),
      month: d.toLocaleString("default", { month: "long" }),
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading events...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full text-white bg-gradient-to-br from-purple-900 via-purple-950 to-black">
      {/* HERO */}
      <div
        className="relative h-[85vh] flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1500&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-purple-900/80"></div>

        <div className="relative z-10 mt-24">
          <h3 className="text-lg tracking-[0.3em] font-semibold text-purple-200">
            EVENT
          </h3>
          <h1 className="text-3xl md:text-5xl font-bold mt-4">
            UPCOMING MUSICAL SHOW
          </h1>
          <p className="max-w-2xl mt-4 text-sm md:text-base text-purple-200 px-6">
            Musical show organized worldwide. Join easily and confirm tickets instantly.
          </p>
        </div>
      </div>

      {/* EVENTS */}
      <div className="px-6 md:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {events.length === 0 && (
            <div className="col-span-full text-center text-purple-200">
              No events available
            </div>
          )}

          {events.map((e) => {
            const { day, month } = getDayMonth(e.date);

            return (
              <div
                key={e.id}
                className="flex bg-purple-900/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-purple-600/30 shadow-lg hover:scale-[1.02] transition"
              >
                {/* DATE */}
                <div className="w-32 flex-shrink-0 flex flex-col justify-center items-center py-10 bg-pink-800/60">
                  <h2 className="text-4xl font-bold">{day}</h2>
                  <p className="text-purple-200">{month}</p>
                  <div className="w-12 h-[1px] bg-purple-300 my-3"></div>
                  <p className="text-sm text-purple-200">{e.time}</p>
                </div>

                {/* DETAILS & IMAGE */}
                <div className="flex-1 flex">
                  {/* DETAILS */}
                  <div className="flex-1 flex flex-col justify-center p-6">
                    <h2 className="text-2xl font-bold">{e.title}</h2>
                    <p className="text-purple-300 text-sm">
                      {e.category || "Live Concert"}
                    </p>
                    <p className="text-sm text-purple-200 mt-4">{e.venue}</p>

                    <Link
                      to={`/ticket?eventId=${e.id}`}
                      className="mt-4 text-sm text-purple-300 hover:text-white transition inline-block"
                    >
                      Get Ticket →
                    </Link>
                  </div>

                  {/* IMAGE */}
                  <div className="w-40 flex-shrink-0">
                    <img
                      src={
                        e.imageUrl ||
                        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
                      }
                      alt={e.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SPONSORS SECTION */}
      <div className="relative w-full py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1500&q=80"
            alt="background"
            className="w-full h-full object-cover"
          />
          {/* Purple Blur Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/70 via-purple-900/80 to-indigo-900/70 backdrop-blur-sm"></div>
        </div>

        {/* Heading */}
        <h3 className="relative z-10 text-center text-lg tracking-[0.3em] font-semibold text-purple-200 mb-10">
          SPONSORS
        </h3>

        {/* Infinite Sliding Logos */}
        <div className="relative z-10 overflow-hidden">
          <style>
            {`
              @keyframes slide {
                from {
                  transform: translateX(0);
                }
                to {
                  transform: translateX(-50%);
                }
              }
              .animate-slide {
                animation: slide 30s linear infinite;
              }
            `}
          </style>
          <div className="flex items-center gap-20 animate-slide w-fit">
            {/* First set of logos */}
            <img
              src="./logos/Amazon.png"
              alt="Amazon"
              className="h-50 opacity-80 hover:opacity-100 transition drop-shadow-[0_0_12px_rgba(0,255,136,0.5)]"
            />
            <img
              src="./logos/Spotify.png"
              alt="Spotify"
              className="h-50 opacity-80 hover:opacity-100 transition drop-shadow-[0_0_12px_rgba(0,255,136,0.5)]"
            />
            <img
              src="./logos/Bandlab.png"
              alt="Bandlab"
              className="h-50 opacity-80 hover:opacity-100 transition drop-shadow-[0_0_12px_rgba(0,255,136,0.5)]"
            />
            <img
              src="./logos/Jazz.png"
              alt="Jazz"
              className="h-50 opacity-80 hover:opacity-100 transition drop-shadow-[0_0_12px_rgba(255,170,0,0.5)]"
            />
            <img
              src="./logos/Play.png"
              alt="Play"
              className="h-50 opacity-80 hover:opacity-100 transition drop-shadow-[0_0_12px_rgba(0,255,136,0.5)]"
            />
            <img
              src="./logos/Soundbeat.png"
              alt="Soundbeat"
              className="h-50 opacity-80 hover:opacity-100 transition drop-shadow-[0_0_12px_rgba(255,170,0,0.5)]"
            />
            <img
              src="./logos/Youtube.png"
              alt="Youtube"
              className="h-50 opacity-80 hover:opacity-100 transition drop-shadow-[0_0_12px_rgba(0,255,136,0.5)]"
            />
            
            {/* Duplicate set for seamless loop */}
            <img
              src="./logos/Amazon.png"
              alt="Amazon"
              className="h-50 opacity-80 hover:opacity-100 transition drop-shadow-[0_0_12px_rgba(0,255,136,0.5)]"
            />
            <img
              src="./logos/Spotify.png"
              alt="Spotify"
              className="h-50 opacity-80 hover:opacity-100 transition drop-shadow-[0_0_12px_rgba(0,255,136,0.5)]"
            />
            <img
              src="./logos/Bandlab.png"
              alt="Bandlab"
              className="h-50 opacity-80 hover:opacity-100 transition drop-shadow-[0_0_12px_rgba(0,255,136,0.5)]"
            />
            <img
              src="./logos/Jazz.png"
              alt="Jazz"
              className="h-50 opacity-80 hover:opacity-100 transition drop-shadow-[0_0_12px_rgba(255,170,0,0.5)]"
            />
            <img
              src="./logos/Play.png"
              alt="Play"
              className="h-50 opacity-80 hover:opacity-100 transition drop-shadow-[0_0_12px_rgba(0,255,136,0.5)]"
            />
            <img
              src="./logos/Soundbeat.png"
              alt="Soundbeat"
              className="h-50 opacity-80 hover:opacity-100 transition drop-shadow-[0_0_12px_rgba(255,170,0,0.5)]"
            />
            <img
              src="./logos/Youtube.png"
              alt="Youtube"
              className="h-50 opacity-80 hover:opacity-100 transition drop-shadow-[0_0_12px_rgba(0,255,136,0.5)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}