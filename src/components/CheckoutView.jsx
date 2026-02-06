import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, creditCard, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../data/cartStore';

export const CheckoutView = ({ onBack }) => {
  const { items, getTotal } = useCartStore();
  const { subtotal, shipping, tax, total } = getTotal();

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12">
        
        {/* Left: Form */}
        <div className="lg:col-span-7 space-y-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-ecotone-green transition-colors text-[10px] font-black uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Retour à la boutique
          </button>

          <section className="space-y-6">
            <h2 className="text-3xl font-black uppercase text-[#1A1C19] font-oswald tracking-tighter">Informations de Livraison</h2>
            <div className="grid md:grid-cols-2 gap-4">
               <input type="text" placeholder="PRÉNOM" className="bg-white border border-gray-100 p-4 rounded-xl text-[#1A1C19] outline-none focus:border-ecotone-green transition-all font-bold placeholder:text-gray-300 uppercase text-xs" />
               <input type="text" placeholder="NOM DE FAMILLE" className="bg-white border border-gray-100 p-4 rounded-xl text-[#1A1C19] outline-none focus:border-ecotone-green transition-all font-bold placeholder:text-gray-300 uppercase text-xs" />
               <input type="email" placeholder="EMAIL" className="md:col-span-2 bg-white border border-gray-100 p-4 rounded-xl text-[#1A1C19] outline-none focus:border-ecotone-green transition-all font-bold placeholder:text-gray-300 uppercase text-xs" />
               <input type="text" placeholder="ADRESSE DE LIVRAISON" className="md:col-span-2 bg-white border border-gray-100 p-4 rounded-xl text-[#1A1C19] outline-none focus:border-ecotone-green transition-all font-bold placeholder:text-gray-300 uppercase text-xs" />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black uppercase text-[#1A1C19] font-oswald tracking-tighter">Paiement Sécurisé</h2>
            <div className="bg-white border border-gray-100 p-8 rounded-2xl space-y-6 shadow-sm">
               <div className="flex items-center gap-4 text-ecotone-green">
                  <ShieldCheck className="w-6 h-6" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Transaction Sécurisée SSL</span>
               </div>
               <div className="flex items-center gap-4 bg-gray-50 p-4 border border-gray-100 rounded-xl">
                  <div className="w-10 h-10 bg-white border border-gray-100 rounded flex items-center justify-center">💳</div>
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="bg-transparent border-none outline-none text-[#1A1C19] font-mono flex-1" />
               </div>
            </div>
          </section>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-5">
           <div className="sticky top-40 bg-white border border-gray-100 p-8 rounded-3xl space-y-8 shadow-xl">
              <h3 className="text-xl font-black uppercase text-[#1A1C19] tracking-widest font-oswald">Résumé de la Commande</h3>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 hide-scrollbar">
                 {items.map(item => (
                   <div key={item.id} className="flex justify-between items-center text-xs">
                     <span className="text-gray-600 font-bold uppercase">{item.quantity}x {item.name}</span>
                     <span className="text-[#1A1C19] font-black">${(item.price * item.quantity).toFixed(2)}</span>
                   </div>
                 ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-gray-100">
                 <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    <span>Livraison Standard</span>
                    <span className="text-[#1A1C19]">${shipping.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    <span>Taxes (QC)</span>
                    <span className="text-[#1A1C19]">${tax.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-baseline pt-4">
                    <span className="text-lg font-black uppercase text-[#1A1C19]">Total Final</span>
                    <span className="text-4xl font-black text-ecotone-green font-oswald tracking-tighter">${total.toFixed(2)}</span>
                 </div>
              </div>

              <button className="w-full bg-ecotone-green text-white font-black uppercase tracking-[0.2em] py-6 shadow-xl shadow-ecotone-green/20 active:scale-95 transition-all rounded-xl">
                CONFIRMER LA COMMANDE
              </button>

              <div className="flex items-center justify-center gap-6 opacity-30 mt-8 text-[#1A1C19]">
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
