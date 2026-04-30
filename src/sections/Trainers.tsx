import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReveal } from '../scroll/director';

type Coach = {
  slug: string;
  nameKa: string;
  nameEn: string;
  role: string;
  portrait: string;
  action: string;
};

const COACHES: Coach[] = [
  {
    slug: 'giorgi-tsiklauri',
    nameKa: 'გიორგი წიკლაური',
    nameEn: 'Giorgi Tsiklauri',
    role: 'Head Coach · Strength',
    portrait: '/mata-head-trainer-giorgi.jpg',
    action: '/mata-head-coach-giorgi-action.jpg',
  },
  {
    slug: 'sandro-jibgashvili',
    nameKa: 'სანდრო ჯიბღაშვილი',
    nameEn: 'Sandro Jibgashvili',
    role: 'HIIT · Conditioning',
    portrait: '/mata-trainer-sandro.jpg',
    action: '/mata-trainer-sandro-action.jpg',
  },
  {
    slug: 'gigi-mamatsashvili',
    nameKa: 'გიგი მამაცაშვილი',
    nameEn: 'Gigi Mamatsashvili',
    role: 'Strength · CrossFit',
    portrait: '/mata-trainer-giorgi.jpg',
    action: '/mata-trainer-giorgi-action.jpg',
  },
  {
    slug: 'mariam-koridze',
    nameKa: 'მარიამ ქორიძე',
    nameEn: 'Mariam Koridze',
    role: 'Pilates · Mobility',
    portrait: '/mata-trainer-mariam.jpg',
    action: '/mata-trainer-mariam.jpg',
  },
];

export function Trainers() {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const isGeo = i18n.language === 'ka';

  return (
    <section ref={ref} id="trainers" className="section-x py-32">
      <p data-reveal className="pilcrow mb-8">
        {t('trainers.eyebrow')}
      </p>
      <h2
        data-reveal
        className={`text-[clamp(40px,7vw,96px)] leading-[0.98] mb-6 ${isGeo ? 'font-geo' : ''}`}
      >
        {t('trainers.title_a')}
        <em className="text-[var(--mata-amber)]">{t('trainers.title_accent')}</em>
        {t('trainers.title_b')}
      </h2>
      <p data-reveal className={`max-w-2xl opacity-70 mb-16 text-lg ${isGeo ? 'font-geo' : ''}`}>
        {t('trainers.body')}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {COACHES.map((c, i) => (
          <a
            key={c.slug}
            data-reveal
            href={`/trainers/${c.slug}`}
            className="group relative overflow-hidden bg-[var(--mata-navy-800)] aspect-[3/4] block"
          >
            <img
              src={c.portrait}
              alt={isGeo ? c.nameKa : c.nameEn}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            <img
              src={c.action}
              alt=""
              loading="lazy"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--mata-navy-900)] via-transparent to-transparent" />
            <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.3em] opacity-70">
              {String(i + 1).padStart(2, '0')} / {String(COACHES.length).padStart(2, '0')}
            </span>
            <div className="absolute bottom-4 left-4 right-4">
              <p className={`text-xl leading-tight mb-1 ${isGeo ? 'font-geo' : ''}`}>
                {isGeo ? c.nameKa : c.nameEn}
              </p>
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-70">
                {c.role}
              </p>
            </div>
            <span className="absolute bottom-4 right-4 w-9 h-9 border border-[var(--mata-paper)]/30 flex items-center justify-center text-[var(--mata-amber)] transition-transform duration-500 group-hover:-rotate-45 group-hover:border-[var(--mata-amber)]">
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
