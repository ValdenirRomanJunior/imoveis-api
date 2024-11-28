import React, { useEffect, useState } from 'react'
import Button from '../../components/Button';
import Header from '../../components/Header';

import {BodyTenantsContainer,TenantsBackground,TitleWrapper} from './styles';
import BarTop from '../../components/Bartop';
import { Link, useNavigate } from 'react-router-dom';
import CardTenant from './CardAccount';
import { refreshToken } from '../../services/resources/user';
import LoadingLogin from '../../components/LoadingLogin';
import useAuth from '../../hooks/useAuth';
import PageNotFound from '../../components/PageNotFound';
import CardAccount from './CardAccount';


const Accounts = ()=>{

  const {user, getCurrentUser} = useAuth();
  useEffect(() =>{
        
    getCurrentUser();


},[])



    const navigate = useNavigate();
    const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){  
          navigate('/accounts')
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
     

    <TenantsBackground>
       <Header /> 
      <BarTop />
       <BodyTenantsContainer>
        
        <TitleWrapper>
        <h1 className='title-properties'>Meus Clientes</h1>
        <Button className='register-button'><Link to="/accountRegistration">Cadastrar</Link></Button>
        </TitleWrapper>
       
        <CardAccount />
       </BodyTenantsContainer>
    </TenantsBackground>
  
     </div>
     : <PageNotFound/>}
     </>
    )

}

export default Accounts;