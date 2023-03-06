import styled from "styled-components";


export const BodyConfirmationPage = styled.div`
    width:100%;
    display: flex;
    
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

        .icon-error-verification{
            font-size:70px;
            color:#ff000094;
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

    .page-confirmation-wrapper{
       margin-top:30px;

       display: flex;
       flex-direction:column;
       align-items: center;

        .logo-wrapper-confirmation{
            width: 120px;
            height:50px;

            img{
                width:100%;
                height: 100%;
                object-fit: contain;
            }
        }

        h2{
            font-family:"Nunito Sans", sans-serif;
            color:#727272;
            font-weight:600;
            margin-top:10px;
            font-size:20px;
        }
        
        .verify-buttom-register-wrapper {
          
            .loading-verify-button-send-confirmation {
                background:#008ace;
                position:relative;
                margin-top:10px;
                
                width:155px;
                height:35px;
                border:none;
                border-radius: 2px;
            }

            .verify-button-send-confirmation {
                margin-top:10px;
                background:#008ace;
                position:relative;
               font-size:15px;
                color:#fff;
                width:155px;
                height:35px;
                border:none;
                border-radius: 2px;
            }

        
    }
}

`