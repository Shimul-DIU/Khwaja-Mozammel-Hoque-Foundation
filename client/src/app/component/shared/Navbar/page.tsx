"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

type NavItem = {
  href: string;
  label: string;
};

const links: NavItem[] = [
  {
    href: "/sadka-e-zaria",
    label: "Sadka-E-Zaria",
  },
  {
    href: "/scholarship",
    label: "Scholarship",
  },
  {
    href: "/health",
    label: "Health Support",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

const roles = [
  { key: "user", label: "User" },
  { key: "khadem", label: "Khadem" },
  { key: "kordinator", label: "Kordinator" },
  { key: "admin", label: "Admin" },
];

/* =========================================================
   ICONS
========================================================= */

function SearchIcon({
  className = "w-5 h-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m20 20-4.5-4.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 6 6 18" strokeLinecap="round" />
      <path d="m6 6 12 12" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 7h16" strokeLinecap="round" />
      <path d="M4 12h16" strokeLinecap="round" />
      <path d="M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon({
  className = "w-4 h-4",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  if (pathname.startsWith("/khadem/dashboard")){
    return null;
  }
  const router = useRouter();

  /* Close menus on route change */
  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  /* Prevent body scroll on mobile menu */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Close account dropdown on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        accountRef.current &&
        !accountRef.current.contains(e.target as Node)
      ) {
        setAccountOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Close account dropdown on Escape */
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setAccountOpen(false);
    }

    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = query.trim();

    if (!trimmed) return;

    console.log("search:", trimmed);
  };

  const handleRoleClick = (roleKey: string) => {
    setAccountOpen(false);
    router.push(`/login?role=${roleKey}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full">

      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}
      <div className="border-b border-black/10 bg-white shadow-[0_6px_25px_rgba(0,0,0,0.08)]">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* =================================================
              MAIN ROW
          ================================================= */}
          <div className="flex h-[78px] items-center justify-between gap-4">

            {/* =================================================
                LOGO
            ================================================= */}
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="group flex shrink-0 items-center gap-3"
            >
              <div className="relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center">
                <div className="absolute inset-0 rounded-2xl border border-[#d8b766]/20 bg-[#d8b766]/5 transition-all duration-300 group-hover:scale-105 group-hover:border-[#d8b766]/40 group-hover:bg-[#d8b766]/10" />

                <img
                  src="/logo.png"
                  alt="KMRF Logo"
                  className="relative z-10 h-12 w-auto object-contain"
                />
              </div>

              <div className="hidden sm:block">
                <p className="text-xl roboto-slab font-bold tracking-tight text-black">
                  KMRF
                </p>

                <p className="mt-0.5 max-w-[220px] text-[10px] font-medium uppercase tracking-[0.12em] text-black/50">
                  Khwaja Mozammel Relief Foundation
                </p>
              </div>
            </Link>

            {/* =================================================
                DESKTOP SEARCH
            ================================================= */}
            <form
              onSubmit={handleSearch}
              className="relative hidden max-w-[280px] flex-1 md:block"
            >
              <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />

              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                aria-label="Search"
                className="h-11 w-full rounded-full border border-black/10 bg-[#f7f7f5] pl-10 pr-4 text-[15px] text-black outline-none transition-all placeholder:text-black/40 hover:border-black/15 hover:bg-white focus:border-[#d8b766]/70 focus:bg-white focus:ring-4 focus:ring-[#d8b766]/10"
              />
            </form>

            {/* =================================================
                DESKTOP NAV
            ================================================= */}
            <nav className="hidden items-center gap-1.5 lg:flex">
              {links.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative rounded-xl px-4 py-3 text-[15px] font-semibold transition-all duration-300 ${isActive
                      ? "text-black"
                      : "text-black hover:text-black"
                      }`}
                  >
                    {/* Active / hover background */}
                    <span
                      className={`absolute inset-0 rounded-xl transition-all duration-300 ${isActive
                        ? "bg-black/[0.05]"
                        : "bg-transparent group-hover:bg-black/[0.04]"
                        }`}
                    />

                    <span className="relative z-10 whitespace-nowrap">
                      {item.label}
                    </span>

                    {/* Gold active line */}
                    <span
                      className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-blue-700 transition-all duration-300 ${isActive
                        ? "w-8 opacity-100"
                        : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-70"
                        }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* =================================================
                RIGHT ACTIONS
            ================================================= */}
            <div className="flex items-center gap-2">

              {/* Mobile Search */}
              <button
                type="button"
                onClick={() =>
                  setSearchOpen((prev) => !prev)
                }
                aria-label={
                  searchOpen
                    ? "Close search"
                    : "Open search"
                }
                aria-expanded={searchOpen}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 text-black transition-all hover:border-black/10 hover:bg-black/[0.04] md:hidden"
              >
                {searchOpen ? (
                  <CloseIcon className="h-5 w-5" />
                ) : (
                  <SearchIcon className="h-5 w-5" />
                )}
              </button>

              {/* Donate */}
              <Link
                href="/donate"
                className="group relative hidden items-center justify-center overflow-hidden rounded-xl bg-[#008E48] px-4 py-2 text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(0,142,72,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#006648] hover:shadow-[0_10px_24px_rgba(0,102,72,0.25)] sm:flex"
              >
                <span className="absolute inset-y-0 left-[-80%] w-[50%] rotate-12 bg-white/20 blur-sm transition-all duration-700 group-hover:left-[140%]" />

                <span className="relative z-10">
                  Donate
                </span>
              </Link>

              {/* Account (with role dropdown) */}
              <div className="relative" ref={accountRef}>
                <button
                  type="button"
                  onClick={() => setAccountOpen((prev) => !prev)}
                  aria-label="Account"
                  aria-haspopup="true"
                  aria-expanded={accountOpen}
                  className={`group flex h-10 items-center justify-center gap-1 rounded-xl border px-2.5 text-black transition-all duration-300 ${accountOpen
                    ? "border-[#d8b766]/50 bg-[#d8b766]/10 text-[#0d3b2e]"
                    : "border-black/10 bg-[#F8DE9E] hover:border-[#d8b766]/50 hover:bg-[#d8b766]/10 hover:text-[#0d3b2e]"
                    }`}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-[15px] transition-transform duration-300 group-hover:scale-110"
                  />
                  <ChevronDownIcon
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${accountOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute right-0 top-[calc(100%+10px)] z-50 w-48 origin-top-right overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-200 ${accountOpen
                    ? "scale-100 opacity-100"
                    : "pointer-events-none scale-95 opacity-0"
                    }`}
                >
                  {/* <div className="border-b border-black/5 px-4 py-2.5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-black/40">
                      Login As
                    </p>
                  </div> */}

                  <ul className="py-1.5">
                    {roles.map((role) => (
                      <li key={role.key}>
                        <button
                          type="button"
                          onClick={() => handleRoleClick(role.key)}
                          className="flex w-full items-center px-4 py-2.5 text-left text-[14px] font-medium text-black transition-colors hover:bg-[#d8b766]/10"
                        >
                          {role.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mobile Menu */}
              <button
                type="button"
                onClick={() =>
                  setOpen((prev) => !prev)
                }
                aria-label={
                  open ? "Close menu" : "Open menu"
                }
                aria-expanded={open}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 lg:hidden ${open
                  ? "border-[#d8b766]/40 bg-[#d8b766]/10 text-black"
                  : "border-black/10 bg-white text-black hover:bg-black/[0.04]"
                  }`}
              >
                {open ? (
                  <CloseIcon className="h-5 w-5" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* =================================================
              MOBILE SEARCH
          ================================================= */}
          <div
            className={`overflow-hidden transition-all duration-300 md:hidden ${searchOpen
              ? "max-h-24 pb-4 opacity-100"
              : "max-h-0 opacity-0"
              }`}
          >
            <form
              onSubmit={handleSearch}
              className="relative"
            >
              <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />

              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                aria-label="Search"
                autoFocus={searchOpen}
                className="h-11 w-full rounded-2xl border border-black/10 bg-[#f7f7f5] pl-10 pr-4 text-[15px] text-black outline-none placeholder:text-black/40 focus:border-[#d8b766]/70 focus:bg-white focus:ring-4 focus:ring-[#d8b766]/10"
              />
            </form>
          </div>

          {/* =================================================
              MOBILE MENU
          ================================================= */}
          <div
            className={`overflow-hidden transition-all duration-300 lg:hidden ${open
              ? "max-h-[640px] border-t border-black/10 opacity-100"
              : "max-h-0 opacity-0"
              }`}
          >
            <nav className="space-y-1 py-4">

              {links.map((item, index) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-300 ${isActive
                      ? "bg-[#0d3b2e] text-white"
                      : "text-black hover:bg-black/[0.04]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[11px] font-bold tracking-[0.15em] ${isActive
                          ? "text-[#d8b766]"
                          : "text-black/35"
                          }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={`text-[15px] font-semibold ${isActive
                          ? "text-white"
                          : "text-black"
                          }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    <span
                      className={`h-2 w-2 rounded-full transition-all ${isActive
                        ? "bg-[#d8b766]"
                        : "bg-black/15 group-hover:bg-black/30"
                        }`}
                    />
                  </Link>
                );
              })}

              {/* Mobile: Login As roles */}
              <div className="mt-3 rounded-2xl border border-black/10 px-4 py-3.5">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-black/40">
                  Login As
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {roles.map((role) => (
                    <button
                      key={role.key}
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        handleRoleClick(role.key);
                      }}
                      className="rounded-xl bg-black/[0.04] px-3 py-2.5 text-[14px] font-semibold text-black transition-colors hover:bg-[#d8b766]/15"
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Donate */}
              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center rounded-2xl bg-[#008E48] px-4 py-3.5 text-[15px] font-bold text-white shadow-md transition-all duration-300 hover:bg-[#006648]"
              >
                Support Our Work
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* =====================================================
          GOLD DIVIDER
      ===================================================== */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#d8b766]/50 to-transparent" />
    </header>
  );
}