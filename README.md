# DAIMA COMMUNICATIONS — Business Website

A responsive, zero-dependency business website for **DAIMA COMMUNICATIONS**, a mobile phone, electronics and accessories retailer serving **Sirare** and **Kehancha** in Migori County, Kenya.

**Business number for both branches:** `0701 127 577`  
**Website designed and developed by Thomas Hondo Chacha.**

**Live site:** <https://daima-communications-website.vercel.app>  
**Source repository:** <https://github.com/Pefrika-dev/daima-communications-website>

---

## 1. What this project is

A static storefront and local management preview. It includes:

- A responsive public website with a midnight-navy, white and electric-blue identity.
- A 38-product catalogue across 10 categories.
- Product search, category and brand filters, sorting, a shortlist and an inquiry list.
- Product detail pages with representative images, indicative pricing and branch-inquiry actions.
- Two branch profiles for Sirare and Kehancha, both using `0701 127 577`.
- WhatsApp inquiry handoff: the site prepares a message, opens WhatsApp, and the customer presses Send.
- A local business dashboard for products, stock, branches, inquiries, settings and activity.

There is **no build step**, no framework, no backend and no external database. Everything runs in the browser.

> **Price and image notice:** Displayed prices are indicative and product images are representative illustrations. They are not live stock records, confirmed quotations or photographs of current stock. The interface asks customers to confirm the exact model, current price, colour and branch availability on `0701 127 577` before paying or travelling.

---

## 2. Quick start

### Option A — local server (recommended)

Requires Node.js 18 or newer. No dependencies need installing.

```bash
node tools/serve.js 4173
```

Open <http://127.0.0.1:4173/index.html>.

The included server is a zero-dependency static file server. Using it keeps all pages on the same origin, so the inquiry list, wishlist, catalogue edits and dashboard data are shared consistently through `localStorage`.

### Option B — open the files directly

You can open `index.html` directly in a modern browser. Browsing, product pages and forms work, but `file://` browser storage behaviour varies between browsers. Use Option A for a consistent local test.

### Main flows to test

1. Open the storefront and explore a category or search the catalogue.
2. Add a product to the inquiry list or save it to the wishlist.
3. Open the inquiry list, adjust quantities and choose a preferred branch.
4. Submit the inquiry form. WhatsApp should open with a prefilled message; press **Send** there to deliver it.
5. Open `admin.html` to see the same browser-local data in the dashboard.
6. Change a price, stock figure or inquiry status and refresh the public pages to see the change.
7. Use **Settings → Reset all data** to restore the seeded state.

There is **no login**. The dashboard is a local management preview; a client-side password would not provide real security.

---

## 3. Project structure

```text
.
├── index.html                 Homepage
├── products.html              Catalogue, filters, search and sorting
├── product.html               Data-driven product detail page
├── cart.html                  Inquiry list and availability inquiry
├── branches.html              Sirare and Kehancha profiles
├── admin.html                 Local business dashboard
├── css/
│   ├── style.css              Public design system and responsive layout
│   └── admin.css              Dashboard design system
├── js/
│   ├── config.js              Business, phone, branch, category and dashboard defaults
│   ├── data.js                Seed catalogue, inquiry data, Store API and helpers
│   ├── components.js          Header, footer, dialogs, inquiry-list and wishlist drawers
│   ├── script.js              Public page behaviour
│   └── admin.js               Dashboard behaviour
├── assets/
│   └── images/                Original SVG illustrations, favicon and social card
├── tools/
│   ├── serve.js               Zero-dependency local static server
│   └── generate-assets.js     Regenerates the original SVG illustration set
├── robots.txt                 Crawler guidance
├── sitemap.xml                Production sitemap
├── vercel.json                Static deployment headers
├── google9875c11804e2a13e.html  Google Search Console verification file
└── README.md
```

All product, branch and hero visuals are **original SVG illustrations**. They are not photographs of Daima stock, premises or staff. Storefront and product images are labelled as representative in the interface.

---

## 4. Configuration

Most content can be changed without touching page markup.

### `js/config.js`

| Area | Purpose |
| --- | --- |
| `CONFIG.business` | Business name, tagline, description and region |
| `CONFIG.contact` | Central phone display and call-link number |
| `CONFIG.branches` | Branch names, locations, contact actions, map search text and notices |
| `CONFIG.categories` | The 10 catalogue categories and their illustration paths |
| `CONFIG.whatsapp` | Business WhatsApp number and default inquiry message |
| `CONFIG.demo` | Price, availability and representative-image wording |
| `CONFIG.defaults` | Dashboard defaults, including low-stock threshold and catalogue note |
| `CONFIG.storage` | `localStorage` keys used by the local preview |
| `CONFIG.nav` | Public navigation links |

