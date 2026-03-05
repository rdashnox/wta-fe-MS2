import { g as getContext, s as store_get, e as escape_html, u as unsubscribe_stores, f as fallback, b as bind_props, a as attr_class, c as stringify, d as slot } from "../../chunks/index2.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
import "../../chunks/state.svelte.js";
import { w as writable } from "../../chunks/index.js";
import "../../chunks/LoginModal.svelte_svelte_type_style_lang.js";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const user = writable(null);
const isAuthenticated = writable(false);
const authUpdated = writable(0);
const toast = writable(null);
function TopNav($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    store_get($$store_subs ??= {}, "$authUpdated", authUpdated);
    $$renderer2.push(`<nav class="navbar navbar-expand-lg custom-glass-navbar"><div class="container navbar__container"><a href="/" class="navbar__logo-link" aria-label="Skye Suites Home"><img src="/images/logo.png" alt="Skye Suites Logo" class="navbar__logo" loading="lazy"/></a> <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNav" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button> <div class="collapse navbar-collapse d-none d-lg-flex"><ul class="navbar-nav ms-auto mb-2 mb-lg-0"><li class="nav-item"><a href="/" class="nav-link">Home</a></li> <li class="nav-item"><a href="/suites" class="nav-link">Suites</a></li> <li class="nav-item"><a href="/dining" class="nav-link">Dining</a></li> <li class="nav-item"><a href="/experience" class="nav-link">Experience</a></li> <li class="nav-item"><a href="/access" class="nav-link">Access</a></li></ul> <div class="ms-lg-3 d-flex align-items-center gap-2">`);
    if (store_get($$store_subs ??= {}, "$isAuthenticated", isAuthenticated)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="position-relative account-dropdown"><button class="btn btn-outline-light btn-sm dropdown-toggle" type="button">${escape_html(store_get($$store_subs ??= {}, "$user", user).email)}</button> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button class="btn btn-outline-light btn-sm">Login</button> <button class="btn btn-danger btn-sm">Register</button>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></nav> <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNav"><div class="offcanvas-header"><h5 class="offcanvas-title">Menu</h5> <button class="btn-close" data-bs-dismiss="offcanvas"></button></div> <div class="offcanvas-body custom-vertical-center"><ul class="navbar-nav"><li class="nav-item"><a href="/" class="nav-link">Home</a></li> <li class="nav-item"><a href="/suites" class="nav-link">Suites</a></li> <li class="nav-item"><a href="/dining" class="nav-link">Dining</a></li> <li class="nav-item"><a href="/experience" class="nav-link">Experience</a></li> <li class="nav-item"><a href="/access" class="nav-link">Access</a></li></ul> <div class="mt-3 d-grid gap-2">`);
    if (!store_get($$store_subs ??= {}, "$isAuthenticated", isAuthenticated)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="btn btn-outline-secondary">Login</button> <button class="btn btn-danger">Register</button>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="account-dropdown"><button class="btn btn-outline-secondary w-100 dropdown-toggle">${escape_html(store_get($$store_subs ??= {}, "$user", user).email)}</button> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Footer($$renderer) {
  $$renderer.push(`<footer class="footer"><div class="footer__container"><section class="footer__column" aria-labelledby="footer-contact-heading"><h3 id="footer-contact-heading" class="footer__heading">Contact Us</h3> <ul class="footer__list"><li class="footer__list-item"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> 15A Avocado Villa, Atchuete Estate Linapacan Island, Palawan 5313</li> <li class="footer__list-item"><i class="fa-solid fa-phone" aria-hidden="true"></i> +63 917 987 6543 /
          +63 2 888 2345</li> <li class="footer__list-item"><i class="fa-solid fa-envelope" aria-hidden="true"></i> <a href="mailto:info@skyesuiteshotel.com">info@skyesuiteshotel.com</a></li></ul></section> <section class="footer__column" aria-labelledby="footer-social-heading"><h3 id="footer-social-heading" class="footer__heading">Follow Us</h3> <nav aria-label="Social media links" class="footer__socials"><a href="https://en.wikipedia.org/wiki/Facebook" aria-label="Facebook" class="footer__social-link" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook"></i></a> <a href="https://en.wikipedia.org/wiki/Instagram" aria-label="Instagram" class="footer__social-link" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></a> <a href="https://en.wikipedia.org/wiki/Pinterest" aria-label="Pinterest" class="footer__social-link" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-pinterest"></i></a> <a href="https://en.wikipedia.org/wiki/YouTube" aria-label="YouTube" class="footer__social-link" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube"></i></a></nav></section> <section class="footer__column" aria-labelledby="footer-newsletter-heading"><h3 id="footer-newsletter-heading" class="footer__heading">Subscribe to our newsletter</h3> <form id="newsletter-form" class="needs-validation" novalidate=""><div class="mb-3"><label for="newsletter-email" class="visually-hidden">Email address</label> <input type="email" class="form-control" id="newsletter-email" name="newsletterEmail" placeholder="Email address" required=""/> <div class="invalid-feedback">Please enter a valid email.</div></div> <button type="submit" class="btn btn-danger w-100" id="footerSubscribeBtn">Subscribe</button></form></section></div></footer>  <div class="modal fade" id="newsletterModal" tabindex="-1" aria-labelledby="newsletterModalLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content modal-newsletter"><div class="modal-newsletter__header modal-header flex-column text-center border-0"><img src="./images/logo.png" alt="Skye Suites Logo" class="modal-newsletter__logo" loading="lazy"/> <h5 class="modal-title fw-bold" id="newsletterModalLabel">Subscribe to Our Newsletter</h5> <p class="modal-newsletter__subtitle small">Be the first to receive exclusive offers and updates.</p> <button type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close" id="modalCloseBtn"></button></div> <form id="modal-newsletter-form" class="modal-newsletter__form needs-validation" novalidate=""><div class="modal-body px-4"><div class="mb-3"><label for="modal-newsletter-email" class="form-label visually-hidden">Email address</label> <input type="email" class="form-control modal-newsletter__input" id="modal-newsletter-email" name="newsletterEmail" placeholder="Enter your email" required=""/> <div class="invalid-feedback text-light">Please enter a valid email.</div></div></div> <div class="modal-footer d-flex justify-content-between border-0 px-4 pb-4"><button type="button" class="btn btn-outline-secondary modal-newsletter__btn-no" id="modal-no-thanks-btn">No Thanks</button> <button type="submit" class="btn btn-danger fw-bold w-50">Subscribe</button></div></form></div></div></div>  <div aria-live="polite" aria-atomic="true" class="position-fixed top-0 end-0 p-3" style="z-index: 1100"><div id="liveToast" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true"><div class="d-flex"><div class="toast-body" id="toastMessage"></div> <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div></div></div>`);
}
function Showcase($$renderer, $$props) {
  let title = fallback($$props["title"], "");
  let showSlideshow = fallback($$props["showSlideshow"], false);
  if (showSlideshow) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="hero-slideshow svelte-9nngpf"><div class="slide slide1 svelte-9nngpf"></div> <div class="slide slide2 svelte-9nngpf"></div> <div class="slide slide3 svelte-9nngpf"></div> <div class="slide slide4 svelte-9nngpf"></div> <div class="slide slide5 svelte-9nngpf"></div> <div class="slide slide6 svelte-9nngpf"></div></div>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> <div class="showcase index--showcase svelte-9nngpf"><h1 class="showcase__title svelte-9nngpf">${escape_html(title)}</h1></div>`);
  bind_props($$props, { title, showSlideshow });
}
const headerMap = {
  "/": {
    class: "index-header",
    showcase: {
      title: "Your Sanctuary of Calm Adventure",
      slideshow: true
    }
  },
  "/access": {
    class: "access-header",
    showcase: {
      title: "Seamless Access to Paradise"
    }
  },
  "/suites": {
    class: "suites-header",
    match: (path) => path.startsWith("/suites"),
    showcase: {
      title: "Experience Like Never Before"
    }
  },
  "/dining": {
    class: "dining-header",
    showcase: {
      title: "Excellence with Every Bite"
    }
  },
  "/experience": {
    class: "experience-header",
    showcase: {
      title: "Serenity Meets Adventure"
    }
  }
};
function Toast($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    if (store_get($$store_subs ??= {}, "$toast", toast)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="toast-container position-fixed top-0 end-0 p-3"><div${attr_class(`toast show text-bg-${stringify(store_get($$store_subs ??= {}, "$toast", toast).variant)} border-0`)}><div class="d-flex"><div class="toast-body">${escape_html(store_get($$store_subs ??= {}, "$toast", toast).message)}</div> <button class="btn-close btn-close-white me-2 m-auto"></button></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let path, headerConfig;
    path = store_get($$store_subs ??= {}, "$page", page).url.pathname;
    headerConfig = (() => {
      if (headerMap[path]) return headerMap[path];
      return Object.values(headerMap).find((cfg) => cfg.match?.(path));
    })();
    $$renderer2.push(`<header${attr_class(`header ${headerConfig?.class ?? ""}`)}>`);
    TopNav($$renderer2);
    $$renderer2.push(`<!----> `);
    if (headerConfig?.showcase) {
      $$renderer2.push("<!--[-->");
      Showcase($$renderer2, {
        title: headerConfig.showcase.title,
        showSlideshow: headerConfig.showcase.slideshow
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></header> `);
    Toast($$renderer2);
    $$renderer2.push(`<!----> <!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
