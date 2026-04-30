import type { ReactNode, AnchorHTMLAttributes } from 'react';

type Tone = 'amber' | 'outline' | 'ghost';

export function Pill({
  href,
  children,
  tone = 'amber',
  size = 'md',
  ...rest
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg';
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>) {
  const tones: Record<Tone, string> = {
    amber: 'bg-[var(--mata-amber)] text-[var(--mata-navy-900)] hover:bg-[var(--mata-amber-soft)]',
    outline:
      'border border-[var(--mata-paper)] text-[var(--mata-paper)] hover:bg-[var(--mata-paper)] hover:text-[var(--mata-navy-900)]',
    ghost: 'text-[var(--mata-paper)] hover:text-[var(--mata-amber)]',
  };
  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-7 py-3.5',
  };
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 font-mono uppercase tracking-[0.18em] transition-colors duration-200 rounded-[2px] ${tones[tone]} ${sizes[size]}`}
      {...rest}
    >
      {children}
    </a>
  );
}
