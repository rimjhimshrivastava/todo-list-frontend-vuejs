import axios from 'axios';
import store from './store';

// axios for api request to backend
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adds access token for Authorization in request header
apiClient.interceptors.request.use(
  (config) => {
    const token = store.getters.getAccessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;