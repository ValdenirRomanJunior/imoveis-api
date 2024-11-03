import styled from "styled-components";
import imageTopBanner from '../../assets/images/banner-top.png';


export const PropertiesBackground = styled.div`
width: 100%;   
display: flex;  
flex-direction: column;
justify-content: center;
background-color: ${({theme}) => theme.colors.backgroundLight};


@media screen and (min-width:100px){
    align-items: center;
}
`

export const BodyPropertiesContainer = styled.main`      
    width:100%;
    display:flex;
    flex-direction: column;

    padding: 5px 0 30px 0;

    .main-container{
    display:flex;
    justify-content: space-between;
    flex-direction:column;
    padding:25px 10px;
  
    }
    .container-info{
     width: 100%;
    }
    .info{
        width:100%;
        border: 1px solid #e6e9ed;
        padding:10px 15px;
        border-radius:5px;
        margin-top:5px;
       
    }
      .bar-info{
         width:100%;
         background:#f6f8fa;
         font-size:14px;
         font-weight:500;
         color:#414141;
         border-top-radius-left:5px;
          border-top-radius-right:5px;
          padding:6px 3px;

          display: flex;
          align-items: center;
    }

    .info h5{
    margin-bottom:0;
     font-size: 14px;
     font-weight:600;
     font-family: "Poppins", sans-serif;
     color:#434343;
     font-weight:500;
     margin-top:10px;
}
     .info span{
           font-size: 13px;
           font-family: "Open Sans", sans-serif;
           color:gray;
        }

    .info .copy-link{
        background:#002fff30;
        color:#49599f;
        padding:3px 6px;
        border-radius: 20px;
        font-size:12px;
   
    }
   
    .img-wrapper{
        width:50px;
        height:50px;
    }
        .img-wrapper img{
        width:100%;
        height:100%;
    }


    .property-group{
        width:100%;
           
        border: 1px solid #e6e9ed;
        padding:5px 10px;
        display: flex;
        align-items: left;
        flex-direction: column;

    }
        .container-properties{
           margin-top:20px;
     }
        .properties{
        width:100%;
        border: 1px solid #e6e9ed;
        padding:10px 10px;
        border-radius:5px;
        margin-top:5px;
        
    
    }
     .bar-properties{
         width:100%;
         background:#f6f8fa;
         font-size:14px;
         font-weight:500;
         color:#414141;
          border-top-radius-left:5px;
          border-top-radius-right:5px;
          padding:3px;
            display: flex;
          align-items: center;
          justify-content: space-between;
    }
          .title-icon-wrapper{
          display: flex;
          align-items:center;
          }
          .icon-property-bar{
           margin-right:2px;
          }
           .select-button-wrapper{
           display: flex;
           justify-content: space-between;
           width:60%;
           }

           .select-button-wrapper button{
            background: #49599f;
            border:1px solid #002fff30;
            color:#fff;
            padding:3px 8px;
            border-radius:5px;
            font-size:13px;

           }
           
        .property-wrapper{
            width: 100%;
            display: flex;
            align-items: center;
        }

        .checkbox-property-wrapper-all{
        display: flex;
        align-items: center;
        width: 100%;
        }
        .checkbox-property-wrapper-all input{
        flex: none;
        margin-right:7px;
    
        }
        .checkbox-property-wrapper-all span{

        }

     
        .checkProperty{         
           width:30px; 
           overflow: visible;   
        }

        .img-data-principal-wrapper{
            width:55%;
            display: flex;
            align-items: center;

           }
            .data-property-info-data-left-item{
           
            }
            .property-data-left{
                width:100%;
            }

        .img-wrapper-property{
            min-width:60px;
            min-height:60px;
            width:60px;
            height:60px;
        }

       .img-wrapper-property img{
            width:100%;
            height:100%;
        }
        .data-property-info-left{
        display:flex;
        flex-direction: column;
        text-overflow: ellipsis;
        overflow: hidden;
        line-break: anywhere;
        white-space: nowrap;
        }
        .property-data-info-left-item{
            text-overflow: ellipsis;
            overflow: hidden;
            line-break: anywhere;
            white-space: nowrap;
            font-size: 14px;
        }
        .property-data-right-wrapper{
         display: flex;
         width: 45%;
         justify-content: space-around;
        
        }
        .data-property-info-right{
           
            display: flex;
            justify-content:space-around;
            flex-direction: column;

        }
       .property-data-info-right-item{
            color:gray;
            font-size:13px;

         }

        .icon-arrow-detail{
            background:#f6f8fa;
            color:#000;
            padding:5px;
            font-size:30px;
            border-radius:50%;

        }
        .icon-data-property{
            font-size:13px;
      
        }

    @media screen and (min-width: 900px){
          .main-container{
            padding: 20px 70px 10px 100px;
           display:flex;
          flex-direction:row;
       
    }
           .container-properties{
           margin-top:0;
             width: 69%;
     }
        .properties{
         width:100%;
        border: 1px solid #e6e9ed;
        padding:10px 10px;
        border-radius:5px;
       
    
    }      
      .container-info{
      width: 29%;
    }

    .info{
         width:100%;
           border: 1px solid #e6e9ed;
           padding:20px 15px;
           border-radius:5px;  
    }
    .img-wrapper{
        width:70px;
        height:70px;
    }
           .img-wrapper img{
        width:100%;
        height:100%;
    }

    .info h5{
    margin-bottom:0;
     font-size: 17px;
     font-weight:600;
     font-family: "Poppins", sans-serif;
     color:#434343;
     font-weight:500;
     margin-top:10px;
}
     .info span{
           font-size: 14px;
           font-family: "Open Sans", sans-serif;
           color:gray;
        }
    .info .copy-link{
        background:#002fff30;
        color:#49599f;
        padding:3px 6px;
        border-radius: 20px;
        font-size:12px;
   
    }

    .property-group{
        width:100%;
     
        border: 1px solid #e6e9ed;
        padding:5px 10px;
        display: flex;
        align-items: left;
        flex-direction: column;

    }
        .property-wrapper{
            width: 100%;
            display: flex;
            align-items: center;
        }

        .checkProperty{         
           width:30px;    
        }

        .img-data-principal-wrapper{
            width:55%;
            display: flex;
            align-items: center;

           }
            .data-property-info-data-left-item{
           
            }
            .property-data-left{
                width:100%;
            }

        .img-wrapper-property{
            min-width:60px;
            min-height:60px;
            width:60px;
            height:60px;
        }

       .img-wrapper-property img{
            width:100%;
            height:100%;
        }
        .data-property-info-left{
        display:flex;
        flex-direction: column;
        text-overflow: ellipsis;
        overflow: hidden;
        line-break: anywhere;
        white-space: nowrap;
        }
        .property-data-info-left-item{
            text-overflow: ellipsis;
            overflow: hidden;
            line-break: anywhere;
            white-space: nowrap;
            font-size: 14px;
        }
        .property-data-right-wrapper{
         display: flex;
         width: 45%;
         justify-content: space-around;
        
        }
        .data-property-info-right{
           
            display: flex;
            justify-content:space-around;
            flex-direction: column;

        }
       .property-data-info-right-item{
            color:gray;

         }

        .icon-arrow-detail{
            background:#f6f8fa;
            color:#000;
            padding:5px;
            font-size:30px;
            border-radius:50%;

        }
    }
  
    `

    
