// All page copy, in English and Hausa. The Hausa is a first draft and must be
// checked by a native speaker before launch (see README).

export type Lang = "en" | "ha";

export const copy = {
  en: {
    meta: {
      title: "Deza · Keke rides in Kano, fare fixed before you ride",
      description:
        "Deza is keke napep ride-hailing built in Kano. See your fare before you ride, track your rider, pay cash or transfer. Join the waitlist.",
    },
    nav: {
      how: "How it works",
      safety: "Why Deza",
      drive: "Drive",
      delivery: "Delivery",
      cta: "Join the waitlist",
      switchLabel: "Hausa",
      switchHref: "/ha/",
    },
    hero: {
      eyebrow: "Keke napep rides · Kano",
      title: "Kano's keke,",
      titleAccent: "on your phone.",
      lead: "See your fare before you ride. No haggling, no waiting at the roadside. Deza launches in Kano on Android first.",
      cta: "Join the waitlist",
      secondary: "How it works",
      note: "Android first · Coming soon",
    },
    phone: {
      from: "Pickup",
      fromValue: "Your location",
      to: "Drop-off",
      toValue: "BUK New Site",
      fare: "Fixed fare",
      eta: "Rider 3 min away",
      button: "Request keke",
    },
    how: {
      kicker: "How it works",
      title: "Three taps from the roadside to your seat.",
      steps: [
        {
          title: "Set your pickup",
          body: "Deza finds where you are, or you drop a pin. Then say where you are going.",
        },
        {
          title: "See your fare",
          body: "The price is fixed before you confirm. What you see is what you pay.",
        },
        {
          title: "Your rider arrives",
          body: "See their name, photo and keke number, and watch them come to you.",
        },
      ],
    },
    trust: {
      kicker: "Why Deza",
      title: "Built around what matters on a Kano road.",
      items: [
        {
          title: "No haggling",
          body: "The fare is agreed before the ride starts and never argued at the end.",
        },
        {
          title: "Riders you can trust",
          body: "Every rider is checked before they drive with Deza, and rated after every trip.",
        },
        {
          title: "Share your trip",
          body: "Send your live trip to family with one tap, day or night.",
        },
        {
          title: "Cash or transfer",
          body: "Pay the way you already do. No card needed.",
        },
      ],
    },
    route: {
      kicker: "Across the city",
      title: "From your gate to theirs, one gold line.",
      body: "Deza starts in Kano, area by area. Tell us where you live and we will tell you when Deza reaches you.",
      pickup: "Pickup",
      dropoff: "Drop-off",
    },
    drive: {
      kicker: "For keke riders",
      title: "Drive with Deza.",
      body: "More passengers, less waiting at the junction. See every naira you earn, every day, in the Deza driver app.",
      points: ["Trips come to you", "Clear daily earnings", "Support in Hausa"],
      cta: "Register as a rider",
    },
    delivery: {
      kicker: "Coming next",
      title: "Deza Delivery.",
      body: "Send a parcel across town with a rider you can track from pickup to doorstep. Tell us you want it and you will hear first.",
      cta: "Tell me when it launches",
    },
    about: {
      kicker: "Who we are",
      title: "Built in Kano, for Kano.",
      body: "We are a Kano team building transport around how this city actually moves: by keke, by phone, and by word of mouth.",
    },
    waitlist: {
      kicker: "Waitlist",
      title: "Be first to ride.",
      body: "Leave your number and we will send you one WhatsApp message on launch day.",
      phone: "Phone number (WhatsApp)",
      phonePlaceholder: "0803 000 0000",
      area: "Your area in Kano",
      areaPlaceholder: "e.g. Sabon Gari",
      role: "I want to",
      roles: { ride: "Ride", drive: "Drive", send: "Send parcels" },
      submit: "Join the waitlist",
      privacy: "We only use your number to tell you about Deza. Nothing else.",
      success: "You are on the list. We will message you on launch day.",
      notOpen: "Sign-ups open very soon. Please check back in a few days.",
      error: "That did not go through. Please check your number and try again.",
    },
    footer: {
      tagline: "Keke rides, built in Kano.",
      rights: "Deza. Kano, Nigeria.",
    },
  },
  ha: {
    meta: {
      title: "Deza · Hawan keke a Kano, kuɗi a bayyane kafin ka hau",
      description:
        "Deza manhajar kiran keke napep ce da aka gina a Kano. Ka ga kuɗin hawa kafin ka hau, ka bi mai keke a taswira, ka biya da tsabar kuɗi ko tura kuɗi.",
    },
    nav: {
      how: "Yadda yake aiki",
      safety: "Me yasa Deza",
      drive: "Tuƙi",
      delivery: "Isar da kaya",
      cta: "Shiga jerin jira",
      switchLabel: "English",
      switchHref: "/",
    },
    hero: {
      eyebrow: "Hawan keke napep · Kano",
      title: "Keken Kano,",
      titleAccent: "a wayarka.",
      lead: "Ka ga kuɗin hawa kafin ka hau. Babu ciniki, babu jira a bakin titi. Deza na zuwa Kano, a Android da farko.",
      cta: "Shiga jerin jira",
      secondary: "Yadda yake aiki",
      note: "Android da farko · Yana nan tafe",
    },
    phone: {
      from: "Wurin hawa",
      fromValue: "Inda kake",
      to: "Wurin sauka",
      toValue: "BUK New Site",
      fare: "Kuɗi tabbatacce",
      eta: "Mai keke na minti 3",
      button: "Kira keke",
    },
    how: {
      kicker: "Yadda yake aiki",
      title: "Taɓawa uku daga bakin titi zuwa kujerarka.",
      steps: [
        {
          title: "Saka inda kake",
          body: "Deza za ta gano inda kake, ko ka sa alama a taswira. Sannan ka faɗi inda za ka.",
        },
        {
          title: "Ka ga kuɗin hawa",
          body: "Za ka ga farashi kafin ka amince. Abin da ka gani shi za ka biya.",
        },
        {
          title: "Mai keke ya iso",
          body: "Za ka ga sunansa, hotonsa da lambar kekensa, kuma ka ga yana tahowa.",
        },
      ],
    },
    trust: {
      kicker: "Me yasa Deza",
      title: "An gina shi bisa abin da ke da muhimmanci a titin Kano.",
      items: [
        {
          title: "Babu ciniki",
          body: "Ana amincewa da kuɗi kafin a tashi, ba a jayayya a ƙarshe.",
        },
        {
          title: "Masu keke amintattu",
          body: "Ana tantance kowane mai keke kafin ya fara aiki da Deza, kuma ana ba shi maki bayan kowace tafiya.",
        },
        {
          title: "Raba tafiyarka",
          body: "Ka tura tafiyarka kai tsaye ga iyalinka da taɓawa ɗaya, dare ko rana.",
        },
        {
          title: "Tsabar kuɗi ko tura kuɗi",
          body: "Ka biya yadda ka saba. Ba sai da kati ba.",
        },
      ],
    },
    route: {
      kicker: "Ko'ina a gari",
      title: "Daga ƙofarka zuwa tasu, layi ɗaya na zinariya.",
      body: "Deza za ta fara a Kano, unguwa bayan unguwa. Ka faɗa mana unguwarka, za mu sanar da kai idan Deza ta iso.",
      pickup: "Wurin hawa",
      dropoff: "Wurin sauka",
    },
    drive: {
      kicker: "Ga masu keke",
      title: "Yi tuƙi da Deza.",
      body: "Ƙarin fasinjoji, ƙarancin jira a kwana. Ka ga kowane naira da ka samu, kullum, a manhajar direbobi ta Deza.",
      points: ["Fasinjoji za su zo maka", "Kuɗin shiga a bayyane kullum", "Taimako da Hausa"],
      cta: "Yi rajista a matsayin mai keke",
    },
    delivery: {
      kicker: "Na gaba",
      title: "Deza Delivery.",
      body: "Aika kaya ko'ina a cikin gari, kana bin mai kai kayan daga ɗauka har ƙofa. Ka sanar da mu, za ka fara ji.",
      cta: "Sanar da ni idan ya fito",
    },
    about: {
      kicker: "Su wanene mu",
      title: "An gina a Kano, don Kano.",
      body: "Mu ƙungiya ce daga Kano, muna gina sufuri bisa yadda wannan gari ke tafiya: da keke, da waya, da baka.",
    },
    waitlist: {
      kicker: "Jerin jira",
      title: "Ka zama na farko.",
      body: "Ka bar lambarka, za mu tura maka saƙon WhatsApp ɗaya a ranar da muka buɗe.",
      phone: "Lambar waya (WhatsApp)",
      phonePlaceholder: "0803 000 0000",
      area: "Unguwarka a Kano",
      areaPlaceholder: "misali Sabon Gari",
      role: "Ina so in",
      roles: { ride: "Hau", drive: "Yi tuƙi", send: "Aika kaya" },
      submit: "Shiga jerin jira",
      privacy: "Lambarka don sanar da kai game da Deza kawai muke amfani da ita.",
      success: "Kana cikin jerin. Za mu tura maka saƙo a ranar buɗewa.",
      notOpen: "Rajista za ta buɗe nan ba da jimawa ba. Ka sake dubawa nan da 'yan kwanaki.",
      error: "Bai shiga ba. Ka duba lambarka ka sake gwadawa.",
    },
    footer: {
      tagline: "Hawan keke, an gina a Kano.",
      rights: "Deza. Kano, Najeriya.",
    },
  },
} as const;
