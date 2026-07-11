let cart = [];

/* HERO SLIDER */
function showSlide(index){
  document.querySelectorAll('.hero-slide').forEach((el, i) => el.classList.toggle('active', i === index));
  document.querySelectorAll('.dot').forEach((el, i) => el.classList.toggle('active', i === index));
}

/* SEARCH FILTER */
document.getElementById('search-input').addEventListener('input', function(){
  const term = this.value.trim().toLowerCase();
  const cards = document.querySelectorAll('#shop-grid .product-card');
  let visibleCount = 0;
  cards.forEach(card => {
    const match = card.dataset.name.toLowerCase().includes(term);
    card.style.display = match ? '' : 'none';
    if(match) visibleCount++;
  });
  document.getElementById('no-results').style.display = visibleCount === 0 ? 'block' : 'none';
});

/* QTY STEPPER */
function stepQty(btn, delta){
  const stepper = btn.closest('.qty-stepper');
  const val = stepper.querySelector('.qty-val');
  let qty = parseInt(val.textContent, 10) + delta;
  if(qty < 1) qty = 1;
  val.textContent = qty;
}

/* CART */
function addToCart(btn){
  const card = btn.closest('.product-card');
  const name = card.dataset.name;
  const price = parseFloat(card.dataset.price);
  const sized = card.dataset.sized === 'true';
  const size = sized ? card.querySelector('.size-select').value : null;
  const qty = parseInt(card.querySelector('.qty-val').textContent, 10);

  const key = name + '|' + (size || '');
  const existing = cart.find(item => item.key === key);
  if(existing){
    existing.qty += qty;
  } else {
    cart.push({ key, name, price, size, qty });
  }

  renderCart();
  flashAdded(btn);
}

function flashAdded(btn){
  const original = btn.textContent;
  btn.textContent = 'Əlavə olundu ✓';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
  }, 900);
}

function removeFromCart(key){
  cart = cart.filter(item => item.key !== key);
  renderCart();
}

function cartTotal(){
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function renderCart(){
  const countEl = document.getElementById('cart-count');
  const itemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  countEl.textContent = totalQty;

  if(cart.length === 0){
    itemsEl.innerHTML = '<p class="empty-note">Səbət boşdur.</p>';
  } else {
    itemsEl.innerHTML = cart.map(item => `
      <div class="cart-line">
        <div class="cart-line-info">
          <div class="cart-line-name">${item.name}</div>
          <div class="cart-line-meta">${item.size ? item.size + ' · ' : ''}${item.qty} ədəd</div>
          <div class="cart-line-price">₼${(item.price * item.qty).toFixed(2)}</div>
        </div>
        <button class="cart-line-remove" onclick="removeFromCart('${item.key}')" aria-label="Sil">✕</button>
      </div>
    `).join('');
  }

  totalEl.textContent = '₼' + cartTotal().toFixed(2);
  renderOrderSummary();
}

function renderOrderSummary(){
  const summaryEl = document.getElementById('order-summary');
  if(!summaryEl) return;

  if(cart.length === 0){
    summaryEl.innerHTML = '<p class="empty-note">Səbətiniz boşdur. Əvvəlcə <a href="#magaza">mağazadan</a> məhsul seçin.</p>';
    return;
  }

  const lines = cart.map(item => `
    <div class="summary-line">
      <span>${item.name}${item.size ? ' · ' + item.size : ''} × ${item.qty}</span>
      <span>₼${(item.price * item.qty).toFixed(2)}</span>
    </div>
  `).join('');

  summaryEl.innerHTML = lines + `
    <div class="summary-total">
      <span>Cəmi</span>
      <span>₼${cartTotal().toFixed(2)}</span>
    </div>
  `;
}

function toggleCart(){
  document.getElementById('cart-panel').classList.toggle('open');
  document.getElementById('cart-overlay').classList.toggle('open');
}

function goCheckout(){
  document.getElementById('cart-panel').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('sifaris').scrollIntoView({behavior:'smooth'});
}

document.getElementById('order-form').addEventListener('submit', function(e){
  e.preventDefault();

  if(cart.length === 0){
    const confirm = document.getElementById('confirm');
    confirm.textContent = 'Səbətiniz boşdur — əvvəlcə mağazadan məhsul seçin.';
    confirm.style.display = 'block';
    return;
  }

  const itemsText = cart.map(item => `${item.name}${item.size ? ' (' + item.size + ')' : ''} ×${item.qty}`).join(', ');
  const confirm = document.getElementById('confirm');
  confirm.textContent = `✓ Sifariş qeydə alındı: ${itemsText} — Cəmi ₼${cartTotal().toFixed(2)}. Tezliklə Instagram / Discord üzərindən sizinlə əlaqə saxlayacağıq.`;
  confirm.style.display = 'block';
  this.querySelector('.order-submit').style.opacity = '0.6';

  cart = [];
  renderCart();
});

renderCart();