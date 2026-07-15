/* index.html-only logic. Cart logic lives in cart.js (shared with product.html). */

/* HERO SLIDER */
const heroSlideCount = document.querySelectorAll('.hero-slide').length;
let heroSlideIndex = 0;
let heroSlideTimer = null;

function showSlide(index){
  heroSlideIndex = index;
  document.querySelectorAll('.hero-slide').forEach((el, i) => el.classList.toggle('active', i === index));
  document.querySelectorAll('.dot').forEach((el, i) => el.classList.toggle('active', i === index));
}

function nextSlide(){
  showSlide((heroSlideIndex + 1) % heroSlideCount);
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