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
      isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 shadow-md' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 bg-ecotone-green rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-ecotone-green/20">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-black tracking-tighter ${isScrolled ? 'text-[#1A1C19]' : 'text-white'} uppercase italic leading-none`}>ECOTONE</span>
            <span className="text-[10px] font-bold text-ecotone-green tracking-[0.2em] uppercase leading-none">Gatineau</span>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10">
          {['Accueil', 'Boutique', 'Chasse', 'Pêche', 'À Propos'].map((link) => (
            <a key={link} href="#" className={`text-xs font-black uppercase tracking-widest ${isScrolled ? 'text-gray-600 hover:text-ecotone-green' : 'text-white/80 hover:text-ecotone-green'} transition-colors`}>{link}</a>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <Search className={`w-5 h-5 ${isScrolled ? 'text-gray-600' : 'text-white/80'} cursor-pointer hover:text-ecotone-green transition-colors`} />
          <User className={`w-5 h-5 ${isScrolled ? 'text-gray-600' : 'text-white/80'} cursor-pointer hover:text-ecotone-green transition-colors`} />
          <div className="relative cursor-pointer group" onClick={toggleCart}>
            <ShoppingCart className={`w-5 h-5 ${isScrolled ? 'text-[#1A1C19]' : 'text-white'} transition-all`} />
            <span className="absolute -top-2 -right-2 bg-ecotone-green text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg">{items.length}</span>
          </div>
          <Menu className={`md:hidden w-6 h-6 ${isScrolled ? 'text-[#1A1C19]' : 'text-white'} cursor-pointer`} />
        </div>
      </div>
    </nav>
  );
};
