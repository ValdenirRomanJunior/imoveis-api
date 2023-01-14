import 'styled-components';

declare module 'styled-components'{

    export interface DefaultTheme {
        colors: {
            primary: string,
            secondary: string,
            tertiary:string,
            background: string,
            backgroundLight: string,
            backgroundGray: string,
            red: string,
            green: string,
        };
    }
}