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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050804]">
      {/* Background Visuals */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/assets/ecotone-hero-upscaled.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(74,127,36,0.3),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_50%,rgba(139,195,74,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#8BC34A]/10 border-l-2 border-[#8BC34A] py-1 px-4 mb-8">
              <Mountain className="w-3 h-3 text-[#8BC34A]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8BC34A]">MAÎTRISEZ L'EXPÉRIENCE</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] uppercase italic tracking-tighter mb-8">
              L'AVENTURE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#8BC34A] to-white bg-[length:200%_auto] animate-shimmer">REVIE</span> ICI
            </h1>

            <p className="text-lg text-white/60 leading-relaxed max-w-lg mb-12 font-medium">
              Depuis plus de <span className="text-white font-bold italic">15 ans</span>, Ecotone Gatineau équipe les chasseurs et pêcheurs les plus exigeants de l'Outaouais. 
              La technologie Pro au service de la nature primitive.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <button 
                onClick={onShopNow}
                className="bg-[#8BC34A] text-black font-black uppercase tracking-widest px-8 py-5 rounded-none flex items-center gap-3 hover:translate-x-2 transition-transform duration-300 shadow-xl shadow-[#8BC34A]/20"
              >
                Lancer la Boutique <ArrowRight className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-6 px-4">
                {[
                  { label: "PRODUITS", val: "15K+" },
                  { label: "EXPERTS", val: "24/7" }
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-black text-white leading-none">{stat.val}</div>
                    <div className="text-[8px] font-bold text-white/40 tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Featured Product Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
            onClick={() => addItem(featuredProduct)}
          >
            <div className="absolute inset-0 bg-[#8BC34A] blur-[120px] opacity-10 rounded-full" />
            <div className="relative bg-gradient-to-br from-white/5 to-transparent backdrop-blur-2xl border border-white/10 p-12 rounded-3xl group">
               <div className="text-[200px] text-center filter drop-shadow-[0_20px_50px_rgba(139,195,74,0.3)] transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110 cursor-pointer">🏹</div>
               <div className="absolute -top-4 -left-4 bg-[#8BC34A] text-black font-black text-[10px] py-2 px-4 italic uppercase tracking-widest">Offre de la semaine</div>
               <div className="mt-8 text-center">
                  <h3 className="text-2xl font-bold text-white italic mb-2 tracking-tighter">PREDATOR COMPOUND</h3>
                  <div className="text-4xl font-black text-[#8BC34A]">$599.99 <span className="text-lg text-white/20 line-through italic ml-2">$749.99</span></div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Rhythmic Ambient Component */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30">
        <span className="text-[8px] font-bold text-white tracking-[0.4em] uppercase mb-4 italic">Scroll</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-[#8BC34A] to-transparent" />
      </div>

    </section>
  );
};
