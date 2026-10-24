/* ==========================================================================
   DAIMA COMMUNICATIONS - BUSINESS DASHBOARD BEHAVIOUR
   Local-only admin preview. Nothing here is a production security boundary.
   ========================================================================== */

(function () {
  'use strict';

  const C = DAIMA.CONFIG;
  const H = DAIMA.H;
  const Store = DAIMA.Store;
  const esc = H.escape;
  const byId = (id) => document.getElementById(id);

  const STATUS = {
    new: { label: 'New', className: 'new' },
    in_progress: { label: 'In progress', className: 'in_progress' },
    resolved: { label: 'Resolved', className: 'resolved' },
  };

  const SECTIONS = {
    overview: { title: 'Dashboard', eyebrow: 'Workspace overview' },
    products: { title: 'Products', eyebrow: 'Catalogue management' },
    inventory: { title: 'Inventory', eyebrow: 'Stock' },
    branches: { title: 'Branches', eyebrow: 'Location configuration' },
    inquiries: { title: 'Inquiries', eyebrow: 'Inquiries' },
    settings: { title: 'Settings', eyebrow: 'Configuration' },
  };

  const state = {
    section: 'overview',
    productSearch: '',
    productCategory: '',
    inventorySearch: '',
    inventoryFilter: '',
    inquirySearch: '',
    inquiryStatus: '',
    confirmAction: null,
    viewingInquiryId: '',
  };

  /* ------------------------------------------------------------------ */
  /* Small helpers                                                      */
  /* ------------------------------------------------------------------ */
  const ICON = {
    plus: '<path d="M12 5v14M5 12h14"/>',
    edit: '<path d="m4 20 4-1 11-11-3-3L5 16l-1 4Z"/><path d="m14 6 3 3"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
    warn: '<path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v5M12 17h.01"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    download: '<path d="M12 4v11M7 11l5 4 5-4M4 20h16"/>',
    store: '<path d="M4 9h16M5 9l1-5h12l1 5M6 9v11h12V9M10 20v-6h4v6"/>',
    user: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20v-1.5C3 16 5.7 14 9 14s6 2 6 4.5V20M16 4.5a3 3 0 0 1 0 6M17 14c2.4.4 4 2.2 4 4.5V20"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    phone: '<path d="M7 3h3l1.5 4-2 1.5a13 13 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 5 5.2 2 2 0 0 1 7 3Z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    refresh: '<path d="M4 11a8 8 0 0 1 14-4l2 2M20 5v4h-4M20 13a8 8 0 0 1-14 4l-2-2M4 19v-4h4"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
    pin: '<path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"/><circle cx="12" cy="10" r="2.2"/>',
  };

  function icon(name, size) {
    const body = ICON[name] || ICON.spark;
    const s = size || 15;
    return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  }

  function statusBadge(status) {
    const meta = STATUS[status] || STATUS.new;
    return `<span class="status-pill status-pill--${meta.className}">${esc(meta.label)}</span>`;
  }

  function stockMeta(product) {
    const threshold = Number(Store.getSettings().lowStockThreshold) || 5;
    const total = H.totalStock(product);
    if (total <= 0) return { total, key: 'out', label: 'Out', className: 'out' };
    if (total <= threshold) return { total, key: 'low', label: 'Low', className: 'low' };
    return { total, key: 'in', label: 'In stock', className: 'in' };
  }

  function initials(name) {
    return String(name || '?')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }

  function branchName(id) {
    if (!id) return 'No preference';
    const branch = Store.getBranch(id);
    return branch ? branch.name : id;
  }

  function currency(value) {
    return H.formatPrice(value);
  }

  function escapeAttr(value) {
    return esc(value);
  }

  function toast(message, type) {
    const region = byId('admin-toast-region');
    if (!region) return;
    const el = document.createElement('div');
    el.className = 'admin-toast admin-toast--' + (type || 'success');
    const iconName = type === 'error' ? 'warn' : type === 'info' ? 'spark' : 'check';
    el.innerHTML = `<span class="admin-toast__icon">${icon(iconName, 16)}</span><p></p><button type="button" aria-label="Dismiss notification">${icon('close', 13)}</button>`;
    el.querySelector('p').textContent = message;
    region.appendChild(el);
    el.querySelector('button').addEventListener('click', () => el.remove());
    setTimeout(() => {
      el.classList.add('is-leaving');
      setTimeout(() => el.remove(), 220);
    }, 4200);
  }

  /* ------------------------------------------------------------------ */
  /* Dialogs                                                            */
  /* ------------------------------------------------------------------ */
  function openDialog(id) {
    const dialog = byId(id);
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  function askConfirm(options) {
    const dialog = byId('confirm-dialog');
    if (!dialog) return;
    byId('confirm-title').textContent = options.title || 'Are you sure?';
    byId('confirm-message').textContent = options.message || 'This action cannot be undone.';
    const accept = byId('confirm-accept');
    accept.textContent = options.confirmLabel || 'Confirm';
    accept.classList.toggle('admin-btn--danger', options.tone !== 'primary');
    accept.classList.toggle('admin-btn--primary', options.tone === 'primary');
    state.confirmAction = typeof options.onConfirm === 'function' ? options.onConfirm : null;
    openDialog('confirm-dialog');
  }

  function closeConfirm() {
    state.confirmAction = null;
    closeDialog(byId('confirm-dialog'));
  }

  /* ------------------------------------------------------------------ */
  /* Section navigation                                                 */
  /* ------------------------------------------------------------------ */
  function showSection(name, options) {
    const key = SECTIONS[name] ? name : 'overview';
    state.section = key;
    document.querySelectorAll('[data-admin-section]').forEach((section) => {
      const active = section.getAttribute('data-admin-section') === key;
      section.classList.toggle('is-active', active);
      section.hidden = !active;
    });
    document.querySelectorAll('[data-admin-nav]').forEach((link) => {
      const active = link.getAttribute('data-admin-nav') === key;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    const meta = SECTIONS[key];
    if (byId('admin-title')) byId('admin-title').textContent = meta.title;
    if (byId('admin-eyebrow')) byId('admin-eyebrow').textContent = meta.eyebrow;
    if (options && options.hash !== false) {
      try { history.replaceState(null, '', '#' + key); } catch (error) { /* ignore file:// restrictions */ }
    }
    closeSidebar();
    if (options && options.focus) {
      const heading = document.querySelector(`[data-admin-section="${key}"] h2`);
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
    }
    if (options && options.scroll !== false) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openSidebar() {
    const sidebar = byId('admin-sidebar');
    const backdrop = document.querySelector('.admin-backdrop');
    if (!sidebar) return;
    sidebar.classList.add('is-open');
    document.body.classList.add('admin-nav-open');
    if (backdrop) backdrop.hidden = false;
    document.querySelectorAll('[data-open-sidebar]').forEach((btn) => btn.setAttribute('aria-expanded', 'true'));
  }

  function closeSidebar() {
    const sidebar = byId('admin-sidebar');
    const backdrop = document.querySelector('.admin-backdrop');
    if (sidebar) sidebar.classList.remove('is-open');
    document.body.classList.remove('admin-nav-open');
    if (backdrop) backdrop.hidden = true;
    document.querySelectorAll('[data-open-sidebar]').forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
  }

  /* ------------------------------------------------------------------ */
  /* Overview                                                           */
  /* ------------------------------------------------------------------ */
  function renderOverview() {
    const products = Store.getProducts();
    const inquiries = Store.getInquiries();
    const settings = Store.getSettings();
    const branches = Store.getBranches();
    const threshold = Number(settings.lowStockThreshold) || 5;

    const represented = new Set(products.map((p) => p.category));
    const totalUnits = products.reduce((sum, p) => sum + H.totalStock(p), 0);
    const lowCount = products.filter((p) => H.totalStock(p) <= threshold).length;
    const openCount = inquiries.filter((inq) => inq.status === 'new' || inq.status === 'in_progress').length;
    const activeBranches = branches.filter((b) => b.active !== false).length;

    if (byId('metric-products')) byId('metric-products').textContent = String(products.length);
    if (byId('metric-categories')) byId('metric-categories').textContent = String(represented.size);
    if (byId('metric-units')) byId('metric-units').textContent = totalUnits.toLocaleString('en-KE');
    if (byId('metric-lowstock')) byId('metric-lowstock').textContent = String(lowCount);
    if (byId('metric-threshold')) byId('metric-threshold').textContent = String(threshold);
    if (byId('metric-open-inquiries')) byId('metric-open-inquiries').textContent = String(openCount);
    if (byId('metric-total-inquiries')) byId('metric-total-inquiries').textContent = String(inquiries.length);
    if (byId('metric-value')) byId('metric-value').textContent = currency(H.catalogValue(products));
    if (byId('metric-branches')) byId('metric-branches').textContent = String(activeBranches);

    renderStockChart(products);
    renderStatusChart(inquiries);
    renderRecentInquiries(inquiries);
    renderActivity();

    const badge = byId('nav-inquiry-badge');
    if (badge) {
      badge.textContent = String(openCount);
      badge.hidden = openCount === 0;
    }
  }

  function renderStockChart(products) {
    const host = byId('stock-chart');
    if (!host) return;
    const rows = C.categories
      .map((category) => ({
        name: category.name,
        units: products
          .filter((product) => product.category === category.id)
          .reduce((sum, product) => sum + H.totalStock(product), 0),
      }))
      .sort((a, b) => b.units - a.units);
    const max = Math.max.apply(null, rows.map((row) => row.units).concat([1]));
    host.innerHTML = rows.map((row) => `
      <div class="bar-row">
        <span class="bar-row__label" title="${esc(row.name)}">${esc(row.name)}</span>
        <span class="bar-row__track"><span class="bar-row__fill" style="width:${Math.round((row.units / max) * 100)}%"></span></span>
        <span class="bar-row__value">${row.units}</span>
      </div>`).join('');
    host.setAttribute('aria-label', 'Bar chart of stock by category. ' + rows.map((row) => `${row.name}: ${row.units} units`).join(', '));
  }

  function renderStatusChart(inquiries) {
    const chart = byId('status-chart');
    const legend = byId('status-legend');
    if (!chart || !legend) return;
    const counts = {
      new: inquiries.filter((i) => i.status === 'new').length,
      in_progress: inquiries.filter((i) => i.status === 'in_progress').length,
      resolved: inquiries.filter((i) => i.status === 'resolved').length,
    };
    const total = inquiries.length;
    const colors = { new: '#285fee', in_progress: '#d9a62c', resolved: '#178a5b' };

    if (!total) {
      chart.style.background = 'var(--surface)';
      chart.setAttribute('aria-label', 'No inquiries saved yet.');
    } else {
      const newDeg = (counts.new / total) * 360;
      const progressDeg = newDeg + (counts.in_progress / total) * 360;
      chart.style.background = `conic-gradient(${colors.new} 0deg ${newDeg}deg, ${colors.in_progress} ${newDeg}deg ${progressDeg}deg, ${colors.resolved} ${progressDeg}deg 360deg)`;
      chart.setAttribute(
        'aria-label',
        `Inquiry status donut chart. New: ${counts.new}, in progress: ${counts.in_progress}, resolved: ${counts.resolved}, total: ${total}.`
      );
    }
    if (byId('donut-total')) byId('donut-total').textContent = String(total);
    legend.innerHTML = Object.keys(STATUS)
      .map((key) => `
        <span class="legend-row">
          <span class="legend-dot" style="background:${colors[key]}"></span>
          <span>${esc(STATUS[key].label)}</span>
          <strong>${counts[key]}</strong>
        </span>`)
      .join('');
  }

  function renderRecentInquiries(inquiries) {
    const host = byId('recent-inquiries');
    if (!host) return;
    const recent = inquiries
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
    if (!recent.length) {
      host.innerHTML = '<p class="admin-empty-line">No inquiries have been saved yet.</p>';
      return;
    }
    host.innerHTML = recent.map((inquiry) => `
      <div class="admin-list-row">
        <span class="admin-list-row__avatar">${esc(initials(inquiry.name))}</span>
        <div class="admin-list-row__main">
          <strong>${esc(inquiry.name || 'Unnamed customer')}</strong>
          <span>${esc(inquiry.productName || 'General enquiry')} · ${esc(branchName(inquiry.branch))}</span>
        </div>
        <div class="admin-list-row__meta">
          ${statusBadge(inquiry.status)}
          <time datetime="${escapeAttr(inquiry.createdAt)}">${esc(H.formatDate(inquiry.createdAt))}</time>
        </div>
      </div>`).join('');
  }

  function renderActivity() {
    const host = byId('activity-feed');
    if (!host) return;
    const feed = Store.getActivity().slice(0, 6);
    if (!feed.length) {
      host.innerHTML = '<p class="admin-empty-line">No activity recorded yet.</p>';
      return;
    }
    host.innerHTML = feed.map((item) => `
      <div class="activity-row">
        <span class="activity-row__dot" aria-hidden="true"></span>
        <div class="activity-row__main">
          <strong>${esc(item.action || 'Activity')}</strong>
          <span>${esc(item.detail || '')}</span>
          <time datetime="${escapeAttr(item.at || '')}">${esc(H.formatDateTime(item.at))}</time>
        </div>
      </div>`).join('');
  }

  /* ------------------------------------------------------------------ */
  /* Products                                                           */
  /* ------------------------------------------------------------------ */
  function populateCategorySelects() {
    const options = C.categories.map((category) => `<option value="${esc(category.id)}">${esc(category.name)}</option>`).join('');
    const filter = byId('product-category-filter');
    if (filter) filter.innerHTML = `<option value="">All categories</option>${options}`;
    const formSelect = byId('product-category');
    if (formSelect) formSelect.innerHTML = options;
    const brands = Array.from(new Set(Store.getProducts().map((product) => product.brand).concat(C.brands || [])))
      .filter(Boolean)
      .sort();
    const datalist = byId('brand-options');
    if (datalist) datalist.innerHTML = brands.map((brand) => `<option value="${esc(brand)}"></option>`).join('');
  }

  function filteredProducts() {
    const q = state.productSearch.toLowerCase();
    return Store.getProducts().filter((product) => {
      if (state.productCategory && product.category !== state.productCategory) return false;
      if (!q) return true;
      return [product.name, product.brand, product.model, product.sku, H.category(product.category).name]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }

  function renderProducts() {
    const host = byId('products-table');
    const empty = byId('products-empty');
    if (!host) return;
    const products = filteredProducts();
    if (byId('product-count')) byId('product-count').textContent = `${products.length} ${products.length === 1 ? 'product' : 'products'}`;
    if (empty) empty.hidden = products.length > 0;
    if (!products.length) {
      host.innerHTML = '';
      return;
    }
    host.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Category</th>
            <th scope="col">Indicative price</th>
            <th scope="col">Stock</th>
            <th scope="col">Stock note</th>
            <th scope="col"><span class="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          ${products.map((product) => {
            const stock = stockMeta(product);
            const category = H.category(product.category);
            return `<tr>
              <td>
                <div class="table-product">
                  <span class="table-product__img"><img src="${escapeAttr(product.image || 'assets/images/fallback.svg')}" alt="" width="38" height="38" loading="lazy" /></span>
                  <span class="table-product__main">
                    <strong title="${escapeAttr(product.name)}">${esc(product.name)}</strong>
                    <span>${esc(product.brand)} · ${esc(product.sku)}</span>
                  </span>
                </div>
              </td>
              <td>${esc(category.name)}<span class="table-muted" style="display:block">${esc(product.model || 'Model not set')}</span></td>
              <td class="table-price">${esc(currency(product.price))}<span class="table-muted" style="display:block;font-weight:400">indicative price</span></td>
              <td><span class="stock-total">${stock.total}</span><span class="table-muted" style="display:block">S: ${H.totalStock({ stock: { sirare: product.stock ? product.stock.sirare : 0, kehancha: 0 } })} · K: ${H.totalStock({ stock: { sirare: 0, kehancha: product.stock ? product.stock.kehancha : 0 } })}</span></td>
              <td><span class="stock-note stock-note--${stock.className}"><span class="stock-dot"></span>${esc(stock.label)}</span></td>
              <td>
                <div class="table-actions">
                  <button class="table-action" type="button" data-edit-product="${escapeAttr(product.id)}" aria-label="Edit ${escapeAttr(product.name)}" title="Edit product">${icon('edit', 14)}</button>
                  <button class="table-action table-action--danger" type="button" data-delete-product="${escapeAttr(product.id)}" aria-label="Delete ${escapeAttr(product.name)}" title="Delete product">${icon('trash', 14)}</button>
                </div>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>`;
  }

  function clearFieldErrors(form) {
    form.querySelectorAll('.has-error').forEach((field) => field.classList.remove('has-error'));
    form.querySelectorAll('.admin-field__error').forEach((error) => { error.textContent = ''; });
    form.querySelectorAll('[aria-invalid="true"]').forEach((input) => input.removeAttribute('aria-invalid'));
  }

  function setFieldError(input, message) {
    if (!input) return;
    const field = input.closest('.admin-field') || input.closest('.admin-toggle');
    if (!field) return;
    field.classList.add('has-error');
    input.setAttribute('aria-invalid', 'true');
    const error = field.querySelector('.admin-field__error');
    if (error) error.textContent = message;
  }

  function openProductDialog(id) {
    const form = byId('product-form');
    const dialog = byId('product-dialog');
    if (!form || !dialog) return;
    form.reset();
    clearFieldErrors(form);
    populateCategorySelects();

    const product = id ? Store.getProduct(id) : null;
    byId('product-dialog-title').textContent = product ? 'Edit product' : 'Add product';
    byId('product-id').value = product ? product.id : '';
    byId('product-name').value = product ? product.name : '';
    byId('product-brand').value = product ? product.brand : '';
    byId('product-model').value = product ? product.model || '' : '';
    byId('product-category').value = product ? product.category : C.categories[0].id;
    byId('product-sku').value = product ? product.sku : '';
    byId('product-price').value = product ? Number(product.price) : '';
    byId('product-featured').checked = Boolean(product && product.featured);
    byId('product-stock-sirare').value = product && product.stock ? Number(product.stock.sirare) || 0 : 0;
    byId('product-stock-kehancha').value = product && product.stock ? Number(product.stock.kehancha) || 0 : 0;
    byId('product-image').value = product ? product.image || '' : 'assets/images/fallback.svg';
    byId('product-description').value = product ? product.description || '' : '';
    byId('product-highlights').value = product && Array.isArray(product.highlights) ? product.highlights.join('\n') : '';
    openDialog('product-dialog');
    setTimeout(() => byId('product-name').focus(), 80);
  }

  function saveProductFromForm(event) {
    event.preventDefault();
    const form = byId('product-form');
    if (!form) return;
    clearFieldErrors(form);

    const elements = form.elements;
    const name = elements.name.value.trim();
    const brand = elements.brand.value.trim();
    const category = elements.category.value;
    const sku = elements.sku.value.trim();
    const priceValue = elements.price.value;
    const price = Number(priceValue);
    const sirare = Number(elements.stockSirare.value || 0);
    const kehancha = Number(elements.stockKehancha.value || 0);
    let invalid = null;

    if (name.length < 2) { setFieldError(elements.name, 'Enter a product name (at least 2 characters).'); invalid = invalid || elements.name; }
    if (!brand) { setFieldError(elements.brand, 'Enter a brand.'); invalid = invalid || elements.brand; }
    if (!C.categories.some((item) => item.id === category)) { setFieldError(elements.category, 'Choose a valid category.'); invalid = invalid || elements.category; }
    if (sku.length < 2) { setFieldError(elements.sku, 'Enter a SKU of at least 2 characters.'); invalid = invalid || elements.sku; }
    if (priceValue === '' || !Number.isFinite(price) || price < 0) { setFieldError(elements.price, 'Enter a non-negative price.'); invalid = invalid || elements.price; }
    if (!Number.isFinite(sirare) || sirare < 0) { setFieldError(elements.stockSirare, 'Stock cannot be negative.'); invalid = invalid || elements.stockSirare; }
    if (!Number.isFinite(kehancha) || kehancha < 0) { setFieldError(elements.stockKehancha, 'Stock cannot be negative.'); invalid = invalid || elements.stockKehancha; }

    const duplicate = Store.getProducts().find((product) => product.sku.toLowerCase() === sku.toLowerCase() && product.id !== elements.id.value);
    if (duplicate && !invalid) { setFieldError(elements.sku, 'This SKU is already used by another product.'); invalid = elements.sku; }

    if (invalid) {
      invalid.focus();
      return;
    }

    const existing = elements.id.value ? Store.getProduct(elements.id.value) : null;
    const image = elements.image.value.trim() || 'assets/images/fallback.svg';
    const highlights = elements.highlights.value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 12);
    const now = new Date().toISOString();
    const product = {
      id: existing ? existing.id : Store.nextProductId(),
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      name,
      brand,
      model: elements.model.value.trim(),
      category,
      price: Math.round(price),
      sku,
      image,
      gallery: existing ? existing.gallery || [image] : [image],
      description: elements.description.value.trim() || 'A product created in the local dashboard. Confirm all details with the branch.',
      highlights,
      specs: existing ? existing.specs || [] : [],
      stock: { sirare: Math.round(sirare), kehancha: Math.round(kehancha) },
      featured: elements.featured.checked,
      compareAt: null,
      colors: existing ? existing.colors || [] : [],
      demo: false,
      stockNote: 'Stock data stored in this browser only.',
      specsNote: 'Confirm the exact model, variant and specification with the branch.',
      createdAt: existing ? existing.createdAt || now : now,
      updatedAt: now,
    };

    Store.saveProduct(product);
    Store.logActivity(existing ? 'Product edited' : 'Product created', `${product.name} — local catalogue updated.`);
    closeDialog(byId('product-dialog'));
    refreshDataViews();
    toast(existing ? 'Product updated.' : 'Product added.', 'success');
  }

  function requestDeleteProduct(id) {
    const product = Store.getProduct(id);
    if (!product) return;
    askConfirm({
      title: 'Delete this product?',
      message: `“${product.name}” will be removed from this browser's catalogue. Cart lines referencing it will no longer display a product. This cannot be undone.`,
      confirmLabel: 'Delete product',
      onConfirm: () => {
        Store.deleteProduct(id);
        Store.logActivity('Product deleted', `${product.name} - removed from the local catalogue.`);
        refreshDataViews();
        toast('Product deleted.', 'info');
      },
    });
  }

  /* ------------------------------------------------------------------ */
  /* Inventory                                                          */
  /* ------------------------------------------------------------------ */
  function filteredInventory() {
    const q = state.inventorySearch.toLowerCase();
    const threshold = Number(Store.getSettings().lowStockThreshold) || 5;
    return Store.getProducts().filter((product) => {
      const total = H.totalStock(product);
      if (state.inventoryFilter === 'low' && !(total > 0 && total <= threshold)) return false;
      if (state.inventoryFilter === 'out' && total !== 0) return false;
      if (!q) return true;
      return [product.name, product.brand, product.sku].join(' ').toLowerCase().includes(q);
    });
  }

  function renderInventory() {
    const host = byId('inventory-table');
    const empty = byId('inventory-empty');
    if (!host) return;
    const threshold = Number(Store.getSettings().lowStockThreshold) || 5;
    if (byId('inventory-threshold') && document.activeElement !== byId('inventory-threshold')) {
      byId('inventory-threshold').value = String(threshold);
    }
    const products = filteredInventory();
    if (empty) empty.hidden = products.length > 0;
    if (!products.length) {
      host.innerHTML = '';
      if (byId('inventory-summary')) byId('inventory-summary').textContent = '0 products in this filtered view.';
      return;
    }
    host.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Sirare units</th>
            <th scope="col">Kehancha units</th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          ${products.map((product) => {
            const stock = stockMeta(product);
            const sirare = product.stock ? Number(product.stock.sirare) || 0 : 0;
            const kehancha = product.stock ? Number(product.stock.kehancha) || 0 : 0;
            return `<tr>
              <td>
                <div class="table-product">
                  <span class="table-product__img"><img src="${escapeAttr(product.image || 'assets/images/fallback.svg')}" alt="" width="38" height="38" loading="lazy" /></span>
                  <span class="table-product__main">
                    <strong>${esc(product.name)}</strong>
                    <span>${esc(product.brand)} · ${esc(product.sku)}</span>
                  </span>
                </div>
              </td>
              <td><label class="sr-only" for="stock-sirare-${escapeAttr(product.id)}">Sirare units for ${escapeAttr(product.name)}</label><input class="stock-input" id="stock-sirare-${escapeAttr(product.id)}" type="number" min="0" step="1" inputmode="numeric" value="${sirare}" data-stock-id="${escapeAttr(product.id)}" data-stock-branch="sirare" /></td>
              <td><label class="sr-only" for="stock-kehancha-${escapeAttr(product.id)}">Kehancha units for ${escapeAttr(product.name)}</label><input class="stock-input" id="stock-kehancha-${escapeAttr(product.id)}" type="number" min="0" step="1" inputmode="numeric" value="${kehancha}" data-stock-id="${escapeAttr(product.id)}" data-stock-branch="kehancha" /></td>
              <td><span class="stock-total">${stock.total}</span></td>
              <td><span class="stock-note stock-note--${stock.className}"><span class="stock-dot"></span>${esc(stock.label)}</span></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>`;
    if (byId('inventory-summary')) {
      const units = products.reduce((sum, product) => sum + H.totalStock(product), 0);
      byId('inventory-summary').textContent = `${units.toLocaleString('en-KE')} units across ${products.length} ${products.length === 1 ? 'listing' : 'listings'} in this view. Threshold: ${threshold}.`;
    }
  }

  function saveInventory() {
    const inputs = Array.from(document.querySelectorAll('[data-stock-id][data-stock-branch]'));
    let invalid = null;
    inputs.forEach((input) => {
      const value = Number(input.value);
      if (!Number.isFinite(value) || value < 0) {
        input.style.borderColor = 'var(--danger)';
        invalid = invalid || input;
      } else {
        input.style.borderColor = '';
      }
    });
    if (invalid) {
      invalid.focus();
      toast('Stock values must be zero or greater.', 'error');
      return;
    }
    const products = Store.getProducts();
    let changed = 0;
    products.forEach((product) => {
      ['sirare', 'kehancha'].forEach((branch) => {
        const input = document.querySelector(`[data-stock-id="${product.id}"][data-stock-branch="${branch}"]`);
        if (!input) return;
        const next = Math.round(Number(input.value) || 0);
        product.stock = product.stock || { sirare: 0, kehancha: 0 };
        if (Number(product.stock[branch]) !== next) changed += 1;
        product.stock[branch] = next;
      });
      product.updatedAt = new Date().toISOString();
    });
    Store.saveProducts(products);
    Store.logActivity('Inventory updated', `${changed} branch stock ${changed === 1 ? 'value' : 'values'} changed in the local inventory.`);
    refreshDataViews();
    toast(changed ? `Inventory saved — ${changed} stock ${changed === 1 ? 'value' : 'values'} changed.` : 'No stock changes to save.', 'success');
  }

  function applyThreshold() {
    const input = byId('inventory-threshold');
    if (!input) return;
    const value = Number(input.value);
    if (!Number.isInteger(value) || value < 0 || value > 999) {
      input.style.borderColor = 'var(--danger)';
      toast('Enter a whole-number threshold between 0 and 999.', 'error');
      return;
    }
    input.style.borderColor = '';
    Store.saveSettings({ lowStockThreshold: value });
    Store.logActivity('Low-stock threshold updated', `Low-stock threshold set to ${value}.`);
    if (byId('settings-threshold')) byId('settings-threshold').value = String(value);
    renderOverview();
    renderInventory();
    toast(`Low-stock threshold set to ${value}.`, 'success');
  }

  /* ------------------------------------------------------------------ */
  /* Branches                                                           */
  /* ------------------------------------------------------------------ */
  function renderBranches() {
    const host = byId('branch-forms');
    if (!host) return;
    const branches = Store.getBranches();
    host.innerHTML = branches.map((branch, index) => `
      <form class="branch-admin-card" data-branch-form="${escapeAttr(branch.id)}" novalidate>
        <header class="branch-admin-card__head">
          <div>
            <span>Branch ${String(index + 1).padStart(2, '0')}</span>
            <h3>${esc(branch.name)}</h3>
          </div>
          <span class="admin-chip">${branch.active === false ? 'Inactive' : 'Active'}</span>
        </header>
        <div class="branch-admin-card__body">
          <div class="admin-form-grid">
            <div class="admin-field">
              <label for="branch-${escapeAttr(branch.id)}-name">Branch name <span class="req">*</span></label>
              <input id="branch-${escapeAttr(branch.id)}-name" name="name" type="text" maxlength="40" value="${escapeAttr(branch.name)}" required />
              <span class="admin-field__error" role="alert"></span>
            </div>
            <div class="admin-field">
              <label for="branch-${escapeAttr(branch.id)}-full">Full display name</label>
              <input id="branch-${escapeAttr(branch.id)}-full" name="fullName" type="text" maxlength="80" value="${escapeAttr(branch.fullName || '')}" />
            </div>
            <div class="admin-field admin-field--full">
              <label for="branch-${escapeAttr(branch.id)}-location">Location description</label>
              <input id="branch-${escapeAttr(branch.id)}-location" name="location" type="text" maxlength="120" value="${escapeAttr(branch.location || '')}" />
            </div>
            <div class="admin-field admin-field--full">
              <label for="branch-${escapeAttr(branch.id)}-address">Street address / verification note</label>
              <input id="branch-${escapeAttr(branch.id)}-address" name="addressNote" type="text" maxlength="160" value="${escapeAttr(branch.addressNote || '')}" />
              <span class="admin-field__hint">Clearly mark unverified details. Do not enter invented addresses.</span>
            </div>
            <div class="admin-field">
              <label for="branch-${escapeAttr(branch.id)}-hours">Opening hours</label>
              <input id="branch-${escapeAttr(branch.id)}-hours" name="hours" type="text" maxlength="120" value="${escapeAttr(branch.hours || '')}" />
            </div>
            <div class="admin-field">
              <label for="branch-${escapeAttr(branch.id)}-phone">Phone number</label>
              <input id="branch-${escapeAttr(branch.id)}-phone" name="phone" type="tel" inputmode="tel" maxlength="24" value="${escapeAttr(branch.phone || '')}" placeholder="+254…" />
              <span class="admin-field__error" role="alert"></span>
            </div>
            <div class="admin-field">
              <label for="branch-${escapeAttr(branch.id)}-whatsapp">WhatsApp number</label>
              <input id="branch-${escapeAttr(branch.id)}-whatsapp" name="whatsapp" type="tel" inputmode="tel" maxlength="24" value="${escapeAttr(branch.whatsapp || '')}" placeholder="2547XXXXXXXX" />
              <span class="admin-field__error" role="alert"></span>
            </div>
            <div class="admin-field">
              <label for="branch-${escapeAttr(branch.id)}-maps">Maps search phrase</label>
              <input id="branch-${escapeAttr(branch.id)}-maps" name="mapsQuery" type="text" maxlength="160" value="${escapeAttr(branch.mapsQuery || '')}" />
            </div>
            <div class="admin-field admin-field--full">
              <label for="branch-${escapeAttr(branch.id)}-stock">Availability note</label>
              <input id="branch-${escapeAttr(branch.id)}-stock" name="stockLabel" type="text" maxlength="140" value="${escapeAttr(branch.stockLabel || '')}" />
            </div>
            <div class="admin-field admin-field--full">
              <label class="admin-toggle admin-toggle--compact">
                <span><strong>Show this branch on the public website</strong><small>Inactive branches remain editable but are hidden from public branch lists.</small></span>
                <input type="checkbox" name="active" ${branch.active === false ? '' : 'checked'} />
              </label>
            </div>
          </div>
        </div>
        <footer class="branch-admin-card__foot">
          <span class="table-muted">Changes save to this browser only.</span>
          <button class="admin-btn admin-btn--primary admin-btn--sm" type="submit">Save branch</button>
        </footer>
      </form>`).join('');
  }

  function saveBranch(form) {
    const id = form.getAttribute('data-branch-form');
    const branches = Store.getBranches();
    const index = branches.findIndex((branch) => branch.id === id);
    if (index < 0) return;
    clearFieldErrors(form);
    const elements = form.elements;
    const name = elements.name.value.trim();
    if (name.length < 2) {
      setFieldError(elements.name, 'Enter a branch name.');
      elements.name.focus();
      return;
    }
    const phoneDigits = H.digits(elements.phone.value);
    if (elements.phone.value.trim() && (phoneDigits.length < 9 || phoneDigits.length > 15)) {
      setFieldError(elements.phone, 'Enter a valid phone number with 9–15 digits, or leave blank.');
      elements.phone.focus();
      return;
    }
    const waDigits = H.digits(elements.whatsapp.value);
    if (elements.whatsapp.value.trim() && (waDigits.length < 9 || waDigits.length > 15)) {
      setFieldError(elements.whatsapp, 'Use international format with 9–15 digits, or leave blank.');
      elements.whatsapp.focus();
      return;
    }

    branches[index] = Object.assign({}, branches[index], {
      name,
      fullName: elements.fullName.value.trim() || `DAIMA COMMUNICATIONS — ${name.toUpperCase()}`,
      location: elements.location.value.trim(),
      addressNote: elements.addressNote.value.trim(),
      hours: elements.hours.value.trim(),
      phone: elements.phone.value.trim(),
      phoneDisplay: elements.phone.value.trim() || 'Call the main number',
      whatsapp: elements.whatsapp.value.trim(),
      mapsQuery: elements.mapsQuery.value.trim(),
      stockLabel: elements.stockLabel.value.trim(),
      active: elements.active.checked,
    });
    Store.saveBranches(branches);
    Store.logActivity('Branch updated', `${name} — local branch details updated.`);
    renderBranches();
    renderOverview();
    toast(`${name} branch details saved locally.`, 'success');
  }

  /* ------------------------------------------------------------------ */
  /* Inquiries                                                          */
  /* ------------------------------------------------------------------ */
  function filteredInquiries() {
    const q = state.inquirySearch.toLowerCase();
    return Store.getInquiries()
      .filter((inquiry) => {
        if (state.inquiryStatus && inquiry.status !== state.inquiryStatus) return false;
        if (!q) return true;
        return [inquiry.reference, inquiry.name, inquiry.phone, inquiry.productName, inquiry.message]
          .join(' ')
          .toLowerCase()
          .includes(q);
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function renderInquiries() {
    const host = byId('inquiries-list');
    const empty = byId('inquiries-empty');
    if (!host) return;
    const inquiries = filteredInquiries();
    if (byId('inquiry-count')) byId('inquiry-count').textContent = `${Store.getInquiries().length} ${Store.getInquiries().length === 1 ? 'inquiry' : 'inquiries'}`;
    if (byId('inquiry-result-count')) byId('inquiry-result-count').textContent = `${inquiries.length} shown`;
    if (empty) empty.hidden = inquiries.length > 0;
    if (!inquiries.length) {
      host.innerHTML = '';
      return;
    }
    host.innerHTML = inquiries.map((inquiry) => `
      <article class="inquiry-card">
        <div class="inquiry-card__main">
          <div class="inquiry-card__top">
            <span class="inquiry-card__ref">${esc(inquiry.reference)}</span>
            ${statusBadge(inquiry.status)}
          </div>
          <strong>${esc(inquiry.name || 'Unnamed customer')} · ${esc(inquiry.productName || 'General enquiry')}</strong>
          <p>${esc(inquiry.message || 'No message supplied.')}</p>
        </div>
        <div class="inquiry-card__meta">
          <strong>${esc(branchName(inquiry.branch))}</strong>
          <span>${esc(H.formatDateTime(inquiry.createdAt))}</span>
          <span>${esc(inquiry.phone || 'No phone supplied')}</span>
        </div>
        <div class="inquiry-card__actions">
          <label class="sr-only" for="status-${escapeAttr(inquiry.id)}">Update status for ${escapeAttr(inquiry.reference)}</label>
          <select class="inquiry-status-select" id="status-${escapeAttr(inquiry.id)}" data-inquiry-status="${escapeAttr(inquiry.id)}">
            ${Object.keys(STATUS).map((key) => `<option value="${key}"${inquiry.status === key ? ' selected' : ''}>${esc(STATUS[key].label)}</option>`).join('')}
          </select>
          <button class="table-action" type="button" data-view-inquiry="${escapeAttr(inquiry.id)}" aria-label="View inquiry ${escapeAttr(inquiry.reference)}" title="View inquiry">${icon('eye', 14)}</button>
          <button class="table-action table-action--danger" type="button" data-delete-inquiry="${escapeAttr(inquiry.id)}" aria-label="Delete inquiry ${escapeAttr(inquiry.reference)}" title="Delete inquiry">${icon('trash', 14)}</button>
        </div>
      </article>`).join('');
  }

  function openInquiry(id) {
    const inquiry = Store.getInquiries().find((item) => item.id === id);
    if (!inquiry) return;
    state.viewingInquiryId = id;
    const body = byId('inquiry-detail-body');
    if (!body) return;
    body.innerHTML = `
      <div class="inquiry-detail">
        <dl class="inquiry-detail__meta">
          <div><dt>Reference</dt><dd>${esc(inquiry.reference)}</dd></div>
          <div><dt>Status</dt><dd>${statusBadge(inquiry.status)}</dd></div>
          <div><dt>Customer</dt><dd>${esc(inquiry.name || 'Unnamed customer')}</dd></div>
          <div><dt>Phone</dt><dd>${esc(inquiry.phone || 'Not supplied')}</dd></div>
          <div><dt>Product</dt><dd>${esc(inquiry.productName || 'General enquiry')}</dd></div>
          <div><dt>Branch</dt><dd>${esc(branchName(inquiry.branch))}</dd></div>
          <div><dt>Received</dt><dd>${esc(H.formatDateTime(inquiry.createdAt))}</dd></div>
          <div><dt>Email</dt><dd>${esc(inquiry.email || 'Not supplied')}</dd></div>
        </dl>
        <div class="inquiry-detail__message">${esc(inquiry.message || 'No message supplied.')}</div>
        <p class="admin-small-note">Local inquiry record only. No reply has been sent from this browser. Confirm contact details before acting on them.</p>
        <div class="inquiry-detail__foot">
          <label class="sr-only" for="detail-status">Inquiry status</label>
          <select class="inquiry-status-select" id="detail-status" data-inquiry-status="${escapeAttr(inquiry.id)}">
            ${Object.keys(STATUS).map((key) => `<option value="${key}"${inquiry.status === key ? ' selected' : ''}>${esc(STATUS[key].label)}</option>`).join('')}
          </select>
          <span class="admin-chip">Saved locally</span>
        </div>
      </div>`;
    openDialog('inquiry-dialog');
  }

  function updateInquiryStatus(id, status) {
    if (!STATUS[status]) return;
    const inquiry = Store.getInquiries().find((item) => item.id === id);
    if (!inquiry) return;
    Store.updateInquiry(id, { status });
    Store.logActivity('Inquiry status updated', `${inquiry.reference} marked ${STATUS[status].label.toLowerCase()} in the local inbox.`);
    renderInquiries();
    renderOverview();
    if (state.viewingInquiryId === id && byId('inquiry-dialog') && byId('inquiry-dialog').open) openInquiry(id);
    toast(`Inquiry ${inquiry.reference} marked ${STATUS[status].label.toLowerCase()}.`, 'success');
  }

  function requestDeleteInquiry(id) {
    const inquiry = Store.getInquiries().find((item) => item.id === id);
    if (!inquiry) return;
    askConfirm({
      title: 'Delete this inquiry?',
      message: `${inquiry.reference} from ${inquiry.name || 'an unnamed customer'} will be permanently removed from this browser's inbox. No real message is affected.`,
      confirmLabel: 'Delete inquiry',
      onConfirm: () => {
        Store.deleteInquiry(id);
        Store.logActivity('Inquiry deleted', `${inquiry.reference} removed from the local inbox.`);
        if (state.viewingInquiryId === id) {
          state.viewingInquiryId = '';
          closeDialog(byId('inquiry-dialog'));
        }
        renderInquiries();
        renderOverview();
        toast('Inquiry deleted.', 'info');
      },
    });
  }

  /* ------------------------------------------------------------------ */
  /* Settings                                                           */
  /* ------------------------------------------------------------------ */
  function fillSettingsForm() {
    const settings = Store.getSettings();
    const form = byId('settings-form');
    if (!form) return;
    const elements = form.elements;
    elements.businessName.value = settings.businessName || C.business.name;
    elements.currencySymbol.value = settings.currencySymbol || C.currency.symbol;
    elements.whatsappNumber.value = settings.whatsappNumber || '';
    elements.lowStockThreshold.value = String(Number(settings.lowStockThreshold) || 5);
    elements.catalogueNote.value = settings.catalogueNote || '';
    elements.showDemoBadges.checked = Boolean(settings.showDemoBadges);
    elements.cataloguePriceDisplay.checked = Boolean(settings.cataloguePriceDisplay);
    elements.demoBanner.checked = Boolean(settings.demoBanner);
    elements.filterByBranch.checked = Boolean(settings.filterByBranch);
  }

  function saveSettings(event) {
    event.preventDefault();
    const form = byId('settings-form');
    if (!form) return;
    clearFieldErrors(form);
    const elements = form.elements;
    const businessName = elements.businessName.value.trim();
    const currencySymbol = elements.currencySymbol.value.trim();
    const thresholdValue = Number(elements.lowStockThreshold.value);
    const waDigits = H.digits(elements.whatsappNumber.value);
    let invalid = null;

    if (businessName.length < 2) { setFieldError(elements.businessName, 'Enter a business name.'); invalid = invalid || elements.businessName; }
    if (!currencySymbol) { setFieldError(elements.currencySymbol, 'Enter a currency symbol.'); invalid = invalid || elements.currencySymbol; }
    if (!Number.isInteger(thresholdValue) || thresholdValue < 0 || thresholdValue > 999) { setFieldError(elements.lowStockThreshold, 'Use a whole number between 0 and 999.'); invalid = invalid || elements.lowStockThreshold; }
    if (elements.whatsappNumber.value.trim() && (waDigits.length < 9 || waDigits.length > 15)) {
      setFieldError(elements.whatsappNumber, 'Use 9–15 digits in international format, or leave blank.');
      invalid = invalid || elements.whatsappNumber;
    }
    if (invalid) {
      invalid.focus();
      return;
    }

    Store.saveSettings({
      businessName,
      currencySymbol,
      whatsappNumber: elements.whatsappNumber.value.trim(),
      lowStockThreshold: thresholdValue,
      catalogueNote: elements.catalogueNote.value.trim(),
      showDemoBadges: elements.showDemoBadges.checked,
      cataloguePriceDisplay: elements.cataloguePriceDisplay.checked,
      demoBanner: elements.demoBanner.checked,
      filterByBranch: elements.filterByBranch.checked,
    });
    Store.logActivity('Settings updated', 'Business display, catalogue and WhatsApp configuration saved locally.');
    refreshDataViews();
    toast('Settings saved in this browser.', 'success');
  }

  function resetSettings() {
    askConfirm({
      title: 'Reset settings?',
      message: 'Business name, currency, WhatsApp number and display toggles will return to their configured defaults. Products, branches and inquiries are not affected.',
      confirmLabel: 'Reset settings',
      onConfirm: () => {
        Store.resetSettings();
        Store.logActivity('Settings reset', 'Settings returned to the config.js defaults.');
        fillSettingsForm();
        refreshDataViews();
        toast('Settings reset to defaults.', 'info');
      },
    });
  }

  function exportData() {
    const payload = {
      project: 'DAIMA COMMUNICATIONS website',
      exportedAt: new Date().toISOString(),
      notice: 'Local preview export. This is not a backup of live business data and may contain test entries.',
      products: Store.getProducts(),
      branches: Store.getBranches(),
      inquiries: Store.getInquiries(),
      settings: Store.getSettings(),
      activity: Store.getActivity(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `daima-data-${date}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Data export prepared.', 'success');
  }

  function resetAllData() {
    askConfirm({
      title: 'Reset all data?',
      message: 'Products, inventory, branches, inquiries, settings, cart and wishlist will be cleared from this browser and the seeded catalogue restored. This cannot be undone.',
      confirmLabel: 'Reset all data',
      onConfirm: () => {
        Store.resetAll();
        Store.getProducts();
        Store.getInquiries();
        Store.getActivity();
        Store.logActivity('Data reset', 'Seeded products, inquiries and activity restored in this browser.');
        state.productSearch = '';
        state.productCategory = '';
        state.inventorySearch = '';
        state.inventoryFilter = '';
        state.inquirySearch = '';
        state.inquiryStatus = '';
        if (byId('product-search')) byId('product-search').value = '';
        if (byId('product-category-filter')) byId('product-category-filter').value = '';
        if (byId('inventory-search')) byId('inventory-search').value = '';
        if (byId('inventory-filter')) byId('inventory-filter').value = '';
        if (byId('inquiry-search')) byId('inquiry-search').value = '';
        if (byId('inquiry-status-filter')) byId('inquiry-status-filter').value = '';
        populateCategorySelects();
        fillSettingsForm();
        refreshDataViews();
        toast('All data reset to seeded defaults.', 'info');
      },
    });
  }

  /* ------------------------------------------------------------------ */
  /* Refresh helpers & event wiring                                     */
  /* ------------------------------------------------------------------ */
  function refreshDataViews() {
    populateCategorySelects();
    renderOverview();
    renderProducts();
    renderInventory();
    renderInquiries();
    renderBranches();
  }

  function bindNavigation() {
    document.addEventListener('click', (event) => {
      const nav = event.target.closest('[data-admin-nav]');
      if (nav) {
        event.preventDefault();
        showSection(nav.getAttribute('data-admin-nav'), { focus: true });
        return;
      }
      const openSidebarBtn = event.target.closest('[data-open-sidebar]');
      if (openSidebarBtn) {
        event.preventDefault();
        openSidebar();
        return;
      }
      if (event.target.closest('[data-close-sidebar]')) {
        event.preventDefault();
        closeSidebar();
        return;
      }
      if (event.target.closest('[data-open-product]')) {
        event.preventDefault();
        openProductDialog('');
        return;
      }
      const edit = event.target.closest('[data-edit-product]');
      if (edit) {
        event.preventDefault();
        openProductDialog(edit.getAttribute('data-edit-product'));
        return;
      }
      const del = event.target.closest('[data-delete-product]');
      if (del) {
        event.preventDefault();
        requestDeleteProduct(del.getAttribute('data-delete-product'));
        return;
      }
      const view = event.target.closest('[data-view-inquiry]');
      if (view) {
        event.preventDefault();
        openInquiry(view.getAttribute('data-view-inquiry'));
        return;
      }
      const deleteInquiryBtn = event.target.closest('[data-delete-inquiry]');
      if (deleteInquiryBtn) {
        event.preventDefault();
        requestDeleteInquiry(deleteInquiryBtn.getAttribute('data-delete-inquiry'));
        return;
      }
      const close = event.target.closest('[data-close-admin-dialog]');
      if (close) {
        event.preventDefault();
        const dialog = close.closest('dialog');
        closeDialog(dialog);
        return;
      }
    });

    window.addEventListener('hashchange', () => {
      const name = location.hash.replace('#', '');
      if (SECTIONS[name] && name !== state.section) showSection(name, { hash: false, focus: true });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) closeSidebar();
    });
  }

  function bindForms() {
    const productForm = byId('product-form');
    if (productForm) {
      productForm.addEventListener('submit', saveProductFromForm);
      productForm.querySelectorAll('input, select, textarea').forEach((input) => {
        input.addEventListener('input', () => {
          const field = input.closest('.admin-field');
          if (field) field.classList.remove('has-error');
        });
      });
    }

    const settingsForm = byId('settings-form');
    if (settingsForm) {
      settingsForm.addEventListener('submit', saveSettings);
      settingsForm.querySelectorAll('input, select, textarea').forEach((input) => {
        input.addEventListener('input', () => {
          const field = input.closest('.admin-field');
          if (field) field.classList.remove('has-error');
        });
      });
    }

    const branchHost = byId('branch-forms');
    if (branchHost) {
      branchHost.addEventListener('submit', (event) => {
        const form = event.target.closest('[data-branch-form]');
        if (!form) return;
        event.preventDefault();
        saveBranch(form);
      });
    }

    const productsSearch = byId('product-search');
    if (productsSearch) productsSearch.addEventListener('input', () => {
      state.productSearch = productsSearch.value.trim();
      renderProducts();
    });
    const productFilter = byId('product-category-filter');
    if (productFilter) productFilter.addEventListener('change', () => {
      state.productCategory = productFilter.value;
      renderProducts();
    });

    const inventorySearch = byId('inventory-search');
    if (inventorySearch) inventorySearch.addEventListener('input', () => {
      state.inventorySearch = inventorySearch.value.trim();
      renderInventory();
    });
    const inventoryFilter = byId('inventory-filter');
    if (inventoryFilter) inventoryFilter.addEventListener('change', () => {
      state.inventoryFilter = inventoryFilter.value;
      renderInventory();
    });
    ['save-inventory', 'save-inventory-foot'].forEach((id) => {
      const btn = byId(id);
      if (btn) btn.addEventListener('click', saveInventory);
    });
    if (byId('save-threshold')) byId('save-threshold').addEventListener('click', applyThreshold);
    if (byId('inventory-threshold')) {
      byId('inventory-threshold').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          applyThreshold();
        }
      });
    }

    const inquirySearch = byId('inquiry-search');
    if (inquirySearch) inquirySearch.addEventListener('input', () => {
      state.inquirySearch = inquirySearch.value.trim();
      renderInquiries();
    });
    const inquiryFilter = byId('inquiry-status-filter');
    if (inquiryFilter) inquiryFilter.addEventListener('change', () => {
      state.inquiryStatus = inquiryFilter.value;
      renderInquiries();
    });
    document.addEventListener('change', (event) => {
      const select = event.target.closest('[data-inquiry-status]');
      if (select) updateInquiryStatus(select.getAttribute('data-inquiry-status'), select.value);
    });

    if (byId('confirm-accept')) {
      byId('confirm-accept').addEventListener('click', () => {
        const action = state.confirmAction;
        closeConfirm();
        if (action) {
          try { action(); } catch (error) {
            console.error('[Daima admin] Confirmed action failed:', error);
            toast('That action could not be completed. Please try again.', 'error');
          }
        }
      });
    }
    if (byId('confirm-cancel')) byId('confirm-cancel').addEventListener('click', closeConfirm);

    if (byId('delete-inquiry-from-dialog')) {
      byId('delete-inquiry-from-dialog').addEventListener('click', () => {
        if (state.viewingInquiryId) requestDeleteInquiry(state.viewingInquiryId);
      });
    }

    if (byId('reset-settings')) byId('reset-settings').addEventListener('click', resetSettings);
    if (byId('export-data')) byId('export-data').addEventListener('click', exportData);
    if (byId('reset-demo-data')) byId('reset-demo-data').addEventListener('click', resetAllData);
  }

  function bindDialogBehaviour() {
    document.querySelectorAll('dialog').forEach((dialog) => {
      dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        if (dialog.id === 'confirm-dialog') closeConfirm();
        else closeDialog(dialog);
      });
      dialog.addEventListener('close', () => {
        if (dialog.id === 'confirm-dialog') state.confirmAction = null;
        if (dialog.id === 'inquiry-dialog') state.viewingInquiryId = '';
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const sidebar = byId('admin-sidebar');
        if (sidebar && sidebar.classList.contains('is-open')) closeSidebar();
      }
    });

    document.addEventListener(
      'error',
      (event) => {
        const img = event.target;
        if (!(img instanceof HTMLImageElement)) return;
        if (img.dataset.adminFallback) return;
        img.dataset.adminFallback = 'true';
        img.src = 'assets/images/fallback.svg';
      },
      true
    );
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                               */
  /* ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    populateCategorySelects();
    fillSettingsForm();
    refreshDataViews();
    bindNavigation();
    bindForms();
    bindDialogBehaviour();

    const requested = location.hash.replace('#', '');
    showSection(SECTIONS[requested] ? requested : 'overview', { hash: false });
  });
})();
