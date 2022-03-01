import React, { TextareaHTMLAttributes } from 'react';
import {TextAreaContainer} from './styles';

const TextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>)=>{
    return(
        <TextAreaContainer>
            <textarea {...props}></textarea>
        </TextAreaContainer>
    )
}

export default TextArea;