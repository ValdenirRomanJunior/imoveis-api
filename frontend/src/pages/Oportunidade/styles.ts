import styled from "styled-components";


export const OportunidadeBackground = styled.div`
width: 100vw;  
background-color: ${({theme}) => theme.colors.backgroundLight};
display: flex;  
flex-direction: column;
justify-content: center;
align-items: center;
padding-bottom: 40px;

.deleteOpportunityWrapper{
  width:100%;
  margin-top:5px;
}

.deleteOpportunity{
  font-family: "Open Sans", sans-serif;
  width:50px;

  margin-left:10px;
  margin-top:5px;
  cursor: pointer;
    border:1px solid #49599f;
    border-radius:5px;
    font-size:13px;
    padding:3px 7px;
    font-weight: 600;
}



@media screen and (min-width: 825px){

.deleteOpportunity{
  margin-left:100px;
  margin-top:5px;
}
}

@media screen and (min-width: 1000px){

}


`     

export const OportunidadeContainer = styled.div`
     width:95%;

     display: flex;
     flex-direction: row-reverse;

      @media screen and (min-width: 825px){
        width:88%;
       flex-direction: column;

}
    
`

export const EtapasContainer = styled.div`
    width:25%;
    background: #fff;
    border:1px solid #e6e9ed;

    margin-top:10px;

    >ul{  
    display: flex;
    flex-direction: column;
    min-height: 70px;
        padding-left:0;

     

    .etapa-wrapper{
        width:100%;
       
        max-width:110px;
       
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top:10px;

        span{
          font-size: 8.5px;
          margin-top:10px;
        }
    
    }
        > * {
      &:first-child ::before {
        content: none;     
}
  } 
   
    }

    >ul li{
    width:35px;
    height:35px;
    
    border-radius:50%;
    font-size:10px;
    background: #54a2dd54;
    position relative;
    
    ::before {
    content: " ";
    width: 2px;
    height:15px; 
    background: gray;
    position: absolute;
    top:95%;
    right:50%;
    }

    ::after {
    content: " ";
    width: 25px;
    height:25px;
    border-radius:50%;
    border: 1px solid gray;
    background: trasparent;
    position: absolute;
    transform:translate(-50%,-50%);
    top:50%;
    left:50%;
    opacity:40%;
    }
  }
 
 .subtitle-opportunity{
     font-size: 12px !important;
     border-bottom:1px solid #e6e9ed;
     font-size: 18px;
    font-weight: 700;
    padding: 7px;
    background: #fff;
    color: rgb(12, 58, 103);

    display:flex;
    align-items:center;

   .icon-property-opportunity{
    margin-right:7px;
    font-size:19px;
   }
    }

@media screen and (min-width: 825px){
 width:100%;
    background: #fff;
    border:1px solid #e6e9ed;
   flex-direction: row;
    margin-top:20px;

    >ul{
    display: flex;
     min-height: 70px;
     flex-direction: row;

    .etapa-wrapper{
        width:110px;
       
        max-width:110px;
       
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top:10px;

        span{
          font-size: 8px;
          margin-top:0;
        }
    
    }
        > * {
      &:first-child ::before {
        content: none;     
}
  } 
   
    }

    >ul li{
    width:35px;
    height:35px;
    
    border-radius:50%;
    font-size:10px;
    background: #54a2dd54;
    position relative;
    
    ::before {
    content: " ";
    width: 25px;
    height:2px; 
    background: gray;
    position: absolute;
    top:50%;
    left:-118%;
    }

    ::after {
    content: " ";
    width: 25px;
    height:25px;
    border-radius:50%;
    border: 1px solid gray;
    background: trasparent;
    position: absolute;
    transform:translate(-50%,-50%);
    top:50%;
    left:50%;
    opacity:40%;
    }
  }
 
 .subtitle-opportunity{
     font-size: 15px !important;
     border-bottom:1px solid #e6e9ed;
     font-size: 18px;
    font-weight: 700;
    padding: 7px;
    background: #fff;
    color: rgb(12, 58, 103);

    display:flex;
    align-items:center;

   .icon-property-opportunity{
    margin-right:7px;
    font-size:19px;
   }
    }
}
@media screen and (min-width: 1000px){

    width:100%;
    background: #fff;
    border:1px solid #e6e9ed;

    margin-top:20px;

    >ul{
    display: flex;
     min-height: 70px;
     

    .etapa-wrapper{
        width:110px;
       
        max-width:110px;
        margin-left:20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top:10px;

        span{
          font-size: 10px;
        }
    
    }
        > * {
      &:first-child ::before {
        content: none;     
}
  } 
   
    }

    >ul li{
    width:50px;
    height:50px;
    
    border-radius:50%;
    font-size:10px;
    background: #54a2dd54;
    position relative;
    
    ::before {
    content: " ";
    width: 60px;
    height:2px; 
    background: gray;
    position: absolute;
    top:50%;
    left:-118%;
    }

    ::after {
    content: " ";
    width: 30px;
    height:30px;
    border-radius:50%;
    border: 1px solid gray;
    background: trasparent;
    position: absolute;
    transform:translate(-50%,-50%);
    top:50%;
    left:50%;
    opacity:40%;
    }
  }
 
 .subtitle-opportunity{
     font-size: 15px !important;
     border-bottom:1px solid #e6e9ed;
     font-size: 18px;
    font-weight: 700;
    padding: 7px;
    background: #fff;
    color: rgb(12, 58, 103);

    display:flex;
    align-items:center;

   .icon-property-opportunity{
    margin-right:7px;
    font-size:19px;
   }
    }
}

@media screen and (min-width: 1240px){


    width:100%;
    background: #fff;
    border:1px solid #e6e9ed;

    margin-top:20px;

    >ul{
    display: flex;
     min-height: 70px;
     

    .etapa-wrapper{
        width:110px;
       
        max-width:110px;
        margin-left:20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top:10px;

        span{
          font-size: 14px;
        }
    
    }
        > * {
      &:first-child ::before {
        content: none;     
}
  } 
   
    }

    >ul li{
    width:50px;
    height:50px;
    
    border-radius:50%;
    font-size:10px;
    background: #54a2dd54;
    position relative;
    
    ::before {
    content: " ";
    width: 60px;
    height:2px; 
    background: gray;
    position: absolute;
    top:50%;
    left:-118%;
    }

    ::after {
    content: " ";
    width: 35px;
    height:35px;
    border-radius:50%;
    border: 1px solid gray;
    background: trasparent;
    position: absolute;
    transform:translate(-50%,-50%);
    top:50%;
    left:50%;
    opacity:40%;
    }
  }
 
 .subtitle-opportunity{
     font-size: 15px !important;
     border-bottom:1px solid #e6e9ed;
     font-size: 18px;
    font-weight: 700;
    padding: 7px;
    background: #fff;
    color: rgb(12, 58, 103);

    display:flex;
    align-items:center;

   .icon-property-opportunity{
    margin-right:7px;
    font-size:19px;
   }
    }
   }
`
export const UserPropertyWrapper= styled.div`
    width:100%;
    margin-top: 10px;
    flex-direction: column;
    display: flex; 
    justify-content: space-between;

    @media screen and (min-width: 825px){
       width:100%;
     margin-top: 20px;
     flex-direction: row;

    justify-content: space-between;
    
`
export const MessagePropertyContainer = styled.div`
    width:97%;

    @media screen and (min-width: 825px){
      width:69%;
}

 

`
export const UserInfoContainer = styled.div<{copy:boolean}>`
    width:97%;
    border:1px solid #e6e9ed;
    background: #fff;
    border-radius:10px;
    font-family: "Open Sans", sans-serif;
    padding:10px;
    margin-top:20px;

.subtitle-info-lead-wrapper{
     display: flex;
     justify-content: space-between;
     align-items: center;
       padding:7px;
     background:#fff;
     color:rgb(12, 58, 103);
     border-radius-bottom: 0 0 25px 25px;
     border-bottom:1px solid #e6e9ed;
}
     .subtitle-info-lead-wrapper p{
     font-size: 13px;
     color: blue;
     margin-bottom:0;
     }
    h2{
     font-size:15px;
     font-weight:700;
     

     display: flex;
     align-items: center;
    }
     .icon-item-info-oportunity{
        color:rgb(12, 58, 103);
     }
     .info-item-wrapper{
        margin-bottom:.5rem;
     }

     h3{
     font-size:14px;
     margin-bottom:0;
     margin-top: 10px;
     }
     span{
   
     font-size:.8rem;
     color:gray;

     }
     .whats-checkbox-wrapper{
      display: flex;
     }
      .checkbox-wrapper{
      display: flex;
      align-items: center;
      margin-left:10px;
      }

    .info-item-wrapper-whats{
     background:#00d70021;
     border-radius:10px;
     width:100px;
     height:40px;
     padding:3px;
     display: flex;
     align-items: center;
     justify-content: center;

    }
     .info-item-wrapper-whats span{
     color: green !important;
     font-weight:600;
     }


       .button-wrapper{
      position: relative;
      cursor:pointer;
      display: flex;
      align-items: center;
      margin-left:10px;
      font-size:15px;

}
    .icon-copy{
        color:#52b0de;
        font-size:20px;
    }

     .button-wrapper::before{
    position: absolute;
    top:-55px;
    left:26%;
    transform: translate(-50%,-50%);
    content: "copiado";

    background-color: gray;
    display: flex;
    color:#fff;
    font-size:12px;
    padding:5px 15px;
    -webkit-box-shadow: 0px 0px 13px -5px rgba(214,214,214,1);
    -moz-box-shadow: 0px 0px 13px -5px rgba(214,214,214,1);
    box-shadow: 0px 0px 13px -5px rgba(214,214,214,1);
    text-align: center;
    display:${({copy}) => copy === true ?  'block' : 'none'};
    font-weight: bold;
    transition: transform .3s;
    animation: copys 4s ease-in-out;
    transform: translateY(0) scale(0);
    opacity:0;
    font-weight:400;

}

  @keyframes copys {
    
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

     @media screen and (min-width: 825px){

    width:29%;
    border:1px solid #e6e9ed;
    background: #fff;
    border-radius:10px;
    font-family: "Open Sans", sans-serif;
    padding:10px;
    margin-top:0;

    h2{
     font-size:17px;
     font-weight:700;
    

     display: flex;
     align-items: center;
    }
     .icon-item-info-oportunity{
        color:rgb(12, 58, 103);
     }
     .info-item-wrapper{
        margin-bottom:.5rem;
     }

     h3{
     font-size:16px;
     margin-bottom:0;
     margin-top: 10px;
     }
     span{
     font-size:.9rem;
     color:gray;
    
     }
}

`
export const PropertyItemOportunityContainer = styled.div`
    width:100%;
    min-height:90px;
    border:1px solid #e6e9ed;
    background:#fff;

    .subtitle-opportunity{
     font-size: 14px !important;
     border-bottom:1px solid #e6e9ed;
     font-size: 18px;
    font-weight: 700;
    padding: 7px;
    background: #fff;
    color: rgb(12, 58, 103);

    display:flex;
    align-items:center;

   .icon-property-opportunity{
    margin-right:5px;
    font-size:19px;
   }
    }

  .link-detail-property-lead-opp{
    padding:10px;
    width: 100%;
    display: flex;
  }
  
  .property-wrapper-opportunity{
    display: flex;
    align-items: center;
  }

    .image-property-lead-wrapper-opp{
      width:70px;
      width:70px;
    }

    .image-property-lead-wrapper-opp img{
      width: 100%;
      height:100%;
    
    }
      .data-property-opportunity-wrapper{
        display: flex;
        flex-direction: column;
      }

      .data-property-opportunity-wrapper span{
      width:170px;
      font-size:11px;
         overflow: hidden;
      text-overflow: ellipsis;
     white-space: nowrap;
      }

   @media screen and (min-width: 825px){
    width:100%;
    min-height:90px;
    border:1px solid #e6e9ed;
    background:#fff;

    .subtitle-opportunity{
     font-size: 15px !important;
     border-bottom:1px solid #e6e9ed;
     font-size: 18px;
    font-weight: 700;
    padding: 7px;
    background: #fff;
    color: rgb(12, 58, 103);

    display:flex;
    align-items:center;

   .icon-property-opportunity{
    margin-right:5px;
    font-size:19px;
   }
    }

  .link-detail-property-lead-opp{
    padding:10px;
    width: 100%;
    display: flex;
  }
  
  .property-wrapper-opportunity{
    display: flex;
    align-items: center;
  }

    .image-property-lead-wrapper-opp{
      width:70px;
      width:70px;
    }

    .image-property-lead-wrapper-opp img{
      width: 100%;
      height:100%;
    
    }
       .data-property-opportunity-wrapper span{
   
      font-size:13px;
   
      }
}
`