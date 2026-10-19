import "./style.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { restaurant, products, combo } from "./config.js";
import { formatPrice, whatsappLink, safeExternalUrl } from "./order.js";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [
  ...scope.querySelectorAll(selector),
];
const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[char],
  );
const imagePath = (value) =>
  /^\/assets\/[a-zA-Z0-9._-]+$/.test(value)
    ? value
    : "/assets/burger-classic.webp";
let smoother;
let activeProduct;
let quantity = 1;
let dialogTrigger;
const productDialog = $("#product-dialog");
const channelsDialog = $("#channels-dialog");
const mobileNav = $("#mobile-nav");
const menuToggle = $(".menu-toggle");

// Content is kept in config.js; rendering never injects unescaped merchant text.
$$("[data-brand]").forEach((el) => (el.textContent = restaurant.name));
$$("[data-address]").forEach((el) => (el.textContent = restaurant.address));
$$("[data-hours]").forEach((el) => (el.textContent = restaurant.hours));
$("#year").textContent = new Date().getFullYear();
$(".combo-price").textContent = formatPrice(combo.price);
$(".combo-description").textContent = combo.description;
$("#product-grid").innerHTML = products
  .map(
    (product, i) => `
  <article class="product-card" data-item-category="${escapeHtml(product.category)}">
    <button class="product-photo" data-product="${escapeHtml(product.id)}" aria-label="Ver detalhes de ${escapeHtml(product.name)}">
      ${product.tag ? `<span class="product-tag ${escapeHtml(product.accent)}">${escapeHtml(product.tag)}</span>` : ""}
      <span class="product-index" aria-hidden="true">0${i + 1}</span>
      <img src="${imagePath(product.image)}" alt="${escapeHtml(product.alt)}" width="627" height="627" loading="lazy" />
    </button>
    <div class="product-meta"><div><h3><button data-product="${escapeHtml(product.id)}">${escapeHtml(product.name)}</button></h3><p>${escapeHtml(product.label)}</p></div></div>
    <div class="product-bottom"><span class="product-price">${formatPrice(product.price)}</span><button class="product-add" data-product="${escapeHtml(product.id)}" aria-label="Escolher ${escapeHtml(product.name)}">+</button></div>
  </article>`,
  )
  .join("");
// Wrap each word of the manifesto statement (inside <em> too) so it can
// light up on scroll; text stays a single readable heading.
const wrapWords = (node) =>
  [...node.childNodes].forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      const parts = child.textContent.split(/(\s+)/);
      child.replaceWith(
        ...parts.map((part) => {
          if (!part.trim()) return document.createTextNode(part);
          const word = document.createElement("span");
          word.className = "word";
          word.textContent = part;
          return word;
        }),
      );
    } else wrapWords(child);
  });
wrapWords($(".manifesto-statement"));
// Scroll showcase: one burger at a time, each on its own colour, swapped
// vertically while pinned.
const featured = products.filter((product) => product.showcase);
const pad = (n) => String(n).padStart(2, "0");
const safeColor = (value, fallback) =>
  /^#[0-9a-f]{3,8}$/i.test(value) ? value : fallback;
const showcaseBg = ({ showcase }) => safeColor(showcase.bg, "#171714");
const showcaseVars = ({ showcase }) => ({
  "--stack-fg": safeColor(showcase.text, "#f2e8d5"),
  "--stack-accent": safeColor(showcase.accent, "#ff5a24"),
});
const styleFrom = (vars) =>
  Object.entries(vars)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");
$(".stack-bgs").innerHTML = featured
  .map(
    (product) =>
      `<span style="background:${showcaseBg(product)}"></span>`,
  )
  .join("");
$("#stack-list").innerHTML = featured
  .map(
    (product, i) => `
  <li class="stack-item" style="${styleFrom({ "--stack-bg": showcaseBg(product), ...showcaseVars(product) })}">
    <div class="stack-copy">
      <span class="stack-label">${escapeHtml(product.label)}</span>
      <h3>${escapeHtml(product.name)}</h3>
      <p>${escapeHtml(product.description)}</p>
    </div>
    <div class="stack-photo">
      <span class="stack-index" aria-hidden="true">${pad(i + 1)}</span>
      <img src="${imagePath(product.cutout)}" alt="${escapeHtml(product.alt)}" width="640" height="540" loading="lazy" />
    </div>
  </li>`,
  )
  .join("");
