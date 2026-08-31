"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Tiro_Bangla, Hind_Siliguri } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChevronRight,
  faChevronDown,
  faHandHoldingHeart,
  faCalendarCheck,
  faSeedling,
  faCircleUser,
  faGear,
  faRightFromBracket,
  faShareNodes,
  faDownload,
  faLocationDot,
  faClock,
  faCircleCheck,
  faHouse,
  faInbox,
  faUserGroup,
  faEllipsis,
  faCopy,
  faQuoteLeft,
  faMosque,
  faCircleNotch,
  faTriangleExclamation,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import { getCurrentUser } from "@/services/userService";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Fonts
// ---------------------------------------------------------------------------

const displayFont = Tiro_Bangla({
  subsets: ["bengali"],
  weight: "400",
  variable: "--font-display",
});

const bodyFont = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const color = {
  page: "#F4EFE1",
  surface: "#FFFDF7",
  ink: "#1C2620",
  inkSoft: "#5B6B60",
  line: "rgba(15,74,56,0.14)",
  primary: "#0F4A38",
  primaryDark: "#0A362A",
  primaryTint: "rgba(15,74,56,0.08)",
  brass: "#A6791E",
  brassTint: "rgba(166,121,30,0.12)",
  money: "#8B3A2E",
  moneyTint: "rgba(139,58,46,0.08)",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Donation = {
  date: string;
  amount: string;
  purpose: string;
  status: "সম্পন্ন" | "প্রক্রিয়াধীন";
};

type EventItem = {
  title: string;
  date: string;
  time: string;
  location: string;
};

type ActivityItem = {
  text: string;
  time: string;
};

type MessageItem = {
  from: string;
  preview: string;
  time: string;
  unread: boolean;
};

type UserProfile = {
  kmrf_id?: string;
  kmrfId?: string;
  name?: string;
  photo?: string;
  photo_url?: string;
  district?: string;
  village?: string;
  contactNo?: string;
  contact_no?: string;
  followerMozammel?: boolean;
  follower_mozammel?: boolean;
  followerYunus?: boolean;
  follower_yunus?: boolean;
  otherNesbot?: boolean;
  other_nesbot?: boolean;
  totalDonated?: number | string;
  eventsAttended?: number | string;
  sadqahJariyah?: number | string;
};

type ApiResponse<T> = {
  data: T;
};

// ---------------------------------------------------------------------------
// Demo Data
// ---------------------------------------------------------------------------

const donations: Donation[] = [
  {
    date: "০১ মার্চ, ২০২৫",
    amount: "৫০০",
    purpose: "সাধারণ দান",
    status: "সম্পন্ন",
  },
  {
    date: "১৪ ফেব্রুয়ারি, ২০২৫",
    amount: "২,০০০",
    purpose: "ছাদকায়ে জারিয়া",
    status: "সম্পন্ন",
  },
  {
    date: "০৩ জানুয়ারি, ২০২৫",
    amount: "১০,০০০",
    purpose: "ইফতার মাহফিল",
    status: "প্রক্রিয়াধীন",
  },
];

const upcomingEvents: EventItem[] = [
  {
    title: "মাসিক জিকির মাহফিল",
    date: "১০ সেপ্টেম্বর, ২০২৬",
    time: "বাদ মাগরিব",
    location: "কেন্দ্রীয় দরবার শরীফ, শ্যামলী",
  },
  {
    title: "বার্ষিক ওরস শরীফ প্রস্তুতি সভা",
    date: "১৮ সেপ্টেম্বর, ২০২৬",
    time: "সকাল ১০:০০",
    location: "৩৭ শ্যামলীবাগ, ঢাকা",
  },
];

const volunteerRoles = [
  {
    title: "ওরস শরীফ — নিরাপত্তা টিম",
    seats: "৬টি আসন খালি",
  },
  {
    title: "ইফতার বিতরণ সহায়ক",
    seats: "১২টি আসন খালি",
  },
];

const activityFeed: ActivityItem[] = [
  {
    text: "আপনি ৫০০ টাকা দান করেছেন",
    time: "২ দিন আগে",
  },
  {
    text: "আপনি ইফতার মাহফিলের জন্য নিবন্ধন করেছেন",
    time: "৫ দিন আগে",
  },
  {
    text: "আপনার প্রোফাইল ছবি হালনাগাদ হয়েছে",
    time: "১ সপ্তাহ আগে",
  },
];

const messages: MessageItem[] = [
  {
    from: "ফাউন্ডেশন অফিস",
    preview: "আপনার দানের রশিদ প্রস্তুত হয়েছে, ডাউনলোড করুন।",
    time: "১ ঘন্টা আগে",
    unread: true,
  },
  {
    from: "খাদেম — ঢাকা জেলা",
    preview: "আগামী শুক্রবার মাহফিলে আপনার উপস্থিতি কাম্য।",
    time: "গতকাল",
    unread: true,
  },
];

const notifications = [
  {
    text: "আপনার ৫০০ টাকা দানের রশিদ প্রস্তুত",
    time: "১ ঘন্টা আগে",
  },
  {
    text: "জিকির মাহফিল আগামী বুধবার",
    time: "৬ ঘন্টা আগে",
  },
  {
    text: "প্রোফাইল সম্পূর্ণ করুন — কিছু তথ্য এখনও বাকি",
    time: "১ দিন আগে",
  },
];

const namazTimes = [
  { name: "ফজর", time: "৪:৩৮" },
  { name: "যোহর", time: "১২:০৪" },
  { name: "আসর", time: "৪:২৭" },
  { name: "মাগরিব", time: "৬:১৪" },
  { name: "এশা", time: "৭:৩২" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getInitials(name?: string): string {
  if (!name) return "?";

  const trimmed = name.trim();

  if (!trimmed) return "?";

  return trimmed.charAt(0);
}

type ProfileTask = {
  icon: IconDefinition;
  label: string;
  done: boolean;
};

function buildProfileTasks(
  user: UserProfile | null
): ProfileTask[] {
  return [
    {
      icon: faCircleUser,
      label: "প্রোফাইল ছবি",
      done: Boolean(user?.photo || user?.photo_url),
    },
    {
      icon: faLocationDot,
      label: "স্থায়ী ঠিকানা",
      done: Boolean(user?.district && user?.village),
    },
    {
      icon: faSeedling,
      label: "নেসবত তথ্য",
      done: Boolean(
        user?.followerMozammel ||
        user?.follower_mozammel ||
        user?.followerYunus ||
        user?.follower_yunus ||
        user?.otherNesbot ||
        user?.other_nesbot
      ),
    },
    {
      icon: faGear,
      label: "জরুরি যোগাযোগ নম্বর",
      done: Boolean(user?.contactNo || user?.contact_no),
    },
  ];
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border bg-[--surface] ${className}`}
      style={{
        borderColor: color.line,
        background: color.surface,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Domed Card
// ---------------------------------------------------------------------------

function DomedCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-t-[120px] rounded-b-lg border ${className}`}
      style={{
        borderColor: color.line,
        background: color.surface,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Card Header
// ---------------------------------------------------------------------------

function CardHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-between border-b px-5 py-4"
      style={{ borderColor: color.line }}
    >
      <h3
        className="font-[family-name:var(--font-display)] text-base sm:text-lg"
        style={{ color: color.ink }}
      >
        {title}
      </h3>

      {action}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Link Out
// ---------------------------------------------------------------------------

function LinkOut({
  label,
  href,
}: {
  label: string;
  href?: string;
}) {
  if (href) {
    return (
      <Link
        href={href}
        className="flex items-center gap-1 text-xs font-semibold transition hover:opacity-70 sm:text-sm"
        style={{ color: color.primary }}
      >
        {label}

        <FontAwesomeIcon
          icon={faChevronRight}
          className="text-[10px] sm:text-xs"
        />
      </Link>
    );
  }

  return (
    <button
      type="button"
      className="flex items-center gap-1 text-xs font-semibold transition hover:opacity-70 sm:text-sm"
      style={{ color: color.primary }}
    >
      {label}

      <FontAwesomeIcon
        icon={faChevronRight}
        className="text-[10px] sm:text-xs"
      />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

function DashboardHeader({
  user,
}: {
  user: UserProfile | null;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const photo = user?.photo || user?.photo_url;

  return (
    <header
      className="sticky top-0 z-30 border-b"
      style={{
        background: color.primary,
        borderColor: color.primaryDark,
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-t-full rounded-b-md"
            style={{ background: color.brass }}
          >
            <FontAwesomeIcon
              icon={faMosque}
              className="text-xs text-[#0A362A] sm:text-sm"
            />
          </div>

          <div className="leading-tight">
            <p className="font-[family-name:var(--font-display)] text-sm text-white sm:text-base">
              খাজা মোজাম্মেল হক (রঃ) ফাউন্ডেশন
            </p>

            <p className="hidden text-xs text-white/60 sm:block sm:text-sm">
              ভক্তবৃন্দের ড্যাশবোর্ড
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotifOpen((value) => !value);
                setMenuOpen(false);
              }}
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-white/85 transition hover:bg-white/10"
            >
              <FontAwesomeIcon
                icon={faBell}
                className="text-sm sm:text-base"
              />

              <span
                className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full ring-2"
                style={{
                  background: color.brass,
                  boxShadow: `0 0 0 2px ${color.primary}`,
                }}
              />
            </button>

            {notifOpen && (
              <div
                className="absolute right-0 mt-2 w-72 rounded-lg border bg-[--surface] p-2 shadow-lg"
                style={{
                  borderColor: color.line,
                  background: color.surface,
                }}
              >
                <p
                  className="px-3 py-2 text-xs font-semibold sm:text-sm"
                  style={{ color: color.inkSoft }}
                >
                  নোটিফিকেশন
                </p>

                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="rounded-md px-3 py-2 text-xs hover:bg-black/[0.03] sm:text-sm"
                    style={{ color: color.ink }}
                  >
                    <p className="font-medium">
                      {notification.text}
                    </p>

                    <p
                      className="mt-0.5 text-[11px] sm:text-xs"
                      style={{ color: color.inkSoft }}
                    >
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setMenuOpen((value) => !value);
                setNotifOpen(false);
              }}
              className="flex items-center gap-2 rounded-full border border-white/15 py-1 pl-1 pr-2.5 transition hover:bg-white/10"
            >
              {photo ? (
                <img
                  src={photo}
                  alt={user?.name ?? "প্রোফাইল ছবি"}
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold sm:text-xs"
                  style={{
                    background: color.brass,
                    color: color.primaryDark,
                  }}
                >
                  {getInitials(user?.name)}
                </span>
              )}

              <span className="hidden text-xs font-semibold text-white sm:block sm:text-sm">
                {user?.name ?? "লোড হচ্ছে..."}
              </span>

              <FontAwesomeIcon
                icon={faChevronDown}
                className="hidden text-[10px] text-white/60 sm:block sm:text-xs"
              />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 mt-2 w-52 rounded-lg border p-1.5 shadow-lg"
                style={{
                  borderColor: color.line,
                  background: color.surface,
                }}
              >
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-xs font-medium hover:bg-black/[0.03] sm:text-sm"
                  style={{ color: color.ink }}
                >
                  <FontAwesomeIcon
                    icon={faGear}
                    className="w-3.5"
                    style={{ color: color.inkSoft }}
                  />

                  প্রোফাইল সেটিংস
                </button>

                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-xs font-medium hover:bg-red-50 sm:text-sm"
                  style={{ color: color.money }}
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="w-3.5"
                  />

                  লগ আউট
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Stat Card
// ---------------------------------------------------------------------------

function StatCard({
  icon,
  value,
  label,
  suffix,
  accent = "primary",
}: {
  icon: IconDefinition;
  value: string;
  label: string;
  suffix?: string;
  accent?: "primary" | "brass" | "money";
}) {
  const tint =
    accent === "brass"
      ? color.brassTint
      : accent === "money"
        ? color.moneyTint
        : color.primaryTint;

  const fg =
    accent === "brass"
      ? color.brass
      : accent === "money"
        ? color.money
        : color.primary;

  return (
    <Card className="flex items-center gap-3.5 p-4">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
        style={{
          background: tint,
          color: fg,
        }}
      >
        <FontAwesomeIcon
          icon={icon}
          className="text-base sm:text-lg"
        />
      </div>

      <div>
        <p
          className="text-lg font-bold leading-none sm:text-xl"
          style={{ color: color.ink }}
        >
          {value}

          {suffix && (
            <span
              className="ml-0.5 text-xs font-semibold sm:text-sm"
              style={{ color: color.inkSoft }}
            >
              {suffix}
            </span>
          )}
        </p>

        <p
          className="mt-1 text-xs font-medium sm:text-sm"
          style={{ color: color.inkSoft }}
        >
          {label}
        </p>
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Welcome
// ---------------------------------------------------------------------------

function WelcomeSection({
  user,
  profilePercent,
}: {
  user: UserProfile | null;
  profilePercent: number;
}) {
  return (
    <section>
      <div className="mb-5">
        <h1
          className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl lg:text-4xl"
          style={{ color: color.ink }}
        >
          আসসালামু আলাইকুম
          {user?.name ? `, ${user.name}` : ""}
        </h1>

        <p
          className="mt-1 text-sm sm:text-base"
          style={{ color: color.inkSoft }}
        >
          আপনার আধ্যাত্মিক ও দানের অগ্রগতি একনজরে দেখুন
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          icon={faHandHoldingHeart}
          value={`৳${user?.totalDonated ?? 0}`}
          label="মোট দান (এই বছর)"
          accent="money"
        />

        <StatCard
          icon={faCalendarCheck}
          value={String(user?.eventsAttended ?? 0)}
          label="অংশগ্রহণকৃত অনুষ্ঠান"
          accent="primary"
        />

        <StatCard
          icon={faSeedling}
          value={`৳${user?.sadqahJariyah ?? 0}`}
          label="ছাদকায়ে জারিয়া"
          accent="brass"
        />

        <StatCard
          icon={faCircleUser}
          value={String(profilePercent)}
          suffix="%"
          label="প্রোফাইল সম্পূর্ণ"
          accent="primary"
        />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Quick Actions
// ---------------------------------------------------------------------------

function QuickActions({
  kmrfId,
}: {
  kmrfId: string;
}) {
  const actions = [
    {
      icon: faHandHoldingHeart,
      label: "দান করুন",
      primary: true,
      href: `/dashboard/${encodeURIComponent(kmrfId)}/donate`,
    },
    {
      icon: faCalendarCheck,
      label: "অনুষ্ঠানে যোগ দিন",
      primary: false,
      href: "#events",
    },
    {
      icon: faCircleUser,
      label: "প্রোফাইল হালনাগাদ",
      primary: false,
      href: "#profile",
    },
    {
      icon: faShareNodes,
      label: "বন্ধুকে আমন্ত্রণ",
      primary: false,
      href: "#referral",
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {actions.map((action, index) => (
        <Link
          href={action.href}
          key={index}
          className="flex items-center gap-3 rounded-lg border p-4 text-left transition hover:-translate-y-0.5"
          style={
            action.primary
              ? {
                background: color.money,
                borderColor: color.money,
                color: "#fff",
              }
              : {
                background: color.surface,
                borderColor: color.line,
                color: color.ink,
              }
          }
        >
          <FontAwesomeIcon
            icon={action.icon}
            className="text-sm sm:text-base"
          />

          <span className="text-xs font-bold leading-tight sm:text-sm">
            {action.label}
          </span>
        </Link>
      ))}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Donation Management
// ---------------------------------------------------------------------------

function DonationManagement() {
  const [recurring, setRecurring] = useState(true);

  return (
    <Card>
      <CardHeader
        title="দানের বিবরণ"
        action={
          <LinkOut
            label="সব দেখুন"
            href="/donations"
          />
        }
      />

      <div
        className="flex items-center justify-between gap-3 border-b px-5 py-3"
        style={{
          borderColor: color.line,
          background: color.primaryTint,
        }}
      >
        <div>
          <p
            className="text-xs font-bold sm:text-sm"
            style={{ color: color.ink }}
          >
            মাসিক স্বয়ংক্রিয় দান
          </p>

          <p
            className="text-[11px] sm:text-xs"
            style={{ color: color.inkSoft }}
          >
            প্রতি মাসের ১ তারিখে স্বয়ংক্রিয়ভাবে কর্তন হবে
          </p>
        </div>

        <button
          type="button"
          onClick={() => setRecurring((value) => !value)}
          className="relative h-6 w-11 shrink-0 rounded-full transition"
          style={{
            background: recurring
              ? color.primary
              : "#D9D3C1",
          }}
        >
          <span
            className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all"
            style={{
              left: recurring ? "22px" : "2px",
            }}
          />
        </button>
      </div>

      <div>
        {donations.map((donation, index) => (
          <div
            key={index}
            className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-3.5 last:border-b-0"
            style={{ borderColor: color.line }}
          >
            <div>
              <p
                className="text-sm font-semibold sm:text-base"
                style={{ color: color.ink }}
              >
                ৳{donation.amount} — {donation.purpose}
              </p>

              <p
                className="text-[11px] sm:text-xs"
                style={{ color: color.inkSoft }}
              >
                {donation.date}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-bold sm:text-xs"
                style={
                  donation.status === "সম্পন্ন"
                    ? {
                      background: "#E4F0EA",
                      color: "#0F4A38",
                    }
                    : {
                      background: color.brassTint,
                      color: color.brass,
                    }
                }
              >
                {donation.status}
              </span>

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/[0.04]"
                style={{ color: color.inkSoft }}
              >
                <FontAwesomeIcon
                  icon={faDownload}
                  className="text-xs sm:text-sm"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Engagement
// ---------------------------------------------------------------------------

function EngagementSection() {
  return (
    <div
      id="events"
      className="grid grid-cols-1 gap-5 lg:grid-cols-2"
    >
      <Card>
        <CardHeader
          title="আসন্ন অনুষ্ঠান"
          action={
            <LinkOut
              label="ক্যালেন্ডার"
              href="/events"
            />
          }
        />

        <div>
          {upcomingEvents.map((event, index) => (
            <div
              key={index}
              className="flex items-start gap-3 border-b px-5 py-4 last:border-b-0"
              style={{ borderColor: color.line }}
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: color.primaryTint,
                  color: color.primary,
                }}
              >
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  className="text-sm sm:text-base"
                />
              </div>

              <div className="flex-1">
                <p
                  className="text-sm font-bold sm:text-base"
                  style={{ color: color.ink }}
                >
                  {event.title}
                </p>

                <p
                  className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs"
                  style={{ color: color.inkSoft }}
                >
                  <span>{event.date}</span>

                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-[9px] sm:text-[10px]"
                    />
                    {event.time}
                  </span>

                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-[9px] sm:text-[10px]"
                    />
                    {event.location}
                  </span>
                </p>
              </div>

              <button
                type="button"
                className="shrink-0 rounded-md border px-3 py-1.5 text-[11px] font-bold transition hover:text-white sm:text-xs"
                style={{
                  borderColor: color.primary,
                  color: color.primary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    color.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "transparent";
                }}
              >
                নিবন্ধন
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="স্বেচ্ছাসেবক সুযোগ" />

        <div>
          {volunteerRoles.map((volunteer, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 border-b px-5 py-4 last:border-b-0"
              style={{ borderColor: color.line }}
            >
              <div>
                <p
                  className="text-sm font-semibold sm:text-base"
                  style={{ color: color.ink }}
                >
                  {volunteer.title}
                </p>

                <p
                  className="text-[11px] sm:text-xs"
                  style={{ color: color.inkSoft }}
                >
                  {volunteer.seats}
                </p>
              </div>

              <button
                type="button"
                className="shrink-0 rounded-md px-3 py-1.5 text-[11px] font-bold text-white transition hover:opacity-90 sm:text-xs"
                style={{ background: color.primary }}
              >
                আবেদন করুন
              </button>
            </div>
          ))}
        </div>

        <div
          className="border-t px-5 py-4"
          style={{ borderColor: color.line }}
        >
          <p
            className="mb-3 text-xs font-semibold sm:text-sm"
            style={{ color: color.inkSoft }}
          >
            সাম্প্রতিক কার্যক্রম
          </p>

          <ul className="space-y-3">
            {activityFeed.map((activity, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 text-xs sm:text-sm"
                style={{ color: color.ink }}
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: color.brass }}
                />

                <span>
                  {activity.text}

                  <span
                    className="ml-2 text-[11px] sm:text-xs"
                    style={{ color: color.inkSoft }}
                  >
                    {activity.time}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Nesbot Tree
// ---------------------------------------------------------------------------

function NesbotTree() {
  return (
    <svg
      viewBox="0 0 320 220"
      className="mx-auto w-full max-w-xs"
    >
      <g
        stroke={color.brass}
        strokeWidth="1.4"
        fill="none"
        opacity="0.85"
      >
        <path d="M160 190 C160 150, 160 150, 160 118" />
        <path d="M160 118 C160 90, 90 80, 55 55" />
        <path d="M160 118 C160 90, 230 80, 265 55" />
        <path d="M55 55 C40 40, 40 40, 30 25" />
        <path d="M55 55 C55 38, 55 38, 55 22" />
        <path d="M265 55 C280 40, 280 40, 290 25" />
        <path d="M265 55 C265 38, 265 38, 265 22" />
      </g>

      <circle
        cx="160"
        cy="190"
        r="16"
        fill={color.primary}
      />

      <text
        x="160"
        y="194"
        textAnchor="middle"
        fontSize="10"
        fill="#fff"
        fontWeight="700"
      >
        আপনি
      </text>

      <circle
        cx="160"
        cy="118"
        r="13"
        fill={color.surface}
        stroke={color.primary}
        strokeWidth="1.6"
      />

      <text
        x="160"
        y="103"
        textAnchor="middle"
        fontSize="10"
        fill={color.primary}
        fontWeight="700"
      >
        নেসবত
      </text>

      <circle
        cx="55"
        cy="55"
        r="11"
        fill={color.surface}
        stroke={color.brass}
        strokeWidth="1.6"
      />

      <text
        x="55"
        y="42"
        textAnchor="middle"
        fontSize="9.5"
        fill={color.ink}
        fontWeight="600"
      >
        খাজা মোজাম্মেল হক (রঃ)
      </text>

      <circle
        cx="265"
        cy="55"
        r="11"
        fill={color.surface}
        stroke={color.brass}
        strokeWidth="1.6"
      />

      <text
        x="265"
        y="42"
        textAnchor="middle"
        fontSize="9.5"
        fill={color.ink}
        fontWeight="600"
      >
        খাজা ইউনুস আলী (রঃ)
      </text>

      <circle
        cx="30"
        cy="25"
        r="4"
        fill={color.brass}
      />

      <circle
        cx="55"
        cy="22"
        r="4"
        fill={color.brass}
      />

      <circle
        cx="290"
        cy="25"
        r="4"
        fill={color.brass}
      />

      <circle
        cx="265"
        cy="22"
        r="4"
        fill={color.brass}
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Spiritual Corner
// ---------------------------------------------------------------------------

function SpiritualCorner() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <DomedCard className="lg:col-span-2">
        <div className="px-6 pb-6 pt-14 text-center sm:pt-16">
          <FontAwesomeIcon
            icon={faQuoteLeft}
            className="text-sm sm:text-base"
            style={{ color: color.brass }}
          />

          <p
            className="mx-auto mt-3 max-w-md font-[family-name:var(--font-display)] text-lg leading-relaxed sm:text-xl lg:text-2xl"
            style={{ color: color.ink }}
          >
            নিশ্চয়ই আল্লাহর স্মরণেই অন্তরসমূহ প্রশান্তি লাভ করে।
          </p>

          <p
            className="mt-2 text-xs font-semibold sm:text-sm"
            style={{ color: color.inkSoft }}
          >
            সূরা রা&apos;দ, আয়াত: ২৮
          </p>

          <div
            className="mx-auto mt-6 max-w-sm rounded-lg p-4 text-left"
            style={{ background: color.primaryTint }}
          >
            <p
              className="text-xs font-bold sm:text-sm"
              style={{ color: color.primary }}
            >
              সংক্ষিপ্ত দোয়া
            </p>

            <p
              className="mt-1.5 text-sm sm:text-base"
              style={{ color: color.ink }}
            >
              রাব্বি জিদনি ইলমা — &quot;হে আমার প্রতিপালক, আমার জ্ঞান বৃদ্ধি
              করে দাও।&quot;
            </p>
          </div>

          <div className="mt-8 text-left">
            <p
              className="mb-3 text-center text-xs font-semibold sm:text-sm"
              style={{ color: color.inkSoft }}
            >
              নেসবত বৃক্ষ
            </p>

            <NesbotTree />
          </div>
        </div>
      </DomedCard>

      <Card className="p-5">
        <div
          className="mb-4 flex items-center gap-2"
          style={{ color: color.primary }}
        >
          <FontAwesomeIcon
            icon={faMosque}
            className="text-xs sm:text-sm"
          />

          <p className="text-xs font-semibold sm:text-sm">
            নামাযের সময়সূচী
          </p>
        </div>

        <ul>
          {namazTimes.map((namaz, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b py-2.5 text-sm last:border-b-0 sm:text-base"
              style={{ borderColor: color.line }}
            >
              <span
                className="font-medium"
                style={{ color: color.ink }}
              >
                {namaz.name}
              </span>

              <span
                className="font-bold"
                style={{ color: color.ink }}
              >
                {namaz.time}
              </span>
            </li>
          ))}
        </ul>

        <p
          className="mt-3 text-[10px] sm:text-xs"
          style={{ color: color.inkSoft }}
        >
          ঢাকার স্থানীয় সময় অনুযায়ী (আনুমানিক)
        </p>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Community
// ---------------------------------------------------------------------------

function CommunitySection() {
  const [copied, setCopied] = useState(false);

  const referralLink =
    "kmrf.org/join?ref=abdur-rahman-241";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        referralLink
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Card>
        <CardHeader
          title="ইনবক্স"
          action={<LinkOut label="সব দেখুন" />}
        />

        <div>
          {messages.map((message, index) => (
            <div
              key={index}
              className="flex items-start gap-3 border-b px-5 py-3.5 last:border-b-0"
              style={{ borderColor: color.line }}
            >
              <span
                className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: color.primaryTint,
                  color: color.primary,
                }}
              >
                <FontAwesomeIcon
                  icon={faInbox}
                  className="text-xs sm:text-sm"
                />
              </span>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p
                    className="text-xs font-bold sm:text-sm"
                    style={{ color: color.ink }}
                  >
                    {message.from}
                  </p>

                  {message.unread && (
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: color.money }}
                    />
                  )}
                </div>

                <p
                  className="mt-0.5 text-xs sm:text-sm"
                  style={{ color: color.inkSoft }}
                >
                  {message.preview}
                </p>

                <p
                  className="mt-1 text-[10px] sm:text-xs"
                  style={{ color: color.inkSoft }}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card
        id="referral"
        className="p-5"
      >
        <div
          className="mb-3 flex items-center gap-2"
          style={{ color: color.primary }}
        >
          <FontAwesomeIcon
            icon={faUserGroup}
            className="text-xs sm:text-sm"
          />

          <p className="text-xs font-semibold sm:text-sm">
            রেফারেল প্রোগ্রাম
          </p>
        </div>

        <p
          className="text-xs sm:text-sm"
          style={{ color: color.inkSoft }}
        >
          আপনার লিংক দিয়ে এ পর্যন্ত ৩ জন বন্ধু যুক্ত হয়েছেন
        </p>

        <div
          className="mt-4 flex items-center gap-2 rounded-lg border px-3.5 py-2.5"
          style={{
            borderColor: color.line,
            background: color.primaryTint,
          }}
        >
          <span
            className="flex-1 truncate text-xs font-medium sm:text-sm"
            style={{ color: color.ink }}
          >
            {referralLink}
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-bold text-white transition hover:opacity-90 sm:text-xs"
            style={{ background: color.primary }}
          >
            <FontAwesomeIcon
              icon={copied ? faCircleCheck : faCopy}
              className="text-[10px] sm:text-xs"
            />

            {copied ? "কপি হয়েছে" : "কপি করুন"}
          </button>
        </div>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Profile Completion
// ---------------------------------------------------------------------------

function ProfileCompletionNudge({
  tasks,
  percent,
}: {
  tasks: ProfileTask[];
  percent: number;
}) {
  const remaining = tasks.filter(
    (task) => !task.done
  ).length;

  return (
    <Card
      id="profile"
      className="p-5"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div
            className="mb-1 flex items-center gap-2"
            style={{ color: color.primary }}
          >
            <FontAwesomeIcon
              icon={faCircleUser}
              className="text-xs sm:text-sm"
            />

            <p className="text-xs font-semibold sm:text-sm">
              প্রোফাইল সম্পূর্ণ করুন
            </p>
          </div>

          <p
            className="text-xs sm:text-sm"
            style={{ color: color.inkSoft }}
          >
            {remaining > 0
              ? `আর মাত্র ${remaining}টি তথ্য দিলেই আপনার প্রোফাইল ১০০% সম্পূর্ণ হবে`
              : "আপনার প্রোফাইল সম্পূর্ণ হয়েছে"}
          </p>

          <div
            className="mt-3 h-2 w-full max-w-xs overflow-hidden rounded-full"
            style={{ background: color.line }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${percent}%`,
                background: color.brass,
              }}
            />
          </div>

          <p
            className="mt-1.5 text-[11px] font-bold sm:text-xs"
            style={{ color: color.ink }}
          >
            {percent}% সম্পূর্ণ
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:max-w-[260px] sm:justify-end">
          {tasks.map((task, index) => (
            <span
              key={index}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold sm:text-xs"
              style={
                task.done
                  ? {
                    borderColor: "#BFE0CF",
                    background: "#E4F0EA",
                    color: "#0F4A38",
                  }
                  : {
                    borderColor: color.line,
                    background: color.primaryTint,
                    color: color.primary,
                  }
              }
            >
              <FontAwesomeIcon
                icon={
                  task.done
                    ? faCircleCheck
                    : task.icon
                }
                className="text-[10px] sm:text-xs"
              />

              {task.label}
            </span>
          ))}
        </div>
      </div>

      {remaining > 0 && (
        <button
          type="button"
          className="mt-4 w-full rounded-lg py-2.5 text-xs font-bold text-white transition hover:opacity-90 sm:w-auto sm:px-6 sm:text-sm"
          style={{ background: color.primary }}
        >
          এখনই সম্পূর্ণ করুন
        </button>
      )}
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Mobile Bottom Navigation
// ---------------------------------------------------------------------------

function MobileBottomNav({
  kmrfId,
}: {
  kmrfId: string;
}) {
  const items = [
    {
      icon: faHouse,
      label: "হোম",
      href: `/dashboard/${encodeURIComponent(kmrfId)}`,
    },
    {
      icon: faHandHoldingHeart,
      label: "দান",
      href: `/dashboard/${encodeURIComponent(kmrfId)}/donate`,
    },
    {
      icon: faCalendarCheck,
      label: "অনুষ্ঠান",
      href: "#events",
    },
    {
      icon: faCircleUser,
      label: "প্রোফাইল",
      href: "#profile",
    },
    {
      icon: faEllipsis,
      label: "আরও",
      href: "#referral",
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t bg-white/95 backdrop-blur sm:hidden"
      style={{ borderColor: color.line }}
    >
      <div className="mx-auto flex max-w-6xl items-stretch justify-between px-2">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            onClick={() => setActive(index)}
            className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold sm:text-xs"
            style={{
              color:
                active === index
                  ? color.primary
                  : color.inkSoft,
            }}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className="text-base sm:text-lg"
            />

            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function UserDashboard() {
  const params = useParams<{
    kmrfId: string;
  }>();

  const rawKmrfId = params?.kmrfId;

  let validKmrfId: string | null = null;

  if (
    rawKmrfId &&
    typeof rawKmrfId === "string"
  ) {
    try {
      const decoded = decodeURIComponent(
        rawKmrfId
      ).trim();

      if (
        decoded &&
        decoded !== "null" &&
        decoded !== "undefined"
      ) {
        validKmrfId = decoded;
      }
    } catch (error) {
      console.error(
        "Invalid KMRF ID:",
        error
      );
    }
  }

  const [user, setUser] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    if (!validKmrfId) {
      setError(
        "প্রোফাইল আইডি পাওয়া যায়নি।"
      );

      setLoading(false);

      return;
    }

    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response =
          (await getCurrentUser(
            validKmrfId
          )) as ApiResponse<UserProfile>;

        if (cancelled) return;

        if (
          !response ||
          !response.data
        ) {
          setError(
            "ব্যবহারকারীর তথ্য পাওয়া যায়নি।"
          );

          return;
        }

        setUser(response.data);
      } catch (err) {
        console.error(
          "Dashboard user fetch error:",
          err
        );

        if (!cancelled) {
          setError(
            "প্রোফাইল তথ্য লোড করতে সমস্যা হয়েছে।"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [validKmrfId]);

  // -------------------------------------------------------------------------
  // Loading
  // -------------------------------------------------------------------------

  if (loading) {
    return (
      <div
        className={`${displayFont.variable} ${bodyFont.variable} flex min-h-screen items-center justify-center font-[family-name:var(--font-body)]`}
        style={{ background: color.page }}
      >
        <div
          className="flex flex-col items-center gap-3"
          style={{ color: color.primary }}
        >
          <FontAwesomeIcon
            icon={faCircleNotch}
            spin
            className="text-2xl sm:text-3xl"
          />

          <p className="text-sm font-semibold sm:text-base">
            প্রোফাইল লোড হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Error
  // -------------------------------------------------------------------------

  if (error) {
    return (
      <div
        className={`${displayFont.variable} ${bodyFont.variable} flex min-h-screen items-center justify-center px-4 font-[family-name:var(--font-body)]`}
        style={{ background: color.page }}
      >
        <div
          className="max-w-sm rounded-lg border p-6 text-center"
          style={{
            borderColor: "#F3D7D2",
            background: color.surface,
          }}
        >
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-2xl sm:text-3xl"
            style={{ color: color.money }}
          />

          <p
            className="mt-3 text-sm font-semibold sm:text-base"
            style={{ color: color.ink }}
          >
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-4 rounded-lg px-5 py-2 text-xs font-bold text-white transition hover:opacity-90 sm:text-sm"
            style={{ background: color.primary }}
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Profile calculation
  // -------------------------------------------------------------------------

  const profileTasks =
    buildProfileTasks(user);

  const doneCount =
    profileTasks.filter(
      (task) => task.done
    ).length;

  const profilePercent =
    profileTasks.length > 0
      ? Math.round(
        (doneCount /
          profileTasks.length) *
        100
      )
      : 0;

  // -------------------------------------------------------------------------
  // Final Page
  // -------------------------------------------------------------------------

  return (
    <div
      className={`${displayFont.variable} ${bodyFont.variable} min-h-screen pb-20 font-[family-name:var(--font-body)] antialiased sm:pb-10`}
      style={{ background: color.page }}
    >
      {/* Header চাইলে uncomment করতে পারেন */}
      {/* <DashboardHeader user={user} /> */}

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6 sm:py-10">
        <WelcomeSection
          user={user}
          profilePercent={profilePercent}
        />

        {validKmrfId && (
          <QuickActions
            kmrfId={validKmrfId}
          />
        )}

        <DonationManagement />

        <EngagementSection />

        <SpiritualCorner />

        <CommunitySection />

        <ProfileCompletionNudge
          tasks={profileTasks}
          percent={profilePercent}
        />

        <div
          className="rounded-lg border p-4 text-center text-[11px] sm:text-xs"
          style={{
            borderColor: color.line,
            color: color.inkSoft,
          }}
        >
          খাজা মোজাম্মেল হক (রঃ) ফাউন্ডেশন ·
          ৩৭ শ্যামলীবাগ, শ্যামলী, ঢাকা-১২০৭
        </div>
      </main>

      {validKmrfId && (
        <MobileBottomNav
          kmrfId={validKmrfId}
        />
      )}
    </div>
  );
}