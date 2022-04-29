import FeederCaller from '../../helper/feederCaller'

/**
 * Send a request to get chart data
 * @param {string} url 
 * @returns {Promise}
 */
export const getChart = (url)=>{
  return FeederCaller().get(url);
}

export const getNews = (url)=>{
  return FeederCaller().get(url);
}