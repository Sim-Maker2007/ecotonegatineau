import { Star, Quote } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { TESTIMONIALS } from '../data/testimonials';

export default function Testimonials() {
  const { lang } = useLang();
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-lg font-bold font-oswald uppercase tracking-tight mb-5">{lang === 'fr' ? 'Ce que nos clients disent' : 'What Our Customers Say'}</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {TESTIMONIALS.slice(0, 3).map(t => (
            <div key={t.id} className="bg-white rounded-lg p-5 border border-gray-100 relative">
              <Quote className="w-6 h-6 text-ecotone-green/20 absolute top-4 right-4" />
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-ecotone-green text-ecotone-green" />)}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 italic">"{lang === 'fr' ? t.fr : t.en}"</p>
              <div>
                <p className="text-xs font-bold text-ecotone-dark">{t.author}</p>
                <p className="text-[10px] text-gray-400">{lang === 'fr' ? t.roleFr : t.roleEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
