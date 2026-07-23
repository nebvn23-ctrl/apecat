"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "apecat-intro-seen";

/**
 * Tracks whether the intro has already played this browser session.
 * `shouldPlay` starts `false` (server-safe) and flips to `true` on mount
 * only if sessionStorage has no record of a previous play. Call `markSeen()`
 * once the intro finishes or is skipped, and `replay()` to force it again
 * (used by the "REPLAY INTRO" control).
 */
export function useSessionIntro() {
  const [shouldPlay, setShouldPlay] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const seen = window.sessionStorage.getItem(SESSION_KEY);
      setShouldPlay(!seen);
    } catch {
      // sessionStorage unavailable (private mode, etc.) — never block access
      setShouldPlay(false);
    } finally {
      setReady(true);
    }
  }, []);

  const markSeen = () => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setShouldPlay(false);
  };

  const replay = () => {
    setShouldPlay(true);
  };

  return { shouldPlay, ready, markSeen, replay };
}
