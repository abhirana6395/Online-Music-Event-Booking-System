
import React, {useEffect, useState} from "react";
import api from "../utils/api";
import buildImageUrl from "../utils/image";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function Performers() {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      loadPerformers();
}, []);

  async function loadPerformers() {
    try {
      const response = await api.get("/public/performers");
      setArtists(response.data || []);
    } catch (error) {
      console.error("Failed to load performers:", error);
    } finally {
      setLoading(false);
    }
  }
  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>);
  }

  return (
    <div className="min-h-screen w-full text-white">
      {/* HERO BANNER */}
      <div className="relative h-[85vh] pt-10 w-full flex flex-col justify-center items-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1500&q=80')",
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-b from-purple-700/70 via-purple-700/50 to-purple-900/80"></div>

        <h3 className="relative z-10 text-lg tracking-[0.3em] font-semibold text-purple-200">
          PERFORMER
        </h3>
        <h1 className="relative z-10 text-5xl font-bold mt-4">OUR PERFORMER</h1>
        <p className="relative z-10 max-w-2xl mt-4 text-sm md:text-base text-purple-200 px-6">
          Musical show organized world wide, you can join this musical show very easily through this site and confirm your ticket with a click.
        </p>
      </div>

      {/* PERFORMERS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 px-6 md:px-20 py-20 bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950">
        {artists.map((artist, idx) => (
          <div
            key={idx}
            className="bg-[#3a0072]/80 backdrop-blur-lg rounded-[60px] pt-14 pb-10 flex flex-col items-center border border-purple-500/40 shadow-2xl">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-purple-500">
              <img src={buildImageUrl(artist.image || artist.img)} alt={artist.name} className="w-full h-full object-cover" />
            </div>

            <h2 className="mt-6 text-2xl font-bold">{artist.name}</h2>
            <p className="text-purple-300 text-sm">{artist.role}</p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-6 text-purple-300">
              <FaFacebookF className="cursor-pointer hover:text-white transition" />
              <FaInstagram className="cursor-pointer hover:text-white transition" />
              <FaTwitter className="cursor-pointer hover:text-white transition" />
              <FaWhatsapp className="cursor-pointer hover:text-white transition" />
            </div>

            <p className="mt-4 text-sm uppercase tracking-wide text-purple-300">Follow</p>
          </div>
        ))}
      </div>
    </div>
  );
}
