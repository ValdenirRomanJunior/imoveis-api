import 'styled-components';

declare module 'styled-components'{

    export interface DefaultTheme {
        colors: {
            primary: string,
            primaryDark: string,
            secondary: string,
            tertiary: string,
            background: string,
            backgroundLight: string,
            backgroundGray: string,
            red: string,
            green: string,
            white: string,
            gray: {
                50: string,
                100: string,
                200: string,
                300: string,
                400: string,
                500: string,
                600: string,
                700: string,
                800: string,
                900: string,
            }
        };
    }
}