$(".stack-counter-reel").innerHTML = featured
  .map((_, i) => `<span>${pad(i + 1)}</span>`)
  .join("");
$(".stack-counter-total").textContent = `/ ${pad(featured.length)}`;

function closeMobileMenu(restoreFocus = false) {
  mobileNav.classList.remove("open");
  mobileNav.inert = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("menu-open");
  $(".site-header").classList.remove("menu-is-open");
  $("#smooth-wrapper").inert = false;
  smoother?.paused(false);
  if (restoreFocus) menuToggle.focus();
}
menuToggle.addEventListener("click", () => {
  if (menuToggle.getAttribute("aria-expanded") === "true")
    return closeMobileMenu(true);
  mobileNav.inert = false;
  mobileNav.classList.add("open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Fechar menu");
  document.body.classList.add("menu-open");
  $(".site-header").classList.add("menu-is-open");
  $("#smooth-wrapper").inert = true;
  smoother?.paused(true);
  $("a", mobileNav).focus();
});
document.addEventListener("keydown", (event) => {
  if (!mobileNav.classList.contains("open")) return;
  if (event.key === "Escape") closeMobileMenu(true);
  if (event.key === "Tab") {
    const focusable = [menuToggle, ...$$("a,button", mobileNav)];
    const current = focusable.indexOf(document.activeElement);
    event.preventDefault();
    focusable[
      (current + (event.shiftKey ? -1 : 1) + focusable.length) %
        focusable.length
    ].focus();
  }
});
window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
  if (e.matches) closeMobileMenu();
});

$$('a[href^="#"]').forEach((anchor) =>
  anchor.addEventListener("click", (event) => {
    const hash = anchor.getAttribute("href");
    const target = $(hash);
    if (!target) return;
    event.preventDefault();
    closeMobileMenu();
    if (smoother) smoother.scrollTo(target, true, "top 30px");
    else
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    history.pushState(null, "", hash);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }),
);
// popstate below owns scroll on back/forward; the browser's own restoration
// races ScrollSmoother and can leave the content stuck mid-page.
history.scrollRestoration = "manual";
window.addEventListener("popstate", () => {
  const target = $(location.hash || "#inicio");
  if (target) {
    if (smoother) smoother.scrollTo(target, false);
    else target.scrollIntoView({ behavior: "instant" });
  }
});

$$(".category").forEach((button) =>
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    $$(".category").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    $$(".product-card").forEach(
      (card) =>
        (card.hidden =
          category !== "all" && card.dataset.itemCategory !== category),
    );
    const visible = $$(".product-card:not([hidden])");
    $(".menu-count").textContent =
      `${visible.length} ${visible.length === 1 ? "bom motivo." : "bons motivos."}`;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(
        visible,
        { opacity: 0.2, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.045,
          overwrite: true,
          onComplete: () => ScrollTrigger.refresh(),
        },
      );
    }
    ScrollTrigger.refresh();
  }),
);

