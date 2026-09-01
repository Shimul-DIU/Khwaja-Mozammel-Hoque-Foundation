
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "শিক্ষা সহায়তা",
    description:
      "অসহায় ও মেধাবী শিক্ষার্থীদের শিক্ষা কার্যক্রমে সহযোগিতা করা এবং তাদের ভবিষ্যৎ গড়তে পাশে থাকা।",
    image: "/studyActivity2.jpg",
    category: "শিক্ষা",
  },
  {
    id: 2,
    title: "স্বাস্থ্যসেবা",
    description:
      "সুবিধাবঞ্চিত মানুষের জন্য চিকিৎসা সহায়তা, স্বাস্থ্য সচেতনতা এবং প্রয়োজনীয় স্বাস্থ্যসেবা প্রদান।",
    image: "/health-program-2024-8.jpg",
    category: "স্বাস্থ্য",
  },
  {
    id: 3,
    title: "মানবিক সহায়তা",
    description:
      "দুঃস্থ ও অসহায় মানুষের পাশে দাঁড়িয়ে খাদ্য, বস্ত্র এবং প্রয়োজনীয় সামগ্রী দিয়ে সহযোগিতা করা।",
    image: "/ouractivity.jpg",
    category: "মানবিক সহায়তা",
  },
  {
    id: 4,
    title: "সদকায়ে জারিয়া",
    description:
      "মানুষের কল্যাণে দীর্ঘস্থায়ী ও সওয়াবের কাজগুলো বাস্তবায়নের মাধ্যমে সমাজে ইতিবাচক পরিবর্তন আনা।",
    image: "/Sadka-E-Zaria-3.jpg",
    category: "সদকায়ে জারিয়া",
  },
  {
    id: 5,
    title: "দারিদ্র্য বিমোচন",
    description:
      "দরিদ্র ও সুবিধাবঞ্চিত পরিবারকে স্বাবলম্বী করে তুলতে বিভিন্ন সহায়তা ও উন্নয়নমূলক কার্যক্রম পরিচালনা।",
    image: "/sadka-zaria2.jpg",
    category: "সামাজিক উন্নয়ন",
  },
  {
    id: 6,
    title: "শীতবস্ত্র বিতরণ",
    description:
      "শীতকালে অসহায় ও দরিদ্র মানুষের মাঝে শীতবস্ত্র বিতরণের মাধ্যমে তাদের কষ্ট লাঘব করা।",
    image: "/images/activities/winter.jpg",
    category: "মানবিক কার্যক্রম",
  },
];

export default function AllActivities() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          {/* <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-green-700">
            KMRF Activities
          </span> */}

          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            আমাদের সকল কার্যক্রম
          </h2>

          {/* <p className="mt-4 text-base leading-7 text-gray-600">
            মানুষের কল্যাণ ও সমাজের উন্নয়নে আমরা বিভিন্ন মানবিক,
            সামাজিক ও সেবামূলক কার্যক্রম পরিচালনা করে থাকি।
          </p> */}
        </div>

        {/* Activities Grid */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Category */}
                <div className="absolute left-4 top-4 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-green-700 shadow">
                  {activity.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 transition group-hover:text-green-700">
                  {activity.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                  {activity.description}
                </p>

                <Link
                  href={`/ activities / ${ activity.id } `}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition hover:gap-3"
                >
                  বিস্তারিত দেখুন
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 rounded-full bg-green-700 px-7 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            সকল কার্যক্রম দেখুন
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

