import {createGlobalStyle} from 'styled-components'


const GlobalStyle = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
  
}

body {

    background-color: ${({theme}) => theme.colors.background};
}

a{
    text-decoration:none;
    color:${({theme}) => theme.colors.primary};
}

`
export default GlobalStyle