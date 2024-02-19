import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { SessionProvider } from './Security/SessionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("in root !!");
root.render(
  
  <Router>
    <SessionProvider>
    <Route path='/' component={App}></Route>
    </SessionProvider>
     </Router>
);


reportWebVitals();