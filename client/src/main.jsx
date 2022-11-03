import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import Store from './Store/Store';

import App from './App';
import './index.css';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
