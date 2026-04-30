import { useTranslation } from 'react-i18next';
import { PHONE_INTL, TELEPHONE_HREF, SUPPORT_EMAIL, SOCIAL } from '../lib/brand';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="section-x pt-24 pb-10 border-t border-[var(--mata-paper)]/10">
      <div className="grid md:grid-cols-12 gap-10 max-w-6xl">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <img src="/mata-logo-transparent.png" alt="" className="h-9 w-auto" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase">{t('footer.tagline')}</span>
          </div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-60 mb-6">
            {t('footer.established')}
          </p>
          <p className="opacity-70 max-w-sm">{t('footer.quote')}</p>
        </div>
        <FooterCol
          label="HOUSES"
          items={[
            { l: 'Moscow Ave.', h: '#locations' },
            { l: 'Vekua St.', h: '#locations' },
          ]}
        />
        <FooterCol
          label="PRACTICE"
          items={[
            { l: 'Programs', h: '#programs' },
            { l: 'Coaches', h: '#trainers' },
            { l: 'Academy', h: '/academy' },
          ]}
        />
        <FooterCol
          label="VISIT"
          items={[
            { l: 'Membership', h: '#pricing' },
            { l: 'Portal', h: '#portal' },
            { l: 'Contact', h: '/contact-sales' },
          ]}
        />
        <FooterCol
          label="REACH"
          items={[
            { l: PHONE_INTL, h: TELEPHONE_HREF },
            { l: SUPPORT_EMAIL, h: `mailto:${SUPPORT_EMAIL}` },
            { l: 'Instagram', h: SOCIAL.instagram, ext: true },
          ]}
        />
      </div>
      <div className="border-t border-[var(--mata-paper)]/10 mt-16 pt-6 flex flex-wrap justify-between gap-3 font-mono text-[10px] tracking-[0.25em] uppercase opacity-50">
        <span>{t('footer.copyright', { year })}</span>
        <span>VOL. 09 · SPRING ’26</span>
      </div>
    </footer>
  );
}

function FooterCol({
  label,
  items,
}: {
  label: string;
  items: { l: string; h: string; ext?: boolean }[];
}) {
  return (
    <div className="md:col-span-2">
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-4">{label}</p>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.l}>
            <a
              href={it.h}
              {...(it.ext ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="text-sm hover:text-[var(--mata-amber)] transition-colors"
            >
              {it.l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
