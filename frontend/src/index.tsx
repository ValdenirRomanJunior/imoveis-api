import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { ErrorBoundary} from 'react-error-boundary';
import PageNotFound from './components/PageNotFound';






ReactDOM.render(  
  <React.StrictMode>

    <App />
   
  </React.StrictMode>,

  document.getElementById('root')
);


