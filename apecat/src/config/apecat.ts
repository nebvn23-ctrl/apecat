// ============================================================================
// APECAT — CENTRAL CONFIGURATION
// ----------------------------------------------------------------------------
// Every piece of copy, every asset path, and every external link used on the
// site lives here. Edit this file to change the site's content — you should
// not need to touch component code for copy, link, or asset changes.
// ============================================================================

export const SITE = {
  name: "APECAT",
  domain: "apecat.example", // replace with the real production domain
  tagline: "THE NEW META HAS TOUCHED GRASS.",
  description:
    "Not a cat. Not an ape. Just a very confused creature walking through the grass like he owns the entire blockchain. Zero thoughts. Maximum aura.",
};

// ----------------------------------------------------------------------------
// EXTERNAL LINKS
// Replace the placeholder strings below with real URLs when they exist.
// Any link left as a placeholder will render as a disabled "COMING SOON"
// button/link across the site — nothing here is invented.
// ----------------------------------------------------------------------------
export const LINKS = {
  buy: "[BUY_LINK]",
  x: "https://x.com/apecatonsol",
  telegram: "[TELEGRAM_LINK]",
  contractAddress: "89EwtnRmweZuVuBScUj371NkDaLxmRrwvQKfvyZfpump",
};

/** A link is considered "live" only if it no longer matches its placeholder pattern. */
export function isLiveLink(value: string): boolean {
  return Boolean(value) && !/^\[.*\]$/.test(value.trim());
}

// ----------------------------------------------------------------------------
// MEDIA ASSETS
// All paths point at files inside /public/media/apecat. See README.md for the
// exact upload → filename mapping.
// ----------------------------------------------------------------------------
// NOTE: no separate "original field" landscape photo was among the uploaded
// assets, so the field/sunrise moments (intro fallback + final section) both
// reuse `apecat-screen-touch.png`, which is itself a full-field, sunrise-lit
// shot of Apecat reaching toward camera. If you later add a dedicated field
// photo, drop it in as `apecat-original-field.jpg` and point `originalField`
// at it here.
export const MEDIA = {
  video: "/media/apecat/apecat-intro.mp4",
  originalField: "/media/apecat/apecat-screen-touch.png",
  hero: "/media/apecat/apecat-hero.png",
  screenTouch: "/media/apecat/apecat-screen-touch.png",
  peeking: "/media/apecat/apecat-peeking.png",
  // The cat-to-Apecat transformation clip shown in the Lore section.
  // WebM is listed first (better compression); MP4 is the Safari/iOS fallback.
  transformWebm: "/media/apecat/apecat-transform.webm",
  transformMp4: "/media/apecat/apecat-transform.mp4",
};

/**
 * CONTACT MOMENT
 * ---------------------------------------------------------------------------
 * The uploaded intro clip is 5.04s long. It was inspected frame-by-frame
 * (10fps extraction) to find the moment Apecat's fingertip makes contact
 * with the camera lens. Contact begins around 4.1s and is fullest around
 * 4.3s, so 4.3 is used as the trigger for the ripple/flash/crack effect.
 * If you replace the video, re-inspect it and update this value —
 * for example: `ffmpeg -i apecat-intro.mp4 -vf "fps=10" frame_%03d.jpg`
 * and scrub through the frames to find the new contact time.
 */
export const CONTACT_MOMENT_SECONDS = 4.3;
export const VIDEO_DURATION_SECONDS = 5.04;

// ----------------------------------------------------------------------------
// NAVIGATION
// ----------------------------------------------------------------------------
export const NAV_LINKS = [
  { label: "LORE", href: "#lore" },
  { label: "MEMES", href: "#memes" },
  { label: "BUY", href: "#buy" },
];

