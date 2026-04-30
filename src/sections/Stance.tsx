import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReveal } from '../scroll/director';

export function Stance() {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const isGeo = i18n.language === 'ka';

  return (
    <section ref={ref} className="min-h-[80svh] flex items-end section-x py-32">
      <div className="max-w-4xl">
        <p data-reveal className="pilcrow mb-6">
          {t('stance.eyebrow')}
        </p>
        <h2
          data-reveal
          className={`text-[clamp(36px,6vw,84px)] leading-[1.05] mb-2 ${isGeo ? 'font-geo' : ''}`}
        >
          {t('stance.headline_a')}
        </h2>
        <h2
          data-reveal
          className={`text-[clamp(36px,6vw,84px)] leading-[1.05] mb-2 opacity-90 ${
            isGeo ? 'font-geo' : ''
          }`}
        >
          {t('stance.headline_b')}{' '}
          <em className="text-[var(--mata-amber)]">{t('stance.headline_c_accent')}</em>
        </h2>
        <p data-reveal className={`mt-12 text-lg opacity-75 max-w-2xl ${isGeo ? 'font-geo' : ''}`}>
          {t('stance.body_stats')}
        </p>
        <p data-reveal className={`mt-3 text-lg opacity-75 max-w-2xl ${isGeo ? 'font-geo' : ''}`}>
          {t('stance.body_principle')}
        </p>
      </div>
    </section>
  );
}
