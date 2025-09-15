import axios from 'axios';
 const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? "http://localhost:8080";
 
export const tokenAux= localStorage.getItem('token') || '';

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
             'Content-Type': 'application/json; charset=utf-8',           
             'Access-Control-Allow-Headers': 'Content-Type',
             "Access-Control-Allow-Origin": "https://standi.com.br/",
             "Access-Control-Allow-Methods": "OPTIONS,POST,GET"

        
        }
       
        return config; 
    }
    
});


export default api;

