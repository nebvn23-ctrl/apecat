"use client";

import { useEffect, useState } from "react";

/**
 * Returns true if the visitor's OS/browser is set to prefers-reduced-motion.
 * Used to skip the animated intro and calm down ambient/idle animations.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const listener = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return reduced;
}