function updateQuantity() {
  $("#quantity").textContent = quantity;
  $("#quantity-minus").disabled = quantity <= 1;
  $("#quantity-plus").disabled = quantity >= 20;
  $("#dialog-price").textContent = formatPrice(activeProduct.price * quantity);
}
function openDialog(dialog, trigger) {
  dialogTrigger = trigger || document.activeElement;
  closeMobileMenu();
  smoother?.paused(true);
  document.body.style.overflow = "hidden";
  dialog.showModal();
  $(".dialog-close", dialog).focus();
}
function openProduct(id, trigger) {
  activeProduct = [...products, combo].find((product) => product.id === id);
  if (!activeProduct) return;
  quantity = 1;
  $("#dialog-title").textContent = activeProduct.name;
  $("#dialog-description").textContent = activeProduct.description;
  $("#dialog-img").src = imagePath(activeProduct.image);
  $("#dialog-img").alt = activeProduct.alt;
  $("#dialog-ingredients").innerHTML = activeProduct.ingredients
    .map((ingredient) => `<span>${escapeHtml(ingredient)}</span>`)
    .join("");
  $("#dialog-allergens").textContent = activeProduct.allergens;
  $("#order-note").value = "";
  updateQuantity();
  openDialog(productDialog, trigger);
}
$$("[data-product]").forEach((button) =>
  button.addEventListener("click", () =>
    openProduct(button.dataset.product, button),
  ),
);
$("#quantity-minus").addEventListener("click", () => {
  quantity = Math.max(1, quantity - 1);
  updateQuantity();
});
$("#quantity-plus").addEventListener("click", () => {
  quantity = Math.min(20, quantity + 1);
  updateQuantity();
});

