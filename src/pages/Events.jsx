import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";


export default function MusicShow() {
  const events = [
    {
      day: "25",
      month: "August",
      time: "10:30 pm",
      title: "Alex Stork",
      role: "Rock Star",
      venue:
        "New School Tishman Auditorium, 63 5th Ave, New York, NY 10003, United States",
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    },
    {
      day: "1",
      month: "August",
      time: "8:30 pm",
      title: "Randall Walter",
      role: "Rock Star",
      venue: "Sydney Opera House Bennelong Point, Sydney NSW 2000, Australia",
      img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80",
    },
    {
      day: "16",
      month: "July",
      time: "6:00 pm",
      title: "Lillian Chapman",
      role: "Singer",
      venue: "Municipal Auditorium New Orleans, LA 70130, United States",
      img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    },
    {
      day: "10",
      month: "May",
      time: "5:30 pm",
      title: "Travis Hawkins",
      role: "Rock Star",
      venue:
        "New School Tishman Auditorium, 63 5th Ave, New York, NY 10003, United States",
      img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    },
    {
      day: "10",
      month: "May",
      time: "5:30 pm",
      title: "Travis Hawkins",
      role: "Rock Star",
      venue:
        "New School Tishman Auditorium, 63 5th Ave, New York, NY 10003, United States",
      img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    },
    {
      day: "10",
      month: "May",
      time: "5:30 pm",
      title: "Travis Hawkins",
      role: "Rock Star",
      venue:
        "New School Tishman Auditorium, 63 5th Ave, New York, NY 10003, United States",
      img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    },
  ];

 return (
  <div className="min-h-screen w-full text-white bg-gradient-to-br from-purple-900 via-purple-950 to-black">

    {/* HERO BANNER UPDATED */}
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
        <h1 className="text-lg md:text-5xl font-bold mt-4 drop-shadow-md">
          UPCOMING MUSICAL SHOW
        </h1>
        <p className="relative z-10 max-w-2xl mt-4 text-sm md:text-base text-purple-200 px-6">
          Musical show organized worldwide. Join easily through our platform
          and confirm your tickets instantly.
        </p>
      </div>
    </div>

    {/* EVENTS LIST */}
    <div className="px-6 md:px-20 pb-20 grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
      {events.map((e, idx) => (
        <div
          key={idx}
          className="flex bg-purple-900/60 backdrop-blur-xl rounded-[50px] overflow-hidden border border-purple-600/30 shadow-lg hover:scale-[1.02] transition"
        >
          <div className="w-1/3 flex flex-col justify-center items-center py-10 bg-pink-800/60">
            <h2 className="text-4xl font-bold">{e.day}</h2>
            <p className="text-purple-200">{e.month}</p>
            <div className="w-12 h-[1px] bg-purple-300 my-3"></div>
            <p className="text-sm text-purple-200">{e.time}</p>
          </div>

          <div className="w-1/3 flex flex-col justify-center p-6">
            <h2 className="text-2xl font-bold">{e.title}</h2>
            <p className="text-purple-300 text-sm">{e.role}</p>
            <p className="text-sm text-purple-200 mt-4">{e.venue}</p>
            <Link
              to="/event-schedule"
              className="mt-4 text-sm text-purple-300 hover:text-white transition flex items-center gap-2"
            >
              Get Ticket →
            </Link>
          </div>

          <div className="w-1/3 h-full">
            <img
              src={e.img}
              alt={e.title}
              className="w-full h-full object-cover rounded-r-[50px]"
            />
          </div>
        </div>
      ))}
    </div>

    {/* SPONSORS SLIDER (outside map) */}
    <div className="w-full py-16 bg-gradient-to-r from-purple-800/50 via-purple-900/50 to-purple-800/50">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Autoplay]}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="mySwiper"
      >
        <SwiperSlide className="flex justify-center">
          <img src="/logos/playmusic.png" alt="play music" className="h-24 object-contain opacity-90 hover:opacity-100 transition" />
        </SwiperSlide>

        <SwiperSlide className="flex justify-center">
          <img src="public/logos/musibeat.png" alt="musibeat" className="h-24 object-contain opacity-90 hover:opacity-100 transition" />
        </SwiperSlide>

        <SwiperSlide className="flex justify-center">
          <img src="/logos/soundbeat.png" alt="soundbeat" className="h-24 object-contain opacity-90 hover:opacity-100 transition" />
        </SwiperSlide>
      </Swiper>
    </div>

  </div>
);
}