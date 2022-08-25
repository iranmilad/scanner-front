import ApiCaller from '../../helper/apiCaller';
import FeederCaller from '../../helper/feederCaller'
import axios from 'axios';
import Cookies from 'js-cookie';

/**
 * 
 * @param {string} url
 * @param {object} config 
 * @returns {Promise}
 */
export const getEveryUser = (url,config = {})=>{
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