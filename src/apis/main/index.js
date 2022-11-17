import ApiCaller from '../../helper/apiCaller';
import FeederCaller from '../../helper/feederCaller'
/**
 * 
 * @param {string} url
 * @param {object} config 
 * @returns {Promise}
 */
export const getEveryUser = (url,config = {})=>{
  if(config.method === "POST" || config.method === 'post'){
    let data = config.data;
    delete config.data;
    return ApiCaller(config).post(url,data,config)
  }
  else if(config.method === "PUT" || config.method === "put"){
    let data = config.data;
    delete config.data;
    return ApiCaller(config).put(url,data,config)
  }
  return ApiCaller(config).get(url);
}


/**
 * Get all tables and charts configs
 * @param {string} url 
 * @returns {Promise}
 */
export const getEveryFeeder = (url,config = {})=>{
  if(url !== undefined || url !== null){
    return FeederCaller(config)(url)
  }
}