import axios from 'axios';
import config from './config/config';
console.log(config.api_url)
const apiClient = axios.create({
  baseURL: config.api_url,
  headers: {
    Accept: 'application/json',
  },
});
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Error during API request:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
