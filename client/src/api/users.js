import axios from 'axios';

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://photoshare-fs-server.herokuapp.com'
    : 'http://localhost:9000';

export const getAllUsers = () => axios.get(`${url}/dashboard/users`);
