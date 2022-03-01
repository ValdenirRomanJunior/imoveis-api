import styled from "styled-components";

export const DashboardBackground = styled.main`
    width: 100%;
    

    display: flex;
    align-items: center;
    flex-direction: column;

    background-color: ${({theme}) => theme.colors.backgroundLight};
`

export const BodyContainer = styled.main`

    

    width:80%;
    margin-top: 40px;
    display:flex;
    justify-content: space-between;
    flex-direction: column;
    }
`

export const RegisterContainer= styled.div`
    width: 15%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2{
        font-family: Raleway, sans serif;
    }
    .p-register{
        font-size:1.5rem;
    }
 
`

export const SearchContainer=styled.div`
    width:50%;
    display: flex;
    align-items: center;
    justify-content: center;
`



