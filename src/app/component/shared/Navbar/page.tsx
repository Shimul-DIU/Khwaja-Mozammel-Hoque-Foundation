// src/components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
};

const links: NavItem[] = [
  { href: "/sadka-e-zaria", label: "Sadka-E-Zaria" },
  { href: "/scholarship", label: "Scholarship" },
  { href: "/health", label: "Health Support" },
  { href: "/contact", label: "Contact" },
];

function SunIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8 6 18M18 6l1.8-1.8" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false); // ✅ নতুন স্টেট
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("search:", query);
    // সার্চ করার পর ইনপুট ফোকাস রিমুভ করা যায়, চাইলে
  };

  return (
    <header className="sticky lg:mx-auto lg:max-w-7xl w-full bg-white top-0 z-50 bg-teal text-paper shadow-md">
      <div className="max-w-7xl px-2 sm:px-6">

        {/* Top Bar */}
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">

          {/* Left Side: Logo */}
          <Link href="/" className="shrink-0 flex items-center" onClick={() => setOpen(false)}>
            <img
              src="/logo.jpg"
              alt="Logo"
              className="h-13 w-auto object-contain"
            />
          </Link>

          {/* Center Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex relative flex-1 max-w-xs  mx-4">
            <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-paper/50" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              aria-label="Search"
              className="w-full bg-teal-light/40 placeholder:text-paper/50 text-sm rounded-md pl-9 pr-3 py-1.5 border border-paper/15 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
            />
          </form>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-2 text-sm font-medium">
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-teal-light text-gold font-semibold"
                      : "hover:bg-teal-light/60 hover:text-gold-light"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">

            {/* Donate Button */}
            {/* <Link
              href="/donate"
              className="dark:bg-[#008E48] hover:dark:bg-[#006648] text-white hover:bg-gold-light text-teal font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-md transition-colors whitespace-nowrap shadow-sm"
            >
              Donate
            </Link> */}

            {/* ✅ Mobile Search Toggle Button (শুধু মোবাইলে) */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-md hover:bg-teal-light/60 transition-colors"
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
            >
              {searchOpen ? <CloseIcon className="w-6 h-6" /> : <SearchIcon className="w-6 h-6" />}
            </button>

            {/* Brightness Icon */}
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={dark}
              className="p-1.5 sm:p-2 rounded-md hover:bg-teal-light/60 transition-colors"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* User Icon */}
            <button
              type="button"
              aria-label="Account"
              className="p-1.5 sm:p-2 rounded-md hover:bg-teal-light/60 transition-colors"
            >
              <UserIcon />
            </button>

            {/* Menu Bar / Close Button */}
            <button
              className="lg:hidden p-1.5 sm:p-2 rounded-md hover:bg-teal-light/60 transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* ✅ Mobile Search Bar – শুধু searchOpen = true হলে দেখাবে */}
        {searchOpen && (
          <div className="md:hidden pb-3 pt-1 animate-fadeIn">
            <form onSubmit={handleSearch} className="relative w-full">
              <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-paper/50" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                aria-label="Search"
                className="w-full bg-teal-light/40 placeholder:text-paper/50 text-sm rounded-md pl-9 pr-3 py-1.5 border border-paper/15 focus:border-gold outline-none"
                autoFocus // খোলার সাথে সাথে ফোকাস নেবে
              />
            </form>
          </div>
        )}

        {/* Mobile Nav Items Dropdown Menu */}
        {open && (
          <nav className="lg:hidden pb-4 pt-2 border-t border-paper/15 flex flex-col gap-1.5 text-sm font-medium">
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2.5 rounded-md transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-teal-light text-gold font-bold"
                      : "hover:bg-teal-light/50"
                  }`}
                >
                  <span>{l.label}</span>
                  <span className="text-xs text-paper/40">➔</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
      <div className="lattice-divider opacity-40" />
    </header>
  );
}