import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with ${form.email}`);
  };

  const handleSocial = (provider) => {
    alert(`Social login with ${provider} (UI only)`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-[#0a0118] to-[#1a0735]">
      <div className="w-full max-w-md bg-white/6 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 shadow-[0_0_25px_rgba(168,85,247,0.12)] animate-slideDown">

        {/* header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-white">Welcome Back</h2>
          <p className="text-purple-200 mt-2">Login to continue booking your tickets</p>
        </div>

        {/* social buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => handleSocial("Google")}
            className="flex-1 flex items-center justify-center gap-3 py-2 rounded-lg bg-white/8 hover:bg-white/12 transition social-glow"
          >
            <FaGoogle className="text-white" />
            <span className="text-white">Continue with Google</span>
          </button>

          <button
            onClick={() => handleSocial("Facebook")}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#2b2b80]/60 hover:bg-[#2b2b80]/80 transition social-glow"
          >
            <FaFacebookF className="text-white" />
          </button>
        </div>

        <div className="relative my-4">
          <div className="h-[1px] bg-purple-700/30" />
          <p className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0a0118] px-3 text-xs text-purple-200">OR</p>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* email */}
          <div className="relative">
            <input
              required
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-400/20 text-white outline-none
                         focus:border-purple-400 focus:ring-2 focus:ring-purple-600/30"
            />

            <label
              className="absolute left-4 text-purple-300 text-sm top-3 pointer-events-none 
                         transition-all duration-200
                         peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
                         peer-focus:-top-3 peer-focus:text-xs
                         peer-valid:-top-3 peer-valid:text-xs"
            >
              Email Address
            </label>
          </div>

          {/* password */}
          <div className="relative">
            <input
              required
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder=" "
              className="peer w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-400/20 text-white outline-none
                         focus:border-purple-400 focus:ring-2 focus:ring-purple-600/30 pr-12"
            />

            <label
              className="absolute left-4 text-purple-300 text-sm top-3 pointer-events-none
                         transition-all duration-200
                         peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
                         peer-focus:-top-3 peer-focus:text-xs
                         peer-valid:-top-3 peer-valid:text-xs"
            >
              Password
            </label>

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black-200 hover:black-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm text-purple-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-pink-500" />
              Remember me
            </label>
            <Link to="/forgot" className="hover:text-white">Forgot Password?</Link>
          </div>

          <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg shadow-xl hover:scale-[1.01] transition-all">
            Login
          </button>
        </form>

        <p className="text-center text-purple-300 mt-6">
          Don't have an account? <Link to="/register" className="text-pink-400 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
