import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useReveal } from '../scroll/director';

type Item = { q: string; a: string };

export function FAQ() {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const items = (t('faq.items', { returnObjects: true }) as Item[]) ?? [];
  const [open, setOpen] = useState<number | null>(null);
  const isGeo = i18n.language === 'ka';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section ref={ref} className="section-x py-32">
      <p data-reveal className="pilcrow mb-8">
        {t('faq.eyebrow')}
      </p>
      <h2
        data-reveal
        className={`text-[clamp(40px,7vw,96px)] leading-[0.98] mb-12 ${isGeo ? 'font-geo' : ''}`}
      >
        {t('faq.title')}
      </h2>
      <ul className="max-w-4xl divide-y divide-[var(--mata-paper)]/12">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <li key={i} data-reveal>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-6 py-6 text-left hover:text-[var(--mata-amber)] transition-colors"
              >
                <span className={`text-xl md:text-2xl ${isGeo ? 'font-geo' : ''}`}>{it.q}</span>
                <span
                  className={`shrink-0 w-9 h-9 border flex items-center justify-center text-2xl leading-none transition-all duration-300 ${
                    isOpen
                      ? 'border-[var(--mata-amber)] text-[var(--mata-amber)] rotate-45'
                      : 'border-[var(--mata-paper)]/40'
                  }`}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.3s ease',
                }}
              >
                <div className="overflow-hidden">
                  <p className={`pb-6 max-w-2xl opacity-75 ${isGeo ? 'font-geo' : ''}`}>{it.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
