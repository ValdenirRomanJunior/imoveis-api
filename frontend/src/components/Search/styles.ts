import styled from "styled-components";

export const SearchContainer = styled.div`
width: 100%;
flex:1;
padding:0 20px;


 display: flex;
 justify-content: end;
 align-items: center;

.icon-search-properties{
 font-size:25px;
 color: gray;
 

 
}

@media screen and (min-width:1000px){
    display:none;
}
    
`

export const BarTopSearch = styled.div`
    width:100%;
    background-color: #f9f9f9;
    border-bottom: 1px solid #b1b3b0;
    height: 53px;
   
    display: flex;
    justify-content: center;
    align-items: center;
  

    p{
        margin-bottom: 0;
        font-size: 16px;
        font-family: "Nunito Sans", sans-serif;
        font-weight:700;
        color: #63666a;
    }

    .button-close-modal-mobile{
        position: absolute;
        right:5%;
        font-size:20px;
    }
    
`

export const SearchContent= styled.div<{iconDelete:boolean}>`
    width:100%;
    height:100vh;
    background:#fff;
    padding:1rem;

    .selectWrapper{
        position: relative;
    }

    select{
        width:100%;
        border: 1px solid #c9c9c9;
        margin-bottom: 20px;
        position: relative;
        color:gray;
        padding: 7px 30px 7px 12px;
        font-size:15px;
        position: reltive;
      

    }
  

    option{
        
       border-radius:0;
      
        color:gray;
    }

    option:disabled{
        color:#c6c6c6;
    }

    .type-goal-wrapper{
        width:100%;
        border-bottom: 1px solid #b1b3b0;
        display:flex;
        justify-content: space-between;
    }

    .select-half{
        width: 45% !important;
    }

  .deleteUF{
    position: absolute;
    top:15%;
    right:10%;
    color:red;
    font-size:22px;
    visibility: ${({iconDelete}) => iconDelete === false ? 'visible': 'hidden'}; 
  }

`

export const SearchButtonContainer= styled.div`
    width: 100%;
    padding: 20px 0 ;

    display: flex;
    justify-content: end;
    align-items: center;

    button{
        font-size: 1.1rem;
        padding: .29813rem 1.175rem;
        background: transparent;
        width:100%;
        border: 1px solid  ${({theme}) => theme.colors.primary}; 
        color: ${({theme}) => theme.colors.primary}; 
       
    }

    .search-button-send{
        color:#fff;
        background: ${({theme}) => theme.colors.primary}; 
    }

`

export const SearchCodeWrapper= styled.div`
    width:100%;
    
    border: 1px solid  ${({theme}) => theme.colors.primary};
    border-radius:20px;
    padding:5px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    input{
        flex:1;
        border: none;
        padding:5px;
        background:#f9f9f9;
    }

    button{
        background: ${({theme}) => theme.colors.primary}; 
        border: 1px solid transparent;
        color: #fff;
        padding: 3px 12px;
        border-radius: 20px;
    }
`
