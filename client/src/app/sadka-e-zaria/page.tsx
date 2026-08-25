"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  HeartHandshake,
  Quote,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";

const years = [
  {
    year: "2024",
    title: "Sadka-E-Zaria 2024",
    recipients: "সদকায়ে জারিয়ার সহায়তা বিতরণ",
  },
  {
    year: "2023",
    title: "Sadka-E-Zaria 2023",
    recipients: "সদকায়ে জারিয়ার সহায়তা বিতরণ",
  },
  {
    year: "2022",
    title: "Sadka-E-Zaria 2022",
    recipients: "সদকায়ে জারিয়ার সহায়তা বিতরণ",
  },
  {
    year: "2017",
    title: "Sadka-E-Zaria 2017",
    recipients: "১০৩ জন উপকারভোগী",
  },
  {
    year: "2016",
    title: "Sadka-E-Zaria 2016",
    recipients: "১৪৯ জন উপকারভোগী",
  },
  {
    year: "2015",
    title: "Sadka-E-Zaria 2015",
    recipients: "১৩৭ জন উপকারভোগী",
  },
  {
    year: "2014",
    title: "Sadka-E-Zaria 2014",
    recipients: "১৪৩ জন উপকারভোগী",
  },
  {
    year: "2013",
    title: "Sadka-E-Zaria 2013",
    recipients: "১৪৩ জন উপকারভোগী",
  },
];

const pillars = [
  {
    icon: BriefcaseBusiness,
    title: "স্বনির্ভরতা",
    description:
      "সহায়তার মাধ্যমে পরিবারগুলোকে নিজেদের পায়ে দাঁড়ানোর সুযোগ তৈরি করা।",
  },
  {
    icon: Users,
    title: "পরিবার",
    description:
      "প্রয়োজনীয় পরিবারগুলোর পাশে দাঁড়িয়ে তাদের জীবনকে আরও স্থিতিশীল করতে সহায়তা করা।",
  },
  {
    icon: GraduationCap,
    title: "শিক্ষা",
    description:
      "দারিদ্র্যের দীর্ঘমেয়াদি চক্র ভাঙতে শিক্ষা ও সচেতনতার সুযোগ তৈরি করা।",
  },
  {
    icon: Stethoscope,
    title: "স্বাস্থ্য",
    description:
      "প্রয়োজনীয় স্বাস্থ্যসেবা ও সচেতনতার মাধ্যমে জীবনমান উন্নত করা।",
  },
];

const galleryImages = [
  {
    src: "/Sadka-E-Zaria-1.jpg",
    alt: "Sadka-E-Zaria 2024",
  },
  {
    src: "/Sadka-E-Zaria-2.jpg",
    alt: "Sadka-E-Zaria success",
  },
  {
    src: "/Sadka-E-Zaria-3.jpg",
    alt: "Sadka-E-Zaria journey",
  },
];

export default function SadkaEZariaPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f7f2] text-[#15251f]">
      {/* =========================================================
          ABOUT SECTION
      ========================================================= */}
      <section
        id="about"
        className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10"
      >
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a27e38]">
              About The Initiative
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#15251f] sm:text-5xl lg:text-6xl">
              Capital as
              <br />
              <span className="text-[#a27e38]">
                Sadka-E-Zaria
              </span>
            </h1>

            <div className="mt-7 h-1 w-16 rounded-full bg-[#d8b766]" />

            <p className="mt-6 max-w-md text-sm leading-7 text-[#15251f]/50">
              মানুষের জীবনকে শুধু সাময়িকভাবে সহায়তা নয়, বরং দীর্ঘমেয়াদে
              স্বনির্ভর করে তোলার একটি মানবিক উদ্যোগ।
            </p>
          </div>

          {/* Right */}
          <div className="space-y-7 text-[15px] leading-8 text-[#15251f]/65">
            <p>
              বাংলাদেশের অনেক দরিদ্র পরিবার মৌলিক প্রয়োজন পূরণ করতে গিয়ে
              ঋণের ওপর নির্ভরশীল হয়ে পড়ে। ঋণের বোঝা তাদের দারিদ্র্যের একটি
              স্থায়ী চক্রের মধ্যে আটকে রাখতে পারে।
            </p>

            <p>
              Capital as Sadka-E-Zaria-এর ধারণা হলো প্রয়োজনীয় পরিবারগুলোকে
              এমন আর্থিক সহায়তা দেওয়া, যা তাদেরকে ঋণের বোঝা ছাড়াই নিজেদের
              জীবন ও জীবিকা এগিয়ে নেওয়ার সুযোগ তৈরি করে।
            </p>

            <p>
              এই উদ্যোগের মাধ্যমে একজন উপকারভোগী শুধু একটি মুহূর্তের
              সহায়তা পান না; বরং নিজের পায়ে দাঁড়ানোর একটি সুযোগ পান।
              আর একজন দাতা একটি চলমান কল্যাণমূলক কাজের অংশ হওয়ার সুযোগ পান।
            </p>

            {/* Quote Card */}
            <div className="rounded-3xl border border-[#d8b766]/20 bg-[#eee9db] p-7 sm:p-9">
              <div className="flex gap-4">
                <Quote
                  size={30}
                  className="shrink-0 text-[#a27e38]"
                />

                <div>
                  <p className="text-lg font-semibold leading-8 text-[#15251f]">
                    একটি পরিবারকে দারিদ্র্য থেকে বের হয়ে নিজের পায়ে দাঁড়ানোর
                    সুযোগ তৈরি করা—এটাই একটি সহায়তার সবচেয়ে সুন্দর প্রভাব।
                  </p>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#15251f]/40">
                    Capital as Sadka-E-Zaria
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#0d3b2e]">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#d8b766]/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#4c9b79]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d8b766]">
              Our Approach
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              কীভাবে একটি সহায়তা
              <br />
              স্বনির্ভরতার পথ তৈরি করে?
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/45">
              প্রয়োজন চিহ্নিত করা থেকে শুরু করে দীর্ঘমেয়াদি স্বনির্ভরতা
              পর্যন্ত প্রতিটি ধাপে একটি পরিকল্পিত মানবিক উদ্যোগ।
            </p>
          </div>

          {/* Steps */}
          <div className="relative mt-16 grid gap-5 md:grid-cols-4">
            {[
              {
                number: "01",
                title: "প্রয়োজন শনাক্ত",
                text: "প্রয়োজনীয় পরিবার ও তাদের বাস্তব পরিস্থিতি চিহ্নিত করা।",
              },
              {
                number: "02",
                title: "সহায়তা প্রদান",
                text: "প্রয়োজন অনুযায়ী আর্থিক সহায়তা ও পুঁজি দেওয়া।",
              },
              {
                number: "03",
                title: "স্বনির্ভরতা",
                text: "পরিবারকে নিজের পায়ে দাঁড়ানোর সুযোগ তৈরি করা।",
              },
              {
                number: "04",
                title: "দীর্ঘমেয়াদি প্রভাব",
                text: "একটি পরিবারের জীবনমান উন্নয়নের মাধ্যমে স্থায়ী পরিবর্তন।",
              },
            ].map((item, index) => (
              <div
                key={item.number}
                className="relative"
              >
                {/* Connector */}
                {index !== 3 && (
                  <div className="absolute right-[-13px] top-12 z-10 hidden md:block">
                    <ArrowRight
                      size={18}
                      className="text-[#d8b766]/40"
                    />
                  </div>
                )}

                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.045] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#d8b766]/20 hover:bg-white/[0.07]">
                  <span className="text-xs font-bold tracking-[0.2em] text-[#d8b766]">
                    {item.number}
                  </span>

                  <h3 className="mt-6 text-xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/45">
                    {item.text}
                  </p>

                  <div className="mt-7 h-px bg-white/10" />

                  <div className="mt-5 text-[10px] uppercase tracking-[0.2em] text-white/25">
                    Sadka-E-Zaria
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          IMPACT PILLARS
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a27e38]">
              Areas Of Impact
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              মানুষের জীবনে
              <br />
              <span className="text-[#a27e38]">
                বাস্তব পরিবর্তন
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#15251f]/50">
              একটি পরিবারকে স্বনির্ভর করে তুলতে শুধু অর্থ নয়, প্রয়োজন
              সুযোগ, শিক্ষা, স্বাস্থ্য এবং একটি স্থায়ী ভবিষ্যৎ।
            </p>

            <div className="mt-8 h-px w-20 bg-[#d8b766]" />

            <p className="mt-6 max-w-md text-xs leading-6 text-[#15251f]/40">
              মানবিক সহায়তার লক্ষ্য হলো মানুষকে শুধু সহায়তা করা নয়,
              বরং তাদের সামনে নতুন সম্ভাবনার দরজা খুলে দেওয়া।
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {pillars.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-[#15251f]/8 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d3b2e] text-[#d8b766] transition duration-300 group-hover:rotate-3">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#15251f]/50">
                    {item.description}
                  </p>

                  <div className="mt-6 h-px w-full bg-[#15251f]/8" />

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#a27e38]">
                    Learn more

                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          ISLAMIC PERSPECTIVE
      ========================================================= */}
      <section className="px-5 pb-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-[#eadfbe] shadow-sm">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* Left */}
            <div className="relative min-h-[380px] overflow-hidden bg-[#153d30] p-9 sm:p-12">
              {/* Decorative rings */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#d8b766]/10" />

              <div className="absolute -right-5 -top-5 h-36 w-36 rounded-full border border-[#d8b766]/10" />

              <div className="absolute bottom-[-80px] left-[-50px] h-56 w-56 rounded-full border border-[#d8b766]/5" />

              <div className="relative flex h-full flex-col justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d8b766]/10 text-[#d8b766]">
                  <Sparkles size={24} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#d8b766]">
                    Islamic Perspective
                  </p>

                  <h3 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                    সদকায়ে জারিয়া
                    <br />
                    একটি চলমান কল্যাণ
                  </h3>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-white/40">
                    এমন একটি কল্যাণমূলক কাজ যার উপকার দীর্ঘসময় মানুষের
                    জীবনে ইতিবাচক প্রভাব রেখে যেতে পারে।
                  </p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="p-9 sm:p-12 lg:p-14">
              <Quote
                size={34}
                className="text-[#a27e38]"
              />

              <p className="mt-6 text-xl font-semibold leading-9 text-[#15251f] sm:text-2xl">
                যখন কোনো মানুষ মৃত্যুবরণ করে, তখন তার আমল বন্ধ হয়ে যায়;
                তবে তিনটি বিষয় ছাড়া—সদকায়ে জারিয়া, উপকারী জ্ঞান এবং এমন
                নেক সন্তান যে তার জন্য দোয়া করে।
              </p>

              <div className="mt-7 h-px bg-[#15251f]/10" />

              <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#15251f]/40">
                  Sahih Muslim
                </p>

                <span className="text-xs font-medium text-[#a27e38]">
                  Continuous Benefit
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SUCCESS GALLERY
      ========================================================= */}
      <section
        id="gallery"
        className="bg-[#f0eee6] py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Heading */}
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a27e38]">
                Success Gallery
              </p>

              <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                আমাদের পথচলা
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#15251f]/50">
                বছরের পর বছর পরিচালিত Sadka-E-Zaria কার্যক্রমের কিছু
                স্মৃতি ও সাফল্যের মুহূর্ত।
              </p>
            </div>

            <div className="hidden items-center gap-2 text-xs font-semibold text-[#15251f]/40 sm:flex">
              <CalendarDays size={16} />
              2001 — 2024
            </div>
          </div>

          {/* Featured Cards */}
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {galleryImages.map((item, index) => (
              <div
                key={item.src}
                className="group relative min-h-[380px] overflow-hidden rounded-[32px] bg-[#0d3b2e]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />

                {/* Different overlays */}
                {index === 0 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061c15] via-[#061c15]/45 to-transparent" />
                )}

                {index === 1 && (
                  <div className="absolute inset-0 bg-[#0d3b2e]/50" />
                )}

                {index === 2 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061c15] via-[#061c15]/40 to-transparent" />
                )}

                <div className="relative z-10 flex min-h-[380px] flex-col justify-between p-8">
                  <div>
                    <span className="rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs text-white/70 backdrop-blur-md">
                      {index === 0
                        ? "2024"
                        : index === 1
                          ? "Impact"
                          : "Journey"}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#d8b766]">
                      {index === 0
                        ? "Featured"
                        : index === 1
                          ? "Success"
                          : "Our Journey"}
                    </p>

                    <h3 className="mt-3 text-3xl font-bold text-white">
                      {index === 0
                        ? "Sadka-E-Zaria"
                        : index === 1
                          ? "মানুষের পাশে"
                          : "দীর্ঘ পথচলা"}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-white/55">
                      {index === 0
                        ? "২০২৪ সালের কার্যক্রম ও সাফল্যের স্মৃতি।"
                        : index === 1
                          ? "প্রয়োজনীয় মানুষের কাছে সহায়তা পৌঁছে দেওয়ার ধারাবাহিক উদ্যোগ।"
                          : "বছরের পর বছর মানুষের পাশে থাকার একটি ধারাবাহিক উদ্যোগ।"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Year Cards */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {years.map((item) => (
              <button
                key={item.year}
                className="group rounded-2xl border border-[#15251f]/8 bg-white p-5 text-left transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#a27e38]">
                    {item.year}
                  </span>

                  <ArrowRight
                    size={16}
                    className="text-[#15251f]/25 transition group-hover:translate-x-1 group-hover:text-[#a27e38]"
                  />
                </div>

                <h4 className="mt-4 text-sm font-bold">
                  {item.title}
                </h4>

                <p className="mt-2 text-xs leading-5 text-[#15251f]/45">
                  {item.recipients}
                </p>
              </button>
            ))}
          </div>

          {/* Gallery Button */}
          <div className="mt-8 flex justify-center">
            <button className="inline-flex items-center gap-2 rounded-full border border-[#15251f]/10 bg-white px-6 py-3 text-sm font-semibold transition hover:bg-[#0d3b2e] hover:text-white">
              সব বছরের Gallery দেখুন
              <ArrowDown size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#d8b766]">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#0d3b2e]/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 py-24 text-center sm:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#08241c] text-[#d8b766]">
            <HeartHandshake size={30} />
          </div>

          <h2 className="mt-7 text-4xl font-bold tracking-tight text-[#08241c] sm:text-5xl">
            আপনার একটি সহায়তা
            <br />
            হতে পারে একটি পরিবারের নতুন শুরু
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#08241c]/60">
            Capital as Sadka-E-Zaria-এর মাধ্যমে একটি পরিবারকে স্বনির্ভরতার
            পথে এগিয়ে নেওয়ার মানবিক উদ্যোগের অংশ হোন।
          </p>

          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#08241c] px-8 py-4 font-bold text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-[#0d3b2e]"
          >
            যোগাযোগ করুন
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-[#15251f]/10 bg-[#f8f7f2]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-[#15251f]/40 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <div>
            <p className="font-bold text-[#15251f]">
              Sadka-E-Zaria
            </p>

            <p className="mt-1 text-xs">
              Capital as Sadka-E-Zaria
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="transition hover:text-[#0d3b2e]"
            >
              Home
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-[#0d3b2e]"
            >
              Contact
            </Link>
          </div>

          <p>© {new Date().getFullYear()} KMRF</p>
        </div>
      </footer>
    </main>
  );
}