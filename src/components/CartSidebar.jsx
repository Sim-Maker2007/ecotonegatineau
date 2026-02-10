import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { getStripe } from '../lib/stripe';

export default function CartSidebar() {
  const { lang, t } = useLang();
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQty, cartSubtotal, cartShipping, cartTax, cartTotal } = useCart();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    if (!stripe) {
      alert(lang === 'fr' ? 'Paiement en ligne bientôt disponible!' : 'Online checkout coming soon!');
      return;
    }
    // TODO: Call your backend to create a Stripe Checkout Session
    // const response = await fetch('/api/checkout', { method: 'POST', body: JSON.stringify({ items: cart }) });
    // const { sessionId } = await response.json();
    // await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/50 z-[10000000] backdrop-blur-sm" />
          <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring', damping:30, stiffness:300}} className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[10000001] shadow-2xl flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold font-oswald tracking-tight uppercase">{t.cart.title}</h2>
              <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-12 h-12 text-gray-200 mb-4" />
                  <p className="text-gray-400 text-sm font-medium">{t.cart.empty}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map(i => (
                    <div key={i.id} className="flex gap-4 items-start">
                      <img src={i.image} className="w-20 h-20 rounded-xl object-cover border border-gray-100 flex-shrink-0" alt="" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-ecotone-dark truncate">{lang === 'fr' ? i.name : i.nameEn}</h4>
                        <p className="text-ecotone-green font-bold text-sm mt-1">${i.price.toFixed(2)}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button onClick={() => updateQty(i.id, -1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-ecotone-dark hover:bg-gray-50 transition-colors text-sm font-bold">-</button>
                            <span className="w-8 h-8 flex items-center justify-center text-sm font-bold">{i.qty}</span>
                            <button onClick={() => updateQty(i.id, 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-ecotone-dark hover:bg-gray-50 transition-colors text-sm font-bold">+</button>
                          </div>
                          <button onClick={() => removeFromCart(i.id)} className="text-gray-300 hover:text-red-500 transition-colors ml-auto">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-100 p-6 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500"><span>{t.cart.subtotal}</span><span className="font-semibold text-ecotone-dark">${cartSubtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-500"><span>{t.cart.shipping}</span><span className="font-semibold text-ecotone-dark">{cartShipping === 0 ? t.cart.free : `$${cartShipping.toFixed(2)}`}</span></div>
                  <div className="flex justify-between text-gray-500"><span>{t.cart.tax}</span><span className="font-semibold text-ecotone-dark">${cartTax.toFixed(2)}</span></div>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100">
                  <span className="font-bold text-ecotone-dark">Total</span>
                  <span className="font-bold text-lg text-ecotone-dark font-oswald">${cartTotal.toFixed(2)}</span>
                </div>
                <button onClick={handleCheckout} className="w-full bg-ecotone-dark text-white py-4 font-bold uppercase tracking-[0.15em] text-sm rounded-xl hover:bg-ecotone-green transition-colors duration-300">{t.cart.checkout}</button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
