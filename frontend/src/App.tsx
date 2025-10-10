import {ThemeProvider} from 'styled-components';
  import Router from './routes';
import {theme} from './styles/theme'
import GlobalStyle from './styles/globalStyles'
import { AuthProvider } from './context/authContext';
import { SidebarProvider } from './context/SidebarContext';



function App() {
  return (
    
     <ThemeProvider theme={theme}>
      <AuthProvider>
        <SidebarProvider>
          <GlobalStyle />
       
          <Router />
        </SidebarProvider>
       </AuthProvider>
     </ThemeProvider>
   
  );
}

export default App;
