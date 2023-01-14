import styled from "styled-components";

export const DetailContainer = styled.div`
   width: 100%;
   border-bottom:1px solid #e6e9ed;
   padding-bottom: 15px;

 
   
   div{
      display: flex;
      justify-content: space-between;
      color: rgb(71, 79, 79);
      font-size: 16px;
      font-weight: 400;
      line-height:1.5;
   }

   .detail-value-wrapper{
      width: 50%;
      padding-left:16px;

      .type-value{
         color: ${({theme}) => theme.colors.primary};
      }

      .goal-value{
         color: ${({theme}) => theme.colors.primary};
      }
   }
   
`