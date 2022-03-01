import React, { InputHTMLAttributes } from 'react';
import {InputImageContainer} from './styles';
import { FiCamera} from 'react-icons/fi';





const InputImage = (props: InputHTMLAttributes<HTMLInputElement>)=>{
    return(
       <InputImageContainer  >
        <FiCamera  size={50}/>
         <span>Adicionar fotos</span>
          
            <input {...props}/>
           

       </InputImageContainer>
          
      
    )
}

export default InputImage;