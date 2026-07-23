"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  MEDIA,
  CONTACT_MOMENT_SECONDS,
  INTRO_COPY,
  HERO,
} from "@/config/apecat";

type Phase = "video" | "fallback" | "ending";

const FALLBACK_APPROACH_MS = 3600;
const FALLBACK_CONTACT_AT_MS = FALLBACK_APPROACH_MS * 0.72;
const ENDING_HOLD_MS = 1400;

export function IntroVideo({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<Phase>("video");
  const [contactFx, setContactFx] = useState(false);
  const [shake, setShake] = useState(false);
  const [textIn, setTextIn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contactFired = useRef(false);
  const finishedRef = useRef(false);

  const fireContact = useCallback(() => {
    if (contactFired.current) return;
    contactFired.current = true;
    setContactFx(true);
    setShake(true);
    try {
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate?.(35);
      }
    } catch {
      /* ignore */
    }
    setTimeout(() => setShake(false), 260);
    setTimeout(() => setContactFx(false), 900);
  }, []);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onFinish();
  }, [onFinish]);

  // fade-in the on-screen text shortly after mount
  useEffect(() => {
    const t = setTimeout(() => setTextIn(true), 250);
    return () => clearTimeout(t);
  }, []);

  // try to autoplay the real video
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const playPromise = v.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => setPhase("fallback"));
    }
  }, []);

  // fallback timeline: simulated approach + contact + auto-continue
  useEffect(() => {
    if (phase !== "fallback") return;
    const contactTimer = setTimeout(fireContact, FALLBACK_CONTACT_AT_MS);
    const endTimer = setTimeout(() => setPhase("ending"), FALLBACK_APPROACH_MS);
    return () => {
      clearTimeout(contactTimer);
      clearTimeout(endTimer);
    };
  }, [phase, fireContact]);

  // once "ending" begins, hold the frozen frame + reveal wordmark, then finish
  useEffect(() => {
    if (phase !== "ending") return;
    const t = setTimeout(finish, ENDING_HOLD_MS);
    return () => clearTimeout(t);
  }, [phase, finish]);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.currentTime >= CONTACT_MOMENT_SECONDS) fireContact();
  };

  const handleEnded = () => setPhase("ending");

  const handleSkip = () => {
    setPhase("ending");
  };

  const isEnding = phase === "ending";

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-grass-deeper transition-opacity duration-[900ms] ${
        isEnding ? "opacity-0" : "opacity-100"
      } ${shake ? "animate-[shake_0.26s_ease-in-out]" : ""}`}
      style={{ transitionDelay: isEnding ? "300ms" : "0ms" }}
      role="presentation"
    >
      {/* Media layer */}
      {phase !== "fallback" ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={MEDIA.video}
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
      ) : (
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={MEDIA.screenTouch}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover animate-[approach_3.6s_ease-in-out_forwards]"
          />
        </div>
      )}

      {/* Readability gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-grass-deeper via-grass-deeper/10 to-grass-deeper/50" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-grass-deeper/60 via-transparent to-transparent" />

      {/* Contact effect: glass ripple + flash + crack lines */}
      {contactFx && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold/80 animate-ripple" />
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/70 blur-xl animate-ripple" />
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80"
            width="180"
            height="180"
            viewBox="0 0 180 180"
            fill="none"
          >
            <line x1="90" y1="90" x2="40" y2="55" stroke="#F3F0E8" strokeWidth="1.5" />
            <line x1="90" y1="90" x2="145" y2="60" stroke="#F3F0E8" strokeWidth="1.5" />
            <line x1="90" y1="90" x2="105" y2="150" stroke="#F3F0E8" strokeWidth="1.2" />
          </svg>
        </div>
      )}

      {/* Text overlay */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-8 flex flex-col items-center gap-2 px-4 text-center transition-all duration-700 sm:top-12 ${
          textIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        <span className="rounded-sm bg-grass-deeper/70 px-3 py-1 font-mono text-[11px] font-bold tracking-[0.25em] text-toxic sm:text-xs">
          {INTRO_COPY.timestamp}
        </span>
        <span className="font-display text-xl text-gold sm:text-2xl">
          {INTRO_COPY.line}
        </span>
      </div>

      {/* End-of-intro wordmark reveal, fades in with the hold before crossfade */}
      <div
        className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-16 transition-opacity duration-500 ${
          isEnding ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="font-wordmark text-5xl text-gold sm:text-7xl" style={{ WebkitTextStroke: "2px #10110E", paintOrder: "stroke fill" }}>
          APE<span className="text-toxic">CAT</span>
        </h1>
        <p className="mt-2 font-mono text-xs tracking-[0.3em] text-cream/80 sm:text-sm">
          {HERO.eyebrow}
        </p>
      </div>

      {/* Skip control */}
      {!isEnding && (
        <button
          type="button"
          onClick={handleSkip}
          className="absolute bottom-6 right-5 z-10 rounded-sm border border-cream/40 bg-grass-deeper/60 px-4 py-2 font-mono text-xs font-bold tracking-[0.2em] text-cream/90 backdrop-blur-sm transition-colors hover:border-toxic hover:text-toxic sm:bottom-8 sm:right-8"
        >
          {INTRO_COPY.skip} →
        </button>
      )}
    </div>
  );
}
