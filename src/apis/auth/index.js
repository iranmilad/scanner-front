import ApiCaller from '../../helper/apiCaller';
import { loading } from '../../redux/reducers/main';


/**
 * Register Api 
  * @param {object} data
  * @param {string} url
 */
export const registerAPI = ({url,data})=>{
  return ApiCaller().post(url,data);
}

/**
 * Login Api 
  * @param {object} data
  * @param {string} url
 */
export const loginAPI = ({url,data})=>{
  return ApiCaller().post(url,data);
}

/**
 * Remember Password api
 * @param {object} data
 * @param {string} url
 */
export const rememberPasswordAPI = ({url,data})=>{
  return ApiCaller().post(url,data);
}

/**
 * Auth User Api
 * @param {object} data
 * @param {string} url
 */
export const authUser = ({url,data})=>{
  return ApiCaller().post(url,data);
}