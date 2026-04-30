import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LANGS = ['ka', 'en', 'ru'] as const;

export function Nav() {
  const { i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cycleLang = () => {
    const i = LANGS.indexOf(i18n.language as (typeof LANGS)[number]);
    const next = LANGS[(i + 1) % LANGS.length];
    void i18n.changeLanguage(next);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-[var(--mata-navy-900)]/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="section-x flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-3">
          <img src="/mata-logo-transparent.png" alt="Mata Fitness" className="h-8 w-auto" />
          <span className="font-mono text-xs tracking-[0.3em] uppercase opacity-80">
            Mata · Fitness
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-[0.22em] opacity-80">
          <a href="#programs" className="hover:text-[var(--mata-amber)]">
            Programs
          </a>
          <a href="#trainers" className="hover:text-[var(--mata-amber)]">
            Coaches
          </a>
          <a href="#portal" className="hover:text-[var(--mata-amber)]">
            Portal
          </a>
          <a href="#pricing" className="hover:text-[var(--mata-amber)]">
            Pricing
          </a>
          <a href="#locations" className="hover:text-[var(--mata-amber)]">
            Visit
          </a>
        </nav>
        <button
          onClick={cycleLang}
          className="font-mono text-xs uppercase tracking-[0.3em] border border-[var(--mata-paper)]/30 px-3 py-1.5 hover:border-[var(--mata-amber)] hover:text-[var(--mata-amber)] transition-colors"
          aria-label="Switch language"
        >
          {i18n.language?.slice(0, 2).toUpperCase()}
        </button>
      </div>
    </header>
  );
}
