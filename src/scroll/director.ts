import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type ScrubOpts = {
  start?: string;
  end?: string;
  pin?: boolean;
  scrub?: number | boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  build: (tl: gsap.core.Timeline) => void;
};

export function useSectionScrub<T extends HTMLElement>(
  ref: RefObject<T | null>,
  opts: ScrubOpts
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? 'top top',
          end: opts.end ?? 'bottom top',
          pin: opts.pin ?? false,
          scrub: opts.scrub ?? 0.6,
          onEnter: opts.onEnter,
          onLeave: opts.onLeave,
          invalidateOnRefresh: true,
        },
      });
      opts.build(tl);
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}

export function useReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  opts?: { from?: gsap.TweenVars; to?: gsap.TweenVars; start?: string }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('[data-reveal]'), {
        ...(opts?.from ?? { opacity: 0, y: 32, filter: 'blur(8px)' }),
        ...(opts?.to ?? {}),
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: {
          trigger: el,
          start: opts?.start ?? 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}

export function splitChars(text: string): { chars: string[]; words: string[] } {
  const words = text.split(/\s+/);
  const chars = Array.from(text);
  return { chars, words };
}
