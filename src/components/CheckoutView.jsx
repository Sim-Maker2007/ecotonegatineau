import React from 'react';

export const CheckoutView = ({ cart, cartTotal, onBack, onCompleteOrder }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <h1 className="text-3xl font-black uppercase italic tracking-tighter">Caisse sécurisée</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border dark:border-zinc-800 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-green-100 dark:bg-green-900/30 text-green-600 p-1 rounded">1</span>
              Informations de contact
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-500">Prénom</label>
                <input type="text" className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Jean" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-500">Nom</label>
                <input type="text" className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Tremblay" />
              </div>
              <div className="sm:col-span-2 space-y-1">
                <label className="text-sm font-medium text-zinc-500">Courriel</label>
                <input type="email" className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" placeholder="jean.tremblay@email.com" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border dark:border-zinc-800 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-green-100 dark:bg-green-900/30 text-green-600 p-1 rounded">2</span>
              Mode de livraison
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <label className="flex items-center p-4 border-2 border-green-600 rounded-xl bg-green-50 dark:bg-green-900/10 cursor-pointer">
                <input type="radio" name="delivery" defaultChecked className="text-green-600 focus:ring-green-500 h-4 w-4" />
                <div className="ml-4">
                  <p className="font-bold">Ramassage en magasin (Gratuit)</p>
                  <p className="text-sm text-zinc-500">Votre commande sera prête sous 24h au 100, St-Jude Nord.</p>
                </div>
              </label>
              <label className="flex items-center p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-green-600 transition-colors cursor-pointer opacity-50 italic">
                <input type="radio" name="delivery" disabled className="text-green-600 h-4 w-4" />
                <div className="ml-4 text-zinc-400">
                  <p className="font-bold">Livraison à domicile (Indisponible)</p>
                  <p className="text-sm">Bientôt disponible pour la région de Gatineau.</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Summary Sticky Section */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border dark:border-zinc-800 shadow-lg sticky top-24">
            <h2 className="text-xl font-bold mb-6">Résumé de la commande</h2>
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex gap-3">
                    <span className="font-bold text-green-600">x{item.quantity}</span>
                    <span className="text-zinc-600 dark:text-zinc-300 truncate max-w-[120px]">{item.name}</span>
                  </div>
                  <span className="font-medium">{(item.price * item.quantity).toFixed(2)}$</span>
                </div>
              ))}
            </div>
            
            <div className="border-t dark:border-zinc-800 pt-4 space-y-2">
              <div className="flex justify-between text-zinc-500 text-sm">
                <span>Sous-total</span>
                <span>{cartTotal.toFixed(2)}$</span>
              </div>
              <div className="flex justify-between text-zinc-500 text-sm">
                <span>Taxes (estimées)</span>
                <span>{(cartTotal * 0.14975).toFixed(2)}$</span>
              </div>
              <div className="flex justify-between text-xl font-black mt-4 pt-4 border-t dark:border-zinc-800">
                <span>TOTAL</span>
                <span className="text-green-600">{(cartTotal * 1.14975).toFixed(2)}$</span>
              </div>
            </div>

            <button 
              onClick={onCompleteOrder}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl mt-8 shadow-lg transition-all active:scale-95 uppercase"
            >
              Commander maintenant
            </button>
            <p className="text-[10px] text-center text-zinc-400 mt-4 uppercase tracking-widest">
              Paiement sécurisé par Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
