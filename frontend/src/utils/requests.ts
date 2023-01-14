 import axios from 'axios';
  const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? "http://localhost:8080";


 const api = axios.create({
    baseURL:BASE_URL,
    headers:{
        'Content-Type': 'application/json',
        'dataType': 'json'
       
    }

 })
    api.interceptors.request.use(config =>{
    const token = localStorage.getItem('token') || '';
    const tokenString = JSON.parse(token);
    
    config.headers = {
        'Authorization': tokenString
                   
    }
    return config;
    
});

export default api;

