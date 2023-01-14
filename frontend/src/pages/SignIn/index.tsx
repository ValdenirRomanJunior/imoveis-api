import React from "react";
import {useEffect, useState} from 'react';

import {Wrapper,Background,InputContainer,ButtonContainer} from './styles';
import Card  from "../../components/Card";
import background from '../../assets/images/bg-login.png';
import logo from '../../assets/images/logo-site.png';
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

import useAuth from '../../hooks/useAuth';
import api from "../../utils/requests";


const SignIn = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError]=useState();

    const navigate =useNavigate();
    const {userSignIn} = useAuth();

    const handleToSignIn = async() =>{
     
        const data ={
            email,
            password
        }

             
       const response =  await userSignIn(data); 
       console.log(response)
       if(response.startsWith('Bea')){   
        navigate('/dashboard');
        return;
    
       } 
       setError(response as any);
        
    }

    return (
    <Wrapper>
        <Background image={background} />
        <Card width="403px" paddingTop="30px">
        <img src={logo} width={172} height={27}  alt="logo dynamous" />
        <InputContainer>
        <Input placeholder="EMAIL" value={email} onChange={e => setEmail(e.target.value)}/>
        <Input placeholder="SENHA" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </InputContainer>
        <ButtonContainer>
            <Button type="button" onClick={handleToSignIn}>Entrar</Button>
            <p>Ainda não é cadastrado? <Link to="/signup">Cadastre-se já</Link></p>
            <p>{error}</p>
        </ButtonContainer>
        
       
        </Card>
    </Wrapper>

    )

}
export default SignIn;