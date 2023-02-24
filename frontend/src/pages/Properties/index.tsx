import React, { useEffect, useState } from 'react'
import Button from '../../components/Button';
import Header from '../../components/Header';
import CardProperty from './CardProperty';
import {PropertiesBackground,BodyPropertiesContainer,TitleWrapper} from './styles';
import BarTop from '../../components/Bartop';
import { Link, useNavigate } from 'react-router-dom';
import {VscHome } from 'react-icons/vsc';
import {IoIosAdd} from 'react-icons/io'
import { refreshToken } from '../../services/resources/user';
import LoadingLogin from '../../components/LoadingLogin';


const Properties = ()=>{

    const navigate = useNavigate();

    const [loadingLogin,setLoadingLogin]= useState(true);

    useEffect(() =>{
       
      setTimeout(() =>{
          setLoadingLogin(false)
      },1500)

  },[])

    const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){  
          navigate('/properties')
        }else{
            navigate('/')
        }
    }

  useEffect( () =>  {
  refreshTokenUser()
},[])
    
    return(
      <div>
      { loadingLogin &&  <LoadingLogin/> }
 { !loadingLogin ?  
    <PropertiesBackground>
       <Header /> 
      <BarTop />
       <BodyPropertiesContainer>
        
        <TitleWrapper>
        <h1 className='title-properties'>Meus Imóveis</h1>
        <Link to="/registration"> <button className="button-add-lead" >
        <VscHome className="icon-add-lead"/> <IoIosAdd className='icon-add-lead-positive'/></button> </Link>
       
        </TitleWrapper>
       
        <CardProperty />
       </BodyPropertiesContainer>
    </PropertiesBackground>
    :''}
    </div>
    )

}

export default Properties;