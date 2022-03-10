import styled from "styled-components";


export const LandImageContainer=styled.div`
    width: 100%;
    height: 100%;
`
export const LandImageItemContainer=styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    
    
`

export const LandImageContainerVW=styled.div`
    width: 85%;
    height: 100%;
    position: relative;

    img{
        width:100%;
        height:100%;
        object-fit: cover;
        border-radius: 10px;
    }
    
    arrow{
        position: absolute; 
        top:10px;
        left:0;
       
    }
`
export const LandImageContainerVH=styled.div`
    width: 15%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding:5px;

    div{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-around;
        width:60%;
        height:50px;
        object-fit: cover;
        
    }
    img{
        width:100%;
        height:100%;
        object-fit: cover;
        border-radius: 5px;
        
    }

`