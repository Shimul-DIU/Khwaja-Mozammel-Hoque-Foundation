"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return null;
}

// import { startTransition, useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faDiamond,
//   faBell,
//   faChevronRight,
//   faChevronDown,
//   faHandHoldingHeart,
//   faCalendarCheck,
//   faSeedling,
//   faCircleUser,
//   faGear,
//   faRightFromBracket,
//   faPlus,
//   faUserGroup,
//   faShareNodes,
//   faDownload,
//   faLocationDot,
//   faClock,
//   faCircleCheck,
//   faHouse,
//   faInbox,
//   faEllipsis,
//   faCopy,
//   faQuoteLeft,
//   faMosque,
//   faCircleNotch,
//   faTriangleExclamation,
//   type IconDefinition,
// } from "@fortawesome/free-solid-svg-icons";

// import { getCurrentUser } from "@/services/userService";


// type Donation = {
//   date: string;
//   amount: string;
//   purpose: string;
//   status: "সম্পন্ন" | "প্রক্রিয়াধীন";
// };

// type EventItem = {
//   title: string;
//   date: string;
//   time: string;
//   location: string;
// };

// type ActivityItem = {
//   text: string;
//   time: string;
// };

// type MessageItem = {
//   from: string;
//   preview: string;
//   time: string;
//   unread: boolean;
// };


// type UserProfile = {
//   _id?: string;
//   name?: string;
//   photo_url?: string;
//   district?: string;
//   village?: string;
//   contact_no?: string;
//   follower_mozammel?: boolean;
//   follower_yunus?: boolean;
//   other_nesbot?: boolean;
//   totalDonated?: number | string;
//   eventsAttended?: number | string;
//   sadqahJariyah?: number | string;
// };

// const donations: Donation[] = [
//   { date: "০১ মার্চ, ২০২৫", amount: "৫০০", purpose: "সাধারণ দান", status: "সম্পন্ন" },
//   { date: "১৪ ফেব্রুয়ারি, ২০২৫", amount: "২,০০০", purpose: "ছাদকায়ে জারিয়া", status: "সম্পন্ন" },
//   { date: "০৩ জানুয়ারি, ২০২৫", amount: "১০,০০০", purpose: "ইফতার মাহফিল", status: "প্রক্রিয়াধীন" },
// ];

// const upcomingEvents: EventItem[] = [
//   {
//     title: "মাসিক জিকির মাহফিল",
//     date: "১০ সেপ্টেম্বর, ২০২৬",
//     time: "বাদ মাগরিব",
//     location: "কেন্দ্রীয় দরবার শরীফ, শ্যামলী",
//   },
//   {
//     title: "বার্ষিক ওরস শরীফ প্রস্তুতি সভা",
//     date: "১৮ সেপ্টেম্বর, ২০২৬",
//     time: "সকাল ১০:০০",
//     location: "৩৭ শ্যামলীবাগ, ঢাকা",
//   },
// ];

// const volunteerRoles = [
//   { title: "ওরস শরীফ — নিরাপত্তা টিম", seats: "৬টি আসন খালি" },
//   { title: "ইফতার বিতরণ সহায়ক", seats: "১২টি আসন খালি" },
// ];

// const activityFeed: ActivityItem[] = [
//   { text: "আপনি ৫০০ টাকা দান করেছেন", time: "২ দিন আগে" },
//   { text: "আপনি ইফতার মাহফিলের জন্য নিবন্ধন করেছেন", time: "৫ দিন আগে" },
//   { text: "আপনার প্রোফাইল ছবি হালনাগাদ হয়েছে", time: "১ সপ্তাহ আগে" },
// ];

// const messages: MessageItem[] = [
//   {
//     from: "ফাউন্ডেশন অফিস",
//     preview: "আপনার দানের রশিদ প্রস্তুত হয়েছে, ডাউনলোড করুন।",
//     time: "১ ঘন্টা আগে",
//     unread: true,
//   },
//   {
//     from: "খাদেম — ঢাকা জেলা",
//     preview: "আগামী শুক্রবার মাহফিলে আপনার উপস্থিতি কাম্য।",
//     time: "গতকাল",
//     unread: true,
//   },
// ];