export const TitleWrapper = styled.div`
   
    width:100%;

    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    padding: 10px 10px;
    border-bottom: 1px solid #e6e9ed;
    
    .title-properties{
        text-align: left;
            
        font-family: "Poppins", sans-serif;
        font-size: 12px;
        color: #5d5d5d;
        font-weight: 400;
        margin-bottom: 0;
        margin-left:5px;
        
    }
.button-wrapper{
        display: flex;
}

  .button-add-lead{
        margin-top: 10px;
        width:130px;
       padding:5px;
        margin-bottom:0;
        font-size: 13px;
        border-radius:3px;
        background: #f6f8fa;
        border: 1px solid #d1d9e0;
        position: relative;
        color: #000;

        display: flex;
        align-items: center;
        justify-content: center;

    
    }
     .button-config{
        margin-top: 10px;
        width:60px;
        padding:5px;
        margin-bottom:0;
        font-size: 17px;
        border-radius:3px;
        background: #f6f8fa;
        border: 1px solid #d1d9e0;
        position: relative;
        color: #000;
        margin-left:10px;

        display: flex;
        align-items: center;
        justify-content: center;

     }
     .icon-config{
        font-size:
        }



    @media screen and (min-width: 1000px){
   
        padding: 10px 70px 10px 100px;

        .title-properties{

           
        }


        .button-add-lead{
 
    
        
    }
   
}

@media screen and (min-width: 1200px){
  

    .title-properties{

    }


    .button-add-lead{
  
    
    
}

}

@media screen and (min-width: 1350px){
   
    .title-properties{
     
    }

    .button-add-lead{
 
    }

}

@media screen and (min-width: 1450px){

    .title-properties{
 
    }

    .button-add-lead{
  
   
}

}


`
