const mapsEmbed = (q: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`

export interface LocationCentre {
  name: string
  area: string
  embedUrl: string
}

export interface LocationData {
  slug: string
  area: string
  metaTitle: string
  metaDescription: string
  h1: string
  heroSub: string
  /** Unique intro paragraphs (avoid duplicate content across pages). */
  intro: string[]
  nearby: string[]
  centres: LocationCentre[]
  faqs: { q: string; a: string }[]
}

export const locations: LocationData[] = [
  {
    slug: 'chess-classes-dombivli',
    area: 'Dombivli',
    metaTitle: 'Chess Classes in Dombivli | DD Chess Academy — FIDE Trainer',
    metaDescription:
      'Chess classes in Dombivli for kids (age 5+) & adults under National Arbiter & FIDE Trainer Dipak Dhuri. Small batches, structured coaching, regular tournaments. Book a free demo.',
    h1: 'Chess Classes in Dombivli',
    heroSub:
      'Professional chess coaching for children and adults across Dombivli — from complete beginners to tournament players, under a National Arbiter & FIDE Trainer.',
    intro: [
      'Looking for the right **chess classes in Dombivli**? DD Chess Academy has coached hundreds of students across Dombivli East and West — building focus, patience and real competitive skill on the board. Our students regularly win trophies at inter-school and district tournaments around the Kalyan–Dombivli region.',
      'Every batch is led under **National Arbiter & FIDE Trainer Dipak Dhuri**, with a clear beginner-to-advanced curriculum and deliberately small groups so each child gets personal attention. Classes are conducted in **Hindi, Marathi and English**, so every student learns comfortably.',
    ],
    nearby: ['Dombivli East', 'Dombivli West', 'Manpada', 'Nandivali', 'Tilak Nagar', 'Ayre Road'],
    centres: [
      {
        name: 'Little Krishna Preschool & Kidzcare',
        area: 'Dombivli East',
        embedUrl: mapsEmbed('Little Krishna Preschool & Kidzcare, Dombivli, Maharashtra'),
      },
      {
        name: 'Atharva Playgroup',
        area: 'Nandivali, Dombivli',
        embedUrl: mapsEmbed('Atharva Playgroup, Nandivali, Dombivli, Maharashtra'),
      },
    ],
    faqs: [
      {
        q: 'Where are your chess classes in Dombivli?',
        a: 'We run centres in Dombivli East (Little Krishna Preschool, Ursekar Wadi) and Nandivali, serving families across Dombivli East, West, Manpada and nearby areas.',
      },
      {
        q: 'What age can my child start chess in Dombivli?',
        a: 'Children aged five and above are welcome. We have dedicated beginner batches designed specially for young children, plus classes for teens and adults.',
      },
      {
        q: 'Do you offer a free demo chess class in Dombivli?',
        a: 'Yes — book a free demo so your child can experience the coaching before enrolling. Reach out on WhatsApp or the enquiry form.',
      },
    ],
  },
  {
    slug: 'chess-classes-kalyan',
    area: 'Kalyan',
    metaTitle: 'Chess Classes in Kalyan | DD Chess Academy — FIDE Trainer',
    metaDescription:
      'Chess coaching for the Kalyan region — kids & adults, beginner to advanced, under National Arbiter & FIDE Trainer Dipak Dhuri. Centres near Kalyan in Nandivali, Thakurli & Dombivli. Free demo.',
    h1: 'Chess Classes in Kalyan',
    heroSub:
      'Structured, professional chess coaching serving Kalyan and the surrounding areas — taught by a National Arbiter & FIDE Trainer.',
    intro: [
      'Families across **Kalyan** are choosing DD Chess Academy for serious, structured chess coaching. Our nearby centres in Nandivali, Thakurli and Dombivli East are an easy reach for students from Kalyan West, Kalyan East and Khadakpada — and our students compete regularly in tournaments right across the Kalyan–Dombivli belt.',
      'Under **National Arbiter & FIDE Trainer Dipak Dhuri**, students follow a clear path from their first move to rated tournament play, in small batches with genuine personal attention. Coaching is available in **Hindi, Marathi and English**.',
    ],
    nearby: ['Kalyan West', 'Kalyan East', 'Khadakpada', 'Nandivali', 'Shil Phata', 'Dombivli'],
    centres: [
      {
        name: 'Atharva Playgroup',
        area: 'Nandivali (near Kalyan)',
        embedUrl: mapsEmbed('Atharva Playgroup, Nandivali, Dombivli, Maharashtra'),
      },
      {
        name: 'Atharva Playgroup',
        area: 'Thakurli (near Kalyan)',
        embedUrl: mapsEmbed('Atharva Playgroup, Thakurli, Dombivli, Maharashtra'),
      },
    ],
    faqs: [
      {
        q: 'Do you have chess classes near Kalyan?',
        a: 'Yes. Our centres in Nandivali and Thakurli are close to Kalyan, and students travel from Kalyan West, Kalyan East and Khadakpada for our coaching.',
      },
      {
        q: 'Are the classes suitable for complete beginners in Kalyan?',
        a: 'Absolutely. Many students start with no prior knowledge of chess. Our structured beginner curriculum starts from the very first move.',
      },
      {
        q: 'Is there a free trial class?',
        a: 'Yes — book a free demo class on WhatsApp or via the enquiry form and see the coaching for yourself before enrolling.',
      },
    ],
  },
  {
    slug: 'chess-classes-thakurli',
    area: 'Thakurli',
    metaTitle: 'Chess Classes in Thakurli | DD Chess Academy — FIDE Trainer',
    metaDescription:
      'Chess classes in Thakurli for kids (5+) & adults under National Arbiter & FIDE Trainer Dipak Dhuri. Small batches, structured curriculum, tournaments. Book a free demo class.',
    h1: 'Chess Classes in Thakurli',
    heroSub:
      'Professional chess coaching in Thakurli for all ages — a warm, structured place to learn the game, led by a National Arbiter & FIDE Trainer.',
    intro: [
      'DD Chess Academy brings professional **chess classes to Thakurli** at our Atharva Playgroup centre — convenient for families in Thakurli, and easily reached from Dombivli and Kalyan. Students here progress from the basics to competitive tournament play in a supportive, encouraging environment.',
      'All coaching is led under **National Arbiter & FIDE Trainer Dipak Dhuri**, with small batches, a step-by-step curriculum, and regular tournament exposure. Classes are taught in **Hindi, Marathi and English**.',
    ],
    nearby: ['Thakurli East', 'Thakurli West', 'Dombivli', 'Kalyan', 'Desai Village'],
    centres: [
      {
        name: 'Atharva Playgroup',
        area: 'Thakurli',
        embedUrl: mapsEmbed('Atharva Playgroup, Thakurli, Dombivli, Maharashtra'),
      },
    ],
    faqs: [
      {
        q: 'Where is your Thakurli chess class located?',
        a: 'Our Thakurli centre runs at Atharva Playgroup, convenient for families in Thakurli and easily reached from Dombivli and Kalyan.',
      },
      {
        q: 'What ages do you coach in Thakurli?',
        a: 'Students aged five and above — from young beginners to teens and adults. We place every student where they will grow fastest.',
      },
      {
        q: 'Can we try a class first?',
        a: 'Yes, we offer a free demo class. Book it on WhatsApp or through the enquiry form.',
      },
    ],
  },
]

export function getLocation(slug: string): LocationData | undefined {
  return locations.find((l) => l.slug === slug)
}