// const notifications = [
//   { text: "আপনার ৫০০ টাকা দানের রশিদ প্রস্তুত", time: "১ ঘন্টা আগে" },
//   { text: "জিকির মাহফিল আগামী বুধবার", time: "৬ ঘন্টা আগে" },
//   { text: "প্রোফাইল সম্পূর্ণ করুন — কিছু তথ্য এখনও বাকি", time: "১ দিন আগে" },
// ];

// const namazTimes = [
//   { name: "ফজর", time: "৪:৩৮" },
//   { name: "যোহর", time: "১২:০৪" },
//   { name: "আসর", time: "৪:২৭" },
//   { name: "মাগরিব", time: "৬:১৪" },
//   { name: "এশা", time: "৭:৩২" },
// ];

// // ---------------------------------------------------------------------------
// // Helpers derived from the real fetched user
// // ---------------------------------------------------------------------------

// function getInitials(name?: string): string {
//   if (!name) return "?";
//   const trimmed = name.trim();
//   return trimmed ? trimmed.charAt(0) : "?";
// }

// type ProfileTask = { icon: IconDefinition; label: string; done: boolean };

// function buildProfileTasks(user: UserProfile | null): ProfileTask[] {
//   return [
//     {
//       icon: faCircleUser, label: "প্রোফাইল ছবি", done: Boolean(user?.photo_url
//       )
//     },
//     {
//       icon: faLocationDot,
//       label: "স্থায়ী ঠিকানা",
//       done: Boolean(user?.district && user?.village),
//     },
//     {
//       icon: faSeedling,
//       label: "নেসবত তথ্য",
//       done: Boolean(user?.follower_mozammel || user?.follower_yunus || user?.other_nesbot),
//     },
//     { icon: faGear, label: "জরুরি যোগাযোগ নম্বর", done: Boolean(user?.contact_no) },
//   ];
// }

// // ---------------------------------------------------------------------------
// // Small building blocks
// // ---------------------------------------------------------------------------

