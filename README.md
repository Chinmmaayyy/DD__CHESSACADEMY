# DD Chess Academy — Website

Premium marketing site for DD Chess Academy, built entirely to the
**Master Specification (v1–v16)** — the single source of truth in `../`.
Motion values follow `../DD_Chess_Academy_Master_Specification_v16.md`.

## Stack
- **React 19 + Vite + TypeScript**
- **Tailwind CSS v4** (design tokens in `src/index.css`)
- **Framer Motion** (motion system)
- **React Hook Form + Zod** (enquiry form)
- **Lucide React** (icons)

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build
```

## Design system
- **Colors:** navy `#0B1220`, gold `#D4AF37`, royal `#2563EB`, ivory `#F8FAFC`
- **Type:** Playfair Display (headings) + Inter (body)
- Tokens live in `src/index.css` under `@theme` — never hardcode colors.

## Structure
```
src/
├── components/
│   ├── ui/        Button, Container, Section, SectionHeading, Badge, Reveal
│   ├── layout/    Navbar, Footer, WhatsAppFab, ScrollToTop, ScrollProgress
│   └── forms/     EnquiryForm + Zod schema
├── sections/      Hero, Stats, WhyChoose, Coach, Courses, Achievements,
│                  Gallery, Testimonials, Events, Branches, Faq, Contact
├── pages/         HomePage
├── data/          Typed content (coach, courses, branches, testimonials…)
├── hooks/         useCountUp
├── lib/           utils, constants, motion
└── types/         Shared interfaces
```

## ⚠️ Before launch — replace placeholders
These are stubbed and must be updated with real academy details:

| Location | What to replace |
|---|---|
| `src/lib/constants.ts` | Phone, WhatsApp number, email, social links |
| `src/data/branches.ts` | Real Google Maps URLs for each centre |
| `src/data/testimonials.ts` | Authentic, consented reviews only |
| `src/data/events.ts` | Real event calendar |
| `src/data/achievements.ts` | Real student achievements |
| `src/sections/Coach.tsx` | Swap the portrait placeholder for `coach-dipak-dhuri.webp` |
| `src/sections/Gallery.tsx` | Real academy photos (WebP, 1600px+) |
| `public/og-image.jpg` | Add a 1200×630 Open Graph image |

## Enquiry form
Currently simulates submission (logs to console + success state). Wire
`onSubmit` in `src/components/forms/EnquiryForm.tsx` to `POST /api/v1/enquiries`
(see Master Spec v13) when the backend is ready.
