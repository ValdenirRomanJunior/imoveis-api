
import { AxiosResponse } from 'axios';
import { Console } from 'console';
import { createContext, useEffect,useState,useCallback} from 'react';
import {signIn, signUp,SignInData,SignUpData, me, getImageIfExist, refreshToken} from '../services/resources/user';
import { BASE_URL_FROM_BUCKET } from '../utils/request-image';
import api from '../utils/requests';



interface UserDto{
    
    
    token: string;
    id: string;
    slug: string;
    email: string;
    password: string;
    status: string;
    perfis: string;
    lastName:string;
    verification:string;
    creci?:string;
    start?:string;
    endDate?:string;
    imageUrl?:string;
    domain?:string;
    
}

interface ContextData{
   user: UserDto;
   userSignIn: (userData: SignInData) => Promise<any>;
  // userSignUp: (userData: SignUpData) => Promise<UserDto>;
   getCurrentUser: () => Promise<UserDto>;
   refreshTokenUser: () => Promise<any>;
 
   

}

export const AuthContext = createContext<ContextData>({} as ContextData)

export const AuthProvider:React.FC = ({children}) => {


    const [user,setUser] = useState<UserDto>(()=>{

        const user=localStorage.getItem('user');
        

        if(user){
            return JSON.parse(user);
            
        }
        return {} as UserDto;
    });


  
    
         const userSignIn = async (userData: SignInData)=>{
          
        const data = await signIn(userData);
      
        try {
            if(data.response.data !== null){         
                return data.response.data.message;
         
            }
         
        } catch (tokenUser) {
               let userData= await getCurrentUser();
               setUser(userData);
               localStorage.setItem('user',JSON.stringify(user));
            return data;
       
        }          
    }
    

    const getCurrentUser = async () =>{
      // if user voltar nulo ou erro ir para login
      localStorage.removeItem('user')  
        const {data}= await me() ;
        setUser(data as UserDto)
           localStorage.setItem('user', JSON.stringify(data))
        return data as UserDto;
    }



    const refreshTokenUser = async ()=>{
     
        const data = await refreshToken();
      
        try {
            if(data.response.data !== null){ 
                      
                return data.response.data.message;
         
            }
         
        } catch (tokenUser) {
             
        }  
                            
    }
        

    return(
        <AuthContext.Provider value={{user, userSignIn, getCurrentUser,refreshTokenUser}}>
            {children}
        </AuthContext.Provider>
    )
}