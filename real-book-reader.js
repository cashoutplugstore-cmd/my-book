(() => {
  const root = document.querySelector('[data-real-reader]');
  if (!root) return;
  const pages = [...root.querySelectorAll('[data-reader-page]')];
  if (!pages.length) return;
  let index = 0;
  const paper = root.querySelector('.book-reader__paper');
  const counter = root.querySelector('[data-reader-counter]');
  const prev = root.querySelector('[data-reader-prev]');
  const next = root.querySelector('[data-reader-next]');
  const render = (direction = '') => {
    paper?.classList.remove('turn-next', 'turn-prev');
    if (direction) {
      paper?.classList.add(direction === 'next' ? 'turn-next' : 'turn-prev');
      window.setTimeout(() => paper?.classList.remove('turn-next', 'turn-prev'), 230);
    }
    pages.forEach((p, i) => { p.hidden = i !== index; });
    if (counter) counter.textContent = `صفحة ${index + 1} من ${pages.length}`;
    if (prev) prev.disabled = index === 0;
    if (next) next.disabled = index === pages.length - 1;
  };
  prev?.addEventListener('click', () => { if (index > 0) { index--; render('prev'); } });
  next?.addEventListener('click', () => { if (index < pages.length - 1) { index++; render('next'); } });
  root.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' && index < pages.length - 1) { index++; render('next'); }
    if (e.key === 'ArrowLeft' && index > 0) { index--; render('prev'); }
  });
  root.tabIndex = 0;
  render();
})();
