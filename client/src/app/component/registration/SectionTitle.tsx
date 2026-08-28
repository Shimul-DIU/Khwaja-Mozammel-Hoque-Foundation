import type { ElementType } from "react";

// ---------------------------------------------------------------------------
// Section Title — icon + heading + divider line used between form sections
// ---------------------------------------------------------------------------

export function SectionTitle({
  title,
  icon: Icon,
}: {
  title: string;
  icon: ElementType;
}) {
  return (
    <div className="mb-6 mt-10 flex items-center gap-3 first:mt-0">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0d3b2e]/10 text-[#0d3b2e]">
        <Icon size={16} strokeWidth={2.2} />
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#0d3b2e]">
          {title}
        </h2>
      </div>

      <div className="h-px flex-1 bg-gradient-to-r from-[#d8b766]/50 to-transparent" />
    </div>
  );
}
