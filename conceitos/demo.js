"use strict";
(() => {
  const toggle = document.querySelector(".demo-menu-toggle");
  const nav = document.getElementById("demo-nav");
  const mobile = window.matchMedia("(max-width: 700px)");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    toggle.textContent = open ? "Fechar ×" : "Menu +";
  };
  nav.classList.add("is-enhanced");
  toggle.hidden = !mobile.matches;
  toggle.addEventListener("click", () =>
    setMenu(toggle.getAttribute("aria-expanded") !== "true"),
  );
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      setMenu(false);
      if (
        link.hash &&
        link.getAttribute("href").startsWith("#") &&
        mobile.matches
      ) {
        const section = document.querySelector(link.hash);
        if (section) {
          section.tabIndex = -1;
          section.focus({ preventScroll: true });
        }
      }
    }),
  );
  const sync = () => {
    toggle.hidden = !mobile.matches;
    setMenu(false);
  };
  if (mobile.addEventListener) mobile.addEventListener("change", sync);
  else mobile.addListener(sync);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".demo-header")) setMenu(false);
  });
  document.getElementById("demo-year").textContent = new Date().getFullYear();
  if ("IntersectionObserver" in window) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!reduced.matches) entry.target.classList.add("demo-enter");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(
        ".demo-about, .demo-section-heading, .demo-service-grid article",
      )
      .forEach((element) => observer.observe(element));
  }
})();
