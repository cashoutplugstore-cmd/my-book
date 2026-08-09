(() => {
  const escapeHtml = (value='') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const load = (src) => new Promise(resolve => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s=document.createElement('script'); s.src=src; s.onload=resolve; s.onerror=resolve; document.body.appendChild(s);
  });
  const ensureReaderMarkup = () => {
    const box=document.querySelector('#previewModal .preview-box');
    if(!box) return null;
    let wrap=box.querySelector('#previewPages');
    if(!wrap){
      const reader=document.createElement('div');
      reader.className='book-reader'; reader.dataset.realReader='';
      reader.innerHTML='<div class="book-reader__stage"><div class="book-reader__paper"><div class="book-reader__content"><div id="previewPages" class="preview-pages"></div></div><div class="book-reader__folio" data-reader-folio>صفحة 1</div></div></div><div class="book-reader__controls"><button type="button" data-reader-prev aria-label="الصفحة السابقة">→</button><span class="book-reader__counter" data-reader-counter>صفحة 1</span><button type="button" data-reader-next aria-label="الصفحة التالية">←</button></div><p class="book-reader__hint">يمكنك التنقل بين صفحات المعاينة قبل الشراء.</p>';
      box.querySelector('.preview-pages')?.remove();
      box.querySelector('#previewTitle')?.after(reader);
      wrap=reader.querySelector('#previewPages');
    }
    let locked=box.querySelector('[data-preview-locked]');
    if(!locked){locked=document.createElement('div');locked.className='preview-locked';locked.dataset.previewLocked='';locked.hidden=true;locked.innerHTML='<h3>أعجبتك البداية؟</h3><p>هذه معاينة محدودة من الكتاب. احصل على النسخة الكاملة بعد إتمام الشراء.</p><button class="btn dark full" id="previewBuyDynamic">أريد النسخة الكاملة</button>';box.appendChild(locked);}
    return {wrap,locked};
  };
  const initReader=(reader)=>{
    if(!reader || reader.dataset.readerReady) return;
    reader.dataset.readerReady='1';
    const pages=[...reader.querySelectorAll('[data-preview-page]')]; let index=0;
    const paper=reader.querySelector('.book-reader__paper'), counter=reader.querySelector('[data-reader-counter]'), folio=reader.querySelector('[data-reader-folio]'), prev=reader.querySelector('[data-reader-prev]'), next=reader.querySelector('[data-reader-next]');
    const render=(dir='')=>{paper?.classList.remove('turn-next','turn-prev'); if(dir){paper?.classList.add(dir==='next'?'turn-next':'turn-prev');setTimeout(()=>paper?.classList.remove('turn-next','turn-prev'),230)} pages.forEach((p,i)=>p.hidden=i!==index); if(counter)counter.textContent=`صفحة ${index+1} من ${pages.length}`;if(folio)folio.textContent=`${index+1}`;if(prev)prev.disabled=index===0;if(next)next.disabled=index===pages.length-1};
    prev?.addEventListener('click',()=>{if(index>0){index--;render('prev')}});next?.addEventListener('click',()=>{if(index<pages.length-1){index++;render('next')}});render();
  };
  load('/preview-data.js').then(() => {
    window.renderBookPreview = (id) => {
      const ui=ensureReaderMarkup(); if(!ui)return;
      const pages=window.BOOK_PREVIEWS?.[id]||[];
      ui.wrap.innerHTML=pages.length?pages.map((page,i)=>`<article class="page preview-page" data-preview-page><small>صفحة ${String(i+1).padStart(2,'0')} · معاينة مجانية</small><h3>${escapeHtml(page.title)}</h3><div class="page-copy">${escapeHtml(page.text).split('\n\n').map(p=>`<p>${p.replace(/\n/g,'<br>')}</p>`).join('')}</div><span class="preview-watermark">نسخة معاينة — جميع الحقوق محفوظة</span></article>`).join(''):'<article class="page preview-page" data-preview-page><small>المعاينة</small><h3>المعاينة قيد التجهيز</h3><p>سيتم إدراج صفحات الكتاب هنا.</p></article>';
      ui.locked.hidden=false;
      initReader(ui.wrap.closest('[data-real-reader]'));
      const buy=ui.locked.querySelector('#previewBuyDynamic'); if(buy)buy.onclick=()=>document.querySelector('#previewBuy')?.click();
    };
  });
})();
