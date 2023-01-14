/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import { base64 } from '@firebase/util';
import React, { useEffect, useState } from 'react'
import BarTop from '../../components/Bartop';
import Header from '../../components/Header';
import defaultImage from '../../assets/images/no-pictures.png';
import {MdPhotoCamera} from 'react-icons/md';

import {MyAccountBackground,BodyMyAccountContainer,TitleWrapper} from './styles';
import {  getImageIfExist, uploadProfileImage } from '../../services/resources/user';
import Button from '../../components/Button';
import useAuth from '../../hooks/useAuth';
import { BASE_URL_FROM_BUCKET } from '../../utils/request-image';


const MyAccount = ()=>{
    const [fileBase64,setFileBase64]= useState<string>("");

    const [imageUser,setImageUser]= useState<string>("");

    const {user, getCurrentUser} = useAuth();

   

    useEffect(() =>{
        getCurrentUser();
       
    },[])

    if(!user){
        return null;
    }

    
  const getUrl = async() =>{
    const data=  await getImageIfExist(user.id);
        if(data !=null){
           // const url=`${BASE_URL_FROM_BUCKET}cp${user.id}.jpg`;
            setImageUser(data);

        }
    

  }  
  useEffect(() => {  
   getUrl()
    
   }, [user.id]);



    const formSubmit= async (e:any)=> {
        e.preventDefault();
    
        
        const data=await  uploadProfileImage(fileBase64);
            
        let a=getUrl();
        setImageUser(a as unknown as string);
  
    }


  
  

    function convertFile(files: FileList|null){
        if(files){
            const fileRef= files[0] || ""
            const fileType: string=fileRef.type || ""
            const reader= new FileReader()
            reader.readAsBinaryString(fileRef)
            reader.onload=(ev: any) =>{
                setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
            }

        }
    }
    
    return(
    <MyAccountBackground>
       <Header /> 
      <BarTop />
       <BodyMyAccountContainer>
        
        <TitleWrapper>
        <h1 className='title-properties'>Minha Conta</h1>  
        </TitleWrapper>
       <div className='upload'>
        <div className='imgWrapper'>
            <img src={imageUser}/>
        </div>
        <div className='round'>
        <form id='form-image-profile' onSubmit={formSubmit}>
            
            <input className='input-image-profile' type="file" onChange={(e) => convertFile(e.target.files)}/>
            <MdPhotoCamera style={{color:'#fff'}}/>

           
        </form>
       
        </div>
       
        </div>
        <button form='form-image-profile' type='submit' className='button-submit'>Enviar</button> 
       
       
       </BodyMyAccountContainer>
    </MyAccountBackground>
    )

}

export default MyAccount;