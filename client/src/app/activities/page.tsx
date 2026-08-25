import Link from "next/link";

export default function ActivitiesPage() {
  return <ContentPage title="All Activities" description="Explore the foundation's ongoing welfare and community initiatives." href="/sadka-e-zaria" label="Explore programs" />;
}

function ContentPage({ title, description, href, label }: { title: string; description: string; href: string; label: string }) {
  return (
    <main className="min-h-[70vh] bg-[#f7f5f0] px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-center shadow-lg sm:p-14">
        <h1 className="text-3xl font-bold text-[#173f35] sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-600">{description}</p>
        <Link href={href} className="mt-8 inline-flex rounded-lg bg-[#008a4b] px-6 py-3 font-semibold text-white transition hover:bg-[#006f3d]">{label}</Link>
      </div>
    </main>
  );
}