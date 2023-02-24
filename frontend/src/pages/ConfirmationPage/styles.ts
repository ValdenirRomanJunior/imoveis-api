import styled from "styled-components";


export const BodyConfirmationPage = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height:100vh;

   
    .verified-email{
        width: 100%;
        height:100vh;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .icon-verified-email{
            font-size:70px;
            color: green;
        }

        p{
            margin-bottom:0;
        }
        .text-verify{
        font-size: 25px;

        }

        .link-verified-email{
            font-size: 20px;
        }

    }
        .verify-buttom-register-wrapper {
          
            .loading-verify-button-send-confirmation {
                background: blue;
                position:relative;
                padding:10px 15px;
                color:blue;
                width:175px;
                height:45px;
            }

            .verify-button-send-confirmation {
                position:relative;
                padding:10px 15px;
                color: blue;
            }

        
    }

`