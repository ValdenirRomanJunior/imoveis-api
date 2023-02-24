import styled from "styled-components";


export const RegistrationBackground = styled.div`
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
export const BodyRegistrationContainer = styled.main`      
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

        .other-error{
            position: absolute;
            top:-55px;
            left:50%;
            transform: translate(-50%,-50%);
            content: "copiado";
        
            background-color:#f81e1ec2;
            display: flex;
            color:#fff;
            font-size:12px;
            padding:5px 15px;
            -webkit-box-shadow: 0px 0px 13px -5px rgba(214,214,214,1);
            -moz-box-shadow: 0px 0px 13px -5px rgba(214,214,214,1);
            box-shadow: 0px 0px 13px -5px rgba(214,214,214,1);
            text-align: center;
           
            font-weight: bold;
            transition: transform .3s;
            animation: copy 4s ease-in-out;
            transform: translateY(0) scale(0);
            opacity:0;
            font-weight:400;
           
        
        
          }
        
          @keyframes copy {
            
            0%{
                transition: .1s;
                transform: translateY(0) scale(1.2);
                opacity:0.3;
               
               
            } 
            25%{
               
                transform: translateY(10px) scale(1.2);
                opacity:1;   
                
                      
            }
        
            50%{
               
                transform: translateY(10px) scale(1.2);
                opacity:.9; 
                        
            }
            75%{
               
                transform: translateY(10px) scale(1.2);
                opacity:.3;
                            
            }
            100%{
               
                transform: translateY(10px) scale(1.2);
                opacity:0;
                            
            }
          }
        
    }

    .formField__error_reg{
        color:red;
        font-size: 12px;
        font-weight:400;

    
        width:100%;
    }

    .message-registration{
        width:100%;
        position:relative;
        margin-top:5px;
        margin-bottom:25px;
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
        margin-top:20px;
       

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