import type { InputHTMLAttributes } from "react";

// ---------------------------------------------------------------------------
// Text Input
// ---------------------------------------------------------------------------

export const inputClass =
  "w-full rounded-xl border border-amber-900/15 bg-amber-50/20 px-3.5 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#0d3b2e] focus:bg-white focus:ring-4 focus:ring-[#d8b766]/15 shadow-sm hover:border-[#0d3b2e]/30 disabled:bg-stone-100 disabled:cursor-not-allowed";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} className={`${inputClass} ${props.className ?? ""}`} />
  );
}

// ---------------------------------------------------------------------------
// Select Input
// ---------------------------------------------------------------------------

export function SelectInput({
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
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`min-h-11 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2.5 text-sm text-stone-900 shadow-sm outline-none transition hover:border-[#0d3b2e]/30 focus:border-[#0d3b2e] focus:bg-white focus:ring-4 focus:ring-[#d8b766]/15 disabled:cursor-not-allowed disabled:bg-stone-100 ${className}`}
    >
      <option value="">{placeholder || "নির্বাচন করুন..."}</option>

      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
