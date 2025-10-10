import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";


export const HeaderContainer = styled.header`
    width:100%;
    height:45px;

    background-color: #fff;

    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom:1px solid #e6e9ed;
    
    
    z-index:5000;
    
   

   
`

export const HeaderWrapper = styled.div`
    width:92%;
    height: 60px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .message-icon{
        position:absolute;
        top:50%;
        right:10%;
        transform:translate(-50%,-50%);
       
    }

    @media screen and (min-width: 550px){
        .message-icon{
            position:absolute;
            top:50%;
            right:8%;
            transform:translate(-50%,-50%);
           
        }
    }

    @media screen and (min-width: 768px){
        .message-icon{
            position:absolute;
            top:50%;
            right:6%;
            transform:translate(-50%,-50%);
           
        }
    }

    @media screen and (min-width: 1000px){
        width:100%;
        padding:0 15px;
        .message-icon{
            position:absolute;
            top:50%;
            right:4%;
            transform:translate(-50%,-50%);
           
        }
    }

   
`

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
   
    
    .user-image-wrapper{
        width:30px;
        height:30px;
        border: .3px solid gray;
        border-radius:50%;
        text-align:center;
        cursor:pointer;

        img{
            width:100%;
            height:100%;
            border-radius:50%;
            padding:2px;
        }
         
    }
   .initials{
    color:#008ace;
    font-weight: 500;
   }
`
export const BoxLinks = styled.div<{ linksModal: boolean}>`
    width: 120px;
    height:80px;

   
    flex-direction:column;
    justify-content: space-around;
    align-items: center;
    padding:10px 0;

    position: absolute !important;
    bottom:-95px;
    left:100px;
    display: ${({linksModal}) => (linksModal ? 'none' : 'flex')};
    background:#FFF;
    border: 1px solid #e6e9ed;
    border-radius:5px;
    
    transition: all .5s cubic-bezier(.2,1,.2,1),width .5s cubic-bezier(.2,1,.2,1) .3s,box-shadow .5s cubic-bezier(.2,1,.2,1) .3s;
    opacity: ${({linksModal}) => (linksModal ? '0' : '1')};
    left: ${({linksModal}) => (linksModal ? '100px' : '-80px')};
    box-shadow: ${({linksModal}) => (linksModal ? '0 10px 10px 0 rgb(0 0 1 / 10%)':'0 10px 10px 0 rgb(100 149 237 / 20%)')};
    z-index:1;



    .arrow{
        display: block;    
        position: absolute;   
        transform: translateX(-50%);
        top:-25px;
        left: 50%;
        width: 0; 
        height: 0; 
        border-right: 12px solid transparent;
        border-left: 12px solid transparent; 
        border-bottom:  12px solid #989898; 
        border-top: 12px solid transparent; /* 40px height (20+20) */
        right:-12px;
      
    }
    
   p{
   
    margin-bottom:0;
    font-size:15px;
    font-family:"Nunito Sans", sans-serif;
    cursor: pointer;
    font-weight:400;
    color: #000;
    
   }
   .logout-icon{
    margin-right:8px;
    color:gray;
    font-size:18px;
   }

    @media screen and (min-width: 1000px){
      
    }
`
export const MenuLogoWrapper = styled.div`
    display:flex;
    align-items:center;

    .logo{
        width:28px;
        height:28px;
        margin-left:8px;
        object-fit: contain;
    }

    @media screen and (min-width: 1000px){

        .logo{
            margin-left:4px;
        }
    }
    
`
export const Hambuguer = styled.div`
    width: 22px;
    height:15px;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    

    span{
        width:100%;
        height:2.5px;
        background-color:gray;
    }

    @media screen and (min-width: 1000px){
        display: none;
    }
`

export const SideBarContainer = styled.div<{ sidebar: boolean}>`
    width:75%;
    height:100vh;
    background-color: ${({theme}) => theme.colors.background};
    border-right:1px solid #e6e9ed;
    position:absolute;
    top:50px;
    transition: all .5s cubic-bezier(.2,1,.2,1),width .5s cubic-bezier(.2,1,.2,1) .3s,box-shadow .5s cubic-bezier(.2,1,.2,1) .3s;
    left: ${({sidebar}) => (sidebar ? '0' : '-100%')};
    box-shadow: ${({sidebar}) => (sidebar ? '0 30px 50px 0 rgb(0 0 0 / 30%)' : 'none' )};
  
       z-index: 999;
   
    

    @media screen and (min-width: 1000px){
      
        width:60px;
        left: ${({sidebar}) => (sidebar ? '0' : '0')};
        transition: all .3s;
        white-space: nowrap;
        overflow: hidden;
        line-height: 1.5;
        box-shadow: ${({sidebar}) => (sidebar ? 'none' : 'none' )};
        position: absolute;
       

        &:hover{
            width: 300px;
            box-shadow: ${({sidebar}) => (sidebar ? '0 30px 50px 0 rgb(0 0 0 / 30%)' : 'none' )};
          


            .footer-sidebar{
                left:0;
                opacity:1;
            }
        }
   

    }
    
 
