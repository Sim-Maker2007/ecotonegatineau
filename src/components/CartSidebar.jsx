import React from 'react';

export const CartSidebar = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, cartTotal }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-zinc-950 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b dark:border-zinc-800 flex justify-between items-center bg-green-700 text-white">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span>🛒</span> Votre Panier
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-green-800 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-zinc-500">
                <div className="text-6xl mb-4">🎣</div>
                <p>Votre panier est vide.</p>
                <button 
                  onClick={onClose}
                  className="mt-4 text-green-600 font-semibold"
                >
                  Continuer vos achats
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border dark:border-zinc-800">
                  <div className="w-20 h-20 bg-white dark:bg-zinc-800 rounded-lg flex items-center justify-center text-3xl shadow-sm">
                    {item.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 truncate">{item.name}</h4>
                    <p className="text-sm text-zinc-500 mb-2">{item.price.toFixed(2)}$</p>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border dark:border-zinc-700 rounded-lg overflow-hidden bg-white dark:bg-zinc-800">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-3 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 active:bg-zinc-200"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-medium border-x dark:border-zinc-700">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-3 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 active:bg-zinc-200"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-xs hover:underline"
                      >
                        Enlever
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t dark:border-zinc-800 space-y-4 bg-zinc-50 dark:bg-zinc-900/50">
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-zinc-600 dark:text-zinc-400">Total estimé</span>
                <span className="text-2xl text-green-700 dark:text-green-400">{cartTotal.toFixed(2)}$</span>
              </div>
              <p className="text-xs text-zinc-500 italic">
                * Taxes et frais de port calculés à la caisse.
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
                Passer à la caisse
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
