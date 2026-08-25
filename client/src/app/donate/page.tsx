import Link from "next/link";

export default function DonatePage() {
  return (
    <InformationPage
      title="Support the Foundation"
      description="Your contribution helps us continue community welfare, education, and health support programs."
      actionLabel="Register with us"
      actionHref="/registration"
    />
  );
}

function InformationPage({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}) {
  return (
    <main className="min-h-[70vh] bg-[#f7f5f0] px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-center shadow-lg sm:p-14">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#008a4b]">KMRF</p>
        <h1 className="text-3xl font-bold text-[#173f35] sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-600">{description}</p>
        <Link href={actionHref} className="mt-8 inline-flex rounded-lg bg-[#008a4b] px-6 py-3 font-semibold text-white transition hover:bg-[#006f3d]">
          {actionLabel}
        </Link>
      </div>
    </main>
  );
}