import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const PROMOS = [
  {
    id: 1,
    titleFr: 'Équipement de Chasse',
    titleEn: 'Hunting Gear',
    descFr: 'Tout pour votre prochaine saison',
    descEn: 'Everything for your next season',
    img: '/assets/categories/hunting.jpg',
    href: '/boutique/hunting'
  },
  {
    id: 2,
    titleFr: 'Collection Pêche',
    titleEn: 'Fishing Collection',
    descFr: 'Cannes, leurres et accessoires',
    descEn: 'Rods, lures and accessories',
    img: '/assets/categories/fishing.jpg',
    href: '/boutique/fishing'
  }
];

export default function Promos() {
  const { lang } = useLang();
  return (
    <section className="py-6 bg-gray-100/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-3">
          {PROMOS.map(p => (
            <Link key={p.id} to={p.href} className="relative rounded-lg overflow-hidden aspect-[5/2] group cursor-pointer">
              <img src={p.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={lang === 'fr' ? p.titleFr : p.titleEn} loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-ecotone-dark/80 via-ecotone-dark/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center pl-6 md:pl-8">
                <h3 className="text-white text-lg md:text-xl font-bold font-oswald uppercase leading-tight">{lang === 'fr' ? p.titleFr : p.titleEn}</h3>
                <p className="text-white/70 text-xs mt-1">{lang === 'fr' ? p.descFr : p.descEn}</p>
                <span className="flex items-center gap-1 text-ecotone-green text-[10px] font-semibold uppercase tracking-wider mt-3 group-hover:gap-2 transition-all">
                  {lang === 'fr' ? 'Magasiner' : 'Shop Now'} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
