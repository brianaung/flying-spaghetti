import axios from 'axios';

// const url = 'http://localhost:9000';
const url =
  process.env.NODE_ENV === 'production'
    ? 'https://photoshare-fs-server.herokuapp.com'
    : 'http://localhost:9000';

export const fetchPhotos = () => axios.get(`${url}/dashboard/folders`);
export const fetchSharedPhotos = () => axios.get(`${url}/dashboard/shared`);
export const fetchLikedPhotos = () => axios.get(`${url}/dashboard/liked`);
export const fetchPhoto = (id) => axios.get(`${url}/photo/${id}`);
export const fetchPhotosInFolder = (id) => axios.get(`${url}/folder/${id}`);
export const movePhotoToBin = (folderID, photoID) => axios.get(`${url}/bin/${folderID}/${photoID}`);
export const postComment = (photoID, newComment) => axios.post(`${url}/comments/${photoID}`, newComment);
export const getComments = (photoID) => axios.get(`${url}/comments/${photoID}`);