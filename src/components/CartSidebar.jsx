import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '../data/cartStore';

export const CartSidebar = () => {
  const { items, isCartOpen, toggleCart, updateQuantity, removeItem, getTotal } = useCartStore();
  const { subtotal, shipping, tax, total } = getTotal();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-gray-100 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-ecotone-green w-6 h-6" />
                <h2 className="text-xl font-black uppercase tracking-tighter text-[#1A1C19] font-oswald">VOTRE PANIER</h2>
                <span className="bg-ecotone-green text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg shadow-ecotone-green/20">
                  {items.length} ARTICLES
                </span>
              </div>
              <button onClick={toggleCart} className="text-gray-400 hover:text-[#1A1C19] transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20">
                  <ShoppingBag className="w-20 h-20" />
                  <p className="text-sm font-bold uppercase tracking-widest">Le panier est vide</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                      {item.image && item.image.includes('assets') ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-5xl">{item.category === 'fishing' ? '🎣' : '🏹'}</span>
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                       <div className="flex justify-between">
                          <h4 className="text-xs font-black uppercase text-[#1A1C19] truncate max-w-[150px] font-oswald">{item.name}</h4>
                          <span className="text-ecotone-green font-black font-oswald">${item.price.toFixed(2)}</span>
                       </div>
                       <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">{item.subcategory}</p>
                       
                       <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center bg-gray-50 border border-gray-100 rounded-lg overflow-hidden">
                             <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-gray-100 text-gray-600"><Minus className="w-3 h-3" /></button>
                             <span className="px-3 text-xs font-black text-[#1A1C19] font-oswald">{item.quantity}</span>
                             <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-gray-100 text-gray-600"><Plus className="w-3 h-3" /></button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                             <Trash2 className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>Sous-total</span>
                    <span className="text-[#1A1C19] font-oswald">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>Livraison</span>
                    <span className={shipping === 0 ? 'text-ecotone-green' : 'text-[#1A1C19] font-oswald'}>
                      {shipping === 0 ? 'GRATUIT' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>Taxes (QC 14.975%)</span>
                    <span className="text-[#1A1C19] font-oswald">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-4 text-xl font-black uppercase text-[#1A1C19] font-oswald">
                    <span>Total</span>
                    <span className="text-ecotone-green">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button className="w-full bg-ecotone-green text-white font-black uppercase tracking-[0.2em] py-5 hover:scale-[1.02] transition-transform shadow-xl shadow-ecotone-green/20 rounded-xl">
                  PASSER À LA CAISSE →
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