// ----------------------------------------------------------------------------
// HERO
// ----------------------------------------------------------------------------
export const HERO = {
  eyebrow: "THE NEW META HAS TOUCHED GRASS.",
  title: "APECAT",
  tagline: ["NOT A CAT.", "NOT AN APE.", "MAXIMUM AURA."],
  supporting:
    "A very confused creature touched grass, discovered leverage and began walking directly toward liquidity.",
  ctaPrimary: "BUY APECAT",
  ctaSecondary: "VIEW MEMES",
  ticker:
    "ZERO ROADMAP • ZERO THOUGHTS • MAXIMUM AURA • BUILT LIKE A REFRIGERATOR • APECAT SEASON IS COMING • ",
};

// ----------------------------------------------------------------------------
// IDENTITY SCANNER
// ----------------------------------------------------------------------------
export const SCANNER = {
  title: "WHAT EVEN IS APECAT?",
  values: [
    { label: "CAT", value: "49%" },
    { label: "APE", value: "49%" },
    { label: "THOUGHTS DETECTED", value: "0" },
    { label: "AURA", value: "UNMEASURABLE" },
    { label: "FINANCIAL THREAT", value: "100%" },
  ],
  buttonIdle: "RUN IDENTIFICATION",
  buttonRunning: "ANALYZING...",
  result: "SPECIES IDENTIFICATION FAILED",
};

// ----------------------------------------------------------------------------
// LORE — kept as short editorial blocks, never one long wall of text.
// ----------------------------------------------------------------------------
export const LORE_INTRO = {
  heading: "APECAT — THE CREATURE THAT TOUCHED GRASS",
  blocks: [
    "Nobody knows exactly where Apecat came from.",
    "Some say a gorilla ate a cat, touched grass, and discovered leverage.",
    "Others believe the blockchain created him by accident after processing too many recycled metas, fake roadmaps, abandoned whitepapers and unpaid taxes.",
    "The only confirmed fact is that, one morning at sunrise, Apecat appeared in an open field and began walking directly toward liquidity.",
  ],
  statement: ["Not a cat.", "Not an ape.", "Just a very confused creature moving through the grass like he owns the entire blockchain."],
  traits: [
    "Built like a refrigerator.",
    "Eyes full of unpaid taxes.",
    "Gorilla arms.",
    "Cat instincts.",
    "Zero thoughts.",
    "Maximum aura.",
  ],
  closing: [
    "Apecat has no complicated utility.",
    "He has no fake AI roadmap. No mysterious partnership announcement. No 47-page whitepaper explaining why the future needs another protocol.",
    "Apecat does not know what a protocol is.",
    "He simply walks.",
    "And somehow, volume follows.",
  ],
};

export const LORE_TRENCHES = {
  heading: "THE CREATURE THAT RESTARTED THE TRENCHES",
  blocks: [
    "For too long, the trenches had been quiet.",
    "The same recycled animals. The same callers. The same promises. The same people pretending to read tokenomics before buying a picture of something strange.",
    "The trenches did not need more technology.",
    "They needed a creature confusing enough to believe in again.",
    "Then the sun rose behind Apecat.",
    "He walked out of the grass with the body of an ape, the face of a cat, and the confidence of someone who already knew your seed phrase.",
    "Nobody understood him.",
    "That was the signal.",
    "People bought because he was a cat. Apes bought because he was an ape. Farmers bought because he was standing in a field.",
    "Even the sun appeared to be pumping behind him.",
  ],
};

export const LORE_STATEMENT = [
  "THE BODY SAYS APE.",
  "THE EYES SAY CAT.",
  "THE AURA SAYS YOU ARE ALREADY LATE.",
];

export const LORE_EFFECT = {
  heading: "THE APECAT EFFECT",
  blocks: [
    "One person saw Apecat and laughed.",
    "Ten people turned him into a meme.",
    "A hundred people began watching the field.",
    "By the time the trenches noticed what was happening, Apecat was already walking across the timeline.",
    "He does not chase the meta. He arrives before it has a name.",
    "Every step creates volume. Every stare creates suspicion. Every meme strengthens the aura.",
    "Nobody knows where he is going.",
    "Apecat probably does not know either.",
    "But he walks with the confidence of a creature that has never opened a chart and therefore has never experienced fear.",
  ],
};

