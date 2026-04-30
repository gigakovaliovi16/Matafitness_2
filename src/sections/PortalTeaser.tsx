import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReveal } from '../scroll/director';

type Captions = { plan: string; meals: string; videos: string; bookings: string };

export function PortalTeaser() {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const isGeo = i18n.language === 'ka';
  const captions = (t('portal.captions', { returnObjects: true }) as Captions) ?? {
    plan: '',
    meals: '',
    videos: '',
    bookings: '',
  };

  return (
    <section
      ref={ref}
      id="portal"
      className="section-x py-40 min-h-[110svh] relative grid md:grid-cols-2 gap-16 items-center"
    >
      <div>
        <p data-reveal className="pilcrow mb-6">
          {t('portal.eyebrow')}
        </p>
        <h2
          data-reveal
          className={`text-[clamp(40px,7vw,96px)] leading-[0.98] mb-8 ${isGeo ? 'font-geo' : ''}`}
        >
          {t('portal.title_a')}
          <em className="text-[var(--mata-amber)]">{t('portal.title_accent')}</em>
          {t('portal.title_b')}
        </h2>
        <p data-reveal className={`opacity-75 text-lg max-w-xl mb-10 ${isGeo ? 'font-geo' : ''}`}>
          {t('portal.subtitle')}
        </p>
        <ul className="space-y-4 max-w-md">
          {(['plan', 'meals', 'videos', 'bookings'] as const).map((k, i) => (
            <li key={k} data-reveal className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--mata-amber)] w-6">
                0{i + 1}
              </span>
              <span className={`opacity-85 ${isGeo ? 'font-geo' : ''}`}>{captions[k]}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* The visual phone is rendered in the global Canvas behind. This
          column reserves layout space so the DOM and 3D phone align. */}
      <div className="hidden md:block min-h-[80svh]" aria-hidden="true" />
    </section>
  );
}
