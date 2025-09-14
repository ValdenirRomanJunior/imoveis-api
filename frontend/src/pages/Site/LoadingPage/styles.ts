import styled from "styled-components";


export const LoadingPageContainer = styled.div`
    width:100%;
    height:100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 1;
 


    .spin-loading{
        position: fixed;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        z-index:2;
    }
    
`