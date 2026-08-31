"use client"
import { useState, useMemo } from "react";
import {
  LayoutDashboard,
  GraduationCap,
  HandHeart,
  FileEdit,
  Settings,
  Search,
  Check,
  X,
  Eye,
  ChevronRight,
  LogOut,
  Menu,
  Plus,
  Trash2,
  Moon,
} from "lucide-react";

const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-rose-50 text-rose-700 border-rose-200",
};

const initialScholarship = [
  { id: "SCH-1042", name: "Nusrat Jahan", institution: "Dhaka University", program: "BSc Chemistry", email: "nusrat.j@example.com", phone: "01711-223344", date: "2026-08-21", status: "Pending" },
  { id: "SCH-1041", name: "Abdur Rahim", institution: "BUET", program: "BSc EEE", email: "rahim.a@example.com", phone: "01822-334455", date: "2026-08-19", status: "Pending" },
  { id: "SCH-1040", name: "Farhana Akter", institution: "Rajshahi University", program: "BA English", email: "farhana.a@example.com", phone: "01933-445566", date: "2026-08-15", status: "Approved" },
  { id: "SCH-1039", name: "Md. Kamal Hossain", institution: "Chittagong University", program: "BSc Physics", email: "kamal.h@example.com", phone: "01644-556677", date: "2026-08-10", status: "Rejected" },
  { id: "SCH-1038", name: "Sumaiya Islam", institution: "Jahangirnagar University", program: "BSc Mathematics", email: "sumaiya.i@example.com", phone: "01555-667788", date: "2026-08-04", status: "Approved" },
];

const initialSadka = [
  { id: "SDK-2091", name: "Md. Aynal Haque", reason: "Medical treatment for daughter", amount: "৳25,000", email: "aynal.h@example.com", phone: "01711-998877", date: "2026-08-22", status: "Pending" },
  { id: "SDK-2090", name: "Rehana Begum", reason: "House repair after flood damage", amount: "৳40,000", email: "rehana.b@example.com", phone: "01822-887766", date: "2026-08-20", status: "Pending" },
  { id: "SDK-2089", name: "Jasim Uddin", reason: "Small business restart capital", amount: "৳15,000", email: "jasim.u@example.com", phone: "01933-776655", date: "2026-08-12", status: "Approved" },
  { id: "SDK-2088", name: "Mst. Halima Khatun", reason: "Winter clothing for family", amount: "৳8,000", email: "halima.k@example.com", phone: "01644-665544", date: "2026-08-06", status: "Approved" },
];

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-stone-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-stone-900">{value}</p>
      {sub && <p className={`mt-1 text-xs font-medium ${accent || "text-stone-500"}`}>{sub}</p>}
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