`

export const SideBarTop = styled.div`
    width:100%;
    border-bottom:1px solid #e6e9ed;
    

    p{
        color:${({theme}) => theme.colors.secondary};
        font-size:12px;
        margin:0;
        padding: 12px 12px;
        


    }
    
    @media screen and (min-width: 1000px){
      
        .domain-info{
       left: 47px !important;
        }


        p{
        padding: 0;
        position:relative;
        top: -1px;
        left: 37px;
        }
  
   
    
}
  
    `

export const NavIcon = styled(NavLink)`
    font-size:1.2rem;
    display: flex;
    padding:8px 0;
    padding: 15px;
    align-items: center;
  


  
    
    align-items:center;
    color:${({theme}) => theme.colors.secondary};
  
  

    p{
        margin-bottom:0;
        color:#000;
        font-size:14px;
        margin-left:10px;
        position:relative;

    }


    .site-link{
        color:#008ace;
        font-size: 18px;
    }

   .icon-wrapper-pulse{
    position:relative;
    width:20px;

   }

    .pulse{
    height: 20px;
    width: 20px;
    background:linear-gradient(#ffffff94, #ffffff5c);
    position:absolute;
    margin:auto;
    left:0;
    right: 0;
    top:0;
    bottom:0;
    border-radius:50%;
    display: grid;
    place-items: center;


    }
    .pulse:before, 
    .pulse:after{
        content:"";
        position:absolute;
        height:100%;
        width:100%;
        background: #82b1fb61;
        border-radius:50%;
        z-index: -1;
        opacity: 0.7;
    }
     
    .pulse:before{
    animation: pulse 3s ease-out infinite;
    }
    .pulse:after{
    animation: pulse 3s 1.5s ease-out infinite;
    }

    @keyframes pulse {
        100%{
        transform:scale(2.5);
        opacity:0;

        }
       
    }
         .icon-pulse{
        font-size:14px;
        color:#6d99f4;
        }

        
    @media screen and (min-width: 1000px){
         position: relative;
         padding: 18.1px 13px;
         display: flex;
         align:items: center;
         white-space: nowrap;
         width:100%;
         transition:all .5s cubic-bezier(.2,1,.2,1),width .5s cubic-bezier(.2,1,.2,1) .3s;
         overflow: hidden;
       
   
            .icon-wrapper-pulse{
            position:relative;
            width:25px;
            
             margin-left:5px;
             margin-top:0;

          }
            
        .icon-sidebar{
        position:absolute;
        top: 20px;
        left: 18px;
        vertical-align: middle;
        overflow: hidden;
     
       }

       p{
        position:relative;
        top: -1px;
        left: 37px;
       
        
       }

        .icon-wrapper-pulse{
        position:absolute;
        width:20px;

   }

    .pulse{
    height: 20px;
    width: 20px;
    background:linear-gradient(#ffffff94, #ffffff5c);
    position:absolute;
    margin:auto;
    left:0;
    right: 0;
    top:0;
    bottom:0;
    border-radius:50%;
    display: grid;
    place-items: center;


    }
    .pulse:before, 
    .pulse:after{
        content:"";
        position:absolute;
        height:100%;
        width:100%;
        background: #82b1fb61;
        border-radius:50%;
        z-index: -1;
        opacity: 0.7;
    }
     
    .pulse:before{
    animation: pulse 3s ease-out infinite;
    }
    .pulse:after{
    animation: pulse 3s 1.5s ease-out infinite;
    }

    @keyframes pulse {
        100%{
        transform:scale(2.5);
        opacity:0;

        }
       
    }
         .icon-pulse{
        font-size:14px;
        color:#6d99f4;
        }

    }

    

`

export const SidebarFooter = styled.div`
background-color: ${({theme}) => theme.colors.backgroundLight};
position:absolute;
bottom:9%;
left:0;
width:100%;
display: flex;
flex-direction: column;
padding: 12px;
p{
    margin:0;
    font-size:12px;
    color: ${({theme}) => theme.colors.secondary};
}

@media screen and (min-width: 1000px){
   
    left:-300px;
    opacity:0;
    transition:1s;


        
}
`