/* ==========================================================================
   Site config — edit these once and they update every page.
   ========================================================================== */
const SITE = {
  name: "Fieldwork Shirt Co.",
  email: "hello@example.com",          // TODO: your support email
  currency: "USD",
  freeShippingOver: 75,
  cartEnabled: false,   // set to true once checkout is connected
};

/* Product catalogue. Replace `color` with real photos later (see README). */
const PRODUCTS = [
  { id: "classic-white",    name: "The White Tee",       color: "#ffffff", colorName: "Optic white",  type: "tee",    price: 32, style: "tee" },
  { id: "heavy-white",      name: "Heavyweight Tee",     color: "#ffffff", colorName: "Optic white",  type: "tee",    price: 38, style: "tee" },
  { id: "natural-white",    name: "Heavyweight Tee",     color: "#f6f3ea", colorName: "Natural white", type: "tee",   price: 38, style: "tee" },
  { id: "pocket-white",     name: "Pocket Tee",          color: "#ffffff", colorName: "Optic white",  type: "tee",    price: 40, style: "pocket" },
  { id: "longsleeve-white", name: "Long Sleeve Tee",     color: "#ffffff", colorName: "Optic white",  type: "long",   price: 44, style: "long" },
  { id: "oxford-white",     name: "Oxford Button-Down",  color: "#ffffff", colorName: "White",        type: "button", price: 88, style: "button" },
  // Multi-packs of The White Tee (sold from the homepage, hidden from the shop grid)
  { id: "classic-white-3",  name: "The White Tee, 3-pack",  color: "#ffffff", colorName: "Optic white", type: "pack", price: 84,  style: "tee", pack: 3 },
  { id: "classic-white-5",  name: "The White Tee, 5-pack",  color: "#ffffff", colorName: "Optic white", type: "pack", price: 135, style: "tee", pack: 5 },
  { id: "classic-white-10", name: "The White Tee, 10-pack", color: "#ffffff", colorName: "Optic white", type: "pack", price: 250, style: "tee", pack: 10 },
];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

/* ---------- Shirt illustrations (placeholder until you have photos) ---------- */
function shirtSVG(p, label = true) {
  const light = isLight(p.color);
  const stroke = light ? "#b9bec9" : "rgba(0,0,0,.25)";
  const detail = light ? "#c3c8d2" : "rgba(255,255,255,.18)";
  const body = {
    tee: "M70 18 L50 10 Q60 30 80 30 Q100 30 110 10 L90 18 Z M50 10 L18 26 L6 58 L32 66 L36 52 L36 150 L124 150 L124 52 L128 66 L154 58 L142 26 L110 10 Q100 30 80 30 Q60 30 50 10 Z",
    pocket: "M50 10 L18 26 L6 58 L32 66 L36 52 L36 150 L124 150 L124 52 L128 66 L154 58 L142 26 L110 10 Q100 30 80 30 Q60 30 50 10 Z",
    long: "M50 10 L22 24 L4 140 L24 144 L36 70 L36 150 L124 150 L124 70 L136 144 L156 140 L138 24 L110 10 Q100 30 80 30 Q60 30 50 10 Z",
    button: "M54 8 L22 22 L4 140 L24 144 L36 70 L36 152 L124 152 L124 70 L136 144 L156 140 L138 22 L106 8 L94 14 L80 34 L66 14 Z",
  }[p.style];
  let extra = "";
  if (p.style === "pocket") extra = `<rect x="94" y="56" width="18" height="20" rx="2" fill="none" stroke="${detail}" stroke-width="2"/>`;
  if (p.style === "button") {
    extra = `<path d="M66 14 L54 8 L62 26 Z M94 14 L106 8 L98 26 Z" fill="${detail}"/><line x1="80" y1="34" x2="80" y2="152" stroke="${detail}" stroke-width="2"/>` +
      [52, 76, 100, 124].map(y => `<circle cx="84" cy="${y}" r="2" fill="${detail}"/>`).join("");
  }
  if (p.style === "tee" || p.style === "pocket" || p.style === "long") {
    extra += `<path d="M50 10 Q60 30 80 30 Q100 30 110 10" fill="none" stroke="${detail}" stroke-width="3"/>`;
  }
  return `<svg viewBox="0 0 160 160" ${label ? `role="img" aria-label="${p.name} in ${p.colorName}"` : 'aria-hidden="true"'}>
    <path d="${body}" fill="${p.color}" stroke="${stroke}" stroke-width="1.5" stroke-linejoin="round"/>${extra}</svg>`;
}
function isLight(hex) {
  const n = parseInt(hex.slice(1), 16);
  return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 > 180;
}
const money = n => new Intl.NumberFormat(undefined, { style: "currency", currency: SITE.currency }).format(n);

