/**
 * Location-page copy — bilingual, neighborhood-anchored content for each
 * dedicated landing page. Kept separate from the homepage copy registry so
 * the strings are colocated with the page that uses them.
 */

import type { Lang } from './copy'

type LocationCopyOne = {
  /** SEO-critical: appears as the H1 and is the dominant ranking signal. */
  h1: string
  intro: string
  whyTitle: string
  whyBullets: { title: string; body: string }[]
  programsTitle: string
  programs: { name: string; ages: string; blurb: string }[]
  visitTitle: string
  visitBody: string
  ctaPrimary: string
  ctaSecondary: string
  addressLabel: string
  hoursLabel: string
  agesLabel: string
  phoneLabel: string
  ratingLabel: string
  programsBlurb: string
  faqTitle: string
  faq: { q: string; a: string }[]
  otherLocationCta: string
  breadcrumb: { home: string; locations: string }
  metaTitle: string
  metaDescription: string
}

type LocationCopySchema = {
  somerled: LocationCopyOne
  lachine: LocationCopyOne
}

export const LOCATIONS_COPY: Record<Lang, LocationCopySchema> = {
  en: {
    somerled: {
      h1: 'Bilingual Daycare in NDG (Somerled), Montréal',
      intro:
        'Ile Coco on Somerled is our original home — a small, light-filled bilingual daycare in the heart of Notre-Dame-de-Grâce, two minutes from Décarie and a short walk from Parc Notre-Dame-de-Grâce. We welcome children from 18 months to 5 years for full-day care in French and English, with house-made meals, small groups, and zero screens.',
      whyTitle: 'Why families choose our NDG daycare',
      whyBullets: [
        {
          title: 'Bilingual from day one',
          body: 'Educators move fluently between French and English, so children grow into both languages naturally — perfect for the diverse families of NDG, Côte-des-Neiges, and Westmount.',
        },
        {
          title: 'Small groups, calm rooms',
          body: 'A maximum of seven children per educator. Each age group has its own dedicated, quiet space designed for that exact stage of development.',
        },
        {
          title: 'House-made meals',
          body: 'Our chef prepares every meal on-site each day. Menus are reviewed weekly for the allergens we host that month — no shortcuts, no surprises.',
        },
        {
          title: 'Five minutes from home, five minutes from work',
          body: 'Steps from the Somerled bus, two minutes from Décarie, easy parking on side streets. Whether you live on Monkland, Sherbrooke, or in Hampstead, drop-off is fast.',
        },
      ],
      programsTitle: 'Programs at our Somerled location',
      programsBlurb:
        'Three age-grouped rooms, each staffed and designed for that exact developmental stage.',
      programs: [
        {
          name: 'Toddler room',
          ages: '18 months – 2½ years',
          blurb:
            'A gentle landing place for the youngest. Sensory play, songs in both languages, predictable rhythms.',
        },
        {
          name: 'Preschool — Petits',
          ages: '2½ – 4 years',
          blurb:
            'Hands-on projects, reading circles, garden visits, dough and paint. The day moves at the children’s pace.',
        },
        {
          name: 'Preschool — Grands',
          ages: '4 – 5 years',
          blurb:
            'Pre-kindergarten readiness in French and English: writing, numeracy, social skills, plenty of outdoor time.',
        },
      ],
      visitTitle: 'Come see the Somerled house',
      visitBody:
        'Tours always include a cup of tea and a slow walk through every room. Book a visit and we’ll match you with a time when the rooms are humming — usually right after morning snack.',
      ctaPrimary: 'Book a visit',
      ctaSecondary: 'Join the waiting list',
      addressLabel: 'Address',
      hoursLabel: 'Hours',
      agesLabel: 'Ages',
      phoneLabel: 'Phone',
      ratingLabel: 'Google rating',
      faqTitle: 'NDG daycare — your questions answered',
      faq: [
        {
          q: 'Where exactly is the Somerled daycare?',
          a: 'We are at 6624 av. Somerled, Suite 201, in NDG (Notre-Dame-de-Grâce), Montréal — two minutes from Décarie Boulevard and a short walk from Parc Notre-Dame-de-Grâce.',
        },
        {
          q: 'What ages do you welcome at the NDG location?',
          a: 'Children from 18 months through 5 years. Each age has its own room with educators trained for exactly that stage.',
        },
        {
          q: 'Is the NDG daycare bilingual?',
          a: 'Yes — educators speak with the children in both French and English throughout the day. Most of our NDG families are themselves bilingual or actively want their children to grow up in both languages.',
        },
        {
          q: 'Do you have spots available?',
          a: 'Spots open three to four times a year. Once you join the waiting list we keep you informed by email — never by silence.',
        },
        {
          q: 'Is the NDG (Somerled) daycare subsidized?',
          a: 'No — our Somerled location is a private, non-subsidized daycare. It is not part of the Quebec reduced-contribution (subsidized) network, so there is no government waiting list to navigate. Private spots in NDG open more regularly, and tuition covers house-made meals, materials and outings — we explain every cost clearly on a tour.',
        },
        {
          q: 'How do I book a tour?',
          a: 'Use the “Book a visit” button above or call us at (514) 574-4695. Tours always include tea.',
        },
      ],
      otherLocationCta: 'Looking for our Lachine daycare?',
      breadcrumb: { home: 'Home', locations: 'Locations' },
      metaTitle: 'Daycare in NDG (Somerled), Montréal — Ile Coco',
      metaDescription:
        'Small, bilingual daycare in NDG (Somerled), Montréal — 18 months to 5 years. House-made meals, screen-free, 4.8★ on Google. Book a visit at 6624 av. Somerled.',
    },
    lachine: {
      h1: 'Bilingual Daycare in Lachine, Montréal',
      intro:
        'Ile Coco Lachine is our second home — a sun-filled, storybook bilingual daycare on the corner of rue Victoria, near Highway 20. We welcome children from 18 months to 5 years for full-day care in French and English, with house-made meals, small groups, and zero screens.',
      whyTitle: 'Why families choose our Lachine daycare',
      whyBullets: [
        {
          title: 'An easy commute',
          body: 'On the corner of rue Victoria with quick access to Highway 20 — a smooth drop-off whether you’re heading downtown, to LaSalle, or to Dorval.',
        },
        {
          title: 'Bright, storybook rooms',
          body: 'Hand-painted murals, sunlit windows all day, primary colours that children actually like. Visitors tell us it feels like walking into a picture book.',
        },
        {
          title: 'French and English, every day',
          body: 'Lachine families are bilingual in many directions — French, English, Spanish, Arabic. Our educators meet children where they are and bring them gently into both official languages.',
        },
        {
          title: 'Small groups, real food',
          body: 'Maximum of seven children per educator. Every meal is prepared on-site by our chef and reviewed weekly for the allergens we host.',
        },
      ],
      programsTitle: 'Programs at our Lachine location',
      programsBlurb:
        'Three age-grouped rooms — calm, secure spaces designed for each stage of development.',
      programs: [
        {
          name: 'Toddler room',
          ages: '18 months – 2½ years',
          blurb:
            'A soft landing for the youngest. Sensory play, songs in both languages, gentle naps.',
        },
        {
          name: 'Preschool — Petits',
          ages: '2½ – 4 years',
          blurb:
            'Garden visits, hands-on projects, water and paint, books read aloud in both languages.',
        },
        {
          name: 'Preschool — Grands',
          ages: '4 – 5 years',
          blurb:
            'Pre-kindergarten skills in French and English, with plenty of outdoor time on quiet Lachine streets.',
        },
      ],
      visitTitle: 'Come see the Lachine house',
      visitBody:
        'Tours are unhurried and always include tea. Book a visit and we’ll match you with a time when the windows are full of sun and the rooms are humming.',
      ctaPrimary: 'Book a visit',
      ctaSecondary: 'Join the waiting list',
      addressLabel: 'Address',
      hoursLabel: 'Hours',
      agesLabel: 'Ages',
      phoneLabel: 'Phone',
      ratingLabel: 'Google rating',
      faqTitle: 'Lachine daycare — your questions answered',
      faq: [
        {
          q: 'Where exactly is the Lachine daycare?',
          a: 'We are at 400 rue Victoria in Lachine, Montréal — on the corner, near Highway 20.',
        },
        {
          q: 'What ages do you welcome at the Lachine location?',
          a: 'Children from 18 months through 5 years, in three age-grouped rooms with dedicated educators.',
        },
        {
          q: 'Is the Lachine daycare bilingual?',
          a: 'Yes — French and English are spoken throughout the day. Most of our Lachine families are bilingual or actively building bilingual children.',
        },
        {
          q: 'Do you serve other Lachine and West-Island neighborhoods?',
          a: 'Yes — we welcome families from all of Lachine, LaSalle, Dorval, Saint-Pierre, and Pointe-Claire.',
        },
        {
          q: 'Is the Lachine daycare subsidized?',
          a: 'No — our Lachine location is a private, non-subsidized daycare. It is not part of the Quebec reduced-contribution (subsidized) network, so there is no government waiting list. Many Lachine and West-Island families choose private care because spots open more often and the groups stay small. We walk you through every cost on a tour.',
        },
        {
          q: 'How do I book a visit?',
          a: 'Use the “Book a visit” button above or call (514) 574-4695. Tours always include tea.',
        },
      ],
      otherLocationCta: 'Looking for our NDG (Somerled) daycare?',
      breadcrumb: { home: 'Home', locations: 'Locations' },
      metaTitle: 'Daycare in Lachine, Montréal — Ile Coco',
      metaDescription:
        'Small, bilingual daycare in Lachine, Montréal — 18 months to 5 years. House-made meals, screen-free. Book a visit at 400 rue Victoria.',
    },
  },
  fr: {
    somerled: {
      h1: 'Garderie bilingue à NDG (Somerled), Montréal',
      intro:
        "Ile Coco sur Somerled est notre foyer d'origine — une petite garderie bilingue lumineuse au cœur de Notre-Dame-de-Grâce, à deux minutes de Décarie et à quelques pas du Parc Notre-Dame-de-Grâce. Nous accueillons les enfants de 18 mois à 5 ans pour une journée complète en français et en anglais, avec des repas maison, de petits groupes et aucun écran.",
      whyTitle: 'Pourquoi les familles choisissent notre garderie à NDG',
      whyBullets: [
        {
          title: 'Bilingue dès le premier jour',
          body: 'Les éducatrices passent naturellement du français à l’anglais — parfait pour les familles diverses de NDG, Côte-des-Neiges et Westmount.',
        },
        {
          title: 'Petits groupes, pièces calmes',
          body: 'Maximum de sept enfants par éducatrice. Chaque groupe d’âge a sa propre pièce, pensée pour ce stade de développement.',
        },
        {
          title: 'Repas maison',
          body: 'Notre chef cuisine sur place chaque jour. Les menus sont révisés chaque semaine selon les allergènes accueillis ce mois-ci — aucun raccourci.',
        },
        {
          title: 'Cinq minutes de la maison, cinq du bureau',
          body: 'À deux pas de l’autobus Somerled, deux minutes de Décarie, stationnement facile. Que vous habitiez Monkland, Sherbrooke ou Hampstead, le dépôt est rapide.',
        },
      ],
      programsTitle: 'Programmes à notre emplacement Somerled',
      programsBlurb:
        'Trois pièces par groupe d’âge, chacune pensée et accompagnée pour ce stade exact.',
      programs: [
        {
          name: 'Pouponnière',
          ages: '18 mois – 2 ans ½',
          blurb:
            'Un atterrissage en douceur pour les plus petits. Jeu sensoriel, chansons dans les deux langues, rythmes prévisibles.',
        },
        {
          name: 'Maternelle — Petits',
          ages: '2 ans ½ – 4 ans',
          blurb:
            'Projets concrets, lecture en cercle, visites au jardin, pâte et peinture. La journée suit le rythme des enfants.',
        },
        {
          name: 'Maternelle — Grands',
          ages: '4 – 5 ans',
          blurb:
            'Préparation à la maternelle en français et en anglais : écriture, calcul, vie sociale, beaucoup de jeu dehors.',
        },
      ],
      visitTitle: 'Venez voir notre maison Somerled',
      visitBody:
        'Les visites se font autour d’un thé et d’une promenade lente dans chaque pièce. Réservez et nous trouverons un moment où les pièces vibrent — souvent juste après la collation du matin.',
      ctaPrimary: 'Réserver une visite',
      ctaSecondary: 'Rejoindre la liste d’attente',
      addressLabel: 'Adresse',
      hoursLabel: 'Heures',
      agesLabel: 'Âges',
      phoneLabel: 'Téléphone',
      ratingLabel: 'Avis Google',
      faqTitle: 'Garderie à NDG — vos questions',
      faq: [
        {
          q: 'Où exactement se trouve la garderie Somerled ?',
          a: 'Au 6624 av. Somerled, suite 201, à NDG (Notre-Dame-de-Grâce), Montréal — à deux minutes du boulevard Décarie et tout près du Parc Notre-Dame-de-Grâce.',
        },
        {
          q: 'Quels âges accueillez-vous à NDG ?',
          a: 'Les enfants de 18 mois à 5 ans, répartis dans trois pièces avec des éducatrices formées pour chaque stade.',
        },
        {
          q: 'La garderie de NDG est-elle bilingue ?',
          a: 'Oui — les éducatrices parlent aux enfants en français et en anglais toute la journée. La plupart de nos familles de NDG sont elles-mêmes bilingues ou souhaitent activement que leurs enfants grandissent dans les deux langues.',
        },
        {
          q: 'Avez-vous des places disponibles ?',
          a: 'Les places s’ouvrent trois à quatre fois par année. Une fois inscrit·e à la liste, nous vous tenons informé·e par courriel — jamais par silence.',
        },
        {
          q: 'La garderie de NDG est-elle subventionnée ?',
          a: 'Non — notre installation de Somerled est une garderie privée, non subventionnée. Elle ne fait pas partie du réseau subventionné à contribution réduite du Québec, il n’y a donc aucune liste d’attente gouvernementale à gérer. Les places privées à NDG s’ouvrent plus régulièrement, et les frais couvrent les repas maison, le matériel et les sorties — nous expliquons chaque coût lors de la visite.',
        },
        {
          q: 'Comment réserver une visite ?',
          a: 'Utilisez le bouton « Réserver une visite » ci-dessus ou appelez le (514) 574-4695. Les visites se font autour d’un thé.',
        },
      ],
      otherLocationCta: 'Vous cherchez notre garderie de Lachine ?',
      breadcrumb: { home: 'Accueil', locations: 'Emplacements' },
      metaTitle: 'Garderie à NDG (Somerled), Montréal — Ile Coco',
      metaDescription:
        'Petite garderie bilingue à NDG (Somerled), Montréal — 18 mois à 5 ans. Repas maison, sans écrans, 4,8★ sur Google. Réservez au 6624 av. Somerled.',
    },
    lachine: {
      h1: 'Garderie bilingue à Lachine, Montréal',
      intro:
        "Ile Coco Lachine est notre second foyer — une garderie bilingue ensoleillée et féerique, à l'angle de la rue Victoria, près de l’autoroute 20. Nous accueillons les enfants de 18 mois à 5 ans pour une journée complète en français et en anglais, avec repas maison, petits groupes et aucun écran.",
      whyTitle: 'Pourquoi les familles choisissent notre garderie à Lachine',
      whyBullets: [
        {
          title: 'Un trajet facile',
          body: 'À l’angle de la rue Victoria, accès rapide à l’autoroute 20 — dépôt fluide que vous alliez au centre-ville, à LaSalle ou à Dorval.',
        },
        {
          title: 'Pièces lumineuses, comme un livre d’images',
          body: 'Murales peintes à la main, fenêtres ensoleillées toute la journée, couleurs primaires que les enfants aiment vraiment.',
        },
        {
          title: 'Français et anglais, tous les jours',
          body: 'Les familles de Lachine sont bilingues dans plusieurs directions. Nos éducatrices accueillent l’enfant là où il est et l’amènent doucement dans les deux langues.',
        },
        {
          title: 'Petits groupes, vraie nourriture',
          body: 'Maximum sept enfants par éducatrice. Chaque repas est cuisiné sur place et révisé chaque semaine selon les allergènes accueillis.',
        },
      ],
      programsTitle: 'Programmes à notre emplacement Lachine',
      programsBlurb:
        'Trois pièces par groupe d’âge — calmes, sécurisées, pensées pour chaque stade.',
      programs: [
        {
          name: 'Pouponnière',
          ages: '18 mois – 2 ans ½',
          blurb:
            'Un atterrissage en douceur. Jeu sensoriel, chansons dans les deux langues, siestes paisibles.',
        },
        {
          name: 'Maternelle — Petits',
          ages: '2 ans ½ – 4 ans',
          blurb:
            'Visites au jardin, projets concrets, eau et peinture, livres lus dans les deux langues.',
        },
        {
          name: 'Maternelle — Grands',
          ages: '4 – 5 ans',
          blurb:
            'Compétences pré-maternelle en français et en anglais, avec beaucoup de plein air dans les rues calmes de Lachine.',
        },
      ],
      visitTitle: 'Venez voir notre maison de Lachine',
      visitBody:
        'Les visites sont sans empressement et toujours autour d’un thé. Réservez et nous trouverons un moment où les fenêtres sont pleines de soleil.',
      ctaPrimary: 'Réserver une visite',
      ctaSecondary: 'Rejoindre la liste d’attente',
      addressLabel: 'Adresse',
      hoursLabel: 'Heures',
      agesLabel: 'Âges',
      phoneLabel: 'Téléphone',
      ratingLabel: 'Avis Google',
      faqTitle: 'Garderie à Lachine — vos questions',
      faq: [
        {
          q: 'Où exactement se trouve la garderie de Lachine ?',
          a: 'Au 400 rue Victoria à Lachine, Montréal — à l’angle, près de l’autoroute 20.',
        },
        {
          q: 'Quels âges accueillez-vous à Lachine ?',
          a: 'Les enfants de 18 mois à 5 ans, répartis dans trois pièces avec des éducatrices dédiées.',
        },
        {
          q: 'La garderie de Lachine est-elle bilingue ?',
          a: 'Oui — le français et l’anglais sont parlés tout au long de la journée.',
        },
        {
          q: 'Servez-vous d’autres quartiers de Lachine et de l’Ouest ?',
          a: 'Oui — nous accueillons les familles de Lachine, LaSalle, Dorval, Saint-Pierre et Pointe-Claire.',
        },
        {
          q: 'La garderie de Lachine est-elle subventionnée ?',
          a: 'Non — notre installation de Lachine est une garderie privée, non subventionnée. Elle ne fait pas partie du réseau subventionné à contribution réduite du Québec, il n’y a donc aucune liste d’attente gouvernementale. Beaucoup de familles de Lachine et de l’Ouest-de-l’Île choisissent le privé parce que les places s’ouvrent plus souvent et que les groupes restent petits. Nous expliquons chaque coût lors de la visite.',
        },
        {
          q: 'Comment réserver une visite ?',
          a: 'Utilisez le bouton « Réserver une visite » ci-dessus ou appelez le (514) 574-4695. Les visites se font autour d’un thé.',
        },
      ],
      otherLocationCta: 'Vous cherchez notre garderie de NDG (Somerled) ?',
      breadcrumb: { home: 'Accueil', locations: 'Emplacements' },
      metaTitle: 'Garderie à Lachine, Montréal — Ile Coco',
      metaDescription:
        'Petite garderie bilingue à Lachine, Montréal — 18 mois à 5 ans. Repas maison, sans écrans. Réservez au 400 rue Victoria.',
    },
  },
}
