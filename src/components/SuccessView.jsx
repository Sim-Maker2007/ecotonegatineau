import React from 'react';

const SuccessView = ({ onBackHome }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-500">
      <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-2 italic">Commande Reçue!</h1>
      <p className="text-zinc-500 dark:text-zinc-400 max-w-md mb-8">
        Merci Simon! Votre équipement est en cours de préparation. Vous recevrez un SMS dès qu'il sera prêt au magasin de Gatineau.
      </p>
      <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl mb-8 w-full max-w-sm border dark:border-zinc-800">
        <p className="text-xs uppercase tracking-widest text-zinc-400 mb-1">Numéro de commande</p>
        <p className="font-mono text-lg font-bold">#ECO-{Math.floor(1000 + Math.random() * 9000)}-GTN</p>
      </div>
      <button 
        onClick={onBackHome}
        className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition-all active:scale-95 shadow-lg"
      >
        Continuer le magasinage
      </button>
    </div>
  );
};

export default SuccessView;
