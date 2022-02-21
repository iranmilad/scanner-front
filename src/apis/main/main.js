import ApiCaller from '../../helper/apiCaller';

export const getHeader = (url)=>{
  return ApiCaller().get(url);
}

export const getMasterData = (url)=>{
  return ApiCaller().get(url);
}