import styled from "styled-components";


export const PortalsBackground = styled.div`
width: 100vw;  
background-color: ${({theme}) => theme.colors.backgroundLight};
display: flex;  
flex-direction: column;
justify-content: center;
align-items: center;
padding-bottom: 40px;

`

export const PortalsContainer = styled.div<{status:boolean}>`
width: 90%;   
display: flex;  
flex-direction: column;
justify-content: center;
align-items: center;
padding-right: 1rem;
padding-left: 1rem;

.title-steps{
    width:100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding:0 10px;
    margin-top: 30px;
  
    
   h2{
    color: #5d5d5d;
    font-weight: 400 !important;
    font-family:"Poppins",sans-serif;
    font-size:17px;
    color:#5d5d5d;
    margin-bottom:0;
    margin-left:7px;
   }
   .icon-title-steps{
    color: #6475fd;
    font-size:19px;
   }

}
   .img-name-wrapper{
     display: flex;
     align-items: center;
     width:45%;
    
   }
    .img-wrapper-portal{
    width:60px;
    height:100%;
   }
    .img-wrapper-portal img{
     width:100%;
     height:100%;
     object-fit: contain;
   }

     .title-portal{
     width:45%;
     font-size:14px;
     }

.title-announced{
 font-size:14px;
   width:30%;
   text-align:left;
}
.title-status{
font-size:14px;
  width:20%;
   text-align:left;

}
    .steps-wrapper{
            width:100%;
            margin-top:20px;

            .bar-top-ul{
                width:100%;
                 background:#f6f8fa;
                border: 1px solid #e6e9ed;
                display: flex;
                justify-content:space-between;
                padding:5px 10px;
            }

            .bar-top-ul span{
                color:#1f2328;
            }

            ul{
            width:100%;
            margin-top:20px;
            padding-left:0;

            li{
            margin-top:15px;
            background: #fff;
            border:1px solid #e6e9ed;          
            width:100%;
            height:60px;
            max-height:60px;
            position: relative;
            padding:5px 5px;
       
               display: flex;               
               align-items:center;
               justify-content: space-between;
                    
        
            }
            
            li::before{ 
                content:" ";
                width:3px;
                height:100%;
                background:#335aff80;
                position: absolute;
                left:0;
                top:0;
            }
               
                .portal-name{
                font-size:12px;
                text-transform:uppercase;
                }
                .link-detail{
                width:5%;
                }  
                .icon-link-detail{
                color:  gray;
             
                }
         
            }        
        }

            .announced{
                width:15%;
                
            }

            .status-value{
             text-align:center;
             margin-left:20px;
             font-size:14px !important; 
             text-transform: none !important;
             color: gray;
          
             padding:4px 7px;
             position: relative;
             width:15%;
            }

             .status-value::before{
             content:" ";
             width:10px;
             height:10px;
             background:${({status}) => (status===true ? '#00dd006b' : '#ff460082')};
             border-radius:50%;
             position: absolute;
             top:0;
             right:30%;
             }




 @media screen and (min-width:1000px){
    width: 80%;   
    display: flex;  
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-right: 1rem;
    padding-left: 1rem;

.title-steps{
    width:100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding:0 10px;
    margin-top: 40px;
  
    
   h2{
    color: #5d5d5d;
    font-weight: 400 !important;
    font-family:"Poppins",sans-serif;
    font-size:17px;
    color:#5d5d5d;
    margin-bottom:0;
    margin-left:7px;
   }
   .icon-title-steps{
    color: #6475fd;
    font-size:19px;
   }

    .button-add-step{
        padding:6px 8px;
        text-align: center;
        background: rgba(191,235,214,0.5);
        color: green;
        font-family:'Nunito Sans', sans-serif;
        font-weight:600;
        border:none;
        margin-left:30px;
       
        display:flex:
        align-itens: center;
       
        border-radius: 3px;

        .icon-add-step{
            font-family:'Nunito Sans', sans-serif;
            font-size:20px;

        }
     }
}

    

        .steps-wrapper{

          .bar-top-ul{
                width:100%;
                 background:#f6f8fa;
                border: 1px solid #e6e9ed;
                display: flex;
                justify-content:space-between;
                padding:10px;
            }
            width:100%;

            >ul{
            width:100%;
            margin-top:20px;
            >li{
            margin-top:15px;
            background: #fff;
            border:1px solid #e6e9ed;
            text-align: left;
            width:100%;
            position: relative;
            padding:10px 10px;
       
               display: flex;               
               align-items:center;
        
            }
            
            >li::before{         
                content:" ";
                width:3px;
                height:100%;
                background:#335aff80;
                position: absolute;
                left:0;
                top:0;
            }
            span{
                font-size:16px;
                text-transform: uppercase;
            }
                p{
                    margin-bottom:0;
                    margin-left:10%;
                    color:#001fa0d9;
                             
                }
             .icon-trash{
              margin-right:4px;
                font-size: 15px;
            }
            }
        
            }



}

         

`