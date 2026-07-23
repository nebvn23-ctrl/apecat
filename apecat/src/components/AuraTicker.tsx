"use client";

import { HERO } from "@/config/apecat";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AuraTicker() {
  const reduced = useReducedMotion();
  const text = HERO.ticker;

  return (
    <div className="relative overflow-hidden border-y-[3px] border-gold bg-ink py-3">
      <div
        className={`flex whitespace-nowrap font-mono text-xs font-bold tracking-[0.24em] text-toxic sm:text-sm ${
          reduced ? "" : "animate-marquee"
        }`}
      >
        <span className="px-4">{text.repeat(3)}</span>
        <span className="px-4" aria-hidden="true">
          {text.repeat(3)}
        </span>
      </div>
    </div>
  );
}
