import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogData } from "../data/blogData";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogData.find((item) => item.id === Number(id));

  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState("");

  const handleCommentSubmit = () => {
    if (inputComment.trim() !== "") {
      setComments([...comments, inputComment]);
      setInputComment("");
    }
  };

  const relatedPosts = blogData.filter((item) => item.id !== post.id);

  return (
    <div className="bg-gradient-to-br from-purple-900 via-purple-950 to-black min-h-screen text-white pt-28 pb-20 px-6 md:px-32">
      
      {/* HEADER IMAGE */}
      <img src={post.image} className="rounded-3xl w-full h-[450px] object-cover shadow-2xl" />

      {/* TITLE */}
      <h1 className="text-5xl font-extrabold mt-10 leading-tight">{post.title}</h1>

      <p className="text-purple-300 mt-2">{post.category} • {post.date}</p>

      {/* AUTHOR PROFILE */}
      <div className="flex items-center gap-4 mt-6 bg-purple-800/40 p-5 rounded-2xl w-fit">
        <img src={post.authorImage} className="w-16 h-16 rounded-full border-4 border-purple-500" />
        <div>
          <h3 className="font-bold text-xl">{post.authorName}</h3>
          <p className="text-purple-300 text-sm">Professional Music Artist</p>
        </div>
      </div>

      {/* ARTICLE CONTENT */}
      <p className="mt-8 leading-7 text-lg text-purple-100 whitespace-pre-line">{post.fullDesc}</p>

      {/* SHARE ICONS */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3">Share:</h3>
        <div className="flex gap-4 text-2xl cursor-pointer">
          <i className="fab fa-facebook hover:text-pink-500"></i>
          <i className="fab fa-instagram hover:text-pink-500"></i>
          <i className="fab fa-twitter hover:text-pink-500"></i>
          <i className="fab fa-whatsapp hover:text-pink-500"></i>
        </div>
      </div>

      {/* RELATED POSTS */}
      <h2 className="text-3xl font-bold mt-16 mb-6">Related Posts</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedPosts.map((item) => (
          <div
            key={item.id}
            className="bg-purple-800/30 rounded-3xl p-4 hover:shadow-lg hover:shadow-purple-500/30 transition cursor-pointer"
            onClick={() => navigate(`/blog/${item.id}`)}
          >
            <img src={item.image} className="rounded-2xl h-52 w-full object-cover" />
            <h3 className="font-bold mt-4 text-lg">{item.title}</h3>
            <p className="text-purple-200 text-sm mt-1">{item.category} - {item.date}</p>
          </div>
        ))}
      </div>

      {/* COMMENTS SECTION */}
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
            className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-xl font-bold"
            onClick={handleCommentSubmit}
          >
            Post
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {comments.map((c, index) => (
            <p key={index} className="bg-purple-800/20 p-4 rounded-xl">{c}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
