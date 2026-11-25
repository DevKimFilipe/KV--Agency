const demo = document.querySelector("#demo-form");

demo.addEventListener("submit", (event) => {
  event.preventDefault();
  const selection = new FormData(demo);
  document.querySelector("#demo-status").textContent =
    `Preview: ${selection.get("service")} · ${selection.get("details")}. No information was sent.`;
});
