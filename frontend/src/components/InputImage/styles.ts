import styled from "styled-components";

export const InputImageContainer = styled.div`
    width:120px;
    height:100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #000;
    flex-direction: column;
    background-color: ${({theme}) => theme.colors.backgroundLight};
 
    
   

    input{
        font-size: 0.75rem;
        font-weight: 400; 
        border: 0;
        width: 100%;
        background:transparent;
        z-index: 1;
        
          
    }
`