import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Principle = { n: string; title: string; desc: string };

export function Manifesto() {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isGeo = i18n.language === 'ka';
  const principles = (t('manifesto.principles', { returnObjects: true }) as Principle[]) ?? [];
  const headline = t('manifesto.headline');
  const words = headline.split(/\s+/);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const wordEls = ref.current!.querySelectorAll<HTMLElement>('[data-word]');
      gsap.fromTo(
        wordEls,
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.5,
          },
        }
      );

      gsap.from(ref.current!.querySelectorAll('[data-principle]'), {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        ease: 'power3.out',
        duration: 0.9,
        scrollTrigger: {
          trigger: ref.current!.querySelector('[data-principles]'),
          start: 'top 80%',
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="manifesto" className="section-x py-40">
      <p className="pilcrow mb-10">{t('manifesto.eyebrow')}</p>
      <p
        className={`max-w-4xl text-[clamp(28px,4vw,52px)] leading-[1.18] tracking-[-0.01em] mb-24 ${
          isGeo ? 'font-geo' : ''
        }`}
      >
        {words.map((w, i) => (
          <span key={i} data-word className="inline-block mr-[0.25em]">
            {w}
          </span>
        ))}
      </p>
      <div data-principles className="grid md:grid-cols-3 gap-12 max-w-6xl">
        {principles.map((p) => (
          <article key={p.n} data-principle>
            <p className="font-mono text-xs tracking-[0.3em] text-[var(--mata-amber)] mb-4">
              {p.n}
            </p>
            <h3 className={`text-2xl md:text-3xl leading-tight mb-3 ${isGeo ? 'font-geo' : ''}`}>
              {p.title}
            </h3>
            <p className={`opacity-70 text-base leading-relaxed ${isGeo ? 'font-geo' : ''}`}>
              {p.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
