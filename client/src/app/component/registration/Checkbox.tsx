"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

// ---------------------------------------------------------------------------
// Checkbox — card-style toggle
// ---------------------------------------------------------------------------

export function Checkbox({
  checked,
  onChange,
  labelBn,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  labelBn: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex w-full cursor-pointer select-none items-center gap-3 rounded-xl border p-3.5 text-left transition ${checked
        ? "border-[#0d3b2e] bg-[#edf6f1] shadow-sm"
        : "border-stone-200 bg-white/50 hover:bg-stone-50"
        }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${checked
          ? "border-[#0d3b2e] bg-[#0d3b2e] text-white"
          : "border-stone-400 bg-white"
          }`}
      >
        {checked && (
          <FontAwesomeIcon icon={faCheck} className="text-[11px]" />
        )}
      </span>

      <span className="text-sm font-medium text-stone-800">{labelBn}</span>
    </button>
  );
}
