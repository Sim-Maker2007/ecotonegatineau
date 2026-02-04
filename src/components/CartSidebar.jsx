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
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0f08] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-[#8BC34A] w-6 h-6" />
                <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">VOTRE UNITÉ</h2>
                <span className="bg-[#8BC34A] text-black text-[10px] font-black px-2 py-0.5 rounded shadow-lg shadow-[#8BC34A]/20">
                  {items.length} ITEMS
                </span>
              </div>
              <button onClick={toggleCart} className="text-white/40 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20 italic">
                  <ShoppingBag className="w-20 h-20" />
                  <p className="text-sm font-bold uppercase tracking-widest">Le hangar est vide</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-5xl">
                      {/* Using Emoji as placeholder until real images */}
                      {item.category === 'fishing' ? '🎣' : '🏹'}
                    </div>
                    <div className="flex-1 space-y-2">
                       <div className="flex justify-between">
                          <h4 className="text-xs font-black uppercase text-white truncate max-w-[150px] italic">{item.name}</h4>
                          <span className="text-[#8BC34A] font-black">${item.price.toFixed(2)}</span>
                       </div>
                       <p className="text-[10px] text-white/30 font-bold tracking-widest uppercase">{item.subcategory}</p>
                       
                       <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                             <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-white/10 text-white/60"><Minus className="w-3 h-3" /></button>
                             <span className="px-3 text-xs font-black text-white">{item.quantity}</span>
                             <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-white/10 text-white/60"><Plus className="w-3 h-3" /></button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-white/20 hover:text-red-500 transition-colors">
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
              <div className="p-6 bg-black/40 border-t border-white/10 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    <span>Sous-total</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    <span>Livraison Expédiée</span>
                    <span className={shipping === 0 ? 'text-[#8BC34A]' : 'text-white'}>
                      {shipping === 0 ? 'GRATUIT' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    <span>Taxes (QC 14.975%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-4 text-xl font-black italic uppercase text-white">
                    <span>Total Mission</span>
                    <span className="text-[#8BC34A] shadow-glow">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button className="w-full bg-[#8BC34A] text-black font-black uppercase tracking-[0.2em] py-5 hover:scale-[1.02] transition-transform shadow-xl shadow-[#8BC34A]/20">
                  DÉPLOYER LA COMMANDE →
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
