"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Mail } from "lucide-react";
import axios from "axios";
import axiosInstance from "@/lib/axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/auth/forgotPassword", { email });
      setMessage(response.data?.message || "If an account exists, reset instructions will be sent shortly.");
    } catch (requestError) {
      setError((axios.isAxiosError(requestError) && requestError.response?.data?.message) || "Could not send the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f5ef] px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-7 shadow-[0_15px_50px_rgba(0,0,0,0.08)] sm:p-9">
        <div className="mb-7 text-center">
          <Image src="/logo.png" alt="KMRF Logo" width={72} height={72} className="mx-auto" />
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">Forgot password?</h1>
          <p className="mt-2 text-sm text-gray-500">Enter your account email and we’ll send a password reset link.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block font-medium text-gray-700">Email address</label>
            <div className="relative">
              <Mail size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input id="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="example@email.com" className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#123d2a] focus:bg-white focus:ring-2 focus:ring-[#123d2a]/10" />
            </div>
          </div>
          {message && <p role="status" className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-800">{message}</p>}
          {error && <p role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#123d2a] py-3.5 font-semibold text-white transition hover:bg-[#0d3021] disabled:opacity-60">
            {loading ? <><Loader2 size={19} className="animate-spin" /> Sending...</> : "Send reset link"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500"><Link href="/login" className="font-medium text-[#123d2a] hover:underline">Back to login</Link></p>
      </section>
    </main>
  );
}
