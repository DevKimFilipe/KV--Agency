/* KV Agência / navegação e orçamento guiado. Sem backend ou armazenamento. */
"use strict";
(() => {
  const phone = "5582991952394";
  const whatsappURL = (text) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  document.getElementById("year").textContent = new Date().getFullYear();
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.href = whatsappURL(
      "Olá! Conheci a KV Agência pelo site e gostaria de conversar sobre um projeto digital.",
    );
  });
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("navigation");
  const mobile = window.matchMedia("(max-width: 800px)");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    toggle.innerHTML = open
      ? 'Fechar <span aria-hidden="true">×</span>'
      : 'Menu <span aria-hidden="true">☰</span>';
  };
  nav.classList.add("mobile-ready");
  toggle.hidden = !mobile.matches;
  toggle.addEventListener("click", () =>
    setMenu(toggle.getAttribute("aria-expanded") !== "true"),
  );
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      setMenu(false);
      if (mobile.matches) {
        const section = document.querySelector(link.hash);
        if (section) {
          section.tabIndex = -1;
          section.focus({ preventScroll: true });
        }
      }
    }),
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".header") && nav.classList.contains("is-open"))
      setMenu(false);
  });
  const syncMenu = () => {
    toggle.hidden = !mobile.matches;
    setMenu(false);
  };
  if (mobile.addEventListener) mobile.addEventListener("change", syncMenu);
  else mobile.addListener(syncMenu);
  const header = document.querySelector(".header");
  const progress = document.getElementById("reading-progress");
  let scrollFrame = 0;
  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (progress)
      progress.style.transform = `scaleX(${height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0})`;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        updateHeader();
        scrollFrame = 0;
      });
    },
    { passive: true },
  );
  window.addEventListener("resize", updateHeader);
  updateHeader();
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!reduced.matches) entry.target.classList.add("reveal");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(
        ".section-heading, .project, .differences article, .route-heading",
      )
      .forEach((element) => observer.observe(element));
  }

  const form = document.getElementById("quote-form");
  const status = document.getElementById("form-status");
  const result = document.getElementById("contact-result");
  const preview = document.getElementById("message-preview");
  const projectFields = ["service", "description"];
  const contactFields = ["name", "email"];
  let step = 1;
  let selectedPlan = "";
  form.noValidate = true;
  const value = (id) => document.getElementById(id).value.trim();
  const setStep = (next, focus = true) => {
    step = next;
    for (const number of [1, 2]) {
      const section = document.getElementById(`form-step-${number}`);
      section.hidden = number !== next;
      section.classList.remove("is-entering");
      if (number === next) section.classList.add("is-entering");
      const label = document.getElementById(`step-label-${number}`);
      if (number === next) label.setAttribute("aria-current", "step");
      else label.removeAttribute("aria-current");
    }
    document.getElementById("step-count").textContent = `0${next} / 02`;
    document.getElementById("selected-summary").textContent =
      `Seu projeto: ${value("service") || "a definir"}`;
    if (focus)
      document
        .getElementById(`step-title-${next}`)
        .focus({ preventScroll: true });
  };
  const validate = (id) => {
    const field = document.getElementById(id);
    const text = field.value.trim();
    let message = "";
    if (!text) message = "Preencha este campo para continuar.";
    else if (id === "name" && text.length < 2)
      message = "Informe seu nome com pelo menos 2 caracteres.";
    else if (id === "email" && field.validity.typeMismatch)
      message = "Informe um endereço de e-mail válido.";
    else if (id === "description" && text.length < 15)
      message = "Conte um pouco mais: use pelo menos 15 caracteres.";
    if (!message && field.maxLength > 0 && text.length > field.maxLength)
      message = `Use no máximo ${field.maxLength} caracteres.`;
    field.setAttribute("aria-invalid", String(Boolean(message)));
    document.getElementById(`${id}-error`).textContent = message;
    return !message;
  };
  const check = (fields) => {
    const invalid = fields.filter((id) => !validate(id));
    if (!invalid.length) return true;
    result.hidden = true;
    status.textContent = `Revise ${invalid.length === 1 ? "o campo indicado" : "os campos indicados"} antes de continuar.`;
    setStep(projectFields.includes(invalid[0]) ? 1 : 2, false);
    document.getElementById(invalid[0]).focus();
    return false;
  };
  const goNext = () => {
    if (!check(projectFields)) return;
    status.textContent = "";
    setStep(2);
  };
  document.getElementById("next-step").addEventListener("click", goNext);
  document.getElementById("previous-step").addEventListener("click", () => {
    result.hidden = true;
    status.textContent = "";
    setStep(1);
  });
  [...projectFields, ...contactFields].forEach((id) => {
    const field = document.getElementById(id);
    field.addEventListener("blur", () => {
      if (field.value || field.getAttribute("aria-invalid") === "true")
        validate(id);
    });
    field.addEventListener("input", () => {
      if (field.hasAttribute("aria-invalid")) validate(id);
    });
  });
  const invalidate = (event) => {
    if (event.target === preview) return;
    result.hidden = true;
    status.textContent = "";
  };
  form.addEventListener("input", invalidate);
  form.addEventListener("change", invalidate);
  document.getElementById("service").addEventListener("change", () => {
    selectedPlan = "";
    document.getElementById("selected-plan").hidden = true;
  });
  const chooseService = (service) => {
    const field = document.getElementById("service");
    if (![...field.options].some((option) => option.value === service)) return;
    field.value = service;
    result.hidden = true;
    status.textContent = "";
    if (field.hasAttribute("aria-invalid")) validate("service");
    setStep(1, false);
  };
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-service]");
    if (link && link.dataset.service) {
      chooseService(link.dataset.service);
      selectedPlan = link.dataset.plan || "";
      const planNotice = document.getElementById("selected-plan");
      planNotice.textContent = selectedPlan ? `Plano escolhido: ${selectedPlan}` : "";
      planNotice.hidden = !selectedPlan;
    }
  });
  const initialService = new URLSearchParams(window.location.search).get(
    "servico",
  );
  if (initialService) chooseService(initialService);
  const reference = new URLSearchParams(window.location.search).get("conceito");
  const references = {
    forma: "Forma Arquitetura",
    serena: "Serena",
    base: "Base Construção",
  };
  if (Object.prototype.hasOwnProperty.call(references, reference))
    document.getElementById("description").value =
      `Tenho interesse em um site inspirado no conceito ${references[reference]}.`;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (step === 1) {
      goNext();
      return;
    }
    if (!check([...projectFields, ...contactFields])) return;
    const lines = [
      "Olá! Conheci a KV Agência pelo site e gostaria de solicitar um orçamento.",
      "",
      `Meu nome é ${value("name")}.`,
      `E-mail: ${value("email")}`,
    ];
    if (value("company")) lines.push(`Empresa ou negócio: ${value("company")}`);
    lines.push(
      `Tenho interesse em: ${value("service")}.`,
      "",
      `Detalhes do projeto:\n${value("description")}`,
    );
    if (selectedPlan) lines.push("", `Plano escolhido: ${selectedPlan}`);
    const message = lines.join("\n");
    preview.value = message;
    result.hidden = false;
    status.textContent =
      "Mensagem preparada. Revise, copie e envie pelo Instagram. Nada foi enviado.";
    result.scrollIntoView({
      behavior: reduced.matches ? "auto" : "smooth",
      block: "nearest",
    });
  });
  document
    .getElementById("copy-message")
    .addEventListener("click", async () => {
      try {
        if (!navigator.clipboard || !window.isSecureContext)
          throw new Error("Cópia manual necessária");
        await navigator.clipboard.writeText(preview.value);
        status.textContent =
          "Mensagem copiada. Abra o Instagram, toque em Mensagem, cole e envie.";
      } catch (error) {
        preview.focus();
        preview.select();
        status.textContent =
          "Mensagem selecionada. Pressione Ctrl+C no computador ou use a opção Copiar no celular.";
      }
    });
  document.getElementById("continue-instagram").addEventListener("click", () => {
    if (!navigator.clipboard || !window.isSecureContext) {
      status.textContent = "A cópia automática não está disponível. Use Copiar mensagem antes de colar no Instagram.";
      return;
    }
    navigator.clipboard.writeText(preview.value).then(() => {
      status.textContent = "Mensagem copiada. No Instagram, toque em Mensagem, cole e envie.";
    }).catch(() => {
      status.textContent = "Não foi possível copiar automaticamente. Use Copiar mensagem e cole no Instagram.";
    });
  });
  document.getElementById("quote-fields").disabled = false;
})();
