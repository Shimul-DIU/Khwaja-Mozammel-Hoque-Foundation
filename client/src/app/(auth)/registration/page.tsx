"use client";

import { useRouter } from "next/navigation";
import {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  type ReactNode,
  type KeyboardEvent,
  type FormEvent,
  type InputHTMLAttributes,
} from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCamera,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

import {
  ClipboardList,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  IdCard,
  MapPin,
  UserRound,
  UsersRound,
} from "lucide-react";

import {
  countryList,
  divisionList,
  districtByDivision,
  thanaByDistrict,
  districtBnToEn,
  thanaBnToEn,
  khademByDistrict,
  coordinatorByDivision,
} from "@/lib/constants/locationData";

import axiosInstance from "@/lib/axios";

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
// Utility
// ---------------------------------------------------------------------------

function toEn(
  reverseMap: Record<string, string>,
  bn: string
): string {
  return reverseMap[bn] ?? bn;
}

// ---------------------------------------------------------------------------
// Bangladesh Geo Data
// ---------------------------------------------------------------------------

const GEO_BASE =
  "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master";

type DistrictRow = {
  id: number;
  name: string;
  bnName: string;
};

type UpazilaRow = {
  id: number;
  districtId: number;
  name: string;
  bnName: string;
};

type UnionRow = {
  id: number;
  upazilaId: number;
  name: string;
  bnName: string;
};

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
    .map((line) => line.trim())
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
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  let prev = Array.from(
    { length: b.length + 1 },
    (_, i) => i
  );

  for (let i = 1; i <= a.length; i++) {
    const cur = [i];

    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;

      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + cost
      );
    }

    prev = cur;
  }

  return prev[b.length];
}

let geoDataPromise: Promise<GeoData> | null = null;

