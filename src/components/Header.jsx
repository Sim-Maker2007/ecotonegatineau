import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, User, Sparkles } from 'lucide-react';
import { useCartStore } from '../data/cartStore';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { items, toggleCart } = useCartStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 bg-[#8BC34A] rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-[#8BC34A]/20">
            <Sparkles className="text-black w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white uppercase italic leading-none">ECOTONE</span>
            <span className="text-[10px] font-bold text-[#8BC34A] tracking-[0.2em] uppercase leading-none">Gatineau</span>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10">
          {['Accueil', 'Boutique', 'Chasse', 'Pêche', 'À Propos'].map((link) => (
            <a key={link} href="#" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-[#8BC34A] transition-colors">{link}</a>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <Search className="w-5 h-5 text-white/80 cursor-pointer hover:text-[#8BC34A] transition-colors" />
          <User className="w-5 h-5 text-white/80 cursor-pointer hover:text-[#8BC34A] transition-colors" />
          <div className="relative cursor-pointer group" onClick={toggleCart}>
            <ShoppingCart className="w-5 h-5 text-white shadow-glow transition-all" />
            <span className="absolute -top-2 -right-2 bg-[#8BC34A] text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">{items.length}</span>
          </div>
          <Menu className="md:hidden w-6 h-6 text-white cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};
