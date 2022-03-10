import styled from "styled-components";


export const PropertiesContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    position: relative;

    .right{
        top:40%;
        right:2%;
        z-index: 5000;
    }
    .left{
        top:40%;
        left:2%;
        z-index: 6000;
    }

    h2{
        font-family:"Raleway", sans serif;
        font-weight: 700;
        font-size:1.3rem;
    }
    p{
        font-family:"Segoe UI", sans serif;
        color:#6F6F6F;
        font-size: .8rem;
    }
   

`

export const PaginationCard= styled.div`
    width:4rem;
    height: 4rem;
    border-radius: 50%;
    background: ${({theme}) => theme.colors.primary};

    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    
    
`


