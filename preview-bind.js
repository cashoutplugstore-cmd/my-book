(() => {
  const escapeHtml = (value='') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const load = (src) => new Promise(resolve => {
    const existing=document.querySelector(`script[src="${src}"]`);
    if(existing){ if(window.BOOK_PREVIEWS) return resolve(); existing.addEventListener('load',resolve,{once:true}); return; }
    const s=document.createElement('script'); s.src=src; s.onload=resolve; s.onerror=resolve; document.body.appendChild(s);
  });
  const ensureReaderMarkup = () => {
    const box=document.querySelector('#previewModal .preview-box');
    if(!box) return null;
    let reader=box.querySelector('[data-real-reader]');
    if(!reader){
      reader=document.createElement('div'); reader.className='book-reader'; reader.dataset.realReader='';
      reader.innerHTML='<div class="book-reader__stage"><div class="book-reader__paper"><div class="book-reader__content" data-preview-content></div><div class="book-reader__folio" data-reader-folio>1</div></div></div><div class="book-reader__controls"><button type="button" data-reader-prev aria-label="الصفحة السابقة">→</button><span class="book-reader__counter" data-reader-counter>صفحة 1</span><button type="button" data-reader-next aria-label="الصفحة التالية">←</button></div><p class="book-reader__hint">يمكنك التنقل بين صفحات المعاينة قبل الشراء.</p>';
      box.querySelector('.preview-pages')?.remove(); box.querySelector('#previewTitle')?.after(reader);
    }
    let locked=box.querySelector('[data-preview-locked]');
    if(!locked){locked=document.createElement('div');locked.className='preview-locked';locked.dataset.previewLocked='';locked.hidden=true;locked.innerHTML='<h3>أعجبتك البداية؟</h3><p>هذه معاينة محدودة من الكتاب. احصل على النسخة الكاملة بعد إتمام الشراء.</p><button class="btn dark full" id="previewBuyDynamic">أريد النسخة الكاملة</button>';box.appendChild(locked);}
    return {reader,locked};
  };
  const render = (id) => {
    const ui=ensureReaderMarkup(); if(!ui) return false;
    const pages=window.BOOK_PREVIEWS?.[id]||[];
    const content=ui.reader.querySelector('[data-preview-content]');
    if(!pages.length){content.innerHTML='<h3>المعاينة قيد التجهيز</h3><p>سيتم إدراج صفحات الكتاب هنا.</p>';return true;}
    content.innerHTML=pages.map((page,i)=>`<article class="preview-page" data-preview-page hidden><span class="page-kicker">معاينة · ${id==='devil'?'معركة الشيطان وجنوده مع الإنسان':'الإصدار الثاني'}</span><h3>${escapeHtml(page.title)}</h3><div class="page-copy">${escapeHtml(page.text).split('\n\n').map(p=>`<p>${p.replace(/\n/g,'<br>')}</p>`).join('')}</div><span class="preview-watermark">نسخة معاينة — جميع الحقوق محفوظة</span><span class="page-number">${i+1}</span></article>`).join('');
    const list=[...content.querySelectorAll('[data-preview-page]')]; let index=0;
    const paper=ui.reader.querySelector('.book-reader__paper'),counter=ui.reader.querySelector('[data-reader-counter]'),folio=ui.reader.querySelector('[data-reader-folio]'),prev=ui.reader.querySelector('[data-reader-prev]'),next=ui.reader.querySelector('[data-reader-next]');
    const show=(direction='')=>{paper?.classList.remove('turn-next','turn-prev');if(direction){paper?.classList.add(direction==='next'?'turn-next':'turn-prev');setTimeout(()=>paper?.classList.remove('turn-next','turn-prev'),230)}list.forEach((p,i)=>p.hidden=i!==index);if(counter)counter.textContent=`صفحة ${index+1} من ${list.length}`;if(folio)folio.textContent=`${index+1}`;if(prev)prev.disabled=index===0;if(next)next.disabled=index===list.length-1};
    prev.onclick=()=>{if(index){index--;show('prev')}}; next.onclick=()=>{if(index<list.length-1){index++;show('next')}}; show(); ui.locked.hidden=false;
    const buy=ui.locked.querySelector('#previewBuyDynamic'); if(buy)buy.onclick=()=>document.querySelector('#previewBuy')?.click();
    return true;
  };
  window.renderBookPreview = async (id) => { await load('/preview-data.js'); return render(id); };
  document.addEventListener('click', e => { const btn=e.target.closest('.preview-btn'); if(!btn)return; const card=btn.closest('.book-card'); const id=card?.dataset.id; if(id)window.renderBookPreview(id); });
})();
