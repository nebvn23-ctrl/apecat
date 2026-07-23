"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HERO, MEDIA, LINKS, isLiveLink } from "@/config/apecat";
import { AuraTicker } from "./AuraTicker";
import { Fireflies } from "./Fireflies";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { spawnRipple, FX_BTN } from "@/lib/fx";

const LEFT_LETTERS = [
  { ch: "A", r: -5 },
  { ch: "P", r: 4 },
  { ch: "E", r: -3 },
];
const RIGHT_LETTERS = [
  { ch: "C", r: 4 },
  { ch: "A", r: -4 },
  { ch: "T", r: 3 },
];

export function Hero() {
  const reduced = useReducedMotion();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return;
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const bounds = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - bounds.left) / bounds.width - 0.5;
        const py = (e.clientY - bounds.top) / bounds.height - 0.5;
        setTilt({ x: px * 10, y: py * 8 });

        if (buttonRef.current) {
          const b = buttonRef.current.getBoundingClientRect();
          const cx = b.left + b.width / 2;
          const cy = b.top + b.height / 2;
          const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
          setNear(dist < 240);
        }
      });
    },
    [reduced]
  );

  const buyLive = isLiveLink(LINKS.buy);

  return (
    <section
      id="top"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setNear(false)}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-gradient-to-b from-[#fbe3a8] via-[#F3F0E8] to-[#dcecc0]"
      style={{ paddingTop: "var(--header-h)", ["--char-w" as string]: "min(34vw, 250px)" }}
    >
      <Fireflies count={8} className="z-[1]" />

      {/* sunrise glow */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,176,60,0.55),rgba(240,176,60,0)_70%)] blur-[40px]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-5 sm:px-8">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-2 font-mono text-[11px] font-bold tracking-[0.25em] text-sunset sm:text-xs"
        >
          {HERO.eyebrow}
        </motion.p>

        {/* Layered wordmark + character */}
        <div className="relative mt-2 flex w-full flex-1 items-center justify-center">
          {/* Big background wordmark, split into two halves with a gap sized
              to always exceed the character's rendered width — this guarantees
              no letter is ever covered, at any viewport size. */}
          <div
            className="pointer-events-none absolute bottom-[14%] z-0 flex w-full select-none items-center justify-center"
            style={{ gap: "calc(var(--char-w) + 30px)" }}
          >
            <span className="flex font-wordmark text-[min(15vw,150px)] leading-[0.9] text-gold-deep">
              {LEFT_LETTERS.map((l, i) => (
                <motion.span
                  key={`l-${i}`}
                  initial={{ opacity: 0, y: 40, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.2, 0.8, 0.3, 1.1] }}
                  className={reduced ? "inline-block" : "inline-block animate-letterWiggle"}
                  style={{
                    WebkitTextStroke: "3px #10110E",
                    paintOrder: "stroke fill",
                    ["--r" as string]: `${l.r}deg`,
                  }}
                >
                  {l.ch}
                </motion.span>
              ))}
            </span>
            <span className="flex font-wordmark text-[min(15vw,150px)] leading-[0.9] text-toxic">
              {RIGHT_LETTERS.map((l, i) => (
                <motion.span
                  key={`r-${i}`}
                  initial={{ opacity: 0, y: 40, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: (i + 3) * 0.07, ease: [0.2, 0.8, 0.3, 1.1] }}
                  className={reduced ? "inline-block" : "inline-block animate-letterWiggle"}
                  style={{
                    WebkitTextStroke: "3px #10110E",
                    paintOrder: "stroke fill",
                    ["--r" as string]: `${l.r}deg`,
                  }}
                >
                  {l.ch}
                </motion.span>
              ))}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.3, 1] }}
            style={{
              width: "var(--char-w)",
              ...(reduced
                ? {}
                : {
                    transform: `rotate(${tilt.x * 0.15 + (near ? -1.5 : 0)}deg) translate(${tilt.x}px, ${tilt.y}px) scale(${near ? 1.02 : 1})`,
                    transition: "transform 300ms ease-out",
                  }),
            }}
            className={`relative z-10 min-w-0 ${reduced ? "" : "animate-breathe"}`}
          >
            <span className="absolute -right-2 -top-1 z-20 w-[86px] rotate-[11deg] rounded-full border-[3px] border-rust bg-cream/55 p-1.5 text-center font-marker text-sm leading-tight text-rust">
              100%
              <br />
              confused
            </span>
            <Image
              src={MEDIA.hero}
              alt="Apecat: a massive black gorilla-bodied creature with a tiny integrated cat face and huge pale yellow-green eyes, standing in a confused, confident pose."
              width={848}
              height={1055}
              priority
              sizes="(max-width: 640px) 34vw, 250px"
              className="h-auto w-full drop-shadow-[10px_18px_0_rgba(16,17,14,0.18)]"
            />
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative z-10 mt-4 text-center font-display text-3xl leading-[1] tracking-tight text-ink sm:text-5xl"
        >
          <p>{HERO.tagline[0]}</p>
          <p>{HERO.tagline[1]}</p>
          <p className="text-gold-deep">{HERO.tagline[2]}</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="relative z-10 mx-auto mt-4 max-w-md text-center text-sm italic text-ink/70 sm:text-base"
        >
          {HERO.supporting}
        </motion.p>

        {/* CTAs */}
        <motion.div
          id="buy"
          ref={buttonRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="relative z-10 mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          {buyLive ? (
            <a
              href={LINKS.buy}
              onClick={spawnRipple}
              className={`${FX_BTN} rounded-sm bg-ink px-7 py-3 font-mono text-xs font-bold tracking-[0.2em] text-toxic shadow-[4px_4px_0_#C9702A] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 sm:text-sm`}
            >
              {HERO.ctaPrimary}
            </a>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="Buy link not configured yet"
              className="cursor-not-allowed rounded-sm bg-ink/40 px-7 py-3 font-mono text-xs font-bold tracking-[0.2em] text-cream/70 sm:text-sm"
            >
              {HERO.ctaPrimary} · COMING SOON
            </button>
          )}
          <a
            href="#memes"
            onClick={spawnRipple}
            className={`${FX_BTN} rounded-sm border-2 border-ink bg-cream px-7 py-3 font-mono text-xs font-bold tracking-[0.2em] text-ink shadow-[4px_4px_0_#10110E] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 sm:text-sm`}
          >
            {HERO.ctaSecondary}
          </a>
        </motion.div>
      </div>

      <div className="relative z-10 mt-10">
        <AuraTicker />
      </div>
    </section>
  );
}
