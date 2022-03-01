import React from 'react'
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import InputImage from '../../components/InputImage';
import TextArea from '../../components/TextArea';


import {RegisterWrapper,BodyRegisterContainer, InputRegisterContainer,ButtonWrapper,ButtonContainer, TextAreaContainer,ImageContainer} from './styles';

const Register = ()=>{
    return(
        <RegisterWrapper>
            <Header />

                <BodyRegisterContainer>
                 <InputRegisterContainer>
                    <Input  placeholder='Title*'/>
                 </InputRegisterContainer>

                    <TextAreaContainer>
                        <TextArea placeholder='Description*'/>
                    </TextAreaContainer>

                    <ImageContainer>
                        <InputImage type="file" accept='jpg, png' multiple>
                      
                        </InputImage>
                       

                        
                    </ImageContainer>
               



                </BodyRegisterContainer>
                <ButtonWrapper>
                <ButtonContainer>
                    <Button />
                </ButtonContainer>
                </ButtonWrapper>
                </RegisterWrapper>
        
    )
}

export default Register