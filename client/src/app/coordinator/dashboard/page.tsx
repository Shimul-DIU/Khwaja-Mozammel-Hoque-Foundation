"use client";

import { useState } from "react";

import {
  Bell,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  UserRoundCheck,
  Users,
  X,
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ======================================================
// TYPES
// ======================================================

type PaymentStatus = {
  name: string;
  value: number;
  color: string;
};

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

// ======================================================
// DEMO DATA
// Later replace with API / MongoDB data
// ======================================================

// 1. Monthly Collection

const monthlyCollection = [
  { month: "Jan", collection: 85000 },
  { month: "Feb", collection: 92000 },
  { month: "Mar", collection: 78000 },
  { month: "Apr", collection: 110000 },
  { month: "May", collection: 125000 },
  { month: "Jun", collection: 118000 },
  { month: "Jul", collection: 132000 },
  { month: "Aug", collection: 145000 },
  { month: "Sep", collection: 138000 },
  { month: "Oct", collection: 152000 },
  { month: "Nov", collection: 160000 },
  { month: "Dec", collection: 175000 },
];

// 2. Payment Status

const paymentStatus: PaymentStatus[] = [
  {
    name: "Paid",
    value: 820,
    color: "#16a34a",
  },
  {
    name: "Pending",
    value: 310,
    color: "#f59e0b",
  },
  {
    name: "Partial",
    value: 120,
    color: "#ef4444",
  },
];

// 3. Area Wise Devotees

const areaWiseDevotees = [
  {
    area: "Jamalpur",
    devotees: 320,
  },
  {
    area: "Sarishabari",
    devotees: 250,
  },
  {
    area: "Melandaha",
    devotees: 210,
  },
  {
    area: "Madarganj",
    devotees: 180,
  },
  {
    area: "Islampur",
    devotees: 290,
  },
  {
    area: "Dewanganj",
    devotees: 150,
  },
];

// 4. Event Participation

const eventParticipation = [
  {
    event: "Milad",
    invited: 450,
    attended: 390,
  },
  {
    event: "Urs",
    invited: 700,
    attended: 620,
  },
  {
    event: "Dawat",
    invited: 520,
    attended: 430,
  },
  {
    event: "Mahfil",
    invited: 850,
    attended: 720,
  },
  {
    event: "Sadka",
    invited: 400,
    attended: 350,
  },
];

// 5. Khadem Activity

const khademActivity = [
  {
    month: "Jan",
    completed: 32,
  },
  {
    month: "Feb",
    completed: 38,
  },
  {
    month: "Mar",
    completed: 41,
  },
  {
    month: "Apr",
    completed: 48,
  },
  {
    month: "May",
    completed: 52,
  },
  {
    month: "Jun",
    completed: 57,
  },
  {
    month: "Jul",
    completed: 61,
  },
  {
    month: "Aug",
    completed: 68,
  },
];

// Recent Activities

const recentActivities = [
  {
    title: "New devotee registered",
    description: "Abdul Karim joined from Sarishabari",
    time: "10 minutes ago",
  },
  {
    title: "Payment received",
    description: "৳5,000 collection received from a devotee",
    time: "35 minutes ago",
  },
  {
    title: "Event created",
    description: "Upcoming Urs event has been added",
    time: "1 hour ago",
  },
  {
    title: "Khadem assigned",
    description: "Md. Rahim assigned to Jamalpur area",
    time: "2 hours ago",
  },
];

// ======================================================
// HELPER FUNCTION
// ======================================================

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-BD").format(value);
};

// ======================================================
// STAT CARD
// ======================================================

function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconBg,
  iconColor,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

// ======================================================
// SIDEBAR ITEM
// ======================================================

