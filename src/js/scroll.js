const toTopBtn = document.querySelector('.btn-to-top');

window.addEventListener('scroll', onScroll);
toTopBtn.addEventListener('click', onToTopBtn);

function onScroll() {
  const scrolled = window.scrollY;
  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    toTopBtn.classList.remove('is-hidden');
  }
  if (scrolled < coords) {
    toTopBtn.classList.add('is-hidden');
  }
}

function onToTopBtn() {
  if (window.scrollY > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export { onScroll, onToTopBtn };
