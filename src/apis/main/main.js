import ApiCaller from '../../helper/apiCaller';

/**
 * 
 * @param {string} url 
 * @returns promise
 */
export const getHeader = (url)=>{
  return ApiCaller().get(url);
}

/**
 * 
 * @param {string} url 
 * @returns promise
 */
export const getMasterData = (url)=>{
  return ApiCaller().get(url);
}