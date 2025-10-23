import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL_SITE ?? "http://localhost:8080";
//const BASE_URL = "http://localhost:8080";


const api = axios.create({
  baseURL:BASE_URL


})
  api.interceptors.request.use((config:any) =>{
  
  const token = localStorage.getItem('token') || '';

   if  (!token || token === null){
      localStorage.setItem('token',JSON.stringify('adaddadaadgrtr435'))
      return config;

  }else{
    
      const tokenString = JSON.parse(token || '');
       
      config.headers = {
       
        'Content-Type': 'application/json'
                     
    }
     
      return config; 
    }
  
});

export default api;
