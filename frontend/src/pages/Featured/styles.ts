import styled from "styled-components";


export const StepsBackground = styled.div`
width: 100vw;  
background-color: ${({theme}) => theme.colors.backgroundLight};
display: flex;  
flex-direction: column;
justify-content: center;
align-items: center;
padding-bottom: 40px;

`

export const StepsContainer = styled.div`
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
            width:100%;

            ul{
            width:100%;
            margin-top:30px;
            padding-left:0;

            li{
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
            
            li::before{         
                content:" ";
                width:3px;
                height:100%;
                background:#335aff80;
                position: absolute;
                left:0;
                top:0;
            }
                .edit-delete-wrapper{
                width:40%;
                 display: flex;               
               align-items:center;
                }
            span{
                width:60%;
                font-size:14px;
                text-transform: uppercase;
            }
                p{
                    cursor:pointer;
                    margin-bottom:0;                   
                    color:#001fa0d9;
                     font-size: 12px;

                     display: flex;
                     align-items: center;
                     margin-right:25px;
                             
                }
             .icon-trash{
              margin-right:4px;
                font-size: 12px;
                 cursor:pointer;
            }
            }
        
            }
            .edit-label{
             cursor:pointer;
             font-size:15px !important; 
             text-transform: none !important;
             color: #001fa0d9;
            }

            .input-wrapper-data{
                display: flex;
            }
                .input-class{
                    padding:10px 10px;
                }
.button-wrapper-send-data{
    display: flex;
    align-items: center;
   

}

    .button-send-data{  
        background:#49599f;
        color:#fff;
        border:none;
        border-radius: 4px;
        padding: 2px 9px;
        font-size: 13px;
        margin-left: 10px;
        position: relative;
        width:70px;
        height:22px;

            display: flex;
    align-items: center;
}
      .button-cancel-data{
       
        color:#49599f;
        border:none;
        border-radius: 4px;
        
        font-size: 13px;
        margin-left: 10px;
        position: relative;
      
        height:22px;
}

.message-digit-space{
position:absolute;
    top:-38%;
    left:0;
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

export const CardWrapper = styled.div`
width: 90%;

border-bottom: 1px solid rgb(222, 222, 222);
margin-top: 10px;
padding: 10px 0;

@media screen and (min-width: 700px){
    width:70%;
}

@media screen and (min-width: 1000px){
    width:50%;
}
`

export const CardContent = styled.div`
width: 100%;
height:100%;
padding: 0 10px 0 10px;
display: flex;
justify-content: space-around;
align-items: center;

font-family: "Poppins", sans-serif;

    
    img{
        max-width: 75px;
        width:75px;
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
        position: relative;

     .cod-property-card{
        position: absolute;
        top:-4%;
        right:5%;
        font-size:13px;
        color: gray;
     }

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
            width:150px;
            font-size: 11px;
            font-weight: 300;
            cursor: pointer;
            
            
        
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