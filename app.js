const books={devil:{title:'معركة الشيطان وجنوده مع الإنسان'},soul:{title:'معركة السيادة بين فطرة الروح والجسد'}};
let selectedBook=null,selectedEdition=null,cart=[];
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const previewModal=$('#previewModal'),productModal=$('#productModal'),cartEl=$('#cart'),backdrop=$('#backdrop');
function openModal(el){el.classList.add('open');el.setAttribute('aria-hidden','false');backdrop.classList.add('show')}
function closeAll(){[previewModal,productModal].forEach(x=>x.classList.remove('open'));cartEl.classList.remove('open');backdrop.classList.remove('show')}
$$('[data-close]').forEach(b=>b.addEventListener('click',closeAll));
backdrop.addEventListener('click',closeAll);
$$('.preview-btn').forEach(btn=>btn.addEventListener('click',e=>{selectedBook=e.currentTarget.closest('.book-card').dataset.id;$('#previewTitle').textContent=books[selectedBook].title;openModal(previewModal)}));
$$('.buy-btn').forEach(btn=>btn.addEventListener('click',e=>{selectedBook=e.currentTarget.closest('.book-card').dataset.id;selectedEdition=null;$$('.edition').forEach(x=>x.classList.remove('selected'));$('#productTitle').textContent=books[selectedBook].title;openModal(productModal)}));
$('#previewBuy').addEventListener('click',()=>{previewModal.classList.remove('open');$('#productTitle').textContent=books[selectedBook].title;openModal(productModal)});
$$('.edition').forEach(btn=>btn.addEventListener('click',()=>{selectedEdition=btn.dataset.edition;$$('.edition').forEach(x=>x.classList.remove('selected'));btn.classList.add('selected')}));
$('#addToCart').addEventListener('click',()=>{if(!selectedEdition){alert('اختَر النسخة أولًا ❤️');return}cart.push({book:books[selectedBook].title,edition:selectedEdition});renderCart();closeAll();cartEl.classList.add('open');backdrop.classList.add('show')});
$('#cartBtn').addEventListener('click',()=>{cartEl.classList.add('open');backdrop.classList.add('show')});$('#cartClose').addEventListener('click',closeAll);
function renderCart(){const wrap=$('#cartItems');$('#cartCount').textContent=cart.length;if(!cart.length){wrap.innerHTML='<div class="empty">السلة فارغة حاليًا.</div>';$('#cartTotal').textContent='—';return}wrap.innerHTML=cart.map((x,i)=>`<div class="cart-item"><span>${x.book}<br><small>${x.edition==='digital'?'📱 إلكترونية':'📦 ورقية'}</small></span><button data-remove="${i}" class="close" style="position:static;font-size:18px">×</button></div>`).join('');$('#cartTotal').textContent='سيُحسب عند الدفع';$$('[data-remove]').forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.remove,1);renderCart()})}
$('#checkout').addEventListener('click',()=>alert('المرحلة التالية: ربط Stripe + حساب المشتري + الشحن + تسليم النسخة الإلكترونية بشكل آمن.'));
renderCart();
