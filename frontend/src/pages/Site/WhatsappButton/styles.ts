import styled from "styled-components"

export const WhatsappWrapper= styled.a`
       width:35px;
       height:160px;
       padding: 5px 0;

       background:rgba(191, 235, 214, 0.5);
       border: 1px solid rgba(209, 213, 219, 0.3);

       position: fixed;
       right:0;
       top:50%;

       display: flex;
       justify-content: space-around;
       align-items:center;
       flex-direction: column;


       .whatsapp-icon{
        width:20px;
        height:20px;
       }

       .whatsapp-number{
        background:#3BBA6E;
        width:20px;
        height:105px;
       
        display:inline-block;
        text-align: center;
        writing-mode: vertical-rl;
        border-radius:2px;
        font-size:11px;
      
        font-weight:300;
        
        color: #fff;
       }

       .whatsapp-text{
        display:none;
       }

       @media screen and (min-width:840px){    
       
        width:210px;
        height:45px;
        padding: 5px 0;
 
        background:rgba(191, 235, 214, 0.5);
        border: 1px solid rgba(209, 213, 219, 0.3);
 
        position: fixed;
        right:2%;
        top:unset;
        bottom:0;
 
        display: flex;
        justify-content: space-around;
        align-items:center;
        flex-direction: row;
 
 
        .whatsapp-icon{
         width:23px;
         height:23px;
        }
 
        .whatsapp-number{
         background:#3BBA6E;
         width:100px;
         height:22px;
        
         display:flex;
         align-items: center;
         justify-content: center;
         text-align: center;
         writing-mode: unset;
         border-radius:2px;
         font-size:11px;
        
         font-weight:300;      
         color: #fff;
        }

           .whatsapp-text{
            display: block;
           
            font-size:12px;
           }
       }

       @media screen and (min-width:1300px){    
       
        width:250px;
        height:55px;
        padding: 5px 3px;
 
        background:rgba(191, 235, 214, 0.5);
        border: 1px solid rgba(209, 213, 219, 0.3);
 
        position: fixed;
        right:1%;
        top:unset;
        bottom:0;
 
        display: flex;
        justify-content: space-around;
        align-items:center;
        flex-direction: row;
 
 
        .whatsapp-icon{
         width:26px;
         height:26px;
        }
 
        .whatsapp-number{
         background:#3BBA6E;
         width:107px;
         height:26px;
        
         display:flex;
         align-items: center;
         justify-content: center;
         text-align: center;
         writing-mode: unset;
         border-radius:2px;
         font-size:11px;
       
         font-weight:500;
         
         color: #fff;
        }

        .whatsapp-text{
        
            font-size:14px;
           }
           
       }

`