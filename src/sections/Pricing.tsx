import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReveal } from '../scroll/director';
import { Pill } from '../components/Pill';
import { PRICING } from '../lib/brand';

type Tier = {
  key: 'drop-in' | 'member' | 'atelier';
  name: string;
  cad: string;
  unit?: string;
  unit_monthly?: string;
  unit_annual?: string;
  desc: string;
  includes: string[];
  ctaLabel: string;
};

export function Pricing() {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [annual, setAnnual] = useState(false);
  const isGeo = i18n.language === 'ka';
  const tiers = (t('pricing.tiers', { returnObjects: true }) as Tier[]) ?? [];

  const priceFor = (tier: Tier) => {
    if (tier.key === 'drop-in') return `${PRICING.currency}${PRICING.tiers.dropIn.visit}`;
    if (tier.key === 'member')
      return `${PRICING.currency}${annual ? PRICING.tiers.member.annual : PRICING.tiers.member.monthly}`;
    return `${PRICING.currency}${annual ? PRICING.tiers.atelier.annual : PRICING.tiers.atelier.monthly}`;
  };

  const unitFor = (tier: Tier) => {
    if (tier.key === 'drop-in') return tier.unit;
    return annual ? tier.unit_annual : tier.unit_monthly;
  };

  return (
    <section ref={ref} id="pricing" className="section-x py-32">
      <p data-reveal className="pilcrow mb-8">
        {t('pricing.eyebrow')}
      </p>
      <h2
        data-reveal
        className={`text-[clamp(40px,7vw,96px)] leading-[0.98] mb-6 ${isGeo ? 'font-geo' : ''}`}
      >
        {t('pricing.title_a')}
        <em className="text-[var(--mata-amber)]">{t('pricing.title_accent')}</em>
        {t('pricing.title_b')}
      </h2>
      <p data-reveal className={`opacity-70 max-w-xl mb-12 ${isGeo ? 'font-geo' : ''}`}>
        {t('pricing.subtitle')}
      </p>
      <div data-reveal className="inline-flex border border-[var(--mata-paper)]/25 mb-12 select-none">
        <button
          onClick={() => setAnnual(false)}
          className={`px-5 py-2.5 font-mono text-xs tracking-[0.22em] uppercase transition-colors ${
            !annual ? 'bg-[var(--mata-paper)] text-[var(--mata-navy-900)]' : 'opacity-70'
          }`}
        >
          {t('pricing.monthly')}
        </button>
        <button
          onClick={() => setAnnual(true)}
          className={`px-5 py-2.5 font-mono text-xs tracking-[0.22em] uppercase transition-colors ${
            annual ? 'bg-[var(--mata-paper)] text-[var(--mata-navy-900)]' : 'opacity-70'
          }`}
        >
          {t('pricing.annual')}{' '}
          <span className="text-[var(--mata-amber)] ml-2">{t('pricing.annual_badge')}</span>
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl">
        {tiers.map((tier) => (
          <article
            key={tier.key}
            data-reveal
            className={`flex flex-col p-8 border ${
              tier.key === 'member'
                ? 'bg-[var(--mata-paper)] text-[var(--mata-navy-900)] border-[var(--mata-paper)]'
                : 'bg-[var(--mata-navy-800)]/60 border-[var(--mata-paper)]/15'
            }`}
          >
            <p
              className={`font-mono text-[10px] tracking-[0.3em] uppercase mb-2 ${
                tier.key === 'member' ? 'text-[var(--mata-amber-deep)]' : 'text-[var(--mata-amber)]'
              }`}
            >
              {tier.cad}
            </p>
            <h3 className={`text-3xl mb-6 ${isGeo ? 'font-geo' : ''}`}>{tier.name}</h3>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[clamp(34px,5vw,64px)] leading-none">{priceFor(tier)}</span>
              <span className="font-mono text-xs tracking-[0.18em] uppercase opacity-70">
                {unitFor(tier)}
              </span>
            </div>
            <p className={`opacity-80 mb-8 ${isGeo ? 'font-geo' : ''}`}>{tier.desc}</p>
            <ul className="space-y-2 mb-10 flex-1">
              {tier.includes.map((inc) => (
                <li key={inc} className={`text-sm ${isGeo ? 'font-geo' : ''}`}>
                  · {inc}
                </li>
              ))}
            </ul>
            <Pill
              href={tier.key === 'atelier' ? '/contact-sales' : '/start-trial'}
              tone={tier.key === 'member' ? 'amber' : 'outline'}
            >
              {tier.ctaLabel}
            </Pill>
          </article>
        ))}
      </div>
    </section>
  );
}
