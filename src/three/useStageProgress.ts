import { useRef } from 'react';
import { useScrollProgress } from '../scroll/LenisProvider';

export function useStageProgress(range: [number, number]) {
  const globalRef = useScrollProgress();
  const out = useRef({ active: 0, local: 0 });

  return () => {
    const g = globalRef.current;
    const [a, b] = range;
    const fadeIn = 0.04;
    const fadeOut = 0.04;
    let active = 0;
    if (g >= a - fadeIn && g <= b + fadeOut) {
      if (g < a) active = (g - (a - fadeIn)) / fadeIn;
      else if (g > b) active = 1 - (g - b) / fadeOut;
      else active = 1;
    }
    const local = b > a ? Math.max(0, Math.min(1, (g - a) / (b - a))) : 0;
    out.current.active = Math.max(0, Math.min(1, active));
    out.current.local = local;
    return out.current;
  };
}
