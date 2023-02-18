/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import { base64 } from '@firebase/util';
import React, { useEffect, useState } from 'react'
import BarTop from '../../components/Bartop';
import Header from '../../components/Header';
import defaultImage from '../../assets/images/no-pictures.png';
import {MdPhotoCamera} from 'react-icons/md';

import {MyAccountBackground,BodyMyAccountContainer,TitleWrapper, CardAccount} from './styles';
import {  getImageIfExist, refreshToken, uploadProfileImage } from '../../services/resources/user';
import Button from '../../components/Button';
import useAuth from '../../hooks/useAuth';
import { BASE_URL_FROM_BUCKET } from '../../utils/request-image';
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import { useNavigate } from 'react-router-dom';


const MyAccount = ()=>{

    const navigate = useNavigate();

    const [fileBase64,setFileBase64]= useState<string>("");

    const [imageUser,setImageUser]= useState<string>("");

    const {user, getCurrentUser} = useAuth();

    const initials= user.slug.substring(0,1)+ user.lastName.substring(0,1) || '';

   

    useEffect(() =>{
        getCurrentUser();
       
    },[])

   

    
  
    const formSubmit= async()=> {
       
        const data=await  uploadProfileImage(fileBase64 as string);            
        let a=getUrl();
        setImageUser(a as unknown as string);
        
           
}
useEffect(() => { 
    if(fileBase64 !== " " || "" || null){
       
            formSubmit()
        
        
    }
}, [fileBase64]);


    function convertFile(files: FileList|null){
        if(files){
            const fileRef= files[0] || ""
            const fileType: string=fileRef.type || ""
            const reader= new FileReader()
            reader.readAsBinaryString(fileRef)
            reader.onload=(ev: any) =>{
                
                setFileBase64(`data:${fileType as string};base64,${btoa(ev.target.result )}`);
                
                                      
            }                 
        }     
    }

      //percorrer lista para pegar perfil
      const userPerfil= user.perfis[0];
      
      
      const getUrl = async() =>{
        const data=  await getImageIfExist(user.id,userPerfil);
            if(data !=null){
               // const url=`${BASE_URL_FROM_BUCKET}cp${user.id}.jpg`;
                setImageUser(data as unknown as string);
                return data
            }
        
    
      }  
    
      useEffect(() => {  
        getUrl()
         
        }, [user.id]);

        const refreshTokenUser = async ()=>{
            const  resp = await refreshToken();    
            if(resp === 204){  
              navigate('/account')
            }else{
                navigate('/')
            }
        }
    
      useEffect( () =>  {
      refreshTokenUser()
    },[])

    
    return(
    <MyAccountBackground>
       <Header /> 
      <BarTop />
       <BodyMyAccountContainer>
        
        <TitleWrapper>
        <h1 className='title-account'>Minha Conta</h1>  
        </TitleWrapper>
       <div className='upload'>
        <div className='imgWrapper'>

        {imageUser !== '' ? <img src={imageUser} alt='Foto Perfil'/>:<p className='initials'>{initials}</p>}
        </div>
        <div className='round'>
        <form id='form-image-profile' onSubmit={formSubmit}>
            
            <input className='input-image-profile' type="file" onChange={(e) => convertFile(e.target.files)}/>
            <MdPhotoCamera style={{color:'#fff'}}/>
      
        </form>  
        </div>
        </div>
        
        <CardAccount status='ACTIVE'>
            <div className='card-account-wrapper'>
            <h2>Perfil</h2>
            
            <div className='card-account-wrapper-name'>
                <label>Nome</label>
                <p>{user.slug} {user.lastName}</p>
            </div>
            <div className='card-account-wrapper-email'>
                <label>Email</label>
                <p>{user.email}</p>
            </div>
           
            <div className='card-account-wrapper-date'>
                <label>Pago até</label>
                <p>17/11/1988</p>
            </div>
            <div className='card-account-wrapper-status'>
                <label>Status</label>
                <p>{user.status}</p>
                </div>

            <div className='card-account-wrapper-email'>
                <label>CRECI</label>
                <p>nº - 12345</p>
            </div>
           
            </div>
        </CardAccount>
       
        
       </BodyMyAccountContainer>
    </MyAccountBackground>
    )

}

export default MyAccount;