### Phone and WhatsApp

The business number is configured as:

```js
contact: {
  phone: '0701127577',
  phoneDisplay: '0701 127 577',
}

whatsapp: {
  number: '254701127577',
  enabled: true,
}
```

- Call links use `tel:+254701127577`.
- WhatsApp links use `https://wa.me/254701127577`.
- Both branches inherit the same number.

If the number is ever call-only, set `whatsapp.enabled` to `false`, remove the WhatsApp actions, and keep the telephone links. Do not expose a WhatsApp action for a number that does not receive WhatsApp messages.

A number saved in **Admin → Settings** overrides `js/config.js` in that browser only. In production, the official number should come from a controlled configuration source.

### Catalogue edits

Products can be edited through **Admin → Products** and **Admin → Inventory**. Public pages read the same browser-local store. This is useful for a local preview but is **not** a publishing system: changes made on one device are not visible to visitors on another.

Seed products live in `js/data.js`. If you change seed data, also use **Settings → Reset all data** or clear the local storage keys so the browser reloads the new seed.

### Replacing illustrations

1. Add an image under `assets/images/`.
2. Update the product or category image path in the dashboard or `js/data.js`.
3. Keep meaningful alternative text and the representative-image labelling.
4. Use real business photography only after obtaining permission and confirming what each photograph actually shows.

Run `node tools/generate-assets.js` only if you want to regenerate the original SVG set. It overwrites the existing illustrations.

---

## 5. Data, privacy and local storage

The following are stored in this browser using `localStorage`:

- Products and stock figures
- Inquiries submitted through the public forms
- Inquiry-list and wishlist selections
- Dashboard settings and local activity entries

No inquiry, inquiry-list item, wishlist item or dashboard change is sent to a server. Clearing site data resets the local preview. The admin **Export data (JSON)** action exports only the data stored in that browser.

The seeded inquiry records use clearly labelled sample names and non-working example numbers. They are visible only in the local dashboard and must not be used to contact anyone.

Submitted inquiry forms also prepare a WhatsApp message. Nothing reaches the business until the customer presses **Send** in WhatsApp. WhatsApp's own privacy terms then apply.

### Reset

Use **Admin → Settings → Reset all data**, or clear the site's browser storage. This restores:

- 38 products
- 4 sample inquiries
- Default settings
- The seeded activity log

---

## 6. Deployment

The site is plain static HTML, CSS and JavaScript. It can be deployed to Vercel, Netlify, GitHub Pages or any static host.

### Vercel

The site is deployed at <https://daima-communications-website.vercel.app>. The GitHub repository is connected to the Vercel project, so pushes to `main` trigger a new production deployment.

To deploy a copy:

1. Import the repository as a project, or run `vercel` from this directory.
2. Choose **Other** as the framework preset.
3. Leave the build command empty.
4. Use the repository root as the output directory.
5. Deploy. `vercel.json` adds baseline security headers without changing the site structure.

No environment variables are required for the static front end.

### Before a full public launch

1. **Custom domain:** the current deployment uses the Vercel URL above. If a custom domain is connected, update the production URL in:
   - canonical and Open Graph tags in all public HTML files
   - `robots.txt`
   - `sitemap.xml`
   - `CONFIG.meta.siteUrl` in `js/config.js`
2. Confirm the business name, branch details, opening hours, telephone number and WhatsApp availability.
3. Replace the indicative prices and stock with approved data, or keep the current confirmation wording.
4. Replace representative illustrations with approved product photography when available.
5. Decide whether product and inquiry-list pages should remain `noindex`. `admin.html` should always stay `noindex, nofollow` and should be protected by real authentication in production.
6. Add a full privacy policy, terms of use, returns/warranty policy and delivery policy before accepting orders or payments.
7. Update the Content Security Policy in `vercel.json` if you add analytics, a payment provider, maps or other third-party services.
8. Test the production domain, including call links, WhatsApp handoff, forms and branch links.

### Google Search Console

Status as of 23 October 2026:

- The URL-prefix property `https://daima-communications-website.vercel.app/` is verified with the committed `google9875c11804e2a13e.html` file. Keep that file in the repository; removing it can invalidate ownership verification.
- `https://daima-communications-website.vercel.app/sitemap.xml` was submitted successfully. Search Console reported **Success** with **3 discovered pages**.
- Live URL tests passed for the homepage, catalogue and branches page. Google reported that each page can be indexed and that all page resources loaded.
- Indexing was requested for the homepage and catalogue. The branches page is included in the sitemap; a separate manual request hit Google's daily quota and can be retried later.
- Indexing and ranking are not guaranteed. Review the **Page indexing** report after Google crawls the site.

If a custom domain is connected, add a new Search Console property for that domain, verify it, submit its sitemap, and update the canonical URLs as described above.

No structured data (`LocalBusiness`, `Product`, review or rating markup) is included. Those schemas require verified addresses, hours, prices, availability and reviews; adding them with provisional data would misrepresent the business.

---

## 7. Production requirements

This repository is a front-end implementation. A fully operational deployment needs at least:

### Security and access

- Server-side authentication with secure password handling and optional MFA for staff.
- Role-based authorization for administrators, inventory staff and inquiry handlers.
- Secure session cookies, CSRF protection and session expiry.
- Server-side input validation and output encoding for every public and admin endpoint.
- Rate limiting and bot protection on inquiry and contact endpoints.
- HTTPS, HSTS and a reviewed Content Security Policy.
- Audit logs for product, price, stock, inquiry and settings changes.
- Backups with tested restore procedures and a documented retention policy.

### Data and operations

- A proper database with constraints, transactions and migrations.
- Server-side storage for products, branches, stock, inquiries and settings.
- An approved publishing workflow; local dashboard edits must not be treated as public updates.
- File upload validation and object storage if real product photography is added.
- Email, SMS or WhatsApp delivery through an approved provider, with consent and opt-out handling.
- Monitoring, error tracking, uptime alerts and an incident response process.
- Privacy notice, consent records, data-retention rules and a process for access/deletion requests.
- A PCI-compliant payment provider **only if** online payments are added later. The current site takes no payment and collects no card data.

### Business accuracy

- Verified branch addresses, opening hours, telephone numbers and map locations.
- Verified product names, models, colours, specifications, prices, warranty terms and stock.
- Confirmed brand relationships and any permitted use of brand imagery.
- Clear returns, warranty, delivery and pricing policies.
- Authorisation from Daima Communications before publishing new content as official.

The dashboard notice and settings panel repeat the local-preview limitation.

---

## 8. Accessibility and responsive behaviour

The public pages and dashboard include:

- Keyboard-operable navigation, dialogs, drawers, filters and forms.
- Visible `:focus-visible` states and a skip link.
- Semantic headings, landmarks, labels, error messages and status regions.
- Alt text on meaningful images; decorative SVGs marked `aria-hidden`.
- Lazy loading for below-the-fold images.
- `prefers-reduced-motion` support.
- Responsive layouts at 360, 390, 768, 1024 and 1440 px.

The WhatsApp action is only shown when configured. If it is disabled, the interface does not pretend a channel is available.

---

## 9. Verification performed

The following checks were run during development:

- **Lighthouse** (accessibility, best practices and SEO; the available audit does not emulate devices or measure performance):
  - `index.html` — 100 / 100 / 100
  - `products.html` — 100 / 100 / 100
  - `product.html?id=p01` — 100 / 100 / 100
  - `cart.html` — 100 / 100 / 100
  - `branches.html` — 100 / 100 / 100
  - `admin.html` — 100 / 100 / 100
- **Responsive overflow checks** at 360, 390, 768, 1024 and 1440 px for all six pages. No page-level horizontal overflow was found.
- **Browser console checks** on the public pages and dashboard. No JavaScript errors were reported after the final fixes.
- **Production deployment:** the Vercel URL returned HTTP 200 with the expected page title, and all 54 SVG assets passed XML validation.
- **Manual flows:** homepage featured search/filter/sort, catalogue search/filter/sort, product gallery, inquiry-list quantity/removal/subtotal, wishlist toggle, contact and inquiry validation/success states, WhatsApp handoff, admin product add/delete, inventory editing, inquiry status/detail, settings reset and confirmation dialogs.

These checks are not a security audit or a production performance guarantee.

---

## 10. Known limitations

- Data is browser-local and not shared between devices or visitors.
- There is no authentication or server authorization; the dashboard is a front-end preview.
- Inquiries are delivered through WhatsApp only after the customer presses **Send**. There is no server-side inquiry inbox.
- No payment, order, stock reservation or delivery workflow exists.
- Browser storage can be cleared by the user or restricted by privacy settings.
- Prices, specifications and stock figures are provisional and must be verified.
- Product and storefront visuals are illustrations, not photographs.
- Google Fonts is loaded from a third-party CDN with system font fallbacks. Self-host the fonts if third-party requests are not acceptable.

---

## 11. Credits and usage

Website designed and developed by **Thomas Hondo Chacha — Software Engineer**.

Product and brand names belong to their respective owners. Their appearance in the catalogue does not imply dealership, partnership, warranty or endorsement.

For website maintenance questions, use the project handover channel or call `0701 127 577`.
