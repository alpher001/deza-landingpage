// All page copy, in English and Hausa. The Hausa is a first draft and must be
// checked by a native speaker before launch (see README).

export type Lang = "en" | "ha";

export const copy = {
  en: {
    meta: {
      title: "Deza · Moving Kano forward",
      description:
        "Deza is a Kano mobility company building one app for how the city moves: keke rides first, deliveries next. Join the waitlist.",
    },
    nav: {
      products: "Products",
      how: "How it works",
      safety: "Safety",
      earn: "Earn with Deza",
      cta: "Join the waitlist",
      switchLabel: "Hausa",
      switchHref: "/ha/",
    },
    hero: {
      eyebrow: "Deza · Mobility for Kano",
      title: ["Moving", "Kano", "forward."],
      lead: "Deza is a Kano mobility company. We are building one app for how this city moves: people first, then parcels, then more.",
      cta: "Join the waitlist",
      soon: "Coming soon",
      photoAlt: "A busy Kano market street at golden hour with kekes and people",
    },
    marquee: ["Sabon Gari", "Kofar Mata", "Zoo Road", "Nassarawa", "Fagge", "Gwale", "Tarauni", "Hotoro", "Dala", "BUK", "Bompai", "Sharada"],
    manifesto:
      "Kano runs on kekes, motorbikes and word of mouth. Deza brings it into one app, with fair prices, trusted riders and a simple way to move people and parcels across the city.",
    products: {
      kicker: "Products",
      title: "One app. Every way Kano moves.",
      items: [
        {
          name: "Deza Ride",
          status: "Launching first",
          body: "Call a keke napep from where you stand. See the fare before you ride and watch your rider come to you.",
          photo: "ride-passenger",
          photoAlt: "A woman stepping into a keke with her phone in hand",
        },
        {
          name: "Deza Delivery",
          status: "Coming next",
          body: "Send a parcel across town with a rider you can follow from pickup to doorstep.",
          photo: "delivery-hand",
          photoAlt: "A hand passing a parcel to a delivery rider",
        },
        {
          name: "Deza Wallet",
          status: "Inside the app",
          body: "One balance for rides and deliveries. Top up by transfer, or keep paying cash. Your choice.",
          photo: "keke-detail",
          photoAlt: "Close-up of a gold keke panel",
        },
      ],
    },
    how: {
      kicker: "How it works",
      title: "Three taps, whether it's you or your parcel.",
      steps: [
        { title: "Tell us where", body: "Set a pickup and a drop-off. Deza finds where you are, or you drop a pin." },
        { title: "See the price first", body: "The fare is fixed before you confirm. No haggling at the roadside, no surprises at the end." },
        { title: "Follow it live", body: "See your rider's name, photo and plate, and follow the trip or the parcel on the map." },
      ],
      photoAlt: "A hand holding a phone at the roadside with a keke behind",
    },
    screen: {
      tabs: ["Ride", "Delivery"],
      from: "Pickup",
      fromValue: "Your location",
      to: "Drop-off",
      toValue: "BUK New Site",
      fare: "Fixed fare",
      button: "Confirm",
      eta: "Musa is 3 min away",
      plate: "KN 482 KY",
    },
    stats: [
      { value: 3, prefix: "", suffix: "", label: "taps to book a ride" },
      { value: 0, prefix: "₦", suffix: "", label: "lost to haggling" },
      { value: 2, prefix: "", suffix: "", label: "languages: English and Hausa" },
      { value: 1, prefix: "", suffix: "", label: "app for people and parcels" },
    ],
    safety: {
      kicker: "Safety",
      title: "Safe rides, day and night.",
      items: [
        { title: "Checked riders", body: "Every rider is checked before they drive with Deza. You see their name, photo and plate before you get in." },
        { title: "Share your trip", body: "Send your live trip to family with one tap." },
        { title: "Fair, fixed prices", body: "The price you agree is the price you pay. Cash or transfer." },
      ],
      photoAlt: "A keke waiting under a streetlight at night with a passenger in the back",
    },
    road: {
      kicker: "Where we are going",
      title: "Building Kano's mobility, one product at a time.",
      steps: [
        { tag: "Now", title: "Building in Kano", body: "The rider and driver apps are in development." },
        { tag: "First", title: "Deza Ride", body: "Keke rides across Kano, Android first." },
        { tag: "Next", title: "Deza Delivery", body: "Parcels across town with live tracking." },
        { tag: "Then", title: "More ways to move", body: "Shaped by what Kano asks us for." },
      ],
    },
    earn: {
      kicker: "Earn with Deza",
      title: "Your keke. More trips. Clear earnings.",
      body: "For keke owners and riders, and soon delivery riders. Trips come to you, and you see every naira you earn, every day.",
      points: ["Trips come to you", "Daily earnings you can see", "Support in Hausa"],
      cta: "Register as a rider",
      photoAlt: "A keke rider sitting in his keke in morning light",
    },
    app: {
      kicker: "The Deza app",
      title: "Be first when Deza opens.",
      body: "Leave your number and we will send you one WhatsApp message on launch day. Android first, iPhone soon after.",
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
      tagline: "Moving Kano forward.",
      rights: "Deza. Kano, Nigeria.",
    },
  },
  ha: {
    meta: {
      title: "Deza · Muna ciyar da Kano gaba",
      description:
        "Deza kamfanin sufuri ne na Kano da ke gina manhaja ɗaya don yadda gari ke tafiya: hawan keke da farko, isar da kaya na biye.",
    },
    nav: {
      products: "Ayyuka",
      how: "Yadda yake aiki",
      safety: "Tsaro",
      earn: "Samu da Deza",
      cta: "Shiga jerin jira",
      switchLabel: "English",
      switchHref: "/",
    },
    hero: {
      eyebrow: "Deza · Sufuri don Kano",
      title: ["Muna ciyar", "da Kano", "gaba."],
      lead: "Deza kamfanin sufuri ne na Kano. Muna gina manhaja ɗaya don yadda wannan gari ke tafiya: mutane da farko, sannan kaya, sannan ƙari.",
      cta: "Shiga jerin jira",
      soon: "Yana nan tafe",
      photoAlt: "Kasuwar Kano mai cunkoso da yamma, da kekuna da mutane",
    },
    marquee: ["Sabon Gari", "Kofar Mata", "Zoo Road", "Nassarawa", "Fagge", "Gwale", "Tarauni", "Hotoro", "Dala", "BUK", "Bompai", "Sharada"],
    manifesto:
      "Kano na tafiya da keke, da babur, da baka. Deza ta haɗa su a manhaja ɗaya, da farashi mai adalci, masu keke amintattu, da hanya mai sauƙi ta kai mutane da kaya ko'ina a gari.",
    products: {
      kicker: "Ayyuka",
      title: "Manhaja ɗaya. Duk hanyar da Kano ke tafiya.",
      items: [
        {
          name: "Deza Ride",
          status: "Shi ne na farko",
          body: "Kira keke napep daga inda kake. Ka ga kuɗin hawa kafin ka hau, ka ga mai keke yana tahowa.",
          photo: "ride-passenger",
          photoAlt: "Mace tana shiga keke da waya a hannunta",
        },
        {
          name: "Deza Delivery",
          status: "Na biye",
          body: "Aika kaya ko'ina a cikin gari, kana bin mai kai kayan daga ɗauka har ƙofa.",
          photo: "delivery-hand",
          photoAlt: "Hannu yana miƙa kaya ga mai kai kaya",
        },
        {
          name: "Deza Wallet",
          status: "A cikin manhaja",
          body: "Asusu ɗaya don hawa da aika kaya. Ka saka kuɗi ta tura kuɗi, ko ka ci gaba da biyan tsabar kuɗi.",
          photo: "keke-detail",
          photoAlt: "Kusa da jikin keke mai launin zinariya",
        },
      ],
    },
    how: {
      kicker: "Yadda yake aiki",
      title: "Taɓawa uku, kai ne ko kayanka.",
      steps: [
        { title: "Faɗi inda", body: "Saka wurin ɗauka da wurin sauka. Deza za ta gano inda kake, ko ka sa alama." },
        { title: "Ga farashi tun farko", body: "Kuɗin a bayyane yake kafin ka amince. Babu ciniki a bakin titi, babu abin mamaki a ƙarshe." },
        { title: "Bi shi kai tsaye", body: "Ka ga sunan mai keke, hotonsa da lambar keke, ka bi tafiya ko kaya a taswira." },
      ],
      photoAlt: "Hannu riƙe da waya a bakin titi, keke a baya",
    },
    screen: {
      tabs: ["Hawa", "Kaya"],
      from: "Wurin ɗauka",
      fromValue: "Inda kake",
      to: "Wurin sauka",
      toValue: "BUK New Site",
      fare: "Kuɗi tabbatacce",
      button: "Amince",
      eta: "Musa na minti 3",
      plate: "KN 482 KY",
    },
    stats: [
      { value: 3, prefix: "", suffix: "", label: "taɓawa don kiran keke" },
      { value: 0, prefix: "₦", suffix: "", label: "da ke salwanta a ciniki" },
      { value: 2, prefix: "", suffix: "", label: "harsuna: Turanci da Hausa" },
      { value: 1, prefix: "", suffix: "", label: "manhaja don mutane da kaya" },
    ],
    safety: {
      kicker: "Tsaro",
      title: "Tafiya lafiya, dare da rana.",
      items: [
        { title: "Masu keke da aka tantance", body: "Ana tantance kowane mai keke kafin ya fara aiki da Deza. Za ka ga sunansa, hotonsa da lambar keke kafin ka shiga." },
        { title: "Raba tafiyarka", body: "Ka tura tafiyarka kai tsaye ga iyalinka da taɓawa ɗaya." },
        { title: "Farashi mai adalci", body: "Kuɗin da ka amince da shi shi za ka biya. Tsabar kuɗi ko tura kuɗi." },
      ],
      photoAlt: "Keke yana jira ƙarƙashin fitila da dare, fasinja a baya",
    },
    road: {
      kicker: "Inda za mu",
      title: "Muna gina sufurin Kano, aiki ɗaya bayan ɗaya.",
      steps: [
        { tag: "Yanzu", title: "Gini a Kano", body: "Ana gina manhajojin fasinja da direba." },
        { tag: "Na farko", title: "Deza Ride", body: "Hawan keke a Kano, Android da farko." },
        { tag: "Na biye", title: "Deza Delivery", body: "Aika kaya a gari, ana bin sa kai tsaye." },
        { tag: "Sannan", title: "Ƙarin hanyoyi", body: "Bisa abin da Kano ta nema daga gare mu." },
      ],
    },
    earn: {
      kicker: "Samu da Deza",
      title: "Kekenka. Ƙarin tafiye-tafiye. Kuɗi a bayyane.",
      body: "Ga masu keke da direbobi, kuma nan ba da jimawa ba masu kai kaya. Fasinjoji za su zo maka, kuma za ka ga kowane naira da ka samu, kullum.",
      points: ["Fasinjoji za su zo maka", "Kuɗin shiga a bayyane kullum", "Taimako da Hausa"],
      cta: "Yi rajista a matsayin mai keke",
      photoAlt: "Mai keke zaune a cikin kekensa da safe",
    },
    app: {
      kicker: "Manhajar Deza",
      title: "Ka zama na farko idan Deza ta buɗe.",
      body: "Ka bar lambarka, za mu tura maka saƙon WhatsApp ɗaya a ranar buɗewa. Android da farko, iPhone na biye.",
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
      tagline: "Muna ciyar da Kano gaba.",
      rights: "Deza. Kano, Najeriya.",
    },
  },
} as const;
