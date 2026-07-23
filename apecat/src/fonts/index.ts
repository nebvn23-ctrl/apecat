import localFont from "next/font/local";

// Anton — heavy condensed display grotesk, used for section headings.
export const anton = localFont({
  src: "../fonts/anton.woff2",
  variable: "--font-anton",
  weight: "400",
  display: "swap",
});

// JetBrains Mono — used for scanner/data readouts, labels, and buttons.
export const jbmono = localFont({
  src: [
    { path: "../fonts/jbmono-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/jbmono-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-jbmono",
  display: "swap",
});

// Permanent Marker — handwritten annotations (stamps, captions, margin notes).
export const marker = localFont({
  src: "../fonts/marker.woff2",
  variable: "--font-marker",
  weight: "400",
  display: "swap",
});

// Luckiest Guy — the distinctive comic/meme display face reserved for the
// APECAT wordmark itself (nav logo, hero background word, intro reveal).
export const wordmark = localFont({
  src: "../fonts/luckiest.woff2",
  variable: "--font-wordmark",
  weight: "400",
  display: "swap",
});
