import { Helmet } from 'react-helmet-async';
import { Nav } from '../components/Nav';
import { SceneRoot } from '../three/SceneRoot';
import { Hero } from '../sections/Hero';
import { Stance } from '../sections/Stance';
import { Manifesto } from '../sections/Manifesto';
import { Programs } from '../sections/Programs';
import { Trainers } from '../sections/Trainers';
import { FounderQuote } from '../sections/FounderQuote';
import { PortalTeaser } from '../sections/PortalTeaser';
import { Pricing } from '../sections/Pricing';
import { Locations } from '../sections/Locations';
import { Testimonials } from '../sections/Testimonials';
import { FAQ } from '../sections/FAQ';
import { FinalCTA } from '../sections/FinalCTA';
import { Footer } from '../sections/Footer';

export default function Landing() {
  return (
    <>
      <Helmet>
        <title>Mata Fitness · მატა ფიტნესი — თბილისი</title>
        <meta
          name="description"
          content="მატა ფიტნესი — თბილისის პრემიუმ ფიტნეს კლუბი. 15+ მწვრთნელი, 2000+ წევრი, 2 ლოკაცია."
        />
        <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd())}</script>
      </Helmet>
      <SceneRoot />
      <Nav />
      <main className="relative">
        <Hero />
        <Stance />
        <Manifesto />
        <Programs />
        <Trainers />
        <FounderQuote />
        <PortalTeaser />
        <Pricing />
        <Locations />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}

function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    name: 'Mata Fitness',
    url: 'https://matafitness.ge',
    image: 'https://matafitness.ge/og-image.png',
    telephone: '+995 595 29 33 88',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Moskovi Ave. 29',
        addressLocality: 'Tbilisi',
        addressCountry: 'GE',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'I. Vekua str. 4',
        addressLocality: 'Tbilisi',
        addressCountry: 'GE',
      },
    ],
    sameAs: ['https://www.instagram.com/mata_fitness/', 'https://www.facebook.com/matafitness'],
  };
}
