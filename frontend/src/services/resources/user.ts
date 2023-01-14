import axios from 'axios';
import { Http2ServerRequest } from 'http2';
import useAuth from '../../hooks/useAuth';
import apiImage, { BASE_URL_FROM_BUCKET } from '../../utils/request-image';
import api from '../../utils/requests';
import { convertToBlob } from './covertToBlob';

export interface SignInData{
    email: string;
    password: string;
}

export interface SignUpData{
    slug: string;
    email: string;
    password: string;
}

export interface UserDto{
   token: string;
   id: string;
   slug: string;
   email: string;
   password: string;
   status: string;
   perfil: string;
   lastName:string;
   imageUrl?:string;

    
}



export const signIn = async (data:SignInData) => {
    return await api.post('/login',data).then(
        response =>{
            
            const tokenString =JSON.stringify(response.headers.authorization)
            localStorage.setItem('token', tokenString)
                return response.headers.authorization;
            
        }
    )
    .catch((error) =>{
        return error
       
    })

    

}

export const me = async () => {  
    return api.get('/auth/getuser')
     
  
}

export const signUp = async (data:SignUpData) => {
    return api.post('/logout', data)
  
}

export const getImageIfExist = (id:string) => {
    return apiImage.get(`cp${id}.jpg`,{responseType: 'blob'})
        .then(response => {
            console.log(response.data)
            const url=`${BASE_URL_FROM_BUCKET}cp${id}.jpg`;
                return url;
               
            
        }).catch((error) =>{
            return error;
        })
}

export const uploadProfileImage = (image:string)=>{
    let imageBlob= convertToBlob(image)
    let formData : FormData = new FormData();
    formData.set('file',imageBlob,'file.png');
    return api.post('/pictures/save/profile', formData)
     .then(response =>{
        if(response.data != null){
          return response.data;
          
    
         
        }
       
      }).catch((error) =>{
        return error
       
    });
}

