"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you ${name}! We have received your message.`);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className=" bg-[#F4EFEA] text-[#1A100E] px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-16 max-w-2xl">
          <div className="inline-block rounded-full bg-[#FAF7F2] border border-[#1A100E]/10 px-3 py-1 text-[10px] font-bold tracking-[2px] uppercase text-[#1A100E]/60 mb-3">
            Find Us
          </div>
          <h1 className="font-serif text-5xl font-bold tracking-tight text-[#1A100E] md:text-6xl mb-6">
            Visit the Verse, <br />
            <span className="text-[#C1440E]">share your story.</span>
          </h1>
          <p className="text-base text-[#1A100E]/80 leading-relaxed">
            Have a question about booking, private catering in Chattogram, or just want to tell us how much you loved the crust? Drop us a line.
          </p>
        </div>

        {/* Contact Info and Form Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* Left Side: Real Chattogram Contact Details */}
          <div className="space-y-8">
            
            {/* Address Block */}
            <div className="rounded-[24px] bg-[#FAF7F2] border border-[#1A100E]/10 p-8 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#1A100E] mb-3">Agrabad Branch</h3>
              <p className="text-sm text-[#1A100E]/80 leading-relaxed mb-4">
                Level 4, Chamber House, Agrabad Commercial Area,<br />
                Double Mooring, Chattogram, 4100
              </p>
              <p className="text-sm font-semibold text-[#C1440E]">+880 1712-345678</p>
              <p className="text-xs text-[#1A100E]/60 mt-1">info@pizzaverse.com</p>
            </div>

            {/* Opening Hours Block */}
            <div className="rounded-[24px] bg-[#FAF7F2] border border-[#1A100E]/10 p-8 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#1A100E] mb-4">Opening Hours</h3>
              <ul className="space-y-2.5 text-sm text-[#1A100E]/80">
                <li className="flex justify-between border-b border-[#1A100E]/5 pb-2">
                  <span>Sunday - Thursday</span>
                  <span className="font-semibold text-right">12:00 PM - 11:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-[#1A100E]/5 pb-2">
                  <span>Friday - Saturday</span>
                  <span className="font-semibold text-right">1:00 PM - 12:00 AM</span>
                </li>
                <li className="flex justify-between text-[#C1440E] font-semibold">
                  <span>Available Tonight</span>
                  <span className="text-right">Table 4, 8 & 12</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Side: Design Form matching your UI inputs */}
          <div className="rounded-[24px] border border-[#1A100E]/10 bg-[#FAF7F2] p-8 md:p-10 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#1A100E] mb-6">Send a Message</h3>
            
            <form onSubmit={handleSendMessage} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[1px] text-[#1A100E]/70 mb-2">Your Name</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                   
                  className="w-full rounded-xl border border-[#1A100E]/10 px-4 py-3 bg-[#FAF7F2] focus:border-[#C1440E] focus:outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[1px] text-[#1A100E]/70 mb-2">Email Address</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                 
                  className="w-full rounded-xl border border-[#1A100E]/10 px-4 py-3 bg-[#FAF7F2] focus:border-[#C1440E] focus:outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[1px] text-[#1A100E]/70 mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                 
                  className="w-full rounded-xl border border-[#1A100E]/10 px-4 py-3 bg-[#FAF7F2] focus:border-[#C1440E] focus:outline-none transition text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C1440E] text-[#F4EFEA] py-3.5 rounded-full font-semibold text-sm shadow-md hover:bg-[#A8380C] transition duration-200"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}