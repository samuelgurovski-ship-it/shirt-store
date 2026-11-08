# Trendity Shirt Co. — storefront starter

A static shirt shop: no build step. Open `index.html` in a browser, or deploy the folder as-is to Vercel, Netlify or GitHub Pages.

## Pages
| Page | File |
|---|---|
| Home | `index.html` |
| Shop (with type filters + cart) | `shop.html` |
| Size guide | `size-guide.html` |
| Contact | `contact.html` |
| Terms of service | `legal/terms.html` |
| Privacy policy (GDPR + US state laws) | `legal/privacy.html` |
| Returns & refunds | `legal/returns.html` |
| Shipping | `legal/shipping.html` |
| Cookie policy | `legal/cookies.html` |
| Accessibility statement | `legal/accessibility.html` |

## Before you launch: checklist
1. **Brand name.** The brand is "Trendity Shirt Co." Check the name isn't trademarked (USPTO TESS search).
2. **Fill the yellow highlights.** Every `<mark class="fill">[...]</mark>` in the legal pages and contact page needs your real business name, address, governing-law state, and providers.
3. **Remove the "Before you launch" box** at the top of each legal page once a lawyer has reviewed them. These are solid templates, but not legal advice.
4. **Email.** Change `hello@example.com` in `assets/main.js` (`SITE.email`), `contact.html`, and the legal pages.
5. **Products.** Edit the `PRODUCTS` list in `assets/main.js`. The shirt drawings are placeholders; swap in real photos when you have them.
6. **Payments.** The "Check out" button shows a notice. Connect one of:
   - **Stripe Payment Links / Checkout**: easiest for a static site.
   - **Shopify Buy Button** (Shopify Starter plan): handles tax, inventory and shipping labels.
   - Or move to **Shopify** fully and reuse this design as the theme.
7. **Forms.** Newsletter and contact forms validate but don't send yet. Point them at Formspree, Netlify Forms, or your email provider (see the `TODO`s in `main.js`).
8. **Analytics.** Only add tracking inside `loadOptionalScripts()` in `main.js`, so it runs after cookie consent.
9. **Business basics** (not code, but needed to be legal): register the business, get a sales-tax permit for your state, and collect tax where you have nexus. Shopify/Stripe Tax can automate this.
