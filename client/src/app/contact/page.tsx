
"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  MapPin,
  Send,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";

/* =========================================================
   OFFICE LOCATIONS
========================================================= */

type OfficeLocation = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: "head-office",
    name: "Head Office",
    address:
      "Khwaja Mozammel Relief Foundation, Mymensingh, Bangladesh",
    lat: 24.7471,
    lng: 90.4203,
  },
  {
    id: "dhaka-office",
    name: "Dhaka Office",
    address:
      "Khwaja Mozammel Relief Foundation, Dhaka, Bangladesh",
    lat: 23.707306, 
    lng: 90.415482,
  },
];

/* =========================================================
   SOCIAL ICONS
========================================================= */

function FacebookIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.5 22v-8h2.8l.4-3.1h-3.2v-2c0-.9.3-1.6 1.6-1.6h1.7V4.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.5H8v3.1h2.6v8h2.9Z" />
    </svg>
  );
}

function InstagramIcon({
  className = "h-5 w-5",
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
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.3"
        cy="6.8"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function XIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.8 5.8 22H2.7l7.3-8.4L2.2 2h6.5l4.5 6.7L18.9 2Zm-1.1 18h1.7L7.7 3.9H5.9L17.8 20Z" />
    </svg>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  // Dynamic location state
  const [selectedId, setSelectedId] = useState(
    OFFICE_LOCATIONS[0].id
  );

  const selectedLocation =
    OFFICE_LOCATIONS.find((loc) => loc.id === selectedId) ??
    OFFICE_LOCATIONS[0];

  const mapSrc = `https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}&z=15&output=embed`;

  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${selectedLocation.lat},${selectedLocation.lng}`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f7f2] text-[#15251f]">

      {/* =====================================================
          CONTACT FORM
      ===================================================== */}

      <section id="contact-form" className="bg-[#f0eee6] py-24">
        <div className="mx-auto site-container px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">

            {/* Left */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a27e38]">
                Send A Message
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                Let’s start a
                <br />
                <span className="text-[#a27e38]">
                  conversation.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-[#15251f]/50">
                আপনার বার্তা যত পরিষ্কার হবে, আমরা তত সহজে আপনার
                প্রয়োজন বুঝতে এবং যথাযথভাবে respond করতে পারব।
              </p>

              {/* Before You Send Card */}
              <div className="mt-8 rounded-3xl bg-[#0d3b2e] p-7 text-white">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d8b766]/10 text-[#d8b766]">
                  <Send size={21} />
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  Before you send
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/60">
                  প্রয়োজনীয় তথ্য, যোগাযোগের মাধ্যম এবং আপনার
                  message-এর মূল বিষয় স্পষ্টভাবে উল্লেখ করুন।
                </p>

                <div className="mt-6 space-y-3 text-xs text-white/65">

                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={14}
                      className="text-[#d8b766]"
                    />
                    Use accurate contact information
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={14}
                      className="text-[#d8b766]"
                    />
                    Explain your reason clearly
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={14}
                      className="text-[#d8b766]"
                    />
                    Add relevant details
                  </div>

                </div>

                {/* Social Media Icons */}
                <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">

                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d8b766]/25 bg-[#d8b766]/10 text-[#d8b766] transition duration-300 hover:-translate-y-1 hover:bg-[#d8b766] hover:text-[#0d3b2e]"
                  >
                    <FacebookIcon />
                  </a>

                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d8b766]/25 bg-[#d8b766]/10 text-[#d8b766] transition duration-300 hover:-translate-y-1 hover:bg-[#d8b766] hover:text-[#0d3b2e]"
                  >
                    <InstagramIcon />
                  </a>

                  <a
                    href="https://x.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d8b766]/25 bg-[#d8b766]/10 text-[#d8b766] transition duration-300 hover:-translate-y-1 hover:bg-[#d8b766] hover:text-[#0d3b2e]"
                  >
                    <XIcon />
                  </a>

                </div>

              </div>
            </div>

            {/* Form */}
            <div className="rounded-[34px] border border-[#15251f]/8 bg-white p-7 shadow-sm sm:p-9 lg:p-10">

              {submitted ? (
                <div className="flex min-h-[450px] flex-col items-center justify-center text-center">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d3b2e] text-[#d8b766]">
                    <CheckCircle2 size={30} />
                  </div>

                  <h3 className="mt-7 text-3xl font-bold">
                    Message received
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-7 text-[#15251f]/50">
                    আপনার বার্তার জন্য ধন্যবাদ। এটি বর্তমানে form
                    submission-এর demo success state। Backend/API
                    যুক্ত করলে এখানে প্রকৃত submission process
                    করা যাবে।
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-7 rounded-full border border-[#15251f]/10 px-6 py-3 text-sm font-semibold transition hover:bg-[#0d3b2e] hover:text-white"
                  >
                    Send another message
                  </button>

                </div>
              ) : (

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-[#15251f]"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      className="mt-2 h-12 w-full rounded-xl border border-[#15251f]/10 bg-[#f8f7f2] px-4 text-sm outline-none transition focus:border-[#d8b766]/60 focus:bg-white focus:ring-4 focus:ring-[#d8b766]/10"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid gap-6 sm:grid-cols-2">

                    <div>
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold text-[#15251f]"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="mt-2 h-12 w-full rounded-xl border border-[#15251f]/10 bg-[#f8f7f2] px-4 text-sm outline-none transition focus:border-[#d8b766]/60 focus:bg-white focus:ring-4 focus:ring-[#d8b766]/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="text-sm font-semibold text-[#15251f]"
                      >
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+880 1XXXXXXXXX"
                        className="mt-2 h-12 w-full rounded-xl border border-[#15251f]/10 bg-[#f8f7f2] px-4 text-sm outline-none transition focus:border-[#d8b766]/60 focus:bg-white focus:ring-4 focus:ring-[#d8b766]/10"
                      />
                    </div>

                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="text-sm font-semibold text-[#15251f]"
                    >
                      Subject
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      required
                      defaultValue=""
                      className="mt-2 h-12 w-full rounded-xl border border-[#15251f]/10 bg-[#f8f7f2] px-4 text-sm text-[#15251f] outline-none transition focus:border-[#d8b766]/60 focus:bg-white focus:ring-4 focus:ring-[#d8b766]/10"
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
                      <option value="general">General Enquiry</option>
                      <option value="scholarship">Scholarship</option>
                      <option value="health">Health Support</option>
                      <option value="sadka">Sadka-E-Zaria</option>
                      <option value="partnership">Partnership</option>
                      <option value="donation">Donation</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="text-sm font-semibold text-[#15251f]"
                    >
                      Your Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={7}
                      placeholder="Write your message..."
                      className="mt-2 w-full resize-none rounded-xl border border-[#15251f]/10 bg-[#f8f7f2] px-4 py-3 text-sm leading-7 outline-none transition focus:border-[#d8b766]/60 focus:bg-white focus:ring-4 focus:ring-[#d8b766]/10"
                    />
                  </div>

                  {/* Checkbox */}
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 rounded border-[#15251f]/20 accent-[#0d3b2e]"
                    />

                    <span className="text-xs leading-6 text-[#15251f]/45">
                      I confirm that the information provided above is
                      accurate to the best of my knowledge.
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0d3b2e] px-6 py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#153f32]"
                  >
                    Send Message
                    <Send
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>

                </form>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          LOCATION (Dynamic Map)
      ===================================================== */}

      <section className="mx-auto site-container px-5 py-24 sm:px-8 lg:px-10">

        <div className="overflow-hidden rounded-[40px] border border-[#15251f]/8 bg-white shadow-sm">

          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">

            {/* Info + Location Selector */}
            <div className="p-8 sm:p-12">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0d3b2e] text-[#d8b766]">
                <MapPin size={24} />
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-[#a27e38]">
                Visit The Foundation
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight">
                Find us
                <br />
                <span className="text-[#a27e38]">
                  in Bangladesh
                </span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-[#15251f]/50">
                অফিসে আসার আগে প্রয়োজনীয় যোগাযোগ নম্বরে যোগাযোগ করে
                visiting hours নিশ্চিত করে নেওয়া ভালো।
              </p>

              {/* Location list */}
              <div className="mt-8 space-y-3">

                {OFFICE_LOCATIONS.map((loc) => {
                  const active = loc.id === selectedId;

                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setSelectedId(loc.id)}
                      className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                        active
                          ? "border-[#d8b766] bg-[#d8b766]/10"
                          : "border-[#15251f]/10 bg-white hover:border-[#d8b766]/40"
                      }`}
                    >
                      <Building2
                        size={19}
                        className={`mt-1 shrink-0 ${
                          active
                            ? "text-[#a27e38]"
                            : "text-[#15251f]/40"
                        }`}
                      />

                      <div>
                        <p className="text-sm font-bold text-[#15251f]">
                          {loc.name}
                        </p>

                        <p className="mt-1 text-xs leading-6 text-[#15251f]/50">
                          {loc.address}
                        </p>
                      </div>

                    </button>
                  );
                })}

              </div>

              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0d3b2e] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#153f32]"
              >
                Open in Google Maps
                <ArrowRight size={16} />
              </a>

            </div>

            {/* Real Map */}
            <div className="relative min-h-[360px] bg-[#0d3b2e] lg:min-h-full">

              <iframe
                key={selectedLocation.id}
                title={`Map - ${selectedLocation.name}`}
                src={mapSrc}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
