/* KV / movimento controlado, vitrine acessível e conceitos ampliados. */
"use strict";
(() => {
  document.body.classList.add("motion-ready");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pauseButton = document.getElementById("motion-toggle");
  pauseButton.hidden = false;
  let userPaused = false;
  const syncMotion = () => {
    const paused = userPaused || reduced.matches;
    document.body.classList.toggle("motion-paused", paused);
    document.body.classList.toggle("motion-suspended", document.hidden);
    pauseButton.disabled = reduced.matches;
    pauseButton.setAttribute("aria-pressed", String(paused));
    pauseButton.querySelector(".motion-label").textContent = reduced.matches
      ? "Movimento reduzido"
      : userPaused
        ? "Ativar animações"
        : "Pausar animações";
    pauseButton.querySelector(".motion-icon").textContent = paused ? "▷" : "Ⅱ";
  };
  pauseButton.addEventListener("click", () => {
    userPaused = !userPaused;
    syncMotion();
  });
  if (reduced.addEventListener) reduced.addEventListener("change", syncMotion);
  else reduced.addListener(syncMotion);
  document.addEventListener("visibilitychange", syncMotion);
  syncMotion();

  if ("IntersectionObserver" in window) {
    const steps = document.querySelectorAll(".process li");
    const stepObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((step) => step.classList.remove("is-current"));
            entry.target.classList.add("is-current");
          }
        }),
      { rootMargin: "-20% 0px -40% 0px", threshold: 0.1 },
    );
    steps.forEach((step) => stepObserver.observe(step));
    const decorationObserver = new IntersectionObserver((entries) =>
      entries.forEach((entry) =>
        entry.target.classList.toggle("is-offscreen", !entry.isIntersecting),
      ),
    );
    document
      .querySelectorAll(".marquee, .cta-orbit, .reference-hero")
      .forEach((element) => decorationObserver.observe(element));
    const navLinks = document.querySelectorAll('#navigation a[href^="#"]');
    const navObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              if (link.hash === `#${entry.target.id}`)
                link.setAttribute("aria-current", "location");
              else link.removeAttribute("aria-current");
            });
          }
        }),
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("#projetos, #servicos, #agencia, #processo, #contato")
      .forEach((section) => navObserver.observe(section));
  }

  // Os accordions dos serviços preservam o comportamento nativo por teclado.
  const services = document.querySelectorAll(".service");
  services.forEach((service) =>
    service.addEventListener("toggle", () => {
      if (service.open)
        services.forEach((other) => {
          if (other !== service) other.open = false;
        });
    }),
  );

  document.querySelectorAll("[data-open-service]").forEach((link) => {
    link.addEventListener("click", () => {
      const service = document.getElementById(link.dataset.openService);
      if (service) service.open = true;
    });
  });

  const dialog = document.getElementById("project-dialog");
  const data = {
    forma: {
      title: "Forma Arquitetura",
      category: "Arquitetura / direção editorial",
      description:
        "Uma experiência que valoriza espaço, luz e materialidade. O conteúdo recebe o mesmo cuidado da composição visual.",
      objective:
        "Apresentar a identidade de um escritório e facilitar uma primeira conversa sobre novos projetos.",
      direction:
        "Tipografia editorial, respiro, tons minerais e uma imagem arquitetônica em destaque.",
      service: "Site institucional",
      selector: ".architecture",
    },
    serena: {
      title: "Serena",
      category: "Saúde / acolhimento digital",
      description:
        "Uma interface que transmite cuidado antes do primeiro atendimento. Informação organizada e uma linguagem visual tranquila.",
      objective:
        "Apresentar uma abordagem de cuidado e orientar o visitante até um canal de contato.",
      direction:
        "Verde suave, tipografia com personalidade e uma composição orgânica com luz natural.",
      service: "Site para negócio local",
      selector: ".health",
    },
    base: {
      title: "Base Construção",
      category: "Construção / presença institucional",
      description:
        "Uma identidade sólida e direta, construída para comunicar serviços e despertar confiança na apresentação do negócio.",
      objective:
        "Explicar as possibilidades de atuação e facilitar solicitações de orçamento.",
      direction:
        "Contrastes firmes, materiais naturais e uma organização objetiva das informações.",
      service: "Site institucional",
      selector: ".construction",
    },
  };
  if (dialog && typeof dialog.showModal === "function") {
    document.querySelectorAll("[data-project]").forEach((button) => {
      button.hidden = false;
      button.addEventListener("click", () => {
        const project = data[button.dataset.project];
        if (!project) return;
        document.getElementById("dialog-title").textContent = project.title;
        document.getElementById("dialog-category").textContent =
          project.category;
        document.getElementById("dialog-description").textContent =
          project.description;
        document.getElementById("dialog-objective").textContent =
          project.objective;
        document.getElementById("dialog-direction").textContent =
          project.direction;
        const preview = document
          .querySelector(`.projects ${project.selector}`)
          .cloneNode(true);
        document.getElementById("dialog-visual").replaceChildren(preview);
        document.getElementById("dialog-contact").dataset.service =
          project.service;
        document.getElementById("dialog-demo").href =
          `conceitos/${button.dataset.project}.html`;
        document.body.classList.add("dialog-open");
        dialog.showModal();
        dialog.scrollTop = 0;
        document.getElementById("dialog-close").focus();
      });
    });
    dialog.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") return;
      const controls = [
        ...dialog.querySelectorAll(
          'button:not([disabled]), a[href], [tabindex="0"]',
        ),
      ].filter((element) => element.getClientRects().length);
      const first = controls[0],
        last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    document
      .getElementById("dialog-close")
      .addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () =>
      document.body.classList.remove("dialog-open"),
    );
    document
      .getElementById("dialog-contact")
      .addEventListener("click", (event) => {
        dialog.close();
        const section = document.getElementById("contato");
        section.tabIndex = -1;
        section.focus({ preventScroll: true });
      });
  }
})();
