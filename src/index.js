import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import { fetchImg } from './js/fetch-image';
import renderGallary from './js/render-gallary';
import { onScroll, onToTopBtn } from './js/scroll';

import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.btn-load-more');
let simpleLightBox;
let query = '';
let page = 1;
const perPage = 40;

onScroll();
onToTopBtn();

const onSearchInputForm = e => {
  e.preventDefault();
  window.scrollTo({ top: 0 });
  query = e.currentTarget.searchQuery.value.trim();
  page = 1;
  gallery.innerHTML = '';

  if (query === '') {
    alertNoEmptySearch();
    return;
  }

  fetchImg(query, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        alertNoImagesFound();
      } else {
        renderGallary(data.hits);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        alertImagesFound(data);
        if (data.totalHits > perPage) {
          loadMoreBtn.classList.remove('is-hidden');
        }
      }
    })
    .catch(err => console.log(err))
    .finally(() => {
      form.reset();
    });
};

function onLoadMore() {
  page += 1;
  simpleLightBox.destroy();
  fetchImg(query, page, perPage)
    .then(({ data }) => {
      renderGallary(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();

      const totalPages = Math.ceil(data.totalHits / perPage);

      if (page > totalPages) {
        loadMoreBtn.classList.add('is-hidden');
        alertEndOfSearch();
      }
    })
    .catch(error => console.log(error));
}

function alertImagesFound(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function alertNoEmptySearch() {
  Notiflix.Notify.failure(
    'The search string cannot be empty. Please specify your search query.'
  );
}

function alertNoImagesFound() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function alertEndOfSearch() {
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
}

form.addEventListener('submit', onSearchInputForm);
loadMoreBtn.addEventListener('click', onLoadMore);
