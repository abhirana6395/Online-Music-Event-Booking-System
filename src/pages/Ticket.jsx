import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useSearchParams } from "react-router-dom";

export default function Ticket() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  const [tickets, setTickets] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  // user details (temporary – later auth se aayega)
  const [user, setUser] = useState({
    name: "Guest User",
    email: "guest@test.com",
  });

  // 🔹 Load tickets for selected event
  useEffect(() => {
    if (!eventId) {
      setLoading(false);
      return;
    }

    const loadTickets = async () => {
      try {
        const res = await api.get(`/public/tickets/event/${eventId}`);
        setTickets(res.data || []);
      } catch (err) {
        console.error("Failed to load tickets", err);
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, [eventId]);

  const openPopup = (ticket) => {
    setSelectedTicket(ticket);
    setOpenModal(true);
  };

  // 🔥 CONFIRM BOOKING (REAL API)
  const confirmBooking = async () => {
    if (!selectedTicket) return;

    try {
      await api.post("/bookings", {
        eventId: Number(eventId),
        ticketId: selectedTicket.id,
        quantity: 1,
        name: user.name,
        email: user.email,
      });

      alert("🎉 Ticket booked successfully!");
      setOpenModal(false);
    } catch (err) {
      alert("❌ Booking failed");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading tickets...
      </div>
    );
  }

  return (
    <div className="relative w-full bg-[#2D013C] text-white overflow-hidden">

      {/* ===== BACKGROUND ===== */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1500&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-purple-800/60 to-[#2D013C]" />

      {/* ===== HERO ===== */}
      <div className="relative text-center pt-32 pb-10">
        <h3 className="text-lg tracking-[0.35em] font-semibold text-purple-300">
          TICKET
        </h3>
        <h1 className="text-5xl md:text-6xl font-bold mt-4">
          Our Ticket
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-purple-200 opacity-90 px-6">
          Choose your ticket and confirm instantly.
        </p>
      </div>

      {/* ===== TICKETS ===== */}
      <div className="relative w-full py-20 flex flex-col md:flex-row justify-center gap-10 px-4">
        {tickets.length === 0 && (
          <div className="text-purple-200 text-lg">
            No tickets available
          </div>
        )}

        {tickets.map((t) => (
          <div
            key={t.id}
            className="
              bg-[#4A0170]/70 backdrop-blur-xl rounded-3xl 
              p-8 w-full md:w-80 text-center 
              border border-pink-400/40
              shadow-[0_0_35px_#ff00ff90]
              hover:shadow-[0_0_60px_#ff00ff]
              hover:-translate-y-2
              transition-all
            "
          >
            <h3 className="text-lg tracking-widest mb-4">
              <span className="bg-gradient-to-r from-pink-500/40 to-[#C300FF]/40 px-3 py-1 rounded-full">
                {t.category}
              </span>
            </h3>

            <h1 className="text-5xl font-bold mb-2">₹{t.price}</h1>
            <p className="text-sm text-purple-200 mb-6">
              Stock left: {t.stock}
            </p>

            <button
              disabled={t.stock <= 0}
              onClick={() => openPopup(t)}
              className="bg-[#A300E0] hover:bg-[#C300FF] px-8 py-3 rounded-full font-semibold disabled:opacity-50"
            >
              Purchase
            </button>
          </div>
        ))}
      </div>

      {/* ===== POPUP ===== */}
      {openModal && selectedTicket && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-lg z-50">
          <div className="bg-[#3A0155] p-8 rounded-3xl w-80 text-center border border-purple-400/40">

            <h2 className="text-2xl font-bold mb-3">Confirm Booking</h2>

            <p className="text-purple-200 mb-4">
              <strong>{selectedTicket.category}</strong><br />
              Price: ₹{selectedTicket.price}
            </p>

            <button
              onClick={confirmBooking}
              className="bg-[#A300E0] hover:bg-[#C300FF] px-6 py-2 rounded-full font-semibold w-full"
            >
              Confirm
            </button>

            <button
              onClick={() => setOpenModal(false)}
              className="block mx-auto mt-4 text-purple-300 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}