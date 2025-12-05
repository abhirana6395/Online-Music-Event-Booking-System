import React, { useState } from "react";

export default function Ticket() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const plans = [
    {
      title: "SINGLE SHOW",
      price: "$102",
      features: [
        "Ticket for one Show",
        "One 500 ml water bottle",
        "VIP gate entry pass",
        "First row seat allow",
      ],
    },
    {
      title: "THREE SHOW",
      price: "$280",
      features: [
        "Ticket for three Shows",
        "One 500 ml water bottle",
        "VIP gate entry pass",
        "First row seat allow",
      ],
    },
    {
      title: "FULL SEASON",
      price: "$458",
      features: [
        "Ticket for full Season",
        "One 500 ml water bottle",
        "VIP gate entry pass",
        "First row seat allow",
      ],
    },
  ];

  const openPopup = (plan) => {
    setSelectedPlan(plan);
    setOpenModal(true);
  };

  return (
    <div className="relative w-full bg-[#2D013C] text-white overflow-hidden">

      {/* ===== BACKGROUND ===== */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1500&q=80')",
        }}
      ></div>

      {/* Purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-purple-800/60 to-[#2D013C]"></div>

      {/* ===== HERO TEXT ===== */}
      <div className="relative text-center pt-32 pb-10">
        <h3 className="text-lg tracking-[0.35em] font-semibold text-purple-300">
          TICKET
        </h3>

        <h1 className="text-5xl md:text-6xl font-bold mt-4 drop-shadow-xl">
          Our Ticket
        </h1>

        <p className="max-w-2xl mx-auto mt-4 text-purple-200 opacity-90 px-6">
          Musical show organized worldwide — join the musical show easily and
          confirm your ticket with just a click.
        </p>
      </div>

      {/* ===== PRICING CARDS ===== */}
      <div className="relative w-full py-20 flex flex-col md:flex-row justify-center gap-10 px-4">

        {plans.map((card, index) => (
          <div
            key={index}
            className="
               bg-[#4A0170]/70
  backdrop-blur-xl 
  rounded-3xl 
  p-8 
  w-full md:w-80 
  text-center 
  border border-pink-400/40
  shadow-[0_0_35px_#ff00ff90]
  hover:shadow-[0_0_60px_#ff00ff]
  hover:-translate-y-2
  hover:border-pink-500
  transition-all duration-300
            "
          >
            <h3 className="text-lg tracking-widest mb-4">
  <span className="
    bg-gradient-to-r from-pink/40 to-[#C300FF]/40 
    px-3 py-1 
    rounded-full 
    text-white 
    shadow-md 
    border border-white/10
  ">
    {card.title}
  </span>
</h3>


            <h1 className="text-5xl font-bold mb-8">{card.price}</h1>

            <ul className="space-y-3 text-sm opacity-90 mb-10">
              {card.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <button
              onClick={() => openPopup(card.title)}
              className="bg-[#A300E0] hover:bg-[#C300FF] transition-all px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-[0_0_20px_#ff00ff]"
            >
              Purchase
            </button>
          </div>
        ))}

      </div>

      {/* ===== MODAL POPUP ===== */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-lg z-50">
          <div className="bg-[#3A0155] p-8 rounded-3xl w-80 text-center shadow-[0_0_30px_#ff00ff] border border-purple-400/40">
            <h2 className="text-2xl font-bold mb-3">Purchase Ticket</h2>
            <p className="text-purple-200 mb-6">
              You selected:{" "}
              <span className="text-pink-400 font-semibold">{selectedPlan}</span>
            </p>

            <button className="bg-[#A300E0] hover:bg-[#C300FF] px-6 py-2 rounded-full font-semibold shadow-lg">
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
