import styled from "styled-components"

export const LeadContactContainer = styled.div`
width: 100%;   
display: flex;  
flex-direction: column;
border-top:1px solid #e6e9ed;
margin-top: 1rem;
padding-top: 1rem;


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
.lead-information-wrapper{
    display: flex;
    justify-content: space-between;
}

.label-information-detail{
    color: gray;
    width: 50%;
}
.value-information-detail{
    width: 50%;
    text-align: left;
    font-size: .9rem;
}

@media screen and (min-width: 1000px){
    padding: 2rem  2rem;

}

`