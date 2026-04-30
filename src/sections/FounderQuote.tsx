import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReveal } from '../scroll/director';
import { Pill } from '../components/Pill';

export function FounderQuote() {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const isGeo = i18n.language === 'ka';

  return (
    <section ref={ref} className="section-x py-40 bg-[var(--mata-ink)]/40">
      <div className="grid md:grid-cols-12 gap-12 max-w-6xl items-center">
        <div data-reveal className="md:col-span-5">
          <div className="aspect-[3/4] overflow-hidden bg-[var(--mata-navy-800)]">
            <img
              src="/tato-mata-founder.jpg"
              alt={t('founder.name')}
              loading="lazy"
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </div>
        <div className="md:col-span-7">
          <p data-reveal className="pilcrow mb-6">
            {t('founder.eyebrow')}
          </p>
          <blockquote
            data-reveal
            className={`text-[clamp(22px,2.6vw,40px)] leading-[1.32] mb-10 ${isGeo ? 'font-geo' : ''}`}
          >
            <span className="text-[var(--mata-amber)] text-5xl leading-none mr-2 align-top">“</span>
            {t('founder.quote')}
          </blockquote>
          <div data-reveal className={`mb-2 text-xl ${isGeo ? 'font-geo' : ''}`}>
            — {t('founder.signature')}
          </div>
          <p data-reveal className="font-mono text-[10px] tracking-[0.3em] opacity-50 uppercase mb-10">
            {t('founder.signature_meta')}
          </p>
          <div data-reveal>
            <Pill href="/academy" tone="outline">
              {t('founder.cta')} →
            </Pill>
          </div>
        </div>
      </div>
    </section>
  );
}
