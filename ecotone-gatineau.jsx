import React, { useState } from 'react';
import { EcotoneLogo } from './components/EcotoneLogo';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { CheckoutView } from './components/CheckoutView';
import { useCart } from './hooks/useCart';
import { productsData, categories } from './data/products';

const EcotoneStore = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState('shop'); // 'shop' or 'checkout'
  
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    cartCount,
    clearCart
  } = useCart();

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
    alert("Merci pour votre commande! L'équipe d'Ecotone Gatineau vous contactera sous peu.");
    clearCart();
    setView('shop');
  };

  if (view === 'checkout') {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setView('shop')}>
              <EcotoneLogo size="small" variant="dark" />
            </div>
            
            {/* Search - Hidden on tiny screens */}
            <div className="hidden sm:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-full py-2 px-10 focus:ring-2 focus:ring-green-500 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="absolute left-3 top-2.5 opacity-50">🔍</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
              >
                <span className="text-2xl">🛒</span>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <div className="bg-green-800 rounded-3xl p-8 mb-12 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-lg">
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter italic leading-tight">
              Gatineau: Votre destination plein air
            </h1>
            <p className="text-green-100 text-lg mb-6 leading-relaxed">
              Équipements spécialisés pour chasseurs et pêcheurs passionnés. 
            </p>
            <div className="flex gap-3">
              <button className="bg-white text-green-900 px-6 py-2 rounded-full font-bold hover:bg-green-50 transition-colors">
                En Vedette
              </button>
            </div>
          </div>
          {/* Decorative Decal */}
          <div className="absolute right-[-5%] bottom-[-10%] text-[240px] opacity-10 rotate-[-15deg] pointer-events-none select-none">
            🎣
          </div>
        </div>

        {/* Category Filter Pills (Scrollable on mobile) */}
        <div className="flex overflow-x-auto pb-4 mb-8 no-scrollbar gap-3 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`whitespace-nowrap px-6 py-2 rounded-full font-bold transition-all ${activeCategory === 'all' ? 'bg-green-600 text-white shadow-md' : 'bg-white dark:bg-zinc-900 border dark:border-zinc-800 text-zinc-500 hover:border-green-300'}`}
          >
            Tous les produits
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-6 py-2 rounded-full font-bold transition-all ${activeCategory === cat.id ? 'bg-green-600 text-white shadow-md' : 'bg-white dark:bg-zinc-900 border dark:border-zinc-800 text-zinc-500 hover:border-green-300'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-zinc-500 italic">
              Aucun produit trouvé pour votre recherche.
            </div>
          )}
        </div>
      </main>

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

      {/* Mobile Sticky CTA */}
      {cartCount > 0 && !isCartOpen && view === 'shop' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] sm:hidden z-20 transition-all animate-in slide-in-from-bottom-10">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-green-600 text-white py-4 rounded-2xl shadow-2xl font-black flex justify-between px-6 items-center border-2 border-white/20 active:scale-95"
          >
            <span>VOIR LE PANIER ({cartCount})</span>
            <span>{cartTotal.toFixed(2)}$</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default EcotoneStore;
