import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './config/firebase.js';
import { BrowserRouter } from 'react-router-dom';
// import { ThemeProvider } from '@emotion/react';
/* import { getDesignTokens } from './theme';
import { ThemeProvider, createTheme } from '@mui/material'; */
import './general.css';

import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(reducers, compose(applyMiddleware(thunk)));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
  </React.StrictMode>
);
