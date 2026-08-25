export type Lang = "en" | "fr";

export const COPY = {
  // Keyed rather than positional: the labels used to be an array mapped by index
  // onto a parallel array of `#anchor` hrefs, so every header link was a same-page
  // fragment — and on the location pages those anchors did not exist at all.
  // Keys resolve to real routes in `NAV_LINKS` (links.ts).
  nav: {
    en: {
      programs: "Programs",
      somerled: "NDG (Somerled)",
      lachine: "Lachine",
      faq: "FAQ",
      contact: "Contact",
    },
    fr: {
      programs: "Programmes",
      somerled: "NDG (Somerled)",
      lachine: "Lachine",
      faq: "FAQ",
      contact: "Contact",
    },
  },
  hero: {
    en: {
      eyebrow: "Welcome to Ile CoCo · Montréal",
      // The h1 has to name the service and the neighbourhoods — it is the strongest
      // on-page signal we have, and the <title> already targets exactly this.
      // title2 carries the hand-drawn underline, so the place names sit under it.
      title1: "A bilingual daycare in",
      title2: "NDG & Lachine",
      title3: "where little hearts",
      title4: "bloom",
      lead: "A small, warm daycare with two homes in Montréal — Somerled and Lachine — where curiosity is honoured, mealtimes are sacred, and every child is met with the gentleness they deserve.",
      cta1: "Join the waiting list",
      cta2: "Book a visit",
      since: "since 2018",
      stat1: "343",
      stat1Label: "Families guided",
      stat2: "565",
      stat2Label: "Little graduates",
      stat3: "8 yrs",
      stat3Label: "Of patient care",
    },
    fr: {
      eyebrow: "Bienvenue à Ile CoCo · Montréal",
      title1: "Une garderie bilingue à",
      title2: "NDG et Lachine",
      title3: "où les petits cœurs",
      title4: "fleurissent",
      lead: "Une petite garderie chaleureuse avec deux foyers à Montréal — Somerled et Lachine — où la curiosité est honorée, les repas sont sacrés, et chaque enfant est accueilli avec la douceur qu'il mérite.",
      cta1: "Liste d'attente",
      cta2: "Réserver une visite",
      since: "depuis 2018",
      stat1: "343",
      stat1Label: "Familles accompagnées",
      stat2: "565",
      stat2Label: "Petits diplômés",
      stat3: "8 ans",
      stat3Label: "De soins patients",
    },
  },
  mission: {
    en: {
      eyebrow: "Our Promise",
      title1: "A second home,",
      title2: "thoughtfully kept",
      body: "We believe early childhood is sacred. So we built Ile CoCo as a slow, sun-drenched home — a place where children are not rushed through their days, but invited to wonder, to taste, to listen, to learn at the pace their hearts can hold. Every age has its own dedicated classroom, designed and staffed for exactly that stage.",
      bullets: [
        "Dedicated classrooms for each age group",
        "Secure, child-safe spaces — locked entries, vetted staff",
        "House-made, allergen-aware meals",
        "Bilingual rhythm — English & French",
      ],
      cta: "Plan a visit",
      pill: "Made with care",
    },
    fr: {
      eyebrow: "Notre Promesse",
      title1: "Un deuxième foyer,",
      title2: "soigneusement tenu",
      body: "Nous croyons que la petite enfance est sacrée. Nous avons donc créé Ile CoCo comme une maison lente et baignée de soleil — un lieu où les enfants ne sont pas pressés, mais invités à s'émerveiller, à goûter, à écouter, à apprendre au rythme de leur cœur. Chaque âge a sa salle dédiée, pensée et encadrée pour ce stade précis.",
      bullets: [
        "Classes dédiées pour chaque groupe d'âge",
        "Espaces sécurisés — entrées verrouillées, personnel vérifié",
        "Repas maison, attentifs aux allergies",
        "Rythme bilingue — Anglais & Français",
      ],
      cta: "Planifier une visite",
      pill: "Fait avec soin",
    },
  },
  services: {
    en: {
      eyebrow: "How we nurture",
      title1: "Six gentle",
      title2: "rhythms of the day",
      sub: "Each day at Ile CoCo follows the same warm cadence — small rituals that, repeated with love, become the texture of childhood.",
      items: [
        {
          tag: "01",
          name: "Nourishment",
          desc: "Three slow, fresh meals prepared in our own kitchen — built around what little bodies actually need.",
        },
        {
          tag: "02",
          name: "Free Play",
          desc: "Unhurried, child-led play — the kind where imagination has time to wander into corners and stay a while.",
        },
        {
          tag: "03",
          name: "Quiet Learning",
          desc: "Curated learning materials, gentle prompts, and the dignity of being trusted to figure something out.",
        },
        {
          tag: "04",
          name: "Music & Song",
          desc: "A daily circle of songs in two languages, instruments small enough for any hand, voices welcomed exactly as they are.",
        },
        {
          tag: "05",
          name: "Two Languages",
          desc: "English and French woven through the day — never drilled, always lived. Bilingual the way Montréal is.",
        },
        {
          tag: "06",
          name: "Daily Journal",
          desc: "A short, honest note home each evening — what they ate, what they made, what made them laugh today.",
        },
      ],
    },
    fr: {
      eyebrow: "Comment nous prenons soin",
      title1: "Six doux",
      title2: "rythmes de la journée",
      sub: "Chaque journée à Ile CoCo suit la même cadence chaleureuse — de petits rituels qui, répétés avec amour, deviennent la texture de l'enfance.",
      items: [
        {
          tag: "01",
          name: "Nourriture",
          desc: "Trois repas lents et frais préparés dans notre cuisine — pensés pour ce dont les petits corps ont vraiment besoin.",
        },
        {
          tag: "02",
          name: "Jeu libre",
          desc: "Un jeu sans hâte, mené par l'enfant — celui où l'imagination a le temps de s'égarer dans les coins.",
        },
        {
          tag: "03",
          name: "Apprentissage",
          desc: "Du matériel pédagogique soigné, des invitations douces, et la dignité de chercher par soi-même.",
        },
        {
          tag: "04",
          name: "Musique",
          desc: "Un cercle quotidien de chansons en deux langues, des instruments adaptés aux petites mains.",
        },
        {
          tag: "05",
          name: "Bilingue",
          desc: "L'anglais et le français tissés dans la journée — jamais imposés, toujours vécus. Bilingue comme Montréal.",
        },
        {
          tag: "06",
          name: "Journal",
          desc: "Un petit mot honnête chaque soir — ce qu'ils ont mangé, fabriqué, ce qui les a fait rire aujourd'hui.",
        },
      ],
    },
  },
  why: {
    en: {
      eyebrow: "Why parents choose us",
      title1: "Care that is",
      title2: "kind, safe, & trusted",
      sub: "We are licensed, small, and deeply attentive. Here is what that looks like, day to day.",
      items: [
        {
          title: "Licensed & inspected",
          desc: "Provincially-permitted, insured, and routinely inspected.",
        },
        {
          title: "Small-group ratios",
          desc: "Never more than seven children per educator. Often fewer.",
        },
        {
          title: "House-made meals",
          desc: "Cooked on-site, never reheated. Allergen-aware menus weekly.",
        },
        {
          title: "Calm, prepared rooms",
          desc: "Natural light, child-height shelves, no screens — ever.",
        },
        {
          title: "Trained, certified educators",
          desc: "Early-childhood credentials, food-safety training, and current CPR certification.",
        },
        {
          title: "A real journal home",
          desc: "A handwritten note each day. Photos weekly. No anxious apps.",
        },
      ],
    },
    fr: {
      eyebrow: "Pourquoi les parents nous choisissent",
      title1: "Des soins",
      title2: "doux, sûrs & fiables",
      sub: "Nous sommes accrédités, petits, et profondément attentifs. Voici à quoi ça ressemble, au quotidien.",
      items: [
        {
          title: "Permis & inspecté",
          desc: "Permis provincial, assuré et inspecté régulièrement.",
        },
        {
          title: "Petits groupes",
          desc: "Jamais plus de sept enfants par éducateur. Souvent moins.",
        },
        {
          title: "Repas maison",
          desc: "Cuisinés sur place, jamais réchauffés. Menus hebdomadaires.",
        },
        {
          title: "Espaces préparés",
          desc: "Lumière naturelle, étagères à hauteur d'enfant, pas d'écrans.",
        },
        {
          title: "Équipe certifiée",
          desc: "Diplômes en petite enfance, formation salubrité, et certification RCR à jour.",
        },
        {
          title: "Un vrai journal",
          desc: "Un mot manuscrit chaque jour. Des photos chaque semaine.",
        },
      ],
    },
  },
  journey: {
    en: {
      eyebrow: "Watch our journey",
      title1: "Small moments,",
      title2: "captured tenderly",
      sub: "A short film of a slow place — gardens in May, dough on small fingers, the first time someone pours their own water.",
      watch: "Watch the film",
      pressPlay: "press play ↓",
      videos: [
        {
          id: "v2iwKVLfb_8",
          kind: "regular",
          label: "Our daily rhythm",
          theme: "sage",
          caption: "Music, hands, and Tuesday afternoon",
        },
        {
          id: "AWDKjE0AG_s",
          kind: "regular",
          label: "A tour of the home",
          theme: "clay",
          caption: "Sun-warm rooms, child-height shelves",
        },
        {
          id: "qm_S4K0t5DU",
          kind: "short",
          label: "A day in 60 seconds",
          theme: "sun",
          caption: "From morning circle to nap time",
        },
      ],
    },
    fr: {
      eyebrow: "Notre quotidien",
      title1: "De petits moments,",
      title2: "saisis avec tendresse",
      sub: "Un court film d'un lieu lent — les jardins en mai, la pâte sur de petits doigts, la première fois qu'on verse son propre verre d'eau.",
      watch: "Voir le film",
      pressPlay: "appuyez ↓",
      videos: [
        {
          id: "v2iwKVLfb_8",
          kind: "regular",
          label: "Notre rythme quotidien",
          theme: "sage",
          caption: "Musique, mains et mardi après-midi",
        },
        {
          id: "AWDKjE0AG_s",
          kind: "regular",
          label: "Visite du foyer",
          theme: "clay",
          caption: "Pièces baignées de soleil, étagères à hauteur d’enfant",
        },
        {
          id: "qm_S4K0t5DU",
          kind: "short",
          label: "Une journée en 60 secondes",
          theme: "sun",
          caption: "Du cercle du matin à la sieste",
        },
      ],
    },
  },
  gallery: {
    en: {
      eyebrow: "Inside Ile CoCo",
      title1: "A peek into",
      title2: "our two homes",
      sub: "Sun-filled rooms on Somerled, the warm hallway with our little monkeys, snowy afternoons, splashy summers, and dinners that look like art.",
      cta: "See more on Instagram",
      captions: [
        "The little monkey wall",
        "Sunflower room",
        "Indoor playground",
        "Treehouse corner",
        "Plates we adore",
        "Holiday morning",
        "Costumed staff",
        "Splash days",
      ],
    },
    fr: {
      eyebrow: "À l'intérieur",
      title1: "Un aperçu de",
      title2: "nos deux foyers",
      sub: "Des pièces baignées de soleil sur Somerled, le corridor chaleureux avec nos petits singes, les après-midis enneigés, les étés éclaboussants.",
      cta: "Plus sur Instagram",
      captions: [
        "Le mur des singes",
        "Salle des tournesols",
        "Aire de jeux",
        "Coin cabane",
        "Assiettes adorées",
        "Matin de fête",
        "Équipe costumée",
        "Jours d'eau",
      ],
    },
  },
  testimonials: {
    en: {
      eyebrow: "Words from our families",
      title1: "What parents",
      title2: "quietly tell us",
      items: [
        {
          quote:
            "From the very first day, the warm and caring staff made us feel like family. Our daughter looks forward to going every morning.",
          name: "Maya H.",
          role: "Google review · 5 ★",
        },
        {
          quote:
            "I felt that all the teachers were sincere to the children — and I was so touched. Highly recommend Ile CoCo for the nurturing atmosphere.",
          name: "Hala N.",
          role: "Google review · 5 ★",
        },
        {
          quote:
            "The food is good, the educators are very kind, friendly and helpful. The owner is one of the most caring people I have ever met.",
          name: "Jasmine R.",
          role: "Google review · 5 ★",
        },
      ],
    },
    fr: {
      eyebrow: "Mots de nos familles",
      title1: "Ce que les parents",
      title2: "nous disent tout bas",
      items: [
        {
          quote:
            "Dès le premier jour, l'équipe chaleureuse nous a fait sentir comme en famille. Ma fille a hâte d'y aller chaque matin.",
          name: "Maya H.",
          role: "Avis Google · 5 ★",
        },
        {
          quote:
            "J'ai senti que toutes les éducatrices étaient sincères avec les enfants — j'en ai été touchée. Je recommande Ile CoCo pour son ambiance bienveillante.",
          name: "Hala N.",
          role: "Avis Google · 5 ★",
        },
        {
          quote:
            "La nourriture est bonne, les éducatrices sont très gentilles, amicales et serviables. La propriétaire est une des personnes les plus attentionnées que j’ai rencontrées.",
          name: "Jasmine R.",
          role: "Avis Google · 5 ★",
        },
      ],
    },
  },
  locations: {
    en: {
      eyebrow: "Two homes, one heart",
      title1: "Find us in",
      title2: "your neighbourhood",
      sub: "Both locations are licensed, both are small, and both feel like a home before they feel like a daycare.",
      labels: {
        addr: "Address",
        hours: "Hours",
        ages: "Ages",
        phone: "Phone",
        rating: "Google rating",
      },
      directions: "Get directions",
      items: [
        {
          name: "Somerled",
          subtitle: "Our original home · since 2018",
          addr: "6624 av. Somerled #201",
          city: "Montréal, QC H4V 1T2",
          hours: "Mon — Fri · 7:00 — 18:00",
          ages: "7 months — 5 years",
          phone: "(514) 574-4695",
          mapHint: "NDG · near Décarie",
          rating: "4.8 · 74 reviews",
          photo: "/images/ile-coco/locations/somerled.jpg",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=Garderie+ile+CoCo+6624+Somerled+Montreal+QC",
          note: "tours always include tea",
        },
        {
          name: "Lachine",
          subtitle: "Our second home · the corner one",
          addr: "400 rue Victoria",
          city: "Lachine, QC H8S 1Y5",
          hours: "Mon — Fri · 7:00 — 18:00",
          ages: "7 months — 5 years",
          phone: "(514) 574-4695",
          mapHint: "Lachine · near Hwy 20",
          rating: "4.6 · 21 reviews",
          photo: "/images/ile-coco/locations/lachine.jpg",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=Garderie+ile+Coco+2+400+rue+Victoria+Lachine+QC",
          note: "sunlit windows, all day",
        },
      ],
      visit: "Book a visit",
    },
    fr: {
      eyebrow: "Deux foyers, un seul cœur",
      title1: "Retrouvez-nous",
      title2: "dans votre quartier",
      sub: "Les deux emplacements sont accrédités, petits, et ressemblent à un foyer avant de ressembler à une garderie.",
      labels: {
        addr: "Adresse",
        hours: "Heures",
        ages: "Âges",
        phone: "Téléphone",
        rating: "Avis Google",
      },
      directions: "Itinéraire",
      items: [
        {
          name: "Somerled",
          subtitle: "Notre foyer d'origine · depuis 2018",
          addr: "6624 av. Somerled #201",
          city: "Montréal, QC H4V 1T2",
          hours: "Lun — Ven · 7h00 — 18h00",
          ages: "7 mois — 5 ans",
          phone: "(514) 574-4695",
          mapHint: "NDG · près de Décarie",
          rating: "4,8 · 74 avis",
          photo: "/images/ile-coco/locations/somerled.jpg",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=Garderie+ile+CoCo+6624+Somerled+Montreal+QC",
          note: "les visites se font autour d’un thé",
        },
        {
          name: "Lachine",
          subtitle: "Notre deuxième foyer · à l'angle",
          addr: "400 rue Victoria",
          city: "Lachine, QC H8S 1Y5",
          hours: "Lun — Ven · 7h00 — 18h00",
          ages: "7 mois — 5 ans",
          phone: "(514) 574-4695",
          mapHint: "Lachine · près A-20",
          rating: "4,6 · 21 avis",
          photo: "/images/ile-coco/locations/lachine.jpg",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=Garderie+ile+Coco+2+400+rue+Victoria+Lachine+QC",
          note: "des fenêtres ensoleillées toute la journée",
        },
      ],
      visit: "Réserver une visite",
    },
  },
  faq: {
    en: {
      eyebrow: "Honest answers",
      title1: "Questions parents",
      title2: "actually ask",
      tapHint: "tap to open",
      items: [
        {
          q: "What ages do you welcome?",
          a: "We welcome children from 7 months through 5 years — babies included. Our nursery takes infants from 7 months, and each age above that has its own dedicated classroom: calm, secure spaces designed and staffed for exactly that stage of development.",
        },
        {
          q: "How do you handle food allergies?",
          a: "Every menu is reviewed weekly for the allergens we host that month. Our chef and lead educator both hold current food-safety credentials.",
        },
        {
          q: "What is your educator-to-child ratio?",
          a: "Maximum of seven children per educator. We often run smaller — that is a deliberate choice, not a coincidence.",
        },
        {
          q: "Do you have a waiting list?",
          a: "Yes — and we are honest about it. Spots open three to four times a year. Once you join the list, we keep you informed by email, not by silence.",
        },
        {
          q: "What about screens?",
          a: "There are no screens in our rooms. Children's days are full of real things: water, paint, dough, dirt, songs, books, each other.",
        },
        {
          q: "Are you a subsidized daycare?",
          a: "Ile Coco is a private, non-subsidized daycare — we are not part of Quebec's reduced-contribution (subsidized) network, so there is no government waiting list to navigate. Many families in NDG and Lachine choose us for exactly that reason: private spots open more often, the groups stay small, and the same care is included for everyone.",
        },
      ],
    },
    fr: {
      eyebrow: "Des réponses honnêtes",
      title1: "Questions que",
      title2: "les parents posent",
      tapHint: "cliquez pour ouvrir",
      items: [
        {
          q: "Quels âges accueillez-vous?",
          a: "De 7 mois à 5 ans — les bébés aussi. Notre pouponnière accueille les poupons dès 7 mois, et chaque âge au-dessus a sa salle dédiée : des espaces calmes et sécurisés, conçus et encadrés pour ce stade précis du développement.",
        },
        {
          q: "Comment gérez-vous les allergies?",
          a: "Chaque menu est révisé chaque semaine pour les allergènes du mois. Notre chef et notre éducatrice principale détiennent les certifications en salubrité alimentaire.",
        },
        {
          q: "Quel est le ratio éducateur-enfant?",
          a: "Maximum sept enfants par éducateur. Souvent moins — c'est un choix délibéré.",
        },
        {
          q: "Avez-vous une liste d'attente?",
          a: "Oui — et nous sommes honnêtes à ce sujet. Des places s'ouvrent trois à quatre fois par an. Nous vous tenons informés par courriel, pas par silence.",
        },
        {
          q: "Et les écrans?",
          a: "Aucun écran dans nos espaces. Les journées sont pleines de choses vraies : eau, peinture, pâte, terre, chansons, livres, les autres.",
        },
        {
          q: "Êtes-vous une garderie subventionnée?",
          a: "Ile Coco est une garderie privée, non subventionnée — nous ne faisons pas partie du réseau subventionné à contribution réduite du Québec, donc aucune liste d'attente gouvernementale à gérer. Beaucoup de familles de NDG et de Lachine nous choisissent pour cette raison : les places privées s'ouvrent plus souvent, les groupes restent petits, et le même soin est inclus pour tous.",
        },
      ],
    },
  },
  newsletter: {
    en: {
      eyebrow: "Stay close",
      title1: "A letter,",
      title2: "once a season",
      sub: "Four times a year, a slow note from the home: a recipe the children loved, a photo from the garden, what we are reading aloud at story time.",
      placeholder: "your@email.com",
      cta: "Subscribe",
      promise: "No spam. Four notes a year. Unsubscribe with one click.",
      success: "Thank you. The next letter is coming.",
    },
    fr: {
      eyebrow: "Rester proche",
      title1: "Une lettre,",
      title2: "à chaque saison",
      sub: "Quatre fois par année, un mot lent du foyer : une recette adorée, une photo du jardin, ce que nous lisons à l'heure du conte.",
      placeholder: "votre@courriel.com",
      cta: "S'abonner",
      promise:
        "Pas de spam. Quatre lettres par année. Désinscription en un clic.",
      success: "Merci. La prochaine lettre arrive bientôt.",
    },
  },
  social: {
    en: {
      eyebrow: "@ilecocodaycare",
      title1: "Follow along",
      title2: "on Instagram",
      sub: "Quiet daily moments — not curated, just true.",
    },
    fr: {
      eyebrow: "@ilecocodaycare",
      title1: "Suivez-nous",
      title2: "sur Instagram",
      sub: "De petits moments quotidiens — non filtrés, juste vrais.",
    },
  },
  cta: {
    en: {
      title1: "Ready to find your",
      title2: "child a home?",
      sub: "Tours are slow, by appointment, and always include tea.",
      cta1: "Book a visit",
      cta2: "Join waiting list",
      formLabel: "Your email",
      formPlaceholder: "your@email.com",
      formCta: "Tell me more",
      formSuccess: "Thank you. We'll be in touch within a day or two.",
    },
    fr: {
      title1: "Prêts à trouver",
      title2: "un foyer pour votre enfant?",
      sub: "Les visites sont lentes, sur rendez-vous, et toujours accompagnées d'un thé.",
      cta1: "Réserver une visite",
      cta2: "Liste d'attente",
      formLabel: "Votre courriel",
      formPlaceholder: "votre@courriel.com",
      formCta: "En savoir plus",
      formSuccess: "Merci. Nous vous contactons sous un jour ou deux.",
    },
  },
  wizard: {
    en: {
      title: "Join the waiting list",
      subtitle: "Three short steps. We will read every word.",
      stepLabels: ["About your child", "Your preferences", "How we reach you"],
      step: (n: number, total: number) => `Step ${n} of ${total}`,
      back: "Back",
      next: "Continue",
      submit: "Send to Ile CoCo",
      sending: "Sending…",
      cancel: "Close",
      success: {
        title: "We have your note.",
        body: "Thank you. A real human will reply within a day or two — by email, with your name.",
        secondary: "Close",
      },
      error: {
        title: "Something went sideways.",
        retry: "Try again",
      },
      child: {
        firstName: "Child's first name",
        firstNamePh: "Léa",
        dob: "Date of birth",
        ageHint: (y: number, m: number) =>
          y === 0
            ? m === 1
              ? "1 month old"
              : `${m} months old`
            : y === 1
              ? `1 year, ${m} mo`
              : `${y} years, ${m} mo`,
      },
      preferences: {
        location: "Preferred location",
        locations: {
          somerled: "Somerled",
          lachine: "Lachine",
          either: "Either is fine",
        },
        startDate: "Hoped-for start date",
        startDateHint: "A best guess is fine — we will work it out together.",
        careType: "Type of care",
        careTypes: { "full-time": "Full-time", "part-time": "Part-time" },
      },
      contact: {
        parentName: "Your name",
        parentNamePh: "Camille Dupont",
        email: "Email",
        emailPh: "you@example.com",
        phone: "Phone",
        phonePh: "(514) 000-0000",
        heardFrom: "How did you hear about us? (optional)",
        heardFromPh: "A friend, Instagram, walking by…",
        notes: "Anything we should know? (optional)",
        notesPh: "Allergies, a sibling already with us, special days…",
      },
      validation: {
        required: "Please fill this in",
        emailInvalid: "That email looks off",
        phoneShort: "Phone looks too short",
        dateInPast: "Date must be in the past",
      },
    },
    fr: {
      title: "Liste d'attente",
      subtitle: "Trois petites étapes. Nous lirons chaque mot.",
      stepLabels: ["Votre enfant", "Vos préférences", "Comment vous joindre"],
      step: (n: number, total: number) => `Étape ${n} sur ${total}`,
      back: "Retour",
      next: "Continuer",
      submit: "Envoyer à Ile CoCo",
      sending: "Envoi…",
      cancel: "Fermer",
      success: {
        title: "Nous avons reçu votre mot.",
        body: "Merci. Une vraie personne vous répondra sous un jour ou deux — par courriel, avec votre prénom.",
        secondary: "Fermer",
      },
      error: {
        title: "Quelque chose n'a pas fonctionné.",
        retry: "Réessayer",
      },
      child: {
        firstName: "Prénom de l'enfant",
        firstNamePh: "Léa",
        dob: "Date de naissance",
        ageHint: (y: number, m: number) =>
          y === 0
            ? m === 1
              ? "1 mois"
              : `${m} mois`
            : y === 1
              ? `1 an, ${m} mois`
              : `${y} ans, ${m} mois`,
      },
      preferences: {
        location: "Emplacement préféré",
        locations: {
          somerled: "Somerled",
          lachine: "Lachine",
          either: "Les deux nous vont",
        },
        startDate: "Date de début souhaitée",
        startDateHint: "Une estimation suffit — nous trouverons ensemble.",
        careType: "Type de garde",
        careTypes: { "full-time": "Temps plein", "part-time": "Temps partiel" },
      },
      contact: {
        parentName: "Votre nom",
        parentNamePh: "Camille Dupont",
        email: "Courriel",
        emailPh: "vous@exemple.com",
        phone: "Téléphone",
        phonePh: "(514) 000-0000",
        heardFrom: "Comment nous avez-vous découverts ? (facultatif)",
        heardFromPh: "Un ami, Instagram, en passant…",
        notes: "Quelque chose à savoir ? (facultatif)",
        notesPh: "Allergies, fratrie déjà chez nous, jours particuliers…",
      },
      validation: {
        required: "À remplir, s’il vous plaît",
        emailInvalid: "Ce courriel semble incorrect",
        phoneShort: "Téléphone trop court",
        dateInPast: "La date doit être dans le passé",
      },
    },
  },
  footer: {
    en: {
      tagline: "A small, warm daycare with two homes in Montréal.",
      addr: "6624 av. Somerled #201 · 400 rue Victoria, Lachine",
      phone: "(514) 574-4695",
      email: "info@ilecoco.com",
      hours: "Mon — Fri · 7:00 to 18:00",
      // `href` is either a locale-relative route ("/programs"), a same-page anchor
      // ("#gallery"), or one of the tokens resolved in footer.tsx ("waitlist",
      // "booking", "instagram", "mailto"). Before this, footer hrefs were guessed
      // from the label text and every one of them resolved to a fragment, a
      // mailto:, an external URL, or a button — not one internal page link.
      col1: "Visit",
      col1Items: [
        { label: "Programs", href: "/programs" },
        { label: "NDG (Somerled) daycare", href: "/locations/somerled" },
        { label: "Lachine daycare", href: "/locations/lachine" },
        { label: "Gallery", href: "#gallery" },
      ],
      col2: "Family",
      col2Items: [
        { label: "FAQ", href: "/faq" },
        { label: "Contact", href: "/contact" },
        { label: "About us", href: "/about" },
        { label: "Waiting List", href: "waitlist" },
        { label: "Book a visit", href: "booking" },
      ],
      col3: "Stay close",
      col3Items: [
        { label: "Instagram", href: "instagram" },
        { label: "Email us", href: "mailto" },
      ],
      copyright: "© 2026 Ile CoCo · Made with care in Montréal",
    },
    fr: {
      tagline: "Une petite garderie chaleureuse avec deux foyers à Montréal.",
      addr: "6624 av. Somerled #201 · 400 rue Victoria, Lachine",
      phone: "(514) 574-4695",
      email: "info@ilecoco.com",
      hours: "Lun — Ven · 7h00 à 18h00",
      col1: "Visiter",
      col1Items: [
        { label: "Programmes", href: "/programs" },
        { label: "Garderie NDG (Somerled)", href: "/locations/somerled" },
        { label: "Garderie Lachine", href: "/locations/lachine" },
        { label: "Galerie", href: "#gallery" },
      ],
      col2: "Famille",
      col2Items: [
        { label: "FAQ", href: "/faq" },
        { label: "Contact", href: "/contact" },
        { label: "À propos", href: "/about" },
        { label: "Liste d'attente", href: "waitlist" },
        { label: "Réserver", href: "booking" },
      ],
      col3: "Rester proche",
      col3Items: [
        { label: "Instagram", href: "instagram" },
        { label: "Écrivez-nous", href: "mailto" },
      ],
      copyright: "© 2026 Ile CoCo · Fait avec soin à Montréal",
    },
  },
} as const;

