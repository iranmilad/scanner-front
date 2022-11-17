import ApiCaller from '../../helper/apiCaller';

/**
 * Register Api 
  * @param {object} data
  * @param {string} url
 */
export const registerAPI = ({url,data})=>{
  return ApiCaller({token:false}).post(url,data);
}

/**
 * Login Api 
  * @param {object} data
  * @param {string} url
 */
export const loginAPI = ({url,data,config})=>{
  return ApiCaller({token:false}).post(url,data);
}

/**
 * Remember Password api
 * @param {object} data
 * @param {string} url
 */
export const rememberPasswordAPI = ({url,data})=>{
  return ApiCaller({token:false}).post(url,data);
}

/**
 * Auth User Api
 * @param {object} data
 * @param {string} url
 */
export const authUser = ({url,data})=>{
  return ApiCaller().post(url,data);
}