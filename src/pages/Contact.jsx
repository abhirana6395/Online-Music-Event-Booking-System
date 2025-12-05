import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Message sent successfully!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          CONTACT US
        </h3>
        <h1 className="relative z-10 text-5xl font-bold mt-4">CONTACT INFO</h1>
        <p className="relative z-10 max-w-2xl mt-4 text-sm md:text-base text-purple-200 px-6">
          Musical show organized world wide, you can join this musical show very easily through this site and confirm your ticket with a click.
        </p>
        </div> 

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left - Form */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
          <p className="text-purple-200 mb-10 leading-relaxed">
            Musical show organized world wide, you can join musical show very easily through this site and confirm your
          </p>

          <div className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name*"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-2 border-purple-400/50 rounded-full px-6 py-4 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-all"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your mail here*"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-2 border-purple-400/50 rounded-full px-6 py-4 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-all"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <textarea
                name="message"
                placeholder="Write here*"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full bg-transparent border-2 border-purple-400/50 rounded-3xl px-6 py-4 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Send Now
            </button>
          </div>
        </div>

        {/* Right - Contact Info Card */}
        <div className="bg-gradient-to-b from-purple-800/40 to-purple-900/60 backdrop-blur-lg rounded-3xl p-10 border border-purple-500/30 shadow-2xl">
          {/* Address */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-4">Address</h3>
            <div className="h-0.5 w-full bg-purple-400/30 mb-6"></div>
            <p className="text-purple-100 leading-relaxed">
              254B, Main Town, North Street<br />
              Selex Tower, New York, USA
            </p>
          </div>

          {/* Call Us */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-4">Call Us</h3>
            <div className="h-0.5 w-full bg-purple-400/30 mb-6"></div>
            <p className="text-purple-100">+14562 874 658</p>
            <p className="text-purple-100">+98745 612 321</p>
          </div>

          {/* Email Us */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Email Us</h3>
            <div className="h-0.5 w-full bg-purple-400/30 mb-6"></div>
            <p className="text-purple-100">info@muvent.com</p>
            <p className="text-purple-100">www.muvent.com</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}