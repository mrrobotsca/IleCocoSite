/**
 * Copy for the standalone content pages: about, contact, faq, programs, tuition.
 *
 * These exist as real routes rather than homepage anchors so each can rank on its
 * own. Every claim here is drawn from what the site already states elsewhere
 * (`copy.ts`, `copy-locations.ts`, `config/branding.ts`) — ages, ratio, hours,
 * rates, opening years, and the private/non-subsidized status. Nothing is invented.
 *
 * Places needing the operator's own words are marked NEEDS-OPERATOR-INPUT.
 */

export type PageMeta = {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  h1: string
  intro: string
}

type Section = { title: string; body: string }
type QA = { q: string; a: string }

export type ProgramsCopy = PageMeta & {
  rooms: { name: string; ages: string; blurb: string }[]
  roomsTitle: string
  dayTitle: string
  dayBody: string
  ratioTitle: string
  ratioBody: string
  ctaTitle: string
  ctaBody: string
}

export type TuitionCopy = PageMeta & {
  ratesTitle: string
  includedTitle: string
  included: string[]
  notIncludedTitle: string
  notIncluded: string[]
  subsidyTitle: string
  subsidyBody: string
  ctaTitle: string
  ctaBody: string
}

export type AboutCopy = PageMeta & {
  sections: Section[]
  statsTitle: string
  stats: { value: string; label: string }[]
}

export type ContactCopy = PageMeta & {
  visitTitle: string
  visitBody: string
  waitlistTitle: string
  waitlistBody: string
  emailLabel: string
  phoneLabel: string
  hoursLabel: string
  addressLabel: string
  hours: string
}

export type FaqPageCopy = PageMeta & {
  extra: QA[]
  ctaTitle: string
  ctaBody: string
}

type Locale = 'en' | 'fr'

