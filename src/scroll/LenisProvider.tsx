import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type LenisCtx = {
  lenis: Lenis | null;
  scrollProgress: number;
  reducedMotion: boolean;
};

const Ctx = createContext<LenisCtx>({ lenis: null, scrollProgress: 0, reducedMotion: false });

export function useLenis() {
  return useContext(Ctx);
}

export function useScrollProgress(): { current: number } {
  const { scrollProgress } = useContext(Ctx);
  const ref = useRef(scrollProgress);
  ref.current = scrollProgress;
  return ref;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ({ progress: p }: { progress: number }) => {
      setProgress(p);
      ScrollTrigger.update();
    });

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const value = useMemo(
    () => ({ lenis: lenisRef.current, scrollProgress: progress, reducedMotion }),
    [progress, reducedMotion]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
