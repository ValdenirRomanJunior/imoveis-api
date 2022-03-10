import styled from "styled-components";

export const HeaderContainer = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-family: "Raleway", sans serif;
    box-sizing: border-box;
    border: 1px solid rgba(0,0,0,0.15);
    
    .logo-wrapper{
        width:6rem;
        height:4rem;
        object-fit: contain;
       
    }

    .logo-wrapper>img{
        width: 100%;
        height: 100%;
        object-fit: contain;
       
    }
    .login{
        margin-bottom:0;
    }
    
    .lets{
       display: flex;
       align-items: center;
        background:#54BC96;
        border-radius:10px;
        padding: 3px 10px;
        color: #fff;
      
    }

    .menu-hamburguer{
        display: flex;
        align-items: center;
        border: 1px solid #000;
        border-radius:3px;
        padding: 2px 2px;
    }

`