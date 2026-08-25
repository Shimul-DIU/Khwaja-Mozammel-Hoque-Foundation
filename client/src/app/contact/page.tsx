"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";

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
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
      />
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

/* =========================================================
   PAGE
========================================================= */

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f7f2] text-[#15251f]">

      {/* =====================================================
          HERO / INTRO
   =============================================


      {/* =====================================================
          CONTACT INFORMATION
      ===================================================== */}
      <section
        id="contact-info"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10"
      >
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

          {/* Left */}
          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a27e38]">
              Get In Touch
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              Contact the
              <br />
              <span className="text-[#a27e38]">
                Foundation
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#15251f]/50">
              KMRF-এর বিভিন্ন কার্যক্রম, scholarship, health support,
              Sadka-E-Zaria অথবা অন্যান্য সহযোগিতার বিষয়ে আমাদের সঙ্গে
              যোগাযোগ করতে পারেন।
            </p>

            <div className="mt-8 h-px w-16 bg-[#d8b766]" />

            {/* Social */}
            <div className="mt-8 flex items-center gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#15251f]/10 bg-white text-[#15251f]/60 transition hover:border-[#d8b766]/40 hover:bg-[#d8b766]/10 hover:text-[#a27e38]"
              >
                <FacebookIcon className="h-[18px] w-[18px]" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#15251f]/10 bg-white text-[#15251f]/60 transition hover:border-[#d8b766]/40 hover:bg-[#d8b766]/10 hover:text-[#a27e38]"
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>

            </div>
          </div>

          {/* Right */}
          <div className="grid gap-4 sm:grid-cols-2">

            {/* Address */}
            <div className="rounded-3xl border border-[#15251f]/8 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d3b2e] text-[#d8b766]">
                <MapPin size={22} />
              </div>

              <h3 className="mt-6 text-lg font-bold">
                Office Address
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#15251f]/50">
                Khwaja Mozammel Relief Foundation
                <br />
                Bangladesh
              </p>

            </div>

            {/* Phone */}
            <div className="rounded-3xl border border-[#15251f]/8 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d3b2e] text-[#d8b766]">
                <Phone size={22} />
              </div>

              <h3 className="mt-6 text-lg font-bold">
                Phone
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#15251f]/50">
                +880 1XXXXXXXXX
                <br />
                +880 1XXXXXXXXX
              </p>

            </div>

            {/* Email */}
            <div className="rounded-3xl border border-[#15251f]/8 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d3b2e] text-[#d8b766]">
                <Mail size={22} />
              </div>

              <h3 className="mt-6 text-lg font-bold">
                Email
              </h3>

              <p className="mt-3 break-all text-sm leading-7 text-[#15251f]/50">
                info@kmrf.org
                <br />
                contact@kmrf.org
              </p>

            </div>

            {/* Hours */}
            <div className="rounded-3xl border border-[#15251f]/8 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d3b2e] text-[#d8b766]">
                <Clock3 size={22} />
              </div>

              <h3 className="mt-6 text-lg font-bold">
                Office Hours
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#15251f]/50">
                Saturday — Thursday
                <br />
                9:00 AM — 5:00 PM
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT FORM
      ===================================================== */}
      <section
        id="contact-form"
        className="bg-[#f0eee6] py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

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
                প্রয়োজন বুঝতে এবং যথাযথভাবে respond করতে পারব।
              </p>

              <div className="mt-8 rounded-3xl bg-[#0d3b2e] p-7 text-white">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d8b766]/10 text-[#d8b766]">
                  <Send size={21} />
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  Before you send
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/45">
                  প্রয়োজনীয় তথ্য, যোগাযোগের মাধ্যম এবং আপনার
                  message-এর মূল বিষয় স্পষ্টভাবে উল্লেখ করুন।
                </p>

                <div className="mt-6 space-y-3 text-xs text-white/55">

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
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >

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

                      <option value="general">
                        General Enquiry
                      </option>

                      <option value="scholarship">
                        Scholarship
                      </option>

                      <option value="health">
                        Health Support
                      </option>

                      <option value="sadka">
                        Sadka-E-Zaria
                      </option>

                      <option value="partnership">
                        Partnership
                      </option>

                      <option value="donation">
                        Donation
                      </option>
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
                      I confirm that the information provided above
                      is accurate to the best of my knowledge.
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
          LOCATION
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[40px] border border-[#15251f]/8 bg-white shadow-sm">

          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">

            {/* Info */}
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
                অফিসে আসার আগে প্রয়োজনীয় যোগাযোগ নম্বরে যোগাযোগ করে
                visiting hours নিশ্চিত করে নেওয়া ভালো।
              </p>

              <div className="mt-8 flex items-start gap-3">

                <Building2
                  size={19}
                  className="mt-1 shrink-0 text-[#a27e38]"
                />

                <p className="text-sm leading-7 text-[#15251f]/60">
                  Khwaja Mozammel Relief Foundation
                  <br />
                  Bangladesh
                </p>

              </div>
            </div>

            {/* Map-like visual */}
            <div className="relative min-h-[360px] overflow-hidden bg-[#0d3b2e]">

              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `
                    linear-gradient(
                      90deg,
                      #d8b766 1px,
                      transparent 1px
                    ),
                    linear-gradient(
                      #d8b766 1px,
                      transparent 1px
                    )
                  `,
                  backgroundSize: "42px 42px",
                }}
              />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,183,102,0.12),transparent_40%)]" />

              <div className="relative flex h-full items-center justify-center p-8">

                <div className="text-center">

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#d8b766]/25 bg-[#d8b766]/10 text-[#d8b766] shadow-[0_0_0_16px_rgba(216,183,102,0.04)]">
                    <MapPin size={32} />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-white">
                    KMRF Foundation
                  </h3>

                  <p className="mt-2 text-sm text-white/40">
                    Bangladesh
                  </p>

                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/30">

                    <span className="h-1.5 w-1.5 rounded-full bg-[#d8b766]" />

                    Foundation Location

                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#d8b766]">

        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#0d3b2e]/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d3b2e] text-[#d8b766]">
            <HeartHandshake size={30} />
          </div>

          <h2 className="mt-7 text-4xl font-bold tracking-tight text-[#08241c] sm:text-5xl">
            Have a question,
            <br />
            idea or opportunity?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#08241c]/60">
            আপনার একটি বার্তা KMRF-এর সঙ্গে একটি নতুন সহযোগিতা,
            সহায়তা বা সম্ভাবনার দরজা খুলে দিতে পারে।
          </p>

          <a
            href="#contact-form"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#0d3b2e] px-8 py-4 font-bold text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#153f32]"
          >
            Contact The Foundation
            <ArrowRight size={18} />
          </a>

        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="border-t border-[#15251f]/10 bg-[#f8f7f2]">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-[#15251f]/45 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">

          <div>
            <p className="font-bold text-[#15251f]">
              KMRF Foundation
            </p>

            <p className="mt-1 text-xs">
              Contact The Foundation
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5">

            <Link
              href="/"
              className="transition hover:text-[#0d3b2e]"
            >
              Home
            </Link>

            <Link
              href="/sadka-e-zaria"
              className="transition hover:text-[#0d3b2e]"
            >
              Sadka-E-Zaria
            </Link>

            <Link
              href="/scholarship"
              className="transition hover:text-[#0d3b2e]"
            >
              Scholarship
            </Link>

            <Link
              href="/health"
              className="transition hover:text-[#0d3b2e]"
            >
              Health Support
            </Link>

          </div>

          <p>
            © {new Date().getFullYear()} KMRF
          </p>

        </div>
      </footer>

    </main>
  );
}