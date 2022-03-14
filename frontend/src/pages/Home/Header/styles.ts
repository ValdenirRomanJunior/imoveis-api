import styled from "styled-components";

export const HeaderContainer = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-family: "Raleway", sans serif;
    box-sizing: border-box;
    border: 1px solid rgba(0,0,0,0.15);
    position: relative;
    
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
    .login-lets-box{
        display: flex;
      
       

    }
    .login{
        margin-bottom:0;
    }
    
    .lets{
        display: flex;
        align-items: center;
        background:#54BC96;
        border-radius:5px;
        padding: 2px 10px;
        color: #fff;
        box-shadow: -1px 3px 6px rgba(0,0,0,0.25);
        margin-left:.5rem;
      
    }

    .menu-hamburguer{
        display: flex;
        align-items: center;
        border: 1px solid #000;
        border-radius:3px;
        padding: 3px 4px;
    }
    .menu-box{
        display: none;
    }
    @media screen and (min-width: 1024px){

        display:block;

        .logo-wrapper{
            width:8rem;
            height:4rem;
            margin-left:2rem;
             
        }
        .menu-hamburguer{
            display:none;
        }
        .menu-box{
            position: absolute;
            left: 19rem;
            top:1.5rem;
            width:25%;
            display: flex;
            
        }
        nav{
            width:80%;
            display:flex;
            align-items: center;    
            justify-content: space-between;
           
        }
        ul{
            width:100%;
            list-style: none;
            display:flex;
            align-items: center;    
            justify-content: space-between;
            margin-bottom:0;
        }
        ul li{
            font-family:"Segoe UI", sans serif;
            color:#6F6F6F;
            
        }
        .listing-button{
            display: flex;
            align-items: center;
            color:#fff;
            background: ${({theme})=> theme.colors.primary};
            padding: 1.5px 12px;
           font-size: .6rem;
           margin-left: 1rem;
           border-radius: 5px;
           position: relative;
           box-shadow: -1px 3px 6px rgba(0,0,0,0.25);
        }
        .listing-button::before{
            content:"";
            width: 0; 
            height: 0; 
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent; 
            border-right:12px solid ${({theme})=> theme.colors.primary}; 
            position: absolute;
            left:-.7rem; 
              
        }
        .login-lets-box{
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            right:1rem;
            top: 1.5rem;
            border-left:1px solid #C4C4C4;
            padding-left: 2rem;
           
        }
        .lets{
            margin-left: .5rem;
        }

    }
  

`