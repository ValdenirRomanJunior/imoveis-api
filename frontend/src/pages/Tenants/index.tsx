import React, { useEffect } from 'react'
import Button from '../../components/Button';
import Header from '../../components/Header';

import {BodyTenantsContainer,TenantsBackground,TitleWrapper} from './styles';
import BarTop from '../../components/Bartop';
import { Link, useNavigate } from 'react-router-dom';
import CardTenant from './CardTenant';
import { refreshToken } from '../../services/resources/user';


const Tenants = ()=>{

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
    )

}

export default Tenants;