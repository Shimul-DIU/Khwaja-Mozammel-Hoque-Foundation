import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";

const donationFunds = [
  {
    title: "শিক্ষা সহায়তা",
    description:
      "অসচ্ছল ও মেধাবী শিক্ষার্থীদের পড়াশোনা চালিয়ে যেতে সহায়তা করুন।",
    image: "/studyActivity.jpg",
  },
  {
    title: "স্বাস্থ্য সহায়তা",
    description:
      "চিকিৎসা ও প্রয়োজনীয় স্বাস্থ্যসেবার জন্য মানুষের পাশে দাঁড়ান।",
    image: "/health-program-2024-3.jpg",
  },
  {
    title: "সদকায়ে জারিয়া",
    description:
      "পরিবারের স্বাবলম্বিতা ও দীর্ঘমেয়াদি কল্যাণমূলক কাজে অংশ নিন।",
    image: "/Sadka-E-Zaria-1.jpg",
  },
  {
    title: "সাধারণ অনুদান",
    description:
      "ফাউন্ডেশনের বিভিন্ন মানবকল্যাণমূলক কার্যক্রমে সহায়তা করুন।",
    image: "/ouractivity.jpg",
  },
];

export default function DonatePage() {
  return (
    <main className="bg-white text-[#15251f]">
      <section
        className="relative flex min-h-[340px] items-center justify-center overflow-hidden bg-cover bg-center px-5 py-20 text-center sm:min-h-[420px]"
        style={{ backgroundImage: "url('/ouractivity.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#062d22]/75" />
        <div className="relative z-10 mx-auto max-w-3xl text-white">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#e7c879]">
            খাজা মোজাম্মেল হক ফাউন্ডেশন
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            চলুন একসাথে পরিবর্তন আনি
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            আপনার অনুদান শিক্ষা, স্বাস্থ্যসেবা ও সমাজকল্যাণমূলক কাজে মানুষের
            পাশে দাঁড়াতে সাহায্য করে।
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
            অনুদানের খাতসমূহ
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            আপনার পছন্দের উদ্যোগে সহায়তা করুন
          </h2>
          <p className="mt-4 leading-7 text-gray-600">
            যে কোনো একটি কার্যক্রম বেছে নিয়ে অনুদান দিতে লগইন করুন। নতুন হলে
            প্রথমে নিবন্ধন করে আপনার অ্যাকাউন্ট তৈরি করুন।
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {donationFunds.map((fund) => (
            <article
              key={fund.title}
              className="overflow-hidden rounded-2xl border border-emerald-950/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-48">
                <Image
                  src={fund.image}
                  alt={fund.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#123d2a]">
                  {fund.title}
                </h3>
                <p className="mt-2 min-h-14 text-sm leading-6 text-gray-600">
                  {fund.description}
                </p>
                <Link
                  href="/login"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition hover:gap-3"
                >
                  অনুদান দিন
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f3f5ef] px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-3xl bg-[#0d3b2e] px-6 py-10 text-center text-white sm:px-12 sm:py-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#e7c879]">
            <HeartHandshake size={28} aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              অনুদান দিতে আপনার অ্যাকাউন্টে লগইন করুন
            </h2>
            <p className="mx-auto mt-3 max-w-2xl leading-7 text-white/75">
              অনুদানের নিরাপদ হিসাব ও রসিদের জন্য আপনার KMRF অ্যাকাউন্ট ব্যবহার
              করুন।
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/login"
              className="rounded-xl bg-white px-6 py-3 font-bold text-[#0d3b2e] transition hover:bg-emerald-50"
            >
              লগইন করুন
            </Link>
            <Link
              href="/registration"
              className="rounded-xl border border-white/60 px-6 py-3 font-bold text-white transition hover:bg-white/10"
            >
              নিবন্ধন করুন
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
