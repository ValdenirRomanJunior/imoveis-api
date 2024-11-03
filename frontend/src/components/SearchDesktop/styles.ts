import styled from "styled-components";

export const SearchContainer = styled.div`


 display:none;
 
}

@media screen and (min-width:1000px){
 
  
    display: flex;
    align-items: center;

  
`



export const SearchContent= styled.div`
    display: flex;
    justify-content: space-between;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
   
    background:#fff;
    padding:1rem;

    select{
     
        border: 1px solid #c9c9c9;      
        position: relative;
        color:gray;
        padding: 2px 18px 2px 8px;
        margin-left:8px;
        font-size:12px;
        width:120px;
        overflow:hidden;
    }
  

    option{
       border-radius:0;
       font-size:10px !important;
        color:gray;
    }

    option:disabled{
        color:#c6c6c6;
    }

  
    .select-half{
       
    }

    @media screen and (min-width: 1200px){
        select{
     
            border: 1px solid #c9c9c9;      
            position: relative;
            color:gray;
            padding: 2px 18px 2px 8px;
            margin-left:8px;
            font-size:13px;
            width:130px;
            overflow:hidden;
        }

    }

    @media screen and (min-width: 1450px){
        select{
     
            border: 1px solid #c9c9c9;      
            position: relative;
            color:gray;
            padding: 2px 18px 2px 8px;
            margin-left:8px;
            font-size:13px;
            width:150px;
            overflow:hidden;
        }

        option{
            border-radius:0;
            font-size:12px !important;
             color:gray;
         }

    }

`

export const SearchButtonContainer= styled.div`
  
   margin-left:10px;

    button{
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 13px;
        padding: .13813rem 1rem;
        background: ${({theme}) => theme.colors.primary} !important; 
     
        border: 1px solid  ${({theme}) => theme.colors.primary}; 
        color:#fff !important;
       
    }

  
`

export const SearchCodeWrapper= styled.div`

   
    border: 1px solid  ${({theme}) => theme.colors.primary};
    border-radius:20px;
    padding:2px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    input{
        
        border: none;
        padding:4px;
        background:#f9f9f9;
        font-size:12px;
    }

    button{
        background: ${({theme}) => theme.colors.primary} !important; 
        border: 1px solid transparent;
        color: #fff !important;
        padding: 2px 11px;
        border-radius: 20px;
        font-size:13px;
    }
`
