import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { CATEGORIES } from '../data/categories';

export default function Categories() {
  const { t } = useLang();
  return (
    <section id="categories" className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {CATEGORIES.map(c => (
            <Link key={c.id} to={`/boutique/${c.id}`} className="cat-card relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group">
              <img src={c.img} className="absolute inset-0 w-full h-full object-cover" alt={t.categories[c.key]} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-0 flex items-end justify-center pb-3">
                <h3 className="text-white text-[11px] font-semibold uppercase font-oswald tracking-wider">{t.categories[c.key]}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
