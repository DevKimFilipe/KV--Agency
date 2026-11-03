/* KV Agência — movimento progressivo, sem dependências externas. */
"use strict";
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const body = document.body;
  const chapterText = document.getElementById("cinema-chapter-text");
  const seal = document.querySelector(".kv-hero-seal");
  const hero = document.getElementById("inicio");
  let heroVisible = true;
  let frame = 0;
  const paused = () => reduced.matches || body.classList.contains("motion-paused") || document.hidden;
  const reset = () => {
    if (seal) seal.style.removeProperty("--cinema-drift");
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };
  const paint = () => {
    frame = 0;
    if (paused() || !heroVisible || !seal) return;
    const distance = Math.max(0, Math.min(window.scrollY, window.innerHeight));
    seal.style.setProperty("--cinema-drift", `${Math.round(distance * 0.10)}px`);
  };
  const queue = () => {
    if (!paused() && heroVisible && !frame) frame = requestAnimationFrame(paint);
  };
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue, { passive: true });
  document.addEventListener("visibilitychange", () => document.hidden ? reset() : queue());
  const motionButton = document.getElementById("motion-toggle");
  if (motionButton) motionButton.addEventListener("click", () => {
    if (paused()) reset(); else queue();
  });
  const onPreference = () => reduced.matches ? reset() : queue();
  if (reduced.addEventListener) reduced.addEventListener("change", onPreference);
  else reduced.addListener(onPreference);

  if (!("IntersectionObserver" in window)) return;
  const chapters = [
    ["inicio", "01 / ABERTURA"],
    ["manifesto", "02 / NOSSA VISÃO"],
    ["agencia", "03 / A AGÊNCIA"],
    ["projetos", "04 / CONCEITOS"],
    ["servicos", "05 / SOLUÇÕES"],
    ["processo", "06 / PROCESSO"],
    ["solucoes", "07 / SEU PROJETO"],
    ["studio", "08 / KV STUDIO"],
    ["contato", "09 / CONTATO"],
  ];
  const titles = new Map(chapters);
  const chapterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target === hero) {
        heroVisible = entry.isIntersecting;
        if (!heroVisible) reset(); else queue();
      }
      if (entry.isIntersecting && chapterText) chapterText.textContent = titles.get(entry.target.id);
    });
  }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });
  chapters.forEach(([id]) => {
    const section = document.getElementById(id);
    if (section) chapterObserver.observe(section);
  });
  /* O conteúdo permanece visível mesmo quando não há suporte a animações. */
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (!paused()) entry.target.classList.add("cinema-entered");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  document.querySelectorAll(".kv-manifesto h2, .kv-manifesto-copy, .route-options > a, .project-stage, .services .service, .plans article, .studio-teaser > div, .final-cta h2").forEach((element) => revealObserver.observe(element));
  queue();
})();
