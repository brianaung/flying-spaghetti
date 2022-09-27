import axios from 'axios';

const url = 'http://localhost:9000';

export const fetchPhotos = () => axios.get(url);
export const fetchPhoto = (id) => axios.get(`${url}/getPhoto/${id}`);
