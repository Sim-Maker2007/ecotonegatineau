import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import ProductDetail from './pages/ProductDetail';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <CartSidebar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boutique" element={<Catalogue />} />
          <Route path="/boutique/:category" element={<Catalogue />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
          <Route path="/intel/:slug" element={<BlogPost />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Fallback to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
