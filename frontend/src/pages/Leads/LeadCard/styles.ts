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


    .data-lead-left-wrapper{
        width: 50%;
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
            width:100%
            overflow: hidden;
            text-overflow: ellipsis;
             white-space: nowrap;

           
                     
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
 
    .link-detail-property-lead{
        border-top: .5px solid #ebebeb;
    }

    .lead-oportunity-wrapper{
        width:50%;
        min-width:50%;
        display: flex;

        justify-content:start;
        padding: 0 10px;
    }
         .lead-oportunity-wrapper .span-status{
        font-size: 10px;
        position: absolute;
        right:10%;
    }
      
    .lead-oportunity-wrapper .icon-funil{
        z-index: 1;
        margin-left:20px;
        
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
    
    
        .link-detail-property-lead{
            border-top: .5px solid #ebebeb;
        }
    }


`


export const LeadItemContainer = styled.div`
    width: 100%;
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