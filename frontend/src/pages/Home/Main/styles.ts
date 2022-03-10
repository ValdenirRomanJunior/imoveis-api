import styled from "styled-components";

export const MainWrapper= styled.main`
    width: 100%;
    height: 70vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    
    
    }
`

export const BackgroundContainer= styled.div<{image: any}>`
width: 100%;
height: 70vh;
background-image: url(${({image}) => image});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
z-index: 1;

    
}
`
export const TextContainer= styled.div`
    position:absolute;
    top:22%;
    left:50%;
    width: 90%;
    transform: translate(-50%, -50%);
    z-index: 5000;
  

    .principal-title{
        font-size: 2rem;
        color:##000000;
        font-family: "Segoe UI", sans serif;
        font-weight: 700;
        text-align: center;
     

    }
    .subtitle{
        color:#3C3C3C;
        text-align: center;
        font-family: "Segoe UI", sans serif;
    }

    
}
`
export const SearchContainer = styled.div`
    width:70%;
    height: 46px;

    background: ${({theme}) => theme.colors.background};
    border:1px solid ${({theme}) => theme.colors.secondary};

    position: absolute;
    top:40%;
    left:50%;
    transform: translate(-50%, -50%);



    display:flex;
    justify-content: center;
    z-index: 5000;

    input{
        font-size: 0.75rem;
        font-weight: 400;
        background: transparent;
        border: 0;
        width: 80%;
        margin: 0 20px;
        
    }

    button{
        width:20%;
        height:46px;
        
        color: ${({theme}) => theme.colors.background};
        background: ${({theme}) => theme.colors.primary}; 
        border: 1px solid ${({theme}) => theme.colors.primary};
        border-radius: 1px;
    
     
    
        display:flex;
        justify-content: center;
        align-items: center;
        
        z-index: 5000;
    
       &:hover{
           filter: opacity(0.8)
       }
       &:disabled{
        filter: opacity(0.4)
    }
    }

`