"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebookF,
  faYoutube,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { usePathname } from "next/navigation";
import { useLanguage } from "../../../../context/LanguageContext";

const QUICK_LINKS = [
  { href: "/", labelEn: "Home", labelBn: "হোম" },
  { href: "/about", labelEn: "About", labelBn: "পরিচিতি" },
  { href: "/register", labelEn: "Registration", labelBn: "নিবন্ধন" },
  { href: "/contact", labelEn: "Contact", labelBn: "যোগাযোগ" },
];

export default function Footer() {
  const { language } = useLanguage();
  const pathname = usePathname();
  if (pathname.startsWith("/khadem/dashboard") || pathname.startsWith("/coordinator/dashboard") || pathname.startsWith("/admin")) {
    return null;
  }
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t border-white/10 bg-[#063b2c] text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(4, 45, 34, 0.88), rgba(4, 38, 29, 0.97)), url('/footer-pattern.svg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >

      <div className="mx-auto grid site-container grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">

        {/* Brand */}
        <div>
          <div className="mb-3 flex items-center gap-2.5">

            {/* <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#e0a879]">

            </span> */}

            <span className="text-sm font-semibold leading-tight">
              খাজা মোজাম্মেল হক (রঃ) ফাউন্ডেশন
            </span>

          </div>

          <p className="text-sm leading-relaxed">
            ৩৭ শ্যামলীবাগ, শ্যামলী, ঢাকা-১২০৭, বাংলাদেশ
          </p>

          <p className="mt-3 text-xs italic leading-relaxed">
            যারা নিজেদের সম্পদ আল্লাহর পথে ব্যয় করে... — সূরা বাকারা, আয়াত: ২৬২
          </p>
        </div>


        {/* Quick Links */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Quick Links
          </h3>

          <ul className="flex flex-col gap-2">

            {QUICK_LINKS.map((link) => (
              <li key={link.href}>

                <Link
                  href={link.href}
                  className="text-sm transition hover:text-blue-400"
                >
                  {language === "bn" ? link.labelBn : link.labelEn}
                </Link>

              </li>
            ))}

          </ul>
        </div>


        {/* Contact */}
        <div>

          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Contact
          </h3>

          <ul className="flex flex-col gap-3 text-sm">

            {/* Email */}
            <li className="flex items-start gap-3">

              <FontAwesomeIcon
                icon={faEnvelope}
                className="mt-1 h-4 w-4 shrink-0"
              />

              <span>info@kmrf.org</span>

            </li>


            {/* Phone */}
            <li className="flex items-start gap-3">

              <FontAwesomeIcon
                icon={faPhone}
                className="mt-1 h-4 w-4 shrink-0"
              />

              <span>+88 01712-161141</span>

            </li>
            {/* sellPhone */}
            <li className="flex items-start gap-3">

              <FontAwesomeIcon
                icon={faMobileScreenButton}
                className="mt-1 h-4 w-4 shrink-0"
              />

              <span>+880 2 8128555</span>

            </li>


            {/* Location */}
            <li className="flex items-start gap-3">

              <FontAwesomeIcon
                icon={faLocationDot}
                className="mt-1 h-4 w-4 shrink-0"
              />

              <span>
                ৩৭ শ্যামলীবাগ, শ্যামলী, ঢাকা-১২০৭
              </span>

            </li>

          </ul>


          {/* Socials */}
          <div className="mt-5 flex gap-3">

            {/* Facebook */}
            <a
              href="https://www.facebook.com/kmrforg/"
              aria-label="Facebook"
              target="_blank"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white transition hover:border-blue-500 hover:scale-110 hover:text-white"
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                className="h-4 w-4"
              />
            </a>


            {/* YouTube */}
            <a
              href="#"
              aria-label="YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white transition hover:border-blue-500 hover:scale-110 hover:text-white"
            >
              <FontAwesomeIcon
                icon={faYoutube}
                className="h-4 w-4"
              />
            </a>


            {/* WhatsApp */}
            <a
              href="#"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white transition hover:border-blue-500 hover:scale-110 hover:text-white"
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="h-4 w-4"
              />
            </a>

          </div>

        </div>

      </div>


      {/* Copyright */}
      <div className="border-t border-white/10 px-4 py-4 sm:px-6 lg:px-8">

        <p className="mx-auto max-w-6xl text-center text-xs text-white/60">
          © {year}{" "}
          {language === "bn"
            ? "খাজা মোজাম্মেল হক (রঃ) ফাউন্ডেশন — সর্বস্বত্ব সংরক্ষিত।"
            : "Khwaja Mozammel Hoque (R) Foundation — All rights reserved."}
        </p>

      </div>

    </footer>
  );
}