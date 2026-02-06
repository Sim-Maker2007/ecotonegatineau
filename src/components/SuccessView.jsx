import React from 'react';

const SuccessView = ({ onBackHome }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-500">
      <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 font-oswald text-[#1A1C19]">Commande Reçue!</h1>
      <p className="text-gray-500 max-w-md mb-8 font-semibold">
        Merci Simon! Votre équipement est en cours de préparation. Vous recevrez un courriel dès qu'il sera prêt au magasin de Gatineau.
      </p>
      <div className="bg-gray-50 p-4 rounded-xl mb-8 w-full max-w-sm border border-gray-100 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-bold">Numéro de commande</p>
        <p className="font-mono text-lg font-bold text-[#1A1C19]">#ECO-{Math.floor(1000 + Math.random() * 9000)}-GTN</p>
      </div>
      <button 
        onClick={onBackHome}
        className="bg-ecotone-green hover:bg-ecotone-green/90 text-white font-black uppercase tracking-widest px-8 py-4 rounded-xl transition-all active:scale-95 shadow-xl shadow-ecotone-green/20"
      >
        Continuer le magasinage
      </button>
    </div>
  );
};

export default SuccessView;
