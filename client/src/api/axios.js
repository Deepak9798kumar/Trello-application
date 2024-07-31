import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://trello-website-1.onrender.com/api',
});

export default instance;
