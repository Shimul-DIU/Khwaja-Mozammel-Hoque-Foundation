"use client";

import Link from "next/link";

export default function Banner() {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto ">
        <div
          className="relative h-[550px] sm:h-[650px] md:h-[700px] w-full bg-cover bg-left  overflow-hidden shadow-sm border border-gray-200"
          style={{
            backgroundImage: "url('/banner1.jpg')",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* ওভারলে – নিচ থেকে কালো শেড */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          {/* কন্টেন্ট – বাম দিকে সেন্টার্ড */}
          <div className="absolute z-10 top-2/5 md:top-3/6 lg:top-3/6 -translate-y-1/4 sm:-translate-y-1/3 left-6 sm:left-12 flex items-center pr-6">
            <div className="max-w-2xl text-white space-y-3 sm:space-y-5">
              <span className="text-xs sm:text-sm font-semibold text-gold tracking-wide uppercase">
                Welcome to Khwaja Mozammel Hoque (R) Foundation
              </span>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Support Cause, <br />
                <span className="text-gold font-extrabold">Spread Hope Today.</span>
              </h1>

              <p className="text-sm sm:text-base text-white/80 max-w-md">
                Join us in making a difference through Sadka-E-Zaria, Scholarships, and Health Support.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
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