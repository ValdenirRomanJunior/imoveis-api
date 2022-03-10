import styled, {css}from "styled-components";


export const CardContainer = styled.div<{

    width: string;
    height: string;
    noShadow: boolean;
    marginTop:string;
    padding: boolean;
     
}>`

width: ${(props) => props.width};
height: ${(props) => props.height};
background: ${({theme}) => theme.colors.background};



${(props) => !props.noShadow && css`
    box-shadow: 5px 4px 6px rgba(0,0,0,0.25);

`}

${(props) => props.marginTop && css`
    margin-top:20px;

`}
${(props) => !props.padding && css`
    padding:20px;

`}

border-radius: 20px;



display:flex;
align-items: center;
flex-direction: column;

z-index: 5000;

`