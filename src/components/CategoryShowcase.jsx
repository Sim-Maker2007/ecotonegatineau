import React from 'react';
import { motion } from 'framer-motion';
import { Fish, Crosshair, MapPin, Users, User, Baby } from 'lucide-react';
import { useCartStore } from '../data/cartStore';

export const CategoryShowcase = () => {
  const addItem = useCartStore((state) => state.addItem);

  const categories = [
    { 
      id: 'men', 
      title: 'HOMMES', 
      icon: <User className="w-12 h-12" />, 
      stats: 'BOUTIQUE COMPLÈTE',
      desc: 'Performance et confort pour vos expéditions.',
      color: 'bg-blue-500/5',
      borderColor: 'border-gray-200',
      accent: 'text-blue-600',
      image: 'assets/categories/men.jpg',
      product: { id: 'mens-gear', name: 'Pack Expédition Homme', price: 199.99, image: 'assets/categories/men.jpg' }
    },
    { 
      id: 'woman', 
      title: 'FEMMES', 
      icon: <Users className="w-12 h-12" />, 
      stats: 'COLLECTION ÉLITE',
      desc: 'Équipement technique conçu pour l\'aventure.',
      color: 'bg-rose-500/5',
      borderColor: 'border-gray-200',
      accent: 'text-rose-600',
      image: 'assets/categories/women.jpg',
      product: { id: 'womens-gear', name: 'Pack Aventure Femme', price: 199.99, image: 'assets/categories/women.jpg' }
    },
    { 
      id: 'kids', 
      title: 'ENFANTS', 
      icon: <Baby className="w-12 h-12" />, 
      stats: 'RELÈVE OUTDOOR',
      desc: 'Préparer la prochaine génération de passionnés.',
      color: 'bg-orange-500/5',
      borderColor: 'border-gray-200',
      accent: 'text-orange-600',
      image: 'assets/categories/kids.jpg',
      product: { id: 'kids-gear', name: 'Kit Junior Explorateur', price: 99.99, image: 'assets/categories/kids.jpg' }
    },
    { 
      id: 'hunting', 
      title: 'CHASSE', 
      icon: <Crosshair className="w-12 h-12" />, 
      stats: 'PRÉCISION ÉLITE',
      desc: 'Maîtrisez le terrain avec nos équipements de pointe.',
      color: 'bg-emerald-500/5',
      borderColor: 'border-gray-200',
      accent: 'text-ecotone-green',
      image: 'assets/categories/hunting.jpg',
      product: { id: 'hunting-kit-pro', name: 'KIT CHASSE ÉLITE', price: 449.99, image: 'assets/categories/hunting.jpg' }
    },
    { 
      id: 'fishing', 
      title: 'PÊCHE', 
      icon: <Fish className="w-12 h-12" />, 
      stats: 'DOMINATION AQUATIQUE',
      desc: 'Expertise technique pour vos sorties sur l\'eau.',
      color: 'bg-cyan-500/5',
      borderColor: 'border-gray-200',
      accent: 'text-cyan-600',
      image: 'assets/categories/fishing.jpg',
      product: { id: 'fishing-kit-pro', name: 'KIT PÊCHE PRO', price: 299.99, image: 'assets/categories/fishing.jpg' }
    }
  ];

  return (
    <section className="bg-white py-24 px-6 border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1C19] uppercase tracking-tighter mb-4 leading-none font-oswald">
              NOS <span className="text-ecotone-green">CATÉGORIES</span>
            </h2>
            <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">Équipe d'experts Plein Air Gatineau</p>
          </div>
          <div className="flex gap-4 self-center md:self-end">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 border border-gray-100 rounded-full">
               <MapPin className="w-3 h-3 text-ecotone-green" />
               <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">OUTAOUAIS AUTHENTIQUE</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div 
               key={cat.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               onClick={() => addItem(cat.product)}
               className={`group relative overflow-hidden aspect-[4/5] border ${cat.borderColor} cursor-pointer hover:shadow-2xl transition-all duration-700 rounded-2xl`}
            >
               {/* Background Image */}
               <div className="absolute inset-0 z-0">
                  <img src={cat.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={cat.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C19] via-[#1A1C19]/20 to-transparent" />
               </div>

               <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white">
                       {cat.icon}
                    </div>
                    <span className="text-[10px] font-black text-white/60 tracking-widest uppercase">{cat.stats}</span>
                 </div>
                 
                 <h3 className="text-4xl font-black text-white mb-2 uppercase font-oswald tracking-tight">{cat.title}</h3>
                 <p className="text-white/70 text-sm max-w-[200px] mb-6 leading-relaxed font-semibold">{cat.desc}</p>
                 
                 <div className="flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                    Magasiner <span className="text-ecotone-green text-lg">→</span>
                 </div>
               </div>

               {/* Geometric Accent */}
               <div className="absolute bottom-0 left-0 w-full h-1.5 bg-ecotone-green transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
