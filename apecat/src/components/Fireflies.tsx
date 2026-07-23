"use client";

import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type FirefliesProps = {
  count?: number;
  className?: string;
  color?: string;
};

/**
 * A handful of soft drifting motes — the one ambient-motion signature used
 * across the field-lit sections (hero + final CTA). Deliberately sparse:
 * this is atmosphere, not a particle-system centerpiece.
 */
export function Fireflies({ count = 10, className = "", color = "#DCFF2C" }: FirefliesProps) {
  const reduced = useReducedMotion();

  const motes = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: `${(i * 137.5) % 100}%`,
        top: `${8 + ((i * 71) % 80)}%`,
        size: 2 + (i % 3),
        delay: `${(i * 0.9) % 6}s`,
        duration: `${7 + (i % 5)}s`,
        opacity: 0.25 + (i % 4) * 0.12,
      })),
    [count]
  );

  if (reduced) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {motes.map((m) => (
        <span
          key={m.id}
          className="absolute rounded-full animate-drift"
          style={{
            left: m.left,
            top: m.top,
            width: m.size,
            height: m.size,
            backgroundColor: color,
            opacity: m.opacity,
            boxShadow: `0 0 ${m.size * 3}px ${color}`,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </div>
  );
}