// function Card({
//   children,
//   className = "",
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) {
//   return (
//     <div
//       className={`rounded-2xl border border-amber-900/10 bg-white shadow-sm ${className}`}
//     >
//       {children}
//     </div>
//   );
// }

// function CardHeader({
//   title,
//   action,
// }: {
//   title: string;
//   action?: React.ReactNode;
// }) {
//   return (
//     <div className="flex items-center justify-between border-b border-amber-900/10 px-5 py-4">
//       <h3 className="text-sm font-bold text-stone-800">{title}</h3>
//       {action}
//     </div>
//   );
// }

// function LinkOut({ label }: { label: string }) {
//   return (
//     <button
//       type="button"
//       className="flex items-center gap-1 text-xs font-semibold text-[#8a3324] hover:underline"
//     >
//       {label}
//       <FontAwesomeIcon icon={faChevronRight} className="text-[9px]" />
//     </button>
//   );
// }

// // ---------------------------------------------------------------------------
// // 1. Header
// // ---------------------------------------------------------------------------

// function DashboardHeader({ user }: { user: UserProfile | null }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [notifOpen, setNotifOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-30 border-b border-amber-900/10 bg-[#fdf8f0]/95 backdrop-blur">
//       <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
//         <div className="flex items-center gap-3">
//           <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8a3324] text-amber-50">
//             <FontAwesomeIcon icon={faDiamond} className="text-sm" />
//           </div>
//           <div className="leading-tight">
//             <p className="text-sm font-bold text-stone-900">
//               খাজা মোজাম্মেল হক (রঃ) ফাউন্ডেশন
//             </p>
//             <p className="hidden text-[11px] text-stone-500 sm:block">
//               ভক্তবৃন্দের ড্যাশবোর্ড
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-2 sm:gap-4">
//           <div className="relative">
//             <button
//               type="button"
//               onClick={() => {
//                 setNotifOpen((v) => !v);
//                 setMenuOpen(false);
//               }}
//               className="relative flex h-9 w-9 items-center justify-center rounded-full text-stone-600 transition hover:bg-amber-100/60"
//             >
//               <FontAwesomeIcon icon={faBell} />
//               <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#8a3324] ring-2 ring-[#fdf8f0]" />
//             </button>

//             {notifOpen && (
//               <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-amber-900/10 bg-white p-2 shadow-xl">
//                 <p className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-stone-500">
//                   নোটিফিকেশন
//                 </p>
//                 {notifications.map((n, i) => (
//                   <div
//                     key={i}
//                     className="rounded-xl px-3 py-2 text-xs text-stone-700 hover:bg-amber-50/70"
//                   >
//                     <p className="font-medium">{n.text}</p>
//                     <p className="mt-0.5 text-[10px] text-stone-400">{n.time}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="relative">
//             <button
//               type="button"
//               onClick={() => {
//                 setMenuOpen((v) => !v);
//                 setNotifOpen(false);
//               }}
//               className="flex items-center gap-2 rounded-full border border-amber-900/10 py-1 pl-1 pr-2.5 transition hover:bg-amber-100/50"
//             >
//               {user?.photo_url ? (
//                 <img
//                   src={user.photo_url}
//                   alt={user?.name ?? "প্রোফাইল ছবি"}
//                   className="h-7 w-7 rounded-full object-cover"
//                 />
//               ) : (
//                 <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8a3324] text-[11px] font-bold text-white">
//                   {getInitials(user?.name)}
//                 </span>
//               )}
//               <span className="hidden text-xs font-semibold text-stone-800 sm:block">
//                 {user?.name ?? "লোড হচ্ছে..."}
//               </span>
//               <FontAwesomeIcon
//                 icon={faChevronDown}
//                 className="hidden text-[9px] text-stone-500 sm:block"
//               />
//             </button>

//             {menuOpen && (
//               <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-amber-900/10 bg-white p-1.5 shadow-xl">
//                 <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium text-stone-700 hover:bg-amber-50/70">
//                   <FontAwesomeIcon icon={faGear} className="w-3.5 text-stone-400" />
//                   প্রোফাইল সেটিংস
//                 </button>
//                 <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium text-red-700 hover:bg-red-50">
//                   <FontAwesomeIcon icon={faRightFromBracket} className="w-3.5 text-red-400" />
//                   লগ আউট
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// // ---------------------------------------------------------------------------
// // 2. Welcome & impact summary
// // ---------------------------------------------------------------------------

// function StatCard({
//   icon,
//   value,
//   label,
//   suffix,
// }: {
//   icon: IconDefinition;
//   value: string;
//   label: string;
//   suffix?: string;
// }) {
//   return (
//     <Card className="flex items-center gap-3.5 p-4">
//       <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#8a3324]/10 text-[#8a3324]">
//         <FontAwesomeIcon icon={icon} />
//       </div>
//       <div>
//         <p className="text-lg font-black leading-none text-stone-900">
//           {value}
//           {suffix && (
//             <span className="ml-0.5 text-xs font-semibold text-stone-400">
//               {suffix}
//             </span>
//           )}
//         </p>
//         <p className="mt-1 text-[11px] font-medium text-stone-500">{label}</p>
//       </div>
//     </Card>
//   );
// }

// function WelcomeSection({
//   user,
//   profilePercent,
// }: {
//   user: UserProfile | null;
//   profilePercent: number;
// }) {
//   return (
//     <section>
//       <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <h1 className="font-serif text-xl font-black text-stone-900 sm:text-2xl">
//             আসসালামু আলাইকুম{user?.name ? `, ${user.name}` : ""}
//           </h1>
//           <p className="text-xs text-stone-500 sm:text-sm">
//             আপনার আধ্যাত্মিক ও দানের অগ্রগতি একনজরে দেখুন
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
//         <StatCard
//           icon={faHandHoldingHeart}
//           value={`৳${user?.totalDonated ?? 0}`}
//           label="মোট দান (এই বছর)"
//         />
//         <StatCard
//           icon={faCalendarCheck}
//           value={String(user?.eventsAttended ?? 0)}
//           label="অংশগ্রহণকৃত অনুষ্ঠান"
//         />
//         <StatCard
//           icon={faSeedling}
//           value={`৳${user?.sadqahJariyah ?? 0}`}
//           label="ছাদকায়ে জারিয়া"
//         />
//         <StatCard
//           icon={faCircleUser}
//           value={String(profilePercent)}
//           suffix="%"
//           label="প্রোফাইল সম্পূর্ণ"
//         />
//       </div>
//     </section>
//   );
// }

// // ---------------------------------------------------------------------------
// // 3. Quick actions
// // ---------------------------------------------------------------------------

// function QuickActions() {
//   const actions = [
//     { icon: faHandHoldingHeart, label: "দান করুন" },
//     { icon: faCalendarCheck, label: "অনুষ্ঠানে যোগ দিন" },
//     { icon: faCircleUser, label: "প্রোফাইল হালনাগাদ" },
//     { icon: faShareNodes, label: "বন্ধুকে আমন্ত্রণ" },
//   ];

//   return (
//     <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
//       {actions.map((a, i) => (
//         <button
//           key={i}
//           type="button"
//           className={`flex items-center gap-3 rounded-2xl border p-4 text-left shadow-sm transition ${i === 0
//             ? "border-[#8a3324] bg-[#8a3324] text-white hover:bg-[#722a1d]"
//             : "border-amber-900/10 bg-white text-stone-800 hover:border-amber-300 hover:bg-amber-50/60"
//             }`}
//         >
//           <FontAwesomeIcon icon={a.icon} className="text-base" />
//           <span className="text-xs font-bold leading-tight sm:text-sm">
//             {a.label}
//           </span>
//         </button>
//       ))}
//     </section>
//   );
// }

// // ---------------------------------------------------------------------------
// // 4. Donation management
// // ---------------------------------------------------------------------------

// function DonationManagement() {
//   const [recurring, setRecurring] = useState(true);

//   return (
//     <Card>
//       <CardHeader
//         title="দানের বিবরণ"
//         action={<LinkOut label="সব দেখুন" />}
//       />

//       <div className="flex items-center justify-between gap-3 border-b border-amber-900/10 bg-amber-50/40 px-5 py-3">
//         <div>
//           <p className="text-xs font-bold text-stone-800">মাসিক স্বয়ংক্রিয় দান</p>
//           <p className="text-[11px] text-stone-500">প্রতি মাসের ১ তারিখে স্বয়ংক্রিয়ভাবে কর্তন হবে</p>
//         </div>
//         <button
//           type="button"
//           onClick={() => setRecurring((v) => !v)}
//           className={`relative h-6 w-11 shrink-0 rounded-full transition ${recurring ? "bg-[#8a3324]" : "bg-stone-300"
//             }`}
//         >
//           <span
//             className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${recurring ? "left-[22px]" : "left-0.5"
//               }`}
//           />
//         </button>
//       </div>

//       <div className="divide-y divide-amber-900/10">
//         {donations.map((d, i) => (
//           <div
//             key={i}
//             className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5"
//           >
//             <div>
//               <p className="text-sm font-semibold text-stone-800">
//                 ৳{d.amount} — {d.purpose}
//               </p>
//               <p className="text-[11px] text-stone-400">{d.date}</p>
//             </div>

//             <div className="flex items-center gap-3">
//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${d.status === "সম্পন্ন"
//                   ? "bg-emerald-50 text-emerald-700"
//                   : "bg-amber-100 text-amber-700"
//                   }`}
//               >
//                 {d.status}
//               </span>
//               <button className="flex h-7 w-7 items-center justify-center rounded-lg text-stone-400 hover:bg-amber-50 hover:text-[#8a3324]">
//                 <FontAwesomeIcon icon={faDownload} className="text-xs" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </Card>
//   );
// }

// // ---------------------------------------------------------------------------
// // 5. Engagement & activities
// // ---------------------------------------------------------------------------

// function EngagementSection() {
//   return (
//     <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
//       <Card>
//         <CardHeader title="আসন্ন অনুষ্ঠান" action={<LinkOut label="ক্যালেন্ডার" />} />
//         <div className="divide-y divide-amber-900/10">
//           {upcomingEvents.map((e, i) => (
//             <div key={i} className="flex items-start gap-3 px-5 py-4">
//               <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-[#8a3324]/10 text-[#8a3324]">
//                 <FontAwesomeIcon icon={faCalendarCheck} className="text-sm" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-bold text-stone-800">{e.title}</p>
//                 <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-stone-500">
//                   <span>{e.date}</span>
//                   <span className="flex items-center gap-1">
//                     <FontAwesomeIcon icon={faClock} className="text-[9px]" />
//                     {e.time}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <FontAwesomeIcon icon={faLocationDot} className="text-[9px]" />
//                     {e.location}
//                   </span>
//                 </p>
//               </div>
//               <button className="shrink-0 rounded-lg border border-[#8a3324] px-3 py-1.5 text-[11px] font-bold text-[#8a3324] hover:bg-[#8a3324] hover:text-white">
//                 নিবন্ধন
//               </button>
//             </div>
//           ))}
//         </div>
//       </Card>

//       <Card>
//         <CardHeader title="স্বেচ্ছাসেবক সুযোগ" />
//         <div className="divide-y divide-amber-900/10">
//           {volunteerRoles.map((v, i) => (
//             <div key={i} className="flex items-center justify-between gap-3 px-5 py-4">
//               <div>
//                 <p className="text-sm font-semibold text-stone-800">{v.title}</p>
//                 <p className="text-[11px] text-stone-400">{v.seats}</p>
//               </div>
//               <button className="shrink-0 rounded-lg bg-[#8a3324] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#722a1d]">
//                 আবেদন করুন
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="border-t border-amber-900/10 px-5 py-4">
//           <p className="mb-3 text-xs font-bold uppercase tracking-wide text-stone-400">
//             সাম্প্রতিক কার্যক্রম
//           </p>
//           <ul className="space-y-3">
//             {activityFeed.map((a, i) => (
//               <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
//                 <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8a3324]/50" />
//                 <span>
//                   {a.text}
//                   <span className="ml-2 text-stone-400">{a.time}</span>
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </Card>
//     </div>
//   );
// }

// // ---------------------------------------------------------------------------
// // 6. Spiritual corner — includes the signature Nesbot Tree
// // ---------------------------------------------------------------------------

// function NesbotTree() {
//   return (
//     <svg viewBox="0 0 320 220" className="mx-auto w-full max-w-xs">
//       <g stroke="#c68a3d" strokeWidth="1.4" fill="none" opacity="0.9">
//         <path d="M160 190 C160 150, 160 150, 160 118" />
//         <path d="M160 118 C160 90, 90 80, 55 55" />
//         <path d="M160 118 C160 90, 230 80, 265 55" />
//         <path d="M55 55 C40 40, 40 40, 30 25" />
//         <path d="M55 55 C55 38, 55 38, 55 22" />
//         <path d="M265 55 C280 40, 280 40, 290 25" />
//         <path d="M265 55 C265 38, 265 38, 265 22" />
//       </g>

//       <circle cx="160" cy="190" r="16" fill="#8a3324" />
//       <text x="160" y="194" textAnchor="middle" fontSize="9" fill="#fdf8f0" fontWeight="700">
//         আপনি
//       </text>

//       <circle cx="160" cy="118" r="13" fill="#fdf8f0" stroke="#8a3324" strokeWidth="1.6" />
//       <text x="160" y="103" textAnchor="middle" fontSize="9" fill="#8a3324" fontWeight="700">
//         নেসবত
//       </text>

//       <circle cx="55" cy="55" r="11" fill="#fdf8f0" stroke="#c68a3d" strokeWidth="1.6" />
//       <text x="55" y="42" textAnchor="middle" fontSize="8.5" fill="#5c4326" fontWeight="600">
//         খাজা মোজাম্মেল হক (রঃ)
//       </text>

//       <circle cx="265" cy="55" r="11" fill="#fdf8f0" stroke="#c68a3d" strokeWidth="1.6" />
//       <text x="265" y="42" textAnchor="middle" fontSize="8.5" fill="#5c4326" fontWeight="600">
//         খাজা ইউনুস আলী (রঃ)
//       </text>

//       <circle cx="30" cy="25" r="4" fill="#c68a3d" />
//       <circle cx="55" cy="22" r="4" fill="#c68a3d" />
//       <circle cx="290" cy="25" r="4" fill="#c68a3d" />
//       <circle cx="265" cy="22" r="4" fill="#c68a3d" />
//     </svg>
//   );
// }

// function SpiritualCorner() {
//   return (
//     <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
//       <Card className="p-5 lg:col-span-2">
//         <div className="mb-4 flex items-center gap-2 text-[#8a3324]">
//           <FontAwesomeIcon icon={faQuoteLeft} className="text-xs" />
//           <p className="text-xs font-bold uppercase tracking-wide">আজকের আয়াত</p>
//         </div>
//         <p className="font-serif text-base leading-relaxed text-stone-800 sm:text-lg">
//           "নিশ্চয়ই আল্লাহর স্মরণেই অন্তরসমূহ প্রশান্তি লাভ করে।"
//         </p>
//         <p className="mt-2 text-xs font-semibold text-stone-500">— সূরা রা'দ, আয়াত: ২৮</p>

//         <div className="mt-6 rounded-xl bg-amber-50/60 p-4">
//           <p className="text-xs font-bold uppercase tracking-wide text-[#8a3324]">সংক্ষিপ্ত দোয়া</p>
//           <p className="mt-1.5 text-sm text-stone-700">
//             রাব্বি জিদনি ইলমা — "হে আমার প্রতিপালক, আমার জ্ঞান বৃদ্ধি করে দাও।"
//           </p>
//         </div>

//         <div className="mt-6">
//           <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#8a3324]">
//             নেসবত বৃক্ষ
//           </p>
//           <NesbotTree />
//         </div>
//       </Card>

//       <Card className="p-5">
//         <div className="mb-4 flex items-center gap-2 text-[#8a3324]">
//           <FontAwesomeIcon icon={faMosque} className="text-xs" />
//           <p className="text-xs font-bold uppercase tracking-wide">নামাযের সময়সূচী</p>
//         </div>
//         <ul className="divide-y divide-amber-900/10">
//           {namazTimes.map((n, i) => (
//             <li key={i} className="flex items-center justify-between py-2.5 text-sm">
//               <span className="font-medium text-stone-700">{n.name}</span>
//               <span className="font-bold text-stone-900">{n.time}</span>
//             </li>
//           ))}
//         </ul>
//         <p className="mt-3 text-[10px] text-stone-400">ঢাকার স্থানীয় সময় অনুযায়ী (আনুমানিক)</p>
//       </Card>
//     </div>
//   );
// }

// // ---------------------------------------------------------------------------
// // 7. Community & messaging
// // ---------------------------------------------------------------------------

// function CommunitySection() {
//   const [copied, setCopied] = useState(false);

//   return (
//     <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
//       <Card>
//         <CardHeader title="ইনবক্স" action={<LinkOut label="সব দেখুন" />} />
//         <div className="divide-y divide-amber-900/10">
//           {messages.map((m, i) => (
//             <div key={i} className="flex items-start gap-3 px-5 py-3.5">
//               <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8a3324]/10 text-[#8a3324]">
//                 <FontAwesomeIcon icon={faInbox} className="text-xs" />
//               </span>
//               <div className="flex-1">
//                 <div className="flex items-center gap-2">
//                   <p className="text-xs font-bold text-stone-800">{m.from}</p>
//                   {m.unread && (
//                     <span className="h-1.5 w-1.5 rounded-full bg-[#8a3324]" />
//                   )}
//                 </div>
//                 <p className="mt-0.5 text-xs text-stone-500">{m.preview}</p>
//                 <p className="mt-1 text-[10px] text-stone-400">{m.time}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </Card>

//       <Card className="p-5">
//         <div className="mb-3 flex items-center gap-2 text-[#8a3324]">
//           <FontAwesomeIcon icon={faUserGroup} className="text-xs" />
//           <p className="text-xs font-bold uppercase tracking-wide">রেফারেল প্রোগ্রাম</p>
//         </div>
//         <p className="text-xs text-stone-500">
//           আপনার লিংক দিয়ে এ পর্যন্ত ৩ জন বন্ধু যুক্ত হয়েছেন
//         </p>

//         <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-900/15 bg-amber-50/40 px-3.5 py-2.5">
//           <span className="flex-1 truncate text-xs font-medium text-stone-600">
//             kmrf.org/join?ref=abdur-rahman-241
//           </span>
//           <button
//             type="button"
//             onClick={() => setCopied(true)}
//             className="flex items-center gap-1.5 rounded-lg bg-[#8a3324] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#722a1d]"
//           >
//             <FontAwesomeIcon icon={copied ? faCircleCheck : faCopy} className="text-[10px]" />
//             {copied ? "কপি হয়েছে" : "কপি করুন"}
//           </button>
//         </div>
//       </Card>
//     </div>
//   );
// }

// // ---------------------------------------------------------------------------
// // 8. Profile completion nudge — now computed from real fetched user fields
// // ---------------------------------------------------------------------------

// function ProfileCompletionNudge({
//   tasks,
//   percent,
// }: {
//   tasks: ProfileTask[];
//   percent: number;
// }) {
//   const remaining = tasks.filter((t) => !t.done).length;

//   return (
//     <Card className="p-5">
//       <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//         <div className="flex-1">
//           <div className="mb-1 flex items-center gap-2 text-[#8a3324]">
//             <FontAwesomeIcon icon={faCircleUser} className="text-xs" />
//             <p className="text-xs font-bold uppercase tracking-wide">প্রোফাইল সম্পূর্ণ করুন</p>
//           </div>
//           <p className="text-xs text-stone-500 sm:text-sm">
//             {remaining > 0
//               ? `আর মাত্র ${remaining}টি তথ্য দিলেই আপনার প্রোফাইল ১০০% সম্পূর্ণ হবে`
//               : "আপনার প্রোফাইল সম্পূর্ণ হয়েছে"}
//           </p>

//           <div className="mt-3 h-2 w-full max-w-xs overflow-hidden rounded-full bg-amber-900/10">
//             <div
//               className="h-full rounded-full bg-[#c68a3d]"
//               style={{ width: `${percent}%` }}
//             />
//           </div>
//           <p className="mt-1.5 text-[11px] font-bold text-stone-600">
//             {percent}% সম্পূর্ণ
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-2 sm:max-w-[260px] sm:justify-end">
//           {tasks.map((t, i) => (
//             <span
//               key={i}
//               className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${t.done
//                 ? "border-emerald-200 bg-emerald-50 text-emerald-700"
//                 : "border-[#8a3324]/30 bg-[#8a3324]/5 text-[#8a3324]"
//                 }`}
//             >
//               <FontAwesomeIcon
//                 icon={t.done ? faCircleCheck : t.icon}
//                 className="text-[10px]"
//               />
//               {t.label}
//             </span>
//           ))}
//         </div>
//       </div>

//       {remaining > 0 && (
//         <button
//           type="button"
//           className="mt-4 w-full rounded-xl bg-[#8a3324] py-2.5 text-xs font-bold text-white transition hover:bg-[#722a1d] sm:w-auto sm:px-6"
//         >
//           এখনই সম্পূর্ণ করুন
//         </button>
//       )}
//     </Card>
//   );
// }

// // ---------------------------------------------------------------------------
// // 9. Mobile bottom navigation
// // ---------------------------------------------------------------------------

// function MobileBottomNav() {
//   const items = [
//     { icon: faHouse, label: "হোম" },
//     { icon: faHandHoldingHeart, label: "দান" },
//     { icon: faCalendarCheck, label: "অনুষ্ঠান" },
//     { icon: faCircleUser, label: "প্রোফাইল" },
//     { icon: faEllipsis, label: "আরও" },
//   ];

//   const [active, setActive] = useState(0);

//   return (
//     <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-amber-900/10 bg-white/95 backdrop-blur sm:hidden">
//       <div className="mx-auto flex max-w-6xl items-stretch justify-between px-2">
//         {items.map((it, i) => (
//           <button
//             key={i}
//             type="button"
//             onClick={() => setActive(i)}
//             className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-semibold ${active === i ? "text-[#8a3324]" : "text-stone-400"
//               }`}
//           >
//             <FontAwesomeIcon icon={it.icon} className="text-base" />
//             {it.label}
//           </button>
//         ))}
//       </div>
//     </nav>
//   );
// }

// // ---------------------------------------------------------------------------
// // Main dashboard
// // ---------------------------------------------------------------------------

// export default function UserDashboard() {
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const kmrfId = new URLSearchParams(window.location.search).get("kmrfId");
//     let cancelled = false;

//     if (!kmrfId) {
//       startTransition(() => {
//         setError("প্রোফাইল আইডি পাওয়া যায়নি।");
//         setLoading(false);
//       });
//       return () => {
//         cancelled = true;
//       };
//     }

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const data = await getCurrentUser(kmrfId);

//         if (!cancelled) {
//           setUser(data.data);
//         }
//       } catch (err) {
//         console.error(err);
//         if (!cancelled) {
//           setError("প্রোফাইল তথ্য লোড করতে সমস্যা হয়েছে।");
//         }
//       } finally {
//         if (!cancelled) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchData();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   // Loading state — shown before the first successful fetch
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#f7f5f0]">
//         <div className="flex flex-col items-center gap-3 text-[#8a3324]">
//           <FontAwesomeIcon icon={faCircleNotch} spin className="text-2xl" />
//           <p className="text-sm font-semibold">প্রোফাইল লোড হচ্ছে...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state — fetch failed
//   if (error) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#f7f5f0] px-4">
//         <div className="max-w-sm rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
//           <FontAwesomeIcon icon={faTriangleExclamation} className="text-2xl text-red-500" />
//           <p className="mt-3 text-sm font-semibold text-stone-800">{error}</p>
//           <button
//             type="button"
//             onClick={() => window.location.reload()}
//             className="mt-4 rounded-xl bg-[#8a3324] px-5 py-2 text-xs font-bold text-white hover:bg-[#722a1d]"
//           >
//             আবার চেষ্টা করুন
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const profileTasks = buildProfileTasks(user);
//   const doneCount = profileTasks.filter((t) => t.done).length;
//   const profilePercent = Math.round((doneCount / profileTasks.length) * 100);

//   return (
//     <div className="min-h-screen bg-[#f7f5f0] pb-20 font-sans antialiased sm:pb-10">
//       <DashboardHeader user={user} />

//       <main className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6 sm:py-10">
//         <WelcomeSection user={user} profilePercent={profilePercent} />
//         <QuickActions />
//         <DonationManagement />
//         <EngagementSection />
//         <SpiritualCorner />
//         <CommunitySection />
//         <ProfileCompletionNudge tasks={profileTasks} percent={profilePercent} />

//         <div className="rounded-2xl border border-amber-900/10 bg-white p-4 text-center text-[11px] text-stone-400">
//           <FontAwesomeIcon icon={faPlus} className="mr-1.5 hidden" />
//           খাজা মোজাম্মেল হক (রঃ) ফাউন্ডেশন · ৩৭ শ্যামলীবাগ, শ্যামলী, ঢাকা-১২০৭
//         </div>
//       </main>

//       <MobileBottomNav />
//     </div>
//   );
// }
