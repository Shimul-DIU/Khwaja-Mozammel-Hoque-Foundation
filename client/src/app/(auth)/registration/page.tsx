"use client";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import axiosInstance from "@/lib/axios";
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
import { loadGeoData, matchUpazila } from "@/lib/geo/geoUtils";
import { emptyState, toEn, type FormState } from "@/lib/registration/types";
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
  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : undefined;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? value
            : value,
    }));
  };
  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const availableDivisions =
    form.country === "বাংলাদেশ" ? divisionList : [];
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
  useEffect(() => {
    if (!form.ps || !form.district) {
      setUnionList([]);
      setUnionError(null);
      return;
    }
    let cancelled = false;
    setLoadingUnions(true);
    setUnionError(null);
    const districtEn = toEn(districtBnToEn, form.district);
    const thanaEn = toEn(thanaBnToEn, form.ps);
    loadGeoData()
      .then((geo) => {
        if (cancelled) return;
        const upazila = matchUpazila(
          geo,
          districtEn,
          thanaEn
        );
        if (!upazila) {
          setUnionList([]);
          setUnionError(
            "এই থানার জন্য ইউনিয়ন তালিকা পাওয়া যায়নি।"
          );
          return;
        }
        const unions = geo.unions
          .filter((u) => u.upazilaId === upazila.id)
          .map((u) => u.bnName || u.name);
        if (unions.length === 0) {
          setUnionList([]);
          setUnionError(
            "ইউনিয়ন তালিকা পাওয়া যায়নি।"
          );
        } else {
          setUnionList(unions);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUnionList([]);
          setUnionError(
            "ইউনিয়ন লোড করতে সমস্যা হয়েছে।"
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
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setSubmitError(null);
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (typeof value === "boolean") {
          formData.append(key, value ? "true" : "false");
        } else {
          formData.append(key, String(value ?? ""));
        }
      });
      const photoInput = document.getElementById(
        "photo"
      ) as HTMLInputElement | null;
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
        setSubmitted(true);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        router.push("/login");
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
  const inputClass =
    "w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-[#0d3b2e] focus:ring-4 focus:ring-[#d8b766]/15";
  const selectClass =
    "w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-[#0d3b2e] focus:ring-4 focus:ring-[#d8b766]/15 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400";
  const labelClass =
    "mb-2 block text-sm font-bold text-stone-700";
  return (
    <main className="min-h-screen bg-[#f6f3ee] font-sans text-stone-900 antialiased">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="my-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            ["01", "নিবন্ধন", "প্রাথমিক তথ্য"],
            ["02", "ব্যক্তিগত", "পরিচয় ও ঠিকানা"],
            ["03", "পরিবার", "শিক্ষা ও অবস্থা"],
            ["04", "নেসবত", "ছাদকায়ে জারিয়া"],
          ].map(([number, title, subtitle]) => (
            <div
              key={number}
              className="rounded-2xl border border-stone-200 bg-white/80 p-3 shadow-sm backdrop-blur sm:p-4"
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
        {submitted && (
          <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
            নিবন্ধন সফল হয়েছে।
          </div>
        )}
        {submitError && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
            {submitError}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_70px_rgba(60,45,30,0.10)]"
        >
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
            <section>
              <div className="mb-5 border-b border-stone-100 pb-3">
                <h3 className="text-lg font-black text-[#0d3b2e]">
                  নিবন্ধন তথ্য
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    উদ্দেশ্য
                  </label>
                  <input
                    name="purpose"
                    value={form.purpose}
                    onChange={handleChange}
                    placeholder="যেমন: সেবা / সদস্যপদ"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    পদবী
                  </label>
                  <input
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    placeholder="পদবী লিখুন"
                    className={inputClass}
                  />
                </div>
              </div>
            </section>
            <section>
              <div className="mb-5 border-b border-stone-100 pb-3">
                <h3 className="text-lg font-black text-[#0d3b2e]">
                  ব্যক্তিগত তথ্য
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_180px]">
                <div className="grid gap-5">
                  <div>
                    <label className={labelClass}>
                      নাম
                    </label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="পূর্ণ নাম"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      পিতার নাম
                    </label>
                    <input
                      name="fatherName"
                      value={form.fatherName}
                      onChange={handleChange}
                      placeholder="পিতার নাম"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      স্বামী/স্ত্রীর নাম
                    </label>
                    <input
                      name="spouseName"
                      value={form.spouseName}
                      onChange={handleChange}
                      placeholder="স্বামী/স্ত্রীর নাম"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <label
                    htmlFor="photo"
                    className="flex h-52 w-40 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#0d3b2e]/30 bg-[#fffaf2]"
                  >
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Applicant"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-stone-500">
                        <div className="mb-3 text-3xl">
                          +
                        </div>
                        <span className="block text-xs font-bold">
                          ছবি আপলোড
                        </span>
                        <span className="mt-1 block text-[10px] text-stone-400">
                          পাসপোর্ট সাইজ
                        </span>
                      </div>
                    )}
                  </label>
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    className="hidden"
                  />
                </div>
              </div>
            </section>
            <section>
              <div className="mb-5 border-b border-stone-100 pb-3">
                <h3 className="text-lg font-black text-[#0d3b2e]">
                  স্থায়ী ঠিকানা
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    দেশ
                  </label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={(e) => {
                      handleChange(e);
                      setForm((prev) => ({
                        ...prev,
                        division: "",
                        district: "",
                        ps: "",
                        union: "",
                        po: "",
                      }));
                    }}
                    className={selectClass}
                  >
                    <option value="">
                      দেশ নির্বাচন করুন...
                    </option>
                    {countryList.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>
                    বিভাগ
                  </label>
                  <select
                    name="division"
                    value={form.division}
                    disabled={!availableDivisions.length}
                    onChange={(e) => {
                      handleChange(e);
                      setForm((prev) => ({
                        ...prev,
                        district: "",
                        ps: "",
                        union: "",
                        po: "",
                        coordinatorName: "",
                        khademName: "",
                      }));
                    }}
                    className={selectClass}
                  >
                    <option value="">
                      বিভাগ নির্বাচন করুন...
                    </option>
                    {availableDivisions.map((division) => (
                      <option key={division} value={division}>
                        {division}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>
                    জেলা
                  </label>
                  <select
                    name="district"
                    value={form.district}
                    disabled={!availableDistricts.length}
                    onChange={(e) => {
                      handleChange(e);
                      setForm((prev) => ({
                        ...prev,
                        ps: "",
                        union: "",
                        po: "",
                        khademName: "",
                      }));
                    }}
                    className={selectClass}
                  >
                    <option value="">
                      জেলা নির্বাচন করুন...
                    </option>
                    {availableDistricts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>
                    থানা
                  </label>
                  <select
                    name="ps"
                    value={form.ps}
                    disabled={!form.district}
                    onChange={(e) => {
                      handleChange(e);
                      setForm((prev) => ({
                        ...prev,
                        union: "",
                        po: "",
                      }));
                    }}
                    className={selectClass}
                  >
                    <option value="">
                      থানা নির্বাচন করুন...
                    </option>
                    {availableThanas.map((thana) => (
                      <option key={thana} value={thana}>
                        {thana}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>
                    ইউনিয়ন
                  </label>
                  {loadingUnions ? (
                    <div className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-500">
                      ইউনিয়ন লোড হচ্ছে...
                    </div>
                  ) : (
                    <select
                      name="union"
                      value={form.union}
                      disabled={!form.ps}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="">
                        {unionError
                          ? "ইউনিয়ন নির্বাচন করুন..."
                          : "ইউনিয়ন নির্বাচন করুন..."}
                      </option>
                      {unionList.map((union) => (
                        <option key={union} value={union}>
                          {union}
                        </option>
                      ))}
                    </select>
                  )}
                  {unionError && (
                    <p className="mt-2 text-xs text-amber-700">
                      {unionError}
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>
                    পোস্ট অফিস
                  </label>
                  <input
                    name="po"
                    value={form.po}
                    onChange={handleChange}
                    placeholder="পোস্ট অফিসের নাম লিখুন"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    পোস্ট কোড
                  </label>
                  <input
                    name="postCode"
                    value={form.postCode}
                    onChange={handleChange}
                    placeholder="পোস্ট কোড"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    গ্রাম/হোল্ডিং/মহল্লা
                  </label>
                  <input
                    name="village"
                    value={form.village}
                    onChange={handleChange}
                    placeholder="গ্রাম/হোল্ডিং/মহল্লা"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    রাস্তা
                  </label>
                  <input
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                    placeholder="রাস্তার নাম বা নম্বর"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    জন্ম তারিখ
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={
                      Array.isArray(form.dob)
                        ? form.dob.join("")
                        : form.dob
                    }
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </section>
            <section>
              <div className="mb-5 border-b border-stone-100 pb-3">
                <h3 className="text-lg font-black text-[#0d3b2e]">
                  খাদেম ও প্রধান সমন্বয়কারীর তথ্য
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-5 rounded-2xl border border-[#0d3b2e]/10 bg-[#f3f8f5] p-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    খাদেমের নাম
                  </label>
                  <select
                    name="khademName"
                    value={form.khademName}
                    disabled={!form.district}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">
                      খাদেম নির্বাচন করুন...
                    </option>
                    {khademOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>
                    প্রধান সমন্বয়কারীর নাম
                  </label>
                  <select
                    name="coordinatorName"
                    value={form.coordinatorName}
                    disabled={!form.division}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">
                      সমন্বয়কারী নির্বাচন করুন...
                    </option>
                    {coordinatorOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>
            <section>
              <div className="mb-5 border-b border-stone-100 pb-3">
                <h3 className="text-lg font-black text-[#0d3b2e]">
                  অন্যান্য তথ্য
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className={labelClass}>
                    ধর্ম
                  </label>
                  <input
                    name="religion"
                    value={form.religion}
                    onChange={handleChange}
                    placeholder="যেমন: ইসলাম"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    রক্তের গ্রুপ
                  </label>
                  <input
                    name="bloodGroup"
                    value={form.bloodGroup}
                    onChange={handleChange}
                    placeholder="যেমন: B+"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    পেশা
                  </label>
                  <input
                    name="profession"
                    value={form.profession}
                    onChange={handleChange}
                    placeholder="পেশা লিখুন"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    জাতীয়তা
                  </label>
                  <input
                    name="nationality"
                    value={form.nationality}
                    onChange={handleChange}
                    placeholder="জাতীয়তা"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    ই-মেইল
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    যোগাযোগের নম্বর
                  </label>
                  <input
                    type="tel"
                    name="contactNo"
                    value={form.contactNo}
                    onChange={handleChange}
                    placeholder="০১৭xxxxxxxx"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    পাসওয়ার্ড
                  </label>
                  <div className="relative">
                    <input
                      required
                      minLength={6}
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="কমপক্ষে ৬ অক্ষর"
                      className={`${inputClass} pr-16`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#0d3b2e]"
                    >
                      {showPassword
                        ? "লুকান"
                        : "দেখুন"}
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="mb-5 border-b border-stone-100 pb-3">
                <h3 className="text-lg font-black text-[#0d3b2e]">
                  পরিচয়পত্র
                </h3>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-5">
                <div className="flex flex-wrap gap-3">
                  {[
                    ["NID", "জাতীয় পরিচয় পত্র (NID)"],
                    ["BRN", "জন্ম নিবন্ধন (BRN)"],
                    ["PPN", "পাসপোর্ট নং (PPN)"],
                  ].map(([value, label]) => (
                    <label
                      key={value}
                      className="flex cursor-pointer items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold transition hover:border-[#0d3b2e]"
                    >
                      <input
                        type="radio"
                        name="idType"
                        value={value}
                        checked={form.idType === value}
                        onChange={handleChange}
                        className="accent-[#0d3b2e]"
                      />
                      {label}
                    </label>
                  ))}
                </div>
                {form.idType && (
                  <div className="mt-5">
                    <label className={labelClass}>
                      পরিচয়পত্র নম্বর
                    </label>
                    <input
                      name="idNumber"
                      value={
                        Array.isArray(form.idNumber)
                          ? form.idNumber.join("")
                          : form.idNumber
                      }
                      onChange={handleChange}
                      placeholder="পরিচয়পত্র নম্বর লিখুন"
                      className={inputClass}
                    />
                  </div>
                )}
              </div>
            </section>
            <section>
              <div className="mb-5 border-b border-stone-100 pb-3">
                <h3 className="text-lg font-black text-[#0d3b2e]">
                  ব্যক্তিগত অবস্থা
                </h3>
              </div>
              <div className="space-y-5">
                <div>
                  <p className={labelClass}>
                    লিঙ্গ
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={form.gender === "male"}
                        onChange={handleChange}
                        className="accent-[#0d3b2e]"
                      />
                      পুরুষ
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={form.gender === "female"}
                        onChange={handleChange}
                        className="accent-[#0d3b2e]"
                      />
                      মহিলা
                    </label>
                  </div>
                </div>
                <div>
                  <p className={labelClass}>
                    বৈবাহিক অবস্থা
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold">
                      <input
                        type="radio"
                        name="maritalStatus"
                        value="married"
                        checked={
                          form.maritalStatus === "married"
                        }
                        onChange={handleChange}
                        className="accent-[#0d3b2e]"
                      />
                      বিবাহিত
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold">
                      <input
                        type="radio"
                        name="maritalStatus"
                        value="unmarried"
                        checked={
                          form.maritalStatus === "unmarried"
                        }
                        onChange={handleChange}
                        className="accent-[#0d3b2e]"
                      />
                      অবিবাহিত
                    </label>
                  </div>
                </div>
                <div className="grid max-w-md grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      পুত্র
                    </label>
                    <input
                      type="number"
                      min={0}
                      name="sonCount"
                      value={form.sonCount}
                      onChange={handleChange}
                      placeholder="সংখ্যা"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      কন্যা
                    </label>
                    <input
                      type="number"
                      min={0}
                      name="daughterCount"
                      value={form.daughterCount}
                      onChange={handleChange}
                      placeholder="সংখ্যা"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    ["widow", "বিধবা"],
                    ["widower", "বিপত্নীক"],
                    ["divorced", "তালাকপ্রাপ্ত"],
                    ["passedAway", "ইন্তেকাল প্রাপ্ত"],
                    ["securityVolunteer", "নিরাপত্তা কর্মী"],
                  ].map(([name, label]) => (
                    <label
                      key={name}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-stone-200 bg-white p-3 text-sm font-semibold"
                    >
                      <input
                        type="checkbox"
                        name={name}
                        checked={
                          Boolean(
                            form[
                            name as keyof FormState
                            ]
                          )
                        }
                        onChange={handleChange}
                        className="h-4 w-4 accent-[#0d3b2e]"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            </section>
            <section>
              <div className="mb-5 border-b border-stone-100 pb-3">
                <h3 className="text-lg font-black text-[#0d3b2e]">
                  শিক্ষাগত যোগ্যতা
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  ["underSSC", "এসএসসি-র নিচে"],
                  ["SSC", "এসএসসি"],
                  ["HSC", "এইচএসসি"],
                  ["bachelors", "ব্যাচেলর"],
                  ["masters", "মাস্টার্স"],
                  ["doctorate", "ডক্টরেট"],
                ].map(([value, label]) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold"
                  >
                    <input
                      type="radio"
                      name="education"
                      value={value}
                      checked={
                        form.education === value
                      }
                      onChange={handleChange}
                      className="accent-[#0d3b2e]"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </section>
            <section>
              <div className="mb-5 border-b border-stone-100 pb-3">
                <h3 className="text-lg font-black text-[#0d3b2e]">
                  নেসবত
                </h3>
              </div>
              <div className="space-y-4">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-stone-200 bg-white p-3 text-sm font-semibold">
                  <input
                    type="checkbox"
                    name="followerMozammel"
                    checked={form.followerMozammel}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#0d3b2e]"
                  />
                  খাজা মোজাম্মেল হক (রঃ) এর মুরিদ
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-stone-200 bg-white p-3 text-sm font-semibold">
                  <input
                    type="checkbox"
                    name="followerYunus"
                    checked={form.followerYunus}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#0d3b2e]"
                  />
                  খাজা ইউনুস আলী (রঃ) এর নেসবত ভুক্ত
                </label>
                <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-stone-200 bg-white p-3 text-sm font-semibold">
                    <input
                      type="checkbox"
                      name="otherNesbot"
                      checked={form.otherNesbot}
                      onChange={handleChange}
                      className="h-4 w-4 accent-[#0d3b2e]"
                    />
                    অন্য নেসবত
                  </label>
                  {form.otherNesbot && (
                    <input
                      name="otherNesbotDetail"
                      value={form.otherNesbotDetail}
                      onChange={handleChange}
                      placeholder="বিস্তারিত লিখুন..."
                      className={inputClass}
                    />
                  )}
                </div>
                <div className="max-w-sm">
                  <label className={labelClass}>
                    বায়াত গ্রহণের তারিখ
                  </label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={form.joiningDate}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </section>
            <section>
              <div className="mb-5 border-b border-stone-100 pb-3">
                <h3 className="text-lg font-black text-[#0d3b2e]">
                  ছাদকায়ে জারিয়া
                </h3>
              </div>
              <div className="rounded-2xl border border-[#d8b766]/40 bg-gradient-to-br from-[#fffaf0] to-amber-50 p-5 sm:p-6">
                <label className="flex cursor-pointer items-center gap-3 text-sm font-bold text-[#0d3b2e]">
                  <input
                    type="checkbox"
                    name="joinSadka"
                    checked={form.joinSadka}
                    onChange={handleChange}
                    className="h-5 w-5 accent-[#0d3b2e]"
                  />
                  ছাদকায়ে জারিয়ায় অন্তর্ভুক্তির জন্য
                </label>
                <p className="mt-4 rounded-xl bg-white/70 p-4 text-xs font-medium leading-6 text-[#0d3b2e] sm:text-sm">
                  আমি খাজা মোজাম্মেল হক (রঃ) ফাউন্ডেশনে স্বইচ্ছায় এবারতের
                  নিয়তে খাদেম/সহযোগী খাদেমের নিকট ছাদকায়ে জারিয়া
                  নিয়মিত প্রদান করবো, এই মর্মে অন্তর্ভুক্ত হইলাম।
                </p>
              </div>
            </section>
            <div className="border-t border-stone-100 pt-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-stone-500">
                  জমা দেওয়ার আগে আপনার দেওয়া তথ্যগুলো একবার যাচাই করে নিন।
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#0d3b2e] px-8 text-sm font-bold text-white shadow-lg transition hover:bg-[#153f32] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {submitting
                    ? "সংরক্ষণ হচ্ছে..."
                    : "নিবন্ধন জমা দিন →"}
                </button>
              </div>
            </div>
          </div>
        </form>
        <footer className="py-6 text-center text-[11px] text-stone-400">
          খাজা মোজাম্মেল হক (রঃ) ফাউন্ডেশন • নিবন্ধন পোর্টাল
        </footer>
      </div>
    </main>
  );
}