/* ---------- Header / footer (shared across every page) ---------- */
const ROOT = document.body.dataset.root || "";
const PAGE = document.body.dataset.page || "";

function renderChrome() {
  const nav = [["index.html", "Home", "home"], ["shop.html", "Shop", "shop"], ["size-guide.html", "Size guide", "size"], ["contact.html", "Contact", "contact"]];
  document.body.insertAdjacentHTML("afterbegin", `
    <a class="skip-link" href="#main">Skip to content</a>
    <p class="announce">Free US shipping on orders over ${money(SITE.freeShippingOver)}. 30-day returns.</p>
    <header class="site-header"><div class="wrap">
      <a class="brand" href="${ROOT}index.html" aria-label="${SITE.name} home">
        <svg class="brand-mark" viewBox="0 0 26 26" aria-hidden="true"><rect width="26" height="26" rx="6" fill="#22305c"/><path d="M6 9l4-3h6l4 3-2 3-2-1v9H10v-9l-2 1z" fill="#f2f3f5"/><rect x="6" y="22" width="14" height="1.5" fill="#e8b931"/></svg>
        ${SITE.name}
      </a>
      <button class="icon-btn menu-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav class="nav" id="site-nav" aria-label="Main">
        ${nav.map(([h, l, k]) => `<a href="${ROOT}${h}"${PAGE === k ? ' aria-current="page"' : ""}>${l}</a>`).join("")}
      </nav>
      <button class="icon-btn cart-btn" aria-haspopup="dialog" aria-controls="cart">
        Cart <span class="cart-count" aria-live="polite">0</span>
      </button>
    </div></header>`);

  document.body.insertAdjacentHTML("beforeend", `
    <footer class="site-footer"><div class="wrap">
      <div class="footer-grid">
        <div>
          <h2>${SITE.name}</h2>
          <p>Heavyweight cotton shirts, cut to last and made to be worn in.</p>
          <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
        </div>
        <div><h2>Shop</h2><ul>
          <li><a href="${ROOT}shop.html">All shirts</a></li>
          <li><a href="${ROOT}size-guide.html">Size guide</a></li>
          <li><a href="${ROOT}contact.html">Contact us</a></li>
        </ul></div>
        <div><h2>Help</h2><ul>
          <li><a href="${ROOT}legal/shipping.html">Shipping</a></li>
          <li><a href="${ROOT}legal/returns.html">Returns &amp; refunds</a></li>
          <li><a href="${ROOT}contact.html">Order help</a></li>
        </ul></div>
        <div><h2>Legal</h2><ul>
          <li><a href="${ROOT}legal/terms.html">Terms of service</a></li>
          <li><a href="${ROOT}legal/privacy.html">Privacy policy</a></li>
          <li><a href="${ROOT}legal/cookies.html">Cookie policy</a></li>
          <li><a href="${ROOT}legal/accessibility.html">Accessibility</a></li>
        </ul></div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</span>
        <span><button type="button" data-cookie-settings>Cookie settings</button> &nbsp;&nbsp;
        <a href="${ROOT}legal/privacy.html#your-rights">Do not sell or share my personal information</a></span>
      </div>
    </div></footer>
    <div class="drawer-backdrop" data-close-cart></div>
    <aside class="drawer" id="cart" role="dialog" aria-modal="true" aria-labelledby="cart-title" hidden>
      <div class="drawer-head"><h2 id="cart-title">Your cart</h2><button class="icon-btn" data-close-cart aria-label="Close cart">Close</button></div>
      <div class="drawer-body" id="cart-lines"></div>
      <div class="drawer-foot" id="cart-foot"></div>
    </aside>`);

  const toggle = document.querySelector(".menu-toggle");
  const navEl = document.getElementById("site-nav");
  toggle.addEventListener("click", () => {
    const open = navEl.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
}

/* ---------- Cart (stored in this browser only) ---------- */
const store = {
  get(k, fallback) { try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
let cart = store.get("fw-cart", []);
let lastFocus = null;

function saveCart() { store.set("fw-cart", cart); renderCart(); }
function addToCart(id, size) {
  if (!SITE.cartEnabled) return;
  const line = cart.find(l => l.id === id && l.size === size);
  line ? line.qty++ : cart.push({ id, size, qty: 1 });
  saveCart(); openCart();
}
function renderCart() {
  const count = cart.reduce((s, l) => s + l.qty, 0);
  document.querySelectorAll(".cart-count").forEach(el => (el.textContent = count));
  const lines = document.getElementById("cart-lines");
  const foot = document.getElementById("cart-foot");
  if (!lines) return;
  if (!cart.length) {
    lines.innerHTML = `<div class="empty"><p>Your cart is empty.</p><a class="btn btn-ghost" href="${ROOT}shop.html">Browse shirts</a></div>`;
    foot.innerHTML = "";
    return;
  }
  lines.innerHTML = cart.map((l, i) => {
    const p = PRODUCTS.find(x => x.id === l.id);
    if (!p) return "";
    return `<div class="cart-line">
      <div class="thumb">${shirtSVG(p, false)}</div>
      <div><p><strong>${p.name}</strong></p><p class="product-meta">${p.colorName} / ${l.size}</p>
        <div class="qty"><button aria-label="Decrease quantity" data-dec="${i}">−</button><span aria-live="polite">${l.qty}</span><button aria-label="Increase quantity" data-inc="${i}">+</button></div></div>
      <div style="text-align:right"><p class="product-price">${money(p.price * l.qty)}</p><button class="link-btn" data-remove="${i}">Remove</button></div>
    </div>`;
  }).join("");
  const subtotal = cart.reduce((s, l) => s + (PRODUCTS.find(p => p.id === l.id)?.price || 0) * l.qty, 0);
  const toFree = SITE.freeShippingOver - subtotal;
  foot.innerHTML = `
    <div class="totals"><span>Subtotal</span><span>${money(subtotal)}</span></div>
    <p class="product-meta">${toFree > 0 ? `Add ${money(toFree)} more for free shipping.` : "You get free shipping."} Taxes calculated at checkout.</p>
    <button class="btn" style="width:100%;margin-top:12px" data-checkout>Check out</button>
    <p class="product-meta" style="margin-top:10px;font-size:.85rem">By checking out you agree to our <a href="${ROOT}legal/terms.html">Terms</a> and <a href="${ROOT}legal/returns.html">Returns policy</a>.</p>`;
}
function openCart() {
  lastFocus = document.activeElement;
  const d = document.getElementById("cart");
  d.hidden = false;
  requestAnimationFrame(() => document.body.classList.add("drawer-open"));
  d.querySelector("[data-close-cart]").focus();
}
function closeCart() {
  document.body.classList.remove("drawer-open");
  setTimeout(() => (document.getElementById("cart").hidden = true), 250);
  lastFocus?.focus();
}

document.addEventListener("click", e => {
  const t = e.target.closest("button, [data-close-cart]");
  if (!t) return;
  if (t.matches(".cart-btn")) openCart();
  else if (t.matches("[data-close-cart]")) closeCart();
  else if (t.dataset.inc) { cart[+t.dataset.inc].qty++; saveCart(); }
  else if (t.dataset.dec) { const l = cart[+t.dataset.dec]; l.qty > 1 ? l.qty-- : cart.splice(+t.dataset.dec, 1); saveCart(); }
  else if (t.dataset.remove) { cart.splice(+t.dataset.remove, 1); saveCart(); }
  else if (t.matches("[data-checkout]")) {
    // TODO: connect a payment provider (Stripe Checkout, Shopify Buy Button, etc.). See README.
    alert("Checkout isn't connected yet. Connect Stripe or Shopify to take payments — see README.md.");
  }
  else if (t.matches("[data-cookie-settings]")) showCookieNotice(true);
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && document.body.classList.contains("drawer-open")) closeCart();
  if (e.key === "Tab" && document.body.classList.contains("drawer-open")) {
    const f = [...document.querySelectorAll("#cart button, #cart a")];
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
  }
});

/* ---------- Product cards ---------- */
function productCard(p) {
  return `<article class="product" data-type="${p.type}">
    <div class="product-media">${shirtSVG(p)}</div>
    <div class="product-info">
      <div><h3 class="product-name">${p.name}</h3><p class="product-meta">${p.colorName}</p></div>
      <span class="product-price">${money(p.price)}</span>
    </div>
    <form class="product-form" data-id="${p.id}">
      <label class="visually-hidden" for="size-${p.id}">Size for ${p.name}, ${p.colorName}</label>
      <select id="size-${p.id}" name="size">${SIZES.map(s => `<option${s === "M" ? " selected" : ""}>${s}</option>`).join("")}</select>
      <button class="btn" type="submit">Add to cart</button>
    </form>
  </article>`;
}
function renderGrids() {
  document.querySelectorAll("[data-products]").forEach(grid => {
    const limit = +grid.dataset.limit || PRODUCTS.length;
    grid.innerHTML = PRODUCTS.filter(p => !p.pack).slice(0, limit).map(productCard).join("");
  });
  document.querySelectorAll("[data-rail]").forEach(rail => {
    const picks = ["heavy-tee-indigo", "oxford-chambray", "pocket-tee-rust", "heavy-tee-chalk", "longsleeve-black", "heavy-tee-moss"];
    rail.innerHTML = picks.map(id => {
      const p = PRODUCTS.find(x => x.id === id);
      return `<a class="rail-item" href="${ROOT}shop.html" aria-label="${p.name} in ${p.colorName}">${shirtSVG(p, false)}</a>`;
    }).join("");
  });
  document.addEventListener("submit", e => {
    if (!e.target.matches(".product-form")) return;
    e.preventDefault();
    addToCart(e.target.dataset.id, e.target.size.value);
  });
  const filters = document.querySelector(".filters");
  filters?.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    filters.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c === chip));
    const f = chip.dataset.filter;
    document.querySelectorAll(".product").forEach(el => (el.hidden = f !== "all" && el.dataset.type !== f));
  });
}

