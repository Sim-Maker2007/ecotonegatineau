import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mountain, Wind } from 'lucide-react';
import { useCartStore } from '../data/cartStore';

export const Hero = ({ onShopNow }) => {
  const addItem = useCartStore((state) => state.addItem);

  const featuredProduct = {
    id: 'predator-compound',
    name: 'PREDATOR COMPOUND',
    price: 599.99,
    category: 'hunting',
    subcategory: 'Arcs',
    image: '🏹'
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F8F9FA]">
      {/* Background Visuals */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="assets/ecotone-hero-upscaled.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white text-6xl md:text-[6rem] font-extrabold font-oswald leading-none mb-6">
              L'AVENTURE <span className="text-ecotone-green">REVIE ICI</span>
            </h1>

            <button 
              onClick={onShopNow}
              className="bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-ecotone-green hover:text-white transition-all shadow-xl"
            >
              Découvrir la collection
            </button>
          </motion.div>
        </div>
      </div>

      {/* Rhythmic Ambient Component */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30">
        <span className="text-[8px] font-bold text-white tracking-[0.4em] uppercase mb-4 italic">Scroll</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
      </div>

    </section>
  );
};
