import axios from 'axios';

const api = axios.create({
  baseURL: 'https://resume-backend-a3dw.onrender.com/',
  timeout: 5000
});

export default api;