export const PROGRAMS_COPY: Record<Locale, ProgramsCopy> = {
  en: {
    metaTitle: 'Daycare Programs by Age — 18 Months to 5 Years | Ile Coco',
    metaDescription:
      'Three age-grouped rooms at our NDG (Somerled) and Lachine daycares: toddlers 18 months–2½, Petits 2½–4, Grands 4–5. Bilingual, screen-free, max 7 children per educator.',
    eyebrow: 'Programs',
    h1: 'Bilingual daycare programs, 18 months to 5 years',
    intro:
      'Both of our Montréal homes — NDG (Somerled) and Lachine — run the same three age-grouped rooms. Each is staffed and designed for that exact stage, so a child moves up when they are ready, not when a calendar says so.',
    roomsTitle: 'Three rooms, three stages',
    rooms: [
      {
        name: 'Toddler room',
        ages: '18 months – 2½ years',
        blurb:
          'A gentle landing place for the youngest. Sensory play, songs in both languages, predictable rhythms, and long naps in a quiet room.',
      },
      {
        name: 'Preschool — Petits',
        ages: '2½ – 4 years',
        blurb:
          'Hands-on projects, reading circles, garden visits, dough and paint. The day moves at the children’s pace, not the clock’s.',
      },
      {
        name: 'Preschool — Grands',
        ages: '4 – 5 years',
        blurb:
          'Pre-kindergarten readiness in French and English: early writing, numeracy, social skills, and plenty of outdoor time before big school.',
      },
    ],
    dayTitle: 'What a day looks like',
    dayBody:
      'Doors open at 7:00. Breakfast, then free play while the rooms fill. Morning circle in French and English, a project or an outing, lunch cooked in our own kitchen, nap, snack, and a long afternoon outside whenever the weather allows. Pickup runs until 18:00. There are no screens in any room — the day is water, paint, dough, dirt, songs, books, and each other.',
    ratioTitle: 'Small groups, on purpose',
    ratioBody:
      'A maximum of seven children per educator, and we often run smaller. That is a deliberate choice about what the day feels like, not a coincidence of enrolment. Both locations are bilingual throughout — French and English are lived across the day rather than taught in a block.',
    ctaTitle: 'Come see a room in motion',
    ctaBody:
      'Tours are best right after morning snack, when the rooms are humming. Book a visit and we will match you with a time.',
  },
  fr: {
    metaTitle: 'Programmes de garderie par âge — 18 mois à 5 ans | Ile Coco',
    metaDescription:
      'Trois groupes d’âge dans nos garderies de NDG (Somerled) et Lachine : tout-petits 18 mois–2½, Petits 2½–4, Grands 4–5. Bilingue, sans écrans, max 7 enfants par éducateur.',
    eyebrow: 'Programmes',
    h1: 'Programmes de garderie bilingue, de 18 mois à 5 ans',
    intro:
      'Nos deux foyers montréalais — NDG (Somerled) et Lachine — offrent les mêmes trois groupes d’âge. Chacun est conçu et encadré pour ce stade précis : l’enfant change de groupe quand il est prêt, pas quand le calendrier le dit.',
    roomsTitle: 'Trois salles, trois étapes',
    rooms: [
      {
        name: 'Pouponnière / tout-petits',
        ages: '18 mois – 2½ ans',
        blurb:
          'Un atterrissage tout en douceur pour les plus jeunes. Jeu sensoriel, chansons dans les deux langues, rythmes prévisibles et longues siestes au calme.',
      },
      {
        name: 'Préscolaire — Petits',
        ages: '2½ – 4 ans',
        blurb:
          'Projets concrets, cercles de lecture, visites au jardin, pâte et peinture. La journée avance au rythme des enfants, pas de l’horloge.',
      },
      {
        name: 'Préscolaire — Grands',
        ages: '4 – 5 ans',
        blurb:
          'Préparation à la maternelle en français et en anglais : premiers tracés, notions de nombres, habiletés sociales et beaucoup de temps dehors.',
      },
    ],
    dayTitle: 'À quoi ressemble une journée',
    dayBody:
      'Les portes ouvrent à 7h00. Déjeuner, puis jeu libre pendant que les salles se remplissent. Cercle du matin en français et en anglais, un projet ou une sortie, dîner cuisiné dans notre cuisine, sieste, collation, et un long après-midi dehors dès que la météo le permet. Les départs se font jusqu’à 18h00. Aucun écran dans nos espaces — la journée, c’est de l’eau, de la peinture, de la pâte, de la terre, des chansons, des livres, et les autres.',
    ratioTitle: 'De petits groupes, par choix',
    ratioBody:
      'Maximum sept enfants par éducateur, et souvent moins. C’est un choix délibéré sur la texture de la journée, pas un hasard d’inscriptions. Les deux emplacements sont bilingues d’un bout à l’autre : le français et l’anglais se vivent tout au long de la journée plutôt que de s’enseigner en bloc.',
    ctaTitle: 'Venez voir une salle en mouvement',
    ctaBody:
      'Les visites sont idéales juste après la collation du matin, quand les salles bourdonnent. Réservez et nous vous proposerons une heure.',
  },
}

