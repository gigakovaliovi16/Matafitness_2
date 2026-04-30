/**
 * Brand placeholders — replaced in-place by `node scripts/setup-brand.mjs`.
 *
 * Each value is a literal `{{TOKEN}}` string that setup-brand searches for
 * across the codebase. After running the script, these become real values
 * like "Acme Inc." — no further work needed.
 *
 * Do not remove or rename these constants. Setup-brand relies on them.
 */
export const APP_NAME = "Mata Fitness";
export const COMPANY_NAME = "Mata Fitness LLC";
export const DOMAIN = "https://matafitness.ge";
export const SUPPORT_EMAIL = "matafitnessinfo@gmail.com";
export const JURISDICTION = "Tbilisi, Georgia";

// Refund window. Must match the promise on landing.tsx and pricing.tsx.
// If you change this, also update any marketing assets.
export const REFUND_DAYS = 30;

// ─────────────────────────────────────────────────────────────
// Mata-specific branding extensions
// Consumed by the marketing site (landing, locations, portal preview).
// ─────────────────────────────────────────────────────────────

export const BRAND_COLORS = {
  navy900: "#0b0b18",
  navy800: "#141428",
  navy700: "#1c1c36",
  orange: "#f7931e",
  orange400: "#ffb04a",
  orange600: "#e3840f",
} as const;

export const PHONE = "595 29 33 88";
export const PHONE_INTL = "+995 595 29 33 88";
export const TELEPHONE_HREF = "tel:+995595293388";

export const LOCATIONS = [
  {
    id: "moskovis",
    name: "Mata · Moskovi",
    address: "მოსკოვის ქამბ. 29",
    addressEn: "Moskovi Ave. 29",
    hours: "ორ—პარ 06:00—23:00 · შაბ—კვ 08:00—22:00",
    amenities: ["Parking", "Sauna", "Group Classes", "Café"],
  },
  {
    id: "vekuas",
    name: "Mata · Vekua",
    address: "ი. ვეკუას N4",
    addressEn: "I. Vekua str. 4",
    hours: "ორ—პარ 07:00—23:00 · შაბ—კვ 09:00—22:00",
    amenities: ["Parking", "CrossFit Box", "Juice Bar"],
  },
] as const;

export const SOCIAL = {
  facebook: "https://www.facebook.com/matafitness",
  instagram: "https://www.instagram.com/mata_fitness/",
} as const;

export const STATS = {
  trainers: "15+",
  members: "2K+",
  locations: "2",
} as const;

// ─────────────────────────────────────────────────────────────
// Pricing — single source of truth for the membership numbers.
// The Pricing component reads from here so updates land in one
// edit. Currency follows the GEL brand convention (`₾`); annual
// discount is encoded as a flat number (multiply by 10 to get
// the per-year figure used as priceA).
// ─────────────────────────────────────────────────────────────
export const PRICING = {
  currency: "₾", // Georgian lari
  /** Number of months billed when the annual lever is on. Two months free
   *  on annual is the current Mata membership policy. Update here when
   *  the actual policy changes; the badge ("-2 months") is i18n-driven. */
  annualMonths: 10,
  tiers: {
    member: {
      monthly: 120,
      annual: 1200,
    },
    atelier: {
      monthly: 380,
      annual: 3800,
    },
    dropIn: {
      visit: 25,
    },
  },
} as const;

// Headline numbers used in the Stance body line. Extracted so the
// "Two thousand" / "Fifteen" / "Two houses" trio can be kept
// truthful as the gym grows. The Stance component formats these as
// English words; we keep both the numeric value (for analytics or
// schema markup) and the spelled-out form (for the editorial copy).
export const HEADLINE_STATS = {
  members: { count: 2000, words: "Two thousand" },
  coaches: { count: 15, words: "Fifteen" },
  houses: { count: 2, words: "Two" },
} as const;
