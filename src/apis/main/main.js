import ApiCaller from '../../helper/apiCaller';

/**
 * 
 * @param {string} url 
 * @returns {Promise}
 */
export const getHeader = (url)=>{
  return ApiCaller().get(url);
}

/**
 * @param {string} url 
 * @returns {Promise}
 */
export const getMasterData = (url)=>{
  return ApiCaller().get(url);
}

/**
 * 
 * @param {string} url 
 * @return {Promise}
 */
export const getIndustryData = (url)=>{
  return ApiCaller().get(url);
}