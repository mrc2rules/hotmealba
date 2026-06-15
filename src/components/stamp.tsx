import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Postage-stamp card with perforated edges. */
export function Stamp({
  children,
  className,
  tilt = 0,
  tone = "cream",
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
  tone?: "cream" | "sienna" | "teal" | "ochre";
}) {
  const toneBg = {
    cream: "bg-card text-ink",
    sienna: "bg-sienna text-paper",
    teal: "bg-teal text-paper",
    ochre: "bg-ochre text-ink",
  }[tone];
  // Perforated edge via radial dots positioned ONLY along the perimeter.
  // Using mask-image for cleaner edge perforation that won't clip text
  const perforation = {
    position: "relative" as const,
  } as React.CSSProperties;
  return (
    <div
      style={{ transform: `rotate(${tilt}deg)` }}
      className={cn(
        "relative transition-transform duration-300 hover:rotate-0 hover:-translate-y-1",
        className,
      )}
    >
      <div
        className={cn("relative p-5 shadow-[0_12px_28px_-14px_rgba(40,30,15,0.55)] border border-ink/15", toneBg)}
      >
        {/* Perforation dots using pseudo-elements positioned at corners */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {/* Top edge perforation */}
          <div className="absolute top-0 left-0 right-0 h-3 flex justify-around">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={`top-${i}`} className="w-1.5 h-1.5 rounded-full bg-paper/80" style={{ marginTop: '-2px' }} />
            ))}
          </div>
          {/* Bottom edge perforation */}
          <div className="absolute bottom-0 left-0 right-0 h-3 flex justify-around">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={`bottom-${i}`} className="w-1.5 h-1.5 rounded-full bg-paper/80" style={{ marginBottom: '-2px' }} />
            ))}
          </div>
          {/* Left edge perforation */}
          <div className="absolute top-0 bottom-0 left-0 w-3 flex flex-col justify-around">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={`left-${i}`} className="w-1.5 h-1.5 rounded-full bg-paper/80" style={{ marginLeft: '-2px' }} />
            ))}
          </div>
          {/* Right edge perforation */}
          <div className="absolute top-0 bottom-0 right-0 w-3 flex flex-col justify-around">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={`right-${i}`} className="w-1.5 h-1.5 rounded-full bg-paper/80" style={{ marginRight: '-2px' }} />
            ))}
          </div>
        </div>
        <div className="px-1 py-1 relative z-10">{children}</div>
      </div>
    </div>
  );
}


export function SectionHeading({
  eyebrow,
  title,
  script,
  className,
}: {
  eyebrow?: string;
  title: string;
  script?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 text-center", className)}>
      {eyebrow && (
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-sienna/80 mb-2">
          — {eyebrow} —
        </div>
      )}
      <h2 className="font-display text-4xl md:text-5xl text-ink">
        {script && <span className="font-script text-sienna text-3xl md:text-4xl mr-2 italic">{script}</span>}
        {title}
      </h2>
      <div className="mx-auto mt-3 h-px w-24 bg-ink/40" />
    </div>
  );
}
