# APECAT

A compact, one-page Next.js site for the Apecat meme character. Five sections,
2–3 minutes to explore: video intro → hero → identity scanner → compact lore →
meme archive → final CTA.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · next/image

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build locally
```

No environment variables are required. All content lives in one file:
`src/config/apecat.ts`.

## Asset mapping

Your uploads were renamed and placed as follows:

| Uploaded file | Project asset |
|---|---|
| `IMG_1083.png` (full body, studio background) | `public/media/apecat/apecat-hero.png` — **background-removed** (see note below) |
| `IMG_1084.png` (close-up in field, finger toward camera) | `public/media/apecat/apecat-screen-touch.png` |
| `IMG_1085.png` (peeking from behind a white panel) | `public/media/apecat/apecat-peeking.png` |
| `chatllm_generated_video_...mp4` | `public/media/apecat/apecat-intro.mp4` |
| `IMG_1090.jpeg` (poker with Elon) | `public/media/apecat/memes/apecat-poker.jpeg` |
| `IMG_1087.jpeg` (at the computer, Coronas) | `public/media/apecat/memes/apecat-computer.jpeg` |
| `IMG_1092.jpeg` (hooded group, street) | `public/media/apecat/memes/apecat-network.jpeg` |
| `IMG_1088.jpeg` (office, cash, gold bars) | `public/media/apecat/memes/apecat-office.jpeg` |
| `IMG_1091.jpeg` (disco / party) | `public/media/apecat/memes/apecat-party.jpeg` |
| `IMG_1089.jpeg` (grocery store aisle) | `public/media/apecat/memes/apecat-store.jpeg` |

**Note on the meme count:** the brief calls for 7 memes (including a "trading"
entry), but only 6 distinct meme images were included in the upload. Rather
than invent a 7th image, the archive ships with the 6 real ones. Drop a 7th
image into `public/media/apecat/memes/` and add an entry to the `MEMES` array
in `src/config/apecat.ts` whenever you have one.

**Note on the hero cutout:** `apecat-hero.png` originally had a flat studio-gray
background. It's been processed (color-distance keying + edge feathering) into
a transparent PNG so it reads as a clean character cutout in the hero and
scanner sections, rather than a pasted rectangle. If you'd rather use the
original un-cut photo, replace the file and set an explicit background/blend
treatment in `Hero.tsx`/`IdentityScanner.tsx`.

**Note on the "original field" shot:** the brief references a separate
`apecat-original-field.jpeg` for the intro fallback and final section. No such
landscape photo was in your upload, so both spots reuse `apecat-screen-touch.png`
(itself a full-field, sunrise-lit shot). See the comment in `apecat.ts` next to
`MEDIA.originalField` if you add a dedicated field photo later.

## Replacing the intro video

1. Drop your new file in as `public/media/apecat/apecat-intro.mp4`.
2. Re-check the "contact moment" (when the hand/finger touches the camera),
   e.g.:
   ```bash
   ffmpeg -i public/media/apecat/apecat-intro.mp4 -vf "fps=10" frame_%03d.jpg
   ```
   Scrub through the frames, note the timestamp, and update
   `CONTACT_MOMENT_SECONDS` in `src/config/apecat.ts`.
3. Update `VIDEO_DURATION_SECONDS` if the new clip has a different length.

## Adding more memes

1. Add the image to `public/media/apecat/memes/`.
2. Add an entry to the `MEMES` array in `src/config/apecat.ts`:
   ```ts
   {
     id: "unique-id",
     src: "/media/apecat/memes/your-file.jpeg",
     label: "SHORT ARCHIVE LABEL",
     alt: "Descriptive alt text for accessibility.",
     span: "sm" | "md" | "lg",
     rotate: -4, // small rotation in degrees, for the collage feel
   }
   ```

## Configuring external links & the contract address

Everything lives in `LINKS` in `src/config/apecat.ts`:

```ts
export const LINKS = {
  buy: "[BUY_LINK]",
  x: "[X_LINK]",
  telegram: "[TELEGRAM_LINK]",
  contractAddress: "[CONTRACT_ADDRESS]",
};
```

Replace any placeholder with a real URL/address and the corresponding button
across the site automatically switches from a disabled "COMING SOON" state to
a live link. Leave any of them as-is and that button/link stays safely
disabled — nothing is invented.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Sign in to [vercel.com](https://vercel.com) with your GitHub account.
3. Click **Add New → Project** and import the Apecat repository.
4. Vercel auto-detects the Next.js framework preset — leave the defaults.
5. Click **Deploy**.
6. Once live, go to **Project Settings → Domains** and add your custom domain.
7. Configure the DNS records Vercel shows you (an `A`/`ALIAS` record for the
   root domain, a `CNAME` for `www`).
8. Test both the root domain and the `www` version, and confirm HTTPS, video
   playback, images, and mobile layout all work as expected.
9. Update `SITE.domain` in `src/config/apecat.ts` to your real domain so
   the SEO/Open Graph metadata and sitemap point at the right URL, then
   redeploy.

## Notes on scope

- `npm audit` will report a handful of advisories inherited from the
  Next.js/ESLint dependency tree (Server Actions, middleware, i18n rewrites,
  self-hosted image-optimizer edge cases). This project doesn't use any of
  those features, so exposure is minimal — but keeping Next.js patched
  (`npm outdated next`) is good practice regardless.
- The intro's autoplay-blocked fallback, reduced-motion handling, and
  once-per-session logic have all been tested with automated browser checks
  (overflow at 375/430/768/1024/1440px, scanner run/fail state, meme modal
  open/close/focus-return, intro skip + replay, session persistence).

## Unde pui CA, X, Telegram și linkul de Buy

Toate se editează într-un singur fișier: `src/config/apecat.ts`, în blocul `LINKS`:

```ts
export const LINKS = {
  buy: "[BUY_LINK]",              // link Dexscreener / pump.fun etc.
  x: "[X_LINK]",                  // https://x.com/contul_tau
  telegram: "[TELEGRAM_LINK]",    // https://t.me/grupul_tau
  contractAddress: "[CONTRACT_ADDRESS]",  // adresa reala a tokenului
};
```

Cum se comporta:
- **CA** apare in bara fixa de sus. Cand e completat, se poate copia cu un click
  (arata "COPIED!" 1.6s). Cand e gol, arata "COMING SOON" si vibreaza scurt la click.
- **X** apare tot in bara de sus. Cand e gol, arata "+ ADD X LINK".
- **Buy** si **Telegram** activeaza butoanele din hero si din sectiunea finala.
  Cand sunt goale, butoanele raman dezactivate cu "COMING SOON".

Nu inventa valori: orice camp lasat ca `[PLACEHOLDER]` ramane automat in stare
"COMING SOON", fara sa strice nimic.

## Design

- Fonturi locale (`src/fonts/`), incarcate prin `next/font/local`:
  Luckiest Guy (wordmark APECAT), Anton (titluri), JetBrains Mono (date/butoane),
  Permanent Marker (adnotari scrise de mana).
- Paleta: crem/auriu la hero, verde-padure la scanner, pluta maro la arhiva de
  meme-uri, auriu-apus la final. Verde-neon folosit doar ca accent.
- Videoclipul cu transformarea pisica->Apecat e in sectiunea Lore
  (`apecat-transform.webm` + `.mp4` ca fallback pentru Safari/iOS).

