const TRANSLATIONS = {
  ky: {
    theme_aria: "Режимди алмаштыруу",
    access_title: "Файлыңызды көрүү",
    access_desc: "Сизге берилген жеке ID номериңизди киргизиңиз — натыйжа ушул жерде ачылат.",
    id_placeholder: "Мисалы: 12345",
    id_aria: "ID номери",
    open_btn: "Ачуу",
    form_empty: "Сураныч, ID номерин киргизиңиз.",
    footer_contact: "Суроолор жана кайрылуулар үчүн:",
    back_link: "Башкы бетке кайтуу",
    doc_found_title: "Сиздин файлыңыз",
    id_label: "ID:",
    download_btn: "Жүктөп алуу",
    not_found_title: "Файл табылган жок",
    not_found_desc: "Киргизилген ID туура эмес же мындай файл жок. ID номерин текшерип, кайра аракет кылып көрүңүз.",
    retry_btn: "Кайра аракет кылуу"
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
    theme_aria: "Toggle theme",
    access_title: "View your file",
    access_desc: "Enter your personal ID — the result will open right here.",
    id_placeholder: "e.g. 12345",
    id_aria: "ID number",
    open_btn: "Open",
    form_empty: "Please enter an ID.",
    footer_contact: "For questions, contact:",
    back_link: "Back to home",
    doc_found_title: "Your file",
    id_label: "ID:",
    download_btn: "Download",
    not_found_title: "File not found",
    not_found_desc: "The ID you entered is invalid, or no such file exists. Please check and try again.",
    retry_btn: "Try again"
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