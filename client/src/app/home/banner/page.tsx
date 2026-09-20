"use client";

import Link from "next/link";

export default function Banner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div
          className="relative h-[clamp(460px,52vw,600px)] w-full overflow-hidden bg-cover bg-[left_center] shadow-sm"
          style={{
            backgroundImage: "url('/banner-img.jpg')",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* ওভারলে – নিচ থেকে কালো শেড */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

          {/* কন্টেন্ট – বাম দিকে সেন্টার্ড */}
          <div className="absolute inset-0 z-10 flex items-center px-6 sm:px-12">
            <div className="max-w-2xl text-white space-y-3 sm:space-y-5">
              {/* <span className="text-xs sm:text-sm font-semibold text-gold tracking-wide uppercase">
                Welcome to Khwaja Mozammel Hoque (R) Foundation
              </span> */}

              <h1 className="text-2xl roboto-slab sm:text-4xl lg:text-5xl font-bold leading-tight">
                Khwaja Mozammel Hoque (R) Foundation <br />
                <span className="text-xl roboto-slab sm:text-2xl lg:text-3xl font-bold">A Sufi Based Organization.</span>
              </h1>

              <p className="text-sm  sm:text-base text-white/80 max-w-md">
                Join us in making a difference through Sadka-E-Zaria, Scholarships, and Health Support.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/donate"
                  className="bg-[#008E48] hover:bg-[#006648] text-white font-bold px-6 py-2.5 rounded-lg transition-all text-sm shadow-md hover:scale-105 active:scale-95"
                >
                  More About
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