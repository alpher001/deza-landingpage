// All page copy, in English and Hausa. The Hausa is a first draft and must be
// checked by a native speaker before launch (see README).

export type Lang = "en" | "ha";

export const copy = {
  en: {
    meta: {
      title: "Deza · Kano moves with Deza",
      description:
        "Deza is a Kano mobility company. Keke napep rides come first, deliveries follow. Join the waitlist and be first when the app launches.",
    },
    nav: {
      services: "Services",
      how: "How it works",
      drive: "Drive with us",
      app: "The app",
      cta: "Join the waitlist",
      switchLabel: "Hausa",
      switchHref: "/ha/",
    },
    hero: {
      eyebrow: "A Kano mobility company",
      title: ["Kano", "moves with", "Deza."],
      lead: "Keke rides come first, deliveries follow. One app for getting yourself, and your things, across the city.",
      cta: "Join the waitlist",
      soon: "Coming soon on",
      ticker: [
        ["Deza Ride", "Launching first"],
        ["Deza Delivery", "Coming next"],
        ["Kano", "Our first city"],
      ],
      photoAlt: "A keke napep on a Kano street at golden hour",
    },
    services: {
      kicker: "Two ways to move",
      title: "One app for how Kano gets around.",
      items: [
        {
          name: "Deza Ride",
          status: "Launching first",
          body: "Call a keke napep from where you stand. See the fare before you ride and watch your rider come to you.",
          points: ["Fare fixed before you ride", "Rider name, photo and plate number", "Pay cash or transfer"],
          photo: "ride-passenger",
          photoAlt: "A woman stepping into a keke with her phone in hand",
        },
        {
          name: "Deza Delivery",
          status: "Coming next",
          body: "Send a parcel across town with a rider you can follow from pickup to doorstep.",
          points: ["Book a pickup in seconds", "Track the parcel live", "Proof of delivery on your phone"],
          photo: "delivery-hand",
          photoAlt: "A hand holding a parcel with a delivery rider behind",
        },
      ],
    },
    band: {
      title: "Built in Kano, for Kano.",
      body: "We are a Kano team building transport around how this city really moves: by keke, by phone and by word of mouth.",
      photoAlt: "A busy Kano street with kekes",
    },
    how: {
      kicker: "How a ride works",
      title: "From the roadside to your seat in three taps.",
      steps: [
        { title: "Set your pickup", body: "Deza finds where you are, or you drop a pin. Then say where you are going." },
        { title: "See your fare", body: "The price is fixed before you confirm. What you see is what you pay." },
        { title: "Your rider arrives", body: "See their name, photo and keke number, and share the trip with family." },
      ],
    },
    phone: {
      tabs: ["Ride", "Delivery"],
      from: "Pickup",
      fromValue: "Your location",
      to: "Drop-off",
      toValue: "BUK New Site",
      fare: "Fixed fare",
      eta: "Rider 3 min away",
      button: "Request keke",
    },
    drive: {
      kicker: "For keke riders",
      title: "Drive with Deza.",
      body: "More passengers, less waiting at the junction. See every naira you earn, every day, in the Deza driver app.",
      points: ["Trips come to you", "Clear daily earnings", "Support in Hausa"],
      cta: "Register as a rider",
      photoAlt: "A keke rider sitting in his keke in morning light",
    },
    app: {
      kicker: "The Deza app",
      title: "Be first when Deza opens.",
      body: "Leave your number and we will send you one WhatsApp message on launch day. Android comes first, iPhone soon after.",
    },
    waitlist: {
      phone: "Phone number (WhatsApp)",
      phonePlaceholder: "0803 000 0000",
      area: "Your area in Kano",
      areaPlaceholder: "e.g. Sabon Gari",
      role: "I want to",
      roles: { ride: "Ride", send: "Send parcels", drive: "Drive" },
      submit: "Join the waitlist",
      privacy: "We only use your number to tell you about Deza.",
      success: "You are on the list. We will message you on launch day.",
      notOpen: "Sign-ups open very soon. Please check back in a few days.",
      error: "That did not go through. Please check your number and try again.",
    },
    footer: {
      tagline: "Kano moves with Deza.",
      rights: "Deza. Kano, Nigeria.",
    },
  },
  ha: {
    meta: {
      title: "Deza · Kano na tafiya da Deza",
      description:
        "Deza kamfanin sufuri ne na Kano. Hawan keke napep shi ne na farko, isar da kaya na biye. Shiga jerin jira don zama na farko.",
    },
    nav: {
      services: "Ayyuka",
      how: "Yadda yake aiki",
      drive: "Tuƙi da mu",
      app: "Manhaja",
      cta: "Shiga jerin jira",
      switchLabel: "English",
      switchHref: "/",
    },
    hero: {
      eyebrow: "Kamfanin sufuri na Kano",
      title: ["Kano", "na tafiya da", "Deza."],
      lead: "Hawan keke shi ne na farko, isar da kaya na biye. Manhaja ɗaya don kai ka, da kayanka, ko'ina a cikin gari.",
      cta: "Shiga jerin jira",
      soon: "Yana nan tafe a",
      ticker: [
        ["Deza Ride", "Shi ne na farko"],
        ["Deza Delivery", "Na biye"],
        ["Kano", "Garinmu na farko"],
      ],
      photoAlt: "Keke napep a titin Kano da yamma",
    },
    services: {
      kicker: "Hanyoyi biyu na tafiya",
      title: "Manhaja ɗaya don yadda Kano ke zirga-zirga.",
      items: [
        {
          name: "Deza Ride",
          status: "Shi ne na farko",
          body: "Kira keke napep daga inda kake. Ka ga kuɗin hawa kafin ka hau, ka ga mai keke yana tahowa.",
          points: ["Kuɗi a bayyane kafin ka hau", "Sunan mai keke, hotonsa da lambar keke", "Biya da tsabar kuɗi ko tura kuɗi"],
          photo: "ride-passenger",
          photoAlt: "Mace tana shiga keke da waya a hannunta",
        },
        {
          name: "Deza Delivery",
          status: "Na biye",
          body: "Aika kaya ko'ina a cikin gari, kana bin mai kai kayan daga ɗauka har ƙofa.",
          points: ["Nemi a ɗauki kaya cikin daƙiƙa", "Bi kayanka kai tsaye", "Shaidar isarwa a wayarka"],
          photo: "delivery-hand",
          photoAlt: "Hannu riƙe da kaya, mai kai kaya a baya",
        },
      ],
    },
    band: {
      title: "An gina a Kano, don Kano.",
      body: "Mu ƙungiya ce daga Kano, muna gina sufuri bisa yadda wannan gari ke tafiya: da keke, da waya, da baka.",
      photoAlt: "Titin Kano mai cunkoso da kekuna",
    },
    how: {
      kicker: "Yadda hawa yake aiki",
      title: "Daga bakin titi zuwa kujerarka da taɓawa uku.",
      steps: [
        { title: "Saka inda kake", body: "Deza za ta gano inda kake, ko ka sa alama a taswira. Sannan ka faɗi inda za ka." },
        { title: "Ka ga kuɗin hawa", body: "Za ka ga farashi kafin ka amince. Abin da ka gani shi za ka biya." },
        { title: "Mai keke ya iso", body: "Ka ga sunansa, hotonsa da lambar kekensa, ka raba tafiyar da iyalinka." },
      ],
    },
    phone: {
      tabs: ["Hawa", "Kaya"],
      from: "Wurin hawa",
      fromValue: "Inda kake",
      to: "Wurin sauka",
      toValue: "BUK New Site",
      fare: "Kuɗi tabbatacce",
      eta: "Mai keke na minti 3",
      button: "Kira keke",
    },
    drive: {
      kicker: "Ga masu keke",
      title: "Yi tuƙi da Deza.",
      body: "Ƙarin fasinjoji, ƙarancin jira a kwana. Ka ga kowane naira da ka samu, kullum, a manhajar direbobi ta Deza.",
      points: ["Fasinjoji za su zo maka", "Kuɗin shiga a bayyane kullum", "Taimako da Hausa"],
      cta: "Yi rajista a matsayin mai keke",
      photoAlt: "Mai keke zaune a cikin kekensa da safe",
    },
    app: {
      kicker: "Manhajar Deza",
      title: "Ka zama na farko idan Deza ta buɗe.",
      body: "Ka bar lambarka, za mu tura maka saƙon WhatsApp ɗaya a ranar buɗewa. Android ne na farko, iPhone na biye.",
    },
    waitlist: {
      phone: "Lambar waya (WhatsApp)",
      phonePlaceholder: "0803 000 0000",
      area: "Unguwarka a Kano",
      areaPlaceholder: "misali Sabon Gari",
      role: "Ina so in",
      roles: { ride: "Hau", send: "Aika kaya", drive: "Yi tuƙi" },
      submit: "Shiga jerin jira",
      privacy: "Lambarka don sanar da kai game da Deza kawai muke amfani da ita.",
      success: "Kana cikin jerin. Za mu tura maka saƙo a ranar buɗewa.",
      notOpen: "Rajista za ta buɗe nan ba da jimawa ba. Ka sake dubawa nan da 'yan kwanaki.",
      error: "Bai shiga ba. Ka duba lambarka ka sake gwadawa.",
    },
    footer: {
      tagline: "Kano na tafiya da Deza.",
      rights: "Deza. Kano, Najeriya.",
    },
  },
} as const;
