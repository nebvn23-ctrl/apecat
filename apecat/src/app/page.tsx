"use client";

import { Navigation } from "@/components/Navigation";
import { CursorGlow } from "@/components/CursorGlow";
import { IntroVideo } from "@/components/IntroVideo";
import { Hero } from "@/components/Hero";
import { IdentityScanner } from "@/components/IdentityScanner";
import { Lore } from "@/components/Lore";
import { MemeArchive } from "@/components/MemeArchive";
import { FinalSection } from "@/components/FinalSection";
import { useSessionIntro } from "@/hooks/useSessionIntro";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Home() {
  const { shouldPlay, ready, markSeen, replay } = useSessionIntro();
  const reducedMotion = useReducedMotion();

  const showIntro = ready && shouldPlay && !reducedMotion;

  return (
    <>
      <Navigation />
      <CursorGlow />

      {showIntro && <IntroVideo onFinish={markSeen} />}

      <main>
        <Hero />
        <IdentityScanner />
        <Lore />
        <MemeArchive />
        <FinalSection onReplay={replay} />
      </main>
    </>
  );
}
