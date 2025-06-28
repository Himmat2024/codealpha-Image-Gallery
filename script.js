const imageCards = document.querySelectorAll('.image-card');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const caption = document.querySelector('.caption');
const closeBtn = document.querySelector('.close');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const searchInput = document.getElementById('search');
const filterButtons = document.querySelectorAll('.filters button');

let currentIndex = 0;
let filteredImages = Array.from(imageCards);

function openLightbox(index) {
  const img = filteredImages[index].querySelector('img');
  lightboxImg.src = img.src;
  caption.textContent = filteredImages[index].dataset.title;
  lightbox.style.display = 'flex';
  currentIndex = index;
}

imageCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    filteredImages = Array.from(document.querySelectorAll('.image-card:not([style*="display: none"])'));
    openLightbox(filteredImages.indexOf(card));
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % filteredImages.length;
  openLightbox(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
  openLightbox(currentIndex);
});

document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'Escape') closeBtn.click();
  }
});

searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  imageCards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    card.style.display = title.includes(term) ? 'block' : 'none';
  });
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-filter');
    imageCards.forEach(card => {
      const matches = card.classList.contains(category) || category === 'all';
      card.style.display = matches ? 'block' : 'none';
    });
  });
});
