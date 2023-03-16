import React, { useEffect, useState } from 'react'
import Button from '../../components/Button';
import Header from '../../components/Header';

import {BodyTenantsContainer,TenantsBackground,TitleWrapper} from './styles';
import BarTop from '../../components/Bartop';
import { Link, useNavigate } from 'react-router-dom';
import CardTenant from './CardTenant';
import { refreshToken } from '../../services/resources/user';
import LoadingLogin from '../../components/LoadingLogin';
import useAuth from '../../hooks/useAuth';
import PageNotFound from '../../components/PageNotFound';


const Tenants = ()=>{

  const {user, getCurrentUser} = useAuth();
  useEffect(() =>{
        
    getCurrentUser();


},[])

  const [loadingLogin,setLoadingLogin]= useState(true);

  useEffect(() =>{
     
    setTimeout(() =>{
        setLoadingLogin(false)
    },1000)

},[])

    const navigate = useNavigate();
    const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){  
          navigate('/tenants')
        }else{
            navigate('/')
        }
    }

  useEffect( () =>  {
  refreshTokenUser()
},[])
    
    return(
    
     <>
       {user?.perfis?.[0] === 'ADMIN' ? 
      <div>
      { loadingLogin &&  <LoadingLogin/> }

    <TenantsBackground>
       <Header /> 
      <BarTop />
       <BodyTenantsContainer>
        
        <TitleWrapper>
        <h1 className='title-properties'>Meus Clientes</h1>
        <Button className='register-button'><Link to="/registrationTenant">Cadastrar</Link></Button>
        </TitleWrapper>
       
        <CardTenant />
       </BodyTenantsContainer>
    </TenantsBackground>
  
     </div>
     : <PageNotFound/>}
     </>
    )

}

export default Tenants;