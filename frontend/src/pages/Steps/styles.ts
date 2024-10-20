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

            >ul{
            width:100%;
            margin-top:30px;
            padding-left:0;
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
                width:60%;
                font-size:14px;
                text-transform: uppercase;
            }
                p{
                width:40%;
                    margin-bottom:0;
                    margin-left:30%;
                    color:#001fa0d9;
                     font-size: 12px;
                             
                }
             .icon-trash{
              margin-right:4px;
                font-size: 12px;
            }
            }
        
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