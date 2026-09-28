"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import axios from "axios";
import axiosInstance from "@/lib/axios";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    setLoading(true);
    try {
      await axiosInstance.post("/api/auth/resetPassword", { token, password });
      router.replace("/login?passwordReset=1");
    } catch (requestError) {
      setError((axios.isAxiosError(requestError) && requestError.response?.data?.message) || "Could not reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f5ef] px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-7 shadow-[0_15px_50px_rgba(0,0,0,0.08)] sm:p-9">
        <h1 className="text-center text-2xl font-semibold text-gray-900">Set a new password</h1>
        <p className="mb-7 mt-2 text-center text-sm text-gray-500">Choose a new password for your account.</p>
        {!token ? <div className="text-center text-sm text-red-600">This reset link is invalid or incomplete. <Link href="/forgot-password" className="font-medium underline">Request another link</Link>.</div> : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="password" className="mb-2 block font-medium text-gray-700">New password</label>
              <div className="relative"><Lock size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input id="password" type="password" minLength={6} required autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none focus:border-[#123d2a] focus:bg-white focus:ring-2 focus:ring-[#123d2a]/10" /></div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="mb-2 block font-medium text-gray-700">Confirm password</label>
              <div className="relative"><Lock size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input id="confirmPassword" type="password" minLength={6} required autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none focus:border-[#123d2a] focus:bg-white focus:ring-2 focus:ring-[#123d2a]/10" /></div>
            </div>
            {error && <p role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#123d2a] py-3.5 font-semibold text-white transition hover:bg-[#0d3021] disabled:opacity-60">{loading ? <><Loader2 size={19} className="animate-spin" /> Updating...</> : "Update password"}</button>
          </form>
        )}
      </section>
    </main>
  );
}

export default function ResetPasswordPage() {
  return <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-[#f7f5ef] text-gray-500">Loading...</main>}><ResetPasswordForm /></Suspense>;
}
