import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReveal } from '../scroll/director';

type Item = { q: string; n: string; m: string };

export function Testimonials() {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const items = (t('testimonials.items', { returnObjects: true }) as Item[]) ?? [];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const isGeo = i18n.language === 'ka';

  useEffect(() => {
    if (paused || items.length === 0) return;
    const id = window.setInterval(() => setI((p) => (p + 1) % items.length), 8000);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  if (items.length === 0) return null;
  const cur = items[i];

  return (
    <section
      ref={ref}
      className="section-x py-32 text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <p data-reveal className="pilcrow mb-8">
        {t('testimonials.eyebrow')}
      </p>
      <h2
        data-reveal
        className={`text-[clamp(40px,7vw,96px)] leading-[0.98] mb-12 ${isGeo ? 'font-geo' : ''}`}
      >
        {t('testimonials.title_a')}
        <em className="text-[var(--mata-amber)]">{t('testimonials.title_accent')}</em>
        {t('testimonials.title_b')}
      </h2>
      <div className="max-w-4xl mx-auto">
        <span className="text-[88px] leading-none text-[var(--mata-amber)] font-display block mb-2">
          “
        </span>
        <p
          key={i}
          className={`text-[clamp(22px,3vw,44px)] leading-[1.3] mb-10 transition-opacity duration-500 ${
            isGeo ? 'font-geo' : ''
          }`}
        >
          {cur.q}
        </p>
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase opacity-70">
          {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')} ·{' '}
          <span className="text-[var(--mata-paper)]">{cur.n}</span> · {cur.m}
        </p>
      </div>
      <div className="flex items-center justify-center gap-2 mt-10">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Quote ${idx + 1}`}
            className={`h-[2px] transition-all duration-300 ${
              idx === i ? 'w-10 bg-[var(--mata-amber)]' : 'w-5 bg-[var(--mata-paper)]/25'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
