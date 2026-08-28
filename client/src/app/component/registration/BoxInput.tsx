"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// Box Input — segmented one-character-per-box input (used for date/id boxes)
// ---------------------------------------------------------------------------

export function BoxInput({
  values,
  onChange,
  count,
  groupSizes,
}: {
  values: string[];
  onChange: (next: string[]) => void;
  count: number;
  groupSizes?: number[];
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, val: string) => {
    const char = val.slice(-1);

    const next = [...values];

    next[i] = char;

    onChange(next);

    if (char && i < count - 1) {
      refs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const boxes = Array.from({ length: count }, (_, i) => (
    <input
      key={i}
      ref={(el) => {
        refs.current[i] = el;
      }}
      value={values[i] ?? ""}
      onChange={(e) => handleChange(i, e.target.value)}
      onKeyDown={(e) => handleKeyDown(i, e)}
      maxLength={1}
      inputMode="text"
      className="h-11 w-9 rounded-xl border border-stone-200 bg-white text-center text-sm font-bold text-stone-800 shadow-sm outline-none transition hover:border-[#0d3b2e]/40 focus:border-[#0d3b2e] focus:bg-[#fffcf5] focus:ring-4 focus:ring-[#d8b766]/15 sm:w-10"
    />
  ));

  if (!groupSizes) {
    return <div className="flex flex-wrap gap-1.5">{boxes}</div>;
  }

  const grouped: ReactNode[] = [];

  let idx = 0;

  groupSizes.forEach((size, gi) => {
    grouped.push(
      <div key={`g-${gi}`} className="flex gap-1.5">
        {boxes.slice(idx, idx + size)}
      </div>
    );

    idx += size;

    if (gi < groupSizes.length - 1) {
      grouped.push(
        <span
          key={`sep-${gi}`}
          className="mx-1 self-center font-bold text-[#0d3b2e]"
        >
          /
        </span>
      );
    }
  });

  return <div className="flex flex-wrap items-center gap-1.5">{grouped}</div>;
}
