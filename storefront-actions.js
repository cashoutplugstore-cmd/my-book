(() => {
  const modal = document.getElementById('previewModal');
  const product = document.getElementById('productModal');
  const backdrop = document.getElementById('backdrop');
  const close = () => { [modal, product].forEach(x => x && x.classList.remove('open')); backdrop?.classList.remove('show'); };
  const open = x => { if (!x) return; x.classList.add('open'); backdrop?.classList.add('show'); };
  document.addEventListener('click', e => {
    const preview = e.target.closest('[data-action="new-preview"]');
    const buy = e.target.closest('[data-action="new-buy"]');
    if (!preview && !buy) return;
    e.preventDefault(); e.stopImmediatePropagation();
    const card = e.target.closest('.book-card');
    const id = card?.dataset.id;
    if (!id) return;
    if (preview) {
      const title = document.getElementById('previewTitle');
      if (title) title.textContent = card.querySelector('h3')?.textContent || '';
      open(modal);
      if (window.renderBookPreview) window.renderBookPreview(id);
      return;
    }
    const title = document.getElementById('productTitle');
    if (title) title.textContent = card.querySelector('h3')?.textContent || '';
    window.__newBuyBook = id;
    open(product);
  }, true);
  document.addEventListener('click', e => {
    if (e.target.closest('[data-close="new"]') || e.target === backdrop) close();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
