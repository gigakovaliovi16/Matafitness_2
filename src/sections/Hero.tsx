import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import { Pill } from '../components/Pill';

export function Hero() {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current || !titleRef.current) return;
    const ctx = gsap.context(() => {
      const chars = titleRef.current!.querySelectorAll<HTMLElement>('[data-c]');
      gsap.from(chars, {
        opacity: 0,
        y: 60,
        rotationX: -45,
        stagger: 0.018,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2,
      });

      gsap.fromTo(
        ref.current!.querySelector('[data-hero-content]'),
        { y: 0, opacity: 1 },
        {
          y: -120,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const line1 = t('hero.title_line1');
  const line2 = t('hero.title_line2');
  const isGeo = i18n.language === 'ka';

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100svh] flex flex-col justify-end pb-24 section-x"
    >
      <div data-hero-content className="max-w-5xl">
        <p className="pilcrow mb-6">{t('hero.eyebrow')}</p>
        <h1
          ref={titleRef}
          className={`text-[clamp(48px,11vw,180px)] leading-[0.92] tracking-[-0.02em] mb-8 ${
            isGeo ? 'font-geo' : ''
          }`}
        >
          <span className="block">
            {Array.from(line1).map((c, i) => (
              <span data-c key={`a-${i}`} className="inline-block">
                {c === ' ' ? ' ' : c}
              </span>
            ))}
          </span>
          <span className="block italic text-[var(--mata-amber)]">
            {Array.from(line2).map((c, i) => (
              <span data-c key={`b-${i}`} className="inline-block">
                {c === ' ' ? ' ' : c}
              </span>
            ))}
          </span>
        </h1>
        <p className={`max-w-xl text-base md:text-lg opacity-80 mb-10 ${isGeo ? 'font-geo' : ''}`}>
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <Pill href="/start-trial" tone="amber" size="lg">
            {t('hero.cta_primary')} →
          </Pill>
          <Pill href="#pricing" tone="outline" size="lg">
            {t('hero.cta_secondary')}
          </Pill>
        </div>
      </div>
      {/* scroll hint */}
      <div className="absolute bottom-6 right-8 hidden md:flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] uppercase opacity-50">
        <span>{t('hero.scroll')}</span>
        <span className="w-12 h-[1px] bg-[var(--mata-paper)]/40" />
      </div>
    </section>
  );
}
