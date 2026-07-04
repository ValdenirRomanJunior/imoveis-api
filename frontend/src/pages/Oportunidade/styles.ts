import styled from "styled-components";


export const OportunidadeBackground = styled.div`
width: 100vw;  
background-color: #fafafa;
display: flex;  
flex-direction: column;
justify-content: center;
align-items: center;
padding-bottom: 40px;
font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

.deleteOpportunityWrapper{
  width:100%;
  margin-top:20px;
  display: flex;
  justify-content: flex-end;
  padding-right: 5%;
}

.deleteOpportunity{
  font-family: 'Inter', sans-serif;
  background:#fff;
  cursor: pointer;
  border:1px solid #eaeaea;
  border-radius:6px;
  font-size:13px;
  padding:8px 16px;
  font-weight: 500;
  color:#e00;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
  transition: all 0.2s ease;
  
  &:hover {
    background: #fff0f0;
    border-color: #ffcccc;
  }
}

@media screen and (min-width: 825px){
  .deleteOpportunityWrapper{
    padding-right: 6%;
  }
}
`     

export const OportunidadeContainer = styled.div`
     width:95%;
     display: flex;
     flex-direction: column;
     gap: 24px;
     margin-top: 10px;

      @media screen and (min-width: 825px){
        width:88%;
}
`

export const EtapasContainer = styled.div`
    width:100%;
    background: #ffffff;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    overflow: hidden;

    >ul{  
    display: flex;
    flex-direction: column;
    min-height: 70px;
    padding: 20px 0;
    margin: 0;

    .etapa-wrapper{
        width:100%;
        max-width:110px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top:10px;

        span{
          font-size: 11px;
          margin-top:10px;
          font-weight: 500;
          color: #666;
        }
    }
        > * {
      &:first-child ::before {
        content: none;     
}
  } 
   
    }

    >ul li{
    width:24px;
    height:24px;
    
    border-radius:50%;
    font-size:10px;
    background: #eaeaea;
    position: relative;
    
    ::before {
    content: " ";
    width: 2px;
    height:15px; 
    background: #eaeaea;
    position: absolute;
    top:95%;
    right:50%;
    transform: translateX(50%);
    }
  }
 
 .subtitle-opportunity{
    font-size: 14px !important;
    border-bottom: 1px solid #eaeaea;
    font-weight: 600;
    padding: 16px 24px;
    background: #ffffff;
    color: #111;
    display:flex;
    align-items:center;
    margin: 0;
    letter-spacing: -0.01em;

   .icon-property-opportunity{
    margin-right:8px;
    font-size:18px;
    color: #666;
   }
}

@media screen and (min-width: 825px){
    width:100%;
    flex-direction: row;

    >ul{
    display: flex;
     min-height: 70px;
     flex-direction: row;
     padding: 24px;
     align-items: center;

    .etapa-wrapper{
        width:110px;
        max-width:110px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top:0;

        span{
          font-size: 11px;
          margin-top:8px;
        }
    }
    }

    >ul li{
    width:24px;
    height:24px;
    border-radius:50%;
    background: #eaeaea;
    position: relative;
    
    ::before {
    content: " ";
    width: 86px;
    height:2px; 
    background: #eaeaea;
    position: absolute;
    top:50%;
    left:-86px;
    transform: translateY(-50%);
    }
  }
}
@media screen and (min-width: 1000px){
    >ul{
    .etapa-wrapper{
        width:140px;
        max-width:140px;
        margin-left:20px;
        span{
          font-size: 12px;
        }
    }
    }

    >ul li{
    width:28px;
    height:28px;
    
    ::before {
    width: 132px;
    left:-132px;
    }
  }
}

@media screen and (min-width: 1240px){
    >ul{
    .etapa-wrapper{
        width:160px;
        max-width:160px;
        margin-left:20px;
        span{
          font-size: 13px;
        }
    }
    }

    >ul li{
    width:32px;
    height:32px;
    
    ::before {
    width: 148px;
    left:-148px;
    }
  }
}
`
export const UserPropertyWrapper= styled.div`
    width:100%;
    margin-top: 10px;
    flex-direction: column;
    display: flex; 
    justify-content: space-between;

    @media screen and (min-width: 825px){
       width:100%;
     margin-top: 20px;
     flex-direction: row;

    justify-content: space-between;
    
`
export const MessagePropertyContainer = styled.div`
    width:97%;

    @media screen and (min-width: 825px){
      width:69%;
}

 

`
export const UserInfoContainer = styled.div<{copy:boolean}>`
    width:97%;
    border: 1px solid #eaeaea;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    margin-top:20px;
    overflow: hidden;

    .more-details{
      color: #0070f3;
      font-weight: 500;
      font-size: 13px;
      transition: color 0.2s;
      &:hover {
        color: #0051a8;
      }
    }

    .subtitle-info-lead-wrapper{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      background: #ffffff;
      color: #111;
      border-bottom: 1px solid #eaeaea;
      margin-bottom: 16px;
    }

    h2{
      font-size: 14px;
      font-weight: 600;
      margin: 0;
      display: flex;
      align-items: center;
      letter-spacing: -0.01em;
      svg {
        margin-right: 8px;
        color: #666;
        font-size: 16px;
      }
    }

    .info-item-wrapper{
      margin-bottom: 16px;
      padding: 0 24px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    h3{
      font-size: 11px;
      margin: 0;
      font-weight: 600;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    span{
      font-size: 14px;
      color: #111;
      font-weight: 400;
    }

    .whats-checkbox-wrapper{
      display: flex;
      padding: 16px 24px 24px;
      gap: 12px;
    }

    .info-item-wrapper-whats{
      background: #fafafa;
      border: 1px solid #eaeaea;
      border-radius: 6px;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s;
      color: #111 !important;
      font-weight: 500;
      font-size: 13px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);

      &:hover {
        background: #f0fdf4;
        border-color: #bbf7d0;
        color: #16a34a !important;
      }

      .icon-item-info-oportunity {
        color: #16a34a;
        font-size: 16px;
      }
    }

    .button-wrapper{
      position: relative;
      cursor:pointer;
      display: flex;
      align-items: center;
      font-size: 13px;
      background: #fafafa;
      border: 1px solid #eaeaea;
      border-radius: 6px;
      padding: 8px 16px;
      color: #111;
      font-weight: 500;
      gap: 8px;
      transition: all 0.2s;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);

      &:hover {
        background: #f1f5f9;
        border-color: #cbd5e1;
      }
    }

    .icon-copy{
      color: #666;
      font-size: 16px;
    }

    .button-wrapper::before{
      position: absolute;
      top: -35px;
      left: 50%;
      transform: translateX(-50%);
      content: "Copiado!";
      background-color: #111;
      color: #fff;
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 4px;
      display: ${({copy}) => copy === true ? 'block' : 'none'};
      font-weight: 500;
      animation: copys 2s ease-in-out forwards;
      opacity: 0;
    }

  @keyframes copys {
    0% { transform: translate(-50%, 10px); opacity: 0; } 
    15% { transform: translate(-50%, 0); opacity: 1; }
    85% { transform: translate(-50%, 0); opacity: 1; }
    100% { transform: translate(-50%, -10px); opacity: 0; }
  }

  @media screen and (min-width: 825px){
    width: 29%;
    margin-top: 0;
  }
`

export const PropertyItemOportunityContainer = styled.div`
    width:100%;
    min-height:90px;
    border: 1px solid #eaeaea;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    overflow: hidden;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

    .subtitle-opportunity{
      font-size: 14px !important;
      border-bottom: 1px solid #eaeaea;
      font-weight: 600;
      padding: 16px 24px;
      background: #ffffff;
      color: #111;
      display: flex;
      align-items: center;
      margin: 0;
      letter-spacing: -0.01em;

      .icon-property-opportunity{
        margin-right: 8px;
        font-size: 18px;
        color: #666;
      }
    }

    .link-detail-property-lead-opp{
      padding: 16px 24px;
      width: 100%;
      display: flex;
      text-decoration: none;
      transition: background 0.2s;
      
      &:hover {
        background: #fafafa;
      }
    }
  
    .property-wrapper-opportunity{
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .image-property-lead-wrapper-opp{
      width: 60px;
      height: 60px;
      flex-shrink: 0;
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid #eaeaea;
    }

    .image-property-lead-wrapper-opp img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .data-property-opportunity-wrapper{
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .data-property-opportunity-wrapper span{
      font-size: 13px;
      color: #666;
      
      &:first-child {
        font-size: 14px;
        font-weight: 500;
        color: #111;
      }
    }

   @media screen and (min-width: 825px){
      width:100%;
   }
`