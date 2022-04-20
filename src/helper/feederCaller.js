import axios from 'axios';
import {getLocalStorage,clearLocalStorage} from './localStorage';
import configStore from '../redux/store';
import { getApiPath } from '../redux/reducers/main';

const FeederCaller = (config)=>{

  const axiosInstance = axios.create({
    headers:{},
    responseType: 'json',
		baseURL: 'http://88.99.19.131:8000/api'
  });

	axiosInstance.interceptors.request.use(
		res => {
			return res;
		},
		error => {
			return Promise.reject(error);
		}
	)

	// axiosInstance.interceptors.response.use(
	// 	response => {
	// 		return response;
	// 	},
	// 	error => {
	// 		return Promise.reject(error);
	// 	}
	// )
  return axiosInstance
}


export default FeederCaller;