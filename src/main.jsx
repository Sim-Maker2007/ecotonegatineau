import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
