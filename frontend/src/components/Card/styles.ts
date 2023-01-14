import styled, {css}from "styled-components";


export const CardContainer = styled.div<{

    width: string;
    height: string;
    noShadow: boolean;
    paddingTop:string;
    borderRadius: string;
    border: string;
    margin: string;
    background: boolean;
    
     
}>`

width: ${(props) => props.width};
height: ${(props) => props.height};
background: ${({theme}) => theme.colors.background};
padding-top:${(props) => props.paddingTop};
border-radius:${(props) => props.borderRadius};
border:${(props) => props.border};
margin: ${(props) => props.margin};



${(props) => !props.noShadow && css`
    box-shadow: -1px 4px 6px rgba(0,0,0,0.25);

`}

${(props) => !props.borderRadius && css`
   border: 1px solid #000;

`}

${(props) => !props.border && css`
   border: 1px solid #000;

`}
${(props) => !props.background && css`
   background: ${({theme}) => theme.colors.backgroundGray};

`}



display:flex;
align-items: center;
flex-direction: column;




`