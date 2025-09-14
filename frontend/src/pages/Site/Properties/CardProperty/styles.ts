import styled from "styled-components";


export const CardWrapper = styled.div`
width: 250px;
height:310px;
border-bottom: 2px solid rgb(222, 222, 222);
margin-top: 40px;
margin:1rem;



&:hover{
    -webkit-box-shadow: 1px 6px 14px -9px rgba(138,138,138,1);
    -moz-box-shadow: 1px 6px 14px -9px rgba(138,138,138,1);
    box-shadow: 1px 6px 14px -9px rgba(138,138,138,1);

}

@media screen and (min-width: 1000px){
    width:230px;
}
`

export const CardContent = styled.div`
width: 100%;
height:100%;
display: flex;
flex-direction: column;


align-items: center;
position:relative;


  .image-card-properties-wrapper{
    background-color: #d8d8d8;
    width:100%;
    height: 160px;

  }  
    img{
        width: 100%;
        height:160px;
        object-fit: cover;
        
        border-radius:3px;
         
    }
    .default-image-card-properties{
        width: 100%;
        height:160px;
        object-fit: contain;
        
        border-radius:3px;

    }
    .price-wrapper{
        -webkit-box-shadow: 0px 10px 10px -8px rgba(120,120,120,1);
        -moz-box-shadow: 0px 10px 10px -8px rgba(120,120,120,1);
        box-shadow: 0px 10px 10px -8px rgba(120,120,120,1);

        font-weight: 500;
        color: rgb(74, 74, 74);
        font-size: 11px;
        margin-bottom: 3px;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        justify-content: left;
       
        white-space: nowrap;
        position:absolute;
        top:48%;
        left:10%;
        min-width:82px;
        max-width:125px;
        padding:0 10px;
        height:24px;
        background:#fff;
        border-radius:20px;
       

    }

    .type-wrapper{
        -webkit-box-shadow: 0px 10px 11px -11px rgba(128,128,128,1);
        -moz-box-shadow: 0px 10px 11px -11px rgba(128,128,128,1);
        box-shadow: 0px 10px 11px -11px rgba(128,128,128,1);

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
            align-items: center;
           
            width:100%;
            overflow:hidden;
            line-break: anywhere;
            text-overflow: ellipsis;
           
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
          
            white-space: nowrap;
            max-width: 40%;
            overflow: hidden;
            display: block;
           
        }
        .localization-icon{
            font-size:15px;
            color:#A4B7E9;
        }
        .district-localization{
            margin-left:5px;
            text-overflow: ellipsis;
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
    display:flex;
    flex-direction: column;
    align-items: center;

   
    margin-top:90px;

    .wrapper-properties{
        width:100%;
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: center;
    }
   
    .pagination-button-wrapper{
        display: flex;
        align-items: center;
        padding-right:20px;
     

        .button-all-properties{
            margin-right:20px;
        }
    }
    .properties-found-message{
    
        font-size:1rem;
        margin-top:25px;
        color:gray;
        padding-right:2rem;
        padding-left:2rem;
        font-weight:300;
        font-size:15px;
    }

    @media screen and (min-width:600px){
        .wrapper-properties{
            flex-direction: row;
            justify-content: space-between;
            padding:0 2rem;
            flex-wrap: wrap;

        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }

    @media screen and (min-width:620px){
        .wrapper-properties{
            flex-direction: row;
            justify-content: space-between;
            padding:0 2.5rem;
            flex-wrap: wrap;

        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }
    @media screen and (min-width:650px){
        .wrapper-properties{
            flex-direction: row;
            justify-content: space-between;
            padding:0 3.4rem;
            flex-wrap: wrap;

        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }
    @media screen and (min-width:670px){
        .wrapper-properties{
            flex-direction: row;
            justify-content: space-between;
            padding:0 4.6rem;
            flex-wrap: wrap;

        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }

    @media screen and (min-width:700px){
        .wrapper-properties{
            flex-direction: row;
            justify-content: space-between;
            padding:0 5.2rem;
            flex-wrap: wrap;

        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }

    @media screen and (min-width:740px){
        .wrapper-properties{
            flex-direction: row;
            justify-content: space-between;
            padding:0 6.8rem;
            flex-wrap: wrap;

        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }
    @media screen and (min-width:800px){
        .wrapper-properties{
            flex-direction: row;
            justify-content: space-between;
            padding:0 8.2rem;
            flex-wrap: wrap;

        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }
    @media screen and (min-width:860px){
        .wrapper-properties{
            flex-direction: row;
            justify-content: space-between;
            padding:0 9.4rem;
            flex-wrap: wrap;

        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }
    @media screen and (min-width:920px){
        .wrapper-properties{
            flex-direction: row;
            justify-content: start;
            padding:0 3.5rem;
            flex-wrap: wrap;

        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }
    @media screen and (min-width:1000px){
        .wrapper-properties{
            flex-direction: row;
            justify-content: start;
            padding:0 2rem;
            flex-wrap: wrap;

        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }

    @media screen and (min-width:1200px){
        padding:0 4rem;
    }
    @media screen and (min-width:1350px){
        padding:0 9rem;
    }
    @media screen and (min-width:1450px){
        padding:0 13rem;
    }
   
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
        margin-top:20px;
      

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


    