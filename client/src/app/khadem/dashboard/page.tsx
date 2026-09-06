"use client";

import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Phone,
  Search,
  Settings,
  Users,
  UserRoundCheck,
  UserRoundX,
  X,
} from "lucide-react";

import { useState } from "react";

type PaymentStatus = "Paid" | "Due";

type Devotee = {
  id: number;
  name: string;
  phone: string;
  location: string;
  amount: number;
  status: PaymentStatus;
  lastPayment: string;
};

type Event = {
  id: number;
  name: string;
  date: string;
  location: string;
  totalDawat: number;
  completedDawat: number;
};

const devotees: Devotee[] = [
  {
    id: 1,
    name: "Md. Rahim Uddin",
    phone: "017XXXXXXXX",
    location: "Dhaka",
    amount: 500,
    status: "Due",
    lastPayment: "August 2026",
  },
  {
    id: 2,
    name: "Abdul Karim",
    phone: "018XXXXXXXX",
    location: "Jamalpur",
    amount: 1000,
    status: "Paid",
    lastPayment: "September 2026",
  },
  {
    id: 3,
    name: "Mohammad Hasan",
    phone: "019XXXXXXXX",
    location: "Mymensingh",
    amount: 500,
    status: "Due",
    lastPayment: "July 2026",
  },
  {
    id: 4,
    name: "Abdullah Al Mamun",
    phone: "016XXXXXXXX",
    location: "Tangail",
    amount: 500,
    status: "Paid",
    lastPayment: "September 2026",
  },
  {
    id: 5,
    name: "Nurul Islam",
    phone: "015XXXXXXXX",
    location: "Gazipur",
    amount: 1000,
    status: "Due",
    lastPayment: "August 2026",
  },
];

const events: Event[] = [
  {
    id: 1,
    name: "Monthly Dawat Program",
    date: "12 September 2026",
    location: "Dhaka",
    totalDawat: 80,
    completedDawat: 52,
  },
  {
    id: 2,
    name: "Monthly Foundation Program",
    date: "20 September 2026",
    location: "Jamalpur",
    totalDawat: 100,
    completedDawat: 64,
  },
  {
    id: 3,
    name: "Special Religious Program",
    date: "28 September 2026",
    location: "Mymensingh",
    totalDawat: 60,
    completedDawat: 31,
  },
];

