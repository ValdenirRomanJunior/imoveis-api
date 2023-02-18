import styled from "styled-components";


export const EditBackground = styled.div`
width: 100%;   
display: flex;  
flex-direction: column;
justify-content: center;
background-color: ${({theme}) => theme.colors.backgroundLight};

@media screen and (min-width:1000px){
    align-items: center;
    width:100vw;
}
`
export const BodyEditContainer = styled.main`      
    width:100%;
    display:flex;
    flex-direction: column;
     
    padding: 50px 0 30px 0;

    .title-registration{
        text-align: center;
        font-family: "Poppins",sans-serif;
        font-size: 25px;
        color: #5d5d5d;
        font-weight: 500;
        margin-bottom: 50px;
        padding: 0 30px;
        
    }


    @media screen and (min-width: 1000px){
        width:50%;
        padding: 50px 0 0 0;
    }
  
    `

    export const FormContainer = styled.div`      
    width:100%;
    display:flex;
    flex-direction: column;
   
     
    padding: 0px 20px;

    label{
        margin-bottom: 6px;
        font-weight: 500;
        color: #4a4a4a;
        font-size:16px;

    }
 
    textarea{
        height:108px;
        border-radius: 10px;
        padding: 0 20px;
        font-size: 0.75rem;
        border: 1px solid #c9c9c9;
        margin-bottom: 20px;
        
    }

    select{
        height:46px;
        border-radius: 10px;
        padding: 0 20px;
        font-size: 0.75rem;
        border: 1px solid #c9c9c9;
        margin-bottom: 20px;
        position: relative;

        option{
            padding: 0 20px;
        }

        option:disabled{
            color:gray;
        }

    }
    legend{
        font-size: 16px;
        font-weight: 500;
        color: #4a4a4a;
       

    }
    .input-radio-wrapper{
        margin-bottom: 20px;
    }

    .number-wrapper{
        width:90px;
        position:relative;
    }

    .buttom-register-wrapper{
        margin-top: 30px;
    }
    .formField__error{
        color:red;
        font-size: 12px;
        font-weight:400;
        
        position: absolute:
        top:0;
        left: 0;
        width:100%;
    }



    @media screen and (min-width: 1000px){
        
    }
  
    `

    export const InputRange =styled.div`
        width:25px;

    input{
        width:100%;

    }
    
    `