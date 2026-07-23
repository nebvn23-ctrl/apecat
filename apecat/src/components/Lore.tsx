"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  LORE_INTRO,
  LORE_TRENCHES,
  LORE_STATEMENT,
  LORE_EFFECT,
  LORE_FINAL,
  MEDIA,
} from "@/config/apecat";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Autoplaying, muted, looping transformation clip. Pauses when off-screen. */
function TransformVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  return (
    <div className="relative my-7 mx-1 rotate-[0.6deg] overflow-hidden border-[3px] border-ink bg-black shadow-[8px_8px_0_rgba(61,107,44,0.35)]">
      <video
        ref={ref}
        autoPlay={!reduced}
        muted
        loop
        playsInline
        preload="metadata"
        className="block max-h-[340px] w-full object-cover"
      >
        <source src={MEDIA.transformWebm} type="video/webm" />
        <source src={MEDIA.transformMp4} type="video/mp4" />
      </video>
      <span className="absolute bottom-2 right-2.5 rotate-[-2deg] bg-cream/90 px-2.5 py-0.5 font-marker text-[13px] text-ink">
        the only known footage
      </span>
    </div>
  );
}

export function Lore() {
  return (
    <section id="lore" className="relative bg-cream px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-3xl">
        {/* Block 1 */}
        <Reveal>
          <span className="font-mono text-xs font-bold tracking-[0.25em] text-grass">01 / ORIGIN</span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">
            {LORE_INTRO.heading}
          </h2>
          <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            {LORE_INTRO.blocks.map((p, i) => (
              <p key={i}>
                {p}
                {i === 1 && (
                  <span className="ml-1.5 inline-block animate-noteWiggle font-marker text-[15px] text-rust">
                    ‡ true story
                  </span>
                )}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <TransformVideo />
        </Reveal>

        <Reveal className="relative my-7 mx-1 -rotate-[1.2deg] border-2 border-ink bg-paper p-6 shadow-[6px_6px_0_rgba(16,17,14,0.15)] sm:p-7">
          <span className="absolute -top-2.5 left-7 h-5 w-14 -rotate-[4deg] bg-cream/55" />
          <p className="font-display text-xl leading-snug text-ink sm:text-2xl">
            {LORE_INTRO.statement[0]}
            <br />
            {LORE_INTRO.statement[1]}
            <br />
            {LORE_INTRO.statement[2]}
          </p>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap gap-2">
          {LORE_INTRO.traits.map((trait) => (
            <span
              key={trait}
              className="rounded-full border border-ink/20 px-3 py-1.5 font-mono text-xs tracking-wide text-ink/70"
            >
              {trait}
            </span>
          ))}
        </Reveal>

        <Reveal className="mt-8 space-y-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
          {LORE_INTRO.closing.map((p, i) => (
            <p key={i} className={i === LORE_INTRO.closing.length - 1 ? "font-bold text-ink" : ""}>
              {p}
            </p>
          ))}
        </Reveal>

        {/* Block 2 */}
        <Reveal className="mt-16 border-t border-ink/10 pt-14 sm:mt-20 sm:pt-16">
          <span className="font-mono text-xs font-bold tracking-[0.25em] text-grass">
            02 / THE TRENCHES
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">
            {LORE_TRENCHES.heading}
          </h2>
          <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            {LORE_TRENCHES.blocks.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        {/* Big typographic statement */}
        <Reveal className="my-16 text-center sm:my-20">
          <p className="font-display text-[28px] leading-[1.05] text-ink sm:text-5xl">
            {LORE_STATEMENT[0]}
            <br />
            {LORE_STATEMENT[1]}
            <br />
            <span className="text-gold-deep">{LORE_STATEMENT[2]}</span>
          </p>
        </Reveal>

        {/* Block 3 */}
        <Reveal>
          <span className="font-mono text-xs font-bold tracking-[0.25em] text-grass">
            03 / THE EFFECT
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">
            {LORE_EFFECT.heading}
          </h2>
          <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            {LORE_EFFECT.blocks.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        {/* Block 4 — closing */}
        <Reveal className="mt-16 border-l-[5px] border-gold bg-gradient-to-br from-grass-deep to-grass-deeper p-7 text-cream sm:mt-20 sm:p-9">
          <span className="font-mono text-xs font-bold tracking-[0.25em] text-toxic">
            04 / THE NEW META
          </span>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">{LORE_FINAL.heading}</h2>
          <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-cream/80 sm:text-base">
            {LORE_FINAL.blocks.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-5 font-display text-lg leading-snug text-toxic sm:text-xl">
            {LORE_FINAL.statement.join(" ")}
          </p>
          <p className="mt-4 font-bold">{LORE_FINAL.closing}</p>
          <p className="mt-2 font-mono text-xs italic text-cream/55">{LORE_FINAL.disclaimer}</p>
        </Reveal>
      </div>
    </section>
  );
}