/* ---------- Cookie notice ----------
   The site only uses essential storage (your cart) today. If you add analytics
   or marketing pixels, load them ONLY inside loadOptionalScripts(). */
function loadOptionalScripts() {
  // e.g. Google Analytics / Meta Pixel goes here, so it only runs after consent.
}
function showCookieNotice(force = false) {
  const choice = store.get("fw-consent", null);
  if (choice && !force) { if (choice === "all") loadOptionalScripts(); return; }
  document.querySelector(".cookie")?.remove();
  document.body.insertAdjacentHTML("beforeend", `
    <div class="cookie" role="region" aria-label="Cookie preferences">
      <p>We use essential storage to keep your cart working. With your permission we'd also use analytics to see which pages are useful. <a href="${ROOT}legal/cookies.html">Read the cookie policy</a>.</p>
      <div class="actions">
        <button class="btn" data-consent="all">Accept analytics</button>
        <button class="btn btn-ghost" data-consent="essential">Essential only</button>
      </div>
    </div>`);
  document.querySelectorAll("[data-consent]").forEach(b => b.addEventListener("click", () => {
    store.set("fw-consent", b.dataset.consent);
    if (b.dataset.consent === "all") loadOptionalScripts();
    document.querySelector(".cookie").remove();
  }));
}

