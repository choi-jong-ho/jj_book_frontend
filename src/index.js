import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from './store/AuthContext';
import {HashRouter} from 'react-router-dom';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider>
          <HashRouter>
              <App />
          </HashRouter>
      </AuthProvider>
  </React.StrictMode>
);