export const TUITION_COPY: Record<Locale, TuitionCopy> = {
  en: {
    metaTitle: 'Daycare Tuition & Rates in NDG and Lachine, Montréal | Ile Coco',
    metaDescription:
      'Transparent daycare rates at Ile Coco: $58/day full fee, $72/day drop-in, all-inclusive. Private, non-subsidized daycare in NDG (Somerled) and Lachine, Montréal.',
    eyebrow: 'Tuition',
    h1: 'Honest daycare pricing in NDG and Lachine',
    intro:
      'Simple, all-inclusive pricing — every spot comes with the same care. As a private daycare we set our own rates, and we would rather you see them before you book a tour than after.',
    ratesTitle: 'Our rates',
    includedTitle: 'What tuition includes',
    included: [
      'Three house-made meals and snacks daily, cooked in our own kitchen',
      'All learning materials, art supplies, and books',
      'Seasonal outings and special-day activities',
      'Bilingual programming in French and English',
      'A daily journal home — what they ate, made, and laughed at',
    ],
    notIncludedTitle: 'What you bring',
    notIncluded: [
      'Rain boots, indoor shoes, and a change of clothes',
      'Diapers and wipes for children still in them',
      'A nap blanket that smells like home',
    ],
    subsidyTitle: 'Are you a subsidized daycare?',
    subsidyBody:
      'No. Ile Coco is a private, non-subsidized daycare — we are not part of Quebec’s reduced-contribution network, so there is no government waiting list to navigate. Many families in NDG and Lachine choose us for exactly that reason: private spots open more often and the groups stay small. Quebec’s tax credit for childcare expenses may apply to your situation; we provide the receipts you need, and your own accountant is the right person to confirm what you qualify for.',
    ctaTitle: 'See it before you decide',
    ctaBody:
      'We will walk you through every cost on a tour — no deposit, no pressure. Rates shown are starting points and are confirmed in writing before enrolment.',
  },
  fr: {
    metaTitle: 'Frais de garderie à NDG et Lachine, Montréal | Ile Coco',
    metaDescription:
      'Tarifs transparents chez Ile Coco : 58 $/jour tarif régulier, 72 $/jour sur appel, tout inclus. Garderie privée non subventionnée à NDG (Somerled) et Lachine, Montréal.',
    eyebrow: 'Frais',
    h1: 'Des tarifs de garderie honnêtes à NDG et Lachine',
    intro:
      'Une tarification simple et tout compris — chaque place reçoit le même soin. Garderie privée, nous fixons nos propres tarifs, et nous préférons que vous les voyiez avant la visite plutôt qu’après.',
    ratesTitle: 'Nos tarifs',
    includedTitle: 'Ce que les frais comprennent',
    included: [
      'Trois repas maison et les collations chaque jour, cuisinés sur place',
      'Tout le matériel pédagogique, les fournitures d’art et les livres',
      'Les sorties saisonnières et les journées spéciales',
      'La programmation bilingue en français et en anglais',
      'Un journal quotidien à la maison — ce qu’ils ont mangé, fabriqué, ce qui les a fait rire',
    ],
    notIncludedTitle: 'Ce que vous apportez',
    notIncluded: [
      'Bottes de pluie, souliers d’intérieur et vêtements de rechange',
      'Couches et lingettes pour les enfants qui en portent',
      'Une doudou de sieste qui sent la maison',
    ],
    subsidyTitle: 'Êtes-vous une garderie subventionnée?',
    subsidyBody:
      'Non. Ile Coco est une garderie privée, non subventionnée — nous ne faisons pas partie du réseau à contribution réduite du Québec, donc aucune liste d’attente gouvernementale à gérer. Beaucoup de familles de NDG et de Lachine nous choisissent pour cette raison : les places privées s’ouvrent plus souvent et les groupes restent petits. Le crédit d’impôt québécois pour frais de garde peut s’appliquer à votre situation; nous fournissons les reçus nécessaires, et votre comptable est la bonne personne pour confirmer ce à quoi vous avez droit.',
    ctaTitle: 'Voyez avant de décider',
    ctaBody:
      'Nous vous expliquons chaque coût lors de la visite — sans dépôt, sans pression. Les tarifs affichés sont des points de départ et sont confirmés par écrit avant l’inscription.',
  },
}

