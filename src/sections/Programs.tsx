import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReveal } from '../scroll/director';

type Item = { n: string; en: string; ka: string; summary: string; tags: string[]; img: string };

export function Programs() {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const isGeo = i18n.language === 'ka';
  const items = (t('programs.items', { returnObjects: true }) as Item[]) ?? [];

  return (
    <section ref={ref} id="programs" className="section-x py-32 border-t border-[var(--mata-paper)]/8">
      <p data-reveal className="pilcrow mb-8">
        {t('programs.eyebrow')}
      </p>
      <h2
        data-reveal
        className={`text-[clamp(40px,7vw,96px)] leading-[0.98] mb-16 ${isGeo ? 'font-geo' : ''}`}
      >
        {t('programs.title_a')}{' '}
        <em className="text-[var(--mata-amber)]">{t('programs.title_accent')}</em>
        {t('programs.title_b')}
      </h2>
      <ul className="divide-y divide-[var(--mata-paper)]/12 max-w-6xl">
        {items.map((it) => (
          <li key={it.n} data-reveal className="group">
            <a
              href="#pricing"
              className="grid grid-cols-12 gap-4 py-7 items-baseline hover:translate-x-2 transition-transform duration-500"
            >
              <span className="col-span-1 font-mono text-xs tracking-[0.3em] opacity-50 pt-2">
                {it.n}
              </span>
              <div className="col-span-7 md:col-span-5">
                <h3 className={`text-[clamp(28px,4vw,52px)] leading-tight ${isGeo ? 'font-geo' : ''}`}>
                  {isGeo ? it.ka : it.en}
                </h3>
              </div>
              <p className={`col-span-12 md:col-span-4 opacity-70 ${isGeo ? 'font-geo' : ''}`}>
                {it.summary}
              </p>
              <div className="col-span-12 md:col-span-2 flex flex-wrap gap-2 justify-start md:justify-end">
                {it.tags.map((tg) => (
                  <span
                    key={tg}
                    className="font-mono text-[10px] tracking-[0.18em] uppercase border border-[var(--mata-paper)]/25 px-2 py-1 group-hover:border-[var(--mata-amber)] group-hover:text-[var(--mata-amber)] transition-colors"
                  >
                    {tg}
                  </span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
