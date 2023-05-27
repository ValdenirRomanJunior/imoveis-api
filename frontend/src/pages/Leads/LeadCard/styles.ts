import styled, { css } from "styled-components";


export const LeadWrapper = styled.div<{prop:boolean}>`
    width: 100%;   
    display: flex; 
    flex-direction:column;
    justify-content: space-between;
  

    
    
    
    background-color: ${({theme}) => theme.colors.background};
    margin-top: 20px;
    border-bottom: 1px solid rgb(222,222,222);
    padding:0 5px;
    font-family:'Nunito Sans', sans-serif;

    .content-first{
        max-width:100%;
        display: flex;
        align-items: center;
        padding:8px 0;
        cursor: pointer;
            
    }

    .icon-lead{
        font-size: 22px;
        color: #cacad3;
    }

    .data-lead-left-wrapper{
        width:100%;
     
        display: flex;
        align-items: start;
        flex-direction: column;
        margin-left:8px;
        justify-content: space-between;
      
      

        h4{    
            font-size: .7rem;
            margin-bottom:0;
            line-break: anywhere;
           
                     
        }

        h4:first-letter{
        text-transform: capitalize;

        }
        span{
            color: gray;
            font-size: .7rem;
            display: flex;
            align-items: center;
            
        }
        .email-icon{
            margin-right:3px;
            font-size:12px;

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
   
       
    }
 

    
    .icon-arrow-lead{
        color:#5a73e3;
    }

     
    a{
        display:${({prop}) => prop === true ?  'block' : 'none'} !important;
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
            display:${({prop}) => prop === true ?  'block' : 'none'};
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



    @media screen and (min-width:390px){
        width: 100%;   
        display: flex; 
        flex-direction:column;
        justify-content: space-between;
        position:relative;
    
        
        
        
        background-color: ${({theme}) => theme.colors.background};
        margin-top: 20px;
        border-bottom: 1px solid rgb(222,222,222);
        padding:0 5px;
        font-family:'Nunito Sans', sans-serif;
    
        .content-first{
            max-width:100%;
            display: flex;
            align-items: center;
            padding:8px 0;
            cursor: pointer;
                
        }
    
        .icon-lead{
            font-size: 22px;
            color: #cacad3;
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
               
                         
            }
    
            h4:first-letter{
            text-transform: capitalize;
    
            }
            span{
                color: gray;
                font-size: .8rem;
                display: flex;
                align-items: center;
                
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
            display:${({prop}) => prop === true ?  'block' : 'none'} !important;
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
                display:${({prop}) => prop === true ?  'block' : 'none'};
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
    
    
          .icon-trash{
            position: absolute;
            bottom:5%;
            right:0;
            margin-right:4px;
            font-size: 12px;
            display:${({prop}) => prop === true ?  'block' : 'none'};
            animation: open 500ms ease-in-out;     
            transition: height 500ms ;
            color:#9498a8;
            background: transparent;
            border: none;
            
        }
        
        .link-detail-property-lead{
            border-top: .5px solid #ebebeb;
        }
    }


`


export const LeadItemContainer = styled.div`
    width: 100%;
    height: auto;
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