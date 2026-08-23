"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";

// ---------------------------------------------------------------------------
// Khaja Mozammel Hoque (R) Foundation — Devotee Registration Form
// ভক্তবৃন্দের তথ্য নিবন্ধন
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
  country: "Bangladesh",
  division: "",
  district: "",
  ps: "",
  po: "",
  postCode: "",
  village: "",
  street: "",
  dob: Array(8).fill(""),
  religion: "",
  bloodGroup: "",
  profession: "",
  nationality: "Bangladeshi",
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
// Real Administrative Location Data (Bangladesh)
// ---------------------------------------------------------------------------

const countryList = ["Bangladesh", "Saudi Arabia", "UAE", "Qatar", "Oman", "Kuwait", "Malaysia", "Singapore", "USA", "UK"];

const divisionList = [
  "Barishal", "Chattogram", "Dhaka", "Khulna", "Mymensingh", "Rajshahi", "Rangpur", "Sylhet"
];

const districtByDivision: Record<string, string[]> = {
  Barishal: ["Barguna", "Barishal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
  Chattogram: ["Bandarban", "Brahmanbaria", "Chandpur", "Chattogram", "Cox's Bazar", "Cumilla", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati"],
  Dhaka: ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
  Khulna: ["Bagerhat", "Chuadanga", "Jeshore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
  Rajshahi: ["Bogra", "Joypurhat", "Naogaon", "Natore", "Nawabganj", "Pabna", "Rajshahi", "Sirajganj"],
  Rangpur: ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"],
  Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"]
};

// District Wise Thana Mapping (আমি রংপুর বিভাগের সব জেলার থানা যোগ করলাম)
const thanaByDistrict: Record<string, string[]> = {
  // Dhaka Division
  Dhaka: ["Adabor", "Badda", "Bangshal", "Cantonment", "Chakbazar", "Dhanmondi", "Gendaria", "Gulshan", "Hazaribagh", "Jatrabari", "Kafrul", "Kalabagan", "Kamrangirchar", "Khilgaon", "Khilkhet", "Kotwali", "Lalbagh", "Mirpur", "Mohammadpur", "Motijheel", "New Market", "Pallabi", "Paltan", "Ramna", "Rampura", "Sabujbagh", "Shah Ali", "Shahbagh", "Sher-e-Bangla Nagar", "Shyampur", "Sutrapur", "Tejgaon", "Tejgaon Industrial Area", "Turag", "Uttara", "Vatara", "Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar"],
  Gazipur: ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur", "Tongi Sadar"],
  Narayanganj: ["Narayanganj Sadar", "Araihazar", "Bandar", "Dhaleswari", "Rupganj", "Sonargaon"],
  Tangail: ["Basail", "Bhuapur", "Delduar", "Dhanbari", "Ghapail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur", "Tangail Sadar"],
  Faridpur: ["Alfadanga", "Bhanga", "Boalmari", "Charbhadrashen", "Faridpur Sadar", "Madhukhali", "Nagarkanda", "Sadarpur", "Saltha"],

  // Chattogram Division
  Chattogram: ["Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari", "Hathazari", "Karnafuli", "Lohagara", "Mirsarai", "Patiya", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda", "Bayezid Bostami", "Chandgaon", "Double Mooring", "Halishahar", "Kotwali", "Pahartali", "Panchlaish", "Patenga"],
  Cumilla: ["Barura", "Brahmanpara", "Burichang", "Chandina", "Chouddagram", "Daudkandi", "Debidwar", "Homna", "Laksam", "Monohargonj", "Meghna", "Muradnagar", "Nangalkot", "Cumilla Adarsha Sadar", "Sadarsouth", "Titas"],

  // Sylhet Division
  Sylhet: ["Balaganj", "Beanibazar", "Bishwanath", "Companiganj", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Osmaninagar", "Sylhet Sadar", "Zakiganj"],

  // Rajshahi Division
  Rajshahi: ["Bagha", "Bagmara", "Charghat", "Durgapur", "Godagari", "Mohanpur", "Paba", "Puthia", "Tanore", "Boalia", "Rajpara", "Shah Mokdum", "Motihar"],
  Bogra: ["Adamdighi", "Bogra Sadar", "Sherpur", "Dhunat", "Dhupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Shajahanpur", "Sonatola", "Shibganj"],
  Sirajganj: ["Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Rayganj", "Shahjadpur", "Sirajganj Sadar", "Tarash", "Ullapara"],

  // Khulna Division
  Khulna: ["Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra", "Paikgachha", "Phultala", "Rupsha", "Terokhada", "Daulatpur", "Khalishpur", "Khan Jahan Ali", "Kotwali", "Sonadanga"],

  // Barishal Division
  Barishal: ["Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Gaurnadi", "Hizla", "Barishal Sadar", "Mehendiganj", "Muladi", "Wazirpur"],

  // Rangpur Division (যোগ করা হলো)
  Dinajpur: ["Dinajpur Sadar", "Birganj", "Bochaganj", "Chirirbandar", "Phulbari", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur"],
  Gaibandha: ["Gaibandha Sadar", "Fulchhari", "Gobindaganj", "Palashbari", "Saghata", "Sundarganj"],
  Kurigram: ["Kurigram Sadar", "Bhurungamari", "Char Rajibpur", "Chilmari", "Phulbari", "Nageshwari", "Rajarhat", "Raomari", "Ulipur"],
  Lalmonirhat: ["Lalmonirhat Sadar", "Aditmari", "Hatibandha", "Kaliganj", "Patgram"],
  Nilphamari: ["Nilphamari Sadar", "Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Saidpur"],
  Panchagarh: ["Panchagarh Sadar", "Atwari", "Boda", "Debiganj", "Tetulia"],
  Rangpur: ["Rangpur Sadar", "Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgacha", "Pirganj", "Taraganj"],
  Thakurgaon: ["Thakurgaon Sadar", "Baliadangi", "Haripur", "Pirganj", "Ranisankail"],
};

// Thana Wise Post Office Mapping
const poByThana: Record<string, string[]> = {
  // Dhaka Thanas
  Mohammadpur: ["Mohammadpur PO", "Asad Gate PO", "Tajmahal Road PO", "Town Hall PO"],
  Adabor: ["Adabor PO", "Baitul Aman PO", "PC Culture Housing PO"],
  Dhanmondi: ["Dhanmondi PO", "Jigatola PO", "Science Lab PO", "Rondhanu PO"],
  "Sher-e-Bangla Nagar": ["Agargaon PO", "Shyamoli PO", "National Assembly PO"],
  Mirpur: ["Mirpur-1 PO", "Mirpur-2 PO", "Mirpur-10 PO", "Mirpur-12 PO", "Mirpur T&T PO"],
  Gulshan: ["Gulshan-1 PO", "Gulshan-2 PO", "Banani PO", "Niketan PO"],
  Uttara: ["Uttara Model Town PO", "Uttara Sector-6 PO", "Uttara Sector-14 PO", "Khilket PO"],
  Tejgaon: ["Tejgaon PO", "Farmgate PO", "Kawran Bazar PO"],
  Dhamrai: ["Dhamrai PO", "Kalameshwar PO", "Kamarpura PO"],
  Savar: ["Savar Cantonment PO", "Savar Sadar PO", "EPZ PO", "AMIN BAZAR PO"],
  "Tangail Sadar": ["Tangail Sadar PO", "Kalia PO", "Madhupur PO"],
  Kalihati: ["Kalihati PO", "Elenga PO", "Nagarbari PO"],

  // Gazipur Thanas
  "Gazipur Sadar": ["Gazipur Sadar PO", "BRRI PO", "DUET PO", "Chow रास्ते PO"],
  Sreepur: ["Sreepur PO", "Kawraid PO", "Mawna PO"],
  Kaliakair: ["Kaliakair PO", "Chandra PO", "Safipur PO"],

  // Narayanganj Thanas
  "Narayanganj Sadar": ["Narayanganj Head PO", "Bandar PO", "Chashara PO"],
  Sonargaon: ["Sonargaon PO", "Baidyer Bazar PO", "Mograpara PO"],

  // Chattogram Thanas
  Kotwali: ["Chattogram GPO", "Court Building PO", "New Market PO"],
  Panchlaish: ["Panchlaish PO", "Chittagong Medical PO", "Shahi Jame Masjid PO"],
  Hathazari: ["Hathazari PO", "Chittagong University PO", "Alipur PO"],
  Sitakunda: ["Sitakunda PO", "Bhatiari PO", "Kumira PO"],

  // Cumilla Thanas
  "Cumilla Adarsha Sadar": ["Cumilla Head PO", "Cumilla Cantonment PO", "Ranir Bazar PO"],
  Daudkandi: ["Daudkandi PO", "Gouripur PO", "Eliotganj PO"],

  // Rajshahi & Bogra Thanas
  Boalia: ["Rajshahi Head PO", "Ghoramara PO", "Kazla PO"],
  "Bogra Sadar": ["Bogra Head PO", "Bogra Cantonment PO", "Chelopara PO"],

  // Sirajganj Thanas
  "Sirajganj Sadar": ["Sirajganj Sadar PO", "Kalia Haripur PO", "Rashidpur PO"],
  Shahjadpur: ["Shahjadpur PO", "Porjana PO", "Pothajia PO"],
  Ullapara: ["Ullapara PO", "Ullapara RS PO", "Salap PO"],

  // Rangpur Thanas (যোগ করা হলো)
  "Rangpur Sadar": ["Rangpur GPO", "Rangpur Cantonment PO", "Kotwali PO"],
  "Dinajpur Sadar": ["Dinajpur Head PO", "Dinajpur Cantonment PO"],
  "Thakurgaon Sadar": ["Thakurgaon Head PO"],
  "Panchagarh Sadar": ["Panchagarh Head PO"],
  "Nilphamari Sadar": ["Nilphamari Head PO", "Saidpur PO"],
  "Lalmonirhat Sadar": ["Lalmonirhat Head PO"],
  "Kurigram Sadar": ["Kurigram Head PO"],
  "Gaibandha Sadar": ["Gaibandha Head PO"],
};

// Boxed inputs for ID / DOB
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
      ref={(el) => {
        refs.current[i] = el;
      }}
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

function Field({
  labelBn,
  labelEn,
  children,
  className = "",
}: {
  labelBn: string;
  labelEn: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs sm:text-sm font-semibold text-stone-700 tracking-wide">
        {labelEn} <span className="text-amber-800 font-normal">({labelBn})</span>
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-amber-900/15 bg-amber-50/20 px-3.5 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#8a3324] focus:bg-white focus:ring-4 focus:ring-[#8a3324]/10 shadow-sm hover:border-amber-300 disabled:bg-stone-100 disabled:cursor-not-allowed";

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

// Custom Select / Autocomplete Input
function CustomSelectInput({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((item) =>
    item.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="text"
        value={value}
        disabled={disabled}
        onFocus={() => !disabled && setIsOpen(true)}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        placeholder={placeholder || "Type or select an option..."}
        className={inputClass}
      />

      {isOpen && !disabled && filteredOptions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-[180px] overflow-y-auto rounded-xl border border-amber-900/15 bg-white py-1 shadow-xl ring-1 ring-black/5">
          {filteredOptions.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                onChange(item);
                setIsOpen(false);
              }}
              className="cursor-pointer px-4 py-2 text-sm text-stone-800 transition hover:bg-amber-50 hover:text-[#8a3324] font-medium"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  labelEn,
  labelBn,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  labelEn: string;
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
      <span className="text-sm font-medium text-stone-800">
        {labelEn} <span className="text-stone-500 font-normal">({labelBn})</span>
      </span>
    </label>
  );
}

function RadioPill({
  checked,
  onClick,
  children,
}: {
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

function SectionTitle({
  titleEn,
  titleBn,
}: {
  titleEn: string;
  titleBn?: string;
}) {
  return (
    <div className="mb-6 mt-10 flex items-center gap-3 first:mt-0">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#8a3324]/10 text-[#8a3324]">
        <span className="h-2 w-2 rotate-45 bg-[#8a3324]" />
      </div>
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#8a3324]">
          {titleEn} {titleBn && <span className="text-stone-600 font-normal font-serif">({titleBn})</span>}
        </h2>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-amber-200 to-transparent" />
    </div>
  );
}

export default function RegistrationForm() {
  const [form, setForm] = useState<FormState>(emptyState);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  // Dynamic cascading logic
  const availableDivisions = form.country === "Bangladesh" ? divisionList : [];
  const availableDistricts = form.division ? districtByDivision[form.division] || [] : [];
  const availableThanas = form.district
    ? thanaByDistrict[form.district] || [`${form.district} Sadar`]
    : [];
  const availablePostOffices = form.ps
    ? poByThana[form.ps] || [`${form.ps} PO`]
    : [];

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration submitted:", form);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-8 sm:py-12 px-3 sm:px-6 font-sans antialiased">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-amber-900/10 bg-white shadow-2xl shadow-stone-300">

        {/* Banner / Header */}
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
              ভক্তবৃন্দের তথ্য নিবন্ধন — Devotee Registration
            </div>
          </div>
        </header>

        {submitted && (
          <div className="mx-8 mt-6 rounded-2xl border border-emerald-300 bg-emerald-50/90 p-4 text-center text-sm font-medium text-emerald-900 shadow-sm">
            ✓ Registration form saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-2">

          {/* Registration Details */}
          <SectionTitle titleEn="Registration Details" titleBn="নিবন্ধন তথ্য" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field labelEn="KMRF ID" labelBn="কে.এম.আর.এফ আইডি" className="sm:col-span-2">
              <BoxInput
                values={form.kmrfId}
                onChange={(v) => set("kmrfId", v)}
                count={10}
              />
            </Field>
            <Field labelEn="Purpose" labelBn="উদ্দেশ্য">
              <TextInput
                value={form.purpose}
                onChange={(e) => set("purpose", e.target.value)}
                placeholder="e.g. Service / Membership"
              />
            </Field>
            <Field labelEn="Region" labelBn="অঞ্চল">
              <TextInput
                value={form.region}
                onChange={(e) => set("region", e.target.value)}
                placeholder="e.g. Dhaka"
              />
            </Field>
            <Field labelEn="KMRF Designation" labelBn="কে.এম.আর.এফ এর পদবী" className="sm:col-span-2">
              <TextInput
                value={form.designation}
                onChange={(e) => set("designation", e.target.value)}
                placeholder="Enter designation"
              />
            </Field>
          </div>

          {/* Personal Info + Photo */}
          <SectionTitle titleEn="Personal Information" titleBn="ব্যক্তিগত তথ্য" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 items-start">
            <div className="order-2 grid grid-cols-1 gap-5 sm:order-1 sm:col-span-2">
              <Field labelEn="Name" labelBn="নাম">
                <TextInput
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Full name"
                />
              </Field>
              <Field labelEn="Father's Name" labelBn="পিতার নাম">
                <TextInput
                  value={form.fatherName}
                  onChange={(e) => set("fatherName", e.target.value)}
                />
              </Field>
              <Field labelEn="Spouse's Name" labelBn="স্বামী/স্ত্রীর নাম">
                <TextInput
                  value={form.spouseName}
                  onChange={(e) => set("spouseName", e.target.value)}
                />
              </Field>
            </div>

            {/* Photo Upload Box */}
            <div className="order-1 flex flex-col items-center gap-2 sm:order-2">
              <label
                htmlFor="photo"
                className="group relative flex h-44 w-36 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-amber-800/30 bg-amber-50/20 text-center transition hover:border-[#8a3324] hover:bg-amber-50/50 shadow-inner overflow-hidden"
              >
                {photoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photoPreview}
                    alt="Applicant"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="p-3 text-stone-500 group-hover:text-[#8a3324] transition">
                    <svg className="mx-auto h-8 w-8 mb-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h0.93a2 2 0 011.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="block font-semibold text-xs">PHOTO</span>
                    <span className="block text-[10px] text-stone-400">Passport Size</span>
                    <span className="block text-[11px] font-medium mt-1">ছবি আপলোড</span>
                  </div>
                )}
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

          {/* Permanent Address Cascade Hierarchy */}
          <SectionTitle titleEn="Permanent Address" titleBn="স্থায়ী ঠিকানা" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* 1. Country */}
            <Field labelEn="Country" labelBn="দেশ">
              <CustomSelectInput
                value={form.country}
                onChange={(v) => {
                  set("country", v);
                  set("division", "");
                  set("district", "");
                  set("ps", "");
                  set("po", "");
                }}
                options={countryList}
                placeholder="Select Country..."
              />
            </Field>

            {/* 2. Division */}
            <Field labelEn="Division" labelBn="বিভাগ">
              <CustomSelectInput
                value={form.division}
                disabled={!availableDivisions.length}
                onChange={(v) => {
                  set("division", v);
                  set("district", "");
                  set("ps", "");
                  set("po", "");
                }}
                options={availableDivisions}
                placeholder={form.country ? "Select Division..." : "Select Country first"}
              />
            </Field>

            {/* 3. District */}
            <Field labelEn="District/State/Province" labelBn="জেলা/রাষ্ট্র/প্রদেশ">
              <CustomSelectInput
                value={form.district}
                disabled={!availableDistricts.length}
                onChange={(v) => {
                  set("district", v);
                  set("ps", "");
                  set("po", "");
                }}
                options={availableDistricts}
                placeholder={form.division ? "Select District..." : "Select Division first"}
              />
            </Field>

            {/* 4. PS / Thana (ফিক্স করা হলো) */}
            <Field labelEn="PS / Thana" labelBn="থানা">
              <CustomSelectInput
                value={form.ps}
                // শুধু জেলা সিলেক্ট না করলেই ডিসেবল থাকবে। জেলা সিলেক্ট করলে ইউজার টাইপ করতে পারবেন
                // এবং যদি আমার কাছে থানার লিস্ট থাকে তাহলে সেটিও দেখাবে।
                disabled={!form.district}
                onChange={(v) => {
                  set("ps", v);
                  set("po", ""); // থানা পরিবর্তনে পোস্ট অফিস রিসেট
                }}
                options={availableThanas}
                placeholder={form.district ? "Type or select Thana..." : "Select District first"}
              />
            </Field>

            {/* 5. Post Office */}
            <Field labelEn="PO" labelBn="পোস্ট অফিস">
              <CustomSelectInput
                value={form.po}
                disabled={!form.ps}
                onChange={(v) => set("po", v)}
                options={availablePostOffices}
                placeholder={form.ps ? "Type or select Post Office..." : "Select Thana first"}
              />
            </Field>

            {/* Post Code */}
            <Field labelEn="Post Code" labelBn="পোস্ট কোড">
              <TextInput
                value={form.postCode}
                onChange={(e) => set("postCode", e.target.value)}
                placeholder="e.g. 1207"
              />
            </Field>

            {/* Village / Holding */}
            <Field labelEn="Village/Holding/Area" labelBn="গ্রাম/হোল্ডিং/মহল্লা" className="sm:col-span-2">
              <TextInput
                value={form.village}
                onChange={(e) => set("village", e.target.value)}
                placeholder="Village/Holding/Area"
              />
            </Field>

            {/* Street */}
            <Field labelEn="Street" labelBn="রাস্তা" className="sm:col-span-2">
              <TextInput
                value={form.street}
                onChange={(e) => set("street", e.target.value)}
                placeholder="Street name or number"
              />
            </Field>

            {/* DOB */}
            <Field labelEn="DOB" labelBn="জন্ম তারিখ" className="sm:col-span-2">
              <BoxInput
                values={form.dob}
                onChange={(v) => set("dob", v)}
                count={8}
                groupSizes={[2, 2, 4]}
              />
            </Field>
          </div>

          {/* Khadem & Coordinator Info */}
          <SectionTitle titleEn="Khadem & Coordinator Info" titleBn="খাদেম ও প্রধান সমন্বয়কারীর তথ্য" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 bg-amber-50/40 p-5 rounded-2xl border border-amber-900/10">
            <Field labelEn="Khadem's Name" labelBn="খাদেমের নাম">
              <TextInput
                value={form.khademName}
                onChange={(e) => set("khademName", e.target.value)}
                placeholder="Enter Khadem's name..."
              />
            </Field>

            <Field labelEn="Coordinator's Name" labelBn="প্রধান সমন্বয়কারীর নাম">
              <TextInput
                value={form.coordinatorName}
                onChange={(e) => set("coordinatorName", e.target.value)}
                placeholder="Enter Coordinator's name..."
              />
            </Field>
          </div>

          {/* Other Details */}
          <SectionTitle titleEn="Other Details" titleBn="অন্যান্য তথ্য" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Field labelEn="Religion" labelBn="ধর্ম">
              <TextInput
                value={form.religion}
                onChange={(e) => set("religion", e.target.value)}
                placeholder="e.g. Islam"
              />
            </Field>
            <Field labelEn="Blood Group" labelBn="রক্তের গ্রুপ">
              <TextInput
                value={form.bloodGroup}
                onChange={(e) => set("bloodGroup", e.target.value)}
                placeholder="e.g. B+"
              />
            </Field>
            <Field labelEn="Profession" labelBn="পেশা">
              <TextInput
                value={form.profession}
                onChange={(e) => set("profession", e.target.value)}
              />
            </Field>
            <Field labelEn="Nationality" labelBn="জাতীয়তা">
              <TextInput
                value={form.nationality}
                onChange={(e) => set("nationality", e.target.value)}
              />
            </Field>
            <Field labelEn="Email" labelBn="ই-মেইল">
              <TextInput
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="example@mail.com"
              />
            </Field>
            <Field labelEn="Contact No" labelBn="যোগাযোগের নম্বর">
              <TextInput
                type="tel"
                value={form.contactNo}
                onChange={(e) => set("contactNo", e.target.value)}
                placeholder="017XXXXXXXX"
              />
            </Field>
          </div>

          {/* Identity Document */}
          <SectionTitle titleEn="Identity Document" titleBn="পরিচয়পত্র" />
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2.5">
              {(["NID", "BRN", "PPN"] as const).map((t) => (
                <RadioPill key={t} checked={form.idType === t} onClick={() => set("idType", t)}>
                  {t === "NID" && "NID (জাতীয় পরিচয় পত্র)"}
                  {t === "BRN" && "BRN (জন্ম নিবন্ধন)"}
                  {t === "PPN" && "PPN (পাসপোর্ট নং)"}
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

          {/* Personal Status */}
          <SectionTitle titleEn="Personal Status" titleBn="ব্যক্তিগত অবস্থা" />
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2.5">
              <RadioPill checked={form.gender === "male"} onClick={() => set("gender", "male")}>
                Male (পুরুষ)
              </RadioPill>
              <RadioPill checked={form.gender === "female"} onClick={() => set("gender", "female")}>
                Female (মহিলা)
              </RadioPill>
              <RadioPill
                checked={form.maritalStatus === "married"}
                onClick={() => set("maritalStatus", "married")}
              >
                Married (বিবাহিত)
              </RadioPill>
              <RadioPill
                checked={form.maritalStatus === "unmarried"}
                onClick={() => set("maritalStatus", "unmarried")}
              >
                Unmarried (অবিবাহিত)
              </RadioPill>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:max-w-md">
              <Field labelEn="Son" labelBn="পুত্র">
                <TextInput
                  type="number"
                  min={0}
                  value={form.sonCount}
                  onChange={(e) => set("sonCount", e.target.value)}
                  placeholder="সংখ্যা"
                />
              </Field>
              <Field labelEn="Daughter" labelBn="কন্যা">
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
                labelEn="Widow"
                labelBn="বিধবা"
              />
              <Checkbox
                checked={form.widower}
                onChange={(v) => set("widower", v)}
                labelEn="Widower"
                labelBn="বিপত্নীক"
              />
              <Checkbox
                checked={form.divorced}
                onChange={(v) => set("divorced", v)}
                labelEn="Divorced"
                labelBn="তালাকপ্রাপ্ত"
              />
              <Checkbox
                checked={form.passedAway}
                onChange={(v) => set("passedAway", v)}
                labelEn="Passed Away"
                labelBn="ইন্তেকাল প্রাপ্ত"
              />
              <Checkbox
                checked={form.securityVolunteer}
                onChange={(v) => set("securityVolunteer", v)}
                labelEn="Security Volunteer"
                labelBn="নিরাপত্তা কর্মী"
              />
            </div>
          </div>

          {/* Education */}
          <SectionTitle titleEn="Educational Qualification" titleBn="শিক্ষাগত যোগ্যতা" />
          <div className="flex flex-wrap gap-2.5">
            {(
              [
                ["underSSC", "Under SSC", "এসএসসি-র নিচে"],
                ["SSC", "SSC", "এসএসসি"],
                ["HSC", "HSC", "এইচএসসি"],
                ["bachelors", "Bachelors", "ব্যাচেলর"],
                ["masters", "Masters", "মাস্টার্স"],
                ["doctorate", "Doctorate", "ডক্টরেট"],
              ] as const
            ).map(([val, en, bn]) => (
              <RadioPill
                key={val}
                checked={form.education === val}
                onClick={() => set("education", val)}
              >
                {en} ({bn})
              </RadioPill>
            ))}
          </div>

          {/* Spiritual Affiliation */}
          <SectionTitle titleEn="Spiritual Affiliation" titleBn="নেসবত" />
          <div className="space-y-3">
            <Checkbox
              checked={form.followerMozammel}
              onChange={(v) => set("followerMozammel", v)}
              labelEn="Follower of Khwaja Mozammel Hoque (R)"
              labelBn="খাজা মোজাম্মেল হক (রঃ) এর মুরিদ"
            />
            <Checkbox
              checked={form.followerYunus}
              onChange={(v) => set("followerYunus", v)}
              labelEn="Follower of Khwaja Yunus Ali's (R) Nesbot"
              labelBn="খাজা ইউনুস আলী (রঃ) এর নেসবত ভুক্ত"
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Checkbox
                checked={form.otherNesbot}
                onChange={(v) => set("otherNesbot", v)}
                labelEn="Other Nesbot"
                labelBn="অন্য নেসবত"
              />
              {form.otherNesbot && (
                <TextInput
                  value={form.otherNesbotDetail}
                  onChange={(e) => set("otherNesbotDetail", e.target.value)}
                  placeholder="Please specify..."
                  className="sm:max-w-xs"
                />
              )}
            </div>

            <div className="pt-2 sm:max-w-xs">
              <Field labelEn="Joining Date/Year" labelBn="বায়াত গ্রহণের তারিখ/সাল">
                <TextInput
                  value={form.joiningDate}
                  onChange={(e) => set("joiningDate", e.target.value)}
                  placeholder="DD/MM/YYYY"
                />
              </Field>
            </div>
          </div>

          {/* Sadka-E-Zaria */}
          <SectionTitle titleEn="Sadka-E-Zaria" titleBn="ছাদকায়ে জারিয়া" />
          <div className="rounded-2xl border border-amber-900/15 bg-gradient-to-r from-amber-50/80 to-orange-50/50 p-5 sm:p-6 shadow-sm space-y-3">
            <Checkbox
              checked={form.joinSadka}
              onChange={(v) => set("joinSadka", v)}
              labelEn="Join Sadka-E-Zaria"
              labelBn="ছাদকায়ে জারিয়ায় অন্তর্ভুক্তির জন্য"
            />
            <p className="text-xs sm:text-sm text-[#8a3324] font-medium leading-relaxed pl-1">
              আমি খাজা মোজাম্মেল হক (রঃ) ফাউন্ডেশনে স্বইচ্ছায় এবারতের নিয়তে খাদেম/সহযোগী
              খাদেমের নিকট ছাদকায়ে জারিয়া নিয়মিত প্রদান করবো, এই মর্মে অন্তর্ভুক্ত হইলাম।
            </p>
          </div>

          {/* Submit Action */}
          <div className="pt-8 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto rounded-xl bg-[#8a3324] px-10 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-900/20 hover:bg-[#722a1d] hover:shadow-xl transition focus:outline-none focus:ring-4 focus:ring-[#8a3324]/30"
            >
              Submit Registration (নিবন্ধন জমা দিন)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}