# DAIMA COMMUNICATIONS — Website Concept

An independent, premium website concept and local demonstration dashboard for **DAIMA COMMUNICATIONS**, a proposed multi-branch mobile phone and electronics retailer serving **Sirare** and **Kehancha** in Migori County, Kenya.

**Website concept designed and developed by Thomas Hondo Chacha — Software Engineer.**

---

## 1. What this project is

This repository is a **front-end proposal**, not an operational shop. It demonstrates:

- A premium responsive storefront with a midnight-navy, white and electric-blue identity.
- A 38-item illustrative catalogue across 10 proposed categories.
- Product search, category and brand filters, sorting, a shortlist and a demonstration cart.
- Product detail pages with an illustrative gallery, honest availability wording and a local inquiry workflow.
- Two branch profiles with clearly marked placeholders for details that have not been supplied.
- A local admin dashboard for product, inventory, branch, inquiry and settings management.
- A transparent, documented path from this concept to a production build.

Everything runs in the browser. There is **no build step**, no framework, no backend and no external database.

> **Demonstration notice:** Product names, prices, specifications, stock figures, inquiry records and some branch fields are sample data created for this proposal. They are **not verified Daima Communications data** and must not be treated as real offers, stock or business contact details.

---

## 2. Quick start

### Option A — local server (recommended)

Requires Node.js 18 or newer. No dependencies need installing.

```bash
node tools/serve.js 4173
```

Open <http://127.0.0.1:4173/index.html>.

The included server is a zero-dependency static file server. Using it keeps all pages on the same origin, so the cart, wishlist, catalogue edits and inquiries are shared consistently through `localStorage`.

### Option B — open the files directly

You can open `index.html` directly in a modern browser. Browsing, product pages, the cart and the forms work, but `file://` browser storage behaviour varies between browsers, so shared demo state may be isolated per file. Use Option A for a realistic demonstration.

### Demo flow

1. Open the storefront and explore a category or search the catalogue.
2. Add a product to the cart or save it to the wishlist.
3. Open the cart, adjust quantities and save an availability inquiry.
4. Open `admin.html` to see the same local data in the dashboard.
5. Change a price, stock figure or inquiry status and refresh the public pages to see the change.
6. Use **Settings → Reset all demonstration data** to restore the seeded state.

There is **no login**. The dashboard is intentionally a local prototype; a client-side password would not provide real security.

---

## 3. Project structure

```text
.
├── index.html                 Homepage
├── products.html              Catalogue, filters, search and sorting
├── product.html               Data-driven product detail page
├── cart.html                  Demonstration cart and availability inquiry
├── branches.html              Sirare and Kehancha profiles
├── admin.html                 Local demonstration dashboard
├── css/
│   ├── style.css              Public design system and responsive layout
│   └── admin.css              Dashboard design system
├── js/
│   ├── config.js              Editable business, branch, category and demo configuration
│   ├── data.js                Seed catalogue, inquiry data, Store API and helpers
│   ├── components.js          Injected header, footer, dialogs, cart and wishlist drawers
│   ├── script.js              Public page behaviour
│   └── admin.js               Dashboard behaviour
├── assets/
│   └── images/                Original SVG illustrations, favicon and social card
├── tools/
│   ├── serve.js               Zero-dependency local static server
│   └── generate-assets.js     Regenerates the original SVG illustration set
├── robots.txt                 Crawler guidance (placeholder domain)
├── sitemap.xml                Sitemap (placeholder domain)
├── vercel.json                Static deployment headers
└── README.md
```

All product, branch and hero visuals are **original SVG illustrations** created for this proposal. They are not photographs of Daima stock, premises or staff, and they are labelled as illustrative in the interface.

---

## 4. Configuration

Most content can be changed without touching page markup.

### `js/config.js`

| Area | Purpose |
| --- | --- |
| `CONFIG.business` | Business name, tagline, short description and proposal metadata |
| `CONFIG.branches` | Branch names, locations, placeholder fields and map search text |
| `CONFIG.categories` | The 10 proposed catalogue categories and their illustration paths |
| `CONFIG.whatsapp` | Default inquiry message and verified WhatsApp number |
| `CONFIG.demo` | Availability, price and transparency wording |
| `CONFIG.storage` | `localStorage` keys used by the demonstration |
| `CONFIG.nav` | Public navigation links |

### WhatsApp

WhatsApp actions stay **disabled** until a verified business number is supplied. This is deliberate: the concept must not invent a contact channel.

To enable it, set an international number in digits only (no `+`, spaces or dashes):

```js
whatsapp: {
  number: '2547XXXXXXXX',
  defaultMessage: 'Hello Daima Communications, I would like to ask about a product.'
}
```

A number saved in **Admin → Settings** overrides `js/config.js` in that browser only. Use the Settings field to test the flow, then reset it. In production, the number should come from a verified server-side source.

> Only configure a number that the business has confirmed and authorised for customer enquiries. Do not use a placeholder number in a public deployment.

### Catalogue edits

Products can be edited through **Admin → Products** and **Admin → Inventory**. Public pages read the same browser-local store. This is convenient for a demonstration but is **not** a publishing system: changes made on one device are not visible to visitors on another.

Seed products live in `js/data.js`. If you change seed data, also use **Settings → Reset all demonstration data** or clear the demo keys so the browser reloads the new seed.

### Replacing illustrations

1. Add an image under `assets/images/`.
2. Update the product or category image path in the admin dashboard or `js/data.js`.
3. Keep meaningful alternative text and the “illustrative render” labelling.
4. Use real business photography only after obtaining permission and confirming what each photograph actually shows.

Run `node tools/generate-assets.js` only if you want to regenerate the original SVG set. It overwrites the existing illustrations.

---

## 5. Demonstration data and privacy

