import styled from "styled-components";


export const LeadDetailBackground = styled.div`
width: 100vw;  
background-color: ${({theme}) => theme.colors.backgroundLight};
display: flex;  
flex-direction: column;
justify-content: center;
align-items: center;
padding-bottom: 40px;

`

export const LeadDetailContainer = styled.div`
width: 100%;   
display: flex;  
flex-direction: column;
justify-content: center;
align-items: center;
padding-right: 1rem;
padding-left: 1rem;

.icon-lead-detail{
    font-size: 60px;
    padding:5px 5px;
    border: 1px solid #e6e9ed;
    border-radius: 50%;
    margin-top: 30px;
    
}

.lead-message-date{
    font-size: 10px;
    color: gray;
}


p{
    margin-bottom: 0;
}

@media screen and (min-width: 1000px){
    width: 40%;
}
`