import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Field — labeled wrapper around any input
// ---------------------------------------------------------------------------

export function Field({
  labelBn,
  children,
  className = "",
}: {
  labelBn: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-semibold tracking-wide text-stone-700 sm:text-sm">
        {labelBn}
      </span>

      {children}
    </label>
  );
}