function openChannels(channel, product, count = 1, note = "", trigger) {
  const whatsapp = whatsappLink(restaurant.whatsapp, product, count, note);
  const delivery = safeExternalUrl(restaurant.deliveryUrl);
  const allMissing = !whatsapp && !delivery;
  $("#channels-title").innerHTML = allMissing
    ? "SUA FOME.<br>NOSSO PRÓXIMO PASSO."
    : "BORA MATAR<br>ESSA FOME?";
  $("#channels-description").textContent = allMissing
    ? "Você está explorando um cardápio demonstrativo. Os canais de pedido desta hamburgueria ainda não estão conectados."
    : "Escolha seu canal. A disponibilidade e o valor final serão confirmados no atendimento.";
  $("#channel-actions").innerHTML =
    `${product ? `<div class="channel-summary"><strong>${count}× ${escapeHtml(product.name)} — ${formatPrice(product.price * count)}</strong>Seu pedido ainda não foi enviado.</div>` : ""}
    ${whatsapp ? `<a class="channel-option" href="${escapeHtml(whatsapp)}" target="_blank" rel="noopener noreferrer">Continuar no WhatsApp <span aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.6"/></svg></span></a>` : '<button class="channel-option" disabled><span>WhatsApp</span><small>Não configurado</small></button>'}
    ${delivery ? `<a class="channel-option" href="${escapeHtml(delivery)}" target="_blank" rel="noopener noreferrer">Abrir delivery <span aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.6"/></svg></span></a>` : '<button class="channel-option" disabled><span>Delivery</span><small>Não configurado</small></button>'}`;
  if (productDialog.open) productDialog.close();
  openDialog(channelsDialog, trigger);
}
$("#product-order").addEventListener("click", () => {
  const link = whatsappLink(
    restaurant.whatsapp,
    activeProduct,
    quantity,
    $("#order-note").value,
  );
  if (link) window.open(link, "_blank", "noopener,noreferrer");
  else
    openChannels(
      "whatsapp",
      activeProduct,
      quantity,
      $("#order-note").value,
      dialogTrigger,
    );
});
$$("[data-order]").forEach((button) =>
  button.addEventListener("click", () =>
    openChannels(null, null, 1, "", button),
  ),
);
$$("[data-channel]").forEach((button) =>
  button.addEventListener("click", () => {
    const channel = button.dataset.channel;
    const url =
      channel === "whatsapp"
        ? whatsappLink(restaurant.whatsapp)
        : safeExternalUrl(restaurant.deliveryUrl);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
    else openChannels(channel, null, 1, "", button);
  }),
);
$$("dialog").forEach((dialog) => {
  $(".dialog-close", dialog).addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    )
      dialog.close();
  });
  dialog.addEventListener("close", () => {
    if ($("dialog[open]")) return;
    document.body.style.overflow = "";
    smoother?.paused(false);
    if (dialogTrigger?.isConnected)
      dialogTrigger.focus({ preventScroll: true });
  });
});

// Browsers without VP9 alpha fall back to the opaque MP4 (see .is-opaque).
const heroVideo = $(".hero-burger");
const markOpaqueVideo = () =>
  heroVideo.classList.toggle(
    "is-opaque",
    heroVideo.currentSrc.endsWith(".mp4"),
  );
heroVideo.addEventListener("loadedmetadata", markOpaqueVideo);
if (heroVideo.readyState) markOpaqueVideo();
const fillEmbers = (el, count) =>
  (el.innerHTML = Array.from(
    { length: count },
    () =>
      `<i style="--x:${Math.random() * 100}%;--s:${2 + Math.random() * 4}px;--d:${3 + Math.random() * 4}s;--delay:${-Math.random() * 6}s;--drift:${Math.random() * 120 - 60}px"></i>`,
  ).join(""));
// Preloader: the counter runs to 84 on its own, then waits for the hero
// video and fonts (6s at most) before finishing and wiping away. The hero
// intro waits on preloaderDone.
let resolvePreloader;
const preloaderDone = new Promise((resolve) => (resolvePreloader = resolve));
const assetsReady = Promise.race([
  Promise.all([
    document.fonts.ready,
    new Promise((resolve) => {
      if (heroVideo.readyState >= 3) return resolve();
      heroVideo.addEventListener("canplaythrough", resolve, { once: true });
    }),
  ]),
  new Promise((resolve) => setTimeout(resolve, 6000)),
]);
function runPreloader() {
  const preloader = $(".preloader");
  const finish = () => {
    preloader.remove();
    document.documentElement.classList.remove("is-loading");
    resolvePreloader();
    ScrollTrigger.refresh();
  };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    assetsReady.then(() =>
      gsap.to(preloader, { opacity: 0, duration: 0.3, onComplete: finish }),
    );
    return;
  }
  fillEmbers($(".preloader-embers"), 26);
  const state = { value: 0 };
  const count = $(".preloader-count");
  const fill = $(".preloader-fill");
  const bar = $(".preloader-bar > span");
  const step = $(".preloader-step");
  const steps = [
    [0, "ACENDENDO A BRASA"],
    [30, "SELANDO O PÃO"],
    [60, "DERRETENDO O CHEDDAR"],
    [92, "PRONTO PRA MORDIDA"],
  ];
  const render = () => {
    const value = Math.round(state.value);
    count.textContent = String(value).padStart(3, "0");
    fill.style.setProperty("--fill", `${state.value}%`);
    bar.style.transform = `scaleX(${state.value / 100})`;
    const label = steps.filter(([at]) => value >= at).pop()[1];
    if (step.textContent !== label) {
      step.textContent = label;
      gsap.fromTo(
        step,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.35, ease: "power3.out" },
      );
    }
  };
  const covered = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 118%)";
  const lifted = "polygon(0% 0%, 100% 0%, 100% -18%, 0% 0%)";
  const intro = gsap
    .timeline()
    .from(".preloader-top > span", {
      y: -20,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: "power3.out",
    })
    .from(
      ".preloader-flame",
      { scale: 0, opacity: 0, duration: 0.6, ease: "back.out(2)" },
      0.1,
    )
    .from(
      ".preloader-word > span",
      { yPercent: 100, duration: 0.9, ease: "power4.out" },
      0.15,
    )
    .to(
      state,
      { value: 84, duration: 1.9, ease: "power2.inOut", onUpdate: render },
      0.3,
    );
  Promise.all([intro.then(), assetsReady]).then(() =>
    gsap
      .timeline({ onComplete: finish })
      .to(state, {
        value: 100,
        duration: 0.45,
        ease: "power2.out",
        onUpdate: render,
      })
      .to(
        ".preloader-flame",
        { scale: 1.8, opacity: 0, duration: 0.35, ease: "power2.in" },
        "+=0.15",
      )
      .to(
        ".preloader-word > span",
        { yPercent: -110, duration: 0.6, ease: "power4.in" },
        "<",
      )
      .to(".preloader-top, .preloader-bottom", { opacity: 0, duration: 0.3 }, "<")
      .fromTo(
        ".preloader-ink",
        { clipPath: covered },
        { clipPath: lifted, duration: 0.9, ease: "power4.inOut" },
        "-=0.1",
      )
      .fromTo(
        ".preloader-orange",
        { clipPath: covered },
        { clipPath: lifted, duration: 0.9, ease: "power4.inOut" },
        "-=0.72",
      )
      // Start the hero reveal while the orange layer is still lifting.
      .add(() => {
        heroVideo.currentTime = 0;
        resolvePreloader();
      }, "-=0.55"),
  );
}
runPreloader();
// Ticker loops by sliding -50% over two identical groups; each group must be
// at least as wide as the screen or a gap shows before the loop restarts.
const fillTicker = () => {
  const track = $(".ticker-track");
  if (track.dataset.filled) return;
  const group = track.querySelector(".ticker-group");
  const items = [...group.children];
  const minWidth = Math.max(window.innerWidth, window.screen.width);
  while (group.offsetWidth && group.offsetWidth < minWidth)
    items.forEach((item) => group.append(item.cloneNode(true)));
  track.append(group.cloneNode(true));
  track.dataset.filled = "true";
};
// Motion storyboard: hero reveals → product drifts → ticker → editorial section entrances.
// All useful content starts visible; reduced motion uses the same layout without animated transforms.
const media = gsap.matchMedia();
media.add(
  {
    desktop: "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    motion: "(prefers-reduced-motion: no-preference)",
  },
  (context) => {
    const { desktop, motion } = context.conditions;
    if (!motion) return;
    if (desktop)
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 0.9,
        effects: false,
        smoothTouch: false,
        normalizeScroll: false,
      });
    const intro = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out" },
    });
    preloaderDone.then(() => intro.play());
    intro
      .from(".hero-line", { y: 35, opacity: 0, stagger: 0.12, duration: 0.85 })
      .from(
        ".hero-burger",
        { x: 50, rotation: 3, opacity: 0, duration: 1.1 },
        0.1,
      )
      .from(
        ".hero-actions>p,.hero-cta,.hero-note",
        { y: 14, opacity: 0, stagger: 0.08, duration: 0.6 },
        0.4,
      )
      .from(
        ".round-stamp",
        { scale: 0.7, opacity: 0, rotation: -20, duration: 0.7 },
        0.65,
      );
    fillTicker();
    gsap.to(".ticker-track", {
      xPercent: -50,
      ease: "none",
      duration: 28,
      repeat: -1,
    });
    // Pinned showcase: each scroll step pushes the current burger up and out
    // while the next rises from below; counter and progress bar follow.
    const stackSection = $(".stack-section");
    // Colours go on the inner wrapper: pinning restores the section's own
    // inline styles on refresh, which would wipe them.
    const stackPin = $(".stack-pin");
    const stage = $(".stack-stage");
    const items = $$(".stack-item");
    const stageHeight = () => stage.offsetHeight;
    // Text colours follow the active item; @property makes them transition.
    const setActive = (index) => {
      items.forEach((item, i) => (item.inert = i !== index));
      Object.entries(showcaseVars(featured[index])).forEach(([key, value]) =>
        stackPin.style.setProperty(key, value),
      );
    };
    // Each colour panel wipes up from below with a slanted top edge.
    const panels = $$(".stack-bgs > span");
    const hiddenPanel = "polygon(0% 135%, 100% 118%, 100% 135%, 0% 135%)";
    const shownPanel = "polygon(0% 0%, 100% -17%, 100% 135%, 0% 135%)";
    stackSection.classList.add("is-pinned");
    setActive(0);
    gsap.set(panels.slice(1), { clipPath: hiddenPanel });
    const stack = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: 1 },
      scrollTrigger: {
        trigger: stackSection,
        pin: true,
        start: "top top",
        end: () => `+=${(items.length - 1) * window.innerHeight}`,
        scrub: 0.6,
        snap: {
          snapTo: 1 / (items.length - 1),
          duration: { min: 0.2, max: 0.6 },
          ease: "power2.inOut",
        },
        invalidateOnRefresh: true,
        onUpdate: (self) =>
          setActive(Math.round(self.progress * (items.length - 1))),
      },
    });
    items.slice(1).forEach((item, i) => {
      const prev = items[i];
      stack
        .fromTo(
          panels[i + 1],
          { clipPath: hiddenPanel },
          { clipPath: shownPanel },
          i,
        )
        .to($(".stack-photo", prev), { y: () => -stageHeight() }, i)
        .fromTo(
          $(".stack-photo", item),
          { y: () => stageHeight() },
          { y: 0 },
          i,
        )
        .fromTo(
          $("img", item),
          { scale: 0.8, rotation: -10 },
          { scale: 1, rotation: 0 },
          i,
        )
        .to(
          $(".stack-copy", prev),
          { y: () => -stageHeight() * 0.5, opacity: 0 },
          i,
        )
        .fromTo(
          $(".stack-copy", item),
          { y: () => stageHeight() * 0.5, opacity: 0 },
          { y: 0, opacity: 1 },
          i + 0.15,
        );
    });
    stack
      .fromTo(
        ".stack-counter-reel",
        { yPercent: 0 },
        {
          yPercent: (-100 * (items.length - 1)) / items.length,
          ease: "none",
          duration: items.length - 1,
        },
        0,
      )
      .fromTo(
        ".stack-progress-fill",
        { scaleY: 1 / items.length },
        { scaleY: 1, ease: "none", duration: items.length - 1 },
        0,
      );
    if (desktop) {
      gsap.to(".hero-burger", {
        y: 65,
        rotation: -3,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      // Stage: burger rises and turns while the word slides the other way.
      gsap.fromTo(
        ".stage-burger",
        { y: 70, rotation: -8 },
        {
          y: -50,
          rotation: 5,
          ease: "none",
          scrollTrigger: {
            trigger: ".manifesto-stage",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      gsap.fromTo(
        ".stage-word",
        { xPercent: 8 },
        {
          xPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: ".manifesto-stage",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }
    // Combo: plates spin in one by one, then the price sticker stamps down.
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".combo-equation",
          start: "top 80%",
          once: true,
        },
      })
      .from(".combo-item", {
        scale: 0.4,
        rotation: -40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: "back.out(1.6)",
      })
      .from(
        ".combo-op",
        { scale: 0, opacity: 0, duration: 0.4, stagger: 0.14 },
        0.25,
      )
      .from(
        ".combo-sticker",
        {
          scale: 1.8,
          rotation: 25,
          opacity: 0,
          duration: 0.45,
          ease: "power4.in",
        },
        ">-0.1",
      );
    // Manifesto: words light up as the statement scrolls through.
    gsap.fromTo(
      ".manifesto-statement .word",
      { opacity: 0.14 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto-statement",
          start: "top 80%",
          end: "bottom 45%",
          scrub: true,
        },
      },
    );
    // Footer wordmark fills with fire as it comes into view.
    gsap.fromTo(
      ".footer-word-fill",
      { "--fill": "0%" },
      {
        "--fill": "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".footer-wordmark",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      },
    );
    fillEmbers($(".footer-embers"), 18);
    $$(".section-heading h2,.contact-heading h2").forEach(
      (heading) =>
        gsap.from(heading, {
          y: 25,
          opacity: 0.3,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: heading, start: "top 93%", once: true },
        }),
    );
    return () => {
      stackSection.classList.remove("is-pinned");
      stackPin.removeAttribute("style");
      items.forEach((item) => (item.inert = false));
      if (smoother) {
        smoother.kill();
        smoother = undefined;
      }
    };
  },
);
Promise.all([
  document.fonts.ready,
  ...$$("img").map((img) =>
    img.complete
      ? Promise.resolve()
      : new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        }),
  ),
]).then(() => ScrollTrigger.refresh());
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
  if (location.hash && $(location.hash)) {
    const target = $(location.hash);
    if (smoother) smoother.scrollTo(target, false);
    else target.scrollIntoView();
  }
});
window.addEventListener("pagehide", () => media.revert(), { once: true });
if (import.meta.hot) import.meta.hot.dispose(() => media.revert());
