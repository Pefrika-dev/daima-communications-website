/* ==========================================================================
   DAIMA COMMUNICATIONS — SHARED INTERFACE COMPONENTS
   Header, navigation, search, cart drawer, wishlist, footer, dialogs, toasts.
   Loaded on every public page after config.js and data.js.
   ========================================================================== */

(function () {
  'use strict';

  const C = DAIMA.CONFIG;
  const H = DAIMA.H;
  const Store = DAIMA.Store;

  /* ------------------------------------------------------------------ */
  /* Icons                                                              */
  /* ------------------------------------------------------------------ */
  const ICONS = {
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    cart: '<path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.5 3C19.5 15.4 12 20 12 20Z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
    pin: '<path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"/><circle cx="12" cy="10" r="2.2"/>',
    phone: '<path d="M7 3h3l1.5 4-2 1.5a13 13 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 5 5.2 2 2 0 0 1 7 3Z"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    whatsapp: '<path d="M20 11.7a7.8 7.8 0 0 1-11.5 6.9L4 20l1.4-4.3A7.8 7.8 0 1 1 20 11.7Z"/><path d="M9.2 8.4c.3-.6.6-.6.9-.6h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.2.2-.3.4-.1.7a6.6 6.6 0 0 0 2.4 2.2c.3.2.5.1.7-.1l.6-.7c.2-.2.4-.3.6-.2l1.6.7c.3.1.5.2.5.4a2 2 0 0 1-1.4 1.9 3.7 3.7 0 0 1-2.4-.3 10.5 10.5 0 0 1-4.5-4 4 4 0 0 1-.6-2.4Z"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
    chevron: '<path d="m7 10 5 5 5-5"/>',
    sliders: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
    shield: '<path d="M12 3 5 6v5c0 5 3.4 8 7 10 3.6-2 7-5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
    store: '<path d="M4 9h16M5 9l1-5h12l1 5M6 9v11h12V9M10 20v-6h4v6"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
    bag: '<path d="M5 8h14l-1.2 12H6.2L5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5"/>',
    edit: '<path d="m4 20 4-1 11-11-3-3L5 16l-1 4Z"/><path d="m14 6 3 3"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
    dashboard: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
    box: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',
    chart: '<path d="M4 20V5M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6M20 16v-2"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.3 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.4 2.1a7 7 0 0 0-1.7 1l-2.3-1-2 3.4L5 10a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 1.7 1l.4 2.1h5l.4-2.1a7 7 0 0 0 1.7-1l2.3 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20v-1.5C3 16 5.7 14 9 14s6 2 6 4.5V20M16 4.5a3 3 0 0 1 0 6M17 14c2.4.4 4 2.2 4 4.5V20"/>',
    logout: '<path d="M10 5H5v14h5M14 8l4 4-4 4M8 12h10"/>',
    bell: '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 20h4"/>',
    download: '<path d="M12 4v11M7 11l5 4 5-4M4 20h16"/>',
    refresh: '<path d="M4 11a8 8 0 0 1 14-4l2 2M20 5v4h-4M20 13a8 8 0 0 1-14 4l-2-2M4 19v-4h4"/>',
    external: '<path d="M14 4h6v6M20 4 10 14M18 14v5H5V6h5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  };

  function icon(name, size) {
    const path = ICONS[name] || ICONS.spark;
    const s = size || 20;
    return `<svg class="icon" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  }

  const esc = H.escape;

  /* ------------------------------------------------------------------ */
  /* Header                                                             */
  /* ------------------------------------------------------------------ */
  function activeNav() {
    const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const view = params.get('view');
    return C.nav.map((item) => {
      let active = false;
      if (item.href === 'index.html' && page === 'index.html') active = true;
      if (item.href.startsWith('products.html')) {
        if (page === 'products.html') {
          if (item.href.includes('category=smartphones')) active = category === 'smartphones';
          else if (item.href.includes('category=other-electronics')) active = category === 'other-electronics';
          else if (item.href.includes('view=accessories')) active = view === 'accessories';
        }
      }
      if (item.href === 'branches.html' && page === 'branches.html') active = true;
      if (item.href.endsWith('#contact') && page === 'index.html' && location.hash === '#contact') active = true;
      return Object.assign({}, item, { active });
    });
  }

  function buildHeader() {
    const settings = Store.getSettings();
    const businessName = settings.businessName || C.business.name;
    const navItems = activeNav();
    const configured = H.whatsAppConfigured();

    return `
    <a class="skip-link" href="#main">Skip to main content</a>
    <div class="announcement" role="region" aria-label="Announcement">
      <div class="container announcement-inner">
        <p><span class="announcement-dot" aria-hidden="true"></span>${esc(C.business.tagline)}</p>
        <a class="announcement-link" href="products.html">Explore the catalogue ${icon('arrow', 14)}</a>
        <span class="announcement-meta">Independent website concept · demonstration catalogue</span>
      </div>
    </div>
    <header class="site-header" id="site-header">
      <div class="container header-inner">
        <a class="brand" href="index.html">
          <span class="sr-only">${esc(businessName)} — home</span>
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="38" height="38" fill="none">
              <rect width="40" height="40" rx="11" fill="currentColor"/>
              <path d="M11 28V12h8.7c5.5 0 9.3 3.2 9.3 8s-3.8 8-9.3 8H11Zm5.4-4.5h3.1c2.7 0 4.4-1.4 4.4-3.5s-1.7-3.5-4.4-3.5h-3.1v7Z" fill="#fff"/>
              <circle cx="31.4" cy="10.8" r="1.8" fill="#6fe8ff"/>
            </svg>
          </span>
          <span class="brand-word">
            <span class="brand-name">DAIMA</span>
            <span class="brand-sub">COMMUNICATIONS</span>
          </span>
        </a>

        <nav class="primary-nav" aria-label="Primary navigation">
          ${navItems
            .map(
              (item) =>
                `<a href="${item.href}" class="nav-link${item.active ? ' is-active' : ''}"${item.active ? ' aria-current="page"' : ''}>${esc(item.label)}</a>`
            )
            .join('')}
        </nav>

        <div class="header-actions">
          <span class="demo-pill" title="This interface uses demonstration data">Demo</span>
          <button class="icon-btn" type="button" data-open-search aria-label="Search products">
            ${icon('search', 20)}
          </button>
          <button class="icon-btn wishlist-btn" type="button" data-open-wishlist aria-label="Open wishlist">
            ${icon('heart', 20)}
            <span class="badge" data-wishlist-count hidden>0</span>
          </button>
          <button class="icon-btn cart-btn" type="button" data-open-cart aria-label="Open shopping cart">
            ${icon('bag', 20)}
            <span class="badge" data-cart-count hidden>0</span>
          </button>
          <a class="btn btn-primary btn-sm header-cta" href="products.html">Explore Products ${icon('arrow', 15)}</a>
          <button class="icon-btn menu-btn" type="button" data-open-menu aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
            ${icon('menu', 22)}
          </button>
        </div>
      </div>
      <div class="scroll-progress" aria-hidden="true"></div>
    </header>

    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <div class="mobile-menu-backdrop" data-close-menu></div>
      <div class="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div class="mobile-menu-head">
          <a class="brand" href="index.html">
            <span class="sr-only">${esc(businessName)} — home</span>
            <span class="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 40 40" width="34" height="34" fill="none"><rect width="40" height="40" rx="11" fill="currentColor"/><path d="M11 28V12h8.7c5.5 0 9.3 3.2 9.3 8s-3.8 8-9.3 8H11Zm5.4-4.5h3.1c2.7 0 4.4-1.4 4.4-3.5s-1.7-3.5-4.4-3.5h-3.1v7Z" fill="#fff"/><circle cx="31.4" cy="10.8" r="1.8" fill="#6fe8ff"/></svg>
            </span>
            <span class="brand-word"><span class="brand-name">DAIMA</span><span class="brand-sub">COMMUNICATIONS</span></span>
          </a>
          <button class="icon-btn" type="button" data-close-menu aria-label="Close menu">${icon('close', 22)}</button>
        </div>
        <button class="mobile-search" type="button" data-open-search>
          ${icon('search', 18)}<span>Search the catalogue</span>
        </button>
        <nav class="mobile-nav" aria-label="Mobile navigation">
          ${navItems
            .map(
              (item) =>
                `<a href="${item.href}" class="${item.active ? 'is-active' : ''}"${item.active ? ' aria-current="page"' : ''}>${esc(item.label)}${icon('arrow', 16)}</a>`
            )
            .join('')}
        </nav>
        <div class="mobile-menu-feature">
          <span class="eyebrow">Two locations</span>
          <p>Sirare &amp; Kehancha<br><span>Migori County, Kenya</span></p>
          <a class="text-link" href="branches.html">View branch details ${icon('arrow', 14)}</a>
        </div>
        <div class="mobile-menu-foot">
          <a class="btn btn-primary btn-block" href="products.html">Explore Products ${icon('arrow', 16)}</a>
          <p>${configured ? 'WhatsApp enquiries available' : 'WhatsApp number to be configured'}</p>
        </div>
      </div>
    </div>

    <dialog class="search-dialog" id="search-dialog" aria-labelledby="search-title">
      <form class="search-panel" method="get" action="products.html" role="search">
        <div class="search-head">
          <span class="search-icon">${icon('search', 22)}</span>
          <label for="global-search" id="search-title">Search the demonstration catalogue</label>
          <button class="icon-btn" type="button" data-close-dialog aria-label="Close search">${icon('close', 20)}</button>
        </div>
        <input id="global-search" name="q" type="search" placeholder="Search phones, audio, chargers…" autocomplete="off" />
        <div class="search-foot">
          <span class="muted-sm">Try a product, brand or category</span>
          <button class="btn btn-primary" type="submit">Search ${icon('arrow', 16)}</button>
        </div>
        <div class="search-suggestions">
          <span class="eyebrow">Popular categories</span>
          <div class="chip-row">
            ${C.categories.slice(0, 6).map((cat) => `<a class="chip" href="products.html?category=${encodeURIComponent(cat.id)}">${esc(cat.name)}</a>`).join('')}
          </div>
        </div>
      </form>
    </dialog>

    <dialog class="sheet cart-sheet" id="cart-drawer" aria-labelledby="cart-title">
      <div class="sheet-head">
        <div>
          <span class="eyebrow">Demonstration cart</span>
          <h2 id="cart-title">Your selections</h2>
        </div>
        <button class="icon-btn" type="button" data-close-dialog aria-label="Close cart">${icon('close', 20)}</button>
      </div>
      <div class="sheet-body" data-cart-body></div>
      <div class="sheet-foot" data-cart-foot hidden>
        <div class="sheet-total"><span>Cart subtotal</span><strong data-cart-subtotal>KSh 0</strong></div>
        <p class="micro-note">Demonstration only. No payment is taken online.</p>
        <a class="btn btn-primary btn-block" href="cart.html">Review cart &amp; request availability ${icon('arrow', 16)}</a>
        <button class="btn btn-ghost btn-block" type="button" data-close-dialog>Continue browsing</button>
      </div>
    </dialog>

    <dialog class="sheet wishlist-sheet" id="wishlist-drawer" aria-labelledby="wishlist-title">
      <div class="sheet-head">
        <div>
          <span class="eyebrow">Saved for later</span>
          <h2 id="wishlist-title">Wishlist</h2>
        </div>
        <button class="icon-btn" type="button" data-close-dialog aria-label="Close wishlist">${icon('close', 20)}</button>
      </div>
      <div class="sheet-body" data-wishlist-body></div>
      <div class="sheet-foot">
        <p class="micro-note">Saved locally in this browser. No account required.</p>
        <a class="btn btn-ghost btn-block" href="products.html">Continue browsing</a>
      </div>
    </dialog>

    <dialog class="privacy-dialog" id="privacy-dialog" aria-labelledby="privacy-title">
      <div class="dialog-head">
        <div><span class="eyebrow">Transparency</span><h2 id="privacy-title">Privacy &amp; demonstration notice</h2></div>
        <button class="icon-btn" type="button" data-close-dialog aria-label="Close privacy notice">${icon('close', 20)}</button>
      </div>
      <div class="dialog-body prose">
        <p><strong>This is an independent website proposal.</strong> It is not the live Daima Communications website and has not been approved, endorsed or adopted by the business.</p>
        <p>Cart items, wishlist selections, catalogue edits and demonstration inquiries are stored only in your browser's <code>localStorage</code>. They are not sent to a server and are not visible to Daima Communications.</p>
        <p>The contact form is a front-end demonstration. When no backend is connected, no message is delivered. If you continue through WhatsApp after a verified number is configured, WhatsApp's own privacy terms apply.</p>
        <p>No payment is processed and no card details are collected anywhere in this demonstration. Product images are original illustrative renders, not photographs of Daima stock or premises.</p>
        <p>Production deployment requires a secure backend, server-side authentication and authorization, validated data storage, rate limiting, audit logging and backups. See the README for the full list.</p>
      </div>
      <div class="dialog-foot">
        <button class="btn btn-primary" type="button" data-close-dialog>Understood</button>
      </div>
    </dialog>

    <div class="toast-region" role="status" aria-live="polite" aria-atomic="false"></div>
    <div class="image-fallback" hidden></div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Footer                                                             */
  /* ------------------------------------------------------------------ */
  function buildFooter() {
    const settings = Store.getSettings();
    const branches = Store.getBranches().filter((branch) => branch.active !== false);
    const configured = H.whatsAppConfigured();
    const year = new Date().getFullYear();
    const businessName = settings.businessName || C.business.name;

    return `
    <footer class="site-footer">
      <div class="container footer-top">
        <div class="footer-brand">
          <a class="brand brand--footer" href="index.html">
            <span class="sr-only">${esc(businessName)} — home</span>
            <span class="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 40 40" width="38" height="38" fill="none"><rect width="40" height="40" rx="11" fill="currentColor"/><path d="M11 28V12h8.7c5.5 0 9.3 3.2 9.3 8s-3.8 8-9.3 8H11Zm5.4-4.5h3.1c2.7 0 4.4-1.4 4.4-3.5s-1.7-3.5-4.4-3.5h-3.1v7Z" fill="#fff"/><circle cx="31.4" cy="10.8" r="1.8" fill="#6fe8ff"/></svg>
            </span>
            <span class="brand-word"><span class="brand-name">DAIMA</span><span class="brand-sub">COMMUNICATIONS</span></span>
          </a>
          <p class="footer-desc">Smartphones, accessories and everyday technology for customers in Sirare, Kehancha and surrounding communities.</p>
          <div class="footer-locations">
            ${branches.map((branch) => `<a href="branches.html#${branch.id}">${icon('pin', 14)} ${esc(branch.locationShort || branch.name)}</a>`).join('')}
          </div>
        </div>
        <div class="footer-col">
          <h3>Shop catalogue</h3>
          <ul>
            ${C.categories.slice(0, 6).map((cat) => `<li><a href="products.html?category=${encodeURIComponent(cat.id)}">${esc(cat.name)}</a></li>`).join('')}
            <li><a href="products.html">View all products</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>Our branches</h3>
          <ul>
            ${branches.map((branch) => `
              <li><a href="branches.html#${branch.id}">${esc(branch.fullName || branch.name)}</a></li>
            `).join('')}
            <li><a href="branches.html">Branch information</a></li>
          </ul>
          <h3 class="footer-subhead">Help</h3>
          <ul>
            <li><a href="index.html#faq">Frequently asked questions</a></li>
            <li><a href="index.html#contact">Contact the team</a></li>
            <li><a href="cart.html">Cart &amp; inquiries</a></li>
          </ul>
        </div>
        <div class="footer-col footer-contact">
          <h3>Contact</h3>
          <ul class="contact-list">
            <li>${icon('store', 16)}<span>${esc(businessName)}<br><span class="muted-sm">${esc(C.business.region)}</span></span></li>
            <li>${icon('phone', 16)}<span>${esc(C.contact.phoneDisplay)}</span></li>
            <li>${icon('mail', 16)}<span>${esc(C.contact.emailDisplay)}</span></li>
          </ul>
          <div class="footer-wa">
            ${configured
              ? `<a class="btn btn-whatsapp btn-sm" href="${esc(H.whatsAppLink(C.whatsapp.defaultMessage))}" target="_blank" rel="noopener noreferrer">${icon('whatsapp', 16)} WhatsApp us</a>`
              : `<span class="config-flag">${icon('whatsapp', 15)} WhatsApp number to be configured</span>`}
          </div>
          <p class="footer-micro">Social links will be added only after official accounts are verified.</p>
        </div>
      </div>

      <div class="container footer-note">
        <p><strong>Demonstration notice:</strong> This is an independent website concept prepared as a proposal. It is not an operational Daima Communications platform. Products, prices and stock figures are illustrative sample data. Please confirm all details directly with the business.</p>
        <p>${esc(C.developer.note)}</p>
      </div>

      <div class="container footer-bottom">
        <p>© ${year} DAIMA COMMUNICATIONS concept. All product names and brands are the property of their respective owners.</p>
        <div class="footer-legal">
          <button class="link-button" type="button" data-open-privacy>Privacy &amp; demo notice</button>
          <span aria-hidden="true">·</span>
          <a href="README.md">Project documentation</a>
        </div>
      </div>
      <div class="container developer-credit">
        <span class="credit-rule" aria-hidden="true"></span>
        <p>Website Concept Designed &amp; Developed by <strong>Thomas Hondo Chacha</strong> — Software Engineer.</p>
        <span class="credit-rule" aria-hidden="true"></span>
      </div>
    </footer>`;
  }

  /* ------------------------------------------------------------------ */
  /* Cart / wishlist rendering                                          */
  /* ------------------------------------------------------------------ */
  function cartData() {
    return Store.getCart()
      .map((line) => ({ line, product: Store.getProduct(line.id) }))
      .filter((item) => item.product);
  }

  function cartTotals(items) {
    return items.reduce(
      (acc, item) => {
        acc.qty += item.line.qty;
        acc.subtotal += Number(item.product.price) * item.line.qty;
        return acc;
      },
      { qty: 0, subtotal: 0 }
    );
  }

  function cartItemMarkup(item, compact) {
    const p = item.product;
    return `
      <div class="cart-line" data-line-id="${esc(p.id)}">
        <a class="cart-line-img" href="product.html?id=${encodeURIComponent(p.id)}" aria-label="View ${esc(p.name)}">
          <img src="${esc(p.image)}" alt="${esc(p.name)} — illustrative render" width="96" height="96" loading="lazy" />
        </a>
        <div class="cart-line-main">
          <div class="cart-line-top">
            <div>
              <span class="cart-line-brand">${esc(p.brand)}</span>
              <a class="cart-line-name" href="product.html?id=${encodeURIComponent(p.id)}">${esc(p.name)}</a>
            </div>
            <button class="icon-btn icon-btn-sm" type="button" data-remove-line="${esc(p.id)}" aria-label="Remove ${esc(p.name)} from cart">${icon('trash', 16)}</button>
          </div>
          <div class="cart-line-bottom">
            <div class="qty-stepper" aria-label="Quantity for ${esc(p.name)}">
              <button type="button" data-qty-down="${esc(p.id)}" aria-label="Decrease quantity">${icon('minus', 14)}</button>
              <span aria-live="polite">${item.line.qty}</span>
              <button type="button" data-qty-up="${esc(p.id)}" aria-label="Increase quantity">${icon('plus', 14)}</button>
            </div>
            <strong class="cart-line-price">${esc(H.formatPrice(Number(p.price) * item.line.qty))}</strong>
          </div>
          ${compact ? '' : '<span class="micro-note">Demo price · availability to confirm</span>'}
        </div>
      </div>`;
  }

  function renderCart() {
    const items = cartData();
    const totals = cartTotals(items);
    const body = document.querySelector('[data-cart-body]');
    const foot = document.querySelector('[data-cart-foot]');
    if (!body) return;

    if (!items.length) {
      body.innerHTML = `
        <div class="empty-state empty-state--drawer">
          <span class="empty-icon">${icon('bag', 28)}</span>
          <h3>Your demo cart is empty</h3>
          <p>Add products you would like to ask about. Nothing is purchased or paid for online.</p>
          <a class="btn btn-primary" href="products.html" data-close-dialog>Browse products ${icon('arrow', 16)}</a>
        </div>`;
      if (foot) foot.hidden = true;
    } else {
      body.innerHTML = `<div class="cart-lines">${items.map((item) => cartItemMarkup(item, true)).join('')}</div>`;
      if (foot) {
        foot.hidden = false;
        const subtotal = foot.querySelector('[data-cart-subtotal]');
        if (subtotal) subtotal.textContent = H.formatPrice(totals.subtotal);
      }
    }
    updateCounts();
  }

  function renderWishlist() {
    const body = document.querySelector('[data-wishlist-body]');
    if (!body) return;
    const ids = Store.getWishlist();
    const products = ids.map((id) => Store.getProduct(id)).filter(Boolean);
    if (!products.length) {
      body.innerHTML = `
        <div class="empty-state empty-state--drawer">
          <span class="empty-icon">${icon('heart', 28)}</span>
          <h3>No saved products yet</h3>
          <p>Tap the heart on any product to keep it here for later. Saved items stay in this browser.</p>
          <a class="btn btn-primary" href="products.html" data-close-dialog>Discover products ${icon('arrow', 16)}</a>
        </div>`;
      updateCounts();
      return;
    }
    body.innerHTML = `<div class="wishlist-lines">${products
      .map(
        (p) => `
        <div class="wishlist-line">
          <a class="wishlist-img" href="product.html?id=${encodeURIComponent(p.id)}">
            <img src="${esc(p.image)}" alt="${esc(p.name)} — illustrative render" width="80" height="80" loading="lazy" />
          </a>
          <div class="wishlist-main">
            <a href="product.html?id=${encodeURIComponent(p.id)}" class="wishlist-name">${esc(p.name)}</a>
            <span class="wishlist-price">${esc(H.formatPrice(p.price))} <span class="muted-sm">demo</span></span>
            <div class="wishlist-actions">
              <button class="btn btn-ghost btn-xs" type="button" data-add-to-cart="${esc(p.id)}">${icon('bag', 14)} Add to cart</button>
              <button class="icon-btn icon-btn-sm" type="button" data-wishlist="${esc(p.id)}" aria-label="Remove ${esc(p.name)} from wishlist">${icon('trash', 15)}</button>
            </div>
          </div>
        </div>`
      )
      .join('')}</div>`;
    updateCounts();
  }

  function updateCounts() {
    const cart = Store.getCart();
    const cartCount = cart.reduce((sum, line) => sum + Number(line.qty || 0), 0);
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = String(cartCount);
      el.hidden = cartCount === 0;
      const btn = el.closest('[data-open-cart]');
      if (btn) {
        btn.setAttribute(
          'aria-label',
          cartCount === 0 ? 'Open shopping cart' : `Open shopping cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`
        );
      }
    });
    const wishCount = Store.getWishlist().length;
    document.querySelectorAll('[data-wishlist-count]').forEach((el) => {
      el.textContent = String(wishCount);
      el.hidden = wishCount === 0;
      const btn = el.closest('[data-open-wishlist]');
      if (btn) {
        btn.setAttribute(
          'aria-label',
          wishCount === 0 ? 'Open wishlist' : `Open wishlist, ${wishCount} ${wishCount === 1 ? 'item' : 'items'}`
        );
      }
    });
    document.querySelectorAll('[data-wishlist]').forEach((btn) => {
      const id = btn.getAttribute('data-wishlist');
      const active = Store.isWishlisted(id);
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  /* ------------------------------------------------------------------ */
  /* Dialogs and menu                                                   */
  /* ------------------------------------------------------------------ */
  function openDialog(id) {
    const dialog = document.getElementById(id);
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    document.documentElement.classList.add('has-dialog');
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    if (!document.querySelector('dialog[open]')) document.documentElement.classList.remove('has-dialog');
  }

  function openMenu() {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    const toggle = document.querySelector('[data-open-menu]');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    const close = menu.querySelector('[data-close-menu]');
    if (close) setTimeout(() => close.focus(), 60);
  }

  function closeMenu() {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    const toggle = document.querySelector('[data-open-menu]');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  }

  /* ------------------------------------------------------------------ */
  /* Toasts                                                             */
  /* ------------------------------------------------------------------ */
  let toastCounter = 0;
  function toast(message, type) {
    const region = document.querySelector('.toast-region');
    if (!region) return;
    const id = 'toast-' + ++toastCounter;
    const el = document.createElement('div');
    el.className = 'toast toast--' + (type || 'default');
    el.id = id;
    el.innerHTML = `
      <span class="toast-icon">${icon(type === 'error' ? 'close' : type === 'info' ? 'spark' : 'check', 16)}</span>
      <p>${esc(message)}</p>
      <button class="toast-close" type="button" aria-label="Dismiss notification">${icon('close', 14)}</button>`;
    region.appendChild(el);
    el.querySelector('.toast-close').addEventListener('click', () => el.remove());
    setTimeout(() => {
      el.classList.add('is-leaving');
      setTimeout(() => el.remove(), 300);
    }, 4200);
  }

  /* ------------------------------------------------------------------ */
  /* Cart / wishlist actions                                            */
  /* ------------------------------------------------------------------ */
  function addToCart(id, qty, options) {
    const product = Store.getProduct(id);
    if (!product) {
      toast('That demonstration product could not be found.', 'error');
      return false;
    }
    Store.addToCart(id, qty || 1);
    updateCounts();
    renderCart();
    if (!options || options.open !== false) openDialog('cart-drawer');
    toast(`${product.name} added to your demo cart.`);
    document.dispatchEvent(new CustomEvent('daima:cart-change'));
    return true;
  }

  function toggleWishlist(id) {
    const product = Store.getProduct(id);
    const nowSaved = !Store.isWishlisted(id);
    Store.toggleWishlist(id);
    updateCounts();
    renderWishlist();
    toast(nowSaved ? `${product ? product.name : 'Product'} saved to your wishlist.` : 'Removed from wishlist.');
    document.dispatchEvent(new CustomEvent('daima:wishlist-change'));
    return nowSaved;
  }

  function whatsApp(product, branchId) {
    if (!H.whatsAppConfigured()) {
      toast('WhatsApp is not configured yet. Add a verified business number in js/config.js or Settings.', 'info');
      return false;
    }
    const message = H.buildInquiryMessage({ product, branchId });
    window.open(H.whatsAppLink(message), '_blank', 'noopener,noreferrer');
    return true;
  }

  /* ------------------------------------------------------------------ */
  /* Global bindings                                                    */
  /* ------------------------------------------------------------------ */
  function bindEvents() {
    document.addEventListener('click', (event) => {
      const openSearch = event.target.closest('[data-open-search]');
      if (openSearch) {
        event.preventDefault();
        closeMenu();
        openDialog('search-dialog');
        const input = document.getElementById('global-search');
        if (input) setTimeout(() => input.focus(), 80);
        return;
      }
      if (event.target.closest('[data-open-cart]')) {
        event.preventDefault();
        renderCart();
        openDialog('cart-drawer');
        return;
      }
      if (event.target.closest('[data-open-wishlist]')) {
        event.preventDefault();
        renderWishlist();
        openDialog('wishlist-drawer');
        return;
      }
      if (event.target.closest('[data-open-privacy]')) {
        event.preventDefault();
        openDialog('privacy-dialog');
        return;
      }
      if (event.target.closest('[data-open-menu]')) {
        event.preventDefault();
        openMenu();
        return;
      }
      if (event.target.closest('[data-close-menu]')) {
        event.preventDefault();
        closeMenu();
        return;
      }
      const closer = event.target.closest('[data-close-dialog]');
      if (closer) {
        const dialog = closer.closest('dialog');
        closeDialog(dialog);
        return;
      }
      const addBtn = event.target.closest('[data-add-to-cart]');
      if (addBtn) {
        event.preventDefault();
        const qtyInput = addBtn.getAttribute('data-qty-source')
          ? document.querySelector(addBtn.getAttribute('data-qty-source'))
          : null;
        const qty = qtyInput ? Number(qtyInput.value) : Number(addBtn.getAttribute('data-qty') || 1);
        addToCart(addBtn.getAttribute('data-add-to-cart'), qty, { open: addBtn.getAttribute('data-open') !== 'false' });
        return;
      }
      const qtyUp = event.target.closest('[data-qty-up]');
      if (qtyUp) {
        event.preventDefault();
        const id = qtyUp.getAttribute('data-qty-up');
        const line = Store.getCart().find((item) => item.id === id);
        Store.updateCartQty(id, line ? line.qty + 1 : 1);
        renderCart();
        if (document.body.dataset.page === 'cart') document.dispatchEvent(new CustomEvent('daima:cart-change'));
        return;
      }
      const qtyDown = event.target.closest('[data-qty-down]');
      if (qtyDown) {
        event.preventDefault();
        const id = qtyDown.getAttribute('data-qty-down');
        const line = Store.getCart().find((item) => item.id === id);
        Store.updateCartQty(id, line ? line.qty - 1 : 0);
        renderCart();
        if (document.body.dataset.page === 'cart') document.dispatchEvent(new CustomEvent('daima:cart-change'));
        return;
      }
      const removeLine = event.target.closest('[data-remove-line]');
      if (removeLine) {
        event.preventDefault();
        Store.removeFromCart(removeLine.getAttribute('data-remove-line'));
        renderCart();
        toast('Removed from your demo cart.', 'info');
        if (document.body.dataset.page === 'cart') document.dispatchEvent(new CustomEvent('daima:cart-change'));
        return;
      }
      const wishBtn = event.target.closest('[data-wishlist]');
      if (wishBtn) {
        event.preventDefault();
        toggleWishlist(wishBtn.getAttribute('data-wishlist'));
        return;
      }
      const waBtn = event.target.closest('[data-wa-product]');
      if (waBtn) {
        event.preventDefault();
        const id = waBtn.getAttribute('data-wa-product');
        const product = Store.getProduct(id);
        const branch = waBtn.getAttribute('data-wa-branch') || '';
        whatsApp(product, branch);
      }
    });

    // Close dialogs when clicking the backdrop.
    document.querySelectorAll('dialog').forEach((dialog) => {
      dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
          const rect = dialog.getBoundingClientRect();
          const inDialog =
            event.clientX >= rect.left && event.clientX <= rect.right &&
            event.clientY >= rect.top && event.clientY <= rect.bottom;
          if (!inDialog) closeDialog(dialog);
        }
      });
      dialog.addEventListener('close', () => {
        if (!document.querySelector('dialog[open]')) document.documentElement.classList.remove('has-dialog');
        if (dialog.id === 'mobile-menu') closeMenu();
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const menu = document.getElementById('mobile-menu');
        if (menu && menu.classList.contains('is-open')) closeMenu();
      }
    });

    // Sticky header treatment + reading progress.
    const header = document.getElementById('site-header');
    const progress = document.querySelector('.scroll-progress');
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
        if (progress) {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          const value = max > 0 ? Math.min(1, window.scrollY / max) : 0;
          progress.style.transform = `scaleX(${value})`;
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Dismiss mobile menu on navigation.
    document.querySelectorAll('.mobile-menu a').forEach((link) => link.addEventListener('click', closeMenu));

    // Image fallback for any product image that fails.
    document.addEventListener(
      'error',
      (event) => {
        const img = event.target;
        if (!(img instanceof HTMLImageElement)) return;
        if (img.dataset.fallbackApplied) return;
        img.dataset.fallbackApplied = 'true';
        img.classList.add('is-fallback');
        img.src = 'assets/images/fallback.svg';
        img.alt = 'Product image unavailable — illustrative placeholder';
      },
      true
    );

    window.addEventListener('storage', (event) => {
      if (!event.key) return;
      if (event.key === DAIMA.CONFIG.storage.cart) {
        renderCart();
        updateCounts();
      }
      if (event.key === DAIMA.CONFIG.storage.wishlist) {
        renderWishlist();
        updateCounts();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Initialisation                                                     */
  /* ------------------------------------------------------------------ */
  function init() {
    const headerSlot = document.getElementById('site-header-root');
    const footerSlot = document.getElementById('site-footer-root');
    if (headerSlot) headerSlot.innerHTML = buildHeader();
    if (footerSlot) footerSlot.innerHTML = buildFooter();

    bindEvents();
    renderCart();
    renderWishlist();
    updateCounts();

    // Sync config-driven page strings where marked.
    document.querySelectorAll('[data-business-name]').forEach((el) => {
      el.textContent = Store.getSettings().businessName || C.business.name;
    });
    document.querySelectorAll('[data-current-year]').forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  window.DAIMA.UI = {
    icon,
    init,
    toast,
    openDialog,
    closeDialog,
    addToCart,
    toggleWishlist,
    renderCart,
    renderWishlist,
    updateCounts,
    whatsApp,
    updateCartCounts: updateCounts,
    cartData,
    cartTotals,
  };
})();
