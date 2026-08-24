"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import {
  countryList,
  divisionList,
  districtByDivision,
  thanaByDistrict,
  divisionBnToEn,
  districtBnToEn,
  thanaBnToEn,
  khademByDistrict,        // নতুন
  coordinatorByDivision,   // নতুন
} from "@/lib/constants/locationData";

// ---------------------------------------------------------------------------
// খাজা মোজাম্মেল হক (রঃ) ফাউন্ডেশন — ভক্ত নিবন্ধন ফর্ম
// ---------------------------------------------------------------------------

type FormState = {
  kmrfId: string[];
  purpose: string;
  region: string;
  designation: string;
  name: string;
  fatherName: string;
  spouseName: string;
  country: string;
  division: string;
  district: string;
  ps: string;
  union: string;
  po: string;
  postCode: string;
  village: string;
  street: string;
  dob: string[];
  religion: string;
  bloodGroup: string;
  profession: string;
  nationality: string;
  email: string;
  contactNo: string;
  idType: "NID" | "BRN" | "PPN" | "";
  idNumber: string[];
  gender: "male" | "female" | "";
  maritalStatus: "married" | "unmarried" | "";
  sonCount: string;
  daughterCount: string;
  widow: boolean;
  widower: boolean;
  divorced: boolean;
  passedAway: boolean;
  securityVolunteer: boolean;
  education:
  | "underSSC"
  | "SSC"
  | "HSC"
  | "bachelors"
  | "masters"
  | "doctorate"
  | "";
  followerMozammel: boolean;
  followerYunus: boolean;
  otherNesbot: boolean;
  otherNesbotDetail: string;
  joiningDate: string;
  joinSadka: boolean;
  khademName: string;
  coordinatorName: string;
};

const emptyState: FormState = {
  kmrfId: Array(10).fill(""),
  purpose: "",
  region: "",
  designation: "",
  name: "",
  fatherName: "",
  spouseName: "",
  country: "বাংলাদেশ",
  division: "",
  district: "",
  ps: "",
  union: "",
  po: "",
  postCode: "",
  village: "",
  street: "",
  dob: Array(8).fill(""),
  religion: "",
  bloodGroup: "",
  profession: "",
  nationality: "বাংলাদেশি",
  email: "",
  contactNo: "",
  idType: "",
  idNumber: Array(17).fill(""),
  gender: "",
  maritalStatus: "",
  sonCount: "",
  daughterCount: "",
  widow: false,
  widower: false,
  divorced: false,
  passedAway: false,
  securityVolunteer: false,
  education: "",
  followerMozammel: false,
  followerYunus: false,
  otherNesbot: false,
  otherNesbotDetail: "",
  joiningDate: "",
  joinSadka: false,
  khademName: "",
  coordinatorName: "",
};

// ---------------------------------------------------------------------------
// ইউটিলিটি ফাংশন: বাংলা → ইংরেজি (ইউনিয়ন API-এর জন্য)
// ---------------------------------------------------------------------------
function toEn(reverseMap: Record<string, string>, bn: string): string {
  return reverseMap[bn] ?? bn;
}

// ---------------------------------------------------------------------------
// ইউনিয়ন ফেচিং লজিক (ইংরেজি নাম ব্যবহার করে)
// ---------------------------------------------------------------------------
const GEO_BASE = "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master";

type DistrictRow = { id: number; name: string; bnName: string };
type UpazilaRow = { id: number; districtId: number; name: string; bnName: string };
type UnionRow = { id: number; upazilaId: number; name: string; bnName: string };

type GeoData = {
  districts: DistrictRow[];
  upazilas: UpazilaRow[];
  unions: UnionRow[];
};

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

function parseCsv(text: string): string[][] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map(parseCsvLine);
}

const DISTRICT_NAME_ALIAS: Record<string, string> = {
  barishal: "barisal",
  jhalokati: "jhalakathi",
  coxsbazar: "coxsbazar",
  jeshore: "jashore",
  bogra: "bogura",
  nawabganj: "chapainawabganj",
};

