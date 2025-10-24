import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // Check on initial render if possible
    if (typeof window !== "undefined" && "matchMedia" in window) {
      return window.matchMedia(QUERY).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) {
      return;
    }

    const mediaQueryList = window.matchMedia(QUERY);

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQueryList.matches);
    };

    updatePreference();
    mediaQueryList.addEventListener("change", updatePreference);

    return () => mediaQueryList.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}
