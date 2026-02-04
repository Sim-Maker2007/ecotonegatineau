import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);
        
        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: 1 }] });
        }
        set({ isCartOpen: true });
      },
      
      removeItem: (productId) => set((state) => ({
        items: state.items.filter((item) => item.id !== productId),
      })),
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        const items = get().items;
        const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const shipping = subtotal > 99 ? 0 : 15.00;
        const tax = subtotal * 0.14975; // Quebec Tax Rate
        return {
          subtotal,
          shipping,
          tax,
          total: subtotal + shipping + tax
        };
      }
    }),
    {
      name: 'ecotone-cart-storage',
    }
  )
);
