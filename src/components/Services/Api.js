import axios from 'axios';

const API_KEY = '40319366-fb3726f62eb8b3ab77607e139';
// // const BASE_URL =
// //   'https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12';
// axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorisation'] = API_KEY;
// axios.defaults.params = {
//   orientation: 'landscape',
//   per_page: 12,
// };

// export const getImages = async (query, page) => {
//   const { data } = await axios.get(`search?query=${query}&page=${page}`);
//   return data;
// };

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`?q=${query}&page=${page}`);
  return data;
};
