import styled, { css } from "styled-components";




export const OportunidadeContainer = styled.div`


.leadWrapper{
    width: 100%;
    
    flex-direction:column;
    justify-content: space-between;
    height: 83px;
  
    background-color: ${({theme}) => theme.colors.background};
    margin-top: 10px;
    border-bottom: 1px solid rgb(222,222,222);
    padding:0 5px;
    font-family:'Nunito Sans', sans-serif;
    position: relative;
    

    .link-item-lead{
     width:80%;
    
    }
     
    
    .list-steps-change{
      background: #fff;
      position: absolute;
      top:-65%;
      right:0;
      padding-left:0;
      border-radius:3px;
      padding: 8px 6px;
      border:1px solid rgb(222,222,222);
        z-index: 1;
     display: block;
      width: 170px;
      max-height: 375px;
     overflow-y: scroll;
     scroll-behavior: smooth;
     touch-action: auto;

    } 
     .list-steps-change::-webkit-scrollbar {
      display: none;
    }


     .list-steps-change::-webkit-scrollbar {

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
     .icon-opportunity-op{
        cursor: pointer;
     }
     .list-steps-change h5{
           font-family: "Open Sans", sans-serif;
           font-size:15px;
           background:blue;
           background:#e1e1e187;
            padding: 7px 5px;
            text-align: center;
     }
  .list-steps-change li{
        width:100%;
        border:1px solid rgb(222,222,222);
        padding: 5px 5px;
           border-radius:3px;
           background: #ffd6ad3b;
            margin-top: 7px;
        font-family: "Open Sans", sans-serif;
        color:gray;
         cursor:pointer;
       
       
     }
        .icon-step-move{
        position: absolute;
        top:0;
        right:0;
        font-size: 24px;
        cursor:pointer;
        }
    .content-first{
        max-width:100%;
        display: flex;
        align-items: center;
        padding:8px 0;
        cursor: pointer;
            
    }


    .data-lead-left-wrapper{
        width: 100%;
        position: relative;
        display: flex;
        align-items: start;
        flex-direction: column;
        margin-left:8px;
        justify-content: space-between;
      
     

        h4{    
            font-size: .7rem;
            margin-bottom:0;
            line-break: anywhere;
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow:hidden;               
        }

        h4:first-letter{
        text-transform: capitalize;

        }

        span{
            color: gray;
            font-size: .7rem;
            
           line-break: anywhere;
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis;
             white-space: nowrap;
            overflow:hidden;
            
        }
        .email-icon{
            margin-right:3px;
            font-size:12px;
            

        }
       
        .phone-date-wrapper-lead{
            width:100%;
          

            display: flex;
            flex-direction: column;
            align-items: left;
            
        }
        .phone-leads{
          
            font-size: .7rem;
            margin-bottom:0;
            width:auto;
          
            border-radius:2px;
            display: flex;

            align-items: center;
    
            .icon-phone-lead{
                color:#595959cc;
                margin-right:3px;
                font-size:12px;
            }    
    }

    .instant-lead{
       
        font-size: .5rem;
        margin-bottom:0;
        color:gray;
        width:90px;
    }
       
    }
 

    
    .icon-arrow-lead{
        color:#5a73e3;
    }

     
    a{
       
        width:100%;
        
        animation: openProperty 500ms ease-in-out;     
        transition: height 500ms ;
        overflow:hidden;
        height:70px;

      }


      @keyframes openProperty {
        0% {
           
            height:0;
            
                    
        }
        
        100% {
            height:70px;
            
           
                    
        }
      }

    .message-lead{

            width: 100%;
            position:relative;
         
            margin-bottom:40px;
            animation: open 500ms ease-in-out;     
            transition: height 500ms ;
            border-top: .5px solid #ebebeb;
            padding-top:10px;
            font-size:12px;
            font-family: 'Nunito Sans', sans-serif;         
            margin-top:10px;
            height:auto;
            overflow:hidden;
            color:gray;

            .icon-arrow-down-message{
                font-size:20px;
                color:#c9c9c9;
                margin-right:10px;
      
            }

               
    }

    @keyframes open {
        0% {
           
            height:0;
            
                    
        }
        
        100% {
            height:auto;
            
           
                    
        }
      }

      .icon-lead-trash{
        width:100%;
        display: flex;
        justify-content:end;

        .icon-trash{
    
            font-size: 12px;     
            animation: open 500ms ease-in-out;     
            transition: height 500ms ;
            color:#9498a8;
            background: transparent;
            border: none;
            
        }
      }
    
    .icon-opportunity-op-wrapper{
        position: absolute;
      bottom:30%;
      right:7%;
      z-index:0 !important;
        width:40px;
        height:40px;

        display: flex;
        align-items: center;
        justify-content: center;
    }
      .icon-opportunity-op{
  
      }
    
    .link-detail-property-lead{
        border-top: .5px solid #ebebeb;
    }

    .lead-oportunity-wrapper{
      
        display: flex;
        justify-content:space-around;
        padding: 0 10px;
    }
         .lead-oportunity-wrapper span{
        font-size: 10px;
    }

    @media screen and (min-width:350px){
        width: 100%;   
        display: flex; 
        flex-direction:column;
        justify-content: space-between;
        position:relative;
             
        background-color: ${({theme}) => theme.colors.background};
        margin-top: 10px;
        border: 1px solid rgb(222,222,222);
        border-radius:5px;
        padding:0 5px;
        font-family:'Nunito Sans', sans-serif;
    
        .content-first{
            max-width:100%;
            display: flex;
            align-items: center;
            padding:8px 0;
            cursor: pointer;
                
        }
    
        .data-lead-left-wrapper{
            width:100%;
         
            display: flex;
            align-items: start;
            flex-direction: column;
            margin-left:8px;
            justify-content: space-between;
          
        
            h4{    
                font-size: .8rem;
                 margin-bottom:0;
                line-break: anywhere;
                line-break: anywhere;
                width:100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow:hidden;                                    
            }
    
            h4:first-letter{
            text-transform: capitalize;
    
            }
            span{
                color: gray;
                font-size: .8rem;
              
                line-break: anywhere;
                width:100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
           
                
            }
            .email-icon{
                margin-right:3px;
                font-size:12px;
    
            }
           
    
            .phone-leads{
              
                font-size: .8rem;
                margin-bottom:0;
                width:auto;
              
                border-radius:2px;
                display: flex;
    
                align-items: center;
        
                .icon-phone-lead{
                    color:#595959cc;
                    margin-right:3px;
                    font-size:12px;
                }    
      
        }
              
        }
     
    
        
        .icon-arrow-lead{
            color:#5a73e3;
        }
    
         
        a{
         
            width:100%;
            
            animation: openProperty 500ms ease-in-out;     
            transition: height 500ms ;
            overflow:hidden;
            height:70px;
    
          }
    
    
          @keyframes openProperty {
            0% {
               
                height:0;
                                     
            }
            
            100% {
                height:70px;
                
                                     
            }
          }
    
        .message-lead{
    
                width: 100%;
                position:relative;
             
                margin-bottom:40px;
                animation: open 500ms ease-in-out;     
                transition: height 500ms ;
                border-top: .5px solid #ebebeb;
                padding-top:10px;
                font-size:12px;
                font-family: 'Nunito Sans', sans-serif;         
                margin-top:10px;
                height:auto;
                overflow:hidden;
                color:gray;
    
                .icon-arrow-down-message{
                    font-size:20px;
                    color:#c9c9c9;
                    margin-right:10px;
          
                }               
        }
    
        @keyframes open {
            0% {
               
                height:0;
                                   
            }
            
            100% {
                height:auto;
                
                                 
            }
          }
          .icon-lead-trash{
            width:100%;
            display: flex;
            justify-content:end;
    
            .icon-trash{
        
                font-size: 12px;     
                animation: open 500ms ease-in-out;     
                transition: height 500ms ;
                color:#9498a8;
                background: transparent;
                border: none;
                
            }
          }
      
        .link-detail-property-lead{
            border-top: .5px solid #ebebeb;
        }
    }

}

    height: auto;

    .lead-header-title{
        background:#fff;
        padding: 5px 12px;
        margin-top:10px;

        display: flex;
        justify-content: space-between;

    }
    .lead-header-title span{
       font-size:12px; 
    }
    .lead-header-title .span-oportunidade{
      margin-left:95px;  
    }
       .lead-header-title .span-status{
      margin-right:15px;  
    }

   .sc-ikJyIC.grQsfG.rec.rec-pagination{
    display:none;
}

    .column{
              width:100%;        
              padding:5px 7px;
              margin-top: 20px;
             -webkit-box-shadow: 0px 1px 21px -5px rgba(204,222,255,1);
             -moz-box-shadow: 0px 1px 21px -5px rgba(204,222,255,1);
              box-shadow: 0px 1px 21px -5px rgba(204,222,255,1);
              border-radius:7px;
              max-height: 75vh;
              overflow-y: scroll;    
                        
    }

      .title-column{
                font-family: 'Nunito Sans', sans-serif;     
                font-weight:600;
                text-align: center;
                font-size:12px;
                border-bottom:3px solid #c1c8ff;
                padding: 7px  0;
                color:#6e6e6e; 
                border-top-right-radius: 7px;
                margin-bottom:15px;

        }
     
 
     .sc-cxpSdN.fIwXVr.rec.rec-arrow.rec.rec-arrow-right{
     width:40px;
     height:40px;
     min-width:40px;
     line-height: 40px;
    
     }
       .sc-cxpSdN.fIwXVr.rec.rec-arrow.rec.rec-arrow-left{
     width:40px;
     height:40px;
     min-width:40px;
     line-height: 40px;
     transition:none;
    
     }
    .ehWCnd {
     width:40px;
     height:40px;
     min-width:40px;
     line-height: 40px;
     }
      
  
   
    @media screen and (min-width:1000px){
     margin-top:10px;

         .column::-webkit-scrollbar {
    display: none;
}
.column {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

}


  

`
export const ColumnsContainer = styled.div`
   

 

   
      
     @media screen and (min-width:1000px){
    
}
 @media screen and (min-width:1300px){
   



}


`