export const PHOTOS = {
  hero1: "/images/ile-coco/apple-picking.jpg",
  hero2: "/images/ile-coco/baby-reading.jpg",
  mission: "/images/ile-coco/locations/somerled-classroom.jpg",
  why: "/images/ile-coco/educator-selfie.jpg",
  journey1: "/images/ile-coco/water-play.jpg",
  journey2: "/images/ile-coco/snow-play.jpg",
  journey3: "/images/ile-coco/apple-picking.jpg",
  // Gallery — using the new high-res Somerled interiors for the Somerled-themed tiles
  gallery1: "/images/ile-coco/locations/somerled-hallway.jpg",
  gallery2: "/images/ile-coco/locations/somerled-classroom.jpg",
  gallery3: "/images/ile-coco/locations/somerled-bouncy.jpg",
  gallery4: "/images/ile-coco/treehouse.jpg",
  gallery5: "/images/ile-coco/meals-art.jpg",
  gallery6: "/images/ile-coco/santa-group.jpg",
  gallery7: "/images/ile-coco/staff-costumes.jpg",
  gallery8: "/images/ile-coco/water-play.jpg",
  loc1: "/images/ile-coco/locations/somerled-hallway.jpg",
  loc2: "/images/ile-coco/playroom-bouncy.jpg",
  // Somerled-specific interior shots (used as location cameos)
  somerledClassroom: "/images/ile-coco/locations/somerled-classroom.jpg",
  somerledHallway: "/images/ile-coco/locations/somerled-hallway.jpg",
  somerledNursery: "/images/ile-coco/locations/somerled-nursery.jpg",
  somerledBouncy: "/images/ile-coco/locations/somerled-bouncy.jpg",
  somerledPlayroomWide: "/images/ile-coco/locations/somerled-playroom-wide.jpg",
  // Lachine-specific interior shots (storybook murals, bright primary palette)
  lachineHallway: "/images/ile-coco/locations/lachine-hallway.jpg",
  lachineToddlerRoom: "/images/ile-coco/locations/lachine-toddler-room.jpg",
  lachineClassroom: "/images/ile-coco/locations/lachine-classroom.jpg",
  lachineExterior: "/images/ile-coco/locations/lachine.jpg",
  social1: "/images/ile-coco/meals-art.jpg",
  social2: "/images/ile-coco/staff-costumes.jpg",
  social3: "/images/ile-coco/treehouse.jpg",
  social4: "/images/ile-coco/santa-group.jpg",
  social5: "/images/ile-coco/snow-play.jpg",
  social6: "/images/ile-coco/baby-reading.jpg",
} as const;
