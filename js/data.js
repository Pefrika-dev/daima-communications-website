/* ==========================================================================
   DAIMA COMMUNICATIONS — DEMONSTRATION CATALOGUE & LOCAL DATA LAYER
   --------------------------------------------------------------------------
   Every product, price, stock figure and inquiry in this file is sample
   demonstration data. Category, brand and availability wording is deliberately
   cautious: no stock, price, specification or warranty claim is verified.

   Replace this array with verified catalogue data before any public launch.
   ========================================================================== */

(function () {
  'use strict';

  const C = DAIMA.CONFIG;
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const nowISO = () => new Date().toISOString();

  const IMG = (slug) => `assets/images/${slug}.svg`;

  function product(entry) {
    return Object.assign(
      {
        demo: true,
        colors: [],
        compareAt: null,
        gallery: [entry.image],
        stock: { sirare: 0, kehancha: 0 },
        featured: false,
        stockNote:
          'Demonstration stock figures only. Confirm current availability with the branch.',
        specsNote:
          'Illustrative demonstration details. Confirm the exact model, variant and specification with Daima before purchase.',
        updatedAt: '2026-10-16T09:00:00.000Z',
        createdAt: '2026-10-01T09:00:00.000Z',
      },
      entry
    );
  }

  const smartphoneSpecs = (display, camera, battery, extra) => [
    ['Display', display],
    ['Camera', camera],
    ['Battery', battery],
    ['Other', extra],
  ];

  const SEED_PRODUCTS = [
    product({
      id: 'p01', slug: 'galaxy-s24-ultra', name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung', model: 'S24 Ultra', category: 'smartphones',
      price: 144999, sku: 'DC-PHN-001',
      image: IMG('galaxy-s24-ultra'),
      gallery: [IMG('galaxy-s24-ultra'), IMG('galaxy-s24-ultra-alt')],
      description:
        'A flagship-class Samsung listing for customers comparing premium camera, display and productivity features. Exact variant, storage and colour must be confirmed with the branch.',
      highlights: ['Premium large-format display', 'Multi-lens rear camera system', 'Flagship-class performance', 'Built-in stylus form factor'],
      specs: smartphoneSpecs('Premium large AMOLED-class display — confirm exact size', 'Multi-lens rear camera system', 'High-capacity battery — confirm rating', 'Storage and RAM options to be confirmed'),
      stock: { sirare: 3, kehancha: 2 }, featured: true, updatedAt: '2026-10-19T10:25:00.000Z',
    }),
    product({
      id: 'p02', slug: 'iphone-15-pro-max', name: 'Apple iPhone 15 Pro Max',
      brand: 'Apple', model: 'iPhone 15 Pro Max', category: 'smartphones',
      price: 159999, sku: 'DC-PHN-002',
      image: IMG('iphone-15-pro-max'),
      gallery: [IMG('iphone-15-pro-max'), IMG('iphone-15-pro-max-alt')],
      description:
        'A premium Apple smartphone listing in the demonstration catalogue, included to show how flagship devices can be presented with clear imagery and branch enquiry options.',
      highlights: ['Pro-style camera system', 'Titanium-finish form factor', 'Large OLED-class display', 'Apple ecosystem features'],
      specs: smartphoneSpecs('Large OLED-class display — confirm exact size', 'Pro-style multi-camera system', 'All-day battery target — confirm rating', 'Storage and colour options to be confirmed'),
      stock: { sirare: 2, kehancha: 1 }, featured: true, updatedAt: '2026-10-18T14:10:00.000Z',
    }),
    product({
      id: 'p03', slug: 'iphone-15', name: 'Apple iPhone 15',
      brand: 'Apple', model: 'iPhone 15', category: 'smartphones',
      price: 119999, sku: 'DC-PHN-003',
      image: IMG('iphone-15'),
      gallery: [IMG('iphone-15'), IMG('iphone-15-alt')],
      description:
        'A current-generation Apple smartphone listing for the demonstration catalogue. Actual availability, storage, colour and warranty terms require confirmation.',
      highlights: ['Colour-rich OLED-class display', 'Dual rear camera system', 'USB-C charging connection', 'Compact everyday form factor'],
      specs: smartphoneSpecs('OLED-class display — confirm exact size', 'Dual rear camera system', 'All-day battery target — confirm rating', 'Storage options to be confirmed'),
      stock: { sirare: 1, kehancha: 2 }, featured: false, updatedAt: '2026-10-17T12:40:00.000Z',
    }),
    product({
      id: 'p04', slug: 'redmi-note-13-pro', name: 'Xiaomi Redmi Note 13 Pro',
      brand: 'Redmi', model: 'Note 13 Pro', category: 'smartphones',
      price: 34999, sku: 'DC-PHN-004',
      image: IMG('redmi-note-13-pro'),
      gallery: [IMG('redmi-note-13-pro'), IMG('redmi-note-13-pro-alt')],
      description:
        'A mid-range Redmi listing focused on camera and everyday performance. The demonstration catalogue uses a sample price and does not confirm stock.',
      highlights: ['High-resolution camera system', 'Smooth large display', 'Fast-charging support', 'Everyday performance'],
      specs: smartphoneSpecs('Large AMOLED-class display — confirm size and refresh rate', 'High-resolution multi-lens camera', 'Fast-charging battery — confirm rating', 'Storage and RAM variants to be confirmed'),
      stock: { sirare: 6, kehancha: 4 }, featured: true, updatedAt: '2026-10-19T08:15:00.000Z',
    }),
    product({
      id: 'p05', slug: 'redmi-13c', name: 'Xiaomi Redmi 13C',
      brand: 'Redmi', model: '13C', category: 'smartphones',
      price: 14999, sku: 'DC-PHN-005',
      image: IMG('redmi-13c'),
      gallery: [IMG('redmi-13c'), IMG('redmi-13c-alt')],
      description:
        'An entry-level Redmi smartphone listing suited to everyday calls, messaging, social media and light browsing.',
      highlights: ['Large everyday display', 'Multi-camera rear setup', 'Long-life battery target', 'Accessible entry price point'],
      specs: smartphoneSpecs('Large display — confirm exact size', 'Multi-camera rear setup', 'Long-life battery — confirm rating', 'Storage options to be confirmed'),
      stock: { sirare: 9, kehancha: 7 }, updatedAt: '2026-10-16T16:05:00.000Z',
    }),
    product({
      id: 'p06', slug: 'infinix-hot-50', name: 'Infinix Hot 50',
      brand: 'Infinix', model: 'Hot 50', category: 'smartphones',
      price: 18499, sku: 'DC-PHN-006',
      image: IMG('infinix-hot-50'),
      gallery: [IMG('infinix-hot-50'), IMG('infinix-hot-50-alt')],
      description:
        'A value-focused Infinix listing for customers who need a large screen, dependable battery life and everyday performance.',
      highlights: ['Large display', 'Long-life battery target', 'Everyday camera setup', 'Attractive value positioning'],
      specs: smartphoneSpecs('Large display — confirm exact size', 'Everyday multi-camera setup', 'Long-life battery — confirm rating', 'Storage options to be confirmed'),
      stock: { sirare: 4, kehancha: 5 }, featured: true, updatedAt: '2026-10-18T11:30:00.000Z',
    }),
    product({
      id: 'p07', slug: 'infinix-note-40', name: 'Infinix Note 40',
      brand: 'Infinix', model: 'Note 40', category: 'smartphones',
      price: 27999, sku: 'DC-PHN-007',
      image: IMG('infinix-note-40'),
      gallery: [IMG('infinix-note-40'), IMG('infinix-note-40-alt')],
      description:
        'A mid-range Infinix listing for customers interested in a larger display and fast-charging features. Confirm the exact variant with the branch.',
      highlights: ['Large AMOLED-class display', 'Fast-charging support', 'Multi-lens camera system', 'Premium finish options'],
      specs: smartphoneSpecs('AMOLED-class display — confirm size', 'Multi-lens camera system', 'Fast-charging battery — confirm rating', 'Variant and colour to be confirmed'),
      stock: { sirare: 2, kehancha: 0 }, updatedAt: '2026-10-15T10:00:00.000Z',
    }),
    product({
      id: 'p08', slug: 'tecno-camon-30', name: 'Tecno Camon 30',
      brand: 'Tecno', model: 'Camon 30', category: 'smartphones',
      price: 23999, sku: 'DC-PHN-008',
      image: IMG('tecno-camon-30'),
      gallery: [IMG('tecno-camon-30'), IMG('tecno-camon-30-alt')],
      description:
        'A camera-oriented Tecno listing for the demonstration catalogue, presented without unverified specification or warranty claims.',
      highlights: ['Camera-focused positioning', 'Large display', 'Everyday performance', 'Distinctive finish'],
      specs: smartphoneSpecs('Large display — confirm exact size', 'Camera-focused rear system', 'Everyday battery — confirm rating', 'Storage options to be confirmed'),
      stock: { sirare: 5, kehancha: 3 }, updatedAt: '2026-10-14T15:20:00.000Z',
    }),
    product({
      id: 'p09', slug: 'tecno-spark-20', name: 'Tecno Spark 20',
      brand: 'Tecno', model: 'Spark 20', category: 'smartphones',
      price: 12999, sku: 'DC-PHN-009',
      image: IMG('tecno-spark-20'),
      gallery: [IMG('tecno-spark-20'), IMG('tecno-spark-20-alt')],
      description:
        'An affordable Tecno smartphone listing aimed at everyday connectivity, social media and media consumption.',
      highlights: ['Large everyday display', 'Dual camera setup', 'Long-life battery target', 'Entry-level price point'],
      specs: smartphoneSpecs('Large display — confirm exact size', 'Everyday camera setup', 'Long-life battery — confirm rating', 'Storage options to be confirmed'),
      stock: { sirare: 7, kehancha: 6 }, updatedAt: '2026-10-13T09:45:00.000Z',
    }),
    product({
      id: 'p10', slug: 'galaxy-a55', name: 'Samsung Galaxy A55',
      brand: 'Samsung', model: 'Galaxy A55', category: 'smartphones',
      price: 42999, sku: 'DC-PHN-010',
      image: IMG('galaxy-a55'),
      gallery: [IMG('galaxy-a55'), IMG('galaxy-a55-alt')],
      description:
        'A mid-range Samsung listing balancing display quality, camera capability and everyday reliability.',
      highlights: ['Super AMOLED-class display', 'Multi-lens camera system', 'Premium metal-finish design', 'All-day battery target'],
      specs: smartphoneSpecs('Super AMOLED-class display — confirm size', 'Multi-lens camera system', 'All-day battery — confirm rating', 'Storage and colour options to be confirmed'),
      stock: { sirare: 3, kehancha: 4 }, updatedAt: '2026-10-12T13:15:00.000Z',
    }),

    product({
      id: 'p11', slug: 'nokia-105', name: 'Nokia 105',
      brand: 'Nokia', model: '105', category: 'feature-phones',
      price: 2499, sku: 'DC-FTR-011',
      image: IMG('nokia-105'),
      description:
        'A straightforward Nokia feature phone for calls and SMS, with a familiar keypad layout and long standby expectations.',
      highlights: ['Simple keypad interface', 'Long standby battery target', 'Built-in torch', 'Compact everyday handset'],
      specs: [['Display', 'Compact colour display'], ['Battery', 'Long standby — confirm exact rating'], ['Network', '2G voice and SMS — confirm variant'], ['In the box', 'Confirm with branch']],
      stock: { sirare: 12, kehancha: 10 }, updatedAt: '2026-10-16T08:20:00.000Z',
    }),
    product({
      id: 'p12', slug: 'nokia-110', name: 'Nokia 110 4G',
      brand: 'Nokia', model: '110 4G', category: 'feature-phones',
      price: 4999, sku: 'DC-FTR-012',
      image: IMG('nokia-110'),
      description:
        'A 4G-capable Nokia feature phone listing for customers who want simple calling with basic connected features.',
      highlights: ['4G connectivity', 'Familiar keypad design', 'Long standby battery target', 'Everyday durability'],
      specs: [['Display', 'Compact colour display'], ['Battery', 'Long standby — confirm exact rating'], ['Network', '4G — confirm regional variant'], ['In the box', 'Confirm with branch']],
      stock: { sirare: 4, kehancha: 3 }, updatedAt: '2026-10-15T14:35:00.000Z',
    }),
    product({
      id: 'p13', slug: 'tecno-t301', name: 'Tecno T301',
      brand: 'Tecno', model: 'T301', category: 'feature-phones',
      price: 2299, sku: 'DC-FTR-013',
      image: IMG('tecno-t301'),
      description:
        'An affordable feature phone listing for basic voice and SMS use, presented with clearly labelled demonstration data.',
      highlights: ['Simple keypad interface', 'Compact form factor', 'Long standby battery target', 'Built-in torch'],
      specs: [['Display', 'Compact colour display'], ['Battery', 'Standby rating to be confirmed'], ['Network', 'Voice and SMS — confirm variant'], ['In the box', 'Confirm with branch']],
      stock: { sirare: 2, kehancha: 0 }, updatedAt: '2026-10-11T10:20:00.000Z',
    }),

    product({
      id: 'p14', slug: 'oraimo-freepods', name: 'Oraimo FreePods 4',
      brand: 'Oraimo', model: 'FreePods 4', category: 'earphones-headphones',
      price: 3499, sku: 'DC-AUD-014',
      image: IMG('oraimo-freepods'),
      description:
        'Wireless earbuds with a charging case, positioned for everyday calls, music and commuting. Confirm battery figures and pairing features with the branch.',
      highlights: ['True wireless earbuds', 'Pocket charging case', 'Touch controls on supported models', 'Everyday call and music use'],
      specs: [['Type', 'True wireless earbuds'], ['Connection', 'Bluetooth — confirm version'], ['Battery', 'Case-assisted listening — confirm figures'], ['Compatibility', 'Bluetooth-enabled phones and laptops']],
      stock: { sirare: 8, kehancha: 6 }, featured: true, updatedAt: '2026-10-18T09:50:00.000Z',
    }),
    product({
      id: 'p15', slug: 'galaxy-buds-fe', name: 'Samsung Galaxy Buds FE',
      brand: 'Samsung', model: 'Galaxy Buds FE', category: 'earphones-headphones',
      price: 8999, sku: 'DC-AUD-015',
      image: IMG('galaxy-buds-fe'),
      description:
        'Samsung wireless earbuds presented for customers looking for everyday listening and call convenience within the Galaxy ecosystem.',
      highlights: ['Wireless earbud form factor', 'Charging case included', 'Noise-control features on supported devices', 'Galaxy ecosystem pairing'],
      specs: [['Type', 'True wireless earbuds'], ['Connection', 'Bluetooth — confirm version'], ['Battery', 'Case-assisted listening — confirm figures'], ['Features', 'Confirm active noise control with branch']],
      stock: { sirare: 3, kehancha: 2 }, updatedAt: '2026-10-17T15:30:00.000Z',
    }),
    product({
      id: 'p16', slug: 'soundcore-buds', name: 'Soundcore P20i Earbuds',
      brand: 'Soundcore', model: 'P20i', category: 'earphones-headphones',
      price: 2999, sku: 'DC-AUD-016',
      image: IMG('soundcore-buds'),
      description:
        'Affordable true-wireless earbuds for everyday listening, included to show how entry-price accessories can be presented clearly.',
      highlights: ['True wireless design', 'Charging case', 'Everyday audio and calls', 'Accessible price point'],
      specs: [['Type', 'True wireless earbuds'], ['Connection', 'Bluetooth — confirm version'], ['Battery', 'Confirm playback figures'], ['Compatibility', 'Bluetooth-enabled devices']],
      stock: { sirare: 1, kehancha: 3 }, updatedAt: '2026-10-14T11:10:00.000Z',
    }),
    product({
      id: 'p17', slug: 'oraimo-headphones', name: 'Oraimo BoomPop Headphones',
      brand: 'Oraimo', model: 'BoomPop', category: 'earphones-headphones',
      price: 4999, sku: 'DC-AUD-017',
      image: IMG('oraimo-headphones'),
      description:
        'Over-ear wireless headphones for longer listening sessions, presented with a clear note that exact battery and feature specifications require confirmation.',
      highlights: ['Over-ear design', 'Wireless listening', 'Cushioned ear cups', 'Built-in microphone on supported models'],
      specs: [['Type', 'Over-ear wireless headphones'], ['Connection', 'Bluetooth — confirm version'], ['Battery', 'Confirm playback figures'], ['Features', 'Confirm microphone and controls at branch']],
      stock: { sirare: 0, kehancha: 2 }, updatedAt: '2026-10-10T16:40:00.000Z',
    }),

    product({
      id: 'p18', slug: 'oraimo-powerbank', name: 'Oraimo 20000mAh Power Bank',
      brand: 'Oraimo', model: '20000mAh', category: 'power-banks',
      price: 3999, sku: 'DC-PWR-018',
      image: IMG('oraimo-powerbank'),
      description:
        'A high-capacity portable power bank listing for travel and long days away from a socket. Confirm port configuration, output ratings and included cable at the branch.',
      highlights: ['High-capacity portable power', 'Multiple output ports on supported models', 'Everyday travel companion', 'LED charge indication'],
      specs: [['Capacity', '20,000mAh-class — confirm exact rating'], ['Output', 'USB charging outputs — confirm ratings'], ['Input', 'Confirm connector and charging speed'], ['In the box', 'Cable inclusion to be confirmed']],
      stock: { sirare: 6, kehancha: 4 }, featured: true, updatedAt: '2026-10-19T09:05:00.000Z',
    }),
    product({
      id: 'p19', slug: 'anker-powerbank', name: 'Anker PowerCore 20000',
      brand: 'Anker', model: 'PowerCore 20000', category: 'power-banks',
      price: 7499, sku: 'DC-PWR-019',
      image: IMG('anker-powerbank'),
      description:
        'A premium high-capacity Anker power bank listing for frequent travellers and heavy device users.',
      highlights: ['High-capacity travel power', 'Multi-device charging support', 'Compact slab form factor', 'Charge-level indication'],
      specs: [['Capacity', '20,000mAh-class — confirm exact rating'], ['Output', 'Multiple USB outputs — confirm ratings'], ['Input', 'Confirm charging input'], ['In the box', 'Confirm included accessories']],
      stock: { sirare: 2, kehancha: 1 }, updatedAt: '2026-10-16T10:50:00.000Z',
    }),
    product({
      id: 'p20', slug: 'xiaomi-powerbank', name: 'Xiaomi 10000mAh Power Bank',
      brand: 'Xiaomi', model: '10000mAh', category: 'power-banks',
      price: 2999, sku: 'DC-PWR-020',
      image: IMG('xiaomi-powerbank'),
      description:
        'A compact everyday power bank listing for topping up a phone during the day. Exact port layout and charging ratings to be confirmed.',
      highlights: ['Compact everyday capacity', 'Pocketable form factor', 'USB charging output', 'Charge-level indication'],
      specs: [['Capacity', '10,000mAh-class — confirm exact rating'], ['Output', 'USB output — confirm rating'], ['Input', 'Confirm charging input'], ['In the box', 'Cable inclusion to be confirmed']],
      stock: { sirare: 10, kehancha: 8 }, updatedAt: '2026-10-13T12:00:00.000Z',
    }),

    product({
      id: 'p21', slug: 'anker-charger-30w', name: 'Anker 30W USB-C Charger',
      brand: 'Anker', model: '30W USB-C', category: 'chargers-cables',
      price: 3499, sku: 'DC-CHG-021',
      image: IMG('anker-charger-30w'),
      description:
        'A compact USB-C wall charger listing for compatible phones and tablets. Confirm plug type, supported charging protocols and warranty with the branch.',
      highlights: ['Compact wall charger', 'USB-C output', 'Travel-friendly form factor', 'Everyday device charging'],
      specs: [['Output', 'USB-C — confirm supported power profiles'], ['Plug', 'Kenya-compatible plug type to be confirmed'], ['Compatibility', 'USB-C charging devices'], ['Warranty', 'Ask the branch for current terms']],
      stock: { sirare: 11, kehancha: 9 }, featured: true, updatedAt: '2026-10-19T11:45:00.000Z',
    }),
    product({
      id: 'p22', slug: 'oraimo-charger-33w', name: 'Oraimo 33W Fast Charger',
      brand: 'Oraimo', model: '33W', category: 'chargers-cables',
      price: 2499, sku: 'DC-CHG-022',
      image: IMG('oraimo-charger-33w'),
      description:
        'A fast-charging wall adapter listing for compatible smartphones. Feature support varies by device; confirm exact compatibility before purchase.',
      highlights: ['Fast-charging wall adapter', 'USB output', 'Compact design', 'Everyday charging'],
      specs: [['Output', 'Fast-charge output — confirm protocol'], ['Plug', 'Confirm plug type'], ['Compatibility', 'Compatible fast-charge phones'], ['In the box', 'Cable inclusion to be confirmed']],
      stock: { sirare: 5, kehancha: 3 }, updatedAt: '2026-10-15T09:10:00.000Z',
    }),
    product({
      id: 'p23', slug: 'samsung-charger-25w', name: 'Samsung 25W Travel Adapter',
      brand: 'Samsung', model: '25W', category: 'chargers-cables',
      price: 2999, sku: 'DC-CHG-023',
      image: IMG('samsung-charger-25w'),
      description:
        'A Samsung travel adapter listing for compatible Galaxy devices, presented without a warranty or charging-speed claim.',
      highlights: ['Compact travel adapter', 'USB-C output', 'Galaxy ecosystem accessory', 'Everyday charging'],
      specs: [['Output', 'USB-C — confirm supported profiles'], ['Plug', 'Confirm plug type'], ['Compatibility', 'USB-C charging devices'], ['Warranty', 'Ask the branch for current terms']],
      stock: { sirare: 4, kehancha: 4 }, updatedAt: '2026-10-14T13:30:00.000Z',
    }),
    product({
      id: 'p24', slug: 'usbc-cable', name: 'Braided USB-C Cable',
      brand: 'Oraimo', model: 'USB-C Cable', category: 'chargers-cables',
      price: 999, sku: 'DC-CHG-024',
      image: IMG('usbc-cable'),
      description:
        'A reinforced everyday USB-C charging cable listing. Confirm connector type, cable length and supported charging speed at the branch.',
      highlights: ['Reinforced braided jacket', 'USB-C connector', 'Everyday charging and data', 'Accessible price point'],
      specs: [['Connector', 'USB-C — confirm both ends'], ['Length', 'Confirm available lengths'], ['Use', 'Charging and data — confirm speed'], ['Compatibility', 'USB-C devices']],
      stock: { sirare: 16, kehancha: 14 }, updatedAt: '2026-10-17T09:00:00.000Z',
    }),

    product({
      id: 'p25', slug: 'clear-case', name: 'Clear Protective Phone Case',
      brand: 'Generic', model: 'Clear Case', category: 'cases-protection',
      price: 799, sku: 'DC-CSE-025',
      image: IMG('clear-case'),
      description:
        'A transparent protective case listing. Model fitment must be confirmed before purchase because case sizes vary by device.',
      highlights: ['Transparent protective shell', 'Camera cut-out', 'Everyday bump protection', 'Slim profile'],
      specs: [['Fit', 'Device-specific — confirm model at branch'], ['Material', 'Flexible clear polymer — confirm'], ['Protection', 'Everyday bump and scratch protection'], ['Colour', 'Clear']],
      stock: { sirare: 12, kehancha: 9 }, updatedAt: '2026-10-12T09:30:00.000Z',
    }),
    product({
      id: 'p26', slug: 'tempered-glass', name: 'Tempered Glass Screen Protector',
      brand: 'Generic', model: 'Tempered Glass', category: 'cases-protection',
      price: 499, sku: 'DC-CSE-026',
      image: IMG('tempered-glass'),
      description:
        'A tempered-glass screen protector listing. Fitment depends on the exact phone model, so confirm the device before purchase.',
      highlights: ['Tempered-glass construction', 'Crystal-clear finish', 'Everyday screen protection', 'Model-specific fitment'],
      specs: [['Fit', 'Device-specific — confirm model at branch'], ['Material', 'Tempered glass — confirm thickness'], ['Coverage', 'Confirm full-cover or edge-to-edge design'], ['In the box', 'Installation accessories to be confirmed']],
      stock: { sirare: 20, kehancha: 16 }, updatedAt: '2026-10-11T15:00:00.000Z',
    }),
    product({
      id: 'p27', slug: 'rugged-case', name: 'Rugged Protective Case',
      brand: 'Generic', model: 'Rugged Case', category: 'cases-protection',
      price: 1299, sku: 'DC-CSE-027',
      image: IMG('rugged-case'),
      description:
        'A reinforced protective case listing for customers who want additional everyday protection. Confirm model compatibility before ordering.',
      highlights: ['Reinforced corner protection', 'Raised camera surround', 'Textured grip', 'Everyday durability'],
      specs: [['Fit', 'Device-specific — confirm model at branch'], ['Material', 'Reinforced polymer — confirm'], ['Protection', 'Enhanced bump protection'], ['Colour', 'Navy — other colours to be confirmed']],
      stock: { sirare: 3, kehancha: 2 }, updatedAt: '2026-10-13T16:20:00.000Z',
    }),

    product({
      id: 'p28', slug: 'galaxy-watch-fe', name: 'Samsung Galaxy Watch FE',
      brand: 'Samsung', model: 'Galaxy Watch FE', category: 'smartwatches',
      price: 17999, sku: 'DC-WCH-028',
      image: IMG('galaxy-watch-fe'),
      description:
        'A Samsung smartwatch listing for notifications, fitness tracking and everyday convenience. Confirm case size, connectivity and compatibility with the branch.',
      highlights: ['Everyday smartwatch form factor', 'Fitness and wellness features', 'Smartphone notifications', 'Galaxy ecosystem integration'],
      specs: [['Display', 'Circular colour display — confirm size'], ['Compatibility', 'Confirm phone compatibility at branch'], ['Battery', 'Confirm typical usage rating'], ['Strap', 'Confirm available strap options']],
      stock: { sirare: 2, kehancha: 1 }, featured: true, updatedAt: '2026-10-18T16:00:00.000Z',
    }),
    product({
      id: 'p29', slug: 'oraimo-watch', name: 'Oraimo Watch 5',
      brand: 'Oraimo', model: 'Watch 5', category: 'smartwatches',
      price: 4999, sku: 'DC-WCH-029',
      image: IMG('oraimo-watch'),
      description:
        'An affordable smartwatch listing for notifications, basic activity tracking and everyday wear.',
      highlights: ['Everyday activity tracking', 'Smartphone notifications', 'Colour display', 'Silicone strap'],
      specs: [['Display', 'Colour display — confirm size'], ['Compatibility', 'Confirm supported devices'], ['Battery', 'Confirm typical usage rating'], ['Water resistance', 'Confirm rating at branch']],
      stock: { sirare: 7, kehancha: 5 }, updatedAt: '2026-10-15T10:40:00.000Z',
    }),
    product({
      id: 'p30', slug: 'redmi-watch', name: 'Xiaomi Redmi Watch 5',
      brand: 'Xiaomi', model: 'Redmi Watch 5', category: 'smartwatches',
      price: 8999, sku: 'DC-WCH-030',
      image: IMG('redmi-watch'),
      description:
        'A mid-range smartwatch listing with a large colour display and everyday fitness features. Confirm exact variant and app support.',
      highlights: ['Large colour display', 'Everyday fitness tracking', 'Smartphone notifications', 'Lightweight form factor'],
      specs: [['Display', 'Large colour display — confirm size'], ['Compatibility', 'Confirm app and phone support'], ['Battery', 'Confirm typical usage rating'], ['Strap', 'Confirm available colours']],
      stock: { sirare: 1, kehancha: 2 }, updatedAt: '2026-10-14T09:15:00.000Z',
    }),

    product({
      id: 'p31', slug: 'jbl-go4', name: 'JBL Go 4 Portable Speaker',
      brand: 'JBL', model: 'Go 4', category: 'speakers-audio',
      price: 6999, sku: 'DC-SPK-031',
      image: IMG('jbl-go4'),
      description:
        'A compact portable Bluetooth speaker listing for everyday music on the move. Confirm battery life and water-resistance details with the branch.',
      highlights: ['Compact portable design', 'Wireless Bluetooth playback', 'Everyday outdoor use', 'Built-in carrying loop'],
      specs: [['Connection', 'Bluetooth — confirm version'], ['Battery', 'Confirm playback rating'], ['Durability', 'Confirm water-resistance rating'], ['In the box', 'Charging cable inclusion to be confirmed']],
      stock: { sirare: 3, kehancha: 4 }, updatedAt: '2026-10-17T14:25:00.000Z',
    }),
    product({
      id: 'p32', slug: 'oraimo-speaker', name: 'Oraimo Party Speaker',
      brand: 'Oraimo', model: 'Party Speaker', category: 'speakers-audio',
      price: 5999, sku: 'DC-SPK-032',
      image: IMG('oraimo-speaker'),
      description:
        'A larger portable speaker listing for gatherings and indoor listening. Exact output power and battery figures require confirmation.',
      highlights: ['High-output portable speaker', 'Wireless playback', 'Rechargeable battery', 'Built-in controls'],
      specs: [['Connection', 'Bluetooth and auxiliary — confirm'], ['Battery', 'Confirm playback rating'], ['Output', 'Confirm rated output'], ['In the box', 'Charging cable and accessories to be confirmed']],
      stock: { sirare: 2, kehancha: 0 }, updatedAt: '2026-10-10T12:10:00.000Z',
    }),

    product({
      id: 'p33', slug: 'logitech-mouse', name: 'Logitech M170 Wireless Mouse',
      brand: 'Logitech', model: 'M170', category: 'computer-accessories',
      price: 1499, sku: 'DC-COM-033',
      image: IMG('logitech-mouse'),
      description:
        'A wireless mouse listing for everyday office and study use. Confirm receiver type and compatibility with the branch.',
      highlights: ['Wireless everyday mouse', 'Compact ambidextrous shape', 'Scroll wheel', 'Plug-and-play setup on supported systems'],
      specs: [['Connection', 'Wireless — confirm receiver type'], ['Compatibility', 'Windows and other desktop systems — confirm'], ['Battery', 'Confirm battery type'], ['Colour', 'Confirm available colour']],
      stock: { sirare: 9, kehancha: 7 }, updatedAt: '2026-10-13T11:35:00.000Z',
    }),
    product({
      id: 'p34', slug: 'hp-keyboard', name: 'HP Wireless Keyboard',
      brand: 'HP', model: 'Wireless Keyboard', category: 'computer-accessories',
      price: 2999, sku: 'DC-COM-034',
      image: IMG('hp-keyboard'),
      description:
        'A wireless keyboard listing for desk work and study. Confirm layout, connectivity and compatibility before purchase.',
      highlights: ['Wireless desktop keyboard', 'Full-size key layout', 'Everyday typing comfort', 'Compact footprint'],
      specs: [['Connection', 'Wireless — confirm receiver or Bluetooth'], ['Layout', 'Confirm regional keyboard layout'], ['Compatibility', 'Confirm operating-system support'], ['Battery', 'Confirm battery requirements']],
      stock: { sirare: 4, kehancha: 2 }, updatedAt: '2026-10-12T15:50:00.000Z',
    }),
    product({
      id: 'p35', slug: 'usbc-hub', name: 'USB-C Multi-Port Hub',
      brand: 'Generic', model: 'USB-C Hub', category: 'computer-accessories',
      price: 3499, sku: 'DC-COM-035',
      image: IMG('usbc-hub'),
      description:
        'A multi-port USB-C hub listing for connecting common peripherals to compatible laptops. Confirm port combination and display support with the branch.',
      highlights: ['Multi-port expansion', 'USB-C connection', 'Compact aluminium-style body', 'Everyday laptop accessory'],
      specs: [['Ports', 'Confirm exact port combination at branch'], ['Connection', 'USB-C — confirm host compatibility'], ['Display', 'Confirm video-output support'], ['Power', 'Confirm passthrough support']],
      stock: { sirare: 3, kehancha: 3 }, updatedAt: '2026-10-16T12:45:00.000Z',
    }),
    product({
      id: 'p36', slug: 'laptop-stand', name: 'Aluminium Laptop Stand',
      brand: 'Generic', model: 'Laptop Stand', category: 'computer-accessories',
      price: 2499, sku: 'DC-COM-036',
      image: IMG('laptop-stand'),
      description:
        'An adjustable-style laptop stand listing for improved desk ergonomics. Confirm size limits and adjustability before purchase.',
      highlights: ['Elevated laptop viewing angle', 'Aluminium-style finish', 'Desktop ergonomics', 'Open airflow design'],
      specs: [['Material', 'Aluminium alloy — confirm finish'], ['Compatibility', 'Confirm supported laptop sizes'], ['Adjustability', 'Confirm adjustable positions'], ['Load', 'Confirm maximum supported weight']],
      stock: { sirare: 2, kehancha: 1 }, updatedAt: '2026-10-11T09:30:00.000Z',
    }),

    product({
      id: 'p37', slug: 'wifi-router', name: 'TP-Link Wi-Fi Router',
      brand: 'TP-Link', model: 'Wi-Fi Router', category: 'other-electronics',
      price: 3999, sku: 'DC-OTH-037',
      image: IMG('wifi-router'),
      description:
        'A home Wi-Fi router listing for basic connectivity. Confirm ISP compatibility, speed rating and installation requirements with the branch.',
      highlights: ['Home wireless networking', 'Multiple antennas', 'Everyday connectivity', 'Simple setup on supported connections'],
      specs: [['Network', 'Confirm supported speeds and standards'], ['Ports', 'Confirm LAN and WAN ports'], ['Setup', 'Confirm ISP compatibility'], ['In the box', 'Power adapter and cable to be confirmed']],
      stock: { sirare: 5, kehancha: 3 }, updatedAt: '2026-10-14T16:15:00.000Z',
    }),
    product({
      id: 'p38', slug: 'smart-bulb', name: 'Smart LED Bulb',
      brand: 'Generic', model: 'Smart Bulb', category: 'other-electronics',
      price: 1199, sku: 'DC-OTH-038',
      image: IMG('smart-bulb'),
      description:
        'A smart LED bulb listing for connected-home demonstrations. Confirm fitting, app support and voice-assistant compatibility before purchase.',
      highlights: ['App-connected lighting', 'Adjustable brightness on supported models', 'Everyday smart-home use', 'Energy-efficient LED'],
      specs: [['Fitting', 'Confirm bulb fitting at branch'], ['App support', 'Confirm supported app'], ['Colour', 'Confirm colour-temperature options'], ['Voice control', 'Confirm supported assistants']],
      stock: { sirare: 6, kehancha: 4 }, updatedAt: '2026-10-09T10:00:00.000Z',
    }),
  ];

  /* ------------------------------------------------------------------ */
  /* Seed inquiries — clearly marked samples                            */
  /* ------------------------------------------------------------------ */
  const SEED_INQUIRIES = [
    {
      id: 'inq01', reference: 'DMC-1001', name: 'Demo Customer 1',
      phone: '+254 700 000 001', email: '', productId: 'p01',
      productName: 'Samsung Galaxy S24 Ultra', branch: 'sirare',
      message: 'Sample inquiry: please confirm the available storage options and demonstration price for this phone.',
      createdAt: '2026-10-19T08:42:00.000Z', status: 'new', demo: true,
    },
    {
      id: 'inq02', reference: 'DMC-1002', name: 'Demo Customer 2',
      phone: '+254 700 000 002', email: '', productId: 'p14',
      productName: 'Oraimo FreePods 4', branch: 'kehancha',
      message: 'Sample inquiry: do these earbuds work with an Android phone, and can I check them at the Kehancha branch?',
      createdAt: '2026-10-18T14:15:00.000Z', status: 'in_progress', demo: true,
    },
    {
      id: 'inq03', reference: 'DMC-1003', name: 'Demo Customer 3',
      phone: '+254 700 000 003', email: 'demo.customer@example.com', productId: '',
      productName: 'General catalogue question', branch: 'sirare',
      message: 'Sample inquiry: I would like to know whether the Sirare branch can help me compare two chargers.',
      createdAt: '2026-10-17T10:05:00.000Z', status: 'resolved', demo: true,
    },
    {
      id: 'inq04', reference: 'DMC-1004', name: 'Demo Customer 4',
      phone: '+254 700 000 004', email: '', productId: 'p28',
      productName: 'Samsung Galaxy Watch FE', branch: 'kehancha',
      message: 'Sample inquiry: which strap colours are available, and is the watch compatible with a non-Samsung Android phone?',
      createdAt: '2026-10-20T07:20:00.000Z', status: 'new', demo: true,
    },
  ];

  const SEED_ACTIVITY = [
    { at: '2026-10-19T11:45:00.000Z', action: 'Stock updated', detail: 'Anker 30W USB-C Charger — Sirare set to 11 (demo).' },
    { at: '2026-10-19T10:25:00.000Z', action: 'Stock updated', detail: 'Samsung Galaxy S24 Ultra — Kehancha set to 2 (demo).' },
    { at: '2026-10-18T16:00:00.000Z', action: 'Product edited', detail: 'Samsung Galaxy Watch FE — demonstration price reviewed.' },
    { at: '2026-10-17T09:00:00.000Z', action: 'Catalogue seeded', detail: '38 demonstration products loaded into this browser workspace.' },
  ];

  /* ------------------------------------------------------------------ */
  /* Safe browser storage with in-memory fallback                       */
  /* ------------------------------------------------------------------ */
  const memory = {};
  const storageAvailable = (() => {
    try {
      const testKey = '__daima_test__';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  })();

  function read(key, fallback) {
    try {
      const raw = storageAvailable ? localStorage.getItem(key) : memory[key];
      if (raw == null) {
        if (storageAvailable && Object.prototype.hasOwnProperty.call(memory, key)) {
          return JSON.parse(memory[key]);
        }
        return clone(fallback);
      }
      return JSON.parse(raw);
    } catch (error) {
      console.warn('[Daima] Could not read local demonstration data:', key, error);
      return clone(fallback);
    }
  }

  function has(key) {
    if (storageAvailable) {
      try {
        return localStorage.getItem(key) !== null || Object.prototype.hasOwnProperty.call(memory, key);
      } catch (error) {
        return Object.prototype.hasOwnProperty.call(memory, key);
      }
    }
    return Object.prototype.hasOwnProperty.call(memory, key);
  }

  function write(key, value) {
    const serialized = JSON.stringify(value);
    if (storageAvailable) {
      try {
        localStorage.setItem(key, serialized);
        return true;
      } catch (error) {
        console.warn('[Daima] Could not save local demonstration data:', key, error);
        memory[key] = serialized;
        return false;
      }
    }
    memory[key] = serialized;
    return false;
  }

  /* ------------------------------------------------------------------ */
  /* Store API                                                          */
  /* ------------------------------------------------------------------ */
  const Store = {
    storageAvailable,

    /* Products ------------------------------------------------------- */
    getProducts() {
      if (!has(C.storage.products)) {
        write(C.storage.products, SEED_PRODUCTS);
        return clone(SEED_PRODUCTS);
      }
      const stored = read(C.storage.products, []);
      return Array.isArray(stored) ? stored : [];
    },
    saveProducts(products) {
      return write(C.storage.products, products);
    },
    resetProducts() {
      write(C.storage.products, SEED_PRODUCTS);
      return clone(SEED_PRODUCTS);
    },
    getProduct(id) {
      return this.getProducts().find((item) => item.id === id) || null;
    },
    saveProduct(product) {
      const products = this.getProducts();
      const index = products.findIndex((item) => item.id === product.id);
      if (index >= 0) products[index] = product;
      else products.unshift(product);
      this.saveProducts(products);
      return product;
    },
    deleteProduct(id) {
      const products = this.getProducts().filter((item) => item.id !== id);
      this.saveProducts(products);
      return products;
    },
    nextProductId() {
      const products = this.getProducts();
      const numeric = products
        .map((item) => Number(String(item.id).replace(/\D/g, '')))
        .filter((n) => Number.isFinite(n));
      const next = (numeric.length ? Math.max.apply(null, numeric) : 0) + 1;
      return 'p' + String(next).padStart(2, '0');
    },

    /* Branches ------------------------------------------------------- */
    getBranches() {
      const saved = read(C.storage.branches, null);
      if (!Array.isArray(saved)) return clone(C.branches);
      return C.branches.map((base) => {
        const override = saved.find((item) => item.id === base.id);
        return Object.assign({}, base, override || {});
      });
    },
    saveBranches(branches) {
      return write(C.storage.branches, branches);
    },
    resetBranches() {
      try { localStorage.removeItem(C.storage.branches); } catch (error) { /* ignore */ }
      delete memory[C.storage.branches];
      return this.getBranches();
    },
    getBranch(id) {
      return this.getBranches().find((branch) => branch.id === id) || null;
    },

    /* Settings ------------------------------------------------------- */
    getSettings() {
      return Object.assign({}, C.defaults, read(C.storage.settings, {}));
    },
    saveSettings(settings) {
      return write(C.storage.settings, Object.assign({}, this.getSettings(), settings));
    },
    resetSettings() {
      return write(C.storage.settings, {});
    },

    /* Inquiries ------------------------------------------------------ */
    getInquiries() {
      if (!has(C.storage.inquiries)) {
        write(C.storage.inquiries, SEED_INQUIRIES);
        return clone(SEED_INQUIRIES);
      }
      const stored = read(C.storage.inquiries, []);
      return Array.isArray(stored) ? stored : [];
    },
    saveInquiries(inquiries) {
      return write(C.storage.inquiries, inquiries);
    },
    addInquiry(data) {
      const inquiries = this.getInquiries();
      const highest = inquiries.reduce((max, inquiry) => {
        const numeric = Number(String(inquiry.reference || '').replace(/\D/g, ''));
        return Number.isFinite(numeric) ? Math.max(max, numeric) : max;
      }, 1000);
      const reference = 'DMC-' + String(highest + 1);
      const inquiry = {
        id: 'inq' + Date.now(),
        reference,
        name: data.name || '',
        phone: data.phone || '',
        email: data.email || '',
        productId: data.productId || '',
        productName: data.productName || 'General enquiry',
        branch: data.branch || '',
        message: data.message || '',
        createdAt: new Date().toISOString(),
        status: 'new',
        demo: true,
      };
      inquiries.unshift(inquiry);
      this.saveInquiries(inquiries);
      return inquiry;
    },
    updateInquiry(id, patch) {
      const inquiries = this.getInquiries();
      const index = inquiries.findIndex((item) => item.id === id);
      if (index < 0) return null;
      inquiries[index] = Object.assign({}, inquiries[index], patch);
      this.saveInquiries(inquiries);
      return inquiries[index];
    },
    deleteInquiry(id) {
      const inquiries = this.getInquiries().filter((item) => item.id !== id);
      this.saveInquiries(inquiries);
      return inquiries;
    },
    resetInquiries() {
      write(C.storage.inquiries, SEED_INQUIRIES);
      return clone(SEED_INQUIRIES);
    },

    /* Cart ----------------------------------------------------------- */
    getCart() {
      const cart = read(C.storage.cart, []);
      return Array.isArray(cart) ? cart.filter((line) => line && line.id && Number(line.qty) > 0) : [];
    },
    saveCart(cart) {
      return write(C.storage.cart, cart);
    },
    addToCart(id, qty) {
      const amount = Math.max(1, Number(qty) || 1);
      const cart = this.getCart();
      const line = cart.find((item) => item.id === id);
      if (line) line.qty = Math.min(99, line.qty + amount);
      else cart.push({ id, qty: Math.min(99, amount) });
      this.saveCart(cart);
      return cart;
    },
    updateCartQty(id, qty) {
      const amount = Math.max(0, Math.min(99, Number(qty) || 0));
      let cart = this.getCart();
      if (amount === 0) cart = cart.filter((item) => item.id !== id);
      else {
        const line = cart.find((item) => item.id === id);
        if (line) line.qty = amount;
      }
      this.saveCart(cart);
      return cart;
    },
    removeFromCart(id) {
      const cart = this.getCart().filter((item) => item.id !== id);
      this.saveCart(cart);
      return cart;
    },
    clearCart() {
      this.saveCart([]);
      return [];
    },

    /* Wishlist ------------------------------------------------------- */
    getWishlist() {
      const list = read(C.storage.wishlist, []);
      return Array.isArray(list) ? list : [];
    },
    toggleWishlist(id) {
      const list = this.getWishlist();
      const index = list.indexOf(id);
      if (index >= 0) list.splice(index, 1);
      else list.push(id);
      write(C.storage.wishlist, list);
      return list;
    },
    isWishlisted(id) {
      return this.getWishlist().includes(id);
    },

    /* Activity feed -------------------------------------------------- */
    getActivity() {
      if (!has(C.storage.activity)) {
        write(C.storage.activity, SEED_ACTIVITY);
        return clone(SEED_ACTIVITY);
      }
      const activity = read(C.storage.activity, []);
      return Array.isArray(activity) ? activity : [];
    },
    logActivity(action, detail) {
      const feed = this.getActivity();
      feed.unshift({ at: nowISO(), action, detail });
      write(C.storage.activity, feed.slice(0, 40));
    },

    /* Utility -------------------------------------------------------- */
    resetAll() {
      Object.keys(C.storage).forEach((key) => {
        try { localStorage.removeItem(C.storage[key]); } catch (error) { /* ignore */ }
        delete memory[C.storage[key]];
      });
      return true;
    },
  };

  /* ------------------------------------------------------------------ */
  /* Formatting & lookup helpers                                        */
  /* ------------------------------------------------------------------ */
  const Helpers = {
    formatPrice(value) {
      const number = Number(value);
      if (!Number.isFinite(number)) return C.currency.symbol + ' 0';
      const settings = Store.getSettings();
      const symbol = settings.currencySymbol || C.currency.symbol;
      return symbol + ' ' + number.toLocaleString('en-KE', { maximumFractionDigits: 0 });
    },
    formatDate(value, opts) {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return '—';
      return date.toLocaleDateString('en-KE', opts || { day: '2-digit', month: 'short', year: 'numeric' });
    },
    formatDateTime(value) {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return '—';
      return date.toLocaleString('en-KE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    },
    category(id) {
      return C.categories.find((item) => item.id === id) || { id, name: id, short: id };
    },
    branch(id) {
      return Store.getBranches().find((item) => item.id === id) || null;
    },
    totalStock(product) {
      return Number(product.stock && product.stock.sirare || 0) + Number(product.stock && product.stock.kehancha || 0);
    },
    stockStatus(product, threshold) {
      const limit = Number(threshold || Store.getSettings().lowStockThreshold || 5);
      const total = Helpers.totalStock(product);
      if (total <= 0) return { key: 'out', label: 'Out of demo stock', tone: 'danger' };
      if (total <= limit) return { key: 'low', label: 'Low demo stock', tone: 'warning' };
      return { key: 'in', label: 'Demo stock available', tone: 'success' };
    },
    digits(value) {
      return String(value || '').replace(/[^\d]/g, '');
    },
    whatsAppNumber() {
      const settings = Store.getSettings();
      const raw = settings.whatsappNumber || C.whatsapp.number || '';
      const digits = Helpers.digits(raw);
      return digits.length >= 9 && digits.length <= 15 ? digits : '';
    },
    whatsAppConfigured() {
      return Boolean(Helpers.whatsAppNumber());
    },
    whatsAppLink(message) {
      const number = Helpers.whatsAppNumber();
      if (!number) return '';
      const text = message || C.whatsapp.defaultMessage;
      return 'https://wa.me/' + number + '?text=' + encodeURIComponent(text);
    },
    phoneHref(number) {
      const digits = Helpers.digits(number);
      return digits ? 'tel:+' + digits.replace(/^0+/, '254') : '';
    },
    escape(value) {
      return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    },
    param(name) {
      return new URLSearchParams(window.location.search).get(name);
    },
    availabilityLabel() {
      return C.demo.availabilityNotice;
    },
    catalogValue(products) {
      return products.reduce((sum, product) => sum + Number(product.price || 0) * Helpers.totalStock(product), 0);
    },
    lowStockProducts(products) {
      const threshold = Store.getSettings().lowStockThreshold || 5;
      return products.filter((product) => {
        const total = Helpers.totalStock(product);
        return total > 0 && total <= threshold;
      });
    },
    // Build a natural, clearly-labelled WhatsApp inquiry message.
    buildInquiryMessage({ product, branchId, customerName, message, items }) {
      const lines = ['Hello Daima Communications,', ''];
      if (items && items.length) {
        lines.push('I would like to enquire about these demonstration-catalogue items:');
        items.forEach((item) => {
          lines.push(`• ${item.product.name}${item.product.model ? ' (' + item.product.model + ')' : ''} — qty ${item.qty} — ${Helpers.formatPrice(item.product.price)} each (demo price)`);
        });
        lines.push('');
      } else if (product) {
        lines.push(`I am interested in: ${product.name}${product.model ? ' (' + product.model + ')' : ''}.`);
        lines.push(`Displayed demonstration price: ${Helpers.formatPrice(product.price)}.`);
        lines.push('');
      }
      if (branchId) {
        const branch = Helpers.branch(branchId);
        lines.push(`Preferred branch: ${branch ? branch.name : branchId}.`);
      }
      if (customerName) lines.push(`My name: ${customerName}.`);
      if (message) lines.push('', message);
      lines.push('', 'Please confirm the current price, exact model and availability. Thank you.');
      return lines.join('\n');
    },
  };

  DAIMA.SEED_PRODUCTS = clone(SEED_PRODUCTS);
  DAIMA.SEED_INQUIRIES = clone(SEED_INQUIRIES);
  DAIMA.Store = Store;
  DAIMA.H = Helpers;
})();
