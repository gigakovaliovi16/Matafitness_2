import { Pill } from '../components/Pill';

export default function StartTrial() {
  return (
    <main className="min-h-screen section-x py-32 max-w-3xl">
      <p className="pilcrow mb-6">START · 7-DAY TRIAL</p>
      <h1 className="text-[clamp(40px,7vw,96px)] leading-[0.98] mb-8">
        Show up. <em className="text-[var(--mata-amber)]">Move</em> with intention.
      </h1>
      <p className="opacity-80 mb-10 text-lg">
        Your first visit is free. Pick a time, show up. We&rsquo;ll take care of the rest.
      </p>
      <Pill href="/contact-sales" tone="amber" size="lg">
        BOOK A VISIT →
      </Pill>
    </main>
  );
}
