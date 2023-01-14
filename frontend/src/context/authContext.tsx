
import { AxiosResponse } from 'axios';
import { createContext, useEffect,useState,useCallback} from 'react';
import {signIn, signUp,SignInData,SignUpData, me, getImageIfExist} from '../services/resources/user';
import { BASE_URL_FROM_BUCKET } from '../utils/request-image';
import api from '../utils/requests';



interface UserDto{
    startsWith(arg0: string): unknown;
    
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

interface ContextData{
   user: UserDto;
   userSignIn: (userData: SignInData) => Promise<UserDto>;
   userSignUp: (userData: SignUpData) => Promise<UserDto>;
   getCurrentUser: () => Promise<AxiosResponse<UserDto,any>>;
 
   

}

export const AuthContext = createContext<ContextData>({} as ContextData)

export const AuthProvider:React.FC = ({children}) => {



    const [user,setUser] = useState<UserDto>(() => {
        const user= localStorage.getItem('user');

        if(user){
            return JSON.parse(user);
        }
        return {} as UserDto;
    });

    
         const userSignIn = async (userData: SignInData)=>{
        const data = await signIn(userData);

        try {
            if(data.response.data.error !== null){               
                return data.response.data.error;
            }
         
        } catch (tokenUser) {

            const token = localStorage.getItem('token') || '';
            const tokenString = JSON.parse(token);
            tokenUser=tokenString;     
            return tokenUser;
        
        }
                   
            /*
            const user=getCurrentUser();
            localStorage.setItem('user', JSON.stringify(user));
             return user;
            */
        
             
    }

    const getCurrentUser = async () =>{
        const {data}= await me();
        setUser(data)
       
        localStorage.setItem('user', JSON.stringify(user));
        return data;
    }


   

    const userSignUp = async (userData: SignUpData)=>{
        const {data} = await signUp(userData);
        localStorage.setItem('@Dynamob: Token', data.accessToken);
        return  getCurrentUser();
        
    }
        
   

    return(
        <AuthContext.Provider value={{user, userSignIn,userSignUp, getCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
}