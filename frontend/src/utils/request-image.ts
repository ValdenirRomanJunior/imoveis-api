 import axios from 'axios';
  
  export const BASE_URL_FROM_BUCKET = "https://dynamous.s3.sa-east-1.amazonaws.com/";

const apiImage= axios.create({
    baseURL:BASE_URL_FROM_BUCKET,
    headers:{
     
        'Access-Control-Allow-Headers': 'Content-Type',
        "Access-Control-Allow-Origin": "https://standi-v1-2024-f863ecac91d0.herokuapp.com",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET" 
        
        
           
    }


})
export default apiImage;



