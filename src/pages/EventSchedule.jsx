import React, { useState } from "react";

export default function EventSchedule() {
  const artists = [
    {
      name: "Kate Middleton",
      role: "Rock Star",
      img: "https://images.unsplash.com/photo-1598387993441-a364f854c3c3?auto=format&fit=crop&w=600&q=80",
      schedule: [
        {
          date: "25 August, 2023",
          time: "5.30 pm",
          place: "Sydney Opera House, Bennelong Point, Sydney NSW 2000, Australia",
        },
        {
          date: "30 August, 2023",
          time: "9.30 pm",
          place: "Sydney Opera House, Bennelong Point, Sydney NSW 2000, Australia",
        }
      ]
    },
    {
      name: "Randall Walter",
      role: "Rock Star",
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
      schedule: [
        {
          date: "20 July, 2023",
          time: "6.00 pm",
          place: "New York Music Arena, NY 10001, USA",
        }
      ]
    },
    {
      name: "Lillian Chapman",
      role: "Singer",
      img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
      schedule: [
        {
          date: "14 June, 2023",
          time: "7.00 pm",
          place: "Municipal Auditorium New Orleans, LA 70130, United States",
        }
      ]
    },
    {
      name: "Travis Hawkins",
      role: "Rock Star",
      img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
      schedule: [
        {
          date: "10 May, 2023",
          time: "5.30 pm",
          place: "New School Tishman Auditorium, New York, NY 10003, USA",
        }
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen w-full text-white bg-gradient-to-br from-purple-900 via-purple-950 to-black">

      {/* HERO SECTION */}
      <div
        className="relative h-[85vh] flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1500&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-purple-900/80"></div>

        <div className="relative z-10 mt-24">
          <h3 className="text-lg tracking-[0.3em] font-semibold text-purple-200">
            EVENT SCHEDULE
          </h3>
          <h1 className="text-lg md:text-5xl font-bold mt-4 drop-shadow-md">
            SHOW SCHEDULE
          </h1>
          <p className="relative z-10 max-w-2xl mt-4 text-sm md:text-base text-purple-200 px-6">
                      Musical show organized world wide, join this musical show easily and confirm your ticket with a click.
          </p>
        </div>
      </div>
      {/* TABS */}
      <div className="flex justify-center gap-2 bg-purple-950/40 backdrop-blur-md p-4">
        {artists.map((a, i) => (
          <button
            key={i}
            className={`px-6 py-3 rounded-t-lg text-sm font-semibold ${
              activeTab === i
                ? "bg-white text-purple-800"
                : "bg-purple-700/40 text-white hover:bg-purple-600"
            }`}
            onClick={() => setActiveTab(i)}
          >
            {a.name}
          </button>
        ))}
      </div>

      {/* CONTENT SECTION */}
      <div className="px-6 md:px-20 py-14">
        <div className="flex flex-col md:flex-row items-center gap-10 bg-blue-100 rounded-3xl p-10 shadow-lg border border-purple-500/30">

          {/* LEFT IMAGE */}
          <img
            src={artists[activeTab].img}
            alt={artists[activeTab].name}
            className="w-72 h-72 md:w-80 md:h-80 rounded-full object-cover border-4 border-purple-300"
          />

          {/* RIGHT CONTENT */}
          <div className="flex-1">
            <h2 className="text-3xl text-purple-600 font-bold">{artists[activeTab].name}</h2>
            <p className="text-purple-400">{artists[activeTab].role}</p>

            {artists[activeTab].schedule.map((s, idx) => (
              <div key={idx} className="mt-8">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-purple-600 opacity-70">Concert Date</p>
                    <h3 className="text-xl text-purple-500 font-semibold">{s.date}</h3>
                  </div>
                  <div>
                    <p className="text-sm text-purple-600 opacity-70">Concert Time</p>
                    <h3 className="text-xl text-purple-500 font-semibold">{s.time}</h3>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-purple-600 opacity-70">Concert Place</p>
                  <p className="text-lg text-purple-500">{s.place}</p>

                  <button className="mt-3 underline text-purple-600 hover:text-purple-900">
                    Buy Ticket
                  </button>
                </div>

                <hr className="my-6 border-purple-400/30" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
