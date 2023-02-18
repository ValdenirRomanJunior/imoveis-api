import styled from "styled-components";


export const LeadsBackground = styled.div`
width: 100vw;   
background-color: ${({theme}) => theme.colors.backgroundLight};

@media screen and (min-width: 1000px){
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

`

export const LeadsContainer = styled.div`
width:100vw;   
display: flex;  
flex-direction: column;
background-color: ${({theme}) => theme.colors.backgroundLight};
padding: 1.5rem 1rem;

.title-leads{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding:0 10px;
    margin-top: 40px;
  
    
   h2{
    color: #5d5d5d;
    font-weight: 400 !important;
    font-family:"Poppins",sans-serif;
    font-size:20px;
    color:#5d5d5d;
   }
   

    .button-add-lead{
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

        .icon-add-lead{
            font-family:'Nunito Sans', sans-serif;
            font-size:20px;

        }
        }
     
}



@media screen and (min-width: 1000px){
    width:50%;
    justify-content: center;




}


`
