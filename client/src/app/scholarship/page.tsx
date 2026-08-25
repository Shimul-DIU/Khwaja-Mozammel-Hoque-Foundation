"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Medal,
  School,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const benefits = [
  {
    icon: GraduationCap,
    title: "শিক্ষার সুযোগ",
    text: "মেধাবী ও প্রয়োজনীয় শিক্ষার্থীদের উচ্চশিক্ষার পথে এগিয়ে যেতে সহায়তা করা।",
  },
  {
    icon: Landmark,
    title: "আর্থিক সহায়তা",
    text: "শিক্ষার গুরুত্বপূর্ণ খরচের চাপ কমিয়ে শিক্ষার্থীদের পড়াশোনায় মনোযোগী হতে সহায়তা করা।",
  },
  {
    icon: BookOpen,
    title: "শিক্ষা উপকরণ",
    text: "বই, প্রয়োজনীয় উপকরণ ও শিক্ষা-সংশ্লিষ্ট সহায়তার মাধ্যমে শেখার পরিবেশ তৈরি করা।",
  },
  {
    icon: Users,
    title: "মানবিক সহায়তা",
    text: "প্রতিভা ও আর্থিক প্রয়োজনকে বিবেচনা করে যোগ্য শিক্ষার্থীদের পাশে দাঁড়ানো।",
  },
];

const requirements = [
  "বাংলাদেশের স্বীকৃত শিক্ষা প্রতিষ্ঠানে অধ্যয়নরত হতে হবে।",
  "শিক্ষাগত ফলাফল ও নিয়মিত পড়াশোনার প্রমাণ থাকতে হবে।",
  "পরিবারের আর্থিক প্রয়োজনের যথাযথ তথ্য প্রদান করতে হবে।",
  "আবেদনপত্রে সঠিক ও যাচাইযোগ্য তথ্য প্রদান করতে হবে।",
];

const process = [
  {
    number: "01",
    title: "আবেদন",
    text: "অনলাইনে প্রয়োজনীয় তথ্য ও কাগজপত্রসহ আবেদন জমা দিন।",
  },
  {
    number: "02",
    title: "যাচাই",
    text: "আবেদনকারীর শিক্ষাগত যোগ্যতা ও আর্থিক প্রয়োজন যাচাই করা হবে।",
  },
  {
    number: "03",
    title: "নির্বাচন",
    text: "যোগ্যতা, প্রয়োজন ও প্রাপ্যতার ভিত্তিতে বাছাই সম্পন্ন হবে।",
  },
  {
    number: "04",
    title: "সহায়তা",
    text: "নির্বাচিত শিক্ষার্থীদের জন্য scholarship support প্রদান করা হবে।",
  },
];

