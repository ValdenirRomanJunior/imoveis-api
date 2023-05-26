import styled from "styled-components";


export const EditBackground = styled.div`
width: 100%;   
display: flex;  
flex-direction: column;
justify-content: center;
align-items: center;
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


    @media screen and (min-width: 450px){
        width:90%;
        padding: 50px 0 0 0;
    }
    @media screen and (min-width: 550px){
        width:80%;
        padding: 50px 0 0 0;
    }
    @media screen and (min-width: 700px){
        width:70%;
        padding: 50px 0 0 0;
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
        padding-bottom: 10px;

        .other-error-update{
            text-align:center;
            width:100%;
            color:red;
            background: #e87f7f14;

        }
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

    .message-edit{
        width:100%;
        position:relative;
        margin-top:5px;
        margin-bottom:25px;
        display: flex;
        justify-content: center;
    }

     .message-edit .success{
        font-size: 14px;
        color:green;
        position: absolute;
        animation: buttons .3s linear;
        background-color: #7fe87f29;
        padding:10px 15px;
     
      
       

        .new-property-link{
            margin-left:5px;
        }
       
    }

    @keyframes buttons {
        
        0%{
            transform: scale(0.1);
        }
        50%{
            transform: scale(0.5);
        }
        100%{
            transform: scale(1);
          
        }
    }

    @media screen and (min-width: 1000px){
        
    }
  
    `