import ApiCaller from '../../helper/apiCaller';
import FeederCaller from '../../helper/feederCaller'

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


/**
 * Get all tables and charts configs
 * @param {string} url 
 * @returns {Promise}
 */
export const getConfig = (url)=>{
  return ApiCaller().get(url);
}


/**
 * Get all tables and charts configs
 * @param {string} url 
 * @returns {Promise}
 */
export const getEveryFeeder = (url)=>{
  return FeederCaller().get(url);
}