function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex w-full items-center gap-3
        rounded-xl px-4 py-3
        text-sm font-medium
        transition duration-200
        ${active
          ? "bg-green-700 text-white shadow-sm"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }
      `}
    >
      {icon}

      <span>{label}</span>
    </button>
  );
}

// ======================================================
// PAYMENT LEGEND
// ======================================================

function PaymentLegend() {
  return (
    <div className="mt-2 space-y-3">
      {paymentStatus.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: item.color,
              }}
            />

            <span className="text-sm text-gray-600">
              {item.name}
            </span>
          </div>

          <span className="text-sm font-semibold text-gray-800">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ======================================================
// MAIN DASHBOARD
// ======================================================

export default function CoordinatorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* ==================================================
          MOBILE OVERLAY
      ================================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ==================================================
          LEFT SIDEBAR
      ================================================== */}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-64 flex-col
          border-r border-gray-200 bg-white
          transition-transform duration-300

          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >

        {/* ==================================================
            LOGO
        ================================================== */}

        <div className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200 px-6">

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-green-700">
              KMRF
            </h1>

            <p className="mt-0.5 text-xs text-gray-500">
              Coordinator Panel
            </p>
          </div>

          {/* Mobile Close */}

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>

        </div>

        {/* ==================================================
            NAVIGATION
        ================================================== */}

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">

          <p className="mb-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            Main Menu
          </p>

          {/* Dashboard */}

          <SidebarItem
            icon={<LayoutDashboard size={19} />}
            label="Dashboard"
            active
          />

          {/* Devotees */}

          <SidebarItem
            icon={<Users size={19} />}
            label="Devotees"
          />

          {/* Khadems */}

          <SidebarItem
            icon={<UserRoundCheck size={19} />}
            label="Khadems"
          />

          {/* Events */}

          <SidebarItem
            icon={<CalendarDays size={19} />}
            label="Events"
          />

          {/* Collection */}

          <SidebarItem
            icon={<CircleDollarSign size={19} />}
            label="Collection"
          />

          {/* Reports */}

          <SidebarItem
            icon={<ClipboardList size={19} />}
            label="Reports"
          />

          <div className="my-5 border-t border-gray-100" />

          <p className="mb-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            System
          </p>

          {/* Notifications */}

          <SidebarItem
            icon={<Bell size={19} />}
            label="Notifications"
          />

          {/* Settings */}

          <SidebarItem
            icon={<Settings size={19} />}
            label="Settings"
          />

        </nav>

        {/* ==================================================
            COORDINATOR PROFILE
        ================================================== */}

        <div className="border-t border-gray-200 p-4">

          <div className="mb-3 flex items-center gap-3 rounded-xl bg-gray-50 p-3">

            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-full bg-green-700
                text-sm font-bold text-white
              "
            >
              C
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-semibold text-gray-900">
                Coordinator
              </p>

              <p className="truncate text-xs text-gray-500">
                Jamalpur Zone
              </p>

            </div>

          </div>

          {/* Logout */}

          <button
            className="
              flex w-full items-center gap-3
              rounded-xl px-4 py-3
              text-sm font-medium text-red-600
              transition hover:bg-red-50
            "
          >
            <LogOut size={19} />

            <span>Logout</span>
          </button>

        </div>

      </aside>

      {/* ==================================================
          MAIN AREA
      ================================================== */}

      <main className="min-h-screen lg:ml-64">

        {/* ==================================================
            TOP HEADER
        ================================================== */}

        <header
          className="
            sticky top-0 z-30
            flex h-20 items-center justify-between
            border-b border-gray-200
            bg-white/95 px-4
            backdrop-blur
            sm:px-6
            lg:px-8
          "
        >

          {/* LEFT HEADER */}

          <div className="flex items-center gap-3">

            {/* Mobile Menu */}

            <button
              onClick={() => setSidebarOpen(true)}
              className="
                rounded-xl p-2
                text-gray-600
                hover:bg-gray-100
                lg:hidden
              "
            >
              <Menu size={24} />
            </button>

            <div>

              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                Coordinator Dashboard
              </h2>

              <p className="hidden text-xs text-gray-500 sm:block">
                Manage your KMRF activities and members
              </p>

            </div>

          </div>

          {/* RIGHT HEADER */}

          <div className="flex items-center gap-2 sm:gap-4">

            {/* Notification */}

            <button
              className="
                relative rounded-xl p-2.5
                text-gray-600
                hover:bg-gray-100
              "
            >

              <Bell size={21} />

              <span
                className="
                  absolute right-1.5 top-1.5
                  h-2 w-2 rounded-full
                  bg-red-500
                "
              />

            </button>

            {/* Profile */}

            <div
              className="
                hidden items-center gap-3
                rounded-xl border border-gray-200
                px-3 py-2
                sm:flex
              "
            >

              <div
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full bg-green-700
                  text-sm font-bold text-white
                "
              >
                C
              </div>

              <div>

                <p className="text-sm font-semibold text-gray-900">
                  Coordinator
                </p>

                <p className="text-xs text-gray-500">
                  Jamalpur Zone
                </p>

              </div>

              <ChevronDown
                size={16}
                className="text-gray-500"
              />

            </div>

          </div>

        </header>

        {/* ==================================================
            DASHBOARD CONTENT
        ================================================== */}

        <section className="p-4 sm:p-6 lg:p-8">

          {/* ==================================================
              WELCOME
          ================================================== */}

          <div className="mb-6">

            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, Coordinator
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Here is an overview of your KMRF activities.
            </p>

          </div>

          {/* ==================================================
              STAT CARDS
          ================================================== */}

          <div
            className="
              grid gap-4
              sm:grid-cols-2
              xl:grid-cols-4
            "
          >

            <StatCard
              title="Total Devotees"
              value="1,250"
              subtitle="+8.4% from last month"
              icon={<Users size={22} />}
              iconBg="bg-green-50"
              iconColor="text-green-700"
            />

            <StatCard
              title="Active Khadems"
              value="35"
              subtitle="31 completed tasks"
              icon={<UserRoundCheck size={22} />}
              iconBg="bg-blue-50"
              iconColor="text-blue-700"
            />

            <StatCard
              title="Total Collection"
              value="৳6.80 L"
              subtitle="+12.5% this month"
              icon={<CircleDollarSign size={22} />}
              iconBg="bg-purple-50"
              iconColor="text-purple-700"
            />

            <StatCard
              title="Pending Payments"
              value="120"
              subtitle="Need follow-up"
              icon={<ClipboardList size={22} />}
              iconBg="bg-orange-50"
              iconColor="text-orange-600"
            />

          </div>

          {/* ==================================================
              CHART ROW 1
          ================================================== */}

          <div className="mt-6 grid gap-6 xl:grid-cols-3">

            {/* ==================================================
                MONTHLY COLLECTION
            ================================================== */}

            <div
              className="
                rounded-2xl
                border border-gray-200
                bg-white
                p-5
                shadow-sm
                xl:col-span-2
              "
            >

              <div className="mb-5">

                <h2 className="font-bold text-gray-900">
                  Monthly Collection
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Collection performance throughout the year
                </p>

              </div>

              <div className="h-[320px] w-full">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart
                    data={monthlyCollection}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 0,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e5e7eb"
                    />

                    <XAxis
                      dataKey="month"
                      tick={{
                        fontSize: 12,
                        fill: "#6b7280",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      tick={{
                        fontSize: 12,
                        fill: "#6b7280",
                      }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) =>
                        `৳${Number(value) / 1000}k`
                      }
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                      }}
                      formatter={(value) =>
                        `৳${formatCurrency(Number(value))}`
                      }
                    />

                    <Line
                      type="monotone"
                      dataKey="collection"
                      name="Collection"
                      stroke="#16a34a"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        fill: "#16a34a",
                      }}
                      activeDot={{
                        r: 6,
                      }}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* ==================================================
                PAYMENT STATUS
            ================================================== */}

            <div
              className="
                rounded-2xl
                border border-gray-200
                bg-white
                p-5
                shadow-sm
              "
            >

              <div>

                <h2 className="font-bold text-gray-900">
                  Payment Status
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Current devotee payment overview
                </p>

              </div>

              <div className="relative h-[260px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Pie
                      data={paymentStatus}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={4}
                      strokeWidth={0}
                    >

                      {paymentStatus.map(
                        (item, index) => (
                          <Cell
                            key={`payment-${index}`}
                            fill={item.color}
                          />
                        )
                      )}

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

                {/* CENTER VALUE */}

                <div
                  className="
                    pointer-events-none
                    absolute inset-0
                    flex flex-col
                    items-center justify-center
                    pb-1
                  "
                >

                  <span className="text-2xl font-bold text-gray-900">
                    1,250
                  </span>

                  <span className="text-xs text-gray-500">
                    Devotees
                  </span>

                </div>

              </div>

              {/* LEGEND */}

              <PaymentLegend />

            </div>

          </div>

          {/* ==================================================
              CHART ROW 2
          ================================================== */}

          <div className="mt-6 grid gap-6 xl:grid-cols-2">

            {/* ==================================================
                AREA WISE DEVOTEES
            ================================================== */}

            <div
              className="
                rounded-2xl
                border border-gray-200
                bg-white
                p-5
                shadow-sm
              "
            >

              <div className="mb-5">

                <h2 className="font-bold text-gray-900">
                  Area-wise Devotees
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Registered devotees by area
                </p>

              </div>

              <div className="h-[330px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={areaWiseDevotees}
                    margin={{
                      top: 5,
                      right: 5,
                      left: 0,
                      bottom: 5,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e5e7eb"
                    />

                    <XAxis
                      dataKey="area"
                      tick={{
                        fontSize: 11,
                        fill: "#6b7280",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      tick={{
                        fontSize: 12,
                        fill: "#6b7280",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="devotees"
                      name="Devotees"
                      fill="#16a34a"
                      radius={[6, 6, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* ==================================================
                EVENT PARTICIPATION
            ================================================== */}

            <div
              className="
                rounded-2xl
                border border-gray-200
                bg-white
                p-5
                shadow-sm
              "
            >

              <div className="mb-5">

                <h2 className="font-bold text-gray-900">
                  Event Participation
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Invited vs attended devotees
                </p>

              </div>

              <div className="h-[330px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={eventParticipation}
                    margin={{
                      top: 5,
                      right: 5,
                      left: 0,
                      bottom: 5,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e5e7eb"
                    />

                    <XAxis
                      dataKey="event"
                      tick={{
                        fontSize: 11,
                        fill: "#6b7280",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      tick={{
                        fontSize: 12,
                        fill: "#6b7280",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="invited"
                      name="Invited"
                      fill="#94a3b8"
                      radius={[5, 5, 0, 0]}
                    />

                    <Bar
                      dataKey="attended"
                      name="Attended"
                      fill="#16a34a"
                      radius={[5, 5, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

          {/* ==================================================
              KHADEM ACTIVITY
          ================================================== */}

          <div
            className="
              mt-6
              rounded-2xl
              border border-gray-200
              bg-white
              p-5
              shadow-sm
            "
          >

            <div className="mb-5">

              <h2 className="font-bold text-gray-900">
                Khadem Activity
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Completed tasks and visits by Khadems
              </p>

            </div>

            <div className="h-[300px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart
                  data={khademActivity}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />

                  <XAxis
                    dataKey="month"
                    tick={{
                      fontSize: 12,
                      fill: "#6b7280",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{
                      fontSize: 12,
                      fill: "#6b7280",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="completed"
                    name="Completed Tasks"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      fill: "#2563eb",
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* ==================================================
              RECENT ACTIVITIES
          ================================================== */}

          <div
            className="
              mt-6
              overflow-hidden
              rounded-2xl
              border border-gray-200
              bg-white
              shadow-sm
            "
          >

            {/* HEADER */}

            <div className="border-b border-gray-100 p-5">

              <h2 className="font-bold text-gray-900">
                Recent Activities
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Latest activities from your area
              </p>

            </div>

            {/* ACTIVITIES */}

            <div className="divide-y divide-gray-100">

              {recentActivities.map(
                (activity, index) => (

                  <div
                    key={index}
                    className="
                      flex items-center
                      justify-between
                      gap-4
                      p-5
                      transition
                      hover:bg-gray-50
                    "
                  >

                    <div className="flex min-w-0 items-center gap-4">

                      <div
                        className="
                          flex h-10 w-10 shrink-0
                          items-center justify-center
                          rounded-full
                          bg-green-50
                          text-green-700
                        "
                      >
                        <ClipboardList size={18} />
                      </div>

                      <div className="min-w-0">

                        <h3 className="truncate text-sm font-semibold text-gray-900">
                          {activity.title}
                        </h3>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {activity.description}
                        </p>

                      </div>

                    </div>

                    <span className="hidden shrink-0 text-xs text-gray-400 sm:block">
                      {activity.time}
                    </span>

                  </div>

                )
              )}

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}