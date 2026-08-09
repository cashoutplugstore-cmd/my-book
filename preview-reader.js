(() => {
  const cfg = window.BOOK_PREVIEW || { maxPages: 3, watermark: 'نسخة معاينة — جميع الحقوق محفوظة' };
  const root = document.querySelector('[data-book-preview]');
  if (!root) return;
  root.dataset.maxPages = String(cfg.maxPages);
  root.querySelectorAll('[data-preview-page]').forEach((page, index) => {
    page.setAttribute('aria-label', `صفحة معاينة ${index + 1}`);
    const mark = document.createElement('span');
    mark.className = 'preview-watermark';
    mark.textContent = cfg.watermark;
    page.appendChild(mark);
  });
  const locked = root.querySelector('[data-preview-locked]');
  if (locked) locked.hidden = false;
})();
