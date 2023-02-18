import { Link } from "react-router-dom";
import styled from "styled-components";


export const HeaderContainer = styled.header`
    width:100%;
    height:60px;

    background-color: ${({theme}) => theme.colors.background};

    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom:1px solid #e6e9ed;
    
    position: fixed;
    top:0;
    left:0;
    z-index: 6000;

   
`

export const HeaderWrapper = styled.div`
    width:92%;
    height: 60px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .message-icon{
        margin-left:190px;
    }

    @media screen and (min-width: 1000px){
        width:99%;
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

    display:flex;
    flex-direction:column;
    justify-content: space-around;
    align-items: center;
    padding:10px 0;

    position: absolute !important;
    bottom:-95px;
    left:100px;
   
    background:#FFF;
    border: 1px solid #e6e9ed;
    border-radius:5px;
    
    transition: all .5s cubic-bezier(.2,1,.2,1),width .5s cubic-bezier(.2,1,.2,1) .3s,box-shadow .5s cubic-bezier(.2,1,.2,1) .3s;
    opacity: ${({linksModal}) => (linksModal ? '0' : '1')};
    left: ${({linksModal}) => (linksModal ? '100px' : '-80px')};
    box-shadow: ${({linksModal}) => (linksModal ? '0 10px 10px 0 rgb(0 0 1 / 10%)':'0 10px 10px 0 rgb(100 149 237 / 20%)')};
    



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
        width:35px;
        height:35px;
        margin-left:8px;
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
    top:61px;
    transition: all .5s cubic-bezier(.2,1,.2,1),width .5s cubic-bezier(.2,1,.2,1) .3s,box-shadow .5s cubic-bezier(.2,1,.2,1) .3s;
    left: ${({sidebar}) => (sidebar ? '0' : '-100%')};
    box-shadow: ${({sidebar}) => (sidebar ? '0 30px 50px 0 rgb(0 0 0 / 30%)' : 'none' )};
  
   
   
    

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
      
        


        p{
        padding: 0;
        position:relative;
        top: -1px;
        left: 37px;
        }
  
   
    
}
  
    `

export const NavIcon = styled(Link)`
    font-size:1.4rem;
    display: flex;
    padding:8px 0;
    padding: 15px;
    
    align-items:center;
    color:${({theme}) => theme.colors.secondary};
  
 

    p{
        margin-bottom:0;
        color:#000;
        font-size:15px;
        margin-left:10px;
        position:relative;

    }

    @media screen and (min-width: 1000px){
         position: relative;
         padding: 20px  13px;
         display: block;
         white-space: nowrap;
         width:100%;
         transition:all .5s cubic-bezier(.2,1,.2,1),width .5s cubic-bezier(.2,1,.2,1) .3s;
         overflow: hidden;
       
         
        
            
      
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