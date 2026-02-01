import React, { useState, useEffect } from 'react';
import { EcotoneLogo } from './components/EcotoneLogo';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { CheckoutView } from './components/CheckoutView';
import SuccessView from './components/SuccessView';
import { useCart } from './hooks/useCart';
import { productsData, categories } from './data/products';

const EcotoneStore = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState('shop'); // 'shop', 'checkout', 'success'
  const [weather, setWeather] = useState({ desc: 'Chargement...', temp: '' });

  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    cartCount,
    clearCart
  } = useCart();

  // Mock weather fetch - in real app would use an API route
  useEffect(() => {
    // Current Gatineau stats from Amara's tools
    setWeather({ desc: 'Partiellement Nuageux', temp: '-12°C' });
  }, []);

  const filteredProducts = productsData.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const handleOrderCompletion = () => {
    setView('success');
    clearCart();
  };

  // View Logic
  if (view === 'success') {
    return <SuccessView onBackHome={() => setView('shop')} />;
  }

  if (view === 'checkout') {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans pb-20">
        <CheckoutView 
          cart={cart} 
          cartTotal={cartTotal} 
          onBack={() => setView('shop')}
          onCompleteOrder={handleOrderCompletion}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 pb-24">
      {/* Search Header (Sticky) */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-b dark:border-zinc-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <EcotoneLogo size="small" />
          <div className="flex-1 max-w-lg relative">
            <input
              type="text"
              placeholder="Chasse, pêche, vêtements..."
              className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-2xl py-2.5 px-10 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 opacity-40">🔍</span>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-2xl relative"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-6">
        {/* Weather Intelligence Component ✨ */}
        <div className="mb-8 flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-3xl border dark:border-zinc-800 shadow-sm overflow-hidden relative">
          <div className="relative z-10">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Météo Gatineau</p>
            <h2 className="text-2xl font-black text-green-700 dark:text-green-500">{weather.temp} • {weather.desc}</h2>
            <p className="text-sm text-zinc-500 mt-1 italic">
              {parseInt(weather.temp) < 0 ? "❄️ C'est le temps pour l'équipement d'hiver!" : "🎣 Bonne journée pour la pêche!"}
            </p>
          </div>
          <div className="absolute right-[-20px] top-[-20px] text-8xl opacity-10 blur-sm pointer-events-none">
            🌨️
          </div>
        </div>

        {/* Categories (Horizontal Swipe) */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar mb-8 -mx-4 px-4">
          {[{id: 'all', name: 'Tout'}, ...categories].map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-2xl font-bold whitespace-nowrap transition-all shadow-sm ${activeCategory === cat.id ? 'bg-green-700 text-white ring-4 ring-green-700/20' : 'bg-white dark:bg-zinc-900 text-zinc-500 border dark:border-zinc-800'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-black uppercase tracking-tight italic">Collection {activeCategory === 'all' ? 'Complète' : activeCategory}</h2>
          <p className="text-xs text-zinc-400 font-bold uppercase">{filteredProducts.length} ARTICLES</p>
        </div>

        {/* Mobile-Optimized Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      {/* Navigation Basse (iPhone Style) 📱 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-t dark:border-zinc-800 px-6 py-3 flex justify-between items-center sm:hidden z-40 pb-safe">
        <button onClick={() => setView('shop')} className={`flex flex-col items-center gap-1 ${view === 'shop' ? 'text-green-600' : 'text-zinc-400'}`}>
          <span className="text-xl">🏪</span>
          <span className="text-[10px] font-bold uppercase">Magasin</span>
        </button>
        <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center gap-1 text-zinc-400">
          <span className="text-xl">🛍️</span>
          <span className="text-[10px] font-bold uppercase">Panier</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-400">
          <span className="text-xl">🗺️</span>
          <span className="text-[10px] font-bold uppercase">Contact</span>
        </button>
      </header>

      {/* Slide-over Cart */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
        onGoToCheckout={() => {
          setIsCartOpen(false);
          setView('checkout');
        }}
      />
    </div>
  );
};

export default EcotoneStore;
