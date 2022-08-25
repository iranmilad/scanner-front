import axios from 'axios';
import Cookies from 'js-cookie';

const ApiCaller = (config) => {
  const axiosInstance = axios.create({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    responseType: 'json',
    baseURL: process.env.REACT_APP_USER_FEED_URL,
  });

  axiosInstance.interceptors.request.use(
    (request) => {
      const token = Cookies.get('token');
      // if (config.token) {
      //   request.headers['Authorization'] = `Bearer ${token}`;
      // }
      if (window['networkStatus'].online === false) {
        return false;
      }
      return request;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default ApiCaller;
