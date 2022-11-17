const gallery = document.querySelector('.gallery');

export default function renderGallary(imgs) {
  const markup = imgs.map(img => {
    const {
      id,
      largeImageURL,
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = img;
    return `
      <a class="gallary__link" href="${largeImageURL}">
        <div class="gallary__item" id="${id}">
          <img class="gallary__img" src="${webformatURL}" alt="${tags}" loading="lazy">
          <div class="gallary__info">
            <p class="gallary__info-text"><b>Likes: </b>${likes}</p>
            <p class="gallary__info-text"><b>Views: </b>${views}</p>
            <p class="gallary__info-text"><b>Comments: </b>${comments}</p>
            <p class="gallary__info-text"><b>Downloads: </b>${downloads}</p>
          </div>
        </div>
      </a>
    `;
  });
  gallery.insertAdjacentHTML('beforeend', markup);
}