export const ABOUT_COPY: Record<Locale, AboutCopy> = {
  en: {
    metaTitle: 'About Ile Coco — Bilingual Daycare in NDG & Lachine Since 2018',
    metaDescription:
      'Ile Coco has been a small, bilingual daycare in NDG (Somerled) since 2018, with a second home in Lachine since 2022. Small groups, house-made meals, no screens.',
    eyebrow: 'About us',
    h1: 'A small bilingual daycare, run the way we would want for our own',
    intro:
      'Ile Coco opened on Somerled in NDG in 2018 and grew a second home in Lachine in 2022. Two houses, the same idea: keep the groups small, cook the food ourselves, speak both languages, and leave the screens out of it.',
    sections: [
      {
        title: 'Why we stay small',
        body:
          'A maximum of seven children per educator, often fewer. Small groups are the whole point — they are what makes it possible for an educator to notice that a child is off today, to let a project run long because it is going well, and to send home a journal entry that is specific rather than generic. Growth for its own sake would cost us the thing families come here for.',
      },
      {
        title: 'Two languages, lived not drilled',
        body:
          'French and English are woven through the day — the morning circle, the songs, the books, the small negotiations over who gets the blue cup. Children arrive with every combination of home languages and leave comfortable in both. Bilingual the way Montréal is bilingual, rather than the way a curriculum is.',
      },
      {
        title: 'Food cooked here, every day',
        body:
          'Three meals and snacks come out of our own kitchen, built around what little bodies actually need. Menus are reviewed weekly against the allergens we are hosting that month, and our chef and lead educator both hold current food-safety credentials.',
      },
      {
        title: 'Private, and clear about it',
        body:
          'Ile Coco is a private, non-subsidized daycare. We are not part of Quebec’s reduced-contribution network, so there is no government list to sit on — and we publish our rates rather than making you ask. Families who want a small, bilingual, screen-free room and a spot that actually opens tend to find that trade worth making.',
      },
    ],
    statsTitle: 'Where things stand',
    stats: [
      { value: '2018', label: 'Somerled (NDG) opened' },
      { value: '2022', label: 'Lachine opened' },
      { value: '7:1', label: 'Maximum children per educator' },
      { value: '18 mo – 5 yr', label: 'Ages welcomed' },
    ],
  },
  fr: {
    metaTitle: 'À propos d’Ile Coco — Garderie bilingue à NDG et Lachine depuis 2018',
    metaDescription:
      'Ile Coco est une petite garderie bilingue sur Somerled (NDG) depuis 2018, avec un second foyer à Lachine depuis 2022. Petits groupes, repas maison, sans écrans.',
    eyebrow: 'À propos',
    h1: 'Une petite garderie bilingue, tenue comme nous la voudrions pour les nôtres',
    intro:
      'Ile Coco a ouvert sur Somerled, à NDG, en 2018, et un second foyer est né à Lachine en 2022. Deux maisons, une même idée : garder les groupes petits, cuisiner nous-mêmes, parler les deux langues, et laisser les écrans dehors.',
    sections: [
      {
        title: 'Pourquoi nous restons petits',
        body:
          'Maximum sept enfants par éducateur, souvent moins. Les petits groupes sont tout le propos : c’est ce qui permet de remarquer qu’un enfant n’est pas dans son assiette aujourd’hui, de laisser un projet s’étirer parce qu’il va bien, et d’écrire un mot du soir précis plutôt que générique. Grandir pour grandir nous coûterait précisément ce que les familles viennent chercher.',
      },
      {
        title: 'Deux langues, vécues et non récitées',
        body:
          'Le français et l’anglais sont tissés dans la journée — le cercle du matin, les chansons, les livres, les petites négociations autour du verre bleu. Les enfants arrivent avec toutes les combinaisons de langues maison et repartent à l’aise dans les deux. Bilingue comme Montréal l’est, pas comme un programme scolaire.',
      },
      {
        title: 'De la nourriture cuisinée ici, chaque jour',
        body:
          'Trois repas et les collations sortent de notre propre cuisine, pensés pour ce dont les petits corps ont vraiment besoin. Les menus sont révisés chaque semaine selon les allergènes du mois, et notre chef comme notre éducatrice principale détiennent les certifications en salubrité alimentaire.',
      },
      {
        title: 'Privée, et claire là-dessus',
        body:
          'Ile Coco est une garderie privée, non subventionnée. Nous ne faisons pas partie du réseau à contribution réduite du Québec : aucune liste gouvernementale à attendre — et nous affichons nos tarifs plutôt que de vous les faire demander. Les familles qui cherchent une salle petite, bilingue et sans écrans, avec une place qui s’ouvre vraiment, trouvent généralement l’échange raisonnable.',
      },
    ],
    statsTitle: 'Où nous en sommes',
    stats: [
      { value: '2018', label: 'Ouverture de Somerled (NDG)' },
      { value: '2022', label: 'Ouverture de Lachine' },
      { value: '7:1', label: 'Maximum d’enfants par éducateur' },
      { value: '18 mois – 5 ans', label: 'Âges accueillis' },
    ],
  },
}