export const PropertyItemLeadContainer = styled.div<{prop:boolean}>`
      
      width:100%;
      margin-top:10px;
      padding:5px 0;
      position:relative;

      display: flex;
      align-items: center;

     



    .image-property-lead-wrapper{
        width: 50px;
        height: 50px;


        img{
            width:100%;
            height:100%;
            object-fit: contain;
            border-radius:8px;
        }

       

    }
    .data-property-lead-wrapper{
        margin-left: 20px;
        font-family:'Nunito Sans', sans-serif;
        font-size:14px;
        color:#686895;

        display: flex;
        flex-direction: column;

      
    }

  

   
`

export const MessageNoLeads = styled.div`
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

export const LeadSearchWrapper = styled.div`
    width: 100%;
    height: 35px;
    margin-top:15px;
    background:#fff;

    display: flex;
    align-items: center;

    .icon-search-leads{
        color: #88888894;
        font-size:20px;
        margin-left:5px;
    }
    input{
        width:100%;
        height:100%;
        border: none;
        padding:0 10px;

    }

    button{
        background: ${({theme}) => theme.colors.primary}; 
        border: 1px solid transparent;
        color: #fff;
        padding: 3px 12px;
        border-radius: 20px;
    }
`

export const ItemsContainer = styled.div`
width:100%;

`