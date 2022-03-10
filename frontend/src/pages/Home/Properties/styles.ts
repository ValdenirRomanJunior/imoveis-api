import styled from "styled-components";


export const PropertiesWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;

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

export const PropertiesContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    position: relative;

    @media screen and (min-width: 1200px) {   
        width: 85%;
        flex-direction: row;
        justify-content: space-between;

    }

    .right{
        top:40%;
        right:0;
        z-index: 5000;

        @media screen and (min-width: 1200px) {   
            right:-3rem;
    
        }
    }
    .left{
        top:40%;
        left:0;
        z-index: 6000;

        @media screen and (min-width: 1200px) {   
            left:-3rem;
    
        }
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

export const ButtonViewMore= styled.div`
        border: 1px solid #18806E;
        margin-top:2rem;
        padding:3px 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;

        span{
         
            font-family:"Raleway", sans serif;
            color:#18806E;
            font-size:1.4rem;
        }

        @media screen and (min-width: 1200px) {   
          margin-top:2.5rem;
    
        }

    
    
    `