export default function KhademDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [search, setSearch] = useState("");

  const paidCount = devotees.filter(
    (devotee) => devotee.status === "Paid"
  ).length;

  const dueCount = devotees.filter(
    (devotee) => devotee.status === "Due"
  ).length;

  const filteredDevotees = devotees.filter((devotee) => {
    const value = search.toLowerCase();

    return (
      devotee.name.toLowerCase().includes(value) ||
      devotee.phone.toLowerCase().includes(value) ||
      devotee.location.toLowerCase().includes(value) ||
      devotee.status.toLowerCase().includes(value)
    );
  });

  const menuItems = [
    {
      name: "Dashboard",
      icon: Home,
    },
    {
      name: "Devotees",
      icon: Users,
    },
    {
      name: "Payments",
      icon: CircleDollarSign,
    },
    {
      name: "Due List",
      icon: UserRoundX,
    },
    {
      name: "Dawat",
      icon: MessageCircle,
    },
    {
      name: "Events",
      icon: CalendarDays,
    },
    {
      name: "Reports",
      icon: ClipboardList,
    },
    {
      name: "Profile",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
        border-r border-slate-200 bg-white transition-transform duration-300
        lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}

        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              KMRF
            </h1>

            <p className="text-xs text-slate-500">
              Khadem Panel
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Khadem Management
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeMenu === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveMenu(item.name);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition
                  ${active
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                    }`}
                >
                  <Icon size={19} />
                  {item.name}

                  {/* Due Badge */}

                  {item.name === "Due List" && dueCount > 0 && (
                    <span
                      className={`ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold
                      ${active
                          ? "bg-white text-slate-900"
                          : "bg-red-100 text-red-600"
                        }`}
                    >
                      {dueCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User */}


      </aside>

      {/* ================= MAIN ================= */}

      <div className=" lg:ml-72">
        {/* Navbar */}

        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl p-2 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {activeMenu}
              </h2>

              <p className="hidden text-xs text-slate-500 sm:block">
                KMRF Khadem Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification */}

            <button className="relative rounded-xl p-2.5 hover:bg-slate-100">
              <Bell size={21} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* Profile */}

            <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-100">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                K
              </div>

              <div className="hidden md:block">
                <p className="text-sm font-semibold">
                  Khadem
                </p>

                <p className="text-xs text-slate-500">
                  KMRF
                </p>
              </div>

              <ChevronDown
                size={16}
                className="hidden md:block"
              />
            </button>
          </div>
        </header>

        {/* ================= CONTENT ================= */}

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Welcome */}

          <section className="mb-8">
            <div className="rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
              <p className="mb-2 text-sm text-slate-300">
                07 September 2026
              </p>

              <h1 className="text-2xl font-bold sm:text-3xl">
                Assalamu Alaikum, Khadem
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                এখান থেকে devotee-দের payment status,
                বকেয়া টাকা, dawat এবং বিভিন্ন অনুষ্ঠানের
                কার্যক্রম পরিচালনা করুন।
              </p>
            </div>
          </section>

          {/* ================= STATISTICS ================= */}

          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Devotees"
              value="1,240"
              subtitle="Registered devotees"
              icon={<Users size={22} />}
            />

            <StatCard
              title="Payment Received"
              value="986"
              subtitle="This month"
              icon={<UserRoundCheck size={22} />}
            />

            <StatCard
              title="Payment Due"
              value="254"
              subtitle="Need reminder"
              icon={<UserRoundX size={22} />}
            />

            <StatCard
              title="Upcoming Events"
              value="8"
              subtitle="This month"
              icon={<CalendarDays size={22} />}
            />
          </section>

          {/* ================= PAYMENT SUMMARY ================= */}

          <section className="mb-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Payment Overview
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Current month payment status
                  </p>
                </div>

                <CircleDollarSign
                  size={24}
                  className="text-slate-500"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <PaymentBox
                  title="Paid"
                  value="986"
                  percentage={79}
                  icon={<CheckCircle2 size={20} />}
                />

                <PaymentBox
                  title="Due"
                  value="254"
                  percentage={21}
                  icon={<UserRoundX size={20} />}
                />
              </div>
            </div>

            {/* Due Alert */}

            <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-red-600">
                <UserRoundX size={22} />
              </div>

              <h2 className="font-semibold text-red-900">
                Payment Due
              </h2>

              <p className="mt-2 text-sm leading-6 text-red-700">
                254 জন devotee-এর payment এখনো
                পাওয়া যায়নি।
              </p>

              <button
                onClick={() => setActiveMenu("Due List")}
                className="mt-5 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                View Due List
              </button>
            </div>
          </section>

          {/* ================= DUE DEVOTEES ================= */}

          <section className="mb-8 rounded-2xl border border-slate-200 bg-white">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Payment Due Devotees
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  যাদের payment এখনো পাওয়া যায়নি
                </p>
              </div>

              <div className="relative w-full md:w-72">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search devotee..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-slate-400 focus:bg-white"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left">
                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                      Devotee
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                      Location
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                      Due Amount
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                      Last Payment
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredDevotees
                    .filter((devotee) => devotee.status === "Due")
                    .map((devotee) => (
                      <tr
                        key={devotee.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold">
                              {devotee.name.charAt(0)}
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {devotee.name}
                              </p>

                              <p className="text-xs text-slate-500">
                                {devotee.phone}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {devotee.location}
                        </td>

                        <td className="px-6 py-4 text-sm font-semibold text-red-600">
                          ৳{devotee.amount}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {devotee.lastPayment}
                        </td>

                        <td className="px-6 py-4">
                          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                            Due
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              title="Call"
                              className="rounded-lg bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"
                            >
                              <Phone size={16} />
                            </button>

                            <button
                              title="Send Reminder"
                              className="rounded-lg bg-slate-900 p-2 text-white hover:bg-slate-700"
                            >
                              <MessageCircle size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ================= EVENTS ================= */}

          <section>
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Upcoming Dawat & Events
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                বিভিন্ন অনুষ্ঠানে dawat দেওয়ার progress
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {events.map((event) => {
                const progress =
                  (event.completedDawat / event.totalDawat) *
                  100;

                return (
                  <div
                    key={event.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                        <CalendarDays size={20} />
                      </div>

                      <span className="text-xs font-medium text-slate-500">
                        {event.date}
                      </span>
                    </div>

                    <h3 className="font-semibold text-slate-900">
                      {event.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {event.location}
                    </p>

                    <div className="mt-5">
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="text-slate-500">
                          Dawat Progress
                        </span>

                        <span className="font-semibold">
                          {event.completedDawat}/
                          {event.totalDawat}
                        </span>
                      </div>

                      <div className="h-2 rounded-full bg-slate-100">
                        <div
                          className="h-2 rounded-full bg-slate-900"
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveMenu("Dawat")}
                      className="mt-5 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Manage Dawat
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
          {icon}
        </div>

        <span className="text-xs text-slate-500">
          {subtitle}
        </span>
      </div>

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </h3>
    </div>
  );
}

function PaymentBox({
  title,
  value,
  percentage,
  icon,
}: {
  title: string;
  value: string;
  percentage: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
          {icon}
        </div>

        <span className="text-sm font-medium text-slate-700">
          {title}
        </span>
      </div>

      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-slate-900">
          {value}
        </span>

        <span className="text-sm font-semibold text-slate-600">
          {percentage}%
        </span>
      </div>

      <div className="mt-3 h-2 rounded-full bg-white">
        <div
          className="h-2 rounded-full bg-slate-900"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}