import React from 'react';

export const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-zinc-100 dark:border-zinc-800 group">
      {/* Product Image / Icon */}
      <div className="h-48 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
        {product.image}
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
            {product.subcategory}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="text-xs ml-1 text-zinc-500 dark:text-zinc-400">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-1 text-zinc-900 dark:text-zinc-100 truncate">
          {product.name}
        </h3>
        
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2 h-10">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {product.price.toFixed(2)}$
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-400 line-through">
                {product.originalPrice.toFixed(2)}$
              </span>
            )}
          </div>
          
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-green-600 hover:bg-green-700 active:scale-95 text-white p-2 rounded-lg transition-all shadow-sm flex items-center justify-center"
            aria-label="Ajouter au panier"
          >
            {/* Simple Plus Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
