import React from "react";
import { blogData } from "../data/blogData";
import { useNavigate } from "react-router-dom";

export default function LatestNews() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white">
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
          BLOG
        </h3>
        <h1 className="relative z-10 text-5xl font-bold mt-4">LATEST NEWS</h1>
        <p className="relative z-10 max-w-2xl mt-4 text-sm md:text-base text-purple-200 px-6">
          Musical show organized world wide, you can join this musical show very easily through this site and confirm your ticket with a click.
        </p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-20 py-20 bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950">
        {blogData.map((post) => (
          <div key={post.id}
            className="bg-purple-800/20 rounded-3xl p-5 mb-10 shadow-md hover:shadow-purple-500/30 transition">

            <img src={post.image} className="rounded-3xl w-full h-72 object-cover" alt="" />

            <div className="flex justify-center -mt-8">
              <img src={post.authorImage} className="w-16 h-16 rounded-full border-4 border-purple-500" alt="" />
            </div>

            <p className="text-center text-purple-300 mt-4 text-sm tracking-wide">
              {post.category} - {post.date}
            </p>

            <h2 className="font-bold text-xl text-center mt-2">{post.title}</h2>

            <button
              onClick={() => navigate(`/blog/${post.id}`)}
              className="mt-6 text-center mx-auto block hover:underline">
              Read More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
