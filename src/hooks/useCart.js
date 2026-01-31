import React, { useState } from 'react';

/**
 * Custom hook for managing shopping cart state
 * Persists data to localStorage so it survives page reloads
 */
export const useCart = () => {
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ecotone-cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('ecotone-cart', JSON.stringify(newCart));
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      saveCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      saveCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    saveCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    saveCart(cart.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => saveCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  };
};
