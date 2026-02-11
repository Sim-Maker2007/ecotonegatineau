import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import App from './App';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('Ecotone App Error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: '#4A7F24' }}>Ecotone Gatineau</h1>
          <p style={{ color: '#666', marginTop: '20px' }}>
            Une erreur est survenue. Veuillez rafraîchir la page.
          </p>
          <p style={{ color: '#999', fontSize: '12px', marginTop: '10px' }}>
            {this.state.error?.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '20px', padding: '10px 20px', background: '#4A7F24', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Rafraîchir
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ErrorBoundary>
        <HelmetProvider>
          <BrowserRouter>
            <LanguageProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </LanguageProvider>
          </BrowserRouter>
        </HelmetProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
} catch (e) {
  console.error('Fatal mount error:', e);
  document.getElementById('root').innerHTML = `
    <div style="padding:40px;text-align:center;font-family:sans-serif;">
      <h1 style="color:#4A7F24">Ecotone Gatineau</h1>
      <p style="color:#666">Erreur de chargement: ${e.message}</p>
    </div>
  `;
}
