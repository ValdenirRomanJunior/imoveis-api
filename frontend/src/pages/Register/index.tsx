import React from 'react'
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import InputImage from '../../components/InputImage';
import TextArea from '../../components/TextArea';
import { useNavigate } from 'react-router-dom';


import { RegisterWrapper, BodyRegisterContainer, InputRegisterContainer, ButtonWrapper, ButtonContainer, TextAreaContainer, ImageContainer } from './styles';

const Register = () => {
    const navigate = useNavigate();
    const handleToRegister = () => {
        navigate('/dashboard');
    }
    return (
        <RegisterWrapper>
            <Header />
            <h1>Register your land</h1>
            <BodyRegisterContainer>
                <ImageContainer style={{marginBottom:"2rem"}}>
                    <InputImage type="file" accept='jpg, png' multiple />

                    
                </ImageContainer>
                <InputRegisterContainer style={{marginTop:"70px"}}>
                    <Input placeholder='Title*' />
                </InputRegisterContainer>

                <TextAreaContainer>
                    <TextArea placeholder='Description*' />
                </TextAreaContainer>
                <InputRegisterContainer>
                    <Input placeholder='Beds*'/>
                </InputRegisterContainer>
                <InputRegisterContainer>
                    <Input placeholder='Baths*' />
                </InputRegisterContainer>
                <InputRegisterContainer>
                    <Input placeholder='Yr Built?*' />
                </InputRegisterContainer>
                <InputRegisterContainer style={{width: "20%"}} >
                    <Input placeholder='value*' />
                </InputRegisterContainer>
                <InputRegisterContainer>
                    <Input placeholder='Sqft*' />
                </InputRegisterContainer>

                <InputRegisterContainer style={{width: "20%"}}>
                    <Input placeholder='zipcode*' />
                </InputRegisterContainer>
                <InputRegisterContainer>
                    <Input placeholder='Address*' />
                </InputRegisterContainer>
              
                <InputRegisterContainer>
                    <Input placeholder='district*' />
                </InputRegisterContainer>

                <InputRegisterContainer>
                    <Input placeholder='City*' />
                </InputRegisterContainer>
                <InputRegisterContainer>
                    <Input placeholder='State*' />
                </InputRegisterContainer>
               
            </BodyRegisterContainer>
            <ButtonWrapper>
                <ButtonContainer>
                    <Button type='button' onClick={handleToRegister} style={{borderRadius:"30px"}}>Register</Button>
                </ButtonContainer>
            </ButtonWrapper>
        </RegisterWrapper>

    )
}

export default Register