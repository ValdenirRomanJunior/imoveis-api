import React from "react";
import {Wrapper,Background,InputContainer,ButtonContainer} from './styles';
import Card  from "../../components/Card";
import background from '../../assets/images/bg-login.png';
import logo from '../../assets/images/logo-site.png';
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {

    const navigate =useNavigate();

    const handleToSignUp = () =>{
        navigate('/dashboard');
    }
    return (
    <Wrapper>
        <Background image={background}/>
        <Card width="403px" paddingTop="30px">
        <img src={logo} width={172} height={27}  alt="logo dynamous" />
        <InputContainer>
        <Input placeholder="NOME" />
        <Input placeholder="EMAIL" />
        <Input placeholder="SENHA" type="password" />
        </InputContainer>
        <ButtonContainer>
            <Button type="button" onClick={handleToSignUp}>Enviar</Button>
            <p>Já tem um conta? <Link to="/">Entre já</Link></p>
        </ButtonContainer>
        
       
        </Card>
    </Wrapper>

    )

}
export default SignUp;