/* ---------- Newsletter + contact forms ---------- */
function wireForms() {
  document.querySelectorAll("form[data-signup]").forEach(form => form.addEventListener("submit", e => {
    e.preventDefault();
    const status = form.querySelector(".form-status");
    const email = form.email.value.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) { status.textContent = "Enter an email address like name@example.com."; form.email.focus(); return; }
    // TODO: send to your email provider (Mailchimp, Klaviyo, ConvertKit…).
    status.textContent = "You're on the list. Check your inbox to confirm.";
    form.reset();
  }));

  const contact = document.getElementById("contact-form");
  if (!contact) return;
  const validate = input => {
    const err = document.getElementById(input.id + "-error");
    let msg = "";
    if (input.required && !input.value.trim()) msg = "This field is required.";
    else if (input.type === "email" && !/^\S+@\S+\.\S+$/.test(input.value)) msg = "Enter an email address like name@example.com.";
    input.setAttribute("aria-invalid", !!msg);
    if (err) err.textContent = msg;
    return !msg;
  };
  contact.querySelectorAll("input, textarea").forEach(i => {
    i.addEventListener("blur", () => validate(i));
    i.addEventListener("input", () => i.getAttribute("aria-invalid") === "true" && validate(i));
  });
  contact.addEventListener("submit", e => {
    e.preventDefault();
    const fields = [...contact.querySelectorAll("input[required], textarea[required]")];
    const ok = fields.map(validate).every(Boolean);
    if (!ok) { fields.find(f => f.getAttribute("aria-invalid") === "true")?.focus(); return; }
    // TODO: point this at Formspree / Netlify Forms / your backend.
    document.getElementById("contact-status").textContent = "Message sent. We reply within 1–2 business days.";
    contact.reset();
  });
}

/* ---------- Homepage buy box for The White Tee ---------- */
const WHITE = PRODUCTS.find(p => p.id === "classic-white");
const GALLERY = [
  ["Front", () => shirtSVG(WHITE, false)],
  ["Back", () => shirtSVG(WHITE, false).replace(/<path d="M50 10 Q60 30[^>]+>/, '<path d="M54 12 Q80 20 106 12" fill="none" stroke="#c3c8d2" stroke-width="3"/>')],
  ["Three-pack", () => `<svg viewBox="0 0 160 160" aria-hidden="true">${[0, 1, 2].map(i =>
      `<g transform="translate(${30 + i * 4} ${96 - i * 30})"><rect width="96" height="34" rx="4" fill="#fff" stroke="#b9bec9" stroke-width="1.5"/><path d="M34 0 Q48 12 62 0" fill="none" stroke="#c3c8d2" stroke-width="2"/><line x1="0" y1="26" x2="96" y2="26" stroke="#e1e4ea"/></g>`).join("")}</svg>`],
  ["Fabric", () => `<svg viewBox="0 0 160 160" aria-hidden="true"><defs><pattern id="knit" width="10" height="12" patternUnits="userSpaceOnUse"><path d="M0 0 L5 12 L10 0" fill="none" stroke="#d3d8e1" stroke-width="2"/></pattern></defs><rect x="10" y="10" width="140" height="140" rx="10" fill="#fff"/><rect x="10" y="10" width="140" height="140" rx="10" fill="url(#knit)"/></svg>`],
];
const PACKS = [
  { id: "classic-white",    qty: 1,  label: "Single" },
  { id: "classic-white-3",  qty: 3,  label: "3-pack", tag: "Most popular" },
  { id: "classic-white-5",  qty: 5,  label: "5-pack" },
  { id: "classic-white-10", qty: 10, label: "10-pack", tag: "Best value" },
];

function renderBuyBox() {
  const box = document.getElementById("buy");
  if (!box) return;
  const stage = document.getElementById("gallery-stage");
  const thumbs = document.getElementById("gallery-thumbs");
  const show = i => {
    stage.innerHTML = GALLERY[i][1]();
    stage.setAttribute("aria-label", `The White Tee: ${GALLERY[i][0].toLowerCase()} view`);
    thumbs.querySelectorAll("button").forEach((b, j) => b.setAttribute("aria-current", i === j));
  };
  thumbs.innerHTML = GALLERY.map(([label, svg], i) =>
    `<button type="button" aria-label="Show ${label.toLowerCase()} view">${svg()}</button>`).join("");
  thumbs.addEventListener("click", e => {
    const b = e.target.closest("button");
    if (b) show([...thumbs.children].indexOf(b));
  });
  show(0);

  const single = WHITE.price;
  document.getElementById("packs").innerHTML = PACKS.map((pk, i) => {
    const p = PRODUCTS.find(x => x.id === pk.id);
    const each = p.price / pk.qty;
    const save = Math.round((1 - each / single) * 100);
    return `<label class="pack">
      <input type="radio" name="pack" value="${pk.id}"${i === 1 ? " checked" : ""}>
      ${pk.tag ? `<span class="pack-tag">${pk.tag}</span>` : ""}
      <span class="pack-qty">${pk.qty} ${pk.qty === 1 ? "tee" : "tees"}</span>
      <span class="pack-label">${pk.label}</span>
      <span class="pack-price">${money(p.price)}</span>
      <span class="pack-each">${money(each)} each${save > 0 ? `, save ${save}%` : ""}</span>
    </label>`;
  }).join("");

  const btn = document.getElementById("buy-btn");
  const update = () => {
    const p = PRODUCTS.find(x => x.id === box.pack.value);
    btn.textContent = `Add to cart, ${money(p.price)}`;
  };
  box.addEventListener("change", update);
  update();
  box.addEventListener("submit", e => {
    e.preventDefault();
    addToCart(box.pack.value, box.size.value);
  });
}

renderChrome();
renderBuyBox();
renderGrids();
renderCart();
wireForms();
showCookieNotice();
