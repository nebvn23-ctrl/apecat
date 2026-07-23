"use client";

/**
 * Spawns a short-lived expanding ripple dot at the click position inside the
 * event's target element. The target must have `position: relative` and
 * `overflow: hidden` (see the `.fx-btn` utility class in globals.css).
 */
export function spawnRipple(e: React.MouseEvent<HTMLElement>) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.4;
  const dot = document.createElement("span");
  dot.className = "ripple-dot";
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.left = `${e.clientX - rect.left - size / 2}px`;
  dot.style.top = `${e.clientY - rect.top - size / 2}px`;
  btn.appendChild(dot);
  setTimeout(() => dot.remove(), 600);
}

/** Shared className for any CTA button that should wiggle on hover + ripple on click. */
export const FX_BTN = "fx-btn relative overflow-hidden";
