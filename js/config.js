/* ==========================================================================
   DAIMA COMMUNICATIONS — CENTRAL CONFIGURATION
   --------------------------------------------------------------------------
   Edit this file to replace demonstration details with verified business
   information. Anything marked "to be confirmed" is intentionally a
   placeholder and must not be presented to customers as fact.
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
      'Explore smartphones, accessories and everyday technology, with convenient ways to discover products and connect with Daima Communications.',
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
      'Website Concept Designed & Developed by Thomas Hondo Chacha — Software Engineer.',
    note:
      'This is an independent website proposal. It does not imply that Daima Communications has hired, endorsed or partnered with the developer.',
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
  /* Demonstration mode                                                 */
  /* ------------------------------------------------------------------ */
  demo: {
    mode: true,
    catalogueLabel: 'Demonstration catalogue',
    priceNotice:
      'Prices shown are illustrative demonstration prices in Kenyan shillings. They are not confirmed Daima Communications prices.',
    availabilityNotice: 'Contact the branch to confirm current availability.',
    imageNotice:
      'Product visuals are original illustrative renders created for this proposal — not photographs of Daima stock.',
    inventoryNotice:
      'Stock figures are demonstration data stored in this browser. They are not a live or shared inventory record.',
  },

  /* ------------------------------------------------------------------ */
  /* WhatsApp                                                           */
  /* ------------------------------------------------------------------ */
  /* IMPORTANT: use the full international format, digits only.
     Example: 254712345678. Leave blank until a verified number is provided.
     WhatsApp actions stay disabled while this is blank. */
  whatsapp: {
    number: '', // TODO: configure verified business WhatsApp number
    placeholder: '2547XXXXXXXX',
    enabled: false,
    defaultMessage:
      'Hello Daima Communications, I would like to make an enquiry about a product on your website.',
  },

  /* ------------------------------------------------------------------ */
  /* Verified contact details (none supplied yet)                       */
  /* ------------------------------------------------------------------ */
  contact: {
    phone: '', // TODO: verified central phone number
    phoneDisplay: 'Phone number to be confirmed',
    email: '', // TODO: verified business email
    emailDisplay: 'Email address to be confirmed',
    whatsappNote:
      'WhatsApp enquiries are disabled until a verified business number is configured in js/config.js.',
  },

  /* ------------------------------------------------------------------ */
  /* Branches                                                           */
  /* ------------------------------------------------------------------ */
  /* No street addresses, coordinates, opening hours or phone numbers
     have been supplied. These are deliberately labelled placeholders. */
  branches: [
    {
      id: 'sirare',
      name: 'Sirare',
      fullName: 'DAIMA COMMUNICATIONS — SIRARE',
      location: 'Sirare / Isebania area, Migori County, Kenya.',
      locationShort: 'Sirare / Isebania area',
      addressNote: 'Exact street address to be confirmed with the business.',
      phone: '',
      phoneDisplay: 'Branch phone to be confirmed',
      whatsapp: '',
      hours: 'Opening hours to be confirmed.',
      active: true,
      image: 'assets/images/branch-sirare.svg',
      imageAlt:
        'Concept visual of a modern Daima Communications storefront at dusk — not an actual branch photograph.',
      mapsQuery: 'Daima Communications Sirare Migori County Kenya',
      directionsNote: 'Opens a Google Maps search for the Sirare area.',
      stockLabel: 'Contact the branch to confirm availability.',
      tagline: 'Serving customers around Sirare and the Isebania border area.',
    },
    {
      id: 'kehancha',
      name: 'Kehancha',
      fullName: 'DAIMA COMMUNICATIONS — KEHANCHA',
      location: 'Kehancha, Migori County, Kenya.',
      locationShort: 'Kehancha town',
      addressNote: 'Exact street address to be confirmed with the business.',
      phone: '',
      phoneDisplay: 'Branch phone to be confirmed',
      whatsapp: '',
      hours: 'Opening hours to be confirmed.',
      active: true,
      image: 'assets/images/branch-kehancha.svg',
      imageAlt:
        'Concept visual of a modern Daima Communications storefront in the evening — not an actual branch photograph.',
      mapsQuery: 'Daima Communications Kehancha Migori County Kenya',
      directionsNote: 'Opens a Google Maps search for Kehancha town.',
      stockLabel: 'Contact the branch to confirm availability.',
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
  /* Editable defaults for the demonstration dashboard                  */
  /* ------------------------------------------------------------------ */
  defaults: {
    lowStockThreshold: 5,
    cataloguePriceDisplay: true,
    showDemoBadges: true,
    filterByBranch: false, // Turn on only when real per-branch stock is verified.
    businessName: 'DAIMA COMMUNICATIONS',
    whatsappNumber: '',
    currencySymbol: 'KSh',
    demoBanner: true,
    catalogueNote:
      'Demonstration catalogue. Confirm exact model, colour, specification, price and availability with Daima Communications before purchase.',
  },

  /* ------------------------------------------------------------------ */
  /* Browser storage keys (demonstration only — not authorization)      */
  /* ------------------------------------------------------------------ */
  storage: {
    products: 'daima.products.v1',
    branches: 'daima.branches.v1',
    settings: 'daima.settings.v1',
    inquiries: 'daima.inquiries.v1',
    cart: 'daima.cart.v1',
    wishlist: 'daima.wishlist.v1',
    activity: 'daima.activity.v1',
    seeded: 'daima.seeded.v1',
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
  /* Proposal meta                                                      */
  /* ------------------------------------------------------------------ */
  meta: {
    siteUrl: 'https://your-domain.example', // TODO: replace after deployment
    proposalYear: '2026',
  },
};
