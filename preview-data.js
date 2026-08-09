(() => {
  const previews = {
    devil: [
      { title: 'نبذة عن المؤلف', text: 'عبد الرحمن راشد الرفيعي، كاتب ومفكر يتبنى منهجاً إصلاحياً أصيلاً يقوم على التدبر الحر للقرآن الكريم. يرفض الاعتماد على النقولات البشرية أو التبعية التقليدية، مؤسساً مشروعه الفكري على تفسير الآيات بالآيات استجابة للبيان الإلهي وبلغة عربية مبينة. ينطلق من قوله تعالى: {فَإِذَا قَرَأْنَاهُ فَاتَّبِعْ قُرْآنَهُ * ثُمَّ إِنَّ عَلَيْنَا بَيَانَهُ}، ليجعل القرآن مرجعه الأوحد في تقويم النفس البشرية وإعادة الإنسان إلى فطرته الصافية، مستنداً إلى بصيرة إيمانية يراها هبة ربانية تتجاوز حدود الزمان والمكان.' },
      { title: 'الباب الأول: مذكرات كشف العدو', text: 'رحلة الشيطان في محاصرة الإنسان\n\nأولاً: القرين — بوابته الأولى\nيبدأ الشيطان ملازمة الإنسان من خلال القرين. مهمته الهمس المستمر في الصدر، ومحاولة تحويل الفكر عن ذكر الله. فإن وجد قلباً متصلاً بالله، هرب منه؛ فالذكر هو جدار الصد الأول.\n\nالدليل: قال تعالى: {وَمَن يَعْشُ عَن ذِكْرِ الرَّحْمَنِ نُقَيِّضْ لَهُ شَيْطَانًا فَهُوَ لَهُ قَرِينٌ} [سورة الزخرف: 36].\n\nثانياً: جند الإنس — المعركة الميدانية\nحين يبأس القرين ينتقل الشيطان لـ«أولياء الإنس». هؤلاء يزينون لك المعصية ويبغضونك إن لم تكن في صفهم.' },
      { title: 'تكملة الباب الأول', text: 'هم يتشاورون ويخططون، والشيطان يسيطر على عقولهم ليزخرفوا لك القول، ويحاولون دفعك للغفلة ليصبحوا جنداً له.\n\nالدليل: قال تعالى: {وَكَذَلِكَ جَعَلْنَا لِكُلِّ نَبِيٍّ عَدُوًّا شَيَاطِينَ الْإِنسِ وَالْجِنِّ يُوحِي بَعْضُهُمْ إِلَى بَعْضٍ زُخْرُفَ الْقَوْلِ غُرُورًا} [سورة الأنعام: 112].\n\nثالثاً: فخ القداسة — التدليس بالدين\nيأتيك الشيطان من مدخل الدين نفسه، يرسل إليك أولياءه ليتحدثوا إليك بكلام جميل ومنمق، يلبسون الباطل ثوب النصيحة، ويحاولون إدخال فكر يضلك عن الله.' }
    ],
    soul: [
      { title: 'معاينة الكتاب الثاني', text: 'سيتم إدراج الصفحات الأصلية من «معركة السيادة بين فطرة الروح والجسد» هنا فور تزويدنا بنص صفحات المعاينة. هذه المساحة مصممة مسبقاً بنفس مقاس الورق والتنسيق المستخدم للكتاب الأول.' }
    ]
  };
  window.BOOK_PREVIEWS = previews;
  window.renderBookPreview = (id) => {
    const root = document.querySelector('#previewModal .preview-pages');
    if (!root) return;
    const pages = previews[id] || [];
    root.className = 'book-reader';
    root.setAttribute('data-real-reader','');
    root.innerHTML = `<div class="book-reader__stage"><div class="book-reader__paper" aria-live="polite"><div class="book-reader__content"></div><div class="book-reader__folio"></div></div></div><div class="book-reader__controls"><button type="button" data-reader-prev aria-label="الصفحة السابقة">‹</button><span class="book-reader__counter" data-reader-counter></span><button type="button" data-reader-next aria-label="الصفحة التالية">›</button></div><div class="book-reader__hint">اسحب بعينيك بين الصفحات أو استخدم الأسهم · معاينة محدودة</div>`;
    const paper=root.querySelector('.book-reader__paper'), content=root.querySelector('.book-reader__content'), folio=root.querySelector('.book-reader__folio');
    let index=0;
    const render=(dir='')=>{
      paper.classList.remove('turn-next','turn-prev');
      if(dir){paper.classList.add(dir==='next'?'turn-next':'turn-prev');setTimeout(()=>paper.classList.remove('turn-next','turn-prev'),240)}
      const p=pages[index];
      content.innerHTML=`<span class="page-kicker">معاينة · ${id==='devil'?'معركة الشيطان وجنوده مع الإنسان':'الإصدار الثاني'}</span><h3>${p.title}</h3><p>${p.text.replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>')}</p><span class="preview-watermark">نسخة معاينة — جميع الحقوق محفوظة</span>`;
      folio.textContent=`${index+1} · ${pages.length}`;
      root.querySelector('[data-reader-counter]').textContent=`صفحة ${index+1} من ${pages.length}`;
      root.querySelector('[data-reader-prev]').disabled=index===0;
      root.querySelector('[data-reader-next]').disabled=index===pages.length-1;
    };
    root.querySelector('[data-reader-prev]').onclick=()=>{if(index){index--;render('prev')}};
    root.querySelector('[data-reader-next]').onclick=()=>{if(index<pages.length-1){index++;render('next')}};
    render();
  };
})();
