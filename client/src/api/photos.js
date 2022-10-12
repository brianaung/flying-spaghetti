import axios from 'axios';

// const url = 'http://localhost:9000';
const url =
  process.env.NODE_ENV === 'production'
    ? 'https://flyingspaghetti-server.herokuapp.com'
    : 'http://localhost:9000';

export const fetchPhotos = () => axios.get(url);
export const fetchPhoto = (id) => axios.get(`${url}/photo/${id}`);
export const fetchPhotosInFolder = (id) => axios.get(`${url}/folder/${id}`);
export const movePhotoToBin = (folderID, photoID) => axios.get(`${url}/bin/${folderID}/${photoID}`);
