"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCamera, faCircleNotch } from "@fortawesome/free-solid-svg-icons";

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
import { loadGeoData, matchUpazila } from "@/lib/geo/geoUtils";
import { emptyState, toEn, type FormState } from "@/lib/registration/types";


import { BoxInput } from "@/app/component/registration/BoxInput";
import { Field } from "@/app/component/registration/Field";
import { SelectInput, TextInput } from "@/app/component/registration/FormInputs";
import { Checkbox } from "@/app/component/registration/Checkbox";
import { RadioPill } from "@/app/component/registration/RadioPill";
import { SectionTitle } from "@/app/component/registration/SectionTitle";


export default function RegistrationForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(emptyState);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [unionList, setUnionList] = useState<string[]>([]);
  const [loadingUnions, setLoadingUnions] = useState(false);
  const [unionError, setUnionError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({
      ...f,
      [key]: value,
    }));
  };

  // -------------------------------------------------------------------------
  // Location
  // -------------------------------------------------------------------------

  const availableDivisions = form.country === "বাংলাদেশ" ? divisionList : [];

  const availableDistricts = form.division
    ? districtByDivision[form.division] || []
    : [];

  const availableThanas = form.district
    ? thanaByDistrict[form.district] || [`${form.district} সদর`]
    : [];

  const khademOptions =
    form.district && khademByDistrict[form.district]
      ? [khademByDistrict[form.district]]
      : [];

  const coordinatorOptions =
    form.division && coordinatorByDivision[form.division]
      ? [coordinatorByDivision[form.division]]
      : [];

  // -------------------------------------------------------------------------
  // Union fetching
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (!form.ps || !form.district) return;

    let cancelled = false;

    const districtEn = toEn(districtBnToEn, form.district);
    const thanaEn = toEn(thanaBnToEn, form.ps);

    loadGeoData()
      .then((geo) => {
        if (cancelled) return;

        const upazila = matchUpazila(geo, districtEn, thanaEn);

        if (!upazila) {
          setUnionError(
            "এই থানার জন্য ইউনিয়ন তালিকা পাওয়া যায়নি। অনুগ্রহ করে নিজে টাইপ করুন।"
          );
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
        if (!cancelled) {
          setLoadingUnions(false);
          setUnionError("ইউনিয়ন লোড করতে সমস্যা হয়েছে। নিজে টাইপ করুন।");
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

  // -------------------------------------------------------------------------
  // Photo
  // -------------------------------------------------------------------------

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => setPhotoPreview(reader.result as string);

    reader.readAsDataURL(file);
  };

  // -------------------------------------------------------------------------
  // Submit
  // -------------------------------------------------------------------------

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

      const photoInput = document.getElementById("photo") as HTMLInputElement | null;
      const photo = photoInput?.files?.[0];

      if (photo) {
        formData.append("photo", photo);
      }

      const response = await axiosInstance.post(
        "/api/auth/createDevotee",
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

        router.push("/login");
      } else {
        setSubmitError("নিবন্ধন সংরক্ষণ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        setSubmitError(
          error.response?.data?.message || "নিবন্ধন সংরক্ষণ করতে সমস্যা হয়েছে।"
        );
      } else {
        setSubmitError(
          error instanceof Error ? error.message : "নিবন্ধন সংরক্ষণ করতে সমস্যা হয়েছে।"
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
          {progressItems.map(([number, title, subtitle]) => (
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
          ))}
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
              <SectionTitle title="নিবন্ধন তথ্য" icon={ClipboardList} />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
            </section>

            {/* =================================================
                PERSONAL
            ================================================= */}
            <section>
              <SectionTitle title="ব্যক্তিগত তথ্য" icon={UserRound} />

              <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_180px]">
                <div className="grid gap-5">
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
                        <FontAwesomeIcon icon={faCamera} className="mb-3 text-3xl" />

                        <span className="block text-xs font-bold">ছবি আপলোড</span>

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
              <SectionTitle title="স্থায়ী ঠিকানা" icon={MapPin} />

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
                      set("coordinatorName", "");
                      set("khademName", "");
                    }}
                    options={availableDivisions}
                    placeholder={
                      form.country ? "বিভাগ নির্বাচন করুন..." : "প্রথমে দেশ নির্বাচন করুন"
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
                      set("khademName", "");
                    }}
                    options={availableDistricts}
                    placeholder={
                      form.division ? "জেলা নির্বাচন করুন..." : "প্রথমে বিভাগ নির্বাচন করুন"
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
                      setLoadingUnions(true);
                    }}
                    options={availableThanas}
                    placeholder={
                      form.district ? "থানা নির্বাচন করুন..." : "প্রথমে জেলা নির্বাচন করুন"
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
                    <p className="mt-1.5 text-xs text-amber-700">{unionError}</p>
                  )}
                </Field>

                <Field labelBn="পোস্ট অফিস">
                  <TextInput
                    value={form.po}
                    onChange={(e) => set("po", e.target.value)}
                    placeholder="পোস্ট অফিসের নাম লিখুন"
                  />
                </Field>

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
            </section>

            {/* =================================================
                KHADEM
            ================================================= */}
            <section>
              <SectionTitle title="খাদেম ও প্রধান সমন্বয়কারীর তথ্য" icon={UsersRound} />

              <div className="grid grid-cols-1 gap-5 rounded-2xl border border-[#0d3b2e]/10 bg-[#f3f8f5] p-5 sm:grid-cols-2 sm:p-6">
                <Field labelBn="খাদেমের নাম (জেলা অনুযায়ী)">
                  <SelectInput
                    value={form.khademName}
                    disabled={!form.district}
                    onChange={(v) => set("khademName", v)}
                    options={khademOptions}
                    placeholder={
                      form.district ? "খাদেম নির্বাচন করুন..." : "প্রথমে জেলা নির্বাচন করুন"
                    }
                  />
                </Field>

                <Field labelBn="প্রধান সমন্বয়কারীর নাম (বিভাগ অনুযায়ী)">
                  <SelectInput
                    value={form.coordinatorName}
                    disabled={!form.division}
                    onChange={(v) => set("coordinatorName", v)}
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
                OTHER (email, contact, password, etc.)
            ================================================= */}
            <section>
              <SectionTitle title="অন্যান্য তথ্য" icon={ClipboardList} />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

                {/* --- Password field --- */}
                <Field labelBn="পাসওয়ার্ড">
                  <div className="relative">
                    <TextInput
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      autoComplete="new-password"
                      value={form.password}
                      onChange={(e) => set("password", e.target.value)}
                      placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                      className="pr-16"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-xs font-semibold text-[#0d3b2e] hover:underline"
                    >
                      {showPassword ? "লুকান" : "দেখুন"}
                    </button>
                  </div>
                </Field>
              </div>
            </section>

            {/* =================================================
                ID
            ================================================= */}
            <section>
              <SectionTitle title="পরিচয়পত্র" icon={IdCard} />

              <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-4 sm:p-5">
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
                  <div className="mt-5">
                    <BoxInput
                      values={form.idNumber}
                      onChange={(v) => set("idNumber", v)}
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
              <SectionTitle title="ব্যক্তিগত অবস্থা" icon={UserRound} />

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

                <div className="grid max-w-md grid-cols-2 gap-4">
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

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
            </section>

            {/* =================================================
                EDUCATION
            ================================================= */}
            <section>
              <SectionTitle title="শিক্ষাগত যোগ্যতা" icon={GraduationCap} />

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
            </section>

            {/* =================================================
                NESBOT
            ================================================= */}
            <section>
              <SectionTitle title="নেসবত" icon={HeartHandshake} />

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

                <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
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
                    />
                  )}
                </div>

                <div className="max-w-sm pt-2">
                  <Field labelBn="বায়াত গ্রহণের তারিখ/সাল">
                    <TextInput
                      value={form.joiningDate}
                      onChange={(e) => set("joiningDate", e.target.value)}
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
              <SectionTitle title="ছাদকায়ে জারিয়া" icon={HandHeart} />

              <div className="rounded-2xl border border-[#d8b766]/40 bg-gradient-to-br from-[#fffaf0] to-amber-50 p-5 shadow-sm sm:p-6">
                <Checkbox
                  checked={form.joinSadka}
                  onChange={(v) => set("joinSadka", v)}
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
                      <FontAwesomeIcon icon={faCircleNotch} spin className="mr-2" />
                      সংরক্ষণ হচ্ছে...
                    </>
                  ) : (
                    <>
                      নিবন্ধন জমা দিন
                      <span className="ml-2">→</span>
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
