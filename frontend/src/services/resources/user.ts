
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
   slug?: string;
   email: string;
   password: string;
   status?: string;
   perfis: string;
   lastName?:string;
   verification?:string;
   imageUrl?:string;

    
}



export const signIn = async (data:SignInData) => {
    localStorage.clear()
    return await api.post('/login',data).then(
        
        response =>{
                    
            const tokenString =JSON.stringify(response.headers.authorization);         
             localStorage.setItem('token', tokenString)      
             return response.status + response.headers.verification ;
            
        }
    )
    .catch((error) =>{
        return error
       
    })
}

export const me = async () => { 
    return api.get('/auth/getuser');
    
    
}

export const signUp = async (data:SignUpData) => {
    return api.post('/logout', data)
  
}

export const getImageIfExist = (id:string,perfil:string) => {
    if(perfil === 'ADMIN'){

        return apiImage.get(`ad${id}.jpg`,{responseType: 'blob'})
        .then(response => {
           if(response.status === 200){
            const url=`${BASE_URL_FROM_BUCKET}ad${id}.jpg`;
            return url;

           }
          return null;
                     
        })

    }

    return apiImage.get(`cp${id}.jpg`,{responseType: 'blob'})
        .then(response => {
           if(response.status === 200){
            const url=`${BASE_URL_FROM_BUCKET}cp${id}.jpg`;
            return url;

           }
          return null;
                     
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

export const refreshToken = async () => {  
    return await api.post('/auth/refresh_token',{}).then(
        
        response =>{                   
            const tokenString =JSON.stringify(response.headers.authorization);         
             localStorage.setItem('token', tokenString)
             console.log(response.status)      
             return response.status;
            
        }
    )
    .catch((error) =>{
        return error
       
    })
}



