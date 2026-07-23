"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SCANNER, MEDIA } from "@/config/apecat";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { spawnRipple, FX_BTN } from "@/lib/fx";

type Status = "idle" | "running" | "failed";

const SCRAMBLE_CHARS = "01%?#!ERR—";

export function IdentityScanner() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [shake, setShake] = useState(false);
  const [showPeek, setShowPeek] = useState(false);
  const [displayValues, setDisplayValues] = useState(SCANNER.values.map((v) => v.value));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runIdentification = (e: React.MouseEvent<HTMLButtonElement>) => {
    spawnRipple(e);
    if (status === "running") return;
    setStatus("running");
    setShowPeek(false);

    let ticks = 0;
    intervalRef.current = setInterval(() => {
      ticks += 1;
      setDisplayValues((prev) =>
        prev.map((_, i) =>
          Array.from({ length: 3 + (i % 3) })
            .map(() => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)])
            .join("")
        )
      );
      if (ticks >= 9) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayValues(SCANNER.values.map((v) => v.value));
        setStatus("failed");
        setShake(true);
        setTimeout(() => setShake(false), 400);
        setTimeout(() => setShowPeek(true), 400);
        setTimeout(() => setShowPeek(false), 3600);
      }
    }, 90);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const running = status === "running";

  return (
    <section
      id="scanner"
      className="relative bg-[radial-gradient(circle_at_30%_20%,#16240F,#0E1A0A_75%)] px-5 py-20 text-cream sm:px-8 sm:py-28"
    >
      <div className="relative mx-auto max-w-6xl">
        <div
          className={`grid gap-9 overflow-hidden rounded border border-gold/25 bg-black/20 p-6 sm:p-9 md:grid-cols-2 md:gap-14 ${
            shake ? "animate-[shake_0.3s_ease-in-out]" : ""
          } ${running && !reduced ? "animate-panelFlicker" : ""}`}
        >
          {/* Left: scanned image */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden border border-gold/40 bg-black/35">
            <Image
              src={MEDIA.hero}
              alt="Apecat under scan: full body, black fur, cat face, wide gorilla frame."
              fill
              sizes="(max-width: 768px) 90vw, 400px"
              className="object-contain object-bottom p-2"
            />

            {/* corner markers */}
            {[
              "top-2 left-2 border-l-2 border-t-2",
              "top-2 right-2 border-r-2 border-t-2",
              "bottom-2 left-2 border-l-2 border-b-2",
              "bottom-2 right-2 border-r-2 border-b-2",
            ].map((pos, i) => (
              <span key={i} className={`absolute h-5 w-5 border-gold ${pos}`} />
            ))}

            {/* rotating radar */}
            {!reduced && (
              <div className="absolute right-2.5 top-2.5 h-[34px] w-[34px] animate-spin rounded-full border border-dashed border-gold/60 [animation-duration:4s]">
                <div className="absolute inset-1.5 rounded-full border-t border-toxic" />
              </div>
            )}

            {/* scanner line */}
            {!reduced && (
              <div
                className={`pointer-events-none absolute inset-x-0 h-0.5 bg-toxic shadow-[0_0_14px_3px_rgba(220,255,44,0.9)] ${
                  running ? "animate-[scanline_0.5s_linear_infinite]" : "animate-scanline"
                }`}
              />
            )}

            {/* peeking cameo after failure */}
            <AnimatePresence>
              {showPeek && (
                <motion.div
                  initial={{ x: "110%", opacity: 0 }}
                  animate={{ x: "62%", opacity: 1 }}
                  exit={{ x: "110%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute bottom-0 right-0 w-1/2"
                >
                  <Image
                    src={MEDIA.peeking}
                    alt="Apecat peeking in from the side after the scan fails."
                    width={300}
                    height={300}
                    className="h-auto w-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: readout */}
          <div className="flex flex-col justify-center">
            <h2
              className={`font-display text-3xl text-gold sm:text-4xl ${
                running && !reduced ? "animate-glitchText" : ""
              }`}
            >
              {SCANNER.title}
            </h2>

            <dl className="mt-6 space-y-1 font-mono text-sm sm:text-base">
              {SCANNER.values.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border-b border-dashed border-gold/25 py-2.5"
                >
                  <dt className="tracking-[0.08em] text-cream/65">{item.label}</dt>
                  <dd className={`font-bold ${running ? "text-toxic/70" : "text-toxic"}`}>
                    {displayValues[i]}
                  </dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={runIdentification}
              disabled={running}
              className={`${FX_BTN} mt-8 w-fit bg-toxic px-7 py-3.5 font-mono text-xs font-bold tracking-[0.16em] text-grass-deeper shadow-[4px_4px_0_#C9702A] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70`}
            >
              {running ? SCANNER.buttonRunning : SCANNER.buttonIdle}
            </button>

            <AnimatePresence>
              {status === "failed" && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 font-mono text-sm font-bold tracking-[0.12em] text-gold sm:text-base"
                  role="status"
                >
                  ⚠ {SCANNER.result}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
