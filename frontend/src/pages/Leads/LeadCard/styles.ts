import styled from "styled-components";


export const LeadWrapper = styled.div`
    width: 100%;   
    display: flex; 
    justify-content: space-between;
    align-items: center;
    background-color: ${({theme}) => theme.colors.background};
    margin-top: 20px;
    border-bottom: 1px solid rgb(222,222,222);

    .icon-lead{
        font-size: 22px;
    }

    .data-lead-wrapper{
        display: flex;
        flex-direction: column;

        h3{
            font-size: 16px;
            margin: 0;
        }
        span{
            color: gray;
            font-size: 13px;
        }
      
  
    }
    .button-leads{
        font-size: 11px;
        padding: 0 10px;
        height: 33px;
        border-radius: 2px;
        width:auto;
        margin-bottom: 0;
    }

    .number-lead{
        display: none;
    }


`

export const LeadItemContainer = styled.div`
    width: 100%;
    height: auto;
`