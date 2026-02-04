import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, creditCard, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../data/cartStore';

export const CheckoutView = ({ onBack }) => {
  const { items, getTotal } = useCartStore();
  const { subtotal, shipping, tax, total } = getTotal();

  return (
    <div className="min-h-screen bg-[#050804] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12">
        
        {/* Left: Form */}
        <div className="lg:col-span-7 space-y-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/40 hover:text-[#8BC34A] transition-colors text-[10px] font-black uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Retour au Hangar
          </button>

          <section className="space-y-6">
            <h2 className="text-3xl font-black italic uppercase text-white font-oswald tracking-tighter">Coordination Logistique</h2>
            <div className="grid md:grid-cols-2 gap-4">
               <input type="text" placeholder="PRÉNOM" className="bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#8BC34A] transition-all font-bold placeholder:text-white/20 uppercase text-xs" />
               <input type="text" placeholder="NOM DE FAMILLE" className="bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#8BC34A] transition-all font-bold placeholder:text-white/20 uppercase text-xs" />
               <input type="email" placeholder="UNITÉ EMAIL" className="md:col-span-2 bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#8BC34A] transition-all font-bold placeholder:text-white/20 uppercase text-xs" />
               <input type="text" placeholder="ADRESSE DE DÉPLOIEMENT" className="md:col-span-2 bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#8BC34A] transition-all font-bold placeholder:text-white/20 uppercase text-xs" />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black italic uppercase text-white font-oswald tracking-tighter text-white">Sécurisation Mission</h2>
            <div className="bg-white/5 border border-[#8BC34A]/30 p-8 rounded-2xl space-y-6">
               <div className="flex items-center gap-4 text-[#8BC34A]">
                  <ShieldCheck className="w-6 h-6" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Transaction Chiffrée Pro-Grade</span>
               </div>
               <div className="flex items-center gap-4 bg-white/5 p-4 border border-white/10 rounded-xl">
                  <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center">💳</div>
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="bg-transparent border-none outline-none text-white font-mono flex-1" />
               </div>
            </div>
          </section>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-5">
           <div className="sticky top-40 bg-[#0d0f0c] border border-white/10 p-8 rounded-3xl space-y-8 shadow-2xl">
              <h3 className="text-xl font-black italic uppercase text-white tracking-widest font-oswald">Résumé de Mission</h3>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 hide-scrollbar">
                 {items.map(item => (
                   <div key={item.id} className="flex justify-between items-center text-xs">
                     <span className="text-white/60 font-medium italic uppercase">{item.quantity}x {item.name}</span>
                     <span className="text-white font-black">${(item.price * item.quantity).toFixed(2)}</span>
                   </div>
                 ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-white/10">
                 <div className="flex justify-between text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                    <span>Standard Logistique</span>
                    <span className="text-white">${shipping.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                    <span>Taxes (QC)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-baseline pt-4">
                    <span className="text-lg font-black italic uppercase text-white">Total Final</span>
                    <span className="text-4xl font-black text-[#8BC34A] font-oswald italic tracking-tighter">${total.toFixed(2)}</span>
                 </div>
              </div>

              <button className="w-full bg-[#8BC34A] text-black font-black uppercase tracking-[0.3em] py-6 shadow-2xl shadow-[#8BC34A]/20 active:scale-95 transition-all">
                DÉPLOYER LA COMMANDE
              </button>

              <div className="flex items-center justify-center gap-6 opacity-30 mt-8">
                 <Truck className="w-5 h-5" />
                 <CheckCircle className="w-5 h-5" />
                 <ShieldCheck className="w-5 h-5" />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
