const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
const mobileNav = matchMedia("(max-width: 665px)");
document.documentElement.classList.add("enhanced");
menu.hidden = false;

function closeMenu() {
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
}

menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});

document.querySelector(".site-header").addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("open")) {
    closeMenu();
    menu.focus();
  }
});

nav.addEventListener("click", (event) => {
  if (!event.target.closest("a") || !mobileNav.matches) return;
  closeMenu();
  document.querySelector(event.target.closest("a").hash)?.focus({ preventScroll: true });
});

mobileNav.addEventListener("change", closeMenu);

const filters = document.querySelector(".filters");
const projects = [...document.querySelectorAll(".project")];
const workStatus = document.querySelector("#work-status");
filters.hidden = false;

filters.addEventListener("click", (event) => {
  const selected = event.target.closest("[data-filter]");
  if (!selected) return;
  const industry = selected.dataset.filter;
  for (const button of filters.querySelectorAll("button")) {
    button.setAttribute("aria-pressed", String(button === selected));
  }
  for (const project of projects) {
    project.hidden = industry !== "all" && project.dataset.industry !== industry;
  }
  const count = projects.filter((project) => !project.hidden).length;
  workStatus.textContent = `${count} ${count === 1 ? "demo" : "demos"} shown.`;
});

const form = document.querySelector("#quote-form");
const service = document.querySelector("#service");
const status = document.querySelector("#form-status");
const submit = form.querySelector("[type=submit]");

for (const link of document.querySelectorAll("[data-service]")) {
  link.addEventListener("click", () => {
    service.value = link.dataset.service;
    service.focus({ preventScroll: true });
  });
}

function report(state, message) {
  status.dataset.state = state;
  status.textContent = message;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (submit.disabled) return;

  report("", "");
  const data = new FormData(form);
  submit.disabled = true;
  submit.textContent = "Sending…";
  form.setAttribute("aria-busy", "true");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
      signal: AbortSignal.timeout(15000),
    });
    const result = await response.json();
    if (!response.ok || result.ok !== true) throw new Error("Submission not confirmed");
    form.reset();
    report("success", "Thanks. Your project request was sent. We’ll reply by email.");
  } catch {
    report("error", "We couldn’t confirm your request. Try again or email hello.kvstudio@gmail.com.");
  } finally {
    submit.disabled = false;
    submit.textContent = "Send project request";
    form.removeAttribute("aria-busy");
    status.focus();
  }
});
