import styled from "styled-components";


export const EditBackground = styled.div`
width: 100%;   
display: flex;  
flex-direction: column;
justify-content: center;
align-items: center;
background-color: ${({theme}) => theme.colors.backgroundLight};

@media screen and (min-width:1000px){
    align-items: center;
    width:100vw;
}
`
export const BodyEditContainer = styled.main`      
    width:100%;
    display:flex;
    flex-direction: column;
     
    padding: 50px 0 30px 0;

    .title-registration{
        text-align: center;
        font-family: "Poppins",sans-serif;
        font-size: 25px;
        color: #5d5d5d;
        font-weight: 500;
        margin-bottom: 50px;
        padding: 0 30px;
        
    }


    @media screen and (min-width: 450px){
        width:90%;
        padding: 50px 0 0 0;
    }
    @media screen and (min-width: 550px){
        width:80%;
        padding: 50px 0 0 0;
    }
    @media screen and (min-width: 700px){
        width:70%;
        padding: 50px 0 0 0;
    }


    @media screen and (min-width: 1000px){
        width:50%;
        padding: 50px 0 0 0;
    }
  
    `

    export const FormContainer = styled.div`      
    width:100%;
    display:flex;
    flex-direction: column;
   
     
    padding: 0px 20px;

    label{
        margin-bottom: 6px;
        font-weight: 500;
        color: #4a4a4a;
        font-size:16px;

    }
 
    textarea{
        height:108px;
        border-radius: 10px;
        padding: 0 20px;
        font-size: 0.75rem;
        border: 1px solid #c9c9c9;
        margin-bottom: 20px;
        
    }

    
.custom-dropdown{
      
        border: 1px solid #c9c9c9;      
        position: relative;
        color:gray;
        margin-left:8px;
        
        height:46px;
        border-radius: 10px;
        padding: 0 20px;
        font-size: 0.75rem;
        border: 1px solid #c9c9c9;
       
        display: flex;
        align-items: center;
          
        
  }
    .custom-dropdown-selection{
        background-color:#fff;
        position: relative;
        width:100%;
                    
    }
        .arrow-type{
        position: absolute;
         right:-5%;
        top:20%;
        font-size:14px;
        font-weight:700;
        }

       .custom-dropdown .items-holder{
       position:absolute;
       top:100%;
         background-color:#fff;
         width:100%;
         border: 1px solid #000;
         z-index:1;   
         max-height: 180px;
         border-radius:5px;
         padding:5px 0;
         overflow:scroll;   

    }

         .custom-dropdown .items-holder::-webkit-scrollbar {
      display: none;
    }


     .custom-dropdown .items-holder::-webkit-scrollbar {

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
  
    .custom-dropdown .items-holder .dropdown-item{
        padding: 10px 16px;
        cursor:pointer;
        color:gray;
                  
        }


        
        .custom-dropdown-feature{
      
        border: 1px solid #c9c9c9;      
        position: relative;
        color:gray;
        margin-left:8px;
        
        min-height:46px;
        height:auto;
        border-radius: 10px;
        padding: 0 20px;
        font-size: 0.75rem;
        border: 1px solid #c9c9c9;
       
        display: flex;
        align-items: center;
          
        
  }
    .custom-dropdown-selection-feature{
        background-color:#fff;
        position: relative;
        width:100%;
         min-height:46px;
        height:auto;

        display:flex;
        align-items: center;
        flex-wrap: wrap;
                    
    }
        .arrow-type-feature{
        position: absolute;
         right:-5%;
        top:20%;
        font-size:14px;
        font-weight:700;
        }

        .item-selected-dropdown-feature{
            font-size:12px;
            background:#f8f8f8;
            padding: 2px 3px;
            margin:4px;
            border-radius:2px;
            color:#4f4f4f;
            font-weight:600;
            
            
        }
       .custom-dropdown-feature .items-holder-feature{
       position:absolute;
       top:100%;
         background-color:#fff;
         width:100%;
         border: 1px solid #000;
         z-index:1;   
         max-height: 180px;
         border-radius:5px;
         padding:5px 0;
         overflow:scroll;   

    }

         .custom-dropdown-feature .items-holder-feature::-webkit-scrollbar {
         display: none;
    }


     .custom-dropdown-feature .items-holder-feature::-webkit-scrollbar {

    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    }
  
        .custom-dropdown-feature .items-holder-feature .dropdown-item-feature{
        padding: 10px 16px;
        cursor:pointer;
        color:gray;
         
          
        }
    .icon-clean-type-feature{
    font-size:16px;
    }


    .financeable-background{
        width:100%;
          border-bottom: 1px solid #c9c9c9;
           margin-bottom:10px;
    }

    .financeable-container{
        display: flex;
        width:70px;
        justify-content: space-between;
        margin-bottom:10px;
       
    }

    .financeable-wrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
        .financeable-item-label{
        font-size:13px;
        }

        .label-financeable{
        margin-top:10px;
        }

            .permuta-background{
        width:100%;
          border-bottom: 1px solid #c9c9c9;
           margin-bottom:10px;
         
    }

    .permuta-container{
        display: flex;
        width:70px;
        justify-content: space-between;
        margin-bottom:10px;
       
    }

    .permuta-wrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
        .permuta-item-label{
        font-size:13px;
        }

        .label-permuta{
        margin-top:5px;
        }
    select{
        height:46px;
        border-radius: 10px;
        padding: 0 20px;
        font-size: 0.75rem;
        border: 1px solid #c9c9c9;
        margin-bottom: 20px;
        position: relative;

        option{
            padding: 0 20px;
        }

        option:disabled{
            color:gray;
        }

    }
    legend{
        font-size: 16px;
        font-weight: 500;
        color: #4a4a4a;
       

    }
    .input-radio-wrapper{
        margin-bottom: 20px;
    }

    .number-wrapper{
        width:90px;
        position:relative;
    }

    .buttom-register-wrapper{
        margin-top: 30px;
        padding-bottom: 10px;

        .other-error-update{
            text-align:center;
            width:100%;
            color:red;
            background: #e87f7f14;

        }

        .button-send-email{
          position: relative;
          border-radius:5px;
        }
    }
    .formField__error{
        color:red;
        font-size: 12px;
        font-weight:400;
        
        position: absolute:
        top:0;
        left: 0;
        width:100%;
    }

    .message-edit{
        width:100%;
        position:relative;
        margin-top:5px;
        margin-bottom:25px;
        display: flex;
        justify-content: center;
    }

     .message-edit .success{
        font-size: 14px;
        color:green;
        position: absolute;
        animation: buttons .3s linear;
        background-color: #7fe87f29;
        padding:10px 15px;
     
        
        .new-property-link{
            margin-left:5px;
        }
       
    }

    @keyframes buttons {
        
        0%{
            transform: scale(0.1);
        }
        50%{
            transform: scale(0.5);
        }
        100%{
            transform: scale(1);
          
        }
    }

        .bairros-cadastrados-wrapper{
  
    }

    .ul-list-bairros-cadastrados{
          width:80%;
        padding-left:0;
        display: flex;
        flex-direction: column;
        overflow:scroll;
        
        max-height:150px;

      
    }
       .ul-list-bairros-cadastrados::-webkit-scrollbar {
         display: none;
    }


     .ul-list-bairros-cadastrados::-webkit-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    }

    .li-bairro-cadastrado{
        border:1px solid #c9c9c9;
         padding:7px;
        background:#f9f9f9;
    }
    @media screen and (min-width: 1000px){

        .arrow-type{
            position: absolute;
            right:-2%;
            top:20%;
            font-size:14px;
            font-weight:700;

        }
    }
  
    `