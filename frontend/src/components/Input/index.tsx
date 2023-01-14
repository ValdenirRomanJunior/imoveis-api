import { InputHTMLAttributes} from 'react';
import {InputContainer} from './styles';

interface InputProps { 
    border?: boolean;
   

  
}

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
    return(
       <InputContainer>
        <input {...props}/>
       </InputContainer>
    )
}

export default Input;