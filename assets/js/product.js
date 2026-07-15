/* product.html-only logic. Cart logic lives in cart.js (shared with index.html). */

const PRODUCTS = {
  forma: {
    name: 'Forma',
    title: 'Rəsmi Forma',
    price: 49.90,
    sized: true,
    badgeText: 'YENİ',
    badgeClass: 'new',
    images: ['assets/img/jerseyForwardGH.png', 'assets/img/jerseyBackGH.png'],
    description: 'Tünd qırmızı əsas, qılınc-kəsiyi xətti ilə hazırlanmış GOCHULAR rəsmi formadır. Döş hissəsində Azərbaycan bayrağı və komanda loqosu yer alır, arxa tərəfə ad və nömrə seçim ilə əlavə oluna bilər.'
  },
  hoodie: {
    name: 'Hoodie',
    title: 'Hoodie',
    price: 64.90,
    sized: true,
    badgeText: 'YENİ',
    badgeClass: 'new',
    images: ['assets/img/hoodieForwardGH.png', 'assets/img/hoodieBackGH.png'],
    description: 'Qalın parçadan hazırlanmış GOCHULAR hoodie. Döş hissəsində komanda loqosu var, soyuq gecə oyunları və gündəlik geyim üçün əlverişlidir.'
  },
  sapka: {
    name: 'Şapka',
    title: 'Şapka',
    price: 24.90,
    sized: false,
    badgeText: 'STOKDA',
    badgeClass: 'stock',
    images: ['assets/img/capForwardGH.png', 'assets/img/capBackGH.png', 'assets/img/capSideGH.png', 'assets/img/capCrossGH.png'],
    description: 'Tənzimlənən arxa qayışlı, ön tərəfdə komanda loqosu olan GOCHULAR şapkası. Bir ölçü, hər başa uyğunlaşır.'
  },
  stiker: {
    name: 'Stiker seti',
    title: 'Stiker Seti',
    price: 7.90,
    sized: false,
    badgeText: 'STOKDA',
    badgeClass: 'stock',
    images: ['assets/img/stickersGH.png', 'assets/img/stickers1.png', 'assets/img/stickers2.png', 'assets/img/stickers3.png', 'assets/img/stickers4.png', 
        'assets/img/stickers5.png', 'assets/img/stickers6.png', 'assets/img/stickers7.png', 'assets/img/stickers8.png', 'assets/img/stickers9.png', 
        'assets/img/stickers10.png', 'assets/img/stickers11.png', 'assets/img/stickers12.png'
    ],
    description: '4 dizaynlı su keçirməz GOCHULAR stiker dəsti — laptop, butulka, telefon üçün əlverişlidir.'
  }
};

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
const product = PRODUCTS[productId];

if(!product){
  document.getElementById('detail').innerHTML = `
    <div class="wrap">
      <p class="empty-note">Məhsul tapılmadı. <a href="index.html#magaza">Mağazaya qayıt</a></p>
    </div>
  `;
} else {
  document.getElementById('page-title').textContent = 'GOCHULAR — ' + product.title;
  document.getElementById('crumb-title').textContent = product.title;
  document.getElementById('detail-title').textContent = product.title;
  document.getElementById('detail-price').textContent = '₼' + product.price.toFixed(2);
  document.getElementById('detail-desc').textContent = product.description;

  const badgeEl = document.getElementById('detail-badge');
  badgeEl.textContent = product.badgeText;
  badgeEl.classList.add(product.badgeClass);

  const card = document.getElementById('detail-card');
  card.dataset.name = product.name;
  card.dataset.price = product.price;
  card.dataset.sized = product.sized;

  const sizeSelect = document.getElementById('detail-size-select');
  if(product.sized){
    sizeSelect.innerHTML = `
      <option>S</option><option>M</option><option selected>L</option><option>XL</option><option>2XL</option>
    `;
  } else {
    sizeSelect.style.display = 'none';
  }

  const mainImageEl = document.getElementById('main-image-el');
  mainImageEl.src = product.images[0];
  mainImageEl.alt = 'GOCHULAR ' + product.title;

  const thumbCol = document.getElementById('thumb-col');
  thumbCol.innerHTML = product.images.map((src, i) => `
    <button class="thumb ${i === 0 ? 'active' : ''}" onclick="setMainImage('${src}', this)">
      <img src="${src}" alt="${product.title} ${i + 1}">
    </button>
  `).join('');
}

function setMainImage(src, btn){
  document.getElementById('main-image-el').src = src;
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  exitZoom();
}

/* ZOOM ON CLICK (not on hover) */
const mainImageBox = document.querySelector('.main-image');
const mainImageEl2 = document.getElementById('main-image-el');
let isZoomed = false;

function exitZoom(){
  isZoomed = false;
  if(mainImageBox) mainImageBox.classList.remove('zoomed');
  if(mainImageEl2) mainImageEl2.style.transformOrigin = 'center';
}

if(mainImageBox && mainImageEl2){
  mainImageBox.addEventListener('click', function(e){
    isZoomed = !isZoomed;
    mainImageBox.classList.toggle('zoomed', isZoomed);

    const rect = mainImageBox.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if(isZoomed){
      mainImageEl2.style.transformOrigin = `${x}% ${y}%`;
    } else {
      mainImageEl2.style.transformOrigin = 'center';
    }
  });

  mainImageBox.addEventListener('mousemove', function(e){
    if(!isZoomed) return;
    const rect = mainImageBox.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mainImageEl2.style.transformOrigin = `${x}% ${y}%`;
  });

  mainImageBox.addEventListener('mouseleave', function(){
    exitZoom();
  });
}