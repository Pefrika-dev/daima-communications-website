/* ==========================================================================
   DAIMA COMMUNICATIONS — PUBLIC SITE BEHAVIOUR
   Catalogue rendering, search/filter/sort, product detail, cart, inquiry forms.
   ========================================================================== */

(function () {
  'use strict';

  const C = DAIMA.CONFIG;
  const H = DAIMA.H;
  const Store = DAIMA.Store;
  const UI = DAIMA.UI;
  const esc = H.escape;
  const byId = (id) => document.getElementById(id);

  const ACCESSORY_CATEGORIES = [
    'chargers-cables',
    'earphones-headphones',
    'cases-protection',
    'power-banks',
    'smartwatches',
    'speakers-audio',
    'computer-accessories',
    'other-electronics',
  ];

  /* ------------------------------------------------------------------ */
  /* Reusable markup                                                    */
  /* ------------------------------------------------------------------ */
  function imageTag(src, alt, options) {
    const opts = options || {};
    return `<img src="${esc(src)}" alt="${esc(alt)}" width="${opts.width || 600}" height="${opts.height || 600}"${opts.eager ? '' : ' loading="lazy"'} decoding="async"${opts.className ? ` class="${opts.className}"` : ''}>`;
  }

  function whatsAppButton(product, branch, extraClass, label) {
    const configured = H.whatsAppConfigured();
    return `<button class="btn btn-ghost wa-btn ${extraClass || ''}" type="button"
      data-wa-product="${esc(product.id)}" data-wa-branch="${esc(branch || '')}"
      ${configured ? '' : 'disabled aria-disabled="true"'}
      title="${configured ? 'Ask about this product on WhatsApp' : 'WhatsApp number not configured yet — see js/config.js'}">
      ${UI.icon('whatsapp', 15)}<span>${esc(label || 'WhatsApp')}</span>
    </button>`;
  }

  function productCard(product, options) {
    const opts = options || {};
    const saved = Store.isWishlisted(product.id);
    const demo = Store.getSettings().showDemoBadges;
    const href = `product.html?id=${encodeURIComponent(product.id)}`;
    return `
    <article class="product-card" data-product-card="${esc(product.id)}">
      <div class="product-media">
        <a href="${href}" aria-label="View ${esc(product.name)}">
          ${imageTag(product.image, `${product.name} — illustrative product render`, { width: 800, height: 800 })}
        </a>
        ${demo ? `<div class="product-media__badges"><span class="demo-chip">Demo listing</span></div>` : ''}
        <button class="product-wish${saved ? ' is-active' : ''}" type="button" data-wishlist="${esc(product.id)}"
          aria-label="${saved ? 'Remove' : 'Save'} ${esc(product.name)} ${saved ? 'from' : 'to'} wishlist" aria-pressed="${saved}">
          ${UI.icon('heart', 16)}
        </button>
      </div>
      <div class="product-info">
        <div class="product-brand"><span>${esc(product.brand)}</span><span>${esc(product.category ? H.category(product.category).short : '')}</span></div>
        <a class="product-name" href="${href}">${esc(product.name)}</a>
        <span class="product-model">${esc(product.model || '')}</span>
        <div class="product-price-row">
          <span class="product-price">${esc(H.formatPrice(product.price))}</span>
          <span class="price-demo-label">demo price</span>
        </div>
        <div class="product-availability" title="${esc(C.demo.availabilityNotice)}">
          <span class="availability-dot" aria-hidden="true"></span>
          <span>Contact branch to confirm availability</span>
        </div>
        <div class="product-actions">
          <button class="btn btn-dark" type="button" data-add-to-cart="${esc(product.id)}" data-open="false">
            ${UI.icon('bag', 14)} Add to cart
          </button>
          ${whatsAppButton(product, opts.branch || '', '', 'WhatsApp')}
        </div>
      </div>
    </article>`;
  }

  function optionMarkup(value, label, selected) {
    return `<option value="${esc(value)}"${String(selected) === String(value) ? ' selected' : ''}>${esc(label)}</option>`;
  }

  function branchOptions(selected, includeAny) {
    const branches = Store.getBranches().filter((branch) => branch.active !== false);
    return (
      (includeAny ? `<option value="">${esc(includeAny)}</option>` : '<option value="">Select a branch</option>') +
      branches.map((branch) => optionMarkup(branch.id, `Daima — ${branch.name}`, selected)).join('')
    );
  }

  function categoryCard(category, index, products) {
    const count = products.filter((p) => p.category === category.id).length;
    const number = String(index + 1).padStart(2, '0');
    const countLabel = `${count} demo ${count === 1 ? 'listing' : 'listings'}`;
    return `
      <a class="category-card" href="products.html?category=${encodeURIComponent(category.id)}">
        ${imageTag(category.image, `${category.name} category — illustrative render`, { width: 800, height: 800 })}
        <span class="category-card__num">${number}</span>
        <span class="category-card__arrow">${UI.icon('arrowUpRight', 15)}</span>
        <div class="category-card__body">
          <div class="category-card__name">${esc(category.name)}</div>
          <div class="category-card__count">${countLabel}</div>
        </div>
      </a>`;
  }

  function directionsUrl(branch) {
    const query = branch.mapsQuery || `Daima Communications ${branch.name} Migori County Kenya`;
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  }

  function branchWhatsAppUrl(branch) {
    const local = H.digits(branch.whatsapp);
    const global = H.whatsAppNumber();
    const number = local.length >= 9 && local.length <= 15 ? local : global;
    if (!number) return '';
    const message = `Hello Daima Communications (${branch.name}), I would like to make an enquiry.`;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }

  function branchCard(branch, index) {
    const wa = branchWhatsAppUrl(branch);
    const phoneHref = branch.phone ? H.phoneHref(branch.phone) : '';
    const active = branch.active !== false;
    return `
    <article class="branch-card" aria-labelledby="branch-${branch.id}-title">
      <div class="branch-media">
        ${imageTag(branch.image, branch.imageAlt, { width: 1200, height: 800 })}
        <div class="branch-media__top">
          <span class="branch-index">${String(index + 1).padStart(2, '0')}</span>
          <span class="demo-chip">Concept visual</span>
        </div>
      </div>
      <div class="branch-body">
        <div class="branch-head">
          <div>
            <span class="eyebrow eyebrow--plain">Daima Communications</span>
            <h3 id="branch-${branch.id}-title">${esc(branch.name)}</h3>
          </div>
          <span class="status ${active ? 'status--warning' : 'status--neutral'}">${active ? 'Details to be verified' : 'Inactive in demo'}</span>
        </div>
        <p class="branch-location">${UI.icon('pin', 14)}<span>${esc(branch.location)}</span></p>
        <p class="branch-tagline">${esc(branch.tagline || '')}</p>
        <div class="branch-meta">
          <div class="branch-meta__row">${UI.icon('store', 14)}<span>${esc(branch.addressNote)}</span></div>
          <div class="branch-meta__row">${UI.icon('clock', 14)}<span>${esc(branch.hours)}</span></div>
          <div class="branch-meta__row">${UI.icon('phone', 14)}<span>${esc(branch.phone || branch.phoneDisplay)}</span></div>
        </div>
        <div class="branch-availability">${UI.icon('spark', 14)}<span>${esc(branch.stockLabel || C.demo.availabilityNotice)}</span></div>
        <div class="branch-actions">
          <a class="btn btn-ghost" href="${directionsUrl(branch)}" target="_blank" rel="noopener noreferrer" title="${esc(branch.directionsNote || 'Search this area in Google Maps')}">
            ${UI.icon('pin', 15)} Directions
          </a>
          ${phoneHref
            ? `<a class="btn btn-ghost" href="${esc(phoneHref)}">${UI.icon('phone', 15)} Call branch</a>`
            : `<button class="btn btn-ghost" type="button" disabled title="Branch phone number to be configured">${UI.icon('phone', 15)} Call to be configured</button>`}
          ${wa
            ? `<a class="btn btn-whatsapp" href="${esc(wa)}" target="_blank" rel="noopener noreferrer">${UI.icon('whatsapp', 15)} WhatsApp</a>`
            : `<button class="btn btn-ghost" type="button" disabled title="WhatsApp number to be configured in js/config.js">${UI.icon('whatsapp', 15)} WhatsApp to be configured</button>`}
          <a class="btn btn-ghost" href="branches.html#${branch.id}">Branch details ${UI.icon('arrow', 14)}</a>
        </div>
      </div>
    </article>`;
  }

  /* ------------------------------------------------------------------ */
  /* Inquiry form framework                                             */
  /* ------------------------------------------------------------------ */
  function setFieldError(input, message) {
    const field = input.closest('.field') || input.closest('.checkbox-field');
    if (!field) return;
    field.classList.add('has-error');
    const error = field.querySelector('.field-error');
    if (error) error.textContent = message;
    input.setAttribute('aria-invalid', 'true');
  }

  function clearFieldError(input) {
    const field = input.closest('.field') || input.closest('.checkbox-field');
    if (!field) return;
    field.classList.remove('has-error');
    input.removeAttribute('aria-invalid');
  }

  function validateInquiryForm(form, options) {
    const opts = options || {};
    let firstInvalid = null;
    const fail = (input, message) => {
      setFieldError(input, message);
      if (!firstInvalid) firstInvalid = input;
    };

    const name = form.elements.name;
    const phone = form.elements.phone;
    const message = form.elements.message;
    const consent = form.elements.consent;

    [name, phone, message, consent].forEach((input) => { if (input) clearFieldError(input); });

    if (name) {
      const value = name.value.trim();
      if (value.length < 2) fail(name, 'Please enter your name (at least 2 characters).');
      else if (value.length > 80) fail(name, 'Please keep your name under 80 characters.');
    }
    if (phone) {
      const digits = H.digits(phone.value);
      if (!phone.value.trim()) fail(phone, 'Please enter a phone number so the branch can respond.');
      else if (digits.length < 9 || digits.length > 15) fail(phone, 'Enter a valid phone number with 9–15 digits.');
    }
    if (message && !opts.messageOptional) {
      const value = message.value.trim();
      if (value.length < 10) fail(message, 'Please add a little more detail (at least 10 characters).');
      else if (value.length > 1200) fail(message, 'Please keep your message under 1,200 characters.');
    }
    if (consent && !consent.checked) fail(consent, 'Please acknowledge the demonstration notice before submitting.');

    if (firstInvalid) {
      firstInvalid.focus({ preventScroll: false });
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    return true;
  }

  function bindFieldClearing(form) {
    form.querySelectorAll('input, select, textarea').forEach((input) => {
      input.addEventListener('input', () => clearFieldError(input));
      input.addEventListener('change', () => clearFieldError(input));
    });
  }

  function showFormSuccess(form, successEl, inquiry, options) {
    const opts = options || {};
    form.hidden = true;
    if (!successEl) return;
    successEl.classList.add('is-visible');
    const ref = successEl.querySelector('[data-inquiry-reference]');
    if (ref) ref.textContent = `Reference ${inquiry.reference}`;

    const waLink = successEl.querySelector('[data-inquiry-whatsapp]');
    if (waLink) {
      const message = opts.waMessage || H.buildInquiryMessage({ customerName: inquiry.name, message: inquiry.message, branchId: inquiry.branch });
      if (H.whatsAppConfigured()) {
        waLink.hidden = false;
        waLink.href = H.whatsAppLink(message);
      } else {
        waLink.hidden = true;
      }
    }

    const reset = successEl.querySelector('[data-inquiry-reset]');
    if (reset) {
      reset.addEventListener('click', () => {
        successEl.classList.remove('is-visible');
        form.hidden = false;
        form.reset();
        const first = form.querySelector('input, textarea, select');
        if (first) first.focus();
      });
    }

    successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function initInquiryForm(config) {
    const form = byId(config.formId);
    if (!form) return;
    const success = byId(config.successId);
    bindFieldClearing(form);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validateInquiryForm(form, config)) return;

      const formData = new FormData(form);
      const productId = String(formData.get('productId') || config.productId || '');
      const product = productId ? Store.getProduct(productId) : null;
      const branchId = String(formData.get('branch') || '');
      const message = String(formData.get('message') || '').trim();
      const name = String(formData.get('name') || '').trim();
      const phone = String(formData.get('phone') || '').trim();

      const inquiry = Store.addInquiry({
        name,
        phone,
        email: '',
        productId: product ? product.id : '',
        productName: product ? product.name : config.generalLabel || 'General catalogue enquiry',
        branch: branchId,
        message,
      });

      const waMessage = H.buildInquiryMessage({
        product,
        branchId,
        customerName: name,
        message,
      });

      showFormSuccess(form, success, inquiry, {
        waMessage: config.productId ? waMessage : undefined,
      });
      UI.toast(`Demonstration inquiry saved locally as ${inquiry.reference}. It was not sent.`, 'info');
    });
  }

  /* ------------------------------------------------------------------ */
  /* Home page                                                          */
  /* ------------------------------------------------------------------ */
  const homeState = { filter: 'all', sort: 'recommended', q: '' };

  function featuredProducts() {
    const products = Store.getProducts();
    let list = products.filter((product) => product.featured);
    if (!list.length) list = products.slice(0, 8);
    if (homeState.filter === 'smartphones') {
      list = list.filter((p) => p.category === 'smartphones');
    } else if (homeState.filter === 'audio') {
      list = list.filter((p) => ['earphones-headphones', 'speakers-audio'].includes(p.category));
    } else if (homeState.filter === 'power') {
      list = list.filter((p) => ['power-banks', 'chargers-cables'].includes(p.category));
    } else if (homeState.filter === 'accessories') {
      list = list.filter((p) => ['cases-protection', 'smartwatches', 'computer-accessories', 'other-electronics'].includes(p.category));
    }
    const q = homeState.q.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => [p.name, p.brand, p.model, p.sku]
        .filter(Boolean).join(' ').toLowerCase().includes(q));
    }
    if (homeState.sort === 'price-low') list = list.slice().sort((a, b) => Number(a.price) - Number(b.price));
    else if (homeState.sort === 'price-high') list = list.slice().sort((a, b) => Number(b.price) - Number(a.price));
    else if (homeState.sort === 'name') list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }

  function renderFeatured() {
    const grid = byId('featured-grid');
    if (!grid) return;
    const list = featuredProducts();
    grid.innerHTML = list.length
      ? list.slice(0, 8).map((product) => productCard(product, { branch: homeState.branch })).join('')
      : `<div class="empty-state">
          <span class="empty-icon">${UI.icon('search', 26)}</span>
          <h3>No demonstration products in this view</h3>
          <p>Try another search or filter, or browse the complete catalogue.</p>
          <a class="btn btn-primary" href="products.html">View the catalogue ${UI.icon('arrow', 15)}</a>
        </div>`;
    UI.updateCounts();
  }

  function initHome() {
    const products = Store.getProducts();
    const categoryGrid = byId('category-grid');
    if (categoryGrid) {
      categoryGrid.innerHTML = C.categories.map((category, index) => categoryCard(category, index, products)).join('');
    }

    const branchGrid = byId('home-branches');
    if (branchGrid) {
      branchGrid.innerHTML = Store.getBranches()
        .filter((branch) => branch.active !== false)
        .map((branch, index) => branchCard(branch, index))
        .join('');
    }

    document.querySelectorAll('[data-feature-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        homeState.filter = button.getAttribute('data-feature-filter');
        document.querySelectorAll('[data-feature-filter]').forEach((item) => {
          const active = item === button;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        renderFeatured();
      });
    });

    const search = byId('featured-search');
    if (search) {
      search.addEventListener('input', () => {
        homeState.q = search.value;
        renderFeatured();
      });
    }

    const sort = byId('featured-sort');
    if (sort) {
      sort.addEventListener('change', () => {
        homeState.sort = sort.value;
        renderFeatured();
      });
    }

    document.querySelectorAll('[data-count-products]').forEach((el) => { el.textContent = String(products.length); });
    document.querySelectorAll('[data-count-categories]').forEach((el) => { el.textContent = String(C.categories.length); });
    document.querySelectorAll('[data-count-branches]').forEach((el) => {
      el.textContent = String(Store.getBranches().filter((b) => b.active !== false).length);
    });

    const branchSelect = byId('contact-branch');
    if (branchSelect) branchSelect.innerHTML = branchOptions('', 'Select a branch (optional)');

    const productSelect = byId('contact-product');
    if (productSelect) {
      const groups = C.categories
        .map((category) => {
          const options = products.filter((p) => p.category === category.id);
          if (!options.length) return '';
          return `<optgroup label="${esc(category.name)}">${options.map((p) => `<option value="${esc(p.id)}">${esc(p.name)} — ${esc(H.formatPrice(p.price))} demo</option>`).join('')}</optgroup>`;
        })
        .join('');
      productSelect.innerHTML = `<option value="">General enquiry / not sure yet</option>${groups}`;
    }

    initInquiryForm({ formId: 'contact-form', successId: 'contact-success' });
    renderFeatured();

    // Keep the flagship spotlight tied to the same demonstration data store.
    const spotlight = Store.getProduct('p01') || products[0];
    if (spotlight) {
      const price = document.querySelector('[data-spotlight-price]');
      if (price) price.textContent = H.formatPrice(spotlight.price);
      const link = document.querySelector('[data-spotlight-link]');
      if (link) link.href = `product.html?id=${encodeURIComponent(spotlight.id)}`;
      const title = byId('spotlight-title');
      if (title && spotlight.name) title.textContent = spotlight.name;
      const image = document.querySelector('.spotlight-media img');
      if (image && spotlight.image) {
        image.src = spotlight.gallery && spotlight.gallery[1] ? spotlight.gallery[1] : spotlight.image;
        image.alt = `${spotlight.name} — illustrative product render`;
      }
      const features = document.querySelector('.spotlight-features');
      if (features && Array.isArray(spotlight.highlights) && spotlight.highlights.length) {
        features.innerHTML = spotlight.highlights
          .slice(0, 3)
          .map((item, index) => `<div class="spotlight-feature"><span>${String(index + 1).padStart(2, '0')}</span><span>${esc(item)}</span></div>`)
          .join('');
      }
    }
  }

  /* ------------------------------------------------------------------ */
  /* Catalogue page                                                     */
  /* ------------------------------------------------------------------ */
  const catState = {
    q: '',
    categories: [],
    brands: [],
    min: '',
    max: '',
    sort: 'recommended',
    branch: H.param('branch') || '',
    visible: 12,
  };

  function readCatalogueState() {
    const params = new URLSearchParams(location.search);
    catState.q = (params.get('q') || '').trim();
    catState.categories = (params.get('category') || '')
      .split(',')
      .map((id) => id.trim())
      .filter((id) => C.categories.some((category) => category.id === id));
    if (params.get('view') === 'accessories' && !catState.categories.length) {
      catState.categories = ACCESSORY_CATEGORIES.slice();
    }
    catState.brands = (params.get('brand') || '')
      .split(',')
      .map((brand) => brand.trim())
      .filter(Boolean);
    catState.min = params.get('min') || '';
    catState.max = params.get('max') || '';
    catState.sort = params.get('sort') || 'recommended';
    catState.branch = params.get('branch') || '';
    catState.visible = 12;
  }

  function syncCatalogueUrl() {
    const params = new URLSearchParams();
    if (catState.q) params.set('q', catState.q);
    if (catState.categories.length) params.set('category', catState.categories.join(','));
    if (catState.brands.length) params.set('brand', catState.brands.join(','));
    if (catState.min) params.set('min', catState.min);
    if (catState.max) params.set('max', catState.max);
    if (catState.sort !== 'recommended') params.set('sort', catState.sort);
    if (catState.branch) params.set('branch', catState.branch);
    const query = params.toString();
    history.replaceState(null, '', 'products.html' + (query ? '?' + query : ''));
  }

  function filteredCatalogue() {
    const products = Store.getProducts();
    const q = catState.q.toLowerCase();
    let list = products.filter((product) => {
      if (q) {
        const haystack = [product.name, product.brand, product.model, product.sku, H.category(product.category).name]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (catState.categories.length && !catState.categories.includes(product.category)) return false;
      if (catState.brands.length && !catState.brands.includes(product.brand)) return false;
      const price = Number(product.price);
      if (catState.min !== '' && price < Number(catState.min)) return false;
      if (catState.max !== '' && price > Number(catState.max)) return false;
      return true;
    });

    switch (catState.sort) {
      case 'price-low': list.sort((a, b) => Number(a.price) - Number(b.price)); break;
      case 'price-high': list.sort((a, b) => Number(b.price) - Number(a.price)); break;
      case 'name': list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'newest': list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));
    }
    return list;
  }

  function countBy(list, key, value) {
    return list.filter((item) => item[key] === value).length;
  }

  function buildFilters() {
    const all = Store.getProducts();
    const categoryHost = byId('filter-categories');
    const brandHost = byId('filter-brands');
    if (categoryHost) {
      categoryHost.innerHTML = C.categories
        .map((category) => {
          const count = countBy(all, 'category', category.id);
          const checked = catState.categories.includes(category.id);
          return `<label class="filter-option${count === 0 ? ' is-disabled' : ''}">
            <input type="checkbox" name="category" value="${esc(category.id)}" ${checked ? 'checked' : ''} ${count === 0 ? 'disabled' : ''}>
            <span>${esc(category.name)}</span><span class="count">${count}</span>
          </label>`;
        })
        .join('');
    }
    if (brandHost) {
      const brands = Array.from(new Set(all.map((p) => p.brand))).sort();
      brandHost.innerHTML = brands
        .map((brand) => {
          const count = countBy(all, 'brand', brand);
          const checked = catState.brands.includes(brand);
          return `<label class="filter-option">
            <input type="checkbox" name="brand" value="${esc(brand)}" ${checked ? 'checked' : ''}>
            <span>${esc(brand)}</span><span class="count">${count}</span>
          </label>`;
        })
        .join('');
    }
    const min = byId('filter-min');
    const max = byId('filter-max');
    if (min) min.value = catState.min;
    if (max) max.value = catState.max;
    const search = byId('filter-search');
    if (search) search.value = catState.q;
    const toolbarSearch = byId('catalogue-search-input');
    if (toolbarSearch) toolbarSearch.value = catState.q;
    const sort = byId('catalogue-sort');
    if (sort) sort.value = catState.sort;
    const branch = byId('catalogue-branch');
    if (branch) {
      branch.innerHTML = branchOptions(catState.branch, 'No preference');
      branch.value = catState.branch;
    }
  }

  function activeFilterChips() {
    const host = byId('active-filters');
    if (!host) return;
    const chips = [];
    if (catState.q) chips.push({ key: 'q', label: `“${catState.q}”` });
    catState.categories.forEach((id) => {
      if (id) chips.push({ key: 'category', value: id, label: H.category(id).name });
    });
    catState.brands.forEach((brand) => chips.push({ key: 'brand', value: brand, label: brand }));
    if (catState.min || catState.max) {
      const label = `${catState.min ? H.formatPrice(catState.min) : 'Any'} – ${catState.max ? H.formatPrice(catState.max) : 'Any'}`;
      chips.push({ key: 'price', label });
    }
    host.innerHTML =
      chips.map((chip) => `<span class="active-tag">${esc(chip.label)}<button type="button" aria-label="Remove ${esc(chip.label)} filter" data-remove-filter="${esc(chip.key)}" data-filter-value="${esc(chip.value || '')}">${UI.icon('close', 12)}</button></span>`).join('') +
      (chips.length ? '<button type="button" class="clear-filters" data-clear-filters>Clear all</button>' : '');
  }

  function renderCatalogue(options) {
    const grid = byId('catalogue-grid');
    if (!grid) return;
    if (options && options.reset) catState.visible = 12;
    const list = filteredCatalogue();
    const shown = list.slice(0, catState.visible);
    const countEl = byId('catalogue-count');
    const count = list.length;
    if (countEl) {
      countEl.innerHTML = `<strong>${count}</strong> demonstration ${count === 1 ? 'product' : 'products'}`;
    }
    grid.innerHTML = shown.length
      ? shown.map((product) => productCard(product, { branch: catState.branch })).join('')
      : `<div class="empty-state">
          <span class="empty-icon">${UI.icon('search', 26)}</span>
          <h3>No products match those filters</h3>
          <p>Try a different search term, remove a filter, or browse the full demonstration catalogue.</p>
          <button class="btn btn-primary" type="button" data-clear-filters>Reset filters ${UI.icon('refresh', 15)}</button>
        </div>`;
    const more = byId('load-more-wrap');
    if (more) {
      more.hidden = list.length <= catState.visible;
      const label = byId('load-more-label');
      if (label) label.textContent = `Showing ${Math.min(catState.visible, list.length)} of ${list.length}`;
    }
    activeFilterChips();
    buildFilters();
    UI.updateCounts();
    syncCatalogueUrl();
  }

  function initCatalogue() {
    readCatalogueState();
    const products = Store.getProducts();
    buildFilters();
    renderCatalogue();

    const applyCategoryInputs = () => {
      catState.categories = Array.from(document.querySelectorAll('#filter-categories input:checked')).map((input) => input.value);
    };
    const applyBrandInputs = () => {
      catState.brands = Array.from(document.querySelectorAll('#filter-brands input:checked')).map((input) => input.value);
    };

    const searchInputs = [byId('filter-search'), byId('catalogue-search-input')].filter(Boolean);
    let searchTimer = null;
    searchInputs.forEach((input) => {
      input.addEventListener('input', () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          catState.q = input.value.trim();
          searchInputs.forEach((other) => { other.value = catState.q; });
          renderCatalogue({ reset: true });
        }, 160);
      });
    });

    byId('filter-categories')?.addEventListener('change', () => {
      applyCategoryInputs();
      renderCatalogue({ reset: true });
    });
    byId('filter-brands')?.addEventListener('change', () => {
      applyBrandInputs();
      renderCatalogue({ reset: true });
    });
    ['filter-min', 'filter-max'].forEach((id) => {
      const input = byId(id);
      if (!input) return;
      input.addEventListener('change', () => {
        const min = byId('filter-min');
        const max = byId('filter-max');
        catState.min = min ? min.value : '';
        catState.max = max ? max.value : '';
        if (catState.min && catState.max && Number(catState.min) > Number(catState.max)) {
          const temp = catState.min;
          catState.min = catState.max;
          catState.max = temp;
          if (min) min.value = catState.min;
          if (max) max.value = catState.max;
        }
        renderCatalogue({ reset: true });
      });
    });

    const sort = byId('catalogue-sort');
    if (sort) sort.addEventListener('change', () => { catState.sort = sort.value; renderCatalogue({ reset: true }); });

    const branch = byId('catalogue-branch');
    if (branch) branch.addEventListener('change', () => { catState.branch = branch.value; renderCatalogue(); });

    const loadMore = byId('load-more');
    if (loadMore) {
      loadMore.addEventListener('click', () => {
        catState.visible += 12;
        renderCatalogue();
        const grid = byId('catalogue-grid');
        if (grid) {
          const cards = grid.querySelectorAll('.product-card');
          if (cards.length) cards[Math.max(0, cards.length - 12)].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    document.addEventListener('click', (event) => {
      if (event.target.closest('[data-clear-filters]')) {
        catState.q = '';
        catState.categories = [];
        catState.brands = [];
        catState.min = '';
        catState.max = '';
        catState.sort = 'recommended';
        catState.branch = '';
        const sortEl = byId('catalogue-sort');
        if (sortEl) sortEl.value = 'recommended';
        const branchEl = byId('catalogue-branch');
        if (branchEl) branchEl.value = '';
        if (byId('filter-search')) byId('filter-search').value = '';
        if (byId('catalogue-search-input')) byId('catalogue-search-input').value = '';
        renderCatalogue({ reset: true });
        return;
      }
      const remove = event.target.closest('[data-remove-filter]');
      if (remove) {
        const key = remove.getAttribute('data-remove-filter');
        const value = remove.getAttribute('data-filter-value');
        if (key === 'q') catState.q = '';
        else if (key === 'category') catState.categories = catState.categories.filter((id) => id !== value);
        else if (key === 'brand') catState.brands = catState.brands.filter((brandId) => brandId !== value);
        else if (key === 'price') { catState.min = ''; catState.max = ''; }
        renderCatalogue({ reset: true });
      }
    });

    // Mobile filter panel
    const panel = byId('filters-panel');
    const backdrop = byId('filters-backdrop');
    const openBtn = byId('open-filters');
    const close = () => {
      panel?.classList.remove('is-open');
      backdrop?.classList.remove('is-open');
      document.body.classList.remove('filters-open');
      if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
    };
    const open = () => {
      panel?.classList.add('is-open');
      backdrop?.classList.add('is-open');
      document.body.classList.add('filters-open');
      if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
      const closeBtn = panel?.querySelector('[data-close-filters]');
      if (closeBtn) setTimeout(() => closeBtn.focus(), 60);
    };
    if (openBtn) openBtn.addEventListener('click', open);
    document.querySelectorAll('[data-close-filters]').forEach((btn) => btn.addEventListener('click', close));
    backdrop?.addEventListener('click', close);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && panel && panel.classList.contains('is-open')) close();
    });
    byId('filters-apply')?.addEventListener('click', close);

    // Reflect the current path/query in the document title for search clarity.
    if (catState.q) {
      document.title = `Search “${catState.q}” — demonstration catalogue | DAIMA COMMUNICATIONS`;
    }
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.content = 'Search and compare demonstration smartphone, audio, charging and accessory listings from Daima Communications. Confirm all details with the branch.';
    }
  }

  /* ------------------------------------------------------------------ */
  /* Product detail page                                                */
  /* ------------------------------------------------------------------ */
  function renderProductNotFound() {
    const root = byId('product-root');
    if (!root) return;
    root.innerHTML = `
      <div class="container">
        <div class="empty-state" style="margin-block:60px">
          <span class="empty-icon">${UI.icon('search', 26)}</span>
          <h1 style="font-size:1.7rem;margin-bottom:8px">Product not found</h1>
          <p>This demonstration listing may have been removed or the link may be incomplete.</p>
          <a class="btn btn-primary" href="products.html">Browse the catalogue ${UI.icon('arrow', 15)}</a>
        </div>
      </div>`;
  }

  function initProduct() {
    const root = byId('product-root');
    if (!root) return;
    const id = H.param('id');
    const product = id ? Store.getProduct(id) : null;
    if (!product) { renderProductNotFound(); return; }

    document.title = `${product.name} — demonstration listing | DAIMA COMMUNICATIONS`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = `${product.name} by ${product.brand}. This is an illustrative demonstration listing — confirm price, specification, availability and warranty with Daima Communications.`;

    const branchList = Store.getBranches().filter((branch) => branch.active !== false);
    const branches = Store.getBranches().find((b) => b.active !== false) || Store.getBranches()[0];
    const specRows = (product.specs || []).map(([label, value]) => `<div class="spec-row"><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('');
    const highlights = (product.highlights || []).map((item) => `<div class="product-highlight">${UI.icon('check', 14)}<span>${esc(item)}</span></div>`).join('');
    const gallery = product.gallery && product.gallery.length ? product.gallery : [product.image];
    const waConfigured = H.whatsAppConfigured();
    const related = Store.getProducts()
      .filter((item) => item.id !== product.id && (item.category === product.category || item.brand === product.brand))
      .slice(0, 4);
    if (related.length < 3) {
      Store.getProducts()
        .filter((item) => item.id !== product.id && !related.some((existing) => existing.id === item.id))
        .slice(0, 4 - related.length)
        .forEach((item) => related.push(item));
    }

    root.innerHTML = `
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">Home</a><span class="sep">/</span>
        <a href="products.html">Catalogue</a><span class="sep">/</span>
        <a href="products.html?category=${encodeURIComponent(product.category)}">${esc(H.category(product.category).name)}</a><span class="sep">/</span>
        <span aria-current="page">${esc(product.name)}</span>
      </nav>
      <div class="product-detail-grid">
        <div class="product-gallery">
          <div class="gallery-main">
            <img id="gallery-main-image" src="${esc(gallery[0])}" alt="${esc(product.name)} — illustrative product render" width="800" height="800" />
            <span class="gallery-main__tag demo-chip">Illustrative render</span>
            <span class="gallery-main__zoom">${UI.icon('eye', 13)} Concept visual</span>
          </div>
          ${gallery.length > 1 ? `<div class="gallery-thumbs" role="group" aria-label="Product images">
            ${gallery.map((src, index) => `<button class="gallery-thumb${index === 0 ? ' is-active' : ''}" type="button" data-gallery-src="${esc(src)}" aria-label="View image ${index + 1} of ${gallery.length}" aria-pressed="${index === 0}"><img src="${esc(src)}" alt="" width="120" height="120" loading="lazy" /></button>`).join('')}
          </div>` : ''}
        </div>

        <div class="product-info-panel">
          <div class="brandline">
            <div class="product-brandline">
              <span>${esc(product.brand)}</span>
              <span aria-hidden="true">·</span>
              <span>${esc(H.category(product.category).name)}</span>
              <span aria-hidden="true">·</span>
              <span>${esc(product.sku)}</span>
            </div>
          </div>
          <h1>${esc(product.name)}</h1>
          <p class="product-subtitle">Model: <span>${esc(product.model || 'Confirm with branch')}</span> · ${esc(product.brand)}</p>

          <div class="product-price-block">
            <span class="price">${esc(H.formatPrice(product.price))}</span>
            <span class="price-note">illustrative demo price</span>
          </div>
          <p class="product-demo-note">${UI.icon('spark', 13)}<span>${esc(C.demo.priceNotice)}</span></p>

          <div class="product-highlights">${highlights}</div>

          <div class="availability-panel">
            <div class="availability-panel__head">
              <h2>Branch availability</h2>
              <span>Not verified stock data</span>
            </div>
            ${branchList.map((branch) => `<div class="availability-row">
              <span class="availability-row__branch">${UI.icon('pin', 14)} ${esc(branch.name)}</span>
              <span class="availability-row__status">Contact branch to confirm</span>
            </div>`).join('')}
            <div class="availability-foot">
              <span class="micro-note">${esc(C.demo.availabilityNotice)}</span>
              <a href="branches.html">Branch details →</a>
            </div>
          </div>

          <div class="field" style="margin-bottom:12px">
            <label for="detail-branch">Preferred branch for this enquiry</label>
            <select class="select" id="detail-branch" style="width:100%;min-height:44px">
              ${branchOptions(catState.branch, 'No preference / compare both branches')}
            </select>
          </div>

          <div class="product-buy">
            <div class="qty-selector" aria-label="Quantity">
              <button type="button" id="detail-qty-down" aria-label="Decrease quantity">${UI.icon('minus', 15)}</button>
              <input id="detail-qty" type="number" value="1" min="1" max="99" inputmode="numeric" aria-label="Quantity" />
              <button type="button" id="detail-qty-up" aria-label="Increase quantity">${UI.icon('plus', 15)}</button>
            </div>
            <button class="btn btn-primary btn-lg" type="button" data-add-to-cart="${esc(product.id)}" data-qty-source="#detail-qty">
              ${UI.icon('bag', 16)} Add to demonstration cart
            </button>
          </div>
          <div class="product-buy-secondary">
            <button class="btn btn-ghost${Store.isWishlisted(product.id) ? ' is-active' : ''}" type="button" data-wishlist="${esc(product.id)}" aria-pressed="${Store.isWishlisted(product.id)}">
              ${UI.icon('heart', 15)} Save to wishlist
            </button>
            ${whatsAppButton(product, '', '', 'Ask on WhatsApp')}
          </div>
          ${waConfigured ? '' : `<p class="micro-note" style="margin-top:8px">WhatsApp enquiries will activate once a verified business number is configured in <code>js/config.js</code>.</p>`}

          <div class="product-trust">
            <div class="product-trust__item">${UI.icon('shield', 15)}<span><strong>Nothing is charged online.</strong> The cart is a demonstration for requesting availability, not an order.</span></div>
            <div class="product-trust__item">${UI.icon('store', 15)}<span><strong>Two proposed branch locations.</strong> Confirm the exact model, colour and price with the team before travelling.</span></div>
            <div class="product-trust__item">${UI.icon('spark', 15)}<span><strong>Illustrative product render.</strong> ${esc(C.demo.imageNotice)}</span></div>
          </div>
        </div>
      </div>

      <div class="product-detail-cols">
        <section class="product-section" aria-labelledby="about-product">
          <span class="eyebrow">Overview</span>
          <h2 id="about-product">About this demonstration listing</h2>
          <p class="product-description">${esc(product.description)}</p>
          <div class="notice notice--blue" style="margin-top:18px">
            ${UI.icon('spark', 15)}
            <span><strong>Specifications are illustrative.</strong> ${esc(product.specsNote || '')}</span>
          </div>
        </section>
        <section class="product-section" aria-labelledby="product-specs">
          <span class="eyebrow">At a glance</span>
          <h2 id="product-specs">Demonstration details</h2>
          <dl class="spec-grid">${specRows || '<div class="spec-row"><dt>Details</dt><dd>To be confirmed with the branch.</dd></div>'}</dl>
          <div class="notice" style="margin-top:16px">
            ${UI.icon('phone', 15)}
            <span><strong>Colour availability to be confirmed.</strong> Ask the branch which colours and variants are currently available.</span>
          </div>
        </section>
      </div>

      <div class="product-inquiry-strip">
        <div>
          <h3>Have a specific question about this product?</h3>
          <p>Send a demonstration inquiry to test the workflow — or use WhatsApp once a verified business number is configured.</p>
        </div>
        <a class="btn btn-dark" href="#product-inquiry">Ask about this product ${UI.icon('arrow', 15)}</a>
      </div>

      <section class="product-section" id="product-inquiry" aria-labelledby="product-inquiry-title">
        <div class="section-head" style="margin-bottom:22px">
          <div class="section-head__main">
            <span class="eyebrow">Product inquiry</span>
            <h2 class="section-title" id="product-inquiry-title" style="font-size:clamp(1.5rem,2.4vw,2rem)">Ask about the ${esc(product.name)}</h2>
            <p class="section-lede" style="margin-top:10px">This form saves a demonstration inquiry in your browser. It is not delivered to Daima Communications.</p>
          </div>
        </div>
        <div class="form-card" style="max-width:760px">
          <form id="product-inquiry-form" novalidate>
            <input type="hidden" name="productId" value="${esc(product.id)}" />
            <div class="form-grid">
              <div class="form-row">
                <div class="field">
                  <label for="pi-name">Your name <span class="req">*</span></label>
                  <input id="pi-name" name="name" type="text" autocomplete="name" placeholder="e.g. Alex" maxlength="80" required />
                  <span class="field-error" role="alert"></span>
                </div>
                <div class="field">
                  <label for="pi-phone">Phone number <span class="req">*</span></label>
                  <input id="pi-phone" name="phone" type="tel" autocomplete="tel" placeholder="+254 7XX XXX XXX" maxlength="24" required />
                  <span class="field-error" role="alert"></span>
                </div>
              </div>
              <div class="field">
                <label for="pi-branch">Preferred branch</label>
                <select id="pi-branch" name="branch">${branchOptions('', 'No preference / compare both branches')}</select>
              </div>
              <div class="field">
                <label for="pi-message">Your question <span class="req">*</span></label>
                <textarea id="pi-message" name="message" placeholder="Ask about model variants, colour, current price or availability…" maxlength="1200" required></textarea>
                <span class="field-error" role="alert"></span>
              </div>
              <div class="field">
                <label class="checkbox-field">
                  <input type="checkbox" name="consent" required />
                  <span>I understand this is a demonstration: the inquiry is stored only in this browser and is not sent to the business.</span>
                </label>
                <span class="field-error" role="alert"></span>
              </div>
              <div class="form-submit">
                <button class="btn btn-primary" type="submit">Save demonstration inquiry ${UI.icon('arrow', 15)}</button>
              </div>
            </div>
          </form>
          <div class="form-success" id="product-inquiry-success">
            <span class="form-success__icon">${UI.icon('check', 26)}</span>
            <h3>Demonstration inquiry saved</h3>
            <p>This inquiry has been saved in your browser only. <strong>It has not been sent to Daima Communications.</strong></p>
            <span class="reference" data-inquiry-reference>Reference —</span>
            <div class="form-success__actions">
              <a class="btn btn-whatsapp" data-inquiry-whatsapp href="#contact" target="_blank" rel="noopener noreferrer" hidden>${UI.icon('whatsapp', 15)} Continue on WhatsApp</a>
              <button class="btn btn-ghost" type="button" data-inquiry-reset>Send another inquiry</button>
              <a class="btn btn-ghost" href="cart.html">View cart</a>
            </div>
          </div>
        </div>
      </section>

      ${related.length ? `<section class="product-section" aria-labelledby="related-title">
        <div class="section-head section-head--split" style="margin-bottom:22px">
          <div class="section-head__main">
            <span class="eyebrow">Continue exploring</span>
            <h2 class="section-title" id="related-title" style="font-size:clamp(1.5rem,2.4vw,2rem)">Related demo listings</h2>
          </div>
          <div class="section-head__side"><a class="text-link" href="products.html">All products ${UI.icon('arrow', 14)}</a></div>
        </div>
        <div class="product-grid">${related.map((item) => productCard(item, { branch: '' })).join('')}</div>
      </section>` : ''}
    </div>

    <div class="sticky-buy" aria-label="Quick purchase actions">
      <div class="sticky-buy__price">
        <strong>${esc(H.formatPrice(product.price))}</strong>
        <span>demo price · availability to confirm</span>
      </div>
      <button class="btn btn-primary" type="button" data-add-to-cart="${esc(product.id)}" data-qty-source="#detail-qty">${UI.icon('bag', 15)} Add to cart</button>
    </div>`;

    // Set the branch select to a URL-provided preference.
    const branchParam = H.param('branch');
    if (branchParam) {
      const select = byId('detail-branch');
      if (select) select.value = branchParam;
    }

    // Gallery.
    root.querySelectorAll('[data-gallery-src]').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const main = byId('gallery-main-image');
        if (main) main.src = thumb.getAttribute('data-gallery-src');
        root.querySelectorAll('[data-gallery-src]').forEach((item) => {
          const active = item === thumb;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-pressed', String(active));
        });
      });
    });

    // Quantity.
    const qty = byId('detail-qty');
    const clampQty = () => {
      const value = Math.max(1, Math.min(99, Number(qty.value) || 1));
      qty.value = String(value);
    };
    byId('detail-qty-down')?.addEventListener('click', () => { qty.value = String(Math.max(1, Number(qty.value) - 1)); });
    byId('detail-qty-up')?.addEventListener('click', () => { qty.value = String(Math.min(99, Number(qty.value) + 1)); });
    qty?.addEventListener('change', clampQty);

    // WhatsApp uses the selected preferred branch.
    root.querySelectorAll('[data-wa-product]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const branch = byId('detail-branch')?.value || '';
        btn.setAttribute('data-wa-branch', branch);
      });
    });

    initInquiryForm({ formId: 'product-inquiry-form', successId: 'product-inquiry-success', productId: product.id });
    UI.updateCounts();
  }

  /* ------------------------------------------------------------------ */
  /* Cart page                                                          */
  /* ------------------------------------------------------------------ */
  function cartItems() {
    return Store.getCart()
      .map((line) => ({ line, product: Store.getProduct(line.id) }))
      .filter((item) => item.product);
  }

  function renderCartPage() {
    const host = byId('cart-lines');
    if (!host) return;
    const items = cartItems();
    const totals = items.reduce((acc, item) => {
      acc.qty += item.line.qty;
      acc.subtotal += Number(item.product.price) * item.line.qty;
      return acc;
    }, { qty: 0, subtotal: 0 });

    const summary = byId('cart-summary');
    const empty = byId('cart-empty');

    if (!items.length) {
      host.innerHTML = '';
      if (summary) summary.hidden = true;
      if (empty) empty.hidden = false;
      const count = byId('cart-line-count');
      if (count) count.textContent = '0 items';
      return;
    }
    if (summary) summary.hidden = false;
    if (empty) empty.hidden = true;
    if (byId('cart-line-count')) byId('cart-line-count').textContent = `${totals.qty} ${totals.qty === 1 ? 'item' : 'items'}`;
    if (byId('summary-subtotal')) byId('summary-subtotal').textContent = H.formatPrice(totals.subtotal);
    if (byId('summary-total')) byId('summary-total').textContent = H.formatPrice(totals.subtotal);
    if (byId('summary-count')) byId('summary-count').textContent = String(totals.qty);

    host.innerHTML = items.map(({ line, product }) => `
      <div class="cart-page-line" data-line-id="${esc(product.id)}">
        <a class="cart-page-line__img" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="View ${esc(product.name)}">
          ${imageTag(product.image, `${product.name} — illustrative product render`, { width: 200, height: 200 })}
        </a>
        <div class="cart-page-line__main">
          <div class="cart-page-line__top">
            <div>
              <span class="product-brand" style="margin-bottom:3px">${esc(product.brand)}</span>
              <a class="cart-page-line__name" href="product.html?id=${encodeURIComponent(product.id)}">${esc(product.name)}</a>
              <div class="cart-page-line__meta">${esc(product.model)} · ${esc(product.sku)} · demo listing</div>
            </div>
            <button class="icon-btn icon-btn-sm" type="button" data-remove-line="${esc(product.id)}" aria-label="Remove ${esc(product.name)}">${UI.icon('trash', 16)}</button>
          </div>
          <div class="cart-page-line__bottom">
            <div class="qty-stepper" aria-label="Quantity for ${esc(product.name)}">
              <button type="button" data-qty-down="${esc(product.id)}" aria-label="Decrease quantity">${UI.icon('minus', 14)}</button>
              <span>${line.qty}</span>
              <button type="button" data-qty-up="${esc(product.id)}" aria-label="Increase quantity">${UI.icon('plus', 14)}</button>
            </div>
            <div>
              <span class="cart-page-line__price">${esc(H.formatPrice(Number(product.price) * line.qty))}</span>
              <span class="cart-page-line__each">${esc(H.formatPrice(product.price))} each (demo)</span>
            </div>
          </div>
        </div>
      </div>`).join('');

    const branch = byId('cart-branch');
    if (branch && !branch.options.length) branch.innerHTML = branchOptions('', 'Select a branch');
    const waBtn = byId('cart-whatsapp');
    if (waBtn) {
      const configured = H.whatsAppConfigured();
      waBtn.disabled = !configured;
      waBtn.title = configured ? 'Send this demonstration cart as a WhatsApp message' : 'WhatsApp number not configured yet — see js/config.js';
    }
    UI.updateCounts();
  }

  function initCartPage() {
    renderCartPage();
    document.addEventListener('daima:cart-change', renderCartPage);

    const form = byId('cart-inquiry-form');
    if (form) {
      bindFieldClearing(form);
      const success = byId('cart-inquiry-success');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const items = cartItems();
        if (!items.length) {
          UI.toast('Your demonstration cart is empty.', 'error');
          return;
        }
        if (!validateInquiryForm(form)) return;

        const data = new FormData(form);
        const branchId = String(data.get('branch') || '');
        const name = String(data.get('name') || '').trim();
        const phone = String(data.get('phone') || '').trim();
        const note = String(data.get('message') || '').trim();
        const itemSummary = items.map(({ line, product }) => `${product.name} × ${line.qty} (${H.formatPrice(product.price)} each, demo)`).join('; ');
        const message = `Cart availability inquiry — ${items.length} demo ${items.length === 1 ? 'line' : 'lines'}. Items: ${itemSummary}${note ? '. Note: ' + note : ''}`;
        const inquiry = Store.addInquiry({
          name,
          phone,
          branch: branchId,
          message,
          productId: '',
          productName: `Cart inquiry — ${items.length} ${items.length === 1 ? 'item' : 'items'}`,
        });
        const waMessage = H.buildInquiryMessage({ items, branchId, customerName: name, message: note });
        if (success) {
          showFormSuccess(form, success, inquiry, { waMessage });
          const container = byId('cart-summary-body');
          if (container) container.classList.add('is-submitted');
        }
        UI.updateCounts();
        UI.toast(`Demo inquiry ${inquiry.reference} saved locally. No message was sent.`, 'info');
      });
    }

    byId('cart-whatsapp')?.addEventListener('click', () => {
      const items = cartItems();
      if (!items.length) return;
      if (!H.whatsAppConfigured()) {
        UI.toast('WhatsApp is not configured yet. Add a verified number in Settings or js/config.js.', 'info');
        return;
      }
      const branchId = byId('cart-branch')?.value || '';
      const note = byId('cart-note')?.value || '';
      const waMessage = H.buildInquiryMessage({ items, branchId, message: note });
      window.open(H.whatsAppLink(waMessage), '_blank', 'noopener,noreferrer');
    });

    const branch = byId('cart-branch');
    if (branch) branch.innerHTML = branchOptions('', 'Select a branch');
  }

  /* ------------------------------------------------------------------ */
  /* Branch page                                                        */
  /* ------------------------------------------------------------------ */
  function branchProfile(branch, index) {
    const wa = branchWhatsAppUrl(branch);
    const phoneHref = branch.phone ? H.phoneHref(branch.phone) : '';
    return `
    <article class="branch-profile" id="${esc(branch.id)}" aria-labelledby="profile-${branch.id}">
      <div class="branch-profile__media">
        ${imageTag(branch.image, branch.imageAlt, { width: 1200, height: 800 })}
        <span class="branch-profile__tag">Concept visual — not an actual branch photograph</span>
      </div>
      <div class="branch-profile__body">
        <span class="eyebrow">Branch ${String(index + 1).padStart(2, '0')}</span>
        <h2>${esc(branch.fullName || branch.name)}</h2>
        <p class="branch-location">${UI.icon('pin', 14)}<span>${esc(branch.location)}</span></p>
        <p class="branch-tagline" style="margin-top:12px;color:var(--muted);font-size:13px;max-width:52ch">${esc(branch.tagline || '')}</p>
        <dl class="branch-facts">
          <div class="branch-fact"><dt>Street address</dt><dd class="is-placeholder">${esc(branch.addressNote)}</dd></div>
          <div class="branch-fact"><dt>Opening hours</dt><dd class="is-placeholder">${esc(branch.hours)}</dd></div>
          <div class="branch-fact"><dt>Phone</dt><dd class="${branch.phone ? '' : 'is-placeholder'}">${esc(branch.phone || branch.phoneDisplay)}</dd></div>
          <div class="branch-fact"><dt>Product availability</dt><dd>${esc(branch.stockLabel || C.demo.availabilityNotice)}</dd></div>
        </dl>
        <div class="branch-availability">${UI.icon('spark', 14)}<span>Branch inventory has not been verified. Please contact the branch before making a trip.</span></div>
        <div class="branch-actions">
          <a class="btn btn-dark" href="${directionsUrl(branch)}" target="_blank" rel="noopener noreferrer">${UI.icon('pin', 15)} Search directions</a>
          ${phoneHref ? `<a class="btn btn-ghost" href="${esc(phoneHref)}">${UI.icon('phone', 15)} Call branch</a>` : `<button class="btn btn-ghost" type="button" disabled title="Phone number to be configured">${UI.icon('phone', 15)} Call to be configured</button>`}
          ${wa ? `<a class="btn btn-whatsapp" href="${esc(wa)}" target="_blank" rel="noopener noreferrer">${UI.icon('whatsapp', 15)} WhatsApp ${esc(branch.name)}</a>` : `<button class="btn btn-ghost" type="button" disabled title="WhatsApp number to be configured">${UI.icon('whatsapp', 15)} WhatsApp to be configured</button>`}
          <a class="btn btn-ghost" href="products.html?branch=${encodeURIComponent(branch.id)}">Browse catalogue ${UI.icon('arrow', 14)}</a>
        </div>
        <p class="micro-note" style="margin-top:14px">${esc(branch.addressNote)} Directions open a location search, not a confirmed pin.</p>
      </div>
    </article>`;
  }

  function initBranchesPage() {
    const host = byId('branch-profiles');
    if (host) {
      const branches = Store.getBranches().filter((branch) => branch.active !== false);
      host.innerHTML = branches.map((branch, index) => branchProfile(branch, index)).join('');
    }
    const count = byId('branches-count');
    if (count) count.textContent = String(Store.getBranches().filter((b) => b.active !== false).length);
  }

  /* ------------------------------------------------------------------ */
  /* Shared page polish                                                 */
  /* ------------------------------------------------------------------ */
  function initReveal() {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    items.forEach((item) => {
      item.classList.add('reveal');
      observer.observe(item);
    });
  }

  function initSeo() {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && canonical.href.includes('your-domain.example')) {
      canonical.href = location.origin + '/' + (location.pathname.split('/').pop() || 'index.html');
    }
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                               */
  /* ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    UI.init();
    const page = document.body.dataset.page;

    if (page === 'home') initHome();
    else if (page === 'catalogue') initCatalogue();
    else if (page === 'product') initProduct();
    else if (page === 'cart') initCartPage();
    else if (page === 'branches') initBranchesPage();

    initSeo();
    initReveal();
    UI.updateCounts();

    // Add a slight active state to product detail wishlist after toggling.
    document.addEventListener('daima:wishlist-change', () => {
      document.querySelectorAll('[data-wishlist]').forEach((btn) => {
        const id = btn.getAttribute('data-wishlist');
        const active = Store.isWishlisted(id);
        btn.setAttribute('aria-pressed', String(active));
        if (btn.classList.contains('product-wish')) btn.setAttribute('aria-label', `${active ? 'Remove' : 'Save'} ${Store.getProduct(id)?.name || 'product'} ${active ? 'from' : 'to'} wishlist`);
      });
    });
  });
})();
