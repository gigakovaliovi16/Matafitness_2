import { useParams } from 'wouter';
import { Pill } from '../components/Pill';

export default function TrainerDetail() {
  const params = useParams<{ slug: string }>();
  return (
    <main className="min-h-screen section-x py-32 max-w-3xl">
      <p className="pilcrow mb-6">COACH · {params.slug?.toUpperCase()}</p>
      <h1 className="text-[clamp(40px,7vw,96px)] leading-[0.98] mb-8">Coach profile</h1>
      <p className="opacity-80 mb-10 text-lg">
        Detailed bio, schedule, and booking flow live here.
      </p>
      <Pill href="/" tone="outline">
        ← Back home
      </Pill>
    </main>
  );
}
