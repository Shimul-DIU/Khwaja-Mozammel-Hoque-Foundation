// src/components/Banner.tsx
"use client";

import Link from "next/link";

export default function Banner() {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative w-full min-h-screen rounded-2xl  shadow-sm border border-gray-200 bg-cover bg-left md:bg-top-left  "
          style={{
            backgroundImage: "url('/banner1.jpg')",
            backgroundRepeat: "no-repeat",
            // bg-position: left (Tailwind class 'bg-left' দিয়ে কাজ করবে)
          }}
        >
          {/* ওভারলে – বাম থেকে ডানে ফেইড */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

          {/* কন্টেন্ট – বাম দিকে সেন্টার করা */}
          <div className="absolute z-10 sm:top-1/3 top-4/12 flex items-center">
            <div className="p-6  sm:p-10 lg:p-12 max-w-2xl text-white space-y-2 sm:space-y-5">
              <span className="inline-block text-xs sm:text-sm font-semibold text-gold tracking-wide uppercase">
                Welcome to Khwaja Mozammel Hoque (R) Foundation
              </span>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Support Cause, <br />
                <span className="text-gold font-extrabold">Spread Hope Today.</span>
              </h1>

              <p className="text-sm sm:text-base text-white/80 max-w-md">
                Join us in making a difference through Sadka-E-Zaria, Scholarships, and Health Support.
              </p>

              <div className="pt-2  flex flex-wrap gap-3">
                <Link
                  href="/donate"
                  className="bg-[#008E48] hover:bg-[#006648] text-white font-bold px-6 py-2.5 rounded-lg transition-all text-sm shadow-md hover:scale-105 active:scale-95"
                >
                  Donate Now
                </Link>
                <Link
                  href="/activities"
                  className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-semibold px-6 py-2.5 rounded-lg transition-all text-sm hover:scale-105"
                >
                  All Activities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}