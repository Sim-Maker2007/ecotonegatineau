import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { CATEGORIES } from '../data/categories';

export default function Categories() {
  const { t } = useLang();
  return (
    <section id="categories" className="py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {CATEGORIES.map(c => (
            <Link key={c.id} to={`/boutique/${c.id}`} className="cat-card relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <img src={c.img} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={t.categories[c.key]} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-ecotone-green/80 group-hover:via-ecotone-green/20 transition-all duration-500" />
              <div className="absolute inset-0 flex items-end justify-center pb-3">
                <h3 className="text-white text-[11px] font-semibold uppercase font-oswald tracking-wider translate-y-0.5 group-hover:translate-y-0 transition-transform duration-300">{t.categories[c.key]}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
