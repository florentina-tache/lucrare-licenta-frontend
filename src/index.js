import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from 'react-toast-notifications';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppProvider from './integration/context/appProviderContext';

ReactDOM.render(
  <ToastProvider
    autoDismiss
    autoDismissTimeout={6000}
    placement='bottom-center'
  >
    <AppProvider>
      <App />
    </AppProvider>
  </ToastProvider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
