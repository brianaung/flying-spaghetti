import axios from 'axios';

// const url = 'http://localhost:9000';
const url =
  process.env.NODE_ENV === 'production'
    ? 'https://flyingspaghetti-server.herokuapp.com'
    : 'http://localhost:9000';

export const userLogin = (data) => axios.post(`${url}/login`, data);
