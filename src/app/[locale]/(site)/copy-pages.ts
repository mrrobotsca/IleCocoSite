/**
 * Copy for the standalone content pages: about, contact, faq, programs.
 *
 * These exist as real routes rather than homepage anchors so each can rank on its
 * own. Every claim here is drawn from what the site already states elsewhere
 * (`copy.ts`, `copy-locations.ts`, `config/branding.ts`) — ages, ratio, hours,
 * opening years, and the private/non-subsidized status. Nothing is invented.
 *
 * Two rules for this file:
 *   1. NEVER state fees, rates, or prices anywhere on the site. Cost questions are
 *      answered in person on a tour.
 *   2. The age range is 7 months to 5 years. We run a nursery for babies as well as
 *      toddler and preschool rooms — the site previously said 18 months, which cost
 *      us enquiries from families with infants.
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
    metaTitle: 'Daycare Programs by Age — 7 Months to 5 Years | Ile Coco',
    metaDescription:
      'Four age-grouped rooms at our NDG (Somerled) and Lachine daycares: babies from 7 months, toddlers 18 months–2½, Petits 2½–4, Grands 4–5. Bilingual, screen-free.',
    eyebrow: 'Programs',
    h1: 'Bilingual daycare programs, 7 months to 5 years',
    intro:
      'We welcome babies from 7 months right through to 5 years. Both of our Montréal homes — NDG (Somerled) and Lachine — run the same four age-grouped rooms, each staffed and designed for that exact stage, so a child moves up when they are ready rather than when a calendar says so.',
    roomsTitle: 'Four rooms, four stages',
    rooms: [
      {
        name: 'Nursery — babies',
        ages: '7 – 18 months',
        blurb:
          'Our infant room, for babies from 7 months. Feeding and sleep on your baby’s own schedule, floor play, lullabies and books in both languages, and one set of familiar arms every day.',
      },
      {
        name: 'Toddler room',
        ages: '18 months – 2½ years',
        blurb:
          'First steps into a group. Sensory play, songs in both languages, predictable rhythms, and long naps in a quiet room.',
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
      'Doors open at 7:00. Breakfast, then free play while the rooms fill. Morning circle in French and English, a project or an outing, lunch cooked in our own kitchen, nap, snack, and a long afternoon outside whenever the weather allows. Pickup runs until 18:00. Babies keep their own rhythm — bottles, meals and naps follow your schedule, not the room’s. There are no screens in any room.',
    ratioTitle: 'Small groups, on purpose',
    ratioBody:
      'A maximum of seven children per educator, and we often run smaller — smaller still in the nursery, where the youngest need it most. That is a deliberate choice about what the day feels like, not a coincidence of enrolment. Both locations are bilingual throughout: French and English are lived across the day rather than taught in a block.',
    ctaTitle: 'Come see a room in motion',
    ctaBody:
      'Tours are best right after morning snack, when the rooms are humming. Book a visit and we will match you with a time.',
  },
  fr: {
    metaTitle: 'Programmes de garderie par âge — 7 mois à 5 ans | Ile Coco',
    metaDescription:
      'Quatre groupes d’âge dans nos garderies de NDG (Somerled) et Lachine : bébés dès 7 mois, tout-petits 18 mois–2½, Petits 2½–4, Grands 4–5. Bilingue, sans écrans.',
    eyebrow: 'Programmes',
    h1: 'Programmes de garderie bilingue, de 7 mois à 5 ans',
    intro:
      'Nous accueillons les bébés dès 7 mois et jusqu’à 5 ans. Nos deux foyers montréalais — NDG (Somerled) et Lachine — offrent les mêmes quatre groupes d’âge, chacun conçu et encadré pour ce stade précis : l’enfant change de groupe quand il est prêt, pas quand le calendrier le dit.',
    roomsTitle: 'Quatre salles, quatre étapes',
    rooms: [
      {
        name: 'Pouponnière — bébés',
        ages: '7 – 18 mois',
        blurb:
          'Notre pouponnière, pour les bébés dès 7 mois. Boires et sommeil au rythme de votre bébé, jeu au sol, berceuses et livres dans les deux langues, et les mêmes bras familiers chaque jour.',
      },
      {
        name: 'Tout-petits',
        ages: '18 mois – 2½ ans',
        blurb:
          'Les premiers pas en groupe. Jeu sensoriel, chansons dans les deux langues, rythmes prévisibles et longues siestes au calme.',
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
      'Les portes ouvrent à 7h00. Déjeuner, puis jeu libre pendant que les salles se remplissent. Cercle du matin en français et en anglais, un projet ou une sortie, dîner cuisiné dans notre cuisine, sieste, collation, et un long après-midi dehors dès que la météo le permet. Les départs se font jusqu’à 18h00. Les bébés gardent leur propre rythme : boires, repas et siestes suivent votre horaire, pas celui de la salle. Aucun écran dans nos espaces.',
    ratioTitle: 'De petits groupes, par choix',
    ratioBody:
      'Maximum sept enfants par éducateur, et souvent moins — moins encore à la pouponnière, là où les plus jeunes en ont le plus besoin. C’est un choix délibéré sur la texture de la journée, pas un hasard d’inscriptions. Les deux emplacements sont bilingues d’un bout à l’autre : le français et l’anglais se vivent tout au long de la journée plutôt que de s’enseigner en bloc.',
    ctaTitle: 'Venez voir une salle en mouvement',
    ctaBody:
      'Les visites sont idéales juste après la collation du matin, quand les salles bourdonnent. Réservez et nous vous proposerons une heure.',
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
          'Ile Coco is a private, non-subsidized daycare. We are not part of Quebec’s reduced-contribution network, so there is no government list to sit on and no waiting years for a place. Families who want a small, bilingual, screen-free room — with space for babies as well as toddlers — and a spot that actually opens tend to find that trade worth making.',
      },
    ],
    statsTitle: 'Where things stand',
    stats: [
      { value: '2018', label: 'Somerled (NDG) opened' },
      { value: '2022', label: 'Lachine opened' },
      { value: '7:1', label: 'Maximum children per educator' },
      { value: '7 mo – 5 yr', label: 'Ages welcomed' },
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
          'Ile Coco est une garderie privée, non subventionnée. Nous ne faisons pas partie du réseau à contribution réduite du Québec : aucune liste gouvernementale, aucune année d’attente. Les familles qui cherchent une salle petite, bilingue et sans écrans — avec de la place pour les bébés comme pour les tout-petits — et une place qui s’ouvre vraiment, trouvent généralement l’échange raisonnable.',
      },
    ],
    statsTitle: 'Où nous en sommes',
    stats: [
      { value: '2018', label: 'Ouverture de Somerled (NDG)' },
      { value: '2022', label: 'Ouverture de Lachine' },
      { value: '7:1', label: 'Maximum d’enfants par éducateur' },
      { value: '7 mois – 5 ans', label: 'Âges accueillis' },
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
    metaTitle: 'Daycare FAQ — Ages from 7 Months, Ratios, Waiting List | Ile Coco',
    metaDescription:
      'Answers about Ile Coco daycare in NDG (Somerled) and Lachine: ages accepted from 7 months, educator ratio, allergies, screens, and whether we are subsidized.',
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
        q: 'Do you take babies?',
        a: 'Yes. We welcome babies from 7 months in our nursery, and we have toddler and preschool rooms right through to 5 years. If you have seen an older starting age listed anywhere, it is out of date — please call and ask.',
      },
      {
        q: 'Can we visit before deciding?',
        a: 'Please do. Tours include a walk through every room and a cup of tea, and they are best right after morning snack when the rooms are at their busiest. There is no deposit and no pressure to enrol.',
      },
      {
        q: 'Which location should we choose?',
        a: 'Whichever is closer to your daily route — the programming and the ratio are identical at both, and both have a nursery for babies. Somerled has been open since 2018 and Lachine since 2022. If one has no space, we will tell you honestly whether the other does.',
      },
    ],
    ctaTitle: 'Still have a question?',
    ctaBody:
      'Email info@ilecoco.com or call (514) 574-4695. A real person answers, usually the same day.',
  },
  fr: {
    metaTitle: 'FAQ garderie — âges dès 7 mois, ratios, liste d’attente | Ile Coco',
    metaDescription:
      'Réponses sur la garderie Ile Coco à NDG (Somerled) et Lachine : âges acceptés dès 7 mois, ratio, allergies, écrans, et si nous sommes subventionnés.',
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
        q: 'Acceptez-vous les bébés?',
        a: 'Oui. Nous accueillons les bébés dès 7 mois à la pouponnière, et nous avons des groupes de tout-petits et de préscolaire jusqu’à 5 ans. Si vous avez vu un âge d’admission plus élevé quelque part, l’information est périmée — appelez-nous.',
      },
      {
        q: 'Peut-on visiter avant de décider?',
        a: 'Bien sûr. La visite comprend un tour de chaque salle et une tasse de thé; le meilleur moment est juste après la collation du matin, quand les salles sont les plus animées. Aucun dépôt, aucune pression.',
      },
      {
        q: 'Quel emplacement choisir?',
        a: 'Celui qui est le plus près de votre trajet quotidien — la programmation et le ratio sont identiques aux deux, et les deux ont une pouponnière. Somerled est ouverte depuis 2018 et Lachine depuis 2022. Si l’une n’a pas de place, nous vous dirons honnêtement si l’autre en a.',
      },
    ],
    ctaTitle: 'Une autre question?',
    ctaBody:
      'Écrivez à info@ilecoco.com ou appelez le (514) 574-4695. Une vraie personne répond, souvent le jour même.',
  },
}
