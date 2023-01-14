import React from 'react'
import Button from '../../components/Button';
import Header from '../../components/Header';
import CardProperty from './CardProperty';
import {PropertiesBackground,BodyPropertiesContainer,TitleWrapper} from './styles';
import BarTop from '../../components/Bartop';
import { Link, useNavigate } from 'react-router-dom';


const Properties = ()=>{
    
    return(
    <PropertiesBackground>
       <Header /> 
      <BarTop />
       <BodyPropertiesContainer>
        
        <TitleWrapper>
        <h1 className='title-properties'>Meus Imóveis</h1>
        <Button className='register-button'><Link to="/registration">Cadastrar</Link></Button>
        </TitleWrapper>
       
        <CardProperty />
       </BodyPropertiesContainer>
    </PropertiesBackground>
    )

}

export default Properties;