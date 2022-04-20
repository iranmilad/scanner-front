import FeederCaller from '../../helper/feederCaller'

/**
 * Send a request to get market map data
 * @param {string} url 
 * @returns {Promise}
 */
export const getTable = (url)=>{
  return FeederCaller().get(url);
}