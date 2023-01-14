import styled from "styled-components";


export const LeadsBackground = styled.div`
width: 100%;   
background-color: ${({theme}) => theme.colors.backgroundLight};

@media screen and (min-width: 1000px){
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

`

export const LeadsContainer = styled.div`
width: 100%;   
display: flex;  
flex-direction: column;
background-color: ${({theme}) => theme.colors.backgroundLight};
padding: 0 1rem;

.title-leads{
    display: flex;
    align-items: center;
    margin-top: 20px;
    color: #5d5d5d;
    font-weight: 400;
    

.button-add-lead{
    width:25px;
    height:25px;
    text-align: center;
    background: rgb(0,157,67);
    color: #fff;
    margin-left: 10px;
    border-radius: 3px;
    }
 
}
.modal-button{
    background: transparent;
    border: none;
    color: #fff;

}
 





@media screen and (min-width: 1000px){
    width:50%;
    justify-content: center;




}


`
