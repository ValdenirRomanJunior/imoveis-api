import styled from "styled-components";


export const CardWrapper = styled.div`
width: 270px;
height:320px;
background: #fff;
border-radius: 12px;
margin-top: 20px;
cursor: pointer;
transition: all 0.3s ease;
-webkit-box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
-moz-box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
border: 1px solid #f3f4f6;

&:hover{
    transform: translateY(-4px);
    -webkit-box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}



@media screen and (min-width: 700px){
    width: 260px;
   
}

@media screen and (min-width: 1300px){
    width: 250px;
   
}


`

export const CardContent = styled.div`
width: 100%;
height:100%;
display: flex;
flex-direction: column;
align-items: center;
position:relative;
overflow: hidden;
border-radius: 12px;

    .image-card-property-home-wrapper{
        width:100%;
        height:180px;
        background:rgb(243, 244, 246);
    }

  .image-card-property-home{
    width: 100%;
    height: 180px;
    object-fit: cover;
    aspect-ratio: 16/9;
  }
  .default-image-card-property-home{
    width: 100%;
    height: 180px;
    object-fit: contain;
    aspect-ratio: 16/9;
  }

    
    .price-wrapper{
        -webkit-box-shadow: 0px 4px 6px rgba(0,0,0,0.05);
        -moz-box-shadow: 0px 4px 6px rgba(0,0,0,0.05);
        box-shadow: 0px 4px 6px rgba(0,0,0,0.05);

        font-weight: 600;
        color: #1f2937;
        font-size: 12px;
        margin-bottom: 3px;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        justify-content: left;
       
        white-space: nowrap;
        position:absolute;
        top: 155px; /* Puxado mais para cima para ficar na linha da imagem */
        left:12px;
        min-width:82px;
        max-width:125px;
        padding:0 12px;
        height:26px;
        background:rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(4px);
        border-radius:20px;
    }

    .type-wrapper{
        -webkit-box-shadow: 0px 3px 6px -4px rgba(128,128,128,1);
        -moz-box-shadow: 0px 3px 6px -4px rgba(128,128,128,1);
        box-shadow: 0px 3px 6px -4px rgba(128,128,128,1);

        font-weight: 500;
        color:#9B9B9B;
        font-size: 16px;
        margin-bottom: 3px;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        justify-content: center;
       
        white-space: nowrap;
        position:absolute;
        top:46%;
        right:10%;
        width:35px;
        height:35px;
        background:#fff;
        border-radius:50%;
       

    }

    .text-wrapper-card{
        width:100%;
        display:flex;
        flex-direction: column;
        justify-content: center;
       
      
        padding: 5px 5px;
       
        overflow: hidden;

        .title-wrapper-card-property{
            display: flex;
            width:100%;
            margin-bottom: 3px;
            justify-content: space-between;
            padding:20px 15px 0 15px;
        }
        .title-card-property{
           
            font-size:14px;
            color: rgb(74, 74, 74)  !important;
         
            font-weight:500;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
            white-space: nowrap;
            cursor: pointer;
            outline: none;
            
        }
        .title-card-property-cod{
          
            font-size:11px;
            color: rgb(74, 74, 74)  !important;
            font-weight:200;
            padding-right:5px;
            display:flex;
            align-items: center;
        }
   
        p{
            margin-bottom: 0;
            
        }

        .localization-wrapper{
            
            font-weight:200;
            display:flex;
            width:100%;
            overflow:hidden;
            line-break: anywhere;
            text-overflow: ellipsis;
            align-items:center;
            padding-top:9px;
            padding-left:10px;
            
        }
        .localization{
        
            font-weight:200 !important;
            color: rgb(153, 153, 153);
            font-size: 11px;
            
            align-items: center;
            margin-bottom: 0;
          
            line-break: anywhere;
            text-overflow: ellipsis;
            display: block;
            white-space: nowrap;
            max-width: 40%;
            overflow: hidden;
           
        }
        .localization-icon{
            font-size:15px;
            color:#A4B7E9;
        }
        .district-localization{
            margin-left:5px;
        }

        .links-card{

            display: flex;
            color:#0b90d1;
            justify-content: space-between;  
            width:150px;
            font-size: 11px;
            font-weight: 300;
            
                   
            .icon-links{
                margin-right:4px;
                font-size: 15px;
            }

        }
     

    @media screen and (min-width: 700px){
        .text-wrapper-card{
            .links-card{
                width:150px;
            }

        }
    }

   
`

export const CardContainer = styled.main`   
    width:100%;
    display: flex;
    justify-content: center;
    

    `

    export const MessageNoProperties = styled.div`
    width:100%;
    height:100vh;

    text-align: center;

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

    export const StatusProperty = styled.div<{
    statusProperty:string}>`

    width:100%;
    color: ${({statusProperty}) => statusProperty ==='1' ? 'green' : 'red'};
    display: flex;
    align-items: center;
    justify-content: start;
    text-align:left;
    padding-left: 10px;
   
  

    p{
        text-align:left;      
        font-size:12px;
        margin-left:3px;
        text-transform: uppercase;
        margin-bottom: 0;
      
    }

    

    `

    export const InputRangeProperty =styled.div`
    width:25px;
    margin-left:20px;


    input{
        width:100%;
     
        transition: .4s all ease-out;
        outline: none;

    }

 
`
export const DetailsCardWrapper = styled.div`
        width:80%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top:22px;
      

        .details-bottom-card{
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;     
            width:25%;
           
            .value-detail-bottom{
                font-size:9px;
                font-weight:600;
              
            }

            .title-detail-bottom{         
                font-weight:300;
                font-size:9px;
                color:#979797;
              
               
            }
        }
        .left-border{
            border-left:1px solid rgb(230, 233, 237);
        }

`
    