import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import Newsletter from './Newsletter';
import StoreStatus from './StoreStatus';

export default function Footer() {
  const { lang, t } = useLang();
  return (
    <footer className="bg-ecotone-dark py-10 px-4">
      <Newsletter />
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-left text-gray-400">
        <div>
          <img src="/assets/ecotone-gatineau-logo-clean.png" className="h-7 mb-5 brightness-0 invert" alt="Ecotone" />
          <div className="space-y-2 text-xs">
            <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-ecotone-green flex-shrink-0" /> 79 Boul. de la Gappe #4, Gatineau</p>
            <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-ecotone-green flex-shrink-0" /> (819) 243-6665</p>
            <p className="flex items-center gap-2 text-ecotone-green"><Clock className="w-3.5 h-3.5 flex-shrink-0" /> Lun-Mer 10h-18h | Jeu-Ven 10h-20h | Sam 9h-17h | Dim 10h-17h</p>
            <div className="mt-2"><StoreStatus /></div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold uppercase mb-4 text-white text-[11px] tracking-wider">{t.common.shop}</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/boutique/hunting" className="hover:text-ecotone-green transition-colors">{t.categories.hunting}</Link></li>
            <li><Link to="/boutique/fishing" className="hover:text-ecotone-green transition-colors">{t.categories.fishing}</Link></li>
            <li><Link to="/boutique" className="hover:text-ecotone-green transition-colors">Catalogue</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold uppercase mb-4 text-white text-[11px] tracking-wider">Intel</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/intel" className="hover:text-ecotone-green transition-colors">{lang === 'fr' ? 'Trucs & Astuces' : 'Tips & Tricks'}</Link></li>
            <li><Link to="/intel" className="hover:text-ecotone-green transition-colors">{lang === 'fr' ? 'Zones de Pêche' : 'Fishing Zones'}</Link></li>
            <li><Link to="/intel" className="hover:text-ecotone-green transition-colors">{lang === 'fr' ? 'Guides Chasse' : 'Hunting Guides'}</Link></li>
            <li><Link to="/a-propos" className="hover:text-ecotone-green transition-colors">{t.nav.about}</Link></li>
            <li><Link to="/contact" className="hover:text-ecotone-green transition-colors">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-ecotone-green transition-colors">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold uppercase mb-4 text-white text-[11px] tracking-wider">Social</h4>
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-ecotone-green transition-colors cursor-pointer"><Facebook className="w-3.5 h-3.5" /></div>
            <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-ecotone-green transition-colors cursor-pointer"><Instagram className="w-3.5 h-3.5" /></div>
            <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-ecotone-green transition-colors cursor-pointer"><Youtube className="w-3.5 h-3.5" /></div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-5 border-t border-white/5 text-center text-[9px] text-gray-600 uppercase tracking-wider">
        &copy; 2026 Ecotone Gatineau — Built By Amara
      </div>
    </footer>
  );
}
