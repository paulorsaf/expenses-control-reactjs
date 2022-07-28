import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthService from './services/AuthService';
import AuthProvider from './contexts/auth/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider authService={new AuthService()}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