export const CONTACT_COPY: Record<Locale, ContactCopy> = {
  en: {
    metaTitle: 'Contact Ile Coco Daycare — NDG (Somerled) & Lachine, Montréal',
    metaDescription:
      'Reach Ile Coco daycare in NDG (Somerled) and Lachine, Montréal. Call (514) 574-4695, email info@ilecoco.com, book a tour, or join the waiting list.',
    eyebrow: 'Contact',
    h1: 'Get in touch with Ile Coco',
    intro:
      'Two homes in Montréal, one phone number and one inbox. The fastest way to see a room is to book a tour; the fastest way to hold your place is the waiting list.',
    visitTitle: 'Book a visit',
    visitBody:
      'Tours always include a cup of tea and a slow walk through every room. Pick a time that works and we will match you with a moment when the rooms are humming.',
    waitlistTitle: 'Join the waiting list',
    waitlistBody:
      'Spots open three to four times a year. Once you are on the list we keep you informed by email, not by silence.',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    hoursLabel: 'Hours',
    addressLabel: 'Address',
    hours: 'Mon — Fri · 7:00 — 18:00',
  },
  fr: {
    metaTitle: 'Contacter la garderie Ile Coco — NDG (Somerled) et Lachine, Montréal',
    metaDescription:
      'Joignez la garderie Ile Coco à NDG (Somerled) et Lachine, Montréal. Appelez le (514) 574-4695, écrivez à info@ilecoco.com, réservez une visite ou inscrivez-vous à la liste d’attente.',
    eyebrow: 'Contact',
    h1: 'Joindre Ile Coco',
    intro:
      'Deux foyers à Montréal, un seul numéro et une seule boîte courriel. Le plus rapide pour voir une salle, c’est de réserver une visite; le plus rapide pour retenir votre place, c’est la liste d’attente.',
    visitTitle: 'Réserver une visite',
    visitBody:
      'Les visites comprennent toujours une tasse de thé et un tour tranquille de chaque salle. Choisissez un moment et nous vous proposerons une heure où les salles bourdonnent.',
    waitlistTitle: 'S’inscrire à la liste d’attente',
    waitlistBody:
      'Des places s’ouvrent trois à quatre fois par année. Une fois inscrit, nous vous tenons informé par courriel, pas par silence.',
    emailLabel: 'Courriel',
    phoneLabel: 'Téléphone',
    hoursLabel: 'Heures',
    addressLabel: 'Adresse',
    hours: 'Lun — Ven · 7h00 — 18h00',
  },
}

