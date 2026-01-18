import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function LatestNews() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  async function loadBlogs() {
    try {
      const res = await api.get("/public/blogs");
      setBlogs(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white">

      {/* HERO */}
      <div className="relative h-[85vh] pt-10 w-full flex flex-col justify-center items-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1500&q=80')",
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-b from-purple-700/70 via-purple-700/50 to-purple-900/80"></div>

        <h3 className="relative z-10 text-lg tracking-[0.3em] font-semibold text-purple-200">
          BLOG
        </h3>
        <h1 className="relative z-10 text-5xl font-bold mt-4">
          LATEST NEWS
        </h1>
      </div>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-20 py-20 bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950">

        {loading && <div className="col-span-full text-center">Loading...</div>}

        {!loading && blogs.length === 0 && (
          <div className="col-span-full text-center">No blogs found</div>
        )}

        {blogs.map((post) => (
          <div
            key={post.id}
            className="bg-purple-800/20 rounded-3xl p-5 shadow-md hover:shadow-purple-500/30 transition"
          >
            <img
              src={post.imageUrl ? `http://localhost:8080${post.imageUrl}` : "https://via.placeholder.com/600x400"}
              className="rounded-3xl w-full h-72 object-cover"
            />

            <div className="flex justify-center -mt-8">
              <img
                src={`https://ui-avatars.com/api/?name=${post.author}&background=7e22ce&color=fff`}
                className="w-16 h-16 rounded-full border-4 border-purple-500"
              />
            </div>

            <p className="text-center text-purple-300 mt-4 text-sm">
              Blog • {new Date().toDateString()}
            </p>

            <h2 className="font-bold text-xl text-center mt-2">
              {post.title}
            </h2>

            <button
              onClick={() => navigate(`/blog/${post.id}`)}
              className="mt-6 text-center mx-auto block hover:underline"
            >
              Read More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}