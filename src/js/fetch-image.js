import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '31333113-bd66c453b27bf0e534c1413fe';

async function fetchImg(query, page, perPage) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response;
}

export { fetchImg };
