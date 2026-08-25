import Link from "next/link";

export default function ContactPage() {
  return <main className="min-h-[70vh] bg-[#f7f5f0] px-4 py-16 sm:px-8"><div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-center shadow-lg sm:p-14"><h1 className="text-3xl font-bold text-[#173f35] sm:text-5xl">Contact the Foundation</h1><p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-600">For program information, registration support, or donation details, please reach out to our team.</p><Link href="/registration" className="mt-8 inline-flex rounded-lg bg-[#008a4b] px-6 py-3 font-semibold text-white transition hover:bg-[#006f3d]">Register now</Link></div></main>;
}