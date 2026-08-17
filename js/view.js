pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const foundEl = document.getElementById("docFound");
  const notFoundEl = document.getElementById("docNotFound");

  const record = (typeof PDF_FILES !== "undefined" ? PDF_FILES : []).find(
    (item) => String(item.id) === String(id)
  );

  if (id && record) {
    // Faqat element mavjud bo'lsa yozamiz
    const docIdEl = document.getElementById("docId");
    if (docIdEl) docIdEl.textContent = record.id;

    const openBtn = document.getElementById("openBtn");
    if (openBtn) openBtn.href = record.fileUrl;

    renderPdf(record.fileUrl);

    foundEl.hidden = false;
    notFoundEl.hidden = true;
  } else {
    foundEl.hidden = true;
    notFoundEl.hidden = false;
  }
});

async function renderPdf(url) {
  const container = document.getElementById("pdfContainer");
  container.innerHTML = "";

  const loadingTask = pdfjsLib.getDocument(url);
  const pdf = await loadingTask.promise;

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);

    const containerWidth = container.clientWidth || 800;
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = (containerWidth / baseViewport.width) * (window.devicePixelRatio || 1);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.className = "pdf-page";
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.width = "100%";
    canvas.style.height = "auto";

    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport }).promise;
  }
}