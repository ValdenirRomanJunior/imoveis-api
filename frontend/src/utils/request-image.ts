 import axios from 'axios';
  
  export const BASE_URL_FROM_BUCKET = process.env.REACT_APP_BACKEND_URL_PROFILE ?? "https://dynamous.s3.sa-east-1.amazonaws.com/";

const apiImage= axios.create({
    baseURL:BASE_URL_FROM_BUCKET,
    headers:{
     
        'Access-Control-Allow-Headers': 'Content-Type',
        "Access-Control-Allow-Origin": "http:localhost:3000",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET" 
        
        
           
    }


})
export default apiImage;



