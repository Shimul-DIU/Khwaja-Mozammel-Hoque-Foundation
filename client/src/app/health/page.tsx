"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  HeartPulse,
  Hospital,
  Landmark,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  Users,
} from "lucide-react";

const supportAreas = [
  {
    icon: Stethoscope,
    title: "চিকিৎসা সহায়তা",
    description:
      "প্রয়োজনীয় মানুষকে চিকিৎসা গ্রহণ ও প্রয়োজনীয় স্বাস্থ্যসেবায় পৌঁছাতে সহায়তা করা।",
  },
  {
    icon: Hospital,
    title: "হাসপাতাল সহায়তা",
    description:
      "হাসপাতালে চিকিৎসাধীন প্রয়োজনীয় রোগী ও পরিবারের পাশে মানবিক সহায়তা নিয়ে দাঁড়ানো।",
  },
  {
    icon: Syringe,
    title: "ওষুধ সহায়তা",
    description:
      "প্রয়োজনীয় ওষুধ সংগ্রহের ক্ষেত্রে আর্থিক চাপ কমাতে সহায়তার সুযোগ তৈরি করা।",
  },
  {
    icon: Microscope,
    title: "ডায়াগনস্টিক সহায়তা",
    description:
      "প্রয়োজনীয় পরীক্ষা-নিরীক্ষার ব্যয় বহনে সক্ষম না হওয়া মানুষদের পাশে থাকা।",
  },
];

const focusAreas = [
  {
    number: "01",
    title: "প্রয়োজন শনাক্তকরণ",
    text: "বাস্তব স্বাস্থ্যগত ও আর্থিক প্রয়োজন বুঝে সহায়তার ক্ষেত্র চিহ্নিত করা।",
  },
  {
    number: "02",
    title: "যাচাই ও মূল্যায়ন",
    text: "আবেদন ও প্রয়োজনীয় তথ্যের ভিত্তিতে সহায়তার প্রয়োজন মূল্যায়ন করা।",
  },
  {
    number: "03",
    title: "স্বাস্থ্য সহায়তা",
    text: "প্রয়োজন অনুযায়ী চিকিৎসা, ওষুধ বা পরীক্ষার ক্ষেত্রে সহায়তার সুযোগ তৈরি করা।",
  },
  {
    number: "04",
    title: "মানবিক প্রভাব",
    text: "চিকিৎসাজনিত আর্থিক চাপ কমিয়ে পরিবারকে কঠিন সময়ে কিছুটা স্বস্তি দেওয়া।",
  },
];

const principles = [
  "মানবিক প্রয়োজনকে অগ্রাধিকার দেওয়া",
  "সহায়তার আগে প্রয়োজনীয় তথ্য যাচাই করা",
  "চিকিৎসা ও প্রয়োজন অনুযায়ী সহায়তা নির্ধারণ করা",
  "সম্মান, গোপনীয়তা ও মর্যাদা বজায় রাখা",
];