const THANA_NAME_ALIAS: Record<string, string> = {
  cumillaadarshasadar: "comillasadar",
  nawabganjsadar: "chapainawabganjsadar",
  matlabdakshin: "matlabsouth",
  matlabuttar: "matlabnorth",
  dakshinsunamganj: "southsunamganj",
  goalandaghat: "goalanda",
  kawkhalirangamati: "kawkhali",
  nesarabadswarupkathi: "nesarabad",
};

function normalizeName(raw: string): string {
  let s = raw.toLowerCase();
  s = s.replace(/\(.*?\)/g, "");
  s = s.replace(/[^a-z]/g, "");
  return THANA_NAME_ALIAS[s] ?? DISTRICT_NAME_ALIAS[s] ?? s;
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const la = a.length;
  const lb = b.length;
  if (la === 0) return lb;
  if (lb === 0) return la;
  let prev = Array.from({ length: lb + 1 }, (_, i) => i);
  for (let i = 1; i <= la; i++) {
    const cur = [i];
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = cur;
  }
  return prev[lb];
}

let geoDataPromise: Promise<GeoData> | null = null;
function loadGeoData(): Promise<GeoData> {
  if (!geoDataPromise) {
    geoDataPromise = Promise.all([
      fetch(`${GEO_BASE}/districts/districts.csv`).then((r) => r.text()),
      fetch(`${GEO_BASE}/upazilas/upazilas.csv`).then((r) => r.text()),
      fetch(`${GEO_BASE}/unions/unions.csv`).then((r) => r.text()),
    ]).then(([districtsCsv, upazilasCsv, unionsCsv]) => {
      const districts: DistrictRow[] = parseCsv(districtsCsv).map((r) => ({
        id: Number(r[0]),
        name: r[2],
        bnName: r[3],
      }));
      const upazilas: UpazilaRow[] = parseCsv(upazilasCsv).map((r) => ({
        id: Number(r[0]),
        districtId: Number(r[1]),
        name: r[2],
        bnName: r[3],
      }));
      const unions: UnionRow[] = parseCsv(unionsCsv).map((r) => ({
        id: Number(r[0]),
        upazilaId: Number(r[1]),
        name: r[2],
        bnName: r[3],
      }));
      return { districts, upazilas, unions };
    });
  }
  return geoDataPromise;
}

function matchUpazila(
  geo: GeoData,
  districtName: string,
  thanaName: string
): UpazilaRow | null {
  const targetDistrictNorm = normalizeName(districtName);
  const district = geo.districts.find(
    (d) => normalizeName(d.name) === targetDistrictNorm
  );
  if (!district) return null;
  const candidates = geo.upazilas.filter((u) => u.districtId === district.id);
  if (candidates.length === 0) return null;
  const targetThanaNorm = normalizeName(thanaName);
  const exact = candidates.find((u) => normalizeName(u.name) === targetThanaNorm);
  if (exact) return exact;
  let best: UpazilaRow | null = null;
  let bestDistance = Infinity;
  for (const u of candidates) {
    const d = levenshtein(targetThanaNorm, normalizeName(u.name));
    if (d < bestDistance) {
      bestDistance = d;
      best = u;
    }
  }
  return bestDistance <= 3 ? best : null;
}

// ---------------------------------------------------------------------------
// UI কম্পোনেন্টস
// ---------------------------------------------------------------------------

function BoxInput({ values, onChange, count, groupSizes }: {
  values: string[];
  onChange: (next: string[]) => void;
  count: number;
  groupSizes?: number[];
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const handleChange = (i: number, val: string) => {
    const char = val.slice(-1);
    const next = [...values];
    next[i] = char;
    onChange(next);
    if (char && i < count - 1) refs.current[i + 1]?.focus();
  };
  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !values[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };
  const boxes = Array.from({ length: count }, (_, i) => (
    <input
      key={i}
      ref={(el) => { refs.current[i] = el; }}
      value={values[i] ?? ""}
      onChange={(e) => handleChange(i, e.target.value)}
      onKeyDown={(e) => handleKeyDown(i, e)}
      maxLength={1}
      inputMode="text"
      className="h-10 w-8 sm:w-9 rounded-lg border border-amber-200 bg-white/90 text-center text-sm font-semibold text-stone-800 shadow-sm outline-none transition hover:border-amber-400 focus:border-[#8a3324] focus:bg-amber-50/50 focus:ring-2 focus:ring-[#8a3324]/20"
    />
  ));
  if (!groupSizes) {
    return <div className="flex flex-wrap gap-1.5">{boxes}</div>;
  }
  const grouped: React.ReactNode[] = [];
  let idx = 0;
  groupSizes.forEach((size, gi) => {
    grouped.push(
      <div key={`g-${gi}`} className="flex gap-1.5">
        {boxes.slice(idx, idx + size)}
      </div>
    );
    idx += size;
    if (gi < groupSizes.length - 1) {
      grouped.push(
        <span key={`sep-${gi}`} className="mx-1 self-center text-[#8a3324] font-bold">
          /
        </span>
      );
    }
  });
  return <div className="flex flex-wrap items-center gap-1.5">{grouped}</div>;
}

function Field({ labelBn, children, className = "" }: {
  labelBn: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs sm:text-sm font-semibold text-stone-700 tracking-wide">
        {labelBn}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-amber-900/15 bg-amber-50/20 px-3.5 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#8a3324] focus:bg-white focus:ring-4 focus:ring-[#8a3324]/10 shadow-sm hover:border-amber-300 disabled:bg-stone-100 disabled:cursor-not-allowed";

const selectClass =
  "w-full rounded-xl border border-amber-900/15 bg-amber-50/20 px-3.5 py-2.5 text-sm text-stone-900 outline-none transition focus:border-[#8a3324] focus:bg-white focus:ring-4 focus:ring-[#8a3324]/10 shadow-sm hover:border-amber-300 disabled:bg-stone-100 disabled:cursor-not-allowed appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5rem] bg-[right_0.75rem_center] bg-no-repeat pr-10";

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

// নেটিভ সিলেক্ট – সব অপশন বাংলায়
function SelectInput({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`${selectClass} ${className}`}
    >
      <option value="">{placeholder || "নির্বাচন করুন..."}</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function Checkbox({ checked, onChange, labelBn }: {
  checked: boolean;
  onChange: (v: boolean) => void;
  labelBn: string;
}) {
  return (
    <label
      onClick={() => onChange(!checked)}
      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition select-none ${checked
        ? "border-[#8a3324] bg-amber-50/80 shadow-sm"
        : "border-stone-200 bg-white/50 hover:bg-stone-50"
        }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${checked
          ? "border-[#8a3324] bg-[#8a3324] text-white"
          : "border-stone-400 bg-white"
          }`}
      >
        {checked && (
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current">
            <path d="M6.2 11.2 3 8l-1.1 1.1L6.2 13.4 14 5.6 12.9 4.5z" />
          </svg>
        )}
      </span>
      <span className="text-sm font-medium text-stone-800">{labelBn}</span>
    </label>
  );
}

function RadioPill({ checked, onClick, children }: {
  checked: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition shadow-sm ${checked
        ? "border-[#8a3324] bg-[#8a3324] text-white shadow-amber-900/20"
        : "border-stone-200 bg-white text-stone-700 hover:border-amber-400 hover:bg-amber-50/50"
        }`}
    >
      {children}
    </button>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-6 mt-10 flex items-center gap-3 first:mt-0">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#8a3324]/10 text-[#8a3324]">
        <span className="h-2 w-2 rotate-45 bg-[#8a3324]" />
      </div>
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#8a3324]">
          {title}
        </h2>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-amber-200 to-transparent" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// মূল নিবন্ধন ফর্ম
// ---------------------------------------------------------------------------
export default function RegistrationForm() {
  const [form, setForm] = useState<FormState>(emptyState);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [unionList, setUnionList] = useState<string[]>([]);
  const [loadingUnions, setLoadingUnions] = useState(false);
  const [unionError, setUnionError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  // ক্যাসকেডিং ডেটা – সব লিস্ট বাংলায়
  const availableDivisions =
    form.country === "বাংলাদেশ" ? divisionList : [];

  const availableDistricts = form.division
    ? districtByDivision[form.division] || []
    : [];

  const availableThanas = form.district
    ? thanaByDistrict[form.district] || [`${form.district} সদর`]
    : [];

  // খাদেমের নামের জন্য অপশন (জেলা অনুযায়ী)
  const khademOptions = form.district && khademByDistrict[form.district]
    ? [khademByDistrict[form.district]]
    : [];

  // প্রধান সমন্বয়কারীর নামের জন্য অপশন (বিভাগ অনুযায়ী)
  const coordinatorOptions = form.division && coordinatorByDivision[form.division]
    ? [coordinatorByDivision[form.division]]
    : [];

  // ইউনিয়ন ফেচ – বাংলা নাম থেকে ইংরেজি বের করে API-তে পাঠানো
  useEffect(() => {
    setUnionList([]);
    setUnionError(null);
    set("union", "");

    if (!form.ps || !form.district) return;

    let cancelled = false;
    setLoadingUnions(true);

    const districtEn = toEn(districtBnToEn, form.district);
    const thanaEn = toEn(thanaBnToEn, form.ps);

    loadGeoData()
      .then((geo) => {
        if (cancelled) return;
        const upazila = matchUpazila(geo, districtEn, thanaEn);
        if (!upazila) {
          setUnionError("এই থানার জন্য ইউনিয়ন তালিকা পাওয়া যায়নি। অনুগ্রহ করে নিজে টাইপ করুন।");
          return;
        }
        const unions = geo.unions
          .filter((u) => u.upazilaId === upazila.id)
          .map((u) => u.bnName || u.name);
        if (unions.length === 0) {
          setUnionError("ইউনিয়ন তালিকা পাওয়া যায়নি। অনুগ্রহ করে নিজে টাইপ করুন।");
        } else {
          setUnionList(unions);
        }
      })
      .catch(() => {
        if (!cancelled) setUnionError("ইউনিয়ন লোড করতে সমস্যা হয়েছে। নিজে টাইপ করুন।");
      })
      .finally(() => {
        if (!cancelled) setLoadingUnions(false);
      });

    return () => {
      cancelled = true;
    };
  }, [form.ps, form.district]);

  // জেলা পরিবর্তনে খাদেম রিসেট
  useEffect(() => {
    set("khademName", "");
  }, [form.district]);

  // বিভাগ পরিবর্তনে সমন্বয়কারী রিসেট
  useEffect(() => {
    set("coordinatorName", "");
  }, [form.division]);

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setSubmitError(null);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });

      const photoInput = document.getElementById(
        "photo"
      ) as HTMLInputElement | null;

      const photo = photoInput?.files?.[0];

      if (photo) {
        formData.append("photo", photo);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/devotees`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "নিবন্ধন সংরক্ষণ করা যায়নি।"
        );
      }

      console.log("Saved:", data);

      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } catch (error) {
      console.error(error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "নিবন্ধন সংরক্ষণ করতে সমস্যা হয়েছে।"
      );

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-8 sm:py-12 px-3 sm:px-6 font-sans antialiased">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-amber-900/10 bg-white shadow-2xl shadow-stone-300">
        {/* হেডার (আগের মতোই) */}
        <header className="relative border-b border-amber-200/60 bg-gradient-to-br from-[#f9f3e6] via-[#f3e6c8] to-[#ebd2ab] p-6 sm:p-10 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(#8a3324_1px,transparent_1px)] [background-size:16px_16px] opacity-5" />
          <div className="relative z-10">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/80 p-2 shadow-md ring-4 ring-[#8a3324]/20 backdrop-blur">
              <svg viewBox="0 0 24 24" className="h-10 w-10 fill-[#8a3324]">
                <path d="M12 0l1.9 7.1L21 4l-3.1 7.1L26 12l-8.1 0.9L21 20l-7.1-3.1L12 24l-1.9-7.1L3 20l3.1-7.1L-2 12l8.1-0.9L3 4l7.1 3.1z" />
              </svg>
            </div>
            <p className="mx-auto mb-3 max-w-2xl text-xs sm:text-sm font-medium leading-relaxed text-stone-700 italic">
              "যারা নিজেদের সম্পদ আল্লাহর পথে ব্যয় করে, অতঃপর ব্যয় করার পর কোনো কথা বা কষ্ট
              দ্বারা তাদের অনুগ্রহ প্রকাশ করে না, তাদের প্রতিদান তাদের প্রতিপালকের নিকট
              রয়েছে।" <br /><span className="font-semibold text-[#8a3324]">— সূরা বাকারা, আয়াত: ২৬২</span>
            </p>
            <h1 className="font-serif text-2xl font-black text-stone-900 sm:text-4xl tracking-tight">
              খাজা মোজাম্মেল হক (রঃ) ফাউন্ডেশন
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 font-medium">
              ৩৭ শ্যামলীবাগ, শ্যামলী, ঢাকা-১২০৭, বাংলাদেশ
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#8a3324] px-5 py-1.5 text-xs sm:text-sm font-semibold text-amber-50 shadow-md">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              ভক্তবৃন্দের তথ্য নিবন্ধন
            </div>
          </div>
        </header>

        {submitted && (
          <div className="mx-8 mt-6 rounded-2xl border border-emerald-300 bg-emerald-50/90 p-4 text-center text-sm font-medium text-emerald-900 shadow-sm">
            ✓ ফর্ম সফলভাবে সংরক্ষিত হয়েছে!
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-2">
          {/* নিবন্ধন তথ্য */}
          <SectionTitle title="নিবন্ধন তথ্য" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field labelBn="উদ্দেশ্য">
              <TextInput
                value={form.purpose}
                onChange={(e) => set("purpose", e.target.value)}
                placeholder="যেমন: সেবা / সদস্যপদ"
              />
            </Field>
            <Field labelBn="পদবী">
              <TextInput
                value={form.designation}
                onChange={(e) => set("designation", e.target.value)}
                placeholder="পদবী লিখুন"
              />
            </Field>
          </div>

          {/* ব্যক্তিগত তথ্য */}
          <SectionTitle title="ব্যক্তিগত তথ্য" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 items-start">
            <div className="order-2 grid grid-cols-1 gap-5 sm:order-1 sm:col-span-2">
              <Field labelBn="নাম">
                <TextInput
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="পূর্ণ নাম"
                />
              </Field>
              <Field labelBn="পিতার নাম">
                <TextInput
                  value={form.fatherName}
                  onChange={(e) => set("fatherName", e.target.value)}
                  placeholder="পিতার নাম"
                />
              </Field>
              <Field labelBn="স্বামী/স্ত্রীর নাম">
                <TextInput
                  value={form.spouseName}
                  onChange={(e) => set("spouseName", e.target.value)}
                  placeholder="স্বামী/স্ত্রীর নাম"
                />
              </Field>
            </div>
            <div className="order-1 flex flex-col items-center gap-2 sm:order-2">
              <label
                htmlFor="photo"
                className="group relative flex h-44 w-36 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-amber-800/30 bg-amber-50/20 text-center transition hover:border-[#8a3324] hover:bg-amber-50/50 shadow-inner overflow-hidden"
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Applicant" className="h-full w-full object-cover" />
                ) : (
                  <div className="p-3 text-stone-500 group-hover:text-[#8a3324] transition">
                    <svg className="mx-auto h-8 w-8 mb-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h0.93a2 2 0 011.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="block font-semibold text-xs">ছবি</span>
                    <span className="block text-[10px] text-stone-400">পাসপোর্ট সাইজ</span>
                    <span className="block text-[11px] font-medium mt-1">আপলোড করুন</span>
                  </div>
                )}
              </label>
              <input id="photo" type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
            </div>
          </div>

          {/* স্থায়ী ঠিকানা */}
          <SectionTitle title="স্থায়ী ঠিকানা" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* দেশ */}
            <Field labelBn="দেশ">
              <SelectInput
                value={form.country}
                onChange={(v) => {
                  set("country", v);
                  set("division", "");
                  set("district", "");
                  set("ps", "");
                  set("union", "");
                  set("po", "");
                }}
                options={countryList}
                placeholder="দেশ নির্বাচন করুন..."
              />
            </Field>

            {/* বিভাগ */}
            <Field labelBn="বিভাগ">
              <SelectInput
                value={form.division}
                disabled={!availableDivisions.length}
                onChange={(v) => {
                  set("division", v);
                  set("district", "");
                  set("ps", "");
                  set("union", "");
                  set("po", "");
                }}
                options={availableDivisions}
                placeholder={form.country ? "বিভাগ নির্বাচন করুন..." : "প্রথমে দেশ নির্বাচন করুন"}
              />
            </Field>

            {/* জেলা */}
            <Field labelBn="জেলা">
              <SelectInput
                value={form.district}
                disabled={!availableDistricts.length}
                onChange={(v) => {
                  set("district", v);
                  set("ps", "");
                  set("union", "");
                  set("po", "");
                }}
                options={availableDistricts}
                placeholder={form.division ? "জেলা নির্বাচন করুন..." : "প্রথমে বিভাগ নির্বাচন করুন"}
              />
            </Field>

            {/* থানা */}
            <Field labelBn="থানা">
              <SelectInput
                value={form.ps}
                disabled={!form.district}
                onChange={(v) => {
                  set("ps", v);
                  set("union", "");
                  set("po", "");
                }}
                options={availableThanas}
                placeholder={form.district ? "থানা নির্বাচন করুন..." : "প্রথমে জেলা নির্বাচন করুন"}
              />
            </Field>

            {/* ইউনিয়ন */}
            <Field labelBn="ইউনিয়ন">
              {loadingUnions ? (
                <div className="flex items-center gap-2 px-3.5 py-2.5 text-sm text-stone-500">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#8a3324] border-t-transparent" />
                  ইউনিয়ন লোড হচ্ছে...
                </div>
              ) : (
                <SelectInput
                  value={form.union}
                  disabled={!form.ps}
                  onChange={(v) => {
                    set("union", v);
                    set("po", "");
                  }}
                  options={unionList}
                  placeholder={
                    !form.ps
                      ? "প্রথমে থানা নির্বাচন করুন"
                      : unionError
                        ? "নিজে টাইপ করুন..."
                        : "ইউনিয়ন নির্বাচন করুন..."
                  }
                />
              )}
              {unionError && !loadingUnions && (
                <p className="text-xs text-amber-600 mt-1">{unionError}</p>
              )}
            </Field>

            {/* পোস্ট অফিস (টেক্সট ইনপুট) */}
            <Field labelBn="পোস্ট অফিস">
              <TextInput
                value={form.po}
                onChange={(e) => set("po", e.target.value)}
                placeholder="পোস্ট অফিসের নাম লিখুন"
              />
            </Field>

            {/* পোস্ট কোড */}
            <Field labelBn="পোস্ট কোড">
              <TextInput
                value={form.postCode}
                onChange={(e) => set("postCode", e.target.value)}
                placeholder="পোস্ট কোড (যেমন: ১২০৭)"
              />
            </Field>

            <Field labelBn="গ্রাম/হোল্ডিং/মহল্লা" className="sm:col-span-2">
              <TextInput
                value={form.village}
                onChange={(e) => set("village", e.target.value)}
                placeholder="গ্রাম/হোল্ডিং/মহল্লা"
              />
            </Field>

            <Field labelBn="রাস্তা" className="sm:col-span-2">
              <TextInput
                value={form.street}
                onChange={(e) => set("street", e.target.value)}
                placeholder="রাস্তার নাম বা নম্বর"
              />
            </Field>

            <Field labelBn="জন্ম তারিখ" className="sm:col-span-2">
              <BoxInput
                values={form.dob}
                onChange={(v) => set("dob", v)}
                count={8}
                groupSizes={[2, 2, 4]}
              />
            </Field>
          </div>

          {/* খাদেম ও প্রধান সমন্বয়কারীর তথ্য – এখন ড্রপডাউন */}
          <SectionTitle title="খাদেম ও প্রধান সমন্বয়কারীর তথ্য" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 bg-amber-50/40 p-5 rounded-2xl border border-amber-900/10">
            <Field labelBn="খাদেমের নাম (জেলা অনুযায়ী)">
              <SelectInput
                value={form.khademName}
                disabled={!form.district}
                onChange={(v) => set("khademName", v)}
                options={khademOptions}
                placeholder={form.district ? "খাদেম নির্বাচন করুন..." : "প্রথমে জেলা নির্বাচন করুন"}
              />
            </Field>
            <Field labelBn="প্রধান সমন্বয়কারীর নাম (বিভাগ অনুযায়ী)">
              <SelectInput
                value={form.coordinatorName}
                disabled={!form.division}
                onChange={(v) => set("coordinatorName", v)}
                options={coordinatorOptions}
                placeholder={form.division ? "সমন্বয়কারী নির্বাচন করুন..." : "প্রথমে বিভাগ নির্বাচন করুন"}
              />
            </Field>
          </div>

          {/* অন্যান্য তথ্য */}
          <SectionTitle title="অন্যান্য তথ্য" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Field labelBn="ধর্ম">
              <TextInput
                value={form.religion}
                onChange={(e) => set("religion", e.target.value)}
                placeholder="যেমন: ইসলাম"
              />
            </Field>
            <Field labelBn="রক্তের গ্রুপ">
              <TextInput
                value={form.bloodGroup}
                onChange={(e) => set("bloodGroup", e.target.value)}
                placeholder="যেমন: B+"
              />
            </Field>
            <Field labelBn="পেশা">
              <TextInput
                value={form.profession}
                onChange={(e) => set("profession", e.target.value)}
                placeholder="পেশা লিখুন"
              />
            </Field>
            <Field labelBn="জাতীয়তা">
              <TextInput
                value={form.nationality}
                onChange={(e) => set("nationality", e.target.value)}
                placeholder="জাতীয়তা"
              />
            </Field>
            <Field labelBn="ই-মেইল">
              <TextInput
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="example@mail.com"
              />
            </Field>
            <Field labelBn="যোগাযোগের নম্বর">
              <TextInput
                type="tel"
                value={form.contactNo}
                onChange={(e) => set("contactNo", e.target.value)}
                placeholder="০১৭xxxxxxxx"
              />
            </Field>
          </div>

          {/* পরিচয়পত্র */}
          <SectionTitle title="পরিচয়পত্র" />
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2.5">
              {(["NID", "BRN", "PPN"] as const).map((t) => (
                <RadioPill
                  key={t}
                  checked={form.idType === t}
                  onClick={() => set("idType", t)}
                >
                  {t === "NID" && "জাতীয় পরিচয় পত্র (NID)"}
                  {t === "BRN" && "জন্ম নিবন্ধন (BRN)"}
                  {t === "PPN" && "পাসপোর্ট নং (PPN)"}
                </RadioPill>
              ))}
            </div>
            {form.idType && (
              <div className="pt-2">
                <BoxInput
                  values={form.idNumber}
                  onChange={(v) => set("idNumber", v)}
                  count={17}
                />
              </div>
            )}
          </div>

          {/* ব্যক্তিগত অবস্থা */}
          <SectionTitle title="ব্যক্তিগত অবস্থা" />
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2.5">
              <RadioPill
                checked={form.gender === "male"}
                onClick={() => set("gender", "male")}
              >
                পুরুষ
              </RadioPill>
              <RadioPill
                checked={form.gender === "female"}
                onClick={() => set("gender", "female")}
              >
                মহিলা
              </RadioPill>
              <RadioPill
                checked={form.maritalStatus === "married"}
                onClick={() => set("maritalStatus", "married")}
              >
                বিবাহিত
              </RadioPill>
              <RadioPill
                checked={form.maritalStatus === "unmarried"}
                onClick={() => set("maritalStatus", "unmarried")}
              >
                অবিবাহিত
              </RadioPill>
            </div>
            <div className="grid grid-cols-2 gap-5 sm:max-w-md">
              <Field labelBn="পুত্র">
                <TextInput
                  type="number"
                  min={0}
                  value={form.sonCount}
                  onChange={(e) => set("sonCount", e.target.value)}
                  placeholder="সংখ্যা"
                />
              </Field>
              <Field labelBn="কন্যা">
                <TextInput
                  type="number"
                  min={0}
                  value={form.daughterCount}
                  onChange={(e) => set("daughterCount", e.target.value)}
                  placeholder="সংখ্যা"
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <Checkbox
                checked={form.widow}
                onChange={(v) => set("widow", v)}
                labelBn="বিধবা"
              />
              <Checkbox
                checked={form.widower}
                onChange={(v) => set("widower", v)}
                labelBn="বিপত্নীক"
              />
              <Checkbox
                checked={form.divorced}
                onChange={(v) => set("divorced", v)}
                labelBn="তালাকপ্রাপ্ত"
              />
              <Checkbox
                checked={form.passedAway}
                onChange={(v) => set("passedAway", v)}
                labelBn="ইন্তেকাল প্রাপ্ত"
              />
              <Checkbox
                checked={form.securityVolunteer}
                onChange={(v) => set("securityVolunteer", v)}
                labelBn="নিরাপত্তা কর্মী"
              />
            </div>
          </div>

          {/* শিক্ষাগত যোগ্যতা */}
          <SectionTitle title="শিক্ষাগত যোগ্যতা" />
          <div className="flex flex-wrap gap-2.5">
            {(
              [
                ["underSSC", "এসএসসি-র নিচে"],
                ["SSC", "এসএসসি"],
                ["HSC", "এইচএসসি"],
                ["bachelors", "ব্যাচেলর"],
                ["masters", "মাস্টার্স"],
                ["doctorate", "ডক্টরেট"],
              ] as const
            ).map(([val, label]) => (
              <RadioPill
                key={val}
                checked={form.education === val}
                onClick={() => set("education", val)}
              >
                {label}
              </RadioPill>
            ))}
          </div>

          {/* নেসবত */}
          <SectionTitle title="নেসবত" />
          <div className="space-y-3">
            <Checkbox
              checked={form.followerMozammel}
              onChange={(v) => set("followerMozammel", v)}
              labelBn="খাজা মোজাম্মেল হক (রঃ) এর মুরিদ"
            />
            <Checkbox
              checked={form.followerYunus}
              onChange={(v) => set("followerYunus", v)}
              labelBn="খাজা ইউনুস আলী (রঃ) এর নেসবত ভুক্ত"
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Checkbox
                checked={form.otherNesbot}
                onChange={(v) => set("otherNesbot", v)}
                labelBn="অন্য নেসবত"
              />
              {form.otherNesbot && (
                <TextInput
                  value={form.otherNesbotDetail}
                  onChange={(e) => set("otherNesbotDetail", e.target.value)}
                  placeholder="বিস্তারিত লিখুন..."
                  className="sm:max-w-xs"
                />
              )}
            </div>
            <div className="pt-2 sm:max-w-xs">
              <Field labelBn="বায়াত গ্রহণের তারিখ/সাল">
                <TextInput
                  value={form.joiningDate}
                  onChange={(e) => set("joiningDate", e.target.value)}
                  placeholder="DD/MM/YYYY"
                />
              </Field>
            </div>
          </div>

          {/* ছাদকায়ে জারিয়া */}
          <SectionTitle title="ছাদকায়ে জারিয়া" />
          <div className="rounded-2xl border border-amber-900/15 bg-gradient-to-r from-amber-50/80 to-orange-50/50 p-5 sm:p-6 shadow-sm space-y-3">
            <Checkbox
              checked={form.joinSadka}
              onChange={(v) => set("joinSadka", v)}
              labelBn="ছাদকায়ে জারিয়ায় অন্তর্ভুক্তির জন্য"
            />
            <p className="text-xs sm:text-sm text-[#8a3324] font-medium leading-relaxed pl-1">
              আমি খাজা মোজাম্মেল হক (রঃ) ফাউন্ডেশনে স্বইচ্ছায় এবারতের নিয়তে খাদেম/সহযোগী
              খাদেমের নিকট ছাদকায়ে জারিয়া নিয়মিত প্রদান করবো, এই মর্মে অন্তর্ভুক্ত হইলাম।
            </p>
          </div>

          {/* সাবমিট */}
          <div className="pt-8 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto rounded-xl bg-[#8a3324] px-10 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-900/20 hover:bg-[#722a1d] hover:shadow-xl transition focus:outline-none focus:ring-4 focus:ring-[#8a3324]/30"
            >
              নিবন্ধন জমা দিন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}