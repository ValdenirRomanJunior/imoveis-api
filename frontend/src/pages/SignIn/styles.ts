import styled from "styled-components";

export const Wrapper = styled.main`

    width: 100%;
    height: 100vh;

    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    .send-new-password{
        cursor:pointer;
        width:100%;
        text-align:center;
        color:#5981e3;
        font-weight:400;
        font-family:"Nunito Sans", sans-serif;
        font-size:14px;

        .icon-send-email{
            font-size:24px;
            font-weight:200;
        }
    }

    .message-backend{
        text-align: center;
        
    }

    .formField__error_backend{
        font-family: 'Nunito Sans', sans-serif;
        font-size: 14px;
        color:rgb(180, 0, 0);
        background: #e87f7f14;
        

    }

`

export const Background = styled.div<{image: any}>`
    position: absolute;
    width: 100%;
    top:0;
    left: 0;
    height: 50vh;
    background-image: url(${({image}) => image });
    background-size: cover;
    background-position: center;
    z-index: -1;
    background-repeat: no-repeat;


`
export const InputContainer = styled.div<{rotate:boolean}>`
    margin-top: 67px;
    width: 90%;
    flex: 1;

    .formField__error{
        color:red;
        font-size:13px;
        font-family: 'Nunito Sans', sans-serif;
        
    }

    .account-verification{
        background: #009dff1f;
        color:blue;
        text-align: center;
        padding: 8px 5px;
        border-radius:2px;

        .resend-verification{
            display: block;
            margin-top:10px;
            color:#757575c7;


            .resend-icon{
                transform: rotate(0deg);
                overflow: hidden;
                transition: all .3s ease-out;
                font-size:20px;
                margin-right:10px;
                -webkit-transition-delay: now;
                -webkit-animation-timing-function: linear;
                animation: ${(props) => (props.rotate ? `rotation 1s infinite  linear` : 'false')}; 
            }

            @keyframes rotation {
                from {
                  transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
              }


          
        }

    }

`
export const ButtonContainer = styled.div`
    width: 90%;
    margin-top: 20px;
    position:relative;

    display: flex;
    align-items: center;
    flex-direction: column;


    .messageToSignUp{
        font-size: 0.75rem;
        font-weight: 400;
        color: ${({theme}) => theme.colors.secondary};
        margin-bottom:0;

        a{
            font-size: 1rem;
            font-weight: 700;
        }
    }

    .button-login{
        position: relative;
        display:flex;
        align-items: center;
       

        .loading-login-wrapper{
            display: flex;
            align-items: center;
            justify-content: center;
        }
     

    }

   
`