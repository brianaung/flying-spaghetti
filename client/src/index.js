import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './config/firebase.js';
// import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import './general.css';

// TODO: this part of code causing the app to not render anything
// import { Provider } from 'react-redux';
// import { legacy_createStore as createStore } from 'redux';
// import { applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
//
// const store = createStore(reducers, compose(applyMiddleware(thunk)));

// ReactDOM.render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </ThemeProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
