import React from 'react';
import { motion } from 'framer-motion';
import { Fish, Crosshair, MapPin, Award } from 'lucide-react';
import { useCartStore } from '../data/cartStore';

export const CategoryShowcase = () => {
  const addItem = useCartStore((state) => state.addItem);

  const categories = [
    { 
      id: 'fishing', 
      title: 'PÊCHE PRO', 
      icon: <Fish className="w-12 h-12" />, 
      stats: '8,400+ ARTICLES',
      desc: 'Élite tactique pour domination aquatique.',
      color: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      accent: 'text-cyan-400',
      product: { id: 'fishing-kit-pro', name: 'KIT PÊCHE PRO', price: 299.99, image: '🎣' }
    },
    { 
      id: 'hunting', 
      title: 'CHASSE ÉLITE', 
      icon: <Crosshair className="w-12 h-12" />, 
      stats: '12,000+ ARTICLES',
      desc: 'Lethal precision, stealth engineering.',
      color: 'bg-[#8BC34A]/10',
      borderColor: 'border-[#8BC34A]/30',
      accent: 'text-[#8BC34A]',
      product: { id: 'hunting-kit-pro', name: 'KIT CHASSE ÉLITE', price: 449.99, image: '🎯' }
    }
  ];

  return (
    <section className="bg-[#050804] py-24 px-6 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-4 leading-none">
              Explorez nos <span className="text-[#8BC34A]">Unités</span>
            </h2>
            <p className="text-white/40 font-medium uppercase tracking-[0.2em] text-[10px]">Division Tactique Plein Air Gatineau</p>
          </div>
          <div className="flex gap-4 self-center md:self-end">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 border border-white/10 rounded-full">
               <MapPin className="w-3 h-3 text-[#8BC34A]" />
               <span className="text-[10px] font-bold text-white/60">OUTAOUAIS AUTHENTIQUE</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <motion.div 
               key={cat.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.2 }}
               className={`group relative overflow-hidden p-8 md:p-12 border ${cat.borderColor} ${cat.color} hover:bg-white/5 transition-all duration-500`}
            >
               {/* Background Decorative */}
               <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity duration-700`}>
                 {cat.icon}
               </div>

               <div className="relative z-10">
                 <div className={`${cat.accent} mb-6`}>{cat.icon}</div>
                 <h3 className="text-3xl font-black text-white italic mb-4 uppercase">{cat.title}</h3>
                 <p className="text-white/50 text-sm max-w-xs mb-8 leading-relaxed font-medium">{cat.desc}</p>
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-white/30 tracking-widest">{cat.stats}</span>
                    <button 
                      onClick={() => addItem(cat.product)}
                      className={`${cat.accent} text-[10px] font-black uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform duration-300`}
                    >
                      DÉPLOIEMENT →
                    </button>
                 </div>
               </div>

               {/* Geometric Accent */}
               <div className="absolute bottom-0 left-0 w-32 h-1 bg-[#8BC34A]/20 transform -skew-x-12 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
