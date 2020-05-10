import axios from 'axios'

const defaultConfig = {
  baseURL: 'http://localhost:5000/api',
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  credentials: 'same-origin',
  timeout: 15000,
  responseType: 'json'
};

const api = axios.create(defaultConfig);

export default api