export default function ScholarshipPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f2] text-[#15251f]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <div className="rounded-xl bg-[#eadfbe] p-8 sm:p-12 lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a27e38]">
                Why Education Matters
              </p>

              <h2 className="mt-5 text-4xl font-bold leading-tight text-[#15251f] sm:text-5xl">
                একটি scholarship
                <br />
                হতে পারে একটি
                <br />
                নতুন ভবিষ্যতের শুরু।
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#15251f]/55">
                একজন শিক্ষার্থীর পাশে দাঁড়ানো মানে তার স্বপ্নকে বাঁচিয়ে
                রাখা। সেই স্বপ্ন একদিন পরিবার, প্রতিষ্ঠান ও সমাজে
                ইতিবাচক পরিবর্তনের পথ তৈরি করতে পারে।
              </p>

              <Link
                href="/scholarship/apply"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0d3b2e] px-7 py-4 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#153f32]"
              >
                Start Application
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-[#0d3b2e] p-7 text-white">
                <Medal className="text-[#d8b766]" size={26} />

                <p className="mt-6 text-2xl font-bold">
                  Merit
                </p>

                <p className="mt-2 text-sm leading-6 text-white/45">
                  মেধা ও শিক্ষাগত সক্ষমতাকে গুরুত্ব দেওয়া।
                </p>
              </div>

              <div className="rounded-3xl bg-white p-7 text-[#15251f] shadow-sm">
                <Target className="text-[#a27e38]" size={26} />

                <p className="mt-6 text-2xl font-bold">
                  Need
                </p>

                <p className="mt-2 text-sm leading-6 text-[#15251f]/45">
                  বাস্তব আর্থিক প্রয়োজনকে বিবেচনায় রাখা।
                </p>
              </div>

              <div className="rounded-3xl bg-white p-7 text-[#15251f] shadow-sm">
                <School className="text-[#a27e38]" size={26} />

                <p className="mt-6 text-2xl font-bold">
                  Growth
                </p>

                <p className="mt-2 text-sm leading-6 text-[#15251f]/45">
                  দীর্ঘমেয়াদি শিক্ষাগত ও ব্যক্তিগত উন্নয়ন।
                </p>
              </div>

              <div className="rounded-3xl bg-[#0d3b2e] p-7 text-white">
                <Award className="text-[#d8b766]" size={26} />

                <p className="mt-6 text-2xl font-bold">
                  Future
                </p>

                <p className="mt-2 text-sm leading-6 text-white/45">
                  সম্ভাবনাময় ভবিষ্যতের জন্য বিনিয়োগ।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a27e38]">
              About The Scholarship
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              শিক্ষার পথে
              <br />
              <span className="text-[#a27e38]">
                পাশে KMRF
              </span>
            </h2>

            <div className="mt-7 h-1 w-16 rounded-full bg-[#d8b766]" />
          </div>

          <div className="space-y-7 text-[15px] leading-8 text-[#15251f]/65">
            <p>
              অনেক প্রতিভাবান শিক্ষার্থী আর্থিক সীমাবদ্ধতার কারণে তাদের
              কাঙ্ক্ষিত শিক্ষাজীবন চালিয়ে যেতে বাধার সম্মুখীন হয়। KMRF
              Scholarship Program-এর লক্ষ্য হলো এমন শিক্ষার্থীদের
              পাশে দাঁড়ানো, যাতে যোগ্যতা ও সম্ভাবনা আর্থিক সমস্যার কারণে
              থেমে না যায়।
            </p>

            <p>
              এই উদ্যোগে শিক্ষার্থীর একাডেমিক পারফরম্যান্স, ব্যক্তিগত
              সম্ভাবনা এবং আর্থিক প্রয়োজনকে গুরুত্ব দিয়ে সহায়তার সুযোগ
              তৈরি করা হয়।
            </p>

            <div className="rounded-3xl border border-[#d8b766]/20 bg-[#eee9db] p-7 sm:p-9">
              <div className="flex gap-4">
                <QuoteIcon />

                <div>
                  <p className="text-lg font-semibold leading-8 text-[#15251f]">
                    একটি শিক্ষাকে টিকিয়ে রাখা মানে শুধু একজন শিক্ষার্থীকে
                    সহায়তা করা নয়; বরং একটি সম্ভাবনাময় ভবিষ্যৎকে এগিয়ে নেওয়া।
                  </p>

                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-[#15251f]/40">
                    KMRF Scholarship Initiative
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BENEFITS
      ========================================================= */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a27e38]">
              What We Support
            </p>

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Scholarship-এর
              <br />
              <span className="text-[#a27e38]">মূল সহায়তাগুলো</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-[#15251f]/8 bg-[#f8f7f2] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#d8b766]/30 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d3b2e] text-[#d8b766] transition group-hover:rotate-3">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#15251f]/50">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          ELIGIBILITY
      ========================================================= */}
      <section id="eligibility" className="bg-[#f0eee6] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a27e38]">
                Eligibility
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                কারা
                <br />
                <span className="text-[#a27e38]">
                  আবেদন করতে পারবেন?
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-[#15251f]/50">
                scholarship-এর জন্য আবেদন করার আগে নিচের প্রাথমিক
                যোগ্যতাগুলো দেখে নিন।
              </p>
            </div>

            <div className="rounded-[32px] border border-[#15251f]/8 bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d3b2e] text-[#d8b766]">
                  <ShieldCheck size={23} />
                </div>

                <div>
                  <h3 className="text-xl font-bold">
                    Basic Requirements
                  </h3>

                  <p className="text-sm text-[#15251f]/45">
                    আবেদন করার আগে নিশ্চিত করুন।
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-5">
                {requirements.map((item, index) => (
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
          PROCESS
      ========================================================= */}
      <section className="bg-[#0d3b2e] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d8b766]">
              Application Process
            </p>

            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              কীভাবে আবেদন করবেন?
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/40">
              একটি সহজ ও কাঠামোবদ্ধ process-এর মাধ্যমে আবেদন সম্পন্ন করুন।
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-4">
            {process.map((item, index) => (
              <div
                key={item.number}
                className="relative"
              >
                {index !== process.length - 1 && (
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          IMPACT
      ========================================================= */}


      {/* =========================================================
          CTA
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
            একটি শিক্ষার্থীর স্বপ্ন এগিয়ে নিতে পারে।
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#08241c]/60">
            মেধাবী ও প্রয়োজনীয় শিক্ষার্থীদের শিক্ষাজীবনে সহায়তা করার
            মানবিক উদ্যোগের অংশ হোন।
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/scholarship/apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0d3b2e] px-8 py-4 font-bold text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#153f32]"
            >
              Apply Now
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
              KMRF Scholarship
            </p>

            <p className="mt-1 text-xs">
              Empowering education. Building futures.
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

/* =========================================================
   SMALL QUOTE ICON
========================================================= */

function QuoteIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="shrink-0 text-[#a27e38]"
      aria-hidden="true"
    >
      <path
        d="M10 11H6.8C5.25 11 4 12.25 4 13.8v.4C4 15.75 5.25 17 6.8 17H8c1.1 0 2-.9 2-2v-4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 11h-3.2c-1.55 0-2.8 1.25-2.8 2.8v.4c0 1.55 1.25 2.8 2.8 2.8H18c1.1 0 2-.9 2-2v-4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}