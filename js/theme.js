
(function () {
  const params = new URLSearchParams(window.location.search);
  const saved = params.get("theme");
  const theme = saved === "dark" || saved === "light" ? saved : "light";

  document.documentElement.setAttribute("data-theme", theme);

  document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("themeToggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);

        const url = new URL(window.location.href);
        url.searchParams.set("theme", next);
        window.history.replaceState({}, "", url);

        // sahifadagi barcha ichki havolalarga joriy rejimni ilova qilamiz
        syncThemeToInternalLinks(next);
      });

      syncThemeToInternalLinks(theme);
    }
  });

  function syncThemeToInternalLinks(currentTheme) {
    document.querySelectorAll("a[data-internal]").forEach((link) => {
      const url = new URL(link.href, window.location.href);
      url.searchParams.set("theme", currentTheme);
      link.href = url.pathname + url.search;
    });
  }

  // boshqa skriptlar foydalanishi uchun ochiq qilib qo'yamiz
  window.getCurrentTheme = () =>
    document.documentElement.getAttribute("data-theme") || "light";
})();
