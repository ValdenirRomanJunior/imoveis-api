import styled from "styled-components";


export const OportunidadesBackground = styled.div`
width: 100%;   
background-color: ${({theme}) => theme.colors.backgroundLight};

@media screen and (min-width: 1000px){

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

`

export const OportunidadesContainer = styled.div`
width:100vw;   
display: flex;  
flex-direction: column;
background-color: ${({theme}) => theme.colors.backgroundLight};
padding: 1.5rem 1rem;

.title-leads{

    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding:3px 10px;
    margin-top: 8px;

    position: relative;
    border-bottom: 1px solid #e6e9ed;

    display: flex;
    align-items: center;
  
    
   h2{
    color: #5d5d5d;
    font-weight: 400 !important;
    font-family:"Poppins",sans-serif;
    font-size:15px;
    color:#5d5d5d;
    margin-bottom:0;
    margin-left:7px;
   }
   .icon-title-lead{
    color: #6475fd;
    font-size:19px;
   }

    .button-add-lead{
        padding:6px 6px;
        text-align: center;
        background: rgba(191,235,214,0.5);
        color: green;
        font-family:'Nunito Sans', sans-serif;
        font-weight:600;
        border:none;
        margin-left:30px;
        font-size:10px;
       
        display:flex:
        align-itens: center;
       
        border-radius: 3px;

        .icon-add-lead{
            font-family:'Nunito Sans', sans-serif;
            font-size:17px;

        }
        }

        .button-add-etapa{
             
        background: #49599f;
        padding: 2px 7px;
        color: #fff;
        border-radius: 3px;
        font-size: 14px;
        border:none;
        -webkit-box-shadow: 6px 10px 4px -10px rgba(138, 138, 138, 0.63);
        -moz-box-shadow: 6px 10px 4px -10px rgba(138, 138, 138, 0.63);
        box-shadow: 6px 10px 4px -10px rgba(138, 138, 138, 0.63);
        position: absolute;
        top:50%;
        right:0;
        
        }
  
       .etapa-config-wrapper{
      position: relative;
      margin-left:20px;
       
    }
    .etapa-text{
    font-size:13px;
    margin-left:3px;
    }
        .icon-step-config{
        color:gray;
        font-size: 20px;
        -webkit-box-shadow: 6px 10px 4px -10px rgba(138, 138, 138, 0.63);
        -moz-box-shadow: 6px 10px 4px -10px rgba(138, 138, 138, 0.63);
        box-shadow: 6px 10px 4px -10px rgba(138, 138, 138, 0.63);

        }
     
}


.input-property-wrapper-cod input{
 height: 90px;
  
}

@media screen and (min-width: 1000px){
    width:88%;

   .title-leads{

    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding:3px 30px;
    margin-top: 8px;

    position: relative;
    border-bottom: 1px solid #e6e9ed;

    display: flex;
    align-items: center;
  
    
   h2{
    color: #5d5d5d;
    font-weight: 400 !important;
    font-family:"Poppins",sans-serif;
    font-size:15px;
    color:#5d5d5d;
    margin-bottom:0;
    margin-left:7px;
   }
   .icon-title-lead{
    color: #6475fd;
    font-size:19px;
   }

    .button-add-lead{
        padding:6px 6px;
        text-align: center;
        background: rgba(191,235,214,0.5);
        color: green;
        font-family:'Nunito Sans', sans-serif;
        font-weight:600;
        border:none;
        margin-left:30px;
        font-size:10px;
       
        display:flex:
        align-itens: center;
       
        border-radius: 3px;

        .icon-add-lead{
            font-family:'Nunito Sans', sans-serif;
            font-size:17px;

        }
        }

        .button-add-etapa{
             
        background: #49599f;
        padding: 2px 7px;
        color: #fff;
        border-radius: 3px;
        font-size: 14px;
        border:none;
        -webkit-box-shadow: 6px 10px 4px -10px rgba(138, 138, 138, 0.63);
        -moz-box-shadow: 6px 10px 4px -10px rgba(138, 138, 138, 0.63);
        box-shadow: 6px 10px 4px -10px rgba(138, 138, 138, 0.63);
        position: absolute;
        top:50%;
        right:0;
        
        }
  
       .etapa-config-wrapper{
      position: relative;
      margin-left:20px;
       
    }
    .etapa-text{
    font-size:13px;
    margin-left:3px;
    }
        .icon-step-config{
        color:gray;
        font-size: 20px;
        -webkit-box-shadow: 6px 10px 4px -10px rgba(138, 138, 138, 0.63);
        -moz-box-shadow: 6px 10px 4px -10px rgba(138, 138, 138, 0.63);
        box-shadow: 6px 10px 4px -10px rgba(138, 138, 138, 0.63);

        }
     
}


.input-property-wrapper-cod input{
 height: 90px;
  
}


}


`
