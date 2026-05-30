import styled, { css } from "styled-components";

export const OportunidadeContainer = styled.div`

.leadWrapper{
    width: 100%;
    flex-direction:column;
    justify-content: space-between;
    height: auto;
    min-height: 90px;
    background-color: #fff;
    margin-top: 10px;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    padding: 6px 12px;
    font-family: 'Inter', 'Nunito Sans', sans-serif;
    position: relative;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    transition: all 0.2s ease;

    &:hover {
        border-color: #ccc;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }

    .link-item-lead{
        width: 90%;
    }
     
    .list-steps-change{
      background: #fff;
      position: absolute;
      top: -65%;
      right: 0;
      padding-left: 0;
      border-radius: 8px;
      padding: 8px 6px;
      border: 1px solid #eaeaea;
      z-index: 10;
      display: block;
      width: 170px;
      max-height: 375px;
      overflow-y: scroll;
      scroll-behavior: smooth;
      touch-action: auto;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    } 

    .list-steps-change::-webkit-scrollbar {
      display: none;
    }

    .list-steps-change {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }

    .icon-opportunity-op{
        cursor: pointer;
        color: #666;
    }

    .list-steps-change h5{
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        background: #fafafa;
        padding: 8px 5px;
        text-align: center;
        border-radius: 4px;
        margin-bottom: 8px;
        color: #111;
        font-weight: 600;
    }

    .list-steps-change li{
        width: 100%;
        border: 1px solid transparent;
        padding: 8px 10px;
        border-radius: 6px;
        margin-top: 4px;
        font-family: 'Inter', sans-serif;
        color: #444;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s;
       
        &:hover {
            background: #fafafa;
            border-color: #eaeaea;
            color: #111;
        }
    }

    .icon-step-move{
        position: absolute;
        top: 8px;
        right: 8px;
        font-size: 18px;
        cursor: pointer;
        color: #999;
        
        &:hover {
            color: #111;
        }
    }

    .content-first{
        max-width:100%;
        display: flex;
        align-items: center;
        padding: 8px 0;
        cursor: pointer;
    }

    .data-lead-left-wrapper{
        width: 100%;
        position: relative;
        display: flex;
        align-items: start;
        flex-direction: column;
        margin-left: 8px;
        justify-content: space-between;
      
        h4{    
            font-size: 14px;
            font-weight: 600;
            color: #111;
            margin-bottom: 2px;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;               
        }

        h4:first-letter{
            text-transform: capitalize;
        }

        span{
            color: #666;
            font-size: 12px;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .email-icon{
            margin-right: 4px;
            font-size: 13px;
        }
       
        .phone-date-wrapper-lead{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: left;
            margin-top: 4px;
        }

        .phone-leads{
            font-size: 12px;
            color: #666;
            margin-bottom: 0;
            display: flex;
            align-items: center;
    
            .icon-phone-lead{
                color: #888;
                margin-right: 4px;
                font-size: 13px;
            }    
        }

        .instant-lead{
            font-size: 10px;
            margin-top: 4px;
            color: #999;
        }
    }
 
    .icon-arrow-lead{
        color: #666;
        transition: color 0.2s;
        
        &:hover {
            color: #111;
        }
    }

    a{
        width: 100%;
        animation: openProperty 500ms ease-in-out;     
        transition: height 500ms;
        overflow: hidden;
        height: auto;
        min-height: 80px;
    }

    @keyframes openProperty {
        0% { height: 0; }
        100% { height: 80px; }
    }

    .message-lead{
        width: 100%;
        position: relative;
        margin-bottom: 40px;
        animation: open 500ms ease-in-out;     
        transition: height 500ms;
        border-top: 1px solid #eaeaea;
        padding-top: 12px;
        font-size: 12px;
        font-family: 'Inter', sans-serif;         
        margin-top: 12px;
        height: auto;
        overflow: hidden;
        color: #444;

        .icon-arrow-down-message{
            font-size: 18px;
            color: #999;
            margin-right: 8px;
        }
    }

    @keyframes open {
        0% { height: 0; }
        100% { height: auto; }
    }

    .icon-lead-trash{
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .icon-trash{
            font-size: 14px;     
            color: #999;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s;
            
            &:hover {
                color: #dc2626;
                background: #fef2f2;
            }
        }
    }
    
    .icon-opportunity-op-wrapper{
        position: absolute;
        bottom: 10px;
        right: 10px;
        z-index: 0 !important;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        transition: background 0.2s;

        &:hover {
            background: #fafafa;
        }
    }
    
    .link-detail-property-lead{
        border-top: 1px solid #eaeaea;
    }

    .lead-oportunity-wrapper{
        display: flex;
        justify-content: space-around;
        padding: 0 10px;
        
        span {
            font-size: 11px;
            color: #666;
        }
    }

    @media screen and (min-width:350px){
        width: 100%;   
        display: flex; 
        flex-direction:column;
        justify-content: space-between;
        position:relative;
             
        background-color: #fff;
        margin-top: 10px;
        border: 1px solid #eaeaea;
        border-radius: 8px;
        padding: 0 5px;
        font-family: 'Inter', sans-serif;
        height: auto;
        min-height: 90px;
    }
}

height: auto;

.lead-header-title{
    background: transparent;
    padding: 5px 12px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    
    span {
        font-size: 12px;
        color: #666;
        font-weight: 500;
    }
}

.sc-ikJyIC.grQsfG.rec.rec-pagination{
    display: none;
}

.column{
    width: 100%;        
    padding: 12px;
    margin-top: 20px;
    background: #fafafa;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    max-height: 75vh;
    overflow-y: scroll;    
    margin-right: 16px;
}

.title-column{
    font-family: 'Inter', sans-serif;     
    font-weight: 600;
    text-align: left;
    font-size: 13px;
    padding: 8px 12px;
    color: #111; 
    background: #fff;
    border: 1px solid #eaeaea;
    border-radius: 6px;
    margin-bottom: 16px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}

.sc-cxpSdN.fIwXVr.rec.rec-arrow {
    background: #fff;
    color: #111;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    
    &:hover, &:focus {
        background: #fafafa;
        color: #000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
}

.sc-cxpSdN.fIwXVr.rec.rec-arrow.rec.rec-arrow-right,
.sc-cxpSdN.fIwXVr.rec.rec-arrow.rec.rec-arrow-left,
.ehWCnd {
    width: 40px;
    height: 40px;
    min-width: 40px;
    line-height: 40px;
}
  
@media screen and (min-width:1000px){
    margin-top: 10px;

    .column::-webkit-scrollbar {
        display: none;
    }
    
    .column {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
}
`;

export const ColumnsContainer = styled.div``;

export const PropertyItemLeadContainer = styled.div<{prop:boolean}>`
    width: 100%;
    margin-top: 10px;
    padding: 8px 0;
    position: relative;
    display: flex;
    align-items: center;
    border-top: 1px solid #eaeaea;

    .image-property-lead-wrapper{
        width: 48px;
        height: 48px;

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #eaeaea;
        }
    }
    
    .data-property-lead-wrapper{
        margin-left: 16px;
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        color: #444;
        display: flex;
        flex-direction: column;
        font-weight: 500;
    }
`;

export const MessageNoLeads = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    h4{
        color: #888;
        font-size: 13px;
        font-weight: 400;
        text-align: center;
        margin: 0;
    }
`;

export const LeadSearchWrapper = styled.div`
    width: 100%;
    margin-top: 15px;
    background: transparent;
    display: flex;
    align-items: center;

    .icon-search-leads{
        color: #888;
        font-size: 20px;
        margin-left: 5px;
    }
    
    input{
        width: 100%;
        height: 40px;
        border: 1px solid #eaeaea;
        border-radius: 6px;
        padding: 0 12px;
        background: #fff;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        transition: all 0.2s;
        
        &:focus {
            outline: none;
            border-color: #999;
        }
    }

    button{
        background: #111; 
        border: 1px solid #111;
        color: #fff;
        padding: 8px 16px;
        border-radius: 6px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 500;
        margin-left: 12px;
        cursor: pointer;
        transition: all 0.2s;
        
        &:hover {
            background: #333;
        }
    }
`;

export const ItemsContainer = styled.div`
    width: 100%;
`;