// / src/components/QuickDonationCard.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function QuickDonationCard() {
  const [fund, setFund] = useState("");
  const [contact, setContact] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ fund, contact, amount });
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="relative overflow-hidden bg-[#EEB84A] text-gray-900 rounded-2xl p-4 sm:p-8 shadow-lg">

        {/* Islamic Background Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.5) 1px, transparent 0)`,
            backgroundSize: '16px 16px'
          }}
        />

        <div className="relative z-10">
          {/* Section Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-[#1C2D27] mb-6 sm:mb-8">
            Make Your Donation
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

              {/* Donation Fund Field */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-gray-900">
                  Donation Fund <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <select
                    value={fund}
                    onChange={(e) => setFund(e.target.value)}
                    required
                    className="w-full bg-white text-gray-700 text-sm rounded-lg px-3 py-2.5 outline-none border border-transparent focus:border-emerald-600 appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select</option>
                    <option value="sadka">Sadka-E-Zaria</option>
                    <option value="scholarship">Scholarship</option>
                    <option value="health">Health Support</option>
                    <option value="general">General Donation</option>
                  </select>
                  {/* Custom Arrow */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Phone / Email Field */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1 text-xs sm:text-sm font-bold text-gray-900">
                  <span>Phone / Email <span className="text-red-600">*</span></span>
                  {/* Info Icon */}
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 bg-gray-800 text-white text-[10px] rounded-full font-normal cursor-help" title="Enter valid phone or email">
                    i
                  </span>
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Type mobile/email"
                  required
                  className="w-full bg-white text-gray-800 text-sm rounded-lg px-3 py-2.5 outline-none border border-transparent focus:border-emerald-600 placeholder:text-gray-400"
                />
              </div>

              {/* Donation Amount Field */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-gray-900">
                  Donation Amount <span className="text-red-600">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-700 font-medium text-sm">
                    ৳
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Write in number"
                    required
                    className="w-full bg-white text-gray-800 text-sm rounded-lg pl-7 pr-3 py-2.5 outline-none border border-transparent focus:border-emerald-600 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-[#008A4B] hover:bg-[#00753f] text-white font-bold py-2.5 px-6 rounded-lg transition-colors duration-200 shadow-md text-sm sm:text-base"
                >
                  Donate
                </button>
              </div>

            </div>
          </form>

          {/* Footer Notice */}
          <p className="text-center text-xs sm:text-sm font-medium text-gray-900 mt-6">
            You will receive tax relief when you donate to Khwaja Mozammel Hoque (R) Foundation.{" "}
            <Link href="/tax-info" className="text-[#006034] hover:underline font-bold">
              Click here to learn more
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}