"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/config/apecat";
import { TopBar } from "./TopBar";

export function Navigation() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const setHeight = () => document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(el);
    return () => ro.disconnect();
  }, [menuOpen]);

  return (
    <header ref={headerRef} className="fixed left-0 right-0 top-0 z-40">
      <TopBar />
      <div
        className={`transition-colors duration-300 ${
          solid ? "border-b border-white/10 bg-ink/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#top"
            className="font-wordmark text-2xl tracking-tight text-cream sm:text-3xl"
          >
            APE<span className="text-toxic">CAT</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-xs font-medium tracking-[0.2em] text-cream/80 transition-colors hover:text-toxic"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            type="button"
            className="flex flex-col gap-1.5 p-2 sm:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`block h-0.5 w-6 bg-cream transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`block h-0.5 w-6 bg-cream transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`block h-0.5 w-6 bg-cream transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <ul className="flex flex-col gap-1 border-t border-white/10 bg-ink px-5 pb-4 sm:hidden">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 font-mono text-sm tracking-[0.2em] text-cream/80 hover:text-toxic"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