export default function HealthPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f7f2] text-[#15251f]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section id="support" className="bg-white py-6">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a27e38]">
              Areas We Support
            </p>

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              স্বাস্থ্য সহায়তার
              <br />
              <span className="text-[#a27e38]">
                গুরুত্বপূর্ণ ক্ষেত্র
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#15251f]/50">
              প্রয়োজনের ধরন অনুযায়ী সহায়তার সুযোগ ভিন্ন হতে পারে।
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {supportAreas.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-[#15251f]/8 bg-[#f8f7f2] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#d8b766]/30 hover:shadow-xl"
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

                  <div className="mt-6 h-px bg-[#15251f]/8" />

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
          ABOUT
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a27e38]">
              About Health Support
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              স্বাস্থ্যসেবার
              <br />
              <span className="text-[#a27e38]">
                পাশে KMRF
              </span>
            </h2>

            <div className="mt-7 h-1 w-16 rounded-full bg-[#d8b766]" />

            <p className="mt-6 max-w-md text-sm leading-7 text-[#15251f]/50">
              সংকটের সময়ে একটি পরিবারকে চিকিৎসা সংক্রান্ত সহায়তা
              দেওয়া কখনো কখনো তাদের জন্য বড় একটি স্বস্তির কারণ হতে পারে।
            </p>
          </div>

          {/* Right */}
          <div className="space-y-7 text-[15px] leading-8 text-[#15251f]/65">
            <p>
              অসুস্থতা বা জরুরি চিকিৎসার প্রয়োজন একটি পরিবারের
              অর্থনৈতিক অবস্থার ওপর বড় চাপ তৈরি করতে পারে। বিশেষ করে
              নিম্নআয়ের পরিবারের ক্ষেত্রে চিকিৎসার খরচ অনেক সময়
              দৈনন্দিন প্রয়োজনের সঙ্গে সরাসরি সংঘাত তৈরি করে।
            </p>

            <p>
              KMRF Health Support-এর উদ্দেশ্য হলো এমন পরিস্থিতিতে
              প্রয়োজনীয় মানুষদের পাশে মানবিক সহায়তার সুযোগ তৈরি করা।
              প্রয়োজন অনুযায়ী চিকিৎসা, ওষুধ, পরীক্ষা-নিরীক্ষা বা
              হাসপাতাল-সংশ্লিষ্ট খাতে সহায়তার পথ তৈরি করা এই উদ্যোগের
              একটি গুরুত্বপূর্ণ অংশ।
            </p>

            <p>
              আমাদের লক্ষ্য শুধু তাৎক্ষণিক সহায়তা নয়; বরং মানুষের
              মর্যাদা বজায় রেখে কঠিন স্বাস্থ্য সংকটের সময়ে একটি
              সহায়ক হাত বাড়িয়ে দেওয়া।
            </p>

            <div className="rounded-3xl border border-[#d8b766]/20 bg-[#eee9db] p-7 sm:p-9">
              <div className="flex gap-4">
                <HeartHandshake
                  size={30}
                  className="shrink-0 text-[#a27e38]"
                />

                <div>
                  <p className="text-lg font-semibold leading-8 text-[#15251f]">
                    একটি কঠিন সময়ে পাশে থাকা কখনো শুধু আর্থিক সহায়তা
                    নয়—এটি একজন মানুষকে আশ্বস্ত করারও একটি মানবিক
                    প্রচেষ্টা।
                  </p>

                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-[#15251f]/40">
                    KMRF Health Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SUPPORT AREAS
      ========================================================= */}


      {/* =========================================================
          PROCESS
      ========================================================= */}
      <section className="bg-[#0d3b2e] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d8b766]">
              How It Works
            </p>

            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              কীভাবে Health Support
              <br />
              কাজ করে?
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/40">
              প্রয়োজন শনাক্ত করা থেকে সহায়তা পৌঁছে দেওয়া পর্যন্ত একটি
              সুসংগঠিত প্রক্রিয়া অনুসরণ করা হয়।
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-4">
            {focusAreas.map((item, index) => (
              <div key={item.number} className="relative">
                {index !== focusAreas.length - 1 && (
                  <div className="absolute right-[-13px] top-12 z-10 hidden md:block">
                    <ArrowRight
                      size={18}
                      className="text-[#d8b766]/40"
                    />
                  </div>
                )}

                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.045] p-7 transition duration-300 hover:-translate-y-2 hover:bg-white/[0.07]">
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

                  <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/20">
                    Health Support
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          PRINCIPLES
      ========================================================= */}
      <section className="bg-[#f0eee6] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a27e38]">
                Our Principles
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                সহায়তায়
                <br />
                <span className="text-[#a27e38]">
                  মানবিকতা ও মর্যাদা
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-[#15251f]/50">
                স্বাস্থ্যসেবা সংক্রান্ত সহায়তায় প্রয়োজনীয় মানুষের
                মর্যাদা ও বাস্তব পরিস্থিতিকে গুরুত্ব দেওয়া আমাদের
                মূল মূল্যবোধের অংশ।
              </p>
            </div>

            <div className="rounded-[34px] border border-[#15251f]/8 bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d3b2e] text-[#d8b766]">
                  <ShieldCheck size={23} />
                </div>

                <div>
                  <h3 className="text-xl font-bold">
                    Our Commitment
                  </h3>

                  <p className="text-sm text-[#15251f]/45">
                    একটি সহায়তা যেন সত্যিকারের প্রয়োজনের জায়গায় পৌঁছায়।
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-5">
                {principles.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 border-b border-[#15251f]/8 pb-5 last:border-b-0 last:pb-0"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d8b766]/15 text-[#a27e38]">
                      <CheckCircle2 size={15} />
                    </div>

                    <p className="text-sm leading-7 text-[#15251f]/65">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          EMERGENCY STYLE SUPPORT CARD
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[40px] bg-[#eadfbe]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 sm:p-12 lg:p-14">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0d3b2e] text-[#d8b766]">
                <Activity size={25} />
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-[#a27e38]">
                When Help Matters Most
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight text-[#15251f] sm:text-5xl">
                একটি কঠিন সময়ে
                <br />
                পাশে থাকা জরুরি।
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#15251f]/55">
                চিকিৎসা বা স্বাস্থ্যগত প্রয়োজনের কারণে যখন একটি পরিবার
                আর্থিক চাপে পড়ে, তখন সময়মতো সহায়তা তাদের জন্য গুরুত্বপূর্ণ
                হয়ে উঠতে পারে।
              </p>

              <Link
                href="/health/apply"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0d3b2e] px-7 py-4 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#153f32]"
              >
                Request Support
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="relative min-h-[360px] overflow-hidden bg-[#153d30] p-8 sm:p-12">
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#d8b766]/10" />
              <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-[#d8b766]/10" />

              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d8b766]/10 text-[#d8b766]">
                    <HeartPulse size={25} />
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/45">
                    KMRF Care
                  </span>
                </div>

                <div>
                  <p className="text-3xl font-bold leading-tight text-white">
                    Care.
                    <br />
                    Support.
                    <br />
                    Dignity.
                  </p>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-white/40">
                    মানুষের স্বাস্থ্যগত সংকটে মানবিক সহায়তা পৌঁছে
                    দেওয়ার একটি প্রচেষ্টা।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#d8b766]">
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#0d3b2e]/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d3b2e] text-[#d8b766]">
            <HeartHandshake size={30} />
          </div>

          <h2 className="mt-7 text-4xl font-bold tracking-tight text-[#08241c] sm:text-5xl">
            আপনার সহায়তা
            <br />
            কারও চিকিৎসার পথ সহজ করতে পারে।
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#08241c]/60">
            KMRF Health Support-এর মাধ্যমে প্রয়োজনীয় মানুষের পাশে
            দাঁড়ানোর মানবিক উদ্যোগের অংশ হোন।
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/health/apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0d3b2e] px-8 py-4 font-bold text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#153f32]"
            >
              Apply for Support
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#0d3b2e]/20 bg-white/20 px-8 py-4 font-semibold text-[#08241c] transition hover:bg-white/30"
            >
              Contact KMRF
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-[#15251f]/10 bg-[#f8f7f2]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-[#15251f]/45 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <div>
            <p className="font-bold text-[#15251f]">
              KMRF Health Support
            </p>

            <p className="mt-1 text-xs">
              Care. Support. Dignity.
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

          <p>
            © {new Date().getFullYear()} KMRF
          </p>
        </div>
      </footer>
    </main>
  );
}