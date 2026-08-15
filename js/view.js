document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const foundEl = document.getElementById("docFound");
  const notFoundEl = document.getElementById("docNotFound");

  const record = (typeof PDF_FILES !== "undefined" ? PDF_FILES : []).find(
    (item) => String(item.id) === String(id)
  );

  if (id && record) {
    document.getElementById("docId").textContent = record.id;

    // PDF saytning o'zida ko'rsatiladi
    const frame = document.getElementById("pdfFrame");
    frame.src = record.fileUrl;

    // "Yuklab olish / ko'rish" tugmasi — brauzerning o'z PDF vositasiga
    // to'g'ridan-to'g'ri havola, hech qanday qo'shimcha kod orqali emas
    const openBtn = document.getElementById("openBtn");
    openBtn.href = record.fileUrl;

    foundEl.hidden = false;
    notFoundEl.hidden = true;
  } else {
    foundEl.hidden = true;
    notFoundEl.hidden = false;
  }
});
