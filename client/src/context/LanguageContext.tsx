"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Language = "en" | "bn";

const LANGUAGE_STORAGE_KEY = "kmrf-language";
const LANGUAGE_CHANGE_EVENT = "kmrf-language-change";

function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return savedLanguage === "bn" ? "bn" : "en";
}

function subscribeToLanguageChanges(onChange: () => void) {
  window.addEventListener(LANGUAGE_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function saveLanguage(language: Language) {
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
}

const translations: Record<string, string> = {
  "About Health Support": "স্বাস্থ্য সহায়তা সম্পর্কে",
  "About the Foundation": "ফাউন্ডেশন সম্পর্কে",
  "A Sufi Based Organization.": "একটি সুফিভিত্তিক প্রতিষ্ঠান।",
  "About The Initiative": "এই উদ্যোগ সম্পর্কে",
  "About The Scholarship": "বৃত্তি কার্যক্রম সম্পর্কে",
  "All Activities": "সকল কার্যক্রম",
  "All rights reserved.": "সর্বস্বত্ব সংরক্ষিত।",
  "Areas We Support": "আমাদের সহায়তার ক্ষেত্রসমূহ",
  "Before you send": "পাঠানোর আগে",
  "Back to login": "লগইন পাতায় ফিরে যান",
  "Choose a new password for your account.": "আপনার অ্যাকাউন্টের জন্য নতুন পাসওয়ার্ড দিন।",
  "Close menu": "মেনু বন্ধ করুন",
  "Close search": "সার্চ বন্ধ করুন",
  "Confirm password": "পাসওয়ার্ড নিশ্চিত করুন",
  Contact: "যোগাযোগ",
  "Contact the foundation": "ফাউন্ডেশনের সাথে যোগাযোগ করুন",
  "Contact the foundation directly.": "ফাউন্ডেশনের সাথে সরাসরি যোগাযোগ করুন।",
  "Explain your reason clearly": "আপনার কারণটি স্পষ্টভাবে ব্যাখ্যা করুন",
  "Full Name": "পূর্ণ নাম",
  "Email Address": "ইমেইল ঠিকানা",
  "Phone Number": "ফোন নম্বর",
  "Subject": "বিষয়",
  "Your Message": "আপনার বার্তা",
  "Use accurate contact information": "সঠিক যোগাযোগের তথ্য দিন",
  "Add relevant details": "প্রাসঙ্গিক তথ্য যোগ করুন",
  "Send A Message": "বার্তা পাঠান",
  "Let’s start a": "চলুন শুরু করি একটি",
  "conversation.": "কথোপকথন।",
  "Message received": "বার্তা পাওয়া গেছে",
  "Send another message": "আরেকটি বার্তা পাঠান",
  "I confirm that the information provided above is accurate to the best of my knowledge.": "আমি নিশ্চিত করছি যে উপরে দেওয়া তথ্য আমার জানামতে সঠিক।",
  "Visit The Foundation": "ফাউন্ডেশন পরিদর্শন করুন",
  "Find us": "আমাদের খুঁজে নিন",
  "in Bangladesh": "বাংলাদেশে",
  "Open in Google Maps": "গুগল ম্যাপে খুলুন",
  "Select a subject": "বিষয় নির্বাচন করুন",
  "Need a scholarship?": "বৃত্তির প্রয়োজন?",
  "Start Application": "আবেদন শুরু করুন",
  "Why Education Matters": "শিক্ষা কেন গুরুত্বপূর্ণ",
  "What We Support": "আমাদের সহায়তার ক্ষেত্র",
  "Our Principles": "আমাদের নীতিমালা",
  "Our Commitment": "আমাদের অঙ্গীকার",
  "How It Works": "যেভাবে কাজ করে",
  "How It Works?": "যেভাবে কাজ করে?",
  "Our Approach": "আমাদের পদ্ধতি",
  "Our Journey": "আমাদের পথচলা",
  "All years Gallery": "সব বছরের গ্যালারি",
  "See all years Gallery": "সব বছরের গ্যালারি দেখুন",
  "Our Impact": "আমাদের প্রভাব",
  "Success Stories": "সাফল্যের গল্প",
  "Contact us": "যোগাযোগ করুন",
  Donate: "দান করুন",
  Donation: "অনুদান",
  "Enter your account email and we’ll send a password reset link.": "আপনার অ্যাকাউন্টের ইমেইল দিন, আমরা পাসওয়ার্ড রিসেটের লিংক পাঠাব।",
  "Forgot password?": "পাসওয়ার্ড ভুলে গেছেন?",
  "For current donation and tax documentation details, please contact the foundation directly.": "অনুদান ও কর-সংক্রান্ত নথির বর্তমান তথ্যের জন্য ফাউন্ডেশনের সাথে সরাসরি যোগাযোগ করুন।",
  "General Donation": "সাধারণ অনুদান",
  "General Enquiry": "সাধারণ জিজ্ঞাসা",
  "Head Office": "প্রধান কার্যালয়",
  "Health Support": "স্বাস্থ্য সহায়তা",
  Home: "হোম",
  "Join us in making a difference through Sadka-E-Zaria, Scholarships, and Health Support.": "সদকায়ে জারিয়া, বৃত্তি ও স্বাস্থ্য সহায়তার মাধ্যমে মানুষের জীবনে পরিবর্তন আনতে আমাদের সাথে যুক্ত হোন।",
  "Khwaja Mozammel Relief Foundation, Dhaka, Bangladesh": "খাজা মোজাম্মেল রিলিফ ফাউন্ডেশন, ঢাকা, বাংলাদেশ",
  "Khwaja Mozammel Relief Foundation, Mymensingh, Bangladesh": "খাজা মোজাম্মেল রিলিফ ফাউন্ডেশন, ময়মনসিংহ, বাংলাদেশ",
  "Khwaja Mozammel Relief Foundation": "খাজা মোজাম্মেল রিলিফ ফাউন্ডেশন",
  "Khwaja Mozammel Hoque (R) Foundation": "খাজা মোজাম্মেল হক (রহ.) ফাউন্ডেশন",
  "Learn more": "আরও জানুন",
  "Login As": "যে পরিচয়ে লগইন করবেন",
  "More About": "আরও জানুন",
  "New password": "নতুন পাসওয়ার্ড",
  "Open menu": "মেনু খুলুন",
  "Open search": "সার্চ খুলুন",
  Partnership: "অংশীদারত্ব",
  "Quick Links": "দ্রুত লিংক",
  "Request another link": "নতুন লিংকের জন্য অনুরোধ করুন",
  Scholarship: "বৃত্তি",
  Search: "সার্চ",
  "Search...": "খুঁজুন...",
  Select: "নির্বাচন করুন",
  "Sadka-E-Zaria": "সদকায়ে জারিয়া",
  "Set a new password": "নতুন পাসওয়ার্ড সেট করুন",
  "Support Our Work": "আমাদের কাজে সহায়তা করুন",
  "Support the Foundation": "ফাউন্ডেশনকে সহায়তা করুন",
  "Tax Information": "কর-সংক্রান্ত তথ্য",
  "The reset link is invalid or incomplete.": "পাসওয়ার্ড রিসেটের লিংকটি অবৈধ বা অসম্পূর্ণ।",
  "Update password": "পাসওয়ার্ড হালনাগাদ করুন",
  "Your contribution helps us continue community welfare, education, and health support programs.": "আপনার অনুদান আমাদের জনকল্যাণ, শিক্ষা ও স্বাস্থ্য সহায়তা কার্যক্রম চালিয়ে যেতে সাহায্য করে।",
  "you@example.com": "you@example.com",
  "Your full name": "আপনার পূর্ণ নাম",
  "Write your message...": "আপনার বার্তা লিখুন...",
  "Write in number": "সংখ্যায় লিখুন",
  "Type mobile/email": "মোবাইল/ইমেইল লিখুন",
  "Phone / Email": "ফোন / ইমেইল",
  "Enter valid phone or email": "সঠিক ফোন নম্বর বা ইমেইল দিন",
  "Dhaka Office": "ঢাকা কার্যালয়",
  "Contact Us": "যোগাযোগ করুন",
  "Get in Touch": "যোগাযোগ করুন",
  "Send Message": "বার্তা পাঠান",
  "Our Location": "আমাদের অবস্থান",
  "Office Location": "কার্যালয়ের ঠিকানা",
  "Select an office": "কার্যালয় নির্বাচন করুন",
  "Your message has been sent successfully.": "আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে।",
  "Something went wrong. Please try again.": "সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
  "Your email address": "আপনার ইমেইল ঠিকানা",
  "Your phone number": "আপনার ফোন নম্বর",
  "Please select a subject": "অনুগ্রহ করে বিষয় নির্বাচন করুন",
  "Forgot password": "পাসওয়ার্ড ভুলে গেছেন",
  "Email address": "ইমেইল ঠিকানা",
  "Send reset link": "রিসেট লিংক পাঠান",
  "Sending...": "পাঠানো হচ্ছে...",
  "Loading...": "লোড হচ্ছে...",
  "Updating...": "হালনাগাদ হচ্ছে...",
  "This reset link is invalid or incomplete.": "পাসওয়ার্ড রিসেটের লিংকটি অবৈধ বা অসম্পূর্ণ।",
  "Your account email and we’ll send a password reset link.": "আপনার অ্যাকাউন্টের ইমেইল দিন, আমরা পাসওয়ার্ড রিসেটের লিংক পাঠাব।",
  "Facebook": "ফেসবুক",
  "Instagram": "ইনস্টাগ্রাম",
  "YouTube": "ইউটিউব",
  "WhatsApp": "হোয়াটসঅ্যাপ",
  "Account": "অ্যাকাউন্ট",
  "User": "ব্যবহারকারী",
  "Khadem": "খাদেম",
  "Kordinator": "সমন্বয়কারী",
  "Admin": "অ্যাডমিন",
  "Foundation": "ফাউন্ডেশন",
  "Registration": "নিবন্ধন",
  "About": "পরিচিতি",
  "Login": "লগইন",
  "Hide password": "পাসওয়ার্ড লুকান",
  "Show password": "পাসওয়ার্ড দেখান",
  "Approve": "অনুমোদন করুন",
  "Approved": "অনুমোদিত",
  "Rejected": "বাতিল",
  "Pending": "অপেক্ষমাণ",
  "All": "সব",
  "Anonymous Donor": "নাম প্রকাশে অনিচ্ছুক দাতা",
  "Unknown Donor": "অজ্ঞাত দাতা",
  "Payment Due": "বকেয়া পরিশোধ",
  "Upcoming Events": "আসন্ন অনুষ্ঠান",
  "Need reminder": "স্মরণ করিয়ে দিতে হবে",
  "This month": "এই মাসে",
  "Paid": "পরিশোধিত",
  "Due": "বকেয়া",
  "Search donation...": "অনুদান খুঁজুন...",
  "Search devotee...": "ভক্ত খুঁজুন...",
  "Featured": "বিশেষ",
  "Success": "সাফল্য",
  "Impact": "প্রভাব",
  "Journey": "পথচলা",
  "Activities": "কার্যক্রম",
  "Current donation and tax documentation details": "অনুদান ও কর-সংক্রান্ত নথির বর্তমান তথ্য",
  "language selection": "ভাষা নির্বাচন",
  "The clearer your message, the easier it is for us to understand your needs and respond appropriately.": "আপনার বার্তা যত পরিষ্কার হবে, আমরা তত সহজে আপনার প্রয়োজন বুঝতে এবং যথাযথভাবে সাড়া দিতে পারব।",
  "Please clearly include the necessary information, contact method, and main point of your message.": "প্রয়োজনীয় তথ্য, যোগাযোগের মাধ্যম এবং আপনার বার্তার মূল বিষয় স্পষ্টভাবে উল্লেখ করুন।",
  "Thank you for your message. This is currently a demo success state for form submission. The actual submission process can be added here when a backend/API is connected.": "আপনার বার্তার জন্য ধন্যবাদ। এটি বর্তমানে ফর্ম জমা দেওয়ার একটি ডেমো সফলতার বার্তা। ব্যাকএন্ড/API যুক্ত করলে এখানে প্রকৃত জমা দেওয়ার প্রক্রিয়া যোগ করা যাবে।",
  "Before visiting the office, please contact us to confirm the visiting hours.": "অফিসে আসার আগে যোগাযোগ করে পরিদর্শনের সময় নিশ্চিত করে নেওয়া ভালো।",
  "একটি সুফিভিত্তিক প্রতিষ্ঠান।": "A Sufi-based organization.",
  "প্রধান কার্যালয়": "Head Office",
  "ঢাকা কার্যালয়": "Dhaka Office",
  "যোগাযোগ": "Contact",
  "দ্রুত লিংক": "Quick Links",
  "পরিচিতি": "About",
  "নিবন্ধন": "Registration",
  "সর্বস্বত্ব সংরক্ষিত।": "All rights reserved.",
  "শিক্ষার সুযোগ": "Educational Opportunity",
  "মেধাবী ও প্রয়োজনীয় শিক্ষার্থীদের উচ্চশিক্ষার পথে এগিয়ে যেতে সহায়তা করা।": "Helping meritorious students in need pursue higher education.",
  "আর্থিক সহায়তা": "Financial Assistance",
  "শিক্ষার গুরুত্বপূর্ণ খরচের চাপ কমিয়ে শিক্ষার্থীদের পড়াশোনায় মনোযোগী হতে সহায়তা করা।": "Reducing major education expenses so students can focus on their studies.",
  "শিক্ষা উপকরণ": "Educational Materials",
  "বই, প্রয়োজনীয় উপকরণ ও শিক্ষা-সংশ্লিষ্ট সহায়তার মাধ্যমে শেখার পরিবেশ তৈরি করা।": "Creating a supportive learning environment with books, supplies, and education-related assistance.",
  "মানবিক সহায়তা": "Humanitarian Support",
  "প্রতিভা ও আর্থিক প্রয়োজনকে বিবেচনা করে যোগ্য শিক্ষার্থীদের পাশে দাঁড়ানো।": "Supporting eligible students based on their potential and financial need.",
  "বাংলাদেশের স্বীকৃত শিক্ষা প্রতিষ্ঠানে অধ্যয়নরত হতে হবে।": "Applicants must be enrolled in a recognized educational institution in Bangladesh.",
  "শিক্ষাগত ফলাফল ও নিয়মিত পড়াশোনার প্রমাণ থাকতে হবে।": "Applicants must provide evidence of academic performance and regular study.",
  "পরিবারের আর্থিক প্রয়োজনের যথাযথ তথ্য প্রদান করতে হবে।": "Applicants must provide accurate information about their family's financial needs.",
  "আবেদনপত্রে সঠিক ও যাচাইযোগ্য তথ্য প্রদান করতে হবে।": "Applicants must provide accurate, verifiable information in the application.",
  "অনলাইনে প্রয়োজনীয় তথ্য ও কাগজপত্রসহ আবেদন জমা দিন।": "Submit your application online with the required information and documents.",
  "আবেদনকারীর শিক্ষাগত যোগ্যতা ও আর্থিক প্রয়োজন যাচাই করা হবে।": "The applicant's academic qualifications and financial needs will be reviewed.",
  "যোগ্যতা, প্রয়োজন ও প্রাপ্যতার ভিত্তিতে বাছাই সম্পন্ন হবে।": "Selection will be based on eligibility, need, and availability.",
  "নির্বাচিত শিক্ষার্থীদের জন্য scholarship support প্রদান করা হবে।": "Scholarship support will be provided to selected students.",
  "মূল সহায়তাগুলো": "Main areas of support",
  "চিকিৎসা সহায়তা": "Medical Assistance",
  "প্রয়োজনীয় মানুষকে চিকিৎসা গ্রহণ ও প্রয়োজনীয় স্বাস্থ্যসেবায় পৌঁছাতে সহায়তা করা।": "Helping people in need access medical treatment and essential healthcare.",
  "হাসপাতাল সহায়তা": "Hospital Assistance",
  "হাসপাতালে চিকিৎসাধীন প্রয়োজনীয় রোগী ও পরিবারের পাশে মানবিক সহায়তা নিয়ে দাঁড়ানো।": "Providing compassionate support to patients receiving hospital care and their families.",
  "ওষুধ সহায়তা": "Medicine Assistance",
  "প্রয়োজনীয় ওষুধ সংগ্রহের ক্ষেত্রে আর্থিক চাপ কমাতে সহায়তার সুযোগ তৈরি করা।": "Helping reduce the financial burden of obtaining essential medicines.",
  "ডায়াগনস্টিক সহায়তা": "Diagnostic Assistance",
  "প্রয়োজনীয় পরীক্ষা-নিরীক্ষার ব্যয় বহনে সক্ষম না হওয়া মানুষদের পাশে থাকা।": "Supporting people who cannot afford necessary diagnostic tests.",
  "প্রয়োজন শনাক্তকরণ": "Identifying Needs",
  "বাস্তব স্বাস্থ্যগত ও আর্থিক প্রয়োজন বুঝে সহায়তার ক্ষেত্র চিহ্নিত করা।": "Identifying support needs based on actual health and financial circumstances.",
  "যাচাই ও মূল্যায়ন": "Review and Assessment",
  "আবেদন ও প্রয়োজনীয় তথ্যের ভিত্তিতে সহায়তার প্রয়োজন মূল্যায়ন করা।": "Assessing support needs based on the application and relevant information.",
  "চিকিৎসাজনিত আর্থিক চাপ কমিয়ে পরিবারকে কঠিন সময়ে কিছুটা স্বস্তি দেওয়া।": "Easing medical expenses to provide families some relief during difficult times.",
  "মানবিক প্রয়োজনকে অগ্রাধিকার দেওয়া": "Prioritize humanitarian needs",
  "সহায়তার আগে প্রয়োজনীয় তথ্য যাচাই করা": "Verify relevant information before providing support",
  "চিকিৎসা ও প্রয়োজন অনুযায়ী সহায়তা নির্ধারণ করা": "Determine assistance based on medical and individual needs",
  "সম্মান, গোপনীয়তা ও মর্যাদা বজায় রাখা": "Uphold respect, privacy, and dignity",
  "স্বাস্থ্যসেবার": "Healthcare",
  "পাশে KMRF": "KMRF is here to help",
  "মানুষের পাশে": "By people's side",
  "দীর্ঘ পথচলা": "A long journey",
  "স্মৃতি ও সাফল্যের মুহূর্ত।": "Moments of memories and success.",
  "সব বছরের Gallery দেখুন": "See the gallery from all years",
  "স্বনির্ভরতা": "Self-reliance",
  "সহায়তার মাধ্যমে পরিবারগুলোকে নিজেদের পায়ে দাঁড়ানোর সুযোগ তৈরি করা।": "Helping families become self-reliant through meaningful support.",
  "প্রয়োজনীয় পরিবারগুলোর পাশে দাঁড়িয়ে তাদের জীবনকে আরও স্থিতিশীল করতে সহায়তা করা।": "Supporting families in need and helping them build a more stable life.",
  "দারিদ্র্যের দীর্ঘমেয়াদি চক্র ভাঙতে শিক্ষা ও সচেতনতার সুযোগ তৈরি করা।": "Creating opportunities in education and awareness to break cycles of poverty.",
  "প্রয়োজনীয় স্বাস্থ্যসেবা ও সচেতনতার মাধ্যমে জীবনমান উন্নত করা।": "Improving quality of life through essential healthcare and awareness.",
  "প্রয়োজন শনাক্ত": "Identifying needs",
  "প্রয়োজনীয় পরিবার ও তাদের বাস্তব পরিস্থিতি চিহ্নিত করা।": "Identifying families in need and understanding their circumstances.",
  "সহায়তা প্রদান": "Providing assistance",
  "প্রয়োজন অনুযায়ী আর্থিক সহায়তা ও পুঁজি দেওয়া।": "Providing financial assistance and capital according to need.",
  "পরিবারকে নিজের পায়ে দাঁড়ানোর সুযোগ তৈরি করা।": "Helping families become self-reliant.",
  "দীর্ঘমেয়াদি প্রভাব": "Long-term impact",
  "একটি পরিবারের জীবনমান উন্নয়নের মাধ্যমে স্থায়ী পরিবর্তন।": "Creating lasting change by improving a family's quality of life.",
  "আপনার বার্তা যত পরিষ্কার হবে, আমরা তত সহজে আপনার প্রয়োজন বুঝতে এবং যথাযথভাবে respond করতে পারব।": "The clearer your message, the easier it is for us to understand your needs and respond appropriately.",
  "প্রয়োজনীয় তথ্য, যোগাযোগের মাধ্যম এবং আপনার message-এর মূল বিষয় স্পষ্টভাবে উল্লেখ করুন।": "Please clearly include the necessary information, contact method, and main point of your message.",
  "আপনার বার্তার জন্য ধন্যবাদ। এটি বর্তমানে form submission-এর demo success state। Backend/API যুক্ত করলে এখানে প্রকৃত submission process করা যাবে।": "Thank you for your message. This is currently a demo success state for form submission. The actual submission process can be added here when a backend/API is connected.",
  "অফিসে আসার আগে প্রয়োজনীয় যোগাযোগ নম্বরে যোগাযোগ করে visiting hours নিশ্চিত করে নেওয়া ভালো।": "Before visiting the office, please contact us to confirm the visiting hours.",
  "একটি scholarship": "A scholarship",
  "হতে পারে একটি": "can be the start of",
  "নতুন ভবিষ্যতের শুরু।": "a new future.",
  "একজন শিক্ষার্থীর পাশে দাঁড়ানো মানে তার স্বপ্নকে বাঁচিয়ে রাখা। সেই স্বপ্ন একদিন পরিবার, প্রতিষ্ঠান ও সমাজে ইতিবাচক পরিবর্তনের পথ তৈরি করতে পারে।": "Supporting a student means keeping their dreams alive. Those dreams can one day create positive change for their family, community, and society.",
  "মেধা ও শিক্ষাগত সক্ষমতাকে গুরুত্ব দেওয়া।": "Recognizing merit and academic ability.",
  "বাস্তব আর্থিক প্রয়োজনকে বিবেচনায় রাখা।": "Taking genuine financial need into account.",
  "দীর্ঘমেয়াদি শিক্ষাগত ও ব্যক্তিগত উন্নয়ন।": "Supporting long-term academic and personal growth.",
  "সম্ভাবনাময় ভবিষ্যতের জন্য বিনিয়োগ।": "Investing in a promising future.",
  "শিক্ষার পথে": "Along the path of education",
  "অনেক প্রতিভাবান শিক্ষার্থী আর্থিক সীমাবদ্ধতার কারণে তাদের কাঙ্ক্ষিত শিক্ষাজীবন চালিয়ে যেতে বাধার সম্মুখীন হয়। KMRF Scholarship Program-এর লক্ষ্য হলো এমন শিক্ষার্থীদের পাশে দাঁড়ানো, যাতে যোগ্যতা ও সম্ভাবনা আর্থিক সমস্যার কারণে থেমে না যায়।": "Many talented students face financial barriers to continuing their education. The KMRF Scholarship Program supports them so their abilities and potential are not held back by financial hardship.",
  "এই উদ্যোগে শিক্ষার্থীর একাডেমিক পারফরম্যান্স, ব্যক্তিগত সম্ভাবনা এবং আর্থিক প্রয়োজনকে গুরুত্ব দিয়ে সহায়তার সুযোগ তৈরি করা হয়।": "This initiative considers academic performance, personal potential, and financial need when providing support.",
  "একটি শিক্ষাকে টিকিয়ে রাখা মানে শুধু একজন শিক্ষার্থীকে সহায়তা করা নয়; বরং একটি সম্ভাবনাময় ভবিষ্যৎকে এগিয়ে নেওয়া।": "Sustaining education means more than helping one student; it means moving a promising future forward.",
  "কারা": "Who",
  "আবেদন করতে পারবেন?": "can apply?",
  "scholarship-এর জন্য আবেদন করার আগে নিচের প্রাথমিক যোগ্যতাগুলো দেখে নিন।": "Review the basic eligibility requirements below before applying for a scholarship.",
  "আবেদন করার আগে নিশ্চিত করুন।": "Please make sure you meet these requirements before applying.",
  "কীভাবে আবেদন করবেন?": "How can you apply?",
  "একটি সহজ ও কাঠামোবদ্ধ process-এর মাধ্যমে আবেদন সম্পন্ন করুন।": "Complete your application through a simple, structured process.",
  "আপনার সহায়তা": "Your support",
  "একটি শিক্ষার্থীর স্বপ্ন এগিয়ে নিতে পারে।": "can help a student's dream move forward.",
  "মেধাবী ও প্রয়োজনীয় শিক্ষার্থীদের শিক্ষাজীবনে সহায়তা করার মানবিক উদ্যোগের অংশ হোন।": "Be part of a compassionate effort to support talented students in need.",
  "সুস্বাস্থ্য সহায়তা": "Health Support",
  "স্বাস্থ্য সহায়তার": "Health support",
  "গুরুত্বপূর্ণ ক্ষেত্র": "areas",
  "প্রয়োজনের ধরন অনুযায়ী সহায়তার সুযোগ ভিন্ন হতে পারে।": "Available support may vary depending on individual needs.",
  "সংকটের সময়ে একটি পরিবারকে চিকিৎসা সংক্রান্ত সহায়তা দেওয়া কখনো কখনো তাদের জন্য বড় একটি স্বস্তির কারণ হতে পারে।": "Medical assistance during a crisis can bring significant relief to a family.",
  "অসুস্থতা বা জরুরি চিকিৎসার প্রয়োজন একটি পরিবারের অর্থনৈতিক অবস্থার ওপর বড় চাপ তৈরি করতে পারে। বিশেষ করে নিম্নআয়ের পরিবারের ক্ষেত্রে চিকিৎসার খরচ অনেক সময় দৈনন্দিন প্রয়োজনের সঙ্গে সরাসরি সংঘাত তৈরি করে।": "Illness or urgent medical treatment can place significant pressure on a family's finances. For low-income families, medical expenses often compete directly with everyday necessities.",
  "KMRF Health Support-এর উদ্দেশ্য হলো এমন পরিস্থিতিতে প্রয়োজনীয় মানুষদের পাশে মানবিক সহায়তার সুযোগ তৈরি করা। প্রয়োজন অনুযায়ী চিকিৎসা, ওষুধ, পরীক্ষা-নিরীক্ষা বা হাসপাতাল-সংশ্লিষ্ট খাতে সহায়তার পথ তৈরি করা এই উদ্যোগের একটি গুরুত্বপূর্ণ অংশ।": "KMRF Health Support aims to provide compassionate assistance to people in these circumstances. Depending on the need, this may include treatment, medicines, diagnostic tests, or hospital-related costs.",
  "আমাদের লক্ষ্য শুধু তাৎক্ষণিক সহায়তা নয়; বরং মানুষের মর্যাদা বজায় রেখে কঠিন স্বাস্থ্য সংকটের সময়ে একটি সহায়ক হাত বাড়িয়ে দেওয়া।": "Our goal is not only to provide immediate assistance, but also to offer support during difficult health crises while preserving each person's dignity.",
  "একটি কঠিন সময়ে পাশে থাকা কখনো শুধু আর্থিক সহায়তা নয়—এটি একজন মানুষকে আশ্বস্ত করারও একটি মানবিক প্রচেষ্টা।": "Being there in a difficult time is more than financial assistance; it is also a compassionate way to reassure someone.",
  "কীভাবে Health Support": "How does Health Support",
  "কাজ করে?": "work?",
  "প্রয়োজন শনাক্ত করা থেকে সহায়তা পৌঁছে দেওয়া পর্যন্ত একটি সুসংগঠিত প্রক্রিয়া অনুসরণ করা হয়।": "A structured process is followed from identifying needs to delivering assistance.",
  "সহায়তায়": "Support with",
  "মানবিকতা ও মর্যাদা": "compassion and dignity",
  "স্বাস্থ্যসেবা সংক্রান্ত সহায়তায় প্রয়োজনীয় মানুষের মর্যাদা ও বাস্তব পরিস্থিতিকে গুরুত্ব দেওয়া আমাদের মূল মূল্যবোধের অংশ।": "Respecting the dignity and circumstances of people seeking healthcare assistance is one of our core values.",
  "একটি সহায়তা যেন সত্যিকারের প্রয়োজনের জায়গায় পৌঁছায়।": "Ensuring assistance reaches those who genuinely need it.",
  "একটি কঠিন সময়ে": "In a difficult time,",
  "পাশে থাকা জরুরি।": "being there matters.",
  "চিকিৎসা বা স্বাস্থ্যগত প্রয়োজনের কারণে যখন একটি পরিবার আর্থিক চাপে পড়ে, তখন সময়মতো সহায়তা তাদের জন্য গুরুত্বপূর্ণ হয়ে উঠতে পারে।": "When medical or health needs place a family under financial pressure, timely assistance can make a real difference.",
  "মানুষের স্বাস্থ্যগত সংকটে মানবিক সহায়তা পৌঁছে দেওয়ার একটি প্রচেষ্টা।": "An effort to provide compassionate support during people's health crises.",
  "কারও চিকিৎসার পথ সহজ করতে পারে।": "can make someone's path to treatment easier.",
  "KMRF Health Support-এর মাধ্যমে প্রয়োজনীয় মানুষের পাশে দাঁড়ানোর মানবিক উদ্যোগের অংশ হোন।": "Join KMRF Health Support in its compassionate effort to stand beside people in need.",
  "মানুষের জীবনে": "In people's lives",
  "বাস্তব পরিবর্তন": "real change",
  "একটি পরিবারকে স্বনির্ভর করে তুলতে শুধু অর্থ নয়, প্রয়োজন সুযোগ, শিক্ষা, স্বাস্থ্য এবং একটি স্থায়ী ভবিষ্যৎ।": "Helping a family become self-reliant takes more than money; it also takes opportunity, education, healthcare, and a sustainable future.",
  "মানবিক সহায়তার লক্ষ্য হলো মানুষকে শুধু সহায়তা করা নয়, বরং তাদের সামনে নতুন সম্ভাবনার দরজা খুলে দেওয়া।": "The goal of humanitarian support is not only to help people, but also to open doors to new possibilities.",
  "সদকায়ে জারিয়ার সহায়তা বিতরণ": "Sadka-E-Zaria assistance distribution",
  "আমাদের সকল কার্যক্রম": "All Our Activities",
  "শিক্ষা": "Education",
  "শিক্ষা সহায়তা": "Education Support",
  "অসহায় ও মেধাবী শিক্ষার্থীদের শিক্ষা কার্যক্রমে সহযোগিতা করা এবং তাদের ভবিষ্যৎ গড়তে পাশে থাকা।": "Supporting disadvantaged and talented students in their education and helping build their future.",
  "বিস্তারিত দেখুন": "View Details",
  "স্বাস্থ্যসেবা": "Healthcare",
  "স্বাস্থ্য": "Health",
  "সুবিধাবঞ্চিত মানুষের জন্য চিকিৎসা সহায়তা, স্বাস্থ্য সচেতনতা এবং প্রয়োজনীয় স্বাস্থ্যসেবা প্রদান।": "Providing medical assistance, health awareness, and essential healthcare to underserved people.",
  "মানবিক সহায়তা": "Humanitarian Support",
  "দুঃস্থ ও অসহায় মানুষের পাশে দাঁড়িয়ে খাদ্য, বস্ত্র এবং প্রয়োজনীয় সামগ্রী দিয়ে সহযোগিতা করা।": "Standing beside people in hardship by providing food, clothing, and essential supplies.",
  "মানুষের কল্যাণে দীর্ঘস্থায়ী ও সওয়াবের কাজগুলো বাস্তবায়নের মাধ্যমে সমাজে ইতিবাচক পরিবর্তন আনা।": "Creating positive change through lasting charitable work that benefits the community.",
  "দারিদ্র্য বিমোচন": "Poverty Alleviation",
  "সামাজিক উন্নয়ন": "Social Development",
  "দরিদ্র ও সুবিধাবঞ্চিত পরিবারকে স্বাবলম্বী করে তুলতে বিভিন্ন সহায়তা ও উন্নয়নমূলক কার্যক্রম পরিচালনা।": "Providing support and development programs to help low-income and underserved families become self-reliant.",
  "শীতবস্ত্র বিতরণ": "Winter Clothing Distribution",
  "মানবিক কার্যক্রম": "Humanitarian Programs",
  "শীতকালে অসহায় ও দরিদ্র মানুষের মাঝে শীতবস্ত্র বিতরণের মাধ্যমে তাদের কষ্ট লাঘব করা।": "Easing hardship in winter by distributing warm clothing to people in need.",
  "সকল কার্যক্রম দেখুন": "View All Activities",
  "হোম": "Home",
  "(হোম)": "(Home)",
  "(পরিচিতি)": "(About)",
  "(নিবন্ধন)": "(Registration)",
  "(যোগাযোগ)": "(Contact)",
  "আমাদের কার্যক্রম সম্পর্কে": "About Our Activities",
  "খাজা মোজাম্মেল হক (রঃ) ফাউন্ডেশন": "Khwaja Mozammel Hoque (R) Foundation",
  "৩৭ শ্যামলীবাগ, শ্যামলী, ঢাকা-১২০৭, বাংলাদেশ": "37 Shyamolibagh, Shyamoli, Dhaka-1207, Bangladesh",
  "যারা নিজেদের সম্পদ আল্লাহর পথে ব্যয় করে... — সূরা বাকারা, আয়াত: ২৬২": "Those who spend their wealth in the way of Allah... — Surah Al-Baqarah, verse 262",
  "৩৭ শ্যামলীবাগ, শ্যামলী, ঢাকা-১২০৭": "37 Shyamolibagh, Shyamoli, Dhaka-1207",
  "সদকায়ে জারিয়া": "Sadka-E-Zaria",
  "একটি চলমান কল্যাণ": "An ongoing act of charity",
  "এমন একটি কল্যাণমূলক কাজ যার উপকার দীর্ঘসময় মানুষের জীবনে ইতিবাচক প্রভাব রেখে যেতে পারে।": "A charitable act whose benefits can continue to positively affect people's lives for a long time.",
  "যখন কোনো মানুষ মৃত্যুবরণ করে, তখন তার আমল বন্ধ হয়ে যায়; তবে তিনটি বিষয় ছাড়া—সদকায়ে জারিয়া, উপকারী জ্ঞান এবং এমন নেক সন্তান যে তার জন্য দোয়া করে।": "When a person dies, their deeds come to an end except for three: ongoing charity, beneficial knowledge, and a righteous child who prays for them.",
  "বছরের পর বছর পরিচালিত Sadka-E-Zaria কার্যক্রমের কিছু স্মৃতি ও সাফল্যের মুহূর্ত।": "Memories and moments of success from Sadka-E-Zaria activities carried out over the years.",
  "২০২৪ সালের কার্যক্রম ও সাফল্যের স্মৃতি।": "Memories of the 2024 activities and achievements.",
  "প্রয়োজনীয় মানুষের কাছে সহায়তা পৌঁছে দেওয়ার ধারাবাহিক উদ্যোগ।": "An ongoing effort to deliver support to people in need.",
  "বছরের পর বছর মানুষের পাশে থাকার একটি ধারাবাহিক উদ্যোগ।": "A sustained effort to stand beside people year after year.",
  "একটি পরিবারকে দারিদ্র্য থেকে বের হয়ে নিজের পায়ে দাঁড়ানোর সুযোগ তৈরি করা—এটাই একটি সহায়তার সবচেয়ে সুন্দর প্রভাব।": "Helping a family move beyond poverty and become self-reliant is one of the most meaningful outcomes of support.",
  "বাংলাদেশের অনেক দরিদ্র পরিবার মৌলিক প্রয়োজন পূরণ করতে গিয়ে ঋণের ওপর নির্ভরশীল হয়ে পড়ে। ঋণের বোঝা তাদের দারিদ্র্যের একটি স্থায়ী চক্রের মধ্যে আটকে রাখতে পারে।": "Many low-income families in Bangladesh rely on loans to meet basic needs. The burden of debt can trap them in a persistent cycle of poverty.",
  "Capital as Sadka-E-Zaria-এর ধারণা হলো প্রয়োজনীয় পরিবারগুলোকে এমন আর্থিক সহায়তা দেওয়া, যা তাদেরকে ঋণের বোঝা ছাড়াই নিজেদের জীবন ও জীবিকা এগিয়ে নেওয়ার সুযোগ তৈরি করে।": "Capital as Sadka-E-Zaria provides financial support to families in need so they can build their lives and livelihoods without the burden of debt.",
  "এই উদ্যোগের মাধ্যমে একজন উপকারভোগী শুধু একটি মুহূর্তের সহায়তা পান না; বরং নিজের পায়ে দাঁড়ানোর একটি সুযোগ পান। আর একজন দাতা একটি চলমান কল্যাণমূলক কাজের অংশ হওয়ার সুযোগ পান।": "Through this initiative, recipients gain more than short-term assistance: they receive an opportunity to become self-reliant. Donors can take part in an ongoing charitable effort.",
  "প্রয়োজন চিহ্নিত করা থেকে শুরু করে দীর্ঘমেয়াদি স্বনির্ভরতা পর্যন্ত প্রতিটি ধাপে একটি পরিকল্পিত মানবিক উদ্যোগ।": "A planned humanitarian effort at every stage, from identifying needs to supporting long-term self-reliance.",
  "Scholarship-এর": "Scholarship",
  "আমাদের সম্পর্কে": "About Us",
  "খাজা মোজাম্মেল হক ফাউন্ডেশন": "Khwaja Mozammel Hoque Foundation",
  "সুফি দর্শনের আদর্শে অনুপ্রাণিত একটি অলাভজনক সংগঠন, যা শিক্ষা ও মানবসেবার মাধ্যমে সমাজে আলো ছড়াতে কাজ করে যাচ্ছে।": "A nonprofit organization inspired by Sufi values, working to bring positive change through education and humanitarian service.",
  "আমাদের লক্ষ্য": "Our Mission",
  "অসচ্ছল ও মেধাবী শিক্ষার্থীদের শিক্ষাসহায়তা দেওয়া এবং সদকায়ে জারিয়ার মাধ্যমে টেকসই সমাজকল্যাণমূলক কাজ পরিচালনা করা।": "To support talented students in need and carry out sustainable community welfare initiatives through Sadka-E-Zaria.",
  "আমাদের ভিশন": "Our Vision",
  "এমন একটি সমাজ গড়ে তোলা, যেখানে প্রত্যেক মানুষ শিক্ষা, সম্মান ও সুযোগের সমান অধিকার পাবে।": "To build a society where everyone has equal access to education, respect, and opportunity.",
  "আমাদের গল্প": "Our Story",
  "এখানে ফাউন্ডেশনের শুরুর গল্প লিখুন: কবে, কীভাবে এবং কেন এই ফাউন্ডেশন প্রতিষ্ঠিত হয়েছিল।": "Add the foundation's story here: when, how, and why it was established.",
  "এরপর লিখুন এখন পর্যন্ত কী কী কাজ হয়েছে এবং ভবিষ্যতের পরিকল্পনা কী।": "Describe the work completed so far and the plans for the future.",
  "বছরের সেবা": "Years of service",
  "বৃত্তিপ্রাপ্ত শিক্ষার্থী": "Scholarship recipients",
  "সদকায়ে জারিয়া প্রকল্প": "Sadka-E-Zaria projects",
  "স্বেচ্ছাসেবক": "Volunteers",
  "আমাদের মূল্যবোধ": "Our Values",
  "আধ্যাত্মিকতা": "Spirituality",
  "সুফি দর্শনের আলোকে মানুষের সেবা ও আত্মশুদ্ধির চর্চা।": "Serving people and pursuing self-purification guided by Sufi philosophy.",
  "মেধাবী ও অসচ্ছল শিক্ষার্থীদের পাশে দাঁড়িয়ে তাদের স্বপ্ন পূরণে সহায়তা।": "Supporting talented students in need as they work toward their dreams.",
  "মানবসেবা": "Humanitarian Service",
  "সদকায়ে জারিয়ার মাধ্যমে সমাজের সুবিধাবঞ্চিত মানুষের কল্যাণে কাজ।": "Working for underserved communities through ongoing charitable giving.",
  "স্বচ্ছতা": "Transparency",
  "প্রতিটি অনুদান ও কার্যক্রমের হিসাব সবার জন্য উন্মুক্ত।": "Keeping the records of donations and activities open to everyone.",
  "আমাদের নেতৃত্ব": "Our Leadership",
  "নাম এখানে লিখুন": "Name to be added",
  "প্রতিষ্ঠাতা": "Founder",
  "সভাপতি": "Chairperson",
  "সাধারণ সম্পাদক": "General Secretary",
  "আমাদের পাশে দাঁড়ান": "Stand with us",
  "আপনার একটি ছোট অনুদানও কারও জীবন বদলে দিতে পারে।": "Even a small donation can change someone's life.",
  "বৃত্তির জন্য আবেদন": "Apply for a scholarship",
  "চলুন একসাথে পরিবর্তন আনি": "Let's make a difference together",
  "আপনার অনুদান শিক্ষা, স্বাস্থ্যসেবা ও সমাজকল্যাণমূলক কাজে মানুষের পাশে দাঁড়াতে সাহায্য করে।": "Your donation helps people through education, healthcare, and community welfare programs.",
  "অনুদানের খাতসমূহ": "Donation Funds",
  "আপনার পছন্দের উদ্যোগে সহায়তা করুন": "Support a cause you care about",
  "যে কোনো একটি কার্যক্রম বেছে নিয়ে অনুদান দিতে লগইন করুন। নতুন হলে প্রথমে নিবন্ধন করে আপনার অ্যাকাউন্ট তৈরি করুন।": "Choose a cause and sign in to donate. If you are new, register first to create an account.",
  "স্বাস্থ্য সহায়তা": "Health Support",
  "চিকিৎসা ও প্রয়োজনীয় স্বাস্থ্যসেবার জন্য মানুষের পাশে দাঁড়ান।": "Stand beside people in need of treatment and essential healthcare.",
  "সদকায়ে জারিয়া": "Sadka-E-Zaria",
  "পরিবারের স্বাবলম্বিতা ও দীর্ঘমেয়াদি কল্যাণমূলক কাজে অংশ নিন।": "Support families' self-reliance and long-term community welfare.",
  "সাধারণ অনুদান": "General Donation",
  "ফাউন্ডেশনের বিভিন্ন মানবকল্যাণমূলক কার্যক্রমে সহায়তা করুন।": "Support the foundation's humanitarian programs.",
  "অনুদান দিন": "Donate",
  "অনুদান দিতে আপনার অ্যাকাউন্টে লগইন করুন": "Sign in to your account to donate",
  "অনুদানের নিরাপদ হিসাব ও রসিদের জন্য আপনার KMRF অ্যাকাউন্ট ব্যবহার করুন।": "Use your KMRF account to track donations securely and receive receipts.",
  "লগইন করুন": "Sign In",
  "নিবন্ধন করুন": "Register",
};

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function containsBengali(value: string) {
  return /[\u0980-\u09FF]/.test(value);
}

const englishTranslations = Object.fromEntries(
  Object.entries(translations)
    .filter(([source]) => containsBengali(source))
    .map(([bengali, english]) => [normalizeText(bengali), english]),
);

const bengaliOverrides: Record<string, string> = {
  "একটি scholarship": "একটি বৃত্তি",
  "Scholarship-এর": "বৃত্তি কার্যক্রমের",
};

function getServerLanguage(): Language {
  return "en";
}

function translate(value: string, language: Language) {
  const normalized = normalizeText(value);
  if (language === "bn") {
    const bengaliOverride = bengaliOverrides[normalized];
    if (bengaliOverride) {
      const leadingWhitespace = value.match(/^\s*/)?.[0] ?? "";
      const trailingWhitespace = value.match(/\s*$/)?.[0] ?? "";
      return `${leadingWhitespace}${bengaliOverride}${trailingWhitespace}`;
    }

    if (containsBengali(normalized)) return value;
    const localized = translations[normalized];
    if (!localized) return value;

    const leadingWhitespace = value.match(/^\s*/)?.[0] ?? "";
    const trailingWhitespace = value.match(/\s*$/)?.[0] ?? "";
    return `${leadingWhitespace}${localized}${trailingWhitespace}`;
  }

  if (!containsBengali(normalized)) return value;
  const localized = englishTranslations[normalized];
  if (!localized) return value;

  const leadingWhitespace = value.match(/^\s*/)?.[0] ?? "";
  const trailingWhitespace = value.match(/\s*$/)?.[0] ?? "";
  return `${leadingWhitespace}${localized}${trailingWhitespace}`;
}

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const TEXT_TRANSLATION_KEY = "kmrf-original-text";
const ATTRIBUTE_TRANSLATION_KEY = "kmrf-original-attributes";

type TrackedText = Text & {
  [TEXT_TRANSLATION_KEY]?: { original: string; rendered: string };
};

type TrackedElement = HTMLElement & {
  [ATTRIBUTE_TRANSLATION_KEY]?: Record<
    string,
    { original: string; rendered: string }
  >;
};

function translateTextNode(node: Text, language: Language) {
  const trackedNode = node as TrackedText;
  const tracked = trackedNode[TEXT_TRANSLATION_KEY];
  const current = node.data;
  const original = tracked && current === tracked.rendered
    ? tracked.original
    : current;
  const rendered = translate(original, language);
  trackedNode[TEXT_TRANSLATION_KEY] = { original, rendered };
  if (current !== rendered) node.data = rendered;
}

const TRANSLATABLE_ATTRIBUTES = ["alt", "placeholder", "title", "aria-label"];

function translateElementAttributes(element: Element, language: Language) {
  if (!(element instanceof HTMLElement)) return;
  const trackedElement = element as TrackedElement;
  const tracked = trackedElement[ATTRIBUTE_TRANSLATION_KEY] ?? {};

  for (const attribute of TRANSLATABLE_ATTRIBUTES) {
    const current = element.getAttribute(attribute);
    if (current === null) continue;

    const previous = tracked[attribute];
    const original = previous && current === previous.rendered
      ? previous.original
      : current;
    const rendered = translate(original, language);
    tracked[attribute] = { original, rendered };
    if (current !== rendered) element.setAttribute(attribute, rendered);
  }

  trackedElement[ATTRIBUTE_TRANSLATION_KEY] = tracked;
}

function translateSubtree(node: Node, language: Language) {
  if (node instanceof Text) {
    translateTextNode(node, language);
    return;
  }
  if (!(node instanceof Element)) return;

  translateElementAttributes(node, language);
  if (node.matches("script, style, noscript, textarea")) return;

  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  let textNode: Node | null;
  while ((textNode = walker.nextNode())) {
    translateTextNode(textNode as Text, language);
  }

  node.querySelectorAll("*").forEach((element) => {
    translateElementAttributes(element, language);
  });
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToLanguageChanges,
    getStoredLanguage,
    getServerLanguage,
  );

  useEffect(() => {
    document.documentElement.lang = language;
    translateSubtree(document.body, language);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          translateTextNode(mutation.target as Text, language);
        } else if (mutation.type === "attributes") {
          translateElementAttributes(mutation.target as Element, language);
        } else {
          mutation.addedNodes.forEach((node) =>
            translateSubtree(node, language),
          );
        }
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: TRANSLATABLE_ATTRIBUTES,
      characterData: true,
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [language]);

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage: saveLanguage,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
