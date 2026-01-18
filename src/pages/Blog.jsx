import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";

export default function Blog() {
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadBlog();
    loadRelatedBlogs();
  }, [id]);

  async function loadBlog() {
    try {
      const res = await api.get("/public/blogs");
      const data = res.data || [];
      const found = data.find((b) => String(b.id) === String(id));
      setBlog(found || null);
    } catch (e) {
      console.error("Error loading blog:", e);
    } finally {
      setLoading(false);
    }
  }

  async function loadRelatedBlogs() {
    try {
      const res = await api.get("/public/blogs");
      const filtered = (res.data || [])
        .filter((b) => String(b.id) !== String(id))
        .slice(0, 3);
      setRelatedBlogs(filtered);
    } catch (e) {
      console.error("Error loading related blogs:", e);
    }
  }

  function handleCommentSubmit() {
    if (inputComment.trim()) {
      setComments([...comments, inputComment]);
      setInputComment("");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-950 to-black text-white">
        Loading blog...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-950 to-black text-white">
        Blog not found
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-900 via-purple-950 to-black min-h-screen text-white pt-28 pb-20 px-6 md:px-32">

      {/* HEADER IMAGE */}
      <img
        src={blog.imageUrl ? `http://localhost:8080${blog.imageUrl}` : "https://via.placeholder.com/1200x600"}
        alt={blog.title}
        className="rounded-3xl w-full h-[450px] object-cover shadow-2xl"
      />

      {/* TITLE */}
      <h1 className="text-5xl font-extrabold mt-10 leading-tight">
        {blog.title}
      </h1>

      <p className="text-purple-300 mt-2">
        Blog • {new Date().toDateString()}
      </p>

      {/* AUTHOR */}
      <div className="flex items-center gap-4 mt-6 bg-purple-800/40 p-5 rounded-2xl w-fit">
        <img
          src={`https://ui-avatars.com/api/?name=${blog.author}&background=7e22ce&color=fff`}
          className="w-16 h-16 rounded-full border-4 border-purple-500"
        />
        <div>
          <h3 className="font-bold text-xl">{blog.author}</h3>
          <p className="text-purple-300 text-sm">Blog Author</p>
        </div>
      </div>

      {/* CONTENT */}
      <p className="mt-8 leading-7 text-lg text-purple-100 whitespace-pre-line">
        {blog.content}
      </p>

      {/* SHARE */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3">Share:</h3>
        <div className="flex gap-4 text-2xl cursor-pointer">
          <i className="fab fa-facebook hover:text-pink-500"></i>
          <i className="fab fa-instagram hover:text-pink-500"></i>
          <i className="fab fa-twitter hover:text-pink-500"></i>
          <i className="fab fa-whatsapp hover:text-pink-500"></i>
        </div>
      </div>

      {/* RELATED BLOGS */}
      {relatedBlogs.length > 0 && (
        <>
          <h2 className="text-3xl font-bold mt-16 mb-6">Related Posts</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedBlogs.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/blog/${item.id}`)}
                className="bg-purple-800/30 rounded-3xl p-4 hover:shadow-lg hover:shadow-purple-500/30 transition cursor-pointer"
              >
                <img
                  src={item.imageUrl ? `http://localhost:8080${item.imageUrl}` : "https://via.placeholder.com/600x400"}
                  className="rounded-2xl h-52 w-full object-cover"
                />
                <h3 className="font-bold mt-4 text-lg">{item.title}</h3>
                <p className="text-purple-200 text-sm mt-1">
                  Blog • {new Date().toDateString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* COMMENTS */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold">Comments</h2>

        <div className="mt-6 flex gap-4">
          <input
            className="w-full px-4 py-3 rounded-xl bg-purple-800/40 border border-purple-600 outline-none"
            placeholder="Write a comment..."
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
          />
          <button
            onClick={handleCommentSubmit}
            className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-xl font-bold"
          >
            Post
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {comments.map((c, i) => (
            <p key={i} className="bg-purple-800/20 p-4 rounded-xl">{c}</p>
          ))}
        </div>
      </div>
    </div>
  );
}