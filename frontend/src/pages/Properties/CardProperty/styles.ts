import styled from "styled-components";


export const CardWrapper = styled.div`
width: 90%;
height: 110px;
border-bottom: 1px solid rgb(222, 222, 222);
margin-top: 10px;
padding: 10px 0;
`

export const CardContent = styled.div`
width: 100%;
height:100%;
padding: 10px;
display: flex;
justify-content: space-around;
align-items: center;

font-family: "Poppins", sans-serif;



    
    img{
        max-width: 75px;
        height: 75px;
        object-fit: cover;
        border-radius: 5px;
    }

    .text-wrapper-card{
        display:flex;
        flex-direction: column;
        justify-content: center;
        flex:1;
        margin-left:10px;
        padding: 5px 5px;
        max-width:100%;
        overflow: hidden;

        
        .title-card-property{
            color: rgb(74, 74, 74)  !important;
            margin-bottom: 3px;
            font-weight:400;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
           white-space: nowrap;
           cursor: pointer;
           outline: none;
           max-width:100%;
         
            

        }
        .value{
            font-weight: 500;
            color: rgb(74, 74, 74);
            font-size: 14px;
            margin-bottom: 3px;
            text-overflow: ellipsis;
            display: block;
            white-space: nowrap;
            max-width: 100%;
        }
        p{
            margin-bottom: 0;
            
        }

        .localization-wrapper{
            display:flex;
            width:100%;
            overflow:hidden;
            line-break: anywhere;
            text-overflow: ellipsis;
            align-items:center;
            
        }
        .localization{
            color: rgb(153, 153, 153);
            font-size: 12px;
            
            align-items: center;
            margin-bottom: 6px;
            font-weight: 300;
            line-break: anywhere;
            text-overflow: ellipsis;
            display: block !important;
            white-space: nowrap;
            max-width: 40%;
            overflow: hidden;
           
        }
        .localization-icon{
            font-size:15px;
        }
        .district-localization{
            margin-left:5px;
        }

        .links-card{
            display: flex;
            color:#0b90d1;
            justify-content: space-between;  
            width: 65%;
            font-size: 11px;
            font-weight: 300;
            
            
        
            .icon-links{
                margin-right:4px;
                font-size: 15px;
            }

        }

    }

    @media screen and (min-width: 1000px){
        .text-wrapper-card{
            .links-card{
                width:17%;
            }

        }
    }

   
`

export const CardContainer = styled.main`   
    width:100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 0 30px 0;
    border-top: 1px solid #e6e9ed;

    .wrapper-properties{
        width:100%;
        
        display: flex;
        align-items: center;
        justify-content: center;
    }
   
    `

    export const MessageNoProperties = styled.div`
    width:100%;
    height:100vh;

    text- align center;

    h4{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        
        color: gray;
        font-size:12px;
        width:100%;
        text-align: center;
    }

    `