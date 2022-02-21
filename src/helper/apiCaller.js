import axios from 'axios';

const ApiCaller = ()=>{

  /**
   * a instance of axios for call the api
   * @type {AxiosInstance} axios
   */
  const axiosInstance = axios.create({
    headers:{},
    responseType: 'json',
  });

  // handle errors globally for all requests
  axiosInstance.interceptors.request.use(
    response => {
      return response;
    },
    error=>{
      const {response,data} = error;
      if(response){
        Promise.reject(response)
      }
      if(data){
        Promise.reject(data)
      }
      return Promise.reject(error);
    }
  )

  return axiosInstance
}

export default ApiCaller;