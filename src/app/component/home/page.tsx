// src/components/Banner.tsx
"use client";

import Link from "next/link";

export default function Banner() {
  return (
    <section className="w-full ">
      <div className="max-w-7xl mx-auto ">

        <div
          className="relative min-h-screen  overflow-hidden shadow-sm border border-gray-200  bg-cover bg-center"
style={{
    backgroundImage: "url('/banner1.jpg')",
    backgroundPosition: "left",
    backgroundSize: "cover",
    // ডিফল্ট
    // স্মল স্ক্রিনের জন্য আলাদা করতে চাইলে JavaScript/media query লাগবে
  }}        >
          {/*
            ওভারলে (গ্রেডিয়েন্ট): বাম দিক থেকে কালো, ডান দিকে স্বচ্ছ।
            এতে বামের টেক্সট সহজে পড়া যায় এবং ইমেজের ডান অংশ সুন্দর দেখা যায়।
          */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>

          {/*
            কন্টেন্ট অংশ: পুরো ডিভের উচ্চতা জুড়ে বাম দিকে সাজানো।
          */}
          <div className="absolute z-10 top-24 h-full flex items-center">
            <div className="p-6 sm:p-10 lg:p-12 max-w-2xl text-white space-y-4 sm:space-y-5">

              {/* ব্যাজ / ট্যাগ */}
              <span className="inline-block text-xs sm:text-sm font-semibold text-gold tracking-wide uppercase">
                Welcome to Khwaja Mozammel Hoque (R) Foundation
              </span>

              {/* হেডিং */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Support Cause, <br />
                <span className="text-gold font-extrabold">Spread Hope Today.</span>
              </h1>

              {/* বিবরণ */}
              <p className="text-sm sm:text-base text-white/80 max-w-md">
                Join us in making a difference through Sadka-E-Zaria, Scholarships, and Health Support.
              </p>

              {/*
                সব অ্যাক্টিভিটি লিংক (flex-wrap দিয়ে মোবাইলে সুন্দরভাবে নিচে নামবে)
              */}
              <div className="pt-2 flex flex-wrap gap-2">
                {/* ডোনেট (গোল্ড বাটন) */}
                <Link
                  href="/donate"
                  className="dark:bg-[#008E48] hover:dark:bg-[#006648] font-bold px-4 sm:px-6 py-2.5 rounded-lg transition-all text-sm shadow-md hover:scale-105 active:scale-95"
                >
                  More About
                </Link>
                <Link
                  href="/donate"
                  className="dark:bg-[#008E48] hover:dark:bg-[#006648] font-bold px-4 sm:px-6  py-2.5 rounded-lg transition-all text-sm shadow-md hover:scale-105 active:scale-95"
                >
                  All Activities
                </Link>

                {/* সাদকা-এ-জারিয়া (গ্লাসমরফিজম স্টাইল) */}

                {/* স্কলারশিপ */}

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}