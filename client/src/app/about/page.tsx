import Link from "next/link";

const stats = [
  { label: "বছরের সেবা", value: "10+" },
  { label: "বৃত্তিপ্রাপ্ত শিক্ষার্থী", value: "500+" },
  { label: "সদকায়ে জারিয়া প্রকল্প", value: "25+" },
  { label: "স্বেচ্ছাসেবক", value: "100+" },
];

const values = [
  {
    title: "আধ্যাত্মিকতা",
    desc: "সুফি দর্শনের আলোকে মানুষের সেবা ও আত্মশুদ্ধির চর্চা।",
  },
  {
    title: "শিক্ষা",
    desc: "মেধাবী ও অসচ্ছল শিক্ষার্থীদের পাশে দাঁড়িয়ে তাদের স্বপ্ন পূরণে সহায়তা।",
  },
  {
    title: "মানবসেবা",
    desc: "সদকায়ে জারিয়ার মাধ্যমে সমাজের সুবিধাবঞ্চিত মানুষের কল্যাণে কাজ।",
  },
  {
    title: "স্বচ্ছতা",
    desc: "প্রতিটি অনুদান ও কার্যক্রমের হিসাব সবার জন্য উন্মুক্ত।",
  },
];

const team = [
  { name: "নাম এখানে লিখুন", role: "প্রতিষ্ঠাতা" },
  { name: "নাম এখানে লিখুন", role: "সভাপতি" },
  { name: "নাম এখানে লিখুন", role: "সাধারণ সম্পাদক" },
];

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-800">
      <section className="bg-gradient-to-b from-emerald-50 to-white py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-600">
            আমাদের সম্পর্কে
          </p>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            খাজা মোজাম্মেল হক ফাউন্ডেশন
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            সুফি দর্শনের আদর্শে অনুপ্রাণিত একটি অলাভজনক সংগঠন, যা শিক্ষা ও
            মানবসেবার মাধ্যমে সমাজে আলো ছড়াতে কাজ করে যাচ্ছে।
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-16 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm">
          <h2 className="mb-3 text-2xl font-semibold text-emerald-700">
            আমাদের লক্ষ্য
          </h2>
          <p className="leading-relaxed text-gray-600">
            অসচ্ছল ও মেধাবী শিক্ষার্থীদের শিক্ষাসহায়তা দেওয়া এবং সদকায়ে
            জারিয়ার মাধ্যমে টেকসই সমাজকল্যাণমূলক কাজ পরিচালনা করা।
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm">
          <h2 className="mb-3 text-2xl font-semibold text-emerald-700">
            আমাদের ভিশন
          </h2>
          <p className="leading-relaxed text-gray-600">
            এমন একটি সমাজ গড়ে তোলা, যেখানে প্রত্যেক মানুষ শিক্ষা, সম্মান ও
            সুযোগের সমান অধিকার পাবে।
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-center text-3xl font-bold">আমাদের গল্প</h2>
          <div className="space-y-4 leading-relaxed text-gray-600">
            <p>
              এখানে ফাউন্ডেশনের শুরুর গল্প লিখুন: কবে, কীভাবে এবং কেন এই
              ফাউন্ডেশন প্রতিষ্ঠিত হয়েছিল।
            </p>
            <p>
              এরপর লিখুন এখন পর্যন্ত কী কী কাজ হয়েছে এবং ভবিষ্যতের পরিকল্পনা কী।
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-emerald-600">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-emerald-50 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold">
            আমাদের মূল্যবোধ
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="mb-2 text-lg font-semibold text-emerald-700">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold">
          আমাদের নেতৃত্ব
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {team.map((member) => (
            <div key={member.role} className="text-center">
              <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-600">
                {member.name.charAt(0)}
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-emerald-700 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold">আমাদের পাশে দাঁড়ান</h2>
          <p className="mt-3 text-emerald-100">
            আপনার একটি ছোট অনুদানও কারও জীবন বদলে দিতে পারে।
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/donate"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              অনুদান দিন
            </Link>
            <Link
              href="/scholarship"
              className="rounded-lg border border-white px-6 py-3 font-semibold transition hover:bg-emerald-600"
            >
              বৃত্তির জন্য আবেদন
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
