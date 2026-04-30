import { Pill } from '../components/Pill';

export default function Academy() {
  return (
    <main className="min-h-screen section-x py-32 max-w-3xl">
      <p className="pilcrow mb-6">MATA / ACADEMY · APPLY</p>
      <h1 className="text-[clamp(40px,7vw,96px)] leading-[0.98] mb-8">
        Coaches are <em className="text-[var(--mata-amber)]">made on the floor</em>.
      </h1>
      <p className="opacity-80 mb-10 text-lg">
        Twelve weeks of mentorship under the head coach. Programming, technique, coaching craft.
        Two cohorts a year, by application.
      </p>
      <div className="flex gap-4">
        <Pill href="/contact-sales" tone="amber" size="lg">
          APPLY NOW
        </Pill>
        <Pill href="/" tone="outline">
          ← Back home
        </Pill>
      </div>
    </main>
  );
}