function ApplicationsTable({ title, rows, onUpdateStatus, onView, extraColumn }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchesQuery = r.name.toLowerCase().includes(query.toLowerCase()) || r.id.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "All" || r.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [rows, query, filter]);

  return (
    <div className="rounded-xl border border-stone-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-stone-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-stone-900">{title}</h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or ID"
              className="w-56 rounded-lg border border-stone-200 bg-stone-50 py-2 pl-8 pr-3 text-sm outline-none focus:border-emerald-400 focus:bg-white"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none focus:border-emerald-400"
          >
            {["All", "Pending", "Approved", "Rejected"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-100 text-xs uppercase tracking-wide text-stone-500">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">{extraColumn.label}</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50/60">
                <td className="px-4 py-3 font-mono text-xs text-stone-500">{row.id}</td>
                <td className="px-4 py-3 font-medium text-stone-900">{row.name}</td>
                <td className="max-w-[220px] truncate px-4 py-3 text-stone-600">{row[extraColumn.key]}</td>
                <td className="px-4 py-3 text-stone-500">{row.date}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1.5">
                    <button
                      onClick={() => onView(row)}
                      className="rounded-md border border-stone-200 p-1.5 text-stone-500 hover:bg-stone-100"
                      title="View details"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onUpdateStatus(row.id, "Approved")}
                      className="rounded-md border border-stone-200 p-1.5 text-emerald-600 hover:bg-emerald-50"
                      title="Approve"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onUpdateStatus(row.id, "Rejected")}
                      className="rounded-md border border-stone-200 p-1.5 text-rose-600 hover:bg-rose-50"
                      title="Reject"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-stone-400">
                  No applications match this search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DetailDrawer({ record, extraColumn, onClose, onUpdateStatus }) {
  if (!record) return null;
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-stone-900/30" onClick={onClose}>
      <div
        className="flex h-full w-full max-w-sm flex-col bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
          <div>
            <p className="text-xs font-mono text-stone-400">{record.id}</p>
            <h3 className="text-lg font-semibold text-stone-900">{record.name}</h3>
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 text-stone-400 hover:bg-stone-100">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wide text-stone-400">{extraColumn.label}</p>
            <p className="mt-1 text-stone-800">{record[extraColumn.key]}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">Email</p>
              <p className="mt-1 text-stone-800">{record.email}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">Phone</p>
              <p className="mt-1 text-stone-800">{record.phone}</p>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-stone-400">Submitted</p>
            <p className="mt-1 text-stone-800">{record.date}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-stone-400">Current status</p>
            <div className="mt-1"><StatusBadge status={record.status} /></div>
          </div>
        </div>
        <div className="flex gap-2 border-t border-stone-100 px-5 py-4">
          <button
            onClick={() => onUpdateStatus(record.id, "Approved")}
            className="flex-1 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-800"
          >
            Approve
          </button>
          <button
            onClick={() => onUpdateStatus(record.id, "Rejected")}
            className="flex-1 rounded-lg border border-rose-200 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

function ContentManager({ toast }) {
  const [hero, setHero] = useState({
    title: "Serving humanity through the light of Sufism",
    subtitle: "KMRF supports education, relief, and spiritual welfare across communities.",
  });
  const [about, setAbout] = useState(
    "Kutubul Masayekh Rahmania Foundation (KMRF) is a Sufi-based charitable organization dedicated to education, poverty relief, and community welfare, guided by the teachings of our elders."
  );
  const [programs, setPrograms] = useState([
    "Scholarship Fund",
    "Sadka-e-Zaria Relief",
    "Orphan Sponsorship",
    "Community Iftar",
  ]);
  const [newProgram, setNewProgram] = useState("");

  const addProgram = () => {
    if (!newProgram.trim()) return;
    setPrograms([...programs, newProgram.trim()]);
    setNewProgram("");
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <h2 className="text-base font-semibold text-stone-900">Hero section</h2>
        <p className="mt-0.5 text-sm text-stone-500">This is the first thing visitors see on the homepage.</p>
        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-stone-500">Title</label>
            <input
              value={hero.title}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-emerald-400"
            />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-stone-500">Subtitle</label>
            <textarea
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              rows={2}
              className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-emerald-400"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <h2 className="text-base font-semibold text-stone-900">About us</h2>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows={4}
          className="mt-3 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-emerald-400"
        />
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <h2 className="text-base font-semibold text-stone-900">Programs</h2>
        <ul className="mt-3 space-y-2">
          {programs.map((p, i) => (
            <li key={i} className="flex items-center justify-between rounded-lg border border-stone-100 bg-stone-50 px-3 py-2 text-sm">
              <span className="text-stone-800">{p}</span>
              <button
                onClick={() => setPrograms(programs.filter((_, idx) => idx !== i))}
                className="text-stone-400 hover:text-rose-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex gap-2">
          <input
            value={newProgram}
            onChange={(e) => setNewProgram(e.target.value)}
            placeholder="Add a new program"
            className="flex-1 rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-emerald-400"
          />
          <button
            onClick={addProgram}
            className="flex items-center gap-1 rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => toast("Content updated")}
          className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}

export default function KmrfAdminDashboard() {
  const [section, setSection] = useState("overview");
  const [scholarship, setScholarship] = useState(initialScholarship);
  const [sadka, setSadka] = useState(initialSadka);
  const [detail, setDetail] = useState(null);
  const [detailType, setDetailType] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2200);
  };

  const updateStatus = (setList, list) => (id, status) => {
    setList(list.map((r) => (r.id === id ? { ...r, status } : r)));
    setDetail(null);
    showToast(`${id} marked as ${status.toLowerCase()}`);
  };

  const pendingCount = scholarship.filter((r) => r.status === "Pending").length + sadka.filter((r) => r.status === "Pending").length;
  const approvedCount = scholarship.filter((r) => r.status === "Approved").length + sadka.filter((r) => r.status === "Approved").length;
  const totalCount = scholarship.length + sadka.length;

  const navItems = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "scholarship", label: "Scholarship", icon: GraduationCap },
    { key: "sadka", label: "Sadka-e-Zaria", icon: HandHeart },
    { key: "content", label: "Content", icon: FileEdit },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  const recent = [...scholarship, ...sadka]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="flex min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-emerald-950 text-emerald-50 transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 border-b border-emerald-900/60 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/40 text-amber-300">
            <Moon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide">KMRF Admin</p>
            <p className="text-[11px] text-emerald-300/70">Foundation dashboard</p>
          </div>
        </div>
        <nav className="mt-4 space-y-1 px-3">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                setSection(key);
                setSidebarOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                section === key
                  ? "border-l-2 border-amber-400 bg-emerald-900/70 font-medium text-white"
                  : "border-l-2 border-transparent text-emerald-100/70 hover:bg-emerald-900/40"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
              {key === "overview" && pendingCount > 0 && (
                <span className="ml-auto rounded-full bg-amber-400/90 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-950">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 border-t border-emerald-900/60 px-5 py-4">
          <button className="flex items-center gap-2 text-sm text-emerald-100/70 hover:text-white">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-stone-900/30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-stone-200 bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <button className="rounded-md p-1.5 text-stone-500 hover:bg-stone-100 md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-1 text-sm text-stone-500">
              <span>KMRF Admin</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-stone-800">
                {navItems.find((n) => n.key === section)?.label}
              </span>
            </div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-medium text-emerald-800">
            SM
          </div>
        </header>

        <main className="p-5">
          {section === "overview" && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <StatCard label="Total applications" value={totalCount} />
                <StatCard label="Pending review" value={pendingCount} sub={pendingCount > 0 ? "Needs attention" : "All caught up"} accent="text-amber-600" />
                <StatCard label="Approved" value={approvedCount} sub="Across both programs" accent="text-emerald-600" />
                <StatCard label="Sadka-e-Zaria requests" value={sadka.length} sub="This cycle" />
              </div>

              <div className="rounded-xl border border-stone-200 bg-white">
                <div className="border-b border-stone-100 px-5 py-4">
                  <h2 className="text-base font-semibold text-stone-900">Recent activity</h2>
                </div>
                <ul className="divide-y divide-stone-50">
                  {recent.map((r) => (
                    <li key={r.id} className="flex items-center justify-between px-5 py-3 text-sm">
                      <div>
                        <p className="font-medium text-stone-800">{r.name}</p>
                        <p className="text-xs text-stone-400">{r.id} · {r.date}</p>
                      </div>
                      <StatusBadge status={r.status} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {section === "scholarship" && (
            <ApplicationsTable
              title="Scholarship applications"
              rows={scholarship}
              extraColumn={{ label: "Institution", key: "institution" }}
              onUpdateStatus={updateStatus(setScholarship, scholarship)}
              onView={(row) => {
                setDetail(row);
                setDetailType("scholarship");
              }}
            />
          )}

          {section === "sadka" && (
            <ApplicationsTable
              title="Sadka-e-Zaria requests"
              rows={sadka}
              extraColumn={{ label: "Reason", key: "reason" }}
              onUpdateStatus={updateStatus(setSadka, sadka)}
              onView={(row) => {
                setDetail(row);
                setDetailType("sadka");
              }}
            />
          )}

          {section === "content" && <ContentManager toast={showToast} />}

          {section === "settings" && (
            <div className="rounded-xl border border-stone-200 bg-white p-5">
              <h2 className="text-base font-semibold text-stone-900">Admin profile</h2>
              <p className="mt-1 text-sm text-stone-500">Basic settings for this dashboard.</p>
              <div className="mt-4 grid max-w-md grid-cols-1 gap-3">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-stone-500">Name</label>
                  <input defaultValue="Shimul Mia" className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-emerald-400" />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-stone-500">Email</label>
                  <input defaultValue="admin@kmrf.org" className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-emerald-400" />
                </div>
                <button
                  onClick={() => showToast("Profile updated")}
                  className="mt-2 w-fit rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {detail && (
        <DetailDrawer
          record={detail}
          extraColumn={detailType === "scholarship" ? { label: "Institution", key: "institution" } : { label: "Reason", key: "reason" }}
          onClose={() => setDetail(null)}
          onUpdateStatus={detailType === "scholarship" ? updateStatus(setScholarship, scholarship) : updateStatus(setSadka, sadka)}
        />
      )}

      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 rounded-lg bg-stone-900 px-4 py-2.5 text-sm text-white shadow-lg">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
