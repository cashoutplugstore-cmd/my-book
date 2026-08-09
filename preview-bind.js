(() => {
  const load = (src) => new Promise(resolve => { const s=document.createElement('script'); s.src=src; s.onload=resolve; document.body.appendChild(s); });
  const ready = window.renderBookPreview ? Promise.resolve() : load('/preview-data.js');
  ready.then(() => document.addEventListener('click', e => {
    const btn=e.target.closest('.preview-btn');
    if (!btn || !window.renderBookPreview) return;
    const card=btn.closest('.book-card');
    if (card) window.renderBookPreview(card.dataset.id);
  }));
})();