The following are stored in this browser using `localStorage`:

- Demonstration products and stock figures
- Demonstration inquiries submitted through the public forms
- Cart and wishlist selections
- Dashboard settings and local activity entries

No inquiry, cart, wishlist or dashboard change is sent to a server. Clearing site data resets the demonstration. The admin **Export demo data (JSON)** action exports only the local sample data.

The seeded inquiry names and telephone numbers are fictitious sample records. They are visible only in the local dashboard and must not be used to contact anyone.

### Reset

Use **Admin → Settings → Reset all demonstration data**, or clear the site's browser storage. This restores:

- 38 demonstration products
- 4 sample inquiries
- Default settings
- The seeded activity log

---

## 6. Deployment

The site is plain static HTML, CSS and JavaScript. It can be deployed to Vercel, Netlify, GitHub Pages or any static host.

### Vercel

1. Import the folder as a project, or run `vercel` from this directory.
2. Choose **Other** as the framework preset.
3. Leave the build command empty.
4. Use the repository root as the output directory.
5. Deploy. `vercel.json` adds baseline security headers without changing the site structure.

No environment variables are required for the demonstration.

### Before a public launch

1. **Replace the placeholder domain** `https://your-domain.example` in:
   - canonical and Open Graph tags in all public HTML files
   - `robots.txt`
   - `sitemap.xml`
2. Confirm the verified business name, branch details, opening hours, telephone numbers and WhatsApp number. Do not publish unverified placeholders.
3. Replace the illustrative prices and stock with approved data, or keep the catalogue clearly labelled as a demonstration.
4. Decide whether product and cart pages should remain `noindex`. `admin.html` should always stay `noindex, nofollow` and should be protected by real authentication in production.
5. Add a real privacy policy, terms of use, returns/warranty policy and delivery policy before accepting inquiries or orders.
6. Update the Content Security Policy in `vercel.json` if you add analytics, a payment provider, maps or other third-party services.
7. Test on the production domain, including WhatsApp links, forms and all branch links.

### Google Search Console

1. Add the production domain as a property and verify ownership (DNS or HTML file method).
2. Submit `https://your-domain.example/sitemap.xml` after replacing the placeholder domain.
3. Request indexing for the homepage, catalogue and branches page.
4. Confirm that `admin.html` is excluded and that cart/product pages use the intended `noindex` settings.
5. Review the Page indexing report after deployment.

No structured data (`LocalBusiness`, `Product`, review or rating markup) is included. Those schemas require verified addresses, hours, prices, availability and reviews; adding them with sample data would misrepresent the business.

---

## 7. Production requirements

This repository deliberately stops at a front-end prototype. A real deployment needs at least:

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
- An approved publishing workflow; local admin edits must not be treated as public updates.
- File upload validation and object storage if real product photography is added.
- Email, SMS or WhatsApp delivery through an approved provider, with consent and opt-out handling.
- Monitoring, error tracking, uptime alerts and an incident response process.
- Privacy notice, consent records, data-retention rules and a process for access/deletion requests.
- A PCI-compliant payment provider **only if** online payments are added later. This concept takes no payment and collects no card data.

### Business accuracy

- Verified branch addresses, opening hours, telephone numbers and map locations.
- Verified product names, models, colours, specifications, prices, warranty terms and stock.
- Confirmed brand relationships and any permitted use of brand imagery.
- Clear returns, warranty, delivery and pricing policies.
- Approval from Daima Communications before publishing anything as an official site.

The dashboard warning and settings panel repeat these requirements inside the demo.

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

The WhatsApp action is never presented as available while no number is configured; disabled actions are visibly disabled and explain why.

---

## 9. Verification performed

The following checks were run against the local server during development:

- **Lighthouse** (accessibility, best practices and SEO; the available audit does not emulate devices or measure performance):
  - `index.html` — 100 / 100 / 100
  - `products.html` — 100 / 100 / 100
  - `product.html?id=p01` — 100 / 100 / 100
  - `cart.html` — 100 / 100 / 100
  - `branches.html` — 100 / 100 / 100
  - `admin.html` — 100 / 100 / 100
- **Responsive overflow checks** at 360, 390, 768, 1024 and 1440 px for all six pages. No page-level horizontal overflow was found.
- **Browser console checks** on the public pages and dashboard. No JavaScript errors were reported after the final fixes.
- **Manual flows:** homepage featured search/filter/sort, catalogue search/filter/sort, product gallery, cart quantity/removal/subtotal, wishlist toggle, contact and inquiry validation/success states, admin product add/delete, inventory editing, inquiry status/detail, settings reset and confirmation dialogs.

These checks describe the demonstration only. They are not a security audit or a production performance guarantee.

---

## 10. Known limitations

- Data is browser-local and not shared between devices or visitors.
- There is no authentication or server authorization; the dashboard is a front-end prototype.
- Inquiries are not delivered by email, SMS or WhatsApp unless a verified WhatsApp number is configured and the user chooses that handoff.
- No payment, order, stock reservation or delivery workflow exists.
- Browser storage can be cleared by the user or restricted by privacy settings.
- Seeded prices, specifications and stock are illustrative and must be verified.
- Google Fonts is loaded from a third-party CDN with system font fallbacks. Self-host the fonts if third-party requests are not acceptable.

---

## 11. Credits and usage

Website concept designed and developed by **Thomas Hondo Chacha — Software Engineer**.

Product and brand names belong to their respective owners. Their appearance in this illustrative catalogue does not imply dealership, partnership, warranty or endorsement.

This is an independent proposal. It does not imply that Daima Communications has hired, endorsed or partnered with the developer. Reuse of the design or content should be agreed with the author and the business.

For questions about this concept, use the contact workflow in the demonstration or the project handover channel.
