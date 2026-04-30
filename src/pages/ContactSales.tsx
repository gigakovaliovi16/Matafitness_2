import { PHONE_INTL, TELEPHONE_HREF, SUPPORT_EMAIL } from '../lib/brand';

export default function ContactSales() {
  return (
    <main className="min-h-screen section-x py-32 max-w-3xl">
      <p className="pilcrow mb-6">CONTACT</p>
      <h1 className="text-[clamp(40px,7vw,96px)] leading-[0.98] mb-12">Reach the front desk.</h1>
      <div className="grid sm:grid-cols-2 gap-8">
        <a href={TELEPHONE_HREF} className="block py-6 border-t border-[var(--mata-paper)]/15 hover:border-[var(--mata-amber)]">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-3">CALL</p>
          <p className="text-2xl">{PHONE_INTL}</p>
        </a>
        <a href={`mailto:${SUPPORT_EMAIL}`} className="block py-6 border-t border-[var(--mata-paper)]/15 hover:border-[var(--mata-amber)]">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-3">WRITE</p>
          <p className="text-2xl">{SUPPORT_EMAIL}</p>
        </a>
      </div>
    </main>
  );
}
