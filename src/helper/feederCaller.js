import axios from 'axios';
import Cookies from 'js-cookie';

/**
 * This method made because of just feeders
 * This method doesn't need a base url because we get a full address from config
 */
const FeederCaller = (config) => {
  const axiosInstance = axios.create({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: "GET",
    responseType: 'json',
  });

  axiosInstance.interceptors.request.use(
    (request) => {
      const token = Cookies.get('token');
      if (config.token) {
        request.headers['Authorization'] = `Bearer ${token}`;
      }
      if(window['networkStatus'].online === false){
        return false
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

export default FeederCaller;