function loadGeoData(): Promise<GeoData> {
  if (!geoDataPromise) {
    geoDataPromise = Promise.all([
      fetch(`${GEO_BASE}/districts/districts.csv`).then((r) =>
        r.text()
      ),
      fetch(`${GEO_BASE}/upazilas/upazilas.csv`).then((r) =>
        r.text()
      ),
      fetch(`${GEO_BASE}/unions/unions.csv`).then((r) =>
        r.text()
      ),
    ]).then(([districtsCsv, upazilasCsv, unionsCsv]) => {
      const districts: DistrictRow[] = parseCsv(districtsCsv).map(
        (r) => ({
          id: Number(r[0]),
          name: r[2],
          bnName: r[3],
        })
      );

      const upazilas: UpazilaRow[] = parseCsv(upazilasCsv).map(
        (r) => ({
          id: Number(r[0]),
          districtId: Number(r[1]),
          name: r[2],
          bnName: r[3],
        })
      );

      const unions: UnionRow[] = parseCsv(unionsCsv).map((r) => ({
        id: Number(r[0]),
        upazilaId: Number(r[1]),
        name: r[2],
        bnName: r[3],
      }));

      return {
        districts,
        upazilas,
        unions,
      };
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

  const candidates = geo.upazilas.filter(
    (u) => u.districtId === district.id
  );

  if (candidates.length === 0) return null;

  const targetThanaNorm = normalizeName(thanaName);

  const exact = candidates.find(
    (u) => normalizeName(u.name) === targetThanaNorm
  );

  if (exact) return exact;

  let best: UpazilaRow | null = null;
  let bestDistance = Infinity;

  for (const u of candidates) {
    const d = levenshtein(
      targetThanaNorm,
      normalizeName(u.name)
    );

    if (d < bestDistance) {
      bestDistance = d;
      best = u;
    }
  }

  return bestDistance <= 3 ? best : null;
}

// ---------------------------------------------------------------------------
// Box Input
// ---------------------------------------------------------------------------

function BoxInput({
  values,
  onChange,
  count,
  groupSizes,
}: {
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

    if (char && i < count - 1) {
      refs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (
    i: number,
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !values[i] &&
      i > 0
    ) {
      refs.current[i - 1]?.focus();
    }
  };

  const boxes = Array.from(
    { length: count },
    (_, i) => (
      <input
        key={i}
        ref={(el) => {
          refs.current[i] = el;
        }}
        value={values[i] ?? ""}
        onChange={(e) =>
          handleChange(i, e.target.value)
        }
        onKeyDown={(e) =>
          handleKeyDown(i, e)
        }
        maxLength={1}
        inputMode="text"
        className="h-11 w-9 rounded-xl border border-stone-200 bg-white text-center text-sm font-bold text-stone-800 shadow-sm outline-none transition hover:border-[#0d3b2e]/40 focus:border-[#0d3b2e] focus:bg-[#fffcf5] focus:ring-4 focus:ring-[#d8b766]/15 sm:w-10"
      />
    )
  );

  if (!groupSizes) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {boxes}
      </div>
    );
  }

  const grouped: ReactNode[] = [];

  let idx = 0;

  groupSizes.forEach((size, gi) => {
    grouped.push(
      <div
        key={`g-${gi}`}
        className="flex gap-1.5"
      >
        {boxes.slice(idx, idx + size)}
      </div>
    );

    idx += size;

    if (gi < groupSizes.length - 1) {
      grouped.push(
        <span
          key={`sep-${gi}`}
          className="mx-1 self-center font-bold text-[#0d3b2e]"
        >
          /
        </span>
      );
    }
  });

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {grouped}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Field
// ---------------------------------------------------------------------------

function Field({
  labelBn,
  children,
  className = "",
}: {
  labelBn: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label
      className={`flex flex-col gap-1.5 ${className}`}
    >
      <span className="text-xs font-semibold tracking-wide text-stone-700 sm:text-sm">
        {labelBn}
      </span>

      {children}
    </label>
  );
}

// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------

const inputClass =
  "w-full rounded-xl border border-amber-900/15 bg-amber-50/20 px-3.5 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#0d3b2e] focus:bg-white focus:ring-4 focus:ring-[#d8b766]/15 shadow-sm hover:border-[#0d3b2e]/30 disabled:bg-stone-100 disabled:cursor-not-allowed";

function TextInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className={`${inputClass} ${props.className ?? ""
        }`}
    />
  );
}

// ---------------------------------------------------------------------------
// Select
// ---------------------------------------------------------------------------

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
      onChange={(e) =>
        onChange(e.target.value)
      }
      disabled={disabled}
      className={`min-h-11 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2.5 text-sm text-stone-900 shadow-sm outline-none transition hover:border-[#0d3b2e]/30 focus:border-[#0d3b2e] focus:bg-white focus:ring-4 focus:ring-[#d8b766]/15 disabled:cursor-not-allowed disabled:bg-stone-100 ${className}`}
    >
      <option value="">
        {placeholder || "নির্বাচন করুন..."}
      </option>

      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

// ---------------------------------------------------------------------------
// Checkbox
// ---------------------------------------------------------------------------

function Checkbox({
  checked,
  onChange,
  labelBn,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  labelBn: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex w-full cursor-pointer select-none items-center gap-3 rounded-xl border p-3.5 text-left transition ${checked
        ? "border-[#0d3b2e] bg-[#edf6f1] shadow-sm"
        : "border-stone-200 bg-white/50 hover:bg-stone-50"
        }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${checked
          ? "border-[#0d3b2e] bg-[#0d3b2e] text-white"
          : "border-stone-400 bg-white"
          }`}
      >
        {checked && (
          <FontAwesomeIcon
            icon={faCheck}
            className="text-[11px]"
          />
        )}
      </span>

      <span className="text-sm font-medium text-stone-800">
        {labelBn}
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Radio
// ---------------------------------------------------------------------------

function RadioPill({
  checked,
  onClick,
  children,
}: {
  checked: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-2.5 text-xs font-semibold shadow-sm transition sm:text-sm ${checked
        ? "border-[#0d3b2e] bg-[#0d3b2e] text-white shadow-[#0d3b2e]/20"
        : "border-stone-200 bg-white text-stone-700 hover:border-[#d8b766] hover:bg-amber-50/50"
        }`}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Section Title
// ---------------------------------------------------------------------------

function SectionTitle({
  title,
  icon: Icon,
}: {
  title: string;
  icon: React.ElementType;
}) {
  return (
    <div className="mb-6 mt-10 flex items-center gap-3 first:mt-0">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0d3b2e]/10 text-[#0d3b2e]">
        <Icon size={16} strokeWidth={2.2} />
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#0d3b2e]">
          {title}
        </h2>
      </div>

      <div className="h-px flex-1 bg-gradient-to-r from-[#d8b766]/50 to-transparent" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Registration Form
// ---------------------------------------------------------------------------

export default function RegistrationForm() {
  const router = useRouter();
  const [form, setForm] =
    useState<FormState>(emptyState);

  const [photoPreview, setPhotoPreview] =
    useState<string | null>(null);

  const [submitting, setSubmitting] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [submitError, setSubmitError] =
    useState<string | null>(null);

  const [unionList, setUnionList] =
    useState<string[]>([]);

  const [loadingUnions, setLoadingUnions] =
    useState(false);

  const [unionError, setUnionError] =
    useState<string | null>(null);

  const set = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((f) => ({
      ...f,
      [key]: value,
    }));
  };

  // -------------------------------------------------------------------------
  // Location
  // -------------------------------------------------------------------------

  const availableDivisions =
    form.country === "বাংলাদেশ"
      ? divisionList
      : [];

  const availableDistricts = form.division
    ? districtByDivision[form.division] || []
    : [];

  const availableThanas = form.district
    ? thanaByDistrict[form.district] || [
      `${form.district} সদর`,
    ]
    : [];

  const khademOptions =
    form.district &&
      khademByDistrict[form.district]
      ? [khademByDistrict[form.district]]
      : [];

  const coordinatorOptions =
    form.division &&
      coordinatorByDivision[form.division]
      ? [
        coordinatorByDivision[
        form.division
        ],
      ]
      : [];

  // -------------------------------------------------------------------------
  // Union fetching
  // -------------------------------------------------------------------------

  useEffect(() => {
    setUnionList([]);
    setUnionError(null);
    set("union", "");

    if (!form.ps || !form.district) return;

    let cancelled = false;

    setLoadingUnions(true);

    const districtEn = toEn(
      districtBnToEn,
      form.district
    );

    const thanaEn = toEn(
      thanaBnToEn,
      form.ps
    );

    loadGeoData()
      .then((geo) => {
        if (cancelled) return;

        const upazila = matchUpazila(
          geo,
          districtEn,
          thanaEn
        );

        if (!upazila) {
          setUnionError(
            "এই থানার জন্য ইউনিয়ন তালিকা পাওয়া যায়নি। অনুগ্রহ করে নিজে টাইপ করুন।"
          );
          return;
        }

        const unions = geo.unions
          .filter(
            (u) =>
              u.upazilaId === upazila.id
          )
          .map(
            (u) =>
              u.bnName || u.name
          );

        if (unions.length === 0) {
          setUnionError(
            "ইউনিয়ন তালিকা পাওয়া যায়নি। অনুগ্রহ করে নিজে টাইপ করুন।"
          );
        } else {
          setUnionList(unions);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUnionError(
            "ইউনিয়ন লোড করতে সমস্যা হয়েছে। নিজে টাইপ করুন।"
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingUnions(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [form.ps, form.district]);

  // -------------------------------------------------------------------------
  // Reset dependent values
  // -------------------------------------------------------------------------

  useEffect(() => {
    set("khademName", "");
  }, [form.district]);

  useEffect(() => {
    set("coordinatorName", "");
  }, [form.division]);

  // -------------------------------------------------------------------------
  // Photo
  // -------------------------------------------------------------------------

  const handlePhoto = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () =>
      setPhotoPreview(
        reader.result as string
      );

    reader.readAsDataURL(file);
  };

  // -------------------------------------------------------------------------
  // Submit
  // -------------------------------------------------------------------------

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
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

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error(
          "NEXT_PUBLIC_API_URL সেট করা নেই।"
        );
      }

      const response = await axiosInstance.post(
        `${apiUrl}/api/devotees`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.success) {
        console.log("Saved data:", response.data.data);

        setSubmitted(true);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        router.push("/dashboard");
      } else {
        setSubmitError(
          "নিবন্ধন সংরক্ষণ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
        );
      }
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        setSubmitError(
          error.response?.data?.message ||
          "নিবন্ধন সংরক্ষণ করতে সমস্যা হয়েছে।"
        );
      } else {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "নিবন্ধন সংরক্ষণ করতে সমস্যা হয়েছে।"
        );
      }
    } finally {
      setSubmitting(false);
    }
  };
  // -------------------------------------------------------------------------
  // Progress
  // -------------------------------------------------------------------------

  const progressItems = [
    ["01", "নিবন্ধন", "প্রাথমিক তথ্য"],
    ["02", "ব্যক্তিগত", "পরিচয় ও ঠিকানা"],
    ["03", "পরিবার", "শিক্ষা ও অবস্থা"],
    ["04", "নেসবত", "ছাদকায়ে জারিয়া"],
  ];

  // -------------------------------------------------------------------------
  // UI
  // -------------------------------------------------------------------------

  return (
    <main className="min-h-screen bg-[#f6f3ee] font-sans text-stone-900 antialiased">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =====================================================
            PROGRESS
        ===================================================== */}
        <div className="my-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {progressItems.map(
            ([number, title, subtitle]) => (
              <div
                key={number}
                className="group rounded-2xl border border-stone-200 bg-white/80 p-3 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md sm:p-4"
              >
                <div className="flex items-center gap-3">

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0d3b2e] text-xs font-black text-white">
                    {number}
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-stone-800 sm:text-sm">
                      {title}
                    </p>

                    <p className="truncate text-[10px] text-stone-500 sm:text-xs">
                      {subtitle}
                    </p>
                  </div>

                </div>
              </div>
            )
          )}
        </div>

        {/* =====================================================
            STATUS
        ===================================================== */}
        {submitted && (
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 shadow-sm">

            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white">
              <FontAwesomeIcon icon={faCheck} />
            </span>

            <div>
              <p>নিবন্ধন সফল হয়েছে</p>
              <p className="mt-0.5 text-xs font-normal text-emerald-700">
                আপনার তথ্য সফলভাবে সংরক্ষণ করা হয়েছে।
              </p>
            </div>

          </div>
        )}

        {submitError && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800 shadow-sm">
            {submitError}
          </div>
        )}

        {/* =====================================================
            MAIN FORM
        ===================================================== */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_70px_rgba(60,45,30,0.10)]"
        >

          {/* Form header */}
          <div className="border-b border-stone-100 bg-gradient-to-r from-[#fffaf2] to-white px-5 py-5 sm:px-8 lg:px-10">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0d3b2e]">
              Registration Form
            </p>

            <h2 className="mt-1 text-xl font-black tracking-tight text-stone-900 sm:text-2xl">
              আপনার তথ্য প্রদান করুন
            </h2>

            <p className="mt-1 text-xs leading-6 text-stone-500 sm:text-sm">
              প্রয়োজনীয় তথ্যগুলো নির্ভুলভাবে পূরণ করুন।
            </p>

          </div>

          <div className="space-y-10 p-5 sm:p-8 lg:p-10">

            {/* =================================================
                REGISTRATION
            ================================================= */}
            <section>
              <SectionTitle
                title="নিবন্ধন তথ্য"
                icon={ClipboardList}
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <Field labelBn="উদ্দেশ্য">
                  <TextInput
                    value={form.purpose}
                    onChange={(e) =>
                      set("purpose", e.target.value)
                    }
                    placeholder="যেমন: সেবা / সদস্যপদ"
                  />
                </Field>

                <Field labelBn="পদবী">
                  <TextInput
                    value={form.designation}
                    onChange={(e) =>
                      set("designation", e.target.value)
                    }
                    placeholder="পদবী লিখুন"
                  />
                </Field>

              </div>
            </section>

            {/* =================================================
                PERSONAL
            ================================================= */}
            <section>
              <SectionTitle
                title="ব্যক্তিগত তথ্য"
                icon={UserRound}
              />

              <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_180px]">

                <div className="grid gap-5">

                  <Field labelBn="নাম">
                    <TextInput
                      required
                      value={form.name}
                      onChange={(e) =>
                        set("name", e.target.value)
                      }
                      placeholder="পূর্ণ নাম"
                    />
                  </Field>

                  <Field labelBn="পিতার নাম">
                    <TextInput
                      value={form.fatherName}
                      onChange={(e) =>
                        set("fatherName", e.target.value)
                      }
                      placeholder="পিতার নাম"
                    />
                  </Field>

                  <Field labelBn="স্বামী/স্ত্রীর নাম">
                    <TextInput
                      value={form.spouseName}
                      onChange={(e) =>
                        set("spouseName", e.target.value)
                      }
                      placeholder="স্বামী/স্ত্রীর নাম"
                    />
                  </Field>

                </div>

                {/* Photo */}
                <div className="flex flex-col items-center gap-3">

                  <label
                    htmlFor="photo"
                    className="group relative flex h-52 w-40 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#0d3b2e]/30 bg-[#fffaf2] shadow-inner transition hover:border-[#0d3b2e] hover:bg-amber-50"
                  >

                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Applicant"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-stone-500 transition group-hover:text-[#0d3b2e]">

                        <FontAwesomeIcon
                          icon={faCamera}
                          className="mb-3 text-3xl"
                        />

                        <span className="block text-xs font-bold">
                          ছবি আপলোড
                        </span>

                        <span className="mt-1 block text-[10px] text-stone-400">
                          পাসপোর্ট সাইজ
                        </span>

                      </div>
                    )}

                    <div className="absolute inset-x-2 bottom-2 rounded-xl bg-black/55 px-2 py-1.5 text-center text-[10px] font-semibold text-white opacity-0 transition group-hover:opacity-100">
                      ছবি পরিবর্তন করুন
                    </div>

                  </label>

                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    className="hidden"
                  />

                </div>
              </div>
            </section>

            {/* =================================================
                ADDRESS
            ================================================= */}
            <section>
              <SectionTitle
                title="স্থায়ী ঠিকানা"
                icon={MapPin}
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

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
                    placeholder={
                      form.country
                        ? "বিভাগ নির্বাচন করুন..."
                        : "প্রথমে দেশ নির্বাচন করুন"
                    }
                  />
                </Field>

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
                    placeholder={
                      form.division
                        ? "জেলা নির্বাচন করুন..."
                        : "প্রথমে বিভাগ নির্বাচন করুন"
                    }
                  />
                </Field>

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
                    placeholder={
                      form.district
                        ? "থানা নির্বাচন করুন..."
                        : "প্রথমে জেলা নির্বাচন করুন"
                    }
                  />
                </Field>

                <Field labelBn="ইউনিয়ন">
                  {loadingUnions ? (
                    <div className="flex h-11 items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3.5 text-sm text-stone-500">

                      <FontAwesomeIcon
                        icon={faCircleNotch}
                        spin
                        className="text-[#0d3b2e]"
                      />

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
                    <p className="mt-1.5 text-xs text-amber-700">
                      {unionError}
                    </p>
                  )}
                </Field>

                <Field labelBn="পোস্ট অফিস">
                  <TextInput
                    value={form.po}
                    onChange={(e) =>
                      set("po", e.target.value)
                    }
                    placeholder="পোস্ট অফিসের নাম লিখুন"
                  />
                </Field>

                <Field labelBn="পোস্ট কোড">
                  <TextInput
                    value={form.postCode}
                    onChange={(e) =>
                      set("postCode", e.target.value)
                    }
                    placeholder="পোস্ট কোড (যেমন: ১২০৭)"
                  />
                </Field>

                <Field
                  labelBn="গ্রাম/হোল্ডিং/মহল্লা"
                  className="sm:col-span-2"
                >
                  <TextInput
                    value={form.village}
                    onChange={(e) =>
                      set("village", e.target.value)
                    }
                    placeholder="গ্রাম/হোল্ডিং/মহল্লা"
                  />
                </Field>

                <Field
                  labelBn="রাস্তা"
                  className="sm:col-span-2"
                >
                  <TextInput
                    value={form.street}
                    onChange={(e) =>
                      set("street", e.target.value)
                    }
                    placeholder="রাস্তার নাম বা নম্বর"
                  />
                </Field>

                <Field
                  labelBn="জন্ম তারিখ"
                  className="sm:col-span-2"
                >
                  <BoxInput
                    values={form.dob}
                    onChange={(v) => set("dob", v)}
                    count={8}
                    groupSizes={[2, 2, 4]}
                  />
                </Field>

              </div>
            </section>

            {/* =================================================
                KHADEM
            ================================================= */}
            <section>
              <SectionTitle
                title="খাদেম ও প্রধান সমন্বয়কারীর তথ্য"
                icon={UsersRound}
              />

              <div className="grid grid-cols-1 gap-5 rounded-2xl border border-[#0d3b2e]/10 bg-[#f3f8f5] p-5 sm:grid-cols-2 sm:p-6">

                <Field labelBn="খাদেমের নাম (জেলা অনুযায়ী)">
                  <SelectInput
                    value={form.khademName}
                    disabled={!form.district}
                    onChange={(v) =>
                      set("khademName", v)
                    }
                    options={khademOptions}
                    placeholder={
                      form.district
                        ? "খাদেম নির্বাচন করুন..."
                        : "প্রথমে জেলা নির্বাচন করুন"
                    }
                  />
                </Field>

                <Field labelBn="প্রধান সমন্বয়কারীর নাম (বিভাগ অনুযায়ী)">
                  <SelectInput
                    value={form.coordinatorName}
                    disabled={!form.division}
                    onChange={(v) =>
                      set("coordinatorName", v)
                    }
                    options={coordinatorOptions}
                    placeholder={
                      form.division
                        ? "সমন্বয়কারী নির্বাচন করুন..."
                        : "প্রথমে বিভাগ নির্বাচন করুন"
                    }
                  />
                </Field>

              </div>
            </section>

            {/* =================================================
                OTHER
            ================================================= */}
            <section>
              <SectionTitle
                title="অন্যান্য তথ্য"
                icon={ClipboardList}
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                <Field labelBn="ধর্ম">
                  <TextInput
                    value={form.religion}
                    onChange={(e) =>
                      set("religion", e.target.value)
                    }
                    placeholder="যেমন: ইসলাম"
                  />
                </Field>

                <Field labelBn="রক্তের গ্রুপ">
                  <TextInput
                    value={form.bloodGroup}
                    onChange={(e) =>
                      set("bloodGroup", e.target.value)
                    }
                    placeholder="যেমন: B+"
                  />
                </Field>

                <Field labelBn="পেশা">
                  <TextInput
                    value={form.profession}
                    onChange={(e) =>
                      set("profession", e.target.value)
                    }
                    placeholder="পেশা লিখুন"
                  />
                </Field>

                <Field labelBn="জাতীয়তা">
                  <TextInput
                    value={form.nationality}
                    onChange={(e) =>
                      set("nationality", e.target.value)
                    }
                    placeholder="জাতীয়তা"
                  />
                </Field>

                <Field labelBn="ই-মেইল">
                  <TextInput
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      set("email", e.target.value)
                    }
                    placeholder="example@mail.com"
                  />
                </Field>

                <Field labelBn="যোগাযোগের নম্বর">
                  <TextInput
                    type="tel"
                    value={form.contactNo}
                    onChange={(e) =>
                      set("contactNo", e.target.value)
                    }
                    placeholder="০১৭xxxxxxxx"
                  />
                </Field>

              </div>
            </section>

            {/* =================================================
                ID
            ================================================= */}
            <section>
              <SectionTitle
                title="পরিচয়পত্র"
                icon={IdCard}
              />

              <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-4 sm:p-5">

                <div className="flex flex-wrap gap-2.5">

                  {(
                    ["NID", "BRN", "PPN"] as const
                  ).map((t) => (
                    <RadioPill
                      key={t}
                      checked={form.idType === t}
                      onClick={() =>
                        set("idType", t)
                      }
                    >
                      {t === "NID" &&
                        "জাতীয় পরিচয় পত্র (NID)"}

                      {t === "BRN" &&
                        "জন্ম নিবন্ধন (BRN)"}

                      {t === "PPN" &&
                        "পাসপোর্ট নং (PPN)"}
                    </RadioPill>
                  ))}

                </div>

                {form.idType && (
                  <div className="mt-5">
                    <BoxInput
                      values={form.idNumber}
                      onChange={(v) =>
                        set("idNumber", v)
                      }
                      count={17}
                    />
                  </div>
                )}

              </div>
            </section>

            {/* =================================================
                STATUS
            ================================================= */}
            <section>
              <SectionTitle
                title="ব্যক্তিগত অবস্থা"
                icon={UserRound}
              />

              <div className="space-y-5">

                <div className="flex flex-wrap gap-2.5">

                  <RadioPill
                    checked={form.gender === "male"}
                    onClick={() =>
                      set("gender", "male")
                    }
                  >
                    পুরুষ
                  </RadioPill>

                  <RadioPill
                    checked={form.gender === "female"}
                    onClick={() =>
                      set("gender", "female")
                    }
                  >
                    মহিলা
                  </RadioPill>

                  <RadioPill
                    checked={
                      form.maritalStatus ===
                      "married"
                    }
                    onClick={() =>
                      set(
                        "maritalStatus",
                        "married"
                      )
                    }
                  >
                    বিবাহিত
                  </RadioPill>

                  <RadioPill
                    checked={
                      form.maritalStatus ===
                      "unmarried"
                    }
                    onClick={() =>
                      set(
                        "maritalStatus",
                        "unmarried"
                      )
                    }
                  >
                    অবিবাহিত
                  </RadioPill>

                </div>

                <div className="grid max-w-md grid-cols-2 gap-4">

                  <Field labelBn="পুত্র">
                    <TextInput
                      type="number"
                      min={0}
                      value={form.sonCount}
                      onChange={(e) =>
                        set(
                          "sonCount",
                          e.target.value
                        )
                      }
                      placeholder="সংখ্যা"
                    />
                  </Field>

                  <Field labelBn="কন্যা">
                    <TextInput
                      type="number"
                      min={0}
                      value={form.daughterCount}
                      onChange={(e) =>
                        set(
                          "daughterCount",
                          e.target.value
                        )
                      }
                      placeholder="সংখ্যা"
                    />
                  </Field>

                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                  <Checkbox
                    checked={form.widow}
                    onChange={(v) =>
                      set("widow", v)
                    }
                    labelBn="বিধবা"
                  />

                  <Checkbox
                    checked={form.widower}
                    onChange={(v) =>
                      set("widower", v)
                    }
                    labelBn="বিপত্নীক"
                  />

                  <Checkbox
                    checked={form.divorced}
                    onChange={(v) =>
                      set("divorced", v)
                    }
                    labelBn="তালাকপ্রাপ্ত"
                  />

                  <Checkbox
                    checked={form.passedAway}
                    onChange={(v) =>
                      set("passedAway", v)
                    }
                    labelBn="ইন্তেকাল প্রাপ্ত"
                  />

                  <Checkbox
                    checked={
                      form.securityVolunteer
                    }
                    onChange={(v) =>
                      set(
                        "securityVolunteer",
                        v
                      )
                    }
                    labelBn="নিরাপত্তা কর্মী"
                  />

                </div>

              </div>
            </section>

            {/* =================================================
                EDUCATION
            ================================================= */}
            <section>
              <SectionTitle
                title="শিক্ষাগত যোগ্যতা"
                icon={GraduationCap}
              />

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
                    checked={
                      form.education === val
                    }
                    onClick={() =>
                      set("education", val)
                    }
                  >
                    {label}
                  </RadioPill>
                ))}

              </div>
            </section>

            {/* =================================================
                NESBOT
            ================================================= */}
            <section>
              <SectionTitle
                title="নেসবত"
                icon={HeartHandshake}
              />

              <div className="space-y-3">

                <Checkbox
                  checked={
                    form.followerMozammel
                  }
                  onChange={(v) =>
                    set(
                      "followerMozammel",
                      v
                    )
                  }
                  labelBn="খাজা মোজাম্মেল হক (রঃ) এর মুরিদ"
                />

                <Checkbox
                  checked={form.followerYunus}
                  onChange={(v) =>
                    set(
                      "followerYunus",
                      v
                    )
                  }
                  labelBn="খাজা ইউনুস আলী (রঃ) এর নেসবত ভুক্ত"
                />

                <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">

                  <Checkbox
                    checked={
                      form.otherNesbot
                    }
                    onChange={(v) =>
                      set(
                        "otherNesbot",
                        v
                      )
                    }
                    labelBn="অন্য নেসবত"
                  />

                  {form.otherNesbot && (
                    <TextInput
                      value={
                        form.otherNesbotDetail
                      }
                      onChange={(e) =>
                        set(
                          "otherNesbotDetail",
                          e.target.value
                        )
                      }
                      placeholder="বিস্তারিত লিখুন..."
                    />
                  )}

                </div>

                <div className="max-w-sm pt-2">

                  <Field labelBn="বায়াত গ্রহণের তারিখ/সাল">
                    <TextInput
                      value={form.joiningDate}
                      onChange={(e) =>
                        set(
                          "joiningDate",
                          e.target.value
                        )
                      }
                      placeholder="DD/MM/YYYY"
                    />
                  </Field>

                </div>

              </div>
            </section>

            {/* =================================================
                SADKA
            ================================================= */}
            <section>
              <SectionTitle
                title="ছাদকায়ে জারিয়া"
                icon={HandHeart}
              />

              <div className="rounded-2xl border border-[#d8b766]/40 bg-gradient-to-br from-[#fffaf0] to-amber-50 p-5 shadow-sm sm:p-6">

                <Checkbox
                  checked={form.joinSadka}
                  onChange={(v) =>
                    set(
                      "joinSadka",
                      v
                    )
                  }
                  labelBn="ছাদকায়ে জারিয়ায় অন্তর্ভুক্তির জন্য"
                />

                <p className="mt-4 rounded-xl bg-white/70 p-4 text-xs font-medium leading-6 text-[#0d3b2e] sm:text-sm">
                  আমি খাজা মোজাম্মেল হক (রঃ) ফাউন্ডেশনে স্বইচ্ছায় এবারতের
                  নিয়তে খাদেম/সহযোগী খাদেমের নিকট ছাদকায়ে জারিয়া
                  নিয়মিত প্রদান করবো, এই মর্মে অন্তর্ভুক্ত হইলাম।
                </p>

              </div>
            </section>

            {/* =================================================
                SUBMIT
            ================================================= */}
            <div className="border-t border-stone-100 pt-7">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-xs leading-5 text-stone-500">
                  জমা দেওয়ার আগে আপনার দেওয়া তথ্যগুলো একবার যাচাই করে নিন।
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#0d3b2e] px-8 text-sm font-bold text-white shadow-lg shadow-[#0d3b2e]/20 transition hover:-translate-y-0.5 hover:bg-[#153f32] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#d8b766]/25 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >

                  {submitting ? (
                    <>
                      <FontAwesomeIcon
                        icon={faCircleNotch}
                        spin
                        className="mr-2"
                      />
                      সংরক্ষণ হচ্ছে...
                    </>
                  ) : (
                    <>
                      নিবন্ধন জমা দিন
                      <span className="ml-2">
                        →
                      </span>
                    </>
                  )}

                </button>

              </div>
            </div>

          </div>
        </form>

        {/* =====================================================
            FOOTER
        ===================================================== */}
        <footer className="py-6 text-center text-[11px] text-stone-400">
          খাজা মোজাম্মেল হক (রঃ) ফাউন্ডেশন • নিবন্ধন পোর্টাল
        </footer>

      </div>
    </main>
  );
}
