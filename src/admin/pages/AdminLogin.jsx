import React, { useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    toast.error("Email & password required");
    return;
  }

  try {
    const res = await api.post("/admin/auth/login", {
      email: form.email,
      password: form.password,
    });

    // save token
    localStorage.setItem("adminToken", res.data.token);
    localStorage.setItem("adminEmail", res.data.email);

    toast.success("Login successful");

    // redirect to dashboard
    navigate("/admin/dashboard");
  } catch (err) {
    toast.error("Invalid credentials");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0118] to-[#1B0535] px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-purple-500/20 
      rounded-2xl p-8 shadow-[0_0_40px_rgba(168,85,247,0.25)] animate-fadeIn">

        {/* Header */}
        <div className="text-center mb-8">
          <ShieldCheck className="mx-auto text-purple-400" size={48} />
          <h1 className="text-3xl font-bold text-white mt-3">Admin Panel</h1>
          <p className="text-purple-300 text-sm mt-1">Only authorized personnel</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* EMAIL */}
          <div className="relative">
            <input
  type="email"
  name="email"
  placeholder=""
  onChange={handleChange}
  className="peer w-full p-3 rounded bg-white/5 border border-purple-300/20 text-white"
/>
<label className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 
peer-placeholder-shown:top-1/2 
peer-placeholder-shown:-translate-y-1/2 
peer-focus:-top-3 peer-focus:text-xs transition-all">Email</label>

          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full px-4 py-3 rounded-lg bg-white/5 text-white border border-purple-400/30 
              outline-none pr-12 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition"
            />
            <label
              className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 pointer-events-none 
              transition-all peer-placeholder-shown:text-base 
              peer-placeholder-shown:top-1/2 
              peer-focus:-top-3 peer-focus:text-xs"
            >
              Password
            </label>

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 
            text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
