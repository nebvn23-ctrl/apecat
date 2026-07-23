"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FINAL, FOOTER, MEDIA, LINKS, isLiveLink } from "@/config/apecat";
import { Fireflies } from "./Fireflies";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { spawnRipple, FX_BTN } from "@/lib/fx";

export function FinalSection({ onReplay }: { onReplay: () => void }) {
  const reduced = useReducedMotion();
  const [tilt, setTilt] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // one small delayed head-tilt illusion
  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => {
      setTilt(true);
      setTimeout(() => setTilt(false), 900);
    }, 3200);
    return () => clearTimeout(t);
  }, [reduced]);

  // subtle parallax on the field backdrop
  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      const sec = sectionRef.current;
      const bg = bgRef.current;
      if (!sec || !bg) return;
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.top < vh && r.bottom > 0) {
        const progress = (vh - r.top) / (vh + r.height);
        bg.style.transform = `translateY(${(progress - 0.5) * 30}px) scale(1.08)`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  const buyLive = isLiveLink(LINKS.buy);
  const communityLive = isLiveLink(LINKS.telegram);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[linear-gradient(to_bottom,#F0B03C_0%,#C9702A_45%,#8C3A22_100%)] px-5 py-24 text-center sm:px-8 sm:py-32"
    >
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={MEDIA.originalField}
          alt="Apecat in a sunrise-lit grass field, reaching toward the camera."
          fill
          sizes="100vw"
          className={`object-cover object-[center_30%] opacity-[0.28] mix-blend-multiply transition-transform duration-[900ms] ${
            tilt ? "scale-[1.03] -rotate-[0.6deg]" : "scale-100 rotate-0"
          }`}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />

      {/* pulsing sun */}
      {!reduced && (
        <div className="pointer-events-none absolute left-1/2 top-[30%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 animate-sunPulse rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.35),rgba(255,255,255,0)_68%)]" />
      )}

      <Fireflies count={7} color="#F3F0E8" />

      <div className="relative mx-auto max-w-2xl text-ink">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-0.5 font-mono text-xs font-bold tracking-[0.18em] text-ink/75 sm:text-sm"
        >
          {FINAL.lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-5 font-display text-4xl leading-tight text-ink drop-shadow-[3px_3px_0_#F3F0E8] sm:text-6xl"
          style={{ WebkitTextStroke: "1px #F3F0E8", paintOrder: "stroke fill" }}
        >
          {FINAL.statement}
        </motion.h2>

        <p className="mt-4 text-sm italic text-ink/75 sm:text-base">
          {FINAL.sub[0]} {FINAL.sub[1]} {FINAL.sub[2]}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {buyLive ? (
            <a
              href={LINKS.buy}
              onClick={spawnRipple}
              className={`${FX_BTN} bg-ink px-7 py-3.5 font-mono text-xs font-bold tracking-[0.16em] text-toxic shadow-[4px_4px_0_rgba(16,17,14,0.35)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 sm:text-sm`}
            >
              {FINAL.ctaPrimary}
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="cursor-not-allowed bg-ink/40 px-7 py-3.5 font-mono text-xs font-bold tracking-[0.16em] text-cream/70 sm:text-sm"
            >
              {FINAL.ctaPrimary} · COMING SOON
            </button>
          )}

          {communityLive ? (
            <a
              href={LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={spawnRipple}
              className={`${FX_BTN} border-2 border-ink bg-cream px-7 py-3.5 font-mono text-xs font-bold tracking-[0.16em] text-ink transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 sm:text-sm`}
            >
              {FINAL.ctaSecondary}
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="cursor-not-allowed border-2 border-ink/30 px-7 py-3.5 font-mono text-xs font-bold tracking-[0.16em] text-ink/50 sm:text-sm"
            >
              {FINAL.ctaSecondary} · COMING SOON
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              spawnRipple(e);
              onReplay();
            }}
            className={`${FX_BTN} px-7 py-3.5 font-mono text-xs font-bold tracking-[0.16em] text-ink/70 underline decoration-dotted underline-offset-4 transition-colors hover:text-ink sm:text-sm`}
          >
            {FINAL.ctaReplay}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative mx-auto mt-20 max-w-2xl border-t-2 border-dashed border-ink/30 pt-7 text-ink/65">
        <p className="mx-auto max-w-md text-center font-mono text-[11px] leading-relaxed">
          {FOOTER.disclaimer}
        </p>
      </footer>
    </section>
  );
}
