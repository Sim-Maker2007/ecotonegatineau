import React from 'react';
import { ShoppingCart, Plus, Tag } from 'lucide-react';

export const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 rounded-lg">
      {/* Product Image Area */}
      <div className="relative h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100/20 to-transparent z-10" />
        
        {product.image.includes('assets') ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0"
          />
        ) : (
          <div className="text-7xl transition-transform duration-700 group-hover:scale-110 z-0">
            {product.image}
          </div>
        )}
        
        {/* Deal Tag */}
        {product.originalPrice && (
          <div className="absolute top-4 left-4 z-20 bg-ecotone-green text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
            PROMOTION
          </div>
        )}
      </div>
      
      {/* Product Details */}
      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ecotone-green">
            {product.subcategory || 'Asset Tactical'}
          </span>
          <div className="flex items-center gap-1 opacity-50">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Qualité Supérieure</span>
          </div>
        </div>
        
        <h3 className="font-black text-xl mb-2 text-[#1A1C19] uppercase tracking-tighter truncate font-oswald">
          {product.name}
        </h3>
        
        <p className="text-gray-400 text-xs mb-6 line-clamp-2 h-8 leading-relaxed font-bold uppercase tracking-tight">
          {product.description || 'Équipement de précision pour opérations en plein air.'}
        </p>
        
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-[10px] text-gray-300 line-through font-bold">
                {product.originalPrice.toFixed(2)}$
              </span>
            )}
            <span className="text-2xl font-black text-[#1A1C19] tabular-nums font-oswald">
              {product.price.toFixed(2)}$
            </span>
          </div>
          
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-gray-50 hover:bg-ecotone-green border border-gray-100 hover:border-ecotone-green text-[#1A1C19] hover:text-white p-4 transition-all duration-300 group/btn active:scale-95 rounded-xl shadow-sm"
            aria-label="Ajouter au panier"
          >
            <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      </div>
      
      {/* Visual Accent */}
      <div className="h-[4px] w-0 bg-ecotone-green group-hover:w-full transition-all duration-700" />
    </div>
  );
};
