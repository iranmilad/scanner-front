import ApiCaller from '../../helper/apiCaller';
import { loading } from '../../redux/reducers/main';

export const registerAPI = ({url,data})=>{
  return ApiCaller().post(url,data);
}

export const loginAPI = ({url,data})=>{
  return ApiCaller().post(url,data);
}

export const rememberPasswordAPI = ({url,data})=>{
  return ApiCaller().post(url,data);
}