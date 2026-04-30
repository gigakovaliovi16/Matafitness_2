import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReveal } from '../scroll/director';
import { Pill } from '../components/Pill';
import { PHONE_INTL, TELEPHONE_HREF } from '../lib/brand';

export function FinalCTA() {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const isGeo = i18n.language === 'ka';

  return (
    <section ref={ref} className="section-x py-40 text-center relative overflow-hidden">
      <p data-reveal className="pilcrow mb-8">
        {t('final_cta.eyebrow')}
      </p>
      <h2
        data-reveal
        className={`text-[clamp(48px,9vw,128px)] leading-[0.92] mb-4 ${isGeo ? 'font-geo' : ''}`}
      >
        {t('final_cta.headline_a')}
      </h2>
      <h2
        data-reveal
        className={`text-[clamp(40px,8vw,112px)] leading-[0.95] mb-10 ${isGeo ? 'font-geo' : ''}`}
      >
        <em className="text-[var(--mata-amber)]">{t('final_cta.headline_accent')}</em>
        {t('final_cta.headline_b_post')}
      </h2>
      <p
        data-reveal
        className={`max-w-xl mx-auto opacity-80 mb-12 text-lg ${isGeo ? 'font-geo' : ''}`}
      >
        {t('final_cta.body')}
      </p>
      <div data-reveal className="flex flex-wrap items-center justify-center gap-4">
        <Pill href="/start-trial" tone="amber" size="lg">
          {t('final_cta.cta_primary')} →
        </Pill>
        <Pill href="/contact-sales" tone="outline" size="lg">
          {t('final_cta.cta_secondary')}
        </Pill>
      </div>
      <p data-reveal className="font-mono text-xs tracking-[0.3em] uppercase opacity-50 mt-10">
        OR CALL{' '}
        <a href={TELEPHONE_HREF} className="hover:text-[var(--mata-amber)]">
          {PHONE_INTL}
        </a>
      </p>
    </section>
  );
}
