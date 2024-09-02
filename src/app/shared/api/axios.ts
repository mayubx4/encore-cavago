import { getToken } from '@shared/api/utils';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// const API_BASE_URL = 'https://dev2.mycavago.com/api';

const getHeaders = () => {
  const token = getToken() || '';

  return ({
    Authorization: token ? `Bearer ${token}` : '',
  });
};
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: getHeaders(),
});

axiosInstance.interceptors.request.use(
  (config) => ({ ...config, headers: getHeaders() }),
  (error) => Promise.reject(error),
);
export default axiosInstance;
