import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { CartSidebar } from './components/CartSidebar';
import { CheckoutView } from './components/CheckoutView';

function App() {
  const [view, setView] = useState('home');

  return (
    <div className="min-h-screen bg-[#050804] text-white selection:bg-[#8BC34A] selection:text-black">
      <Header />
      <CartSidebar />
      
      <main>
        {view === 'home' ? (
          <>
            <Hero onShopNow={() => setView('checkout')} />
            <CategoryShowcase />
          </>
        ) : (
          <CheckoutView onBack={() => setView('home')} />
        )}
      </main>
      
      {/* Professional Footer Preview */}
      <footer className="bg-black py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="text-center md:text-left">
               <p className="text-[10px] font-black uppercase text-[#8BC34A] tracking-widest mb-2 italic">Opérations Gatineau</p>
               <h4 className="text-xl font-bold tracking-tight">ECOTONE GATINEAU</h4>
               <p className="text-[10px] text-white/40 mt-4 leading-relaxed uppercase font-bold tracking-widest">
                  79 Boul. de la Gappe #4<br/>
                  Gatineau, QC J8T 0B5<br/>
                  819-243-6665
               </p>
            </div>
            <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
               <a href="#" className="hover:text-white transition-colors underline-offset-4 decoration-[#8BC34A] hover:underline">Support</a>
               <a href="#" className="hover:text-white transition-colors underline-offset-4 decoration-[#8BC34A] hover:underline">Expédition</a>
               <a href="#" className="hover:text-white transition-colors underline-offset-4 decoration-[#8BC34A] hover:underline">Confidentialité</a>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