export const LORE_FINAL = {
  heading: "APECAT IS THE NEW META.",
  blocks: [
    "Crypto was never only about utility.",
    "Deep down, it was always about finding the weirdest animal before everyone else.",
    "No roadmap. No thoughts. No explanation.",
    "Only a suspicious creature approaching at sunrise.",
  ],
  statement: [
    "The body says ape.",
    "The eyes say cat.",
    "The aura says you are already late.",
  ],
  closing: "Apecat season is coming.",
  disclaimer: "Not financial advice. We are emotionally compromised by the creature.",
};

// ----------------------------------------------------------------------------
// MEME ARCHIVE
// Only memes with a real uploaded image are listed. If you add a new meme,
// drop the file into /public/media/apecat/memes and add an entry here.
// ----------------------------------------------------------------------------
export type MemeEntry = {
  id: string;
  src: string;
  label: string;
  alt: string;
  span: "sm" | "md" | "lg";
  rotate: number;
};

export const MEMES: MemeEntry[] = [
  {
    id: "poker",
    src: "/media/apecat/memes/apecat-poker.jpeg",
    label: '"chart understood?"',
    alt: "Apecat sits at a poker table across from a stone-faced player, cards and chips on the felt.",
    span: "lg",
    rotate: -7,
  },
  {
    id: "computer",
    src: "/media/apecat/memes/apecat-computer.jpeg",
    label: "zero thoughts, online",
    alt: "Apecat sits at an old beige desktop computer with two bottles of beer on the desk.",
    span: "md",
    rotate: 5,
  },
  {
    id: "network",
    src: "/media/apecat/memes/apecat-network.jpeg",
    label: "the ape network",
    alt: "A group of hooded figures with Apecat faces walking together down a city street.",
    span: "md",
    rotate: -4,
  },
  {
    id: "office",
    src: "/media/apecat/memes/apecat-office.jpeg",
    label: "leverage: discovered",
    alt: "Two Apecats in an executive office with a bag of cash and gold bars on the desk.",
    span: "lg",
    rotate: 8,
  },
  {
    id: "party",
    src: "/media/apecat/memes/apecat-party.jpeg",
    label: "maximum aura",
    alt: "A group of Apecats hanging out on a glowing dance floor under a disco ball.",
    span: "sm",
    rotate: -6,
  },
  {
    id: "store",
    src: "/media/apecat/memes/apecat-store.jpeg",
    label: "volume returned",
    alt: "A small pack of Apecats moving through a grocery store aisle, one leaping between shelves.",
    span: "sm",
    rotate: -4,
  },
];

export const MEME_ARCHIVE_COPY = {
  eyebrow: "DOCUMENTED APECAT SIGHTINGS",
  title: "THE MEME ARCHIVE",
};

// ----------------------------------------------------------------------------
// FINAL SECTION
// ----------------------------------------------------------------------------
export const FINAL = {
  lines: ["THE SUN IS RISING.", "THE GRASS IS MOVING.", "THE TRENCHES ARE WATCHING."],
  statement: "APECAT SEASON IS COMING.",
  sub: ["Not a cat.", "Not an ape.", "Just the new meta."],
  ctaPrimary: "BUY APECAT",
  ctaSecondary: "JOIN THE COMMUNITY",
  ctaReplay: "REPLAY INTRO",
};

export const FOOTER = {
  disclaimer: "NOT FINANCIAL ADVICE. WE ARE EMOTIONALLY COMPROMISED BY THE CREATURE.",
};

// ----------------------------------------------------------------------------
// INTRO VIDEO COPY
// ----------------------------------------------------------------------------
export const INTRO_COPY = {
  timestamp: "FIELD CAMERA // 05:47 AM",
  line: "SOMETHING IS APPROACHING.",
  skip: "SKIP INTRO",
};
