 import axios from 'axios';
  const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? "https://baseview-api.herokuapp.com/";



 const api = axios.create({
    baseURL:BASE_URL,


 })
    api.interceptors.request.use(config =>{
    
    const token = localStorage.getItem('token') || '';

     if  (!token || token === null){
        localStorage.setItem('token',JSON.stringify('adaddadaadgrtr435'))
        return config;
    }else{
        const tokenString = JSON.parse(token || '');
        
        config.headers = {
             'Authorization':`${tokenString}`,
             'Content-Type': 'application/json',
             'Access-Control-Allow-Headers': 'Content-Type',
             "Access-Control-Allow-Origin": "http:localhost:3000",
             "Access-Control-Allow-Methods": "OPTIONS,POST,GET"

             
             
                 
        }
       
        return config; 
    }
    
});


export default api;

