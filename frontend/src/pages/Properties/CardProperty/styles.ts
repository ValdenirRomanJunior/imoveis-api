import styled from "styled-components";


export const CardWrapper = styled.div`
width: 90%;
height: 110px;
border-bottom: 1px solid rgb(222, 222, 222);
margin-top: 10px;
`

export const CardContent = styled.div`
width: 100%;
height:100%;

display: flex;
justify-content: space-around;

font-family: "Poppins", sans-serif;
padding: 4px 0;


    
    img{
        max-width: 95px;
        height: 95px;
        object-fit: cover;
        border-radius: 5px;
    }

    .text-wrapper-card{
        display:flex;
        flex-direction: column;
        justify-content: center;
        flex:1;
        margin-left:10px;
        padding: 0px 5px;
        
        .title-card-property{
            color: rgb(74, 74, 74)  !important;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 3px;
            font-weight:400;
            

        }
        .value{
            font-weight: 500;
            color: rgb(74, 74, 74);
            font-size: 16px;
            margin-bottom: 3px;
        }
        p{
            margin-bottom: 0;
            display: flex;
            align-items: center;
        }
        .localization{
            color: rgb(153, 153, 153);
            font-size: 13px;
            display: flex;
            align-items: center;
            margin-bottom: 6px;
            font-weight: 300;
        }
        .localization-icon{
            font-size:15px;
        }

        .links-card{
            display: flex;
            color:#0b90d1;
            justify-content: space-between;  
            width: 65%;
            font-size: 12px;
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