import styled from "styled-components";


export const CardWrapper = styled.div`
width: 90%;
height: auto;
border-bottom: 1px solid rgb(222, 222, 222);
margin-top: 10px;

`

export const CardContent = styled.div`
width: 100%;
height:100%;

display: flex;
justify-content: space-around;

font-family: "Poppins", sans-serif;
padding: 5px 5px;


    
    img{
        max-width: 65px;
        height: 65px;
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
        
        .slug-card-tenant{
            color: rgb(74, 74, 74)  !important;
            overflow: hidden;
            text-overflow: ellipsis;
           
            font-weight:400;
            font-size:11px;
            

        }
        .status{
            font-weight: 500;
            color: rgb(74, 74, 74);
            font-size: 11px;
            margin-bottom: 2px;
        }
        p{
            margin-bottom: 0;
            display: flex;
            align-items: center;
        }
        .email{
            color: rgb(153, 153, 153);
            font-size: 11px;
            display: flex;
            align-items: center;
            
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
            font-size: 11px;
            font-weight: 300;
            
            
        
            .icon-links{
                margin-right:4px;
                font-size: 15px;
                cursor: pointer;
            }

        }

    }

    .dates-tenant-wrapper{
        margin-bottom: 10px;
    }

    .date-tenant-wrapper{
        display: flex;
      
        align-items: center;

        span{
            font-family: "Outfit", sans-serif;
            font-size: 11px;
            color: rgb(153,153,153);
        }
        .date-tenant-value{
            margin-left: 10px;
            color:green;
            font-size: 10px;
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