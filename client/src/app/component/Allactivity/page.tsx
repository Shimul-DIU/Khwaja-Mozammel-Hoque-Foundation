"use client";

import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  HeartPulse,
  GraduationCap,
  UsersRound,
  Sparkles,
} from "lucide-react";

const activities = [
  {
    id: "01",
    title: "Sadka-E-Zaria",
    titleBn: "সদকায়ে জারিয়া",
    description:
      "প্রয়োজনীয় পরিবারকে স্বনির্ভরতার পথে এগিয়ে নিতে মানবিক ও দীর্ঘমেয়াদি সহায়তার উদ্যোগ।",
    href: "/sadka-e-zaria",
    icon: HeartHandshake,
    accent: "gold",
    tag: "Self Reliance",
  },
  {
    id: "02",
    title: "Scholarship",
    titleBn: "শিক্ষা সহায়তা",
    description:
      "মেধাবী ও প্রয়োজনীয় শিক্ষার্থীদের পড়াশোনা চালিয়ে যেতে আর্থিক সহায়তার সুযোগ তৈরি করা।",
    href: "/scholarship",
    icon: GraduationCap,
    accent: "green",
    tag: "Education",
  },
  {
    id: "03",
    title: "Health Support",
    titleBn: "স্বাস্থ্য সহায়তা",
    description:
      "চিকিৎসা, ওষুধ, পরীক্ষা-নিরীক্ষা ও প্রয়োজনীয় স্বাস্থ্যসেবায় মানুষের পাশে থাকার উদ্যোগ।",
    href: "/health",
    icon: HeartPulse,
    accent: "cream",
    tag: "Healthcare",
  },
  {
    id: "04",
    title: "Foundation",
    titleBn: "মানবিক কার্যক্রম",
    description:
      "মানুষের প্রয়োজন, উন্নয়ন ও কল্যাণকে কেন্দ্র করে বিভিন্ন সামাজিক উদ্যোগ পরিচালনা করা।",
    href: "/contact",
    icon: UsersRound,
    accent: "dark",
    tag: "Community",
  },
];

export default function AllActivities() {
  return (
    <section
      id="activities"
      className="relative overflow-hidden bg-[#f8f7f2] py-24 sm:py-28"
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#d8b766]/10 blur-[100px]" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#0d3b2e]/5 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* ===================================================
            SECTION HEADER
        =================================================== */}

        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-[#d8b766]/30 bg-[#d8b766]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#a27e38]">
            <Sparkles size={14} />
            Our Activities
          </div>

          <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#15251f] sm:text-5xl lg:text-6xl">
            মানুষের জন্য
            <br />
            <span className="text-[#a27e38]">
              আমাদের সকল কার্যক্রম
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#15251f]/55 sm:text-base">
            শিক্ষা, স্বাস্থ্য, স্বনির্ভরতা ও মানবিক সহায়তার মাধ্যমে
            মানুষের জীবনে ইতিবাচক পরিবর্তন তৈরির জন্য KMRF বিভিন্ন
            উদ্যোগ পরিচালনা করে।
          </p>
        </div>

        {/* ===================================================
            ACTIVITY GRID
        =================================================== */}

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <Link
                key={activity.id}
                href={activity.href}
                className="group relative"
              >
                <article className="relative h-full overflow-hidden rounded-[30px] border border-[#15251f]/8 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(21,37,31,0.12)]">

                  {/* Hover glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#d8b766]/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

                  {/* Top row */}
                  <div className="relative flex items-start justify-between">

                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl transition duration-500 group-hover:scale-105 group-hover:rotate-2 ${activity.accent === "gold"
                          ? "bg-[#d8b766]/15 text-[#a27e38]"
                          : activity.accent === "green"
                            ? "bg-[#0d3b2e] text-[#d8b766]"
                            : activity.accent === "cream"
                              ? "bg-[#eadfbe] text-[#0d3b2e]"
                              : "bg-[#0d3b2e] text-[#d8b766]"
                        }`}
                    >
                      <Icon size={25} />
                    </div>

                    <span className="text-[10px] font-black tracking-[0.22em] text-[#15251f]/15">
                      {activity.id}
                    </span>
                  </div>

                  {/* Tag */}
                  <div className="relative mt-7">
                    <span className="rounded-full border border-[#15251f]/8 bg-[#f8f7f2] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#a27e38]">
                      {activity.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative mt-5">

                    <p className="text-xs font-semibold text-[#a27e38]">
                      {activity.titleBn}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#15251f]">
                      {activity.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#15251f]/50">
                      {activity.description}
                    </p>

                  </div>

                  {/* Bottom */}
                  <div className="relative mt-7 flex items-center justify-between border-t border-[#15251f]/8 pt-5">

                    <span className="text-xs font-bold text-[#15251f]/40 transition group-hover:text-[#0d3b2e]">
                      Explore Activity
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#15251f]/10 text-[#15251f]/35 transition-all duration-300 group-hover:border-[#d8b766]/50 group-hover:bg-[#d8b766] group-hover:text-[#0d3b2e]">
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </div>

                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* ===================================================
            BOTTOM STATEMENT
        =================================================== */}

        <div className="mt-10 overflow-hidden rounded-[30px] bg-[#0d3b2e]">

          <div className="relative px-7 py-9 sm:px-10">

            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-[#d8b766]/10" />

            <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full border border-[#d8b766]/10" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8b766]">
                  KMRF Initiative
                </p>

                <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                  প্রতিটি উদ্যোগের কেন্দ্রে রয়েছে মানুষ।
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/45">
                  আমাদের লক্ষ্য হলো প্রয়োজনীয় মানুষের পাশে দাঁড়িয়ে
                  শিক্ষা, স্বাস্থ্য, স্বনির্ভরতা ও মানবিক উন্নয়নের
                  সুযোগ তৈরি করা।
                </p>
              </div>

              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#d8b766] px-7 py-3.5 text-sm font-bold text-[#08241c] transition hover:-translate-y-0.5 hover:bg-[#e5cb88]"
              >
                Join Our Mission

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}