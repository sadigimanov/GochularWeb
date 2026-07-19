/* index.html-only logic. Cart logic lives in cart.js (shared with product.html). */

/* HERO SLIDER */
const heroSlideCount = document.querySelectorAll('.hero-slide').length;
let heroSlideIndex = 0;
let heroSlideTimer = null;

/* Build one dot per slide automatically, so adding/removing slides in the HTML
   never requires manually editing the dots. */
const heroDotsContainer = document.getElementById('hero-dots');
if(heroDotsContainer){
  for(let i = 0; i < heroSlideCount; i++){
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `${i + 1}-ci şəkil`);
    dot.addEventListener('click', () => goToSlide(i));
    heroDotsContainer.appendChild(dot);
  }
}

function showSlide(index){
  heroSlideIndex = index;
  document.querySelectorAll('.hero-slide').forEach((el, i) => el.classList.toggle('active', i === index));
  document.querySelectorAll('.dot').forEach((el, i) => el.classList.toggle('active', i === index));
}

function nextSlide(){
  showSlide((heroSlideIndex + 1) % heroSlideCount);
}

function prevSlide(){
  showSlide((heroSlideIndex - 1 + heroSlideCount) % heroSlideCount);
}

function startHeroAutoplay(){
  clearInterval(heroSlideTimer);
  heroSlideTimer = setInterval(nextSlide, 4000);
}

function goToSlide(index){
  showSlide(index);
  startHeroAutoplay();
}

startHeroAutoplay();

/* Click left half = previous slide, right half = next slide */
const heroFrameEl = document.getElementById('hero-frame');
if(heroFrameEl){
  heroFrameEl.addEventListener('click', function(e){
    const rect = heroFrameEl.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if(clickX < rect.width / 2){
      prevSlide();
    } else {
      nextSlide();
    }
    startHeroAutoplay();
  });
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