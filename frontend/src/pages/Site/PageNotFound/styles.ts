import styled from "styled-components";

export const BodyPageNotFound = styled.div`
width:100%;
height: 100vh;

display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

div{
    width:100%;
   
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
  
    padding:0 2rem;

    p{
        width:100%;
        font-family: "Nunito Sans", sans-serif;
        text-align:center;
        font-weight:600;
        color:gray;
    }

.not-found-icon{

    font-size:110px;
    color: red;
}

.link-back{
    margin-top:20px;
    background: #7373ff;
    color: #fff;
    padding: 7px;
    border-radius: 2px;
}
}

`