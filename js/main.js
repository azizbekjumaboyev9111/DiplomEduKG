document.addEventListener("DOMContentLoaded", () => {
  // --- ID kiritish formasi ---
  const form = document.getElementById("idForm");
  const input = document.getElementById("idInput");
  const msg = document.getElementById("formMsg");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = input.value.trim();

      if (!id) {
        msg.textContent = window.t ? window.t("form_empty") : "Please enter an ID.";
        input.focus();
        return;
      }

      const theme = window.getCurrentTheme ? window.getCurrentTheme() : "light";
      const lang = window.currentLang || "ky";
      const url = new URL("view.html", window.location.href);
      url.searchParams.set("id", id);
      url.searchParams.set("theme", theme);
      url.searchParams.set("lang", lang);
      window.location.href = url.pathname + url.search;
    });
  }

  // --- Skroll bilan paydo bo'lish animatsiyasi ---
  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => io.observe(el));
});
