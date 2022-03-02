import axios from 'axios';
import {getLocalStorage,clearLocalStorage} from './localStorage';

const ApiCaller = (config)=>{
	
  const axiosInstance = axios.create({
    headers:{
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
    responseType: 'json',
		baseURL: 'http://sub1.clawar-services.org/api'
  });

	axiosInstance.interceptors.request.use(
		res => {
			return res;
		},
		error => {
			return Promise.reject(error);
		}
	)

	axiosInstance.interceptors.response.use(
		response => {
			return response;
		},
		error => {
			return Promise.reject(error);
		}
	)
  return axiosInstance
}


export default ApiCaller;