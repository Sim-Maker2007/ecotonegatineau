import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => {
      if (i.id !== id) return i;
      const newQty = i.qty + delta;
      return newQty > 0 ? { ...i, qty: newQty } : i;
    }).filter(i => i.qty > 0));
  };

  const cartSubtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartShipping = cartSubtotal >= 100 ? 0 : 15;
  const cartTax = cartSubtotal * 0.14975;
  const cartTotal = cartSubtotal + cartShipping + cartTax;

  return (
    <CartContext.Provider value={{
      cart, isCartOpen, setIsCartOpen,
      addToCart, removeFromCart, updateQty,
      cartSubtotal, cartShipping, cartTax, cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
