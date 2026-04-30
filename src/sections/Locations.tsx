import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReveal } from '../scroll/director';
import { LOCATIONS, PHONE_INTL, TELEPHONE_HREF, SUPPORT_EMAIL, SOCIAL } from '../lib/brand';

const PHOTOS = ['/mata-cover.jpg', '/mata-yoga-room.jpg'] as const;
const ROMAN = ['I', 'II'] as const;

export function Locations() {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const isGeo = i18n.language === 'ka';

  return (
    <section ref={ref} id="locations" className="section-x py-32">
      <p data-reveal className="pilcrow mb-8">
        {t('locations.eyebrow')}
      </p>
      <h2
        data-reveal
        className={`text-[clamp(40px,7vw,96px)] leading-[0.98] mb-6 ${isGeo ? 'font-geo' : ''}`}
      >
        {t('locations.title_a')}
        <em className="text-[var(--mata-amber)]">{t('locations.title_accent')}</em>
        {t('locations.title_b')}
      </h2>
      <p data-reveal className={`opacity-70 max-w-xl mb-12 ${isGeo ? 'font-geo' : ''}`}>
        {t('locations.body')}
      </p>
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mb-16">
        {LOCATIONS.map((loc, i) => (
          <article key={loc.id} data-reveal className="relative overflow-hidden aspect-[4/5]">
            <img src={PHOTOS[i]} alt={loc.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--mata-navy-900)] via-[var(--mata-navy-900)]/40 to-transparent" />
            <span className="absolute top-6 right-6 font-display text-[80px] leading-none italic text-[var(--mata-amber)]/80">
              {ROMAN[i]}
            </span>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className={`text-3xl mb-2 ${isGeo ? 'font-geo' : ''}`}>{loc.name}</h3>
              <p className={`opacity-85 mb-1 ${isGeo ? 'font-geo' : ''}`}>
                {isGeo ? loc.address : loc.addressEn}
              </p>
              <p className={`font-mono text-[10px] tracking-[0.22em] uppercase opacity-60 mb-4 ${isGeo ? 'font-geo' : ''}`}>
                {loc.hours}
              </p>
              <div className="flex items-center gap-2 text-[var(--mata-amber)]">
                <span className="w-2 h-2 rounded-full bg-[var(--mata-amber)] animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
                  {t('locations.open_now')}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
        <ContactBlock label={t('locations.contact.call')} value={PHONE_INTL} href={TELEPHONE_HREF} />
        <ContactBlock label={t('locations.contact.write')} value={SUPPORT_EMAIL} href={`mailto:${SUPPORT_EMAIL}`} />
        <ContactBlock label={t('locations.contact.follow')} value="@mata_fitness" href={SOCIAL.instagram} external />
      </div>
    </section>
  );
}

function ContactBlock({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="group block py-6 border-t border-[var(--mata-paper)]/15 hover:border-[var(--mata-amber)] transition-colors"
    >
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-3">{label}</p>
      <p className="text-xl group-hover:text-[var(--mata-amber)] transition-colors">{value}</p>
    </a>
  );
}
