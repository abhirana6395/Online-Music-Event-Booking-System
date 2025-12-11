import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }
    alert(`Registering ${form.email}`);
  };

  const handleSocial = (provider) => {
    alert(`Social signup with ${provider} (UI only)`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-[#0a0118] to-[#1a0735]">
      <div className="w-full mt-18 max-w-md bg-white/6 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 shadow-[0_0_25px_rgba(168,85,247,0.12)] animate-slideDown">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-white">Create Account</h2>
          <p className="text-purple-200 mt-2">Join us & start booking your favorite events!</p>
        </div>

        {/* social */}
        <div className="flex gap-3 mb-6">
          <button onClick={() => handleSocial("Google")} className="flex-1 flex items-center justify-center gap-3 py-2 rounded-lg bg-white/8 hover:bg-white/12 transition social-glow">
            <FaGoogle className="text-white" /> <span className="text-white">Google</span>
          </button>
          <button onClick={() => handleSocial("Facebook")} className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#2b2b80]/60 hover:bg-[#2b2b80]/80 transition social-glow">
            <FaFacebookF className="text-white" />
          </button>
        </div>

        <div className="relative my-4">
          <div className="h-[1px] bg-purple-700/30" />
          <p className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0a0118] px-3 text-xs text-purple-200">OR</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* name */}
          <div className="relative">
            <input name="name" value={form.name} onChange={handleChange} placeholder=" " className="peer w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-400/20 text-white outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-600/30" />
            <label className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 text-sm pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:-top-3 peer-focus:translate-y-0 peer-focus:text-xs transition-all">Full Name</label>
          </div>

          {/* email */}
          <div className="relative">
            <input name="email" value={form.email} onChange={handleChange} placeholder=" " className="peer w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-400/20 text-white outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-600/30" />
            <label className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 text-sm pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:-top-3 peer-focus:translate-y-0 peer-focus:text-xs transition-all">Email address</label>
          </div>

          {/* password */}
          <div className="relative">
            <input name="password" value={form.password} onChange={handleChange} placeholder=" " type={showPassword ? "text" : "password"} className="peer w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-400/20 text-white outline-none pr-12 focus:border-purple-400 focus:ring-2 focus:ring-purple-600/30" />
            <label className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 text-sm pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:-top-3 peer-focus:translate-y-0 peer-focus:text-xs transition-all">Password</label>
            <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-200 hover:text-white">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>

          {/* confirm password */}
          <div className="relative">
            <input name="confirm" value={form.confirm} onChange={handleChange} placeholder=" " type={showConfirm ? "text" : "password"} className="peer w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-400/20 text-white outline-none pr-12 focus:border-purple-400 focus:ring-2 focus:ring-purple-600/30" />
            <label className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 text-sm pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:-top-3 peer-focus:translate-y-0 peer-focus:text-xs transition-all">Confirm Password</label>
            <button type="button" onClick={() => setShowConfirm(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-200 hover:text-white">{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>

          <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg shadow-xl hover:scale-[1.01] transition-all">Register</button>
        </form>

        <p className="text-center text-purple-300 mt-6">Already have an account? <Link to="/login" className="text-pink-400 hover:underline">Login</Link></p>
      </div>
    </div>
  );
}
