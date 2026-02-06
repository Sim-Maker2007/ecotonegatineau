import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { IntelHub } from './components/IntelHub';
import { CartSidebar } from './components/CartSidebar';
import { CheckoutView } from './components/CheckoutView';

function App() {
  const [view, setView] = useState('home');

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1C19] selection:bg-ecotone-green selection:text-white font-sans">
      <Header />
      <CartSidebar />
      
      <main>
        {view === 'home' ? (
          <>
            <Hero onShopNow={() => setView('checkout')} />
            <CategoryShowcase />
            <IntelHub />
          </>
        ) : (
          <CheckoutView onBack={() => setView('home')} />
        )}
      </main>
      
      {/* Professional Footer Preview */}
      <footer className="bg-[#1A1C19] py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="col-span-2 lg:col-span-1">
               <img src="assets/ecotone-gatineau-logo-clean.png" className="h-12 mb-8 filter invert" />
               <p className="text-gray-400 max-w-xs text-sm leading-relaxed">
                  79 Boul. de la Gappe #4, Gatineau, QC J8T 0B5<br/>
                  (819) 243-6665
               </p>
            </div>
            <div>
                <h4 className="font-bold uppercase mb-6 text-ecotone-green">Magasiner</h4>
                <ul className="space-y-4 text-sm text-gray-400 font-semibold">
                    <li><a href="#" className="hover:text-ecotone-green transition-colors">Pêche</a></li>
                    <li><a href="#" className="hover:text-ecotone-green transition-colors">Chasse</a></li>
                    <li><a href="#" className="hover:text-ecotone-green transition-colors">Plein Air</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold uppercase mb-6 text-ecotone-green">Support</h4>
                <ul className="space-y-4 text-sm text-gray-400 font-semibold">
                    <li><a href="#" className="hover:text-ecotone-green transition-colors">Livraison</a></li>
                    <li><a href="#" className="hover:text-ecotone-green transition-colors">Retours</a></li>
                    <li><a href="#" className="hover:text-ecotone-green transition-colors">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold uppercase mb-6 text-ecotone-green">REJOIGNEZ-NOUS</h4>
                <div className="flex gap-4">
                    {/* Social icons placeholder */}
                    <div className="w-6 h-6 bg-gray-600 rounded-full hover:bg-ecotone-green cursor-pointer" />
                    <div className="w-6 h-6 bg-gray-600 rounded-full hover:bg-ecotone-green cursor-pointer" />
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-gray-500 font-bold uppercase tracking-widest">
            © 2026 Ecotone Gatineau // Built By Amara ✨
        </div>
      </footer>
    </div>
  );
}

export default App;
