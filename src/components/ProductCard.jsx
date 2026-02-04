import React from 'react';
import { ShoppingCart, Plus, Tag } from 'lucide-react';

export const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-[#0d0f0c] border border-white/5 overflow-hidden group hover:border-[#8BC34A]/50 transition-all duration-500">
      {/* Product Image / Icon Area */}
      <div className="relative h-64 bg-zinc-900/50 flex items-center justify-center text-7xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <div className="transition-transform duration-700 group-hover:scale-125 group-hover:rotate-6 z-0">
          {product.image}
        </div>
        
        {/* Deal Tag */}
        {product.originalPrice && (
          <div className="absolute top-4 left-4 z-20 bg-[#8BC34A] text-black text-[8px] font-black uppercase tracking-widest px-2 py-1 italic">
            Mission Deal
          </div>
        )}
      </div>
      
      {/* Product Details */}
      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8BC34A]">
            {product.subcategory || 'Asset Tactical'}
          </span>
          <div className="flex items-center gap-1 opacity-50">
            <span className="text-[10px] font-bold text-white uppercase italic">Condition: Pro</span>
          </div>
        </div>
        
        <h3 className="font-black text-xl mb-2 text-white italic uppercase tracking-tighter truncate font-oswald">
          {product.name}
        </h3>
        
        <p className="text-xs text-white/40 mb-6 line-clamp-2 h-8 leading-relaxed font-medium uppercase tracking-tight">
          {product.description || 'Équipement de précision pour opérations en environnement hostile.'}
        </p>
        
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-[10px] text-white/20 line-through italic font-bold">
                {product.originalPrice.toFixed(2)}$
              </span>
            )}
            <span className="text-2xl font-black text-white italic tabular-nums">
              {product.price.toFixed(2)}$
            </span>
          </div>
          
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-white/5 hover:bg-[#8BC34A] border border-white/10 hover:border-[#8BC34A] text-white hover:text-black p-4 transition-all duration-300 group/btn active:scale-95"
            aria-label="Engage Transaction"
          >
            <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      </div>
      
      {/* Tactical Decal */}
      <div className="h-[2px] w-0 bg-[#8BC34A] group-hover:w-full transition-all duration-700" />
    </div>
  );
};
