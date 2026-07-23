import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F3F0E8",
        ink: "#10110E",
        toxic: "#DCFF2C",
        grass: "#3D6B2C",
        "grass-light": "#6FA84B",
        "grass-deep": "#16240F",
        "grass-deeper": "#0E1A0A",
        gold: "#F0B03C",
        "gold-deep": "#C9702A",
        sunset: "#8C3A22",
        rust: "#9C3B2E",
        paper: "#EFE6CC",
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-jbmono)", "ui-monospace", "monospace"],
        marker: ["var(--font-marker)", "cursive"],
        wordmark: ["var(--font-wordmark)", "cursive"],
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-10%)" },
          "100%": { transform: "translateY(110%)" },
        },
        breathe: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-6px) scale(1.008)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.6" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.75" },
          "97%": { opacity: "1" },
        },
        drift: {
          "0%": { transform: "translate(0,0)" },
          "33%": { transform: "translate(6px,-10px)" },
          "66%": { transform: "translate(-8px,-4px)" },
          "100%": { transform: "translate(0,0)" },
        },
        "peek-up": {
          "0%, 100%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(-14%)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.9" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
        letterIn: {
          "0%": { opacity: "0", transform: "translateY(40px) scale(0.6)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        letterWiggle: {
          "0%, 100%": { transform: "translateY(0) rotate(var(--r, 0deg))" },
          "50%": { transform: "translateY(-5px) rotate(calc(var(--r, 0deg) - 3deg))" },
        },
        panelFlicker: {
          "0%, 100%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(1.15) saturate(1.3)" },
        },
        glitchText: {
          "0%, 100%": { textShadow: "2px 0 #DCFF2C, -2px 0 #9C3B2E" },
          "50%": { textShadow: "-2px 0 #DCFF2C, 2px 0 #9C3B2E" },
        },
        cardSwing: {
          "0%, 100%": { transform: "rotate(-1.4deg)" },
          "50%": { transform: "rotate(1.4deg)" },
        },
        pinPulse: {
          "0%, 100%": { transform: "translateX(-50%) scale(1)" },
          "50%": { transform: "translateX(-50%) scale(1.18)" },
        },
        sunPulse: {
          "0%, 100%": { opacity: "0.5", transform: "translate(-50%,-50%) scale(1)" },
          "50%": { opacity: "0.9", transform: "translate(-50%,-50%) scale(1.12)" },
        },
        caSpin: {
          to: { transform: "rotate(360deg)" },
        },
        noteWiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        btnWiggle: {
          "0%, 100%": { transform: "rotate(0)" },
          "25%": { transform: "rotate(-2deg)" },
          "75%": { transform: "rotate(2deg)" },
        },
        rippleDot: {
          to: { transform: "scale(2.6)", opacity: "0" },
        },
      },
      animation: {
        scanline: "scanline 2.2s linear infinite",
        breathe: "breathe 6s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
        flicker: "flicker 6s ease-in-out infinite",
        drift: "drift 9s ease-in-out infinite",
        "peek-up": "peek-up 8s ease-in-out infinite",
        ripple: "ripple 900ms cubic-bezier(0.2,0.7,0.3,1) forwards",
        letterWiggle: "letterWiggle 5s ease-in-out infinite",
        panelFlicker: "panelFlicker 0.12s steps(2) infinite",
        glitchText: "glitchText 0.15s steps(2) infinite",
        cardSwing: "cardSwing 4.5s ease-in-out infinite",
        pinPulse: "pinPulse 2.4s ease-in-out infinite",
        sunPulse: "sunPulse 3.6s ease-in-out infinite",
        caSpin: "caSpin 3s linear infinite",
        noteWiggle: "noteWiggle 3.2s ease-in-out infinite",
        btnWiggle: "btnWiggle 0.4s ease",
        rippleDot: "rippleDot 0.55s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
