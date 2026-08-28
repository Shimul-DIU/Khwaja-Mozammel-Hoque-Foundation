import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Radio Pill — single-select pill button (used for gender/marital/education/id-type)
// ---------------------------------------------------------------------------

export function RadioPill({
  checked,
  onClick,
  children,
}: {
  checked: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-2.5 text-xs font-semibold shadow-sm transition sm:text-sm ${checked
        ? "border-[#0d3b2e] bg-[#0d3b2e] text-white shadow-[#0d3b2e]/20"
        : "border-stone-200 bg-white text-stone-700 hover:border-[#d8b766] hover:bg-amber-50/50"
        }`}
    >
      {children}
    </button>
  );
}
