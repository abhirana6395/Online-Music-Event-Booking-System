import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function Venue() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVenues();
  }, []);

  async function loadVenues() {
    try {
      const res = await api.get("/public/venues");
      setVenues(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading venues...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-950 to-black py-24 px-6">
      
      {/* ===== HEADER ===== */}
      <h1 className="text-xl md:text-4xl text-center text-white font-extrabold mb-20 tracking-widest">
        OUR VENUES
      </h1>

      {/* ===== GRID ===== */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {venues.map((v) => (
          <div
            key={v.id}
            className="
              relative bg-purple-800/40 backdrop-blur-xl
              rounded-3xl p-6 text-center
              border border-purple-500/30
              shadow-[0_0_25px_rgba(168,85,247,0.35)]
              hover:shadow-[0_0_45px_rgba(236,72,153,0.8)]
              hover:-translate-y-2
              transition-all duration-300
            "
          >
            {/* ===== STATUS BADGE ===== */}
            <span
              className={`
                absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wide
                ${
                  v.status === "active"
                    ? "bg-green-500/20 text-green-300 border border-green-400/40"
                    : "bg-red-500/20 text-red-300 border border-red-400/40"
                }
              `}
            >
              {v.status?.toUpperCase()}
            </span>

            {/* ===== CITY ===== */}
            <p className="text-purple-300 text-sm uppercase tracking-widest">
              {v.city}
            </p>

            {/* ===== NAME ===== */}
            <h2 className="text-white text-2xl font-bold mt-3">
              {v.name}
            </h2>

            {/* ===== DIVIDER ===== */}
            <div className="w-16 h-[2px] bg-purple-400 mx-auto my-4 rounded-full"></div>

            {/* ===== CAPACITY ===== */}
            <p className="text-purple-200 text-sm">
              Capacity:{" "}
              <span className="font-semibold text-white">
                {v.capacity}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}