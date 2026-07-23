"use client";

import { useState } from "react";
import { LINKS, isLiveLink } from "@/config/apecat";
import { spawnRipple, FX_BTN } from "@/lib/fx";

export function TopBar() {
  const [copied, setCopied] = useState(false);
  const hasCA = isLiveLink(LINKS.contractAddress);
  const hasX = isLiveLink(LINKS.x);

  const handleCopy = (e: React.MouseEvent<HTMLDivElement>) => {
    spawnRipple(e);
    if (!hasCA) {
      const el = e.currentTarget;
      el.classList.add("animate-shake");
      setTimeout(() => el.classList.remove("animate-shake"), 300);
      return;
    }
    navigator.clipboard
      .writeText(LINKS.contractAddress)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 border-b-2 border-gold bg-grass-deeper px-4 py-2">
      <div
        role="button"
        tabIndex={0}
        onClick={handleCopy}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCopy(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        aria-label={hasCA ? "Copiază adresa contractului" : "Adresa contractului nu este configurată încă"}
        className={`${FX_BTN} isolate flex cursor-pointer items-center gap-2 border px-3 py-1.5 font-mono text-[11px] text-cream transition-transform hover:-translate-y-px ${
          copied ? "border-gold" : "border-toxic"
        } ${!hasCA ? "cursor-not-allowed opacity-80" : ""}`}
      >
        <span
          className={`pointer-events-none absolute -inset-[40%] -z-10 animate-caSpin opacity-50 ${
            copied
              ? "bg-[conic-gradient(from_0deg,#F0B03C,transparent_25%,transparent_75%,#F0B03C)]"
              : "bg-[conic-gradient(from_0deg,#DCFF2C,transparent_25%,transparent_75%,#DCFF2C)]"
          }`}
        />
        <span className="pointer-events-none absolute inset-[1.5px] -z-10 bg-grass-deeper" />
        <span className={`font-bold tracking-[0.15em] ${copied ? "text-gold" : "text-toxic"}`}>CA</span>
        <span className={`max-w-[170px] overflow-hidden text-ellipsis whitespace-nowrap ${copied ? "text-gold" : ""}`}>
          {copied ? "COPIED!" : hasCA ? LINKS.contractAddress : "COMING SOON"}
        </span>
        <span className={copied ? "text-gold" : "text-toxic"}>{copied ? "✓" : "⧉"}</span>
      </div>

      {hasX ? (
        <a
          href={LINKS.x}
          target="_blank"
          rel="noopener noreferrer"
          className={`${FX_BTN} inline-flex items-center gap-1.5 bg-toxic px-3.5 py-1.5 font-mono text-[11px] font-bold tracking-[0.12em] text-grass-deeper transition-transform hover:-translate-y-px`}
        >
          𝕏 FOLLOW
        </a>
      ) : (
        <span
          className="inline-flex items-center gap-1.5 border border-dashed border-cream/60 px-3.5 py-1.5 font-mono text-[11px] font-bold tracking-[0.12em] text-cream/70"
          title="Configurează LINKS.x în src/config/apecat.ts"
        >
          + ADD X LINK
        </span>
      )}
    </div>
  );
}
