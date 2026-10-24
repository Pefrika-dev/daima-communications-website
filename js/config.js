/* ==========================================================================
   DAIMA COMMUNICATIONS - CENTRAL CONFIGURATION
   --------------------------------------------------------------------------
   Business settings used across the public website and the local dashboard.
   Keep prices, stock notes and branch information current as the business
   confirms them.
   ========================================================================== */

window.DAIMA = window.DAIMA || {};

DAIMA.CONFIG = {
  /* ------------------------------------------------------------------ */
  /* Business                                                           */
  /* ------------------------------------------------------------------ */
  business: {
    name: 'DAIMA COMMUNICATIONS',
    shortName: 'Daima',
    legalName: 'DAIMA COMMUNICATIONS',
    category: 'Mobile Phones, Electronics, Accessories and Technology Retail',
    tagline: 'Your Technology. Your Choice. Your Daima.',
    headline: 'Technology that moves with you.',
    intro:
      'Shop smartphones, accessories and everyday technology at Daima Communications in Sirare and Kehancha. Call or WhatsApp 0701 127 577 to confirm price, model and availability.',
    region: 'Sirare and Kehancha, Migori County, Kenya',
    established: null, // Add a verified year only when confirmed by the business.
  },

  /* ------------------------------------------------------------------ */
  /* Developer credit                                                   */
  /* ------------------------------------------------------------------ */
  developer: {
    name: 'Thomas Hondo Chacha',
    title: 'Software Engineer | Website Developer',
    credit:
      'Website designed and developed by Thomas Hondo Chacha - Software Engineer.',
    note:
      'Website designed and developed by Thomas Hondo Chacha for DAIMA COMMUNICATIONS.',
  },

  /* ------------------------------------------------------------------ */
  /* Money & locale                                                     */
  /* ------------------------------------------------------------------ */
  currency: {
    code: 'KES',
    symbol: 'KSh',
    locale: 'en-KE',
  },

  /* ------------------------------------------------------------------ */
  /* Catalogue wording and honest customer notices                      */
  /* ------------------------------------------------------------------ */
  demo: {
    mode: false,
    catalogueLabel: 'Product catalogue',
    priceNotice:
      'Displayed prices are indicative. Call or WhatsApp 0701 127 577 to confirm today\'s price before paying.',
    availabilityNotice: 'Call or WhatsApp 0701 127 577 to confirm availability.',
    imageNotice:
      'Product images are representative illustrations, not photographs of current stock.',
    inventoryNotice:
      'Stock figures are managed in this browser preview and are not a live shared inventory record.',
  },

  /* ------------------------------------------------------------------ */
  /* WhatsApp                                                           */
  /* ------------------------------------------------------------------ */
  /* Use the full international format, digits only.
     The same business number is used by both branches. */
  whatsapp: {
    number: '254701127577',
    placeholder: '2547XXXXXXXX',
    enabled: true,
    defaultMessage:
      'Hello Daima Communications, I would like to make an enquiry about a product on your website.',
  },

  /* ------------------------------------------------------------------ */
  /* Business contact details                                           */
  /* ------------------------------------------------------------------ */
  contact: {
    phone: '0701127577',
    phoneDisplay: '0701 127 577',
    email: '',
    emailDisplay: '',
    whatsappNote:
      'Call or WhatsApp 0701 127 577. Both Sirare and Kehancha use this one business number.',
  },

  /* ------------------------------------------------------------------ */
  /* Branches                                                           */
  /* ------------------------------------------------------------------ */
  /* Exact street addresses and opening hours have not been supplied.
     Customers are asked to call or WhatsApp for current directions and
     hours rather than showing an unverified detail as fact. */
  branches: [
    {
      id: 'sirare',
      name: 'Sirare',
      fullName: 'DAIMA COMMUNICATIONS - SIRARE',
      location: 'Sirare / Isebania area, Migori County, Kenya.',
      locationShort: 'Sirare / Isebania area',
      addressNote: 'Sirare area, Migori County. Call or WhatsApp for exact directions.',
      phone: '0701127577',
      phoneDisplay: '0701 127 577',
      whatsapp: '254701127577',
      hours: 'Call or WhatsApp to confirm today\'s opening hours.',
      active: true,
      image: 'assets/images/branch-sirare.svg',
      imageAlt:
        'Storefront illustration for Daima Communications Sirare. Representative image, not an actual branch photograph.',
      mapsQuery: 'Daima Communications Sirare Migori County Kenya',
      directionsNote: 'Opens a Google Maps search for the Sirare area. Call for exact directions.',
      stockLabel: 'Call or WhatsApp 0701 127 577 to confirm availability.',
      tagline: 'Serving customers around Sirare and the Isebania border area.',
    },
    {
      id: 'kehancha',
      name: 'Kehancha',
      fullName: 'DAIMA COMMUNICATIONS - KEHANCHA',
      location: 'Kehancha, Migori County, Kenya.',
      locationShort: 'Kehancha town',
      addressNote: 'Kehancha town, Migori County. Call or WhatsApp for exact directions.',
      phone: '0701127577',
      phoneDisplay: '0701 127 577',
      whatsapp: '254701127577',
      hours: 'Call or WhatsApp to confirm today\'s opening hours.',
      active: true,
      image: 'assets/images/branch-kehancha.svg',
      imageAlt:
        'Storefront illustration for Daima Communications Kehancha. Representative image, not an actual branch photograph.',
      mapsQuery: 'Daima Communications Kehancha Migori County Kenya',
      directionsNote: 'Opens a Google Maps search for Kehancha town. Call for exact directions.',
      stockLabel: 'Call or WhatsApp 0701 127 577 to confirm availability.',
      tagline: 'Serving customers in Kehancha and surrounding communities.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* Catalogue categories                                               */
  /* ------------------------------------------------------------------ */
  categories: [
    { id: 'smartphones', name: 'Smartphones', short: 'Phones', image: 'assets/images/galaxy-s24-ultra.svg', description: 'Everyday and flagship smartphones from brands customers recognise.', icon: 'phone' },
    { id: 'feature-phones', name: 'Feature Phones', short: 'Feature phones', image: 'assets/images/nokia-105.svg', description: 'Reliable, simple handsets for calls, messages and long battery life.', icon: 'keypad' },
    { id: 'chargers-cables', name: 'Chargers & Cables', short: 'Charging', image: 'assets/images/anker-charger-30w.svg', description: 'Fast chargers, adapters and everyday charging cables.', icon: 'bolt' },
    { id: 'earphones-headphones', name: 'Earphones & Headphones', short: 'Audio', image: 'assets/images/oraimo-freepods.svg', description: 'Wireless earbuds, in-ear earphones and over-ear headphones.', icon: 'headphones' },
    { id: 'cases-protection', name: 'Cases & Protection', short: 'Protection', image: 'assets/images/rugged-case.svg', description: 'Cases, covers and screen protectors that help protect your device.', icon: 'shield' },
    { id: 'power-banks', name: 'Power Banks', short: 'Power banks', image: 'assets/images/anker-powerbank.svg', description: 'Portable power for travel, work and long days away from a socket.', icon: 'battery' },
    { id: 'smartwatches', name: 'Smartwatches', short: 'Wearables', image: 'assets/images/galaxy-watch-fe.svg', description: 'Wearables for notifications, fitness tracking and daily convenience.', icon: 'watch' },
    { id: 'speakers-audio', name: 'Speakers & Audio', short: 'Speakers', image: 'assets/images/jbl-go4.svg', description: 'Portable speakers and home audio for music on the move.', icon: 'speaker' },
    { id: 'computer-accessories', name: 'Computer Accessories', short: 'Computing', image: 'assets/images/logitech-mouse.svg', description: 'Mice, keyboards, hubs and desk accessories for work and study.', icon: 'laptop' },
    { id: 'other-electronics', name: 'Other Electronics', short: 'Other tech', image: 'assets/images/wifi-router.svg', description: 'Everyday technology for connectivity and the connected home.', icon: 'grid' },
  ],

  brands: ['Samsung', 'Apple', 'Xiaomi', 'Redmi', 'Infinix', 'Tecno', 'Nokia', 'Oraimo', 'Anker', 'JBL', 'Soundcore', 'Logitech', 'HP', 'TP-Link'],

  /* ------------------------------------------------------------------ */
  /* Editable defaults for the local dashboard                          */
  /* ------------------------------------------------------------------ */
  defaults: {
    lowStockThreshold: 5,
    cataloguePriceDisplay: true,
    showDemoBadges: false,
    filterByBranch: false, // Turn on only when real per-branch stock is verified.
    businessName: 'DAIMA COMMUNICATIONS',
    whatsappNumber: '254701127577',
    currencySymbol: 'KSh',
    demoBanner: false,
    catalogueNote:
      'Prices are indicative. Call or WhatsApp 0701 127 577 to confirm the exact model, current price, colour and availability.',
  },

  /* ------------------------------------------------------------------ */
  /* Browser storage keys (local preview - not authorization)            */
  /* ------------------------------------------------------------------ */
  storage: {
    products: 'daima.products.v2',
    branches: 'daima.branches.v2',
    settings: 'daima.settings.v2',
    inquiries: 'daima.inquiries.v2',
    cart: 'daima.cart.v2',
    wishlist: 'daima.wishlist.v2',
    activity: 'daima.activity.v2',
    seeded: 'daima.seeded.v2',
  },

  /* ------------------------------------------------------------------ */
  /* Navigation                                                         */
  /* ------------------------------------------------------------------ */
  nav: [
    { label: 'Home', href: 'index.html' },
    { label: 'Smartphones', href: 'products.html?category=smartphones' },
    { label: 'Accessories', href: 'products.html?view=accessories' },
    { label: 'Other Electronics', href: 'products.html?category=other-electronics' },
    { label: 'Our Branches', href: 'branches.html' },
    { label: 'Contact', href: 'index.html#contact' },
  ],

  /* ------------------------------------------------------------------ */
  /* Site metadata                                                      */
  /* ------------------------------------------------------------------ */
  meta: {
    siteUrl: 'https://daima-communications-website.vercel.app', // Update if a custom domain is connected.
    proposalYear: '2026',
  },
};
