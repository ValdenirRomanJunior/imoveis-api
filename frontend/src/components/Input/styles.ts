import styled from "styled-components";

export const InputContainer = styled.div
   

`
    width:100%;
    height: 45px;

    background: ${({theme}) => theme.colors.background};
    border:1px solid #c9c9c9;
    border-radius: 8px;

    margin-bottom: 5px;

    display:flex;
    justify-content: center;



    input{
        font-size: 1rem;
        font-weight: 400;
        background: transparent;
        border: 0;
        width: 100%;
        margin: 0 20px;
        font-family: 'Open-sans', sans-serif;
        color: #4a4a4a;
        
    }

    span{
        font-family: 'Roboto', sans serif;
        font-size: .5rem;
        
    }
`
