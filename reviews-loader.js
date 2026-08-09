(() => {
  const files = ['/reviews.css', '/store-enhancements.css'];
  files.forEach((href, i) => {
    const id = `store-style-${i}`;
    if (document.getElementById(id)) return;
    const style = document.createElement('link');
    style.id = id;
    style.rel = 'stylesheet';
    style.href = href;
    document.head.appendChild(style);
  });
})();
