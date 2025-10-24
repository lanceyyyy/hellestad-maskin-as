import { RefCallback, useCallback, useEffect, useRef, useState } from "react";

type IntersectionConfig = {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
};

export function useIntersection<T extends HTMLElement>({
  threshold = 0.2,
  rootMargin = "0px",
  triggerOnce = true,
}: IntersectionConfig = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const nodeRef = useRef<T | null>(null);
  const hasCheckedInitial = useRef(false);

  const disconnect = () => {
    observerRef.current?.disconnect();
    observerRef.current = null;
  };

  const callbackRef: RefCallback<T> = useCallback(
    (node) => {
      if (nodeRef.current === node) return;

      nodeRef.current = node;
      disconnect();

      if (!node) {
        return;
      }

      // Check if element is already in viewport on mount
      if (!hasCheckedInitial.current) {
        hasCheckedInitial.current = true;
        const rect = node.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;

        // Calculate if element is in viewport considering threshold
        const isInViewport = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= windowHeight &&
          rect.right <= windowWidth
        ) || (
          rect.top < windowHeight &&
          rect.bottom > 0 &&
          rect.left < windowWidth &&
          rect.right > 0
        );

        if (isInViewport) {
          setIsIntersecting(true);
          setHasEntered(true);
          if (triggerOnce) {
            return; // Don't set up observer if already visible and triggerOnce is true
          }
        }
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const isVisible = entries.some((entry) => entry.isIntersecting);
          setIsIntersecting(isVisible);

          if (isVisible) {
            setHasEntered(true);
            if (triggerOnce) {
              disconnect();
            }
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      observerRef.current.observe(node);
    },
    [rootMargin, threshold, triggerOnce]
  );

  useEffect(() => disconnect, []);

  return {
    ref: callbackRef,
    isIntersecting,
    hasEntered,
  };
}
