(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const menuButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const header = document.querySelector(".site-header");
  const menuLinks = mobileMenu ? [...mobileMenu.querySelectorAll("a")] : [];
  let previousFocus = null;

  const setMenu = (open, restoreFocus = false) => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.inert = !open;
    document.body.classList.toggle("menu-open", open);
    if (open) {
      previousFocus = document.activeElement;
      menuLinks[0]?.focus();
    } else if (restoreFocus && previousFocus instanceof HTMLElement) {
      previousFocus.focus();
    }
  };

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true", true));
    menuLinks.forEach(link => link.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", event => {
      if (menuButton.getAttribute("aria-expanded") !== "true") return;
      if (event.key === "Escape") { event.preventDefault(); setMenu(false, true); return; }
      if (event.key !== "Tab") return;
      const focusable = [menuButton, ...menuLinks.filter(link => !link.hasAttribute("disabled"))];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    window.addEventListener("resize", () => { if (window.innerWidth > 900) setMenu(false); });
  }

  const progress = document.querySelector(".scroll-progress");
  let scrollScheduled = false;
  const updateScroll = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${total > 0 ? Math.min(1, window.scrollY / total) : 0})`;
    header?.classList.toggle("is-scrolled", window.scrollY > 22);
    scrollScheduled = false;
  };
  window.addEventListener("scroll", () => {
    if (!scrollScheduled) { window.requestAnimationFrame(updateScroll); scrollScheduled = true; }
  }, { passive: true });
  updateScroll();

  const revealEls = document.querySelectorAll(".reveal");
  if (!reducedMotion.matches && "IntersectionObserver" in window) document.documentElement.classList.add("js-motion");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealEls.forEach(el => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -28px 0px" });
    revealEls.forEach(el => observer.observe(el));
    reducedMotion.addEventListener("change", event => {
      if (event.matches) { observer.disconnect(); revealEls.forEach(el => el.classList.add("is-visible")); }
    });
  }

  document.querySelectorAll("[data-year]").forEach(el => { el.textContent = String(new Date().getFullYear()); });
  const config = window.KV_CONFIG || {};
  const email = typeof config.businessEmail === "string" ? config.businessEmail.trim() : "";
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  document.querySelectorAll("[data-business-email]").forEach(el => {
    if (isEmail) { el.textContent = email; el.setAttribute("href", `mailto:${email}`); el.hidden = false; }
  });
  if (isEmail) document.querySelectorAll("[data-email-placeholder]").forEach(el => { el.hidden = true; });

  const form = document.getElementById("project-form");
  if (!form) return;
  const submit = form.querySelector('button[type="submit"]');
  const label = submit?.querySelector(".submit-label");
  const status = document.getElementById("form-status");
  const endpoint = typeof config.formEndpoint === "string" ? config.formEndpoint.trim() : "";
  const configured = /^https:\/\/formspree\.io\/f\/[a-z0-9]{5,}$/i.test(endpoint);
  const showStatus = (message, state) => {
    if (!status) return;
    status.hidden = false;
    status.className = `form-status ${state === "success" ? "form-status-success" : "form-status-error"}`;
    status.textContent = message;
  };

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const honeypot = form.querySelector('input[name="_gotcha"]');
    if (honeypot?.value) { showStatus("We couldn't process this submission. Please try again.", "error"); return; }
    if (!configured) {
      showStatus("This form is not connected yet. The studio needs to configure its contact service before submissions can be sent." + (isEmail ? ` Please email us at ${email}.` : ""), "error");
      return;
    }
    if (submit) { submit.disabled = true; submit.classList.add("is-loading"); }
    if (label) label.textContent = "Sending…";
    if (status) status.hidden = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 18000);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form),
        signal: controller.signal
      });
      let result = {};
      try { result = await response.json(); } catch { /* Responses without JSON are handled below. */ }
      if (!response.ok) {
        const formErrors = Array.isArray(result.errors) ? result.errors.map(error => error.message).filter(Boolean).join(" ") : "";
        throw new Error(formErrors || "The message could not be sent. Please try again or use email.");
      }
      showStatus("Thank you. Your inquiry was sent successfully. We'll be in touch using the email you provided.", "success");
      form.reset();
    } catch (error) {
      const message = error.name === "AbortError" ? "The request timed out. Please try again or contact us by email." : (error instanceof TypeError ? "We couldn't connect to the contact service. Check your internet connection and try again." : error.message);
      showStatus(message || "Something went wrong. Please try again.", "error");
    } finally {
      window.clearTimeout(timeout);
      if (submit) { submit.disabled = false; submit.classList.remove("is-loading"); }
      if (label) label.textContent = "Request a Quote";
    }
  });
})();
