import React from "react";

const venues = [
  {
    city: "Sydney",
    name: "Sydney Opera House",
    img: "https://images.unsplash.com/photo-1519730722595-a5ff788dea4a",
  },
  {
    city: "New York",
    name: "Beacon Theatre",
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
  },
  {
    city: "Chicago",
    name: "Goldstar Hall",
    img: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e",
  },
  {
    city: "Bristol",
    name: "Apollo Theatre",
    img: "https://images.unsplash.com/photo-1537202108838-e7072bad1927",
  },
  {
    city: "New York",
    name: "Royal Blue Hall",
    img: "https://images.unsplash.com/photo-1531164150241-5c9e4e9cfbc4",
  },
  {
    city: "Las Vegas",
    name: "Morlan de Theatre",
    img: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
  },
];

function Venue() {
  return (
    <div className="w-full min-h-screen">

      {/* ---------------- HERO SECTION ---------------- */}
      <div className="relative w-full h-[85vh] flex flex-col justify-center items-center text-center text-white overflow-hidden">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1500&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="banner"
        />

        {/* Purple gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 via-purple-800/70 to-purple-900/80"></div>

        {/* Text */}
        <h3 className="relative z-10 tracking-[0.3em] text-sm mb-4">
          CONCERT PLACES
        </h3>

        <h1 className="relative z-10 text-5xl md:text-6xl font-bold">
          OUR VENUES
        </h1>

        <p className="relative z-10 mt-6 max-w-xl text-purple-200 text-sm leading-relaxed">
          Musical show organized world wide, you can join this musical show very
          easily through this site and confirm your ticket with a click.
        </p>
      </div>

      {/* ---------------- VENUE CARDS GRID ---------------- */}
      <div className="w-full py-20 bg-gradient-to-b from-purple-900 via-purple-950 to-purple-900">

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">

          {venues.map((v, i) => (
            <div
              key={i}
              className="bg-purple-800/40 rounded-3xl p-4 pb-6 shadow-lg backdrop-blur-xl hover:scale-[1.02] transition cursor-pointer"
            >
              <img
                src={v.img}
                alt={v.name}
                className="rounded-2xl w-full h-[220px] object-cover mb-4"
              />

              <p className="text-purple-200 text-sm tracking-widest uppercase text-center">
                {v.city}
              </p>

              <h2 className="text-white text-xl font-semibold text-center mt-2">
                {v.name}
              </h2>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default Venue;