export const FAQ_PAGE_COPY: Record<Locale, FaqPageCopy> = {
  en: {
    metaTitle: 'Daycare FAQ — Ages, Ratios, Rates, Waiting List | Ile Coco',
    metaDescription:
      'Answers about Ile Coco daycare in NDG (Somerled) and Lachine: ages accepted, educator ratio, allergies, screens, rates, and whether we are subsidized.',
    eyebrow: 'Honest answers',
    h1: 'Daycare questions parents actually ask',
    intro:
      'Everything we get asked on a tour, written down. If your question is not here, email us — we would rather answer it directly than have you guess.',
    extra: [
      {
        q: 'Which neighbourhoods do you serve?',
        a: 'Our Somerled house serves NDG, Notre-Dame-de-Grâce, Côte-des-Neiges, Westmount, Hampstead, and Montréal-Ouest. Our Lachine house serves Lachine, LaSalle, Dorval, Saint-Pierre, and Pointe-Claire. Families regularly commute from a little further when the timing works.',
      },
      {
        q: 'What are your hours?',
        a: 'Both locations are open Monday to Friday, 7:00 to 18:00. We are closed on statutory holidays, and we give notice well ahead of any closure.',
      },
      {
        q: 'How much does it cost?',
        a: 'Full-fee spots start at $58 per day and drop-in days at $72, all-inclusive — meals, snacks, materials, and outings are all in the rate. Full details are on the tuition page, and we confirm everything in writing before enrolment.',
      },
      {
        q: 'Can we visit before deciding?',
        a: 'Please do. Tours include a walk through every room and a cup of tea, and they are best right after morning snack when the rooms are at their busiest. There is no deposit and no pressure to enrol.',
      },
      {
        q: 'Which location should we choose?',
        a: 'Whichever is closer to your daily route — the programming, the ratio, and the rates are identical at both. Somerled has been open since 2018 and Lachine since 2022. If one has no space, we will tell you honestly whether the other does.',
      },
    ],
    ctaTitle: 'Still have a question?',
    ctaBody:
      'Email info@ilecoco.com or call (514) 574-4695. A real person answers, usually the same day.',
  },
  fr: {
    metaTitle: 'FAQ garderie — âges, ratios, tarifs, liste d’attente | Ile Coco',
    metaDescription:
      'Réponses sur la garderie Ile Coco à NDG (Somerled) et Lachine : âges acceptés, ratio, allergies, écrans, tarifs, et si nous sommes subventionnés.',
    eyebrow: 'Des réponses honnêtes',
    h1: 'Les questions que les parents posent vraiment',
    intro:
      'Tout ce qu’on nous demande en visite, mis par écrit. Si votre question n’y est pas, écrivez-nous — nous préférons y répondre directement que vous laisser deviner.',
    extra: [
      {
        q: 'Quels quartiers desservez-vous?',
        a: 'Notre maison de Somerled dessert NDG, Notre-Dame-de-Grâce, Côte-des-Neiges, Westmount, Hampstead et Montréal-Ouest. Notre maison de Lachine dessert Lachine, LaSalle, Dorval, Saint-Pierre et Pointe-Claire. Des familles viennent régulièrement d’un peu plus loin quand l’horaire s’y prête.',
      },
      {
        q: 'Quelles sont vos heures?',
        a: 'Les deux emplacements sont ouverts du lundi au vendredi, de 7h00 à 18h00. Nous sommes fermés les jours fériés, et nous annonçons toute fermeture bien à l’avance.',
      },
      {
        q: 'Combien ça coûte?',
        a: 'Les places à tarif régulier débutent à 58 $ par jour et les journées sur appel à 72 $, tout inclus — repas, collations, matériel et sorties sont compris. Tous les détails sont sur la page des frais, et tout est confirmé par écrit avant l’inscription.',
      },
      {
        q: 'Peut-on visiter avant de décider?',
        a: 'Bien sûr. La visite comprend un tour de chaque salle et une tasse de thé; le meilleur moment est juste après la collation du matin, quand les salles sont les plus animées. Aucun dépôt, aucune pression.',
      },
      {
        q: 'Quel emplacement choisir?',
        a: 'Celui qui est le plus près de votre trajet quotidien — la programmation, le ratio et les tarifs sont identiques aux deux. Somerled est ouverte depuis 2018 et Lachine depuis 2022. Si l’une n’a pas de place, nous vous dirons honnêtement si l’autre en a.',
      },
    ],
    ctaTitle: 'Une autre question?',
    ctaBody:
      'Écrivez à info@ilecoco.com ou appelez le (514) 574-4695. Une vraie personne répond, souvent le jour même.',
  },
}
