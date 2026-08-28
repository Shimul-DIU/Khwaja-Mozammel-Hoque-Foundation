
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("ইমেইল প্রদান করুন।");
      return;
    }

    if (!password) {
      setError("পাসওয়ার্ড প্রদান করুন।");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post(
        "/api/auth/loginDevotee",
        {
          email: email.trim(),
          password,
        }
      );

      console.log("Login response:", response.data);

      if (response.data?.success) {
        router.push("/dashboard");
      } else {
        setError(
          response.data?.message ||
          "লগইন করা সম্ভব হয়নি।"
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      setError(
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f5ef] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="rounded-2xl bg-white p-7 shadow-[0_15px_50px_rgba(0,0,0,0.08)] sm:p-9">

          <div className="mb-7 ">
            <div className="flex justify-center">
              <Image
                src="/logo.png"
                alt="KMRF Logo"
                width={80}
                height={80}
              />
            </div>
            <p className="mt-1 roboto-slab  text-lg sm:text-2xl flex justify-center font-semibold">
              KMRF
            </p>
            <p className=" text-base flex justify-center text-gray-500"> আপনার অ্যাকাউন্টে লগইন করুন </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block  font-medium text-gray-700"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="example@email.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#123d2a] focus:bg-white focus:ring-2 focus:ring-[#123d2a]/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block  font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="আপনার পাসওয়ার্ড দিন"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition focus:border-[#123d2a] focus:bg-white focus:ring-2 focus:ring-[#123d2a]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#123d2a]"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  router.push("/forgot-password")
                }
                className="text-sm font-medium text-[#123d2a] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#123d2a] py-3.5 font-semibold text-white shadow-md transition hover:bg-[#0d3021] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-7 border-t border-gray-100 pt-6 text-center">
            <p className="text-xs text-gray-500">
              KMRF Management System
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Secure access for authorized users
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

