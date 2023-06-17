import styled from "styled-components";


export const RegistrationBackground = styled.div`
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
export const BodyRegistrationContainer = styled.main`      
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
  
     
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
        font-size: .90rem;
        border: 1px solid #c9c9c9;
        margin-bottom: 10px;
        line-break: anywhere;
        
    }

    select{
        height:46px;
        border-radius: 10px;
        padding: 0 20px;
        font-size: 0.75rem;
        border: 1px solid #c9c9c9;
        margin-bottom: 10px;
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
   

    .number-wrapper{
        width:100px;
        position:relative;
    }

    .buttom-register-wrapper{
        margin-top: 30px;
        position: relative;
       
             
    }
    .button-send-email{
        position: relative;
    }
    .formField__error_reg{
        color:red;
        font-size: 12px;
        font-weight:400;

    
        width:100%;
    }
    .other-error{
        position: relative;
    
        background-color:#f81e1ec2;
        display: flex;
        justify-content: center;
        color:#fff;
        font-size:12px;
        padding:5px 15px;
        -webkit-box-shadow: 0px 0px 13px -5px rgba(214,214,214,1);
        -moz-box-shadow: 0px 0px 13px -5px rgba(214,214,214,1);
        box-shadow: 0px 0px 13px -5px rgba(214,214,214,1);
        text-align: center; 
        font-weight: bold;
        font-weight:400;
        margin-bottom: 20px;
     
       
    
    
      }
    .message-registration{
        width:100%;
        position:relative;
     
        margin-bottom:35px;
        display: flex;
        justify-content: center;
    }

     .message-registration .success{
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