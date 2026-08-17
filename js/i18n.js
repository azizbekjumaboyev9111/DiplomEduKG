const TRANSLATIONS = {
  ky: {
    theme_aria: "Переключить тему",
    access_title: "Просмотр файла",
    access_desc: "Введите ваш персональный ID — результат откроется прямо здесь.",
    id_placeholder: "Например: 12345",
    id_aria: "Номер ID",
    open_btn: "Открыть",
    form_empty: "Пожалуйста, введите ID.",
    footer_contact: "По вопросам обращайтесь:",
    back_link: "Вернуться на главную",
    doc_found_title: "Ваш файл",
    id_label: "ID:",
    download_btn: "Скачать",
    not_found_title: "Файл не найден",
    not_found_desc: "Введённый ID неверен или такого файла не существует. Проверьте ID и попробуйте снова.",
    retry_btn: "Попробовать снова"
  },
  ru: {
    theme_aria: "Переключить тему",
    access_title: "Просмотр файла",
    access_desc: "Введите ваш персональный ID — результат откроется прямо здесь.",
    id_placeholder: "Например: 12345",
    id_aria: "Номер ID",
    open_btn: "Открыть",
    form_empty: "Пожалуйста, введите ID.",
    footer_contact: "По вопросам обращайтесь:",
    back_link: "Вернуться на главную",
    doc_found_title: "Ваш файл",
    id_label: "ID:",
    download_btn: "Скачать",
    not_found_title: "Файл не найден",
    not_found_desc: "Введённый ID неверен или такого файла не существует. Проверьте ID и попробуйте снова.",
    retry_btn: "Попробовать снова"
  },
  en: {
    theme_aria: "Переключить тему",
    access_title: "Просмотр файла",
    access_desc: "Введите ваш персональный ID — результат откроется прямо здесь.",
    id_placeholder: "Например: 12345",
    id_aria: "Номер ID",
    open_btn: "Открыть",
    form_empty: "Пожалуйста, введите ID.",
    footer_contact: "По вопросам обращайтесь:",
    back_link: "Вернуться на главную",
    doc_found_title: "Ваш файл",
    id_label: "ID:",
    download_btn: "Скачать",
    not_found_title: "Файл не найден",
    not_found_desc: "Введённый ID неверен или такого файла не существует. Проверьте ID и попробуйте снова.",
    retry_btn: "Попробовать снова"
  }
};

(function () {
  const params = new URLSearchParams(window.location.search);
  const saved = params.get("lang");
  const lang = TRANSLATIONS[saved] ? saved : "ky"; // default til
  window.currentLang = lang;

  function applyTranslations(currentLang) {
    const dict = TRANSLATIONS[currentLang];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key]) el.setAttribute("placeholder", dict[key]);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (dict[key]) el.setAttribute("aria-label", dict[key]);
    });
  }

  function syncLangToInternalLinks(currentLang) {
    document.querySelectorAll("a[data-internal]").forEach((link) => {
      const url = new URL(link.href, window.location.href);
      url.searchParams.set("lang", currentLang);
      link.href = url.pathname + url.search;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyTranslations(lang);
    syncLangToInternalLinks(lang);

    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      if (btn.dataset.lang === lang) btn.classList.add("active");

      btn.addEventListener("click", () => {
        const next = btn.dataset.lang;
        window.currentLang = next;

        document.querySelectorAll(".lang-switch button")
          .forEach((b) => b.classList.toggle("active", b === btn));

        applyTranslations(next);

        const url = new URL(window.location.href);
        url.searchParams.set("lang", next);
        window.history.replaceState({}, "", url);

        syncLangToInternalLinks(next);
      });
    });
  });

  window.t = (key) => (TRANSLATIONS[window.currentLang] || TRANSLATIONS.ky)[key] || key;
})();