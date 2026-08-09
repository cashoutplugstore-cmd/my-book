(() => {
  const escapeHtml = (value='') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const load = (src) => new Promise(resolve => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s=document.createElement('script'); s.src=src; s.onload=resolve; s.onerror=resolve; document.body.appendChild(s);
  });
  load('/preview-data.js').then(() => {
    window.renderBookPreview = (id) => {
      const pages = window.BOOK_PREVIEWS?.[id] || [];
      const wrap = document.querySelector('#previewPages');
      if (!wrap) return;
      wrap.innerHTML = pages.length ? pages.map((page,i) => `
        <article class="page preview-page" data-preview-page>
          <small>صفحة ${String(i+1).padStart(2,'0')} · معاينة مجانية</small>
          <h3>${escapeHtml(page.title)}</h3>
          <div class="page-copy">${escapeHtml(page.text).split('\n\n').map(p=>`<p>${p.replace(/\n/g,'<br>')}</p>`).join('')}</div>
          <span class="preview-watermark">نسخة معاينة — جميع الحقوق محفوظة</span>
        </article>`).join('') : '<article class="page"><small>المعاينة</small><h3>المعاينة قيد التجهيز</h3><p>سيتم إدراج صفحات الكتاب هنا.</p></article>';
      const locked = document.querySelector('[data-preview-locked]');
      if (locked) locked.hidden = false;
      wrap.querySelectorAll('[data-preview-page]').forEach(p => p.hidden = false);
    };
  });
})();
