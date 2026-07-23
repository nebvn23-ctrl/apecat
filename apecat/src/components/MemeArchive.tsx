"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MEMES, MEME_ARCHIVE_COPY, MEDIA, type MemeEntry } from "@/config/apecat";
import { MemeModal } from "./MemeModal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function MemeArchive() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const peekY = useTransform(scrollYProgress, [0, 0.5, 1], [40, -18, 40]);
  const peekOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0, 1, 1, 1, 0]);

  const activeMeme: MemeEntry | null = MEMES.find((m) => m.id === openId) ?? null;

  const openMeme = (e: React.MouseEvent<HTMLButtonElement>, meme: MemeEntry) => {
    lastTrigger.current = e.currentTarget;
    setOpenId(meme.id);
  };

  return (
    <section
      id="memes"
      ref={sectionRef}
      className="relative overflow-hidden bg-[linear-gradient(135deg,#8a5a2e,#6b4322_55%,#5a3a1e)] px-4 pb-24 pt-20 sm:px-8 sm:pt-28"
    >
      {/* cork texture */}
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(0,0,0,0.18)_1.5px,transparent_1.5px)] [background-size:22px_22px]" />

      <div className="relative mx-auto max-w-6xl">
        <span className="bg-black/30 px-2.5 py-1 font-mono text-xs font-bold tracking-[0.25em] text-toxic">
          {MEME_ARCHIVE_COPY.eyebrow}
        </span>
        <span className="ml-2.5 inline-block -rotate-6 border-2 border-rust bg-cream/85 px-2.5 py-0.5 font-marker text-[13px] text-rust">
          CASE #049
        </span>
        <h2 className="mt-2 font-display text-4xl text-cream drop-shadow-[3px_3px_0_rgba(0,0,0,0.3)] sm:text-6xl">
          {MEME_ARCHIVE_COPY.title}
        </h2>

        <div className="relative mt-11">
          {/* red investigation strings */}
          <svg
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="8" y1="12" x2="55" y2="38" stroke="#9C3B2E" strokeWidth="0.3" opacity="0.6" />
            <line x1="55" y1="38" x2="92" y2="16" stroke="#9C3B2E" strokeWidth="0.3" opacity="0.6" />
            <line x1="20" y1="70" x2="70" y2="55" stroke="#9C3B2E" strokeWidth="0.3" opacity="0.5" />
          </svg>

          <div className="relative z-[2] flex flex-wrap justify-center gap-x-0.5 gap-y-1.5">
            {MEMES.map((meme, i) => (
              <motion.button
                key={meme.id}
                type="button"
                onClick={(e) => openMeme(e, meme)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                style={{ rotate: `${meme.rotate}deg` }}
                className={`group relative mx-1.5 my-3.5 w-[220px] max-w-[44vw] transition-transform duration-300 hover:z-20 hover:scale-105 hover:!rotate-0 focus-visible:z-20 focus-visible:!rotate-0 ${
                  i % 2 === 1 ? "sm:mt-8" : ""
                }`}
                aria-label={`Inspect meme: ${meme.label}`}
              >
                {/* pin */}
                <span className="absolute -top-2 left-1/2 z-[5] h-4 w-4 -translate-x-1/2 animate-pinPulse rounded-full bg-[radial-gradient(circle_at_35%_30%,#ff8a6b,#9C3B2E)] shadow-[0_3px_4px_rgba(0,0,0,0.4)]" />
                {/* tape */}
                <span
                  className={`absolute -top-2 z-[4] h-5 w-[52px] bg-cream/55 ${
                    i % 2 === 0 ? "-left-2.5 -rotate-[35deg]" : "-right-2.5 rotate-[35deg]"
                  }`}
                />

                <div
                  className={`origin-top bg-[#fbfaf5] p-2.5 pb-3.5 shadow-[0_10px_18px_rgba(0,0,0,0.35)] ${
                    reduced ? "" : "animate-cardSwing group-hover:[animation-play-state:paused]"
                  }`}
                  style={reduced ? undefined : { animationDuration: i % 2 === 1 ? "5.4s" : "4.5s" }}
                >
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={meme.src}
                      alt={meme.alt}
                      fill
                      loading={i < 2 ? undefined : "lazy"}
                      sizes="(max-width: 640px) 44vw, 220px"
                      className="object-cover saturate-[0.95] transition-transform duration-300 group-hover:scale-110 group-hover:saturate-[1.3]"
                    />
                  </div>
                  <span className="mt-2.5 block text-center font-marker text-[15px] leading-tight text-ink">
                    {meme.label}
                  </span>
                  <span className="absolute -bottom-2 -right-2 -rotate-[4deg] bg-toxic px-1.5 py-1 font-mono text-[9px] font-bold tracking-[0.08em] text-grass-deeper opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    INSPECT
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Peeking Apecat at the edge of the board */}
      <motion.div
        style={reduced ? undefined : { y: peekY, opacity: peekOpacity }}
        className="pointer-events-none absolute bottom-0 right-2 z-[6] w-24 drop-shadow-[4px_6px_8px_rgba(0,0,0,0.4)] sm:w-36 md:right-6 md:w-44"
        aria-hidden="true"
      >
        <Image src={MEDIA.peeking} alt="" width={300} height={300} className="h-auto w-full opacity-95" />
      </motion.div>

      <MemeModal meme={activeMeme} onClose={() => setOpenId(null)} returnFocusRef={lastTrigger} />
    </section>
  );
}
