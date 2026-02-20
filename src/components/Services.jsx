import { Target, Anchor, ShieldCheck, Map } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { SERVICES } from '../data/categories';

const iconMap = { Target, Anchor, ShieldCheck, Map };

export default function Services() {
  const { lang } = useLang();
  return (
    <section id="services" className="py-8 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-lg font-bold font-oswald uppercase tracking-tight mb-5">Services <span className="text-ecotone-green">Pro</span></h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {SERVICES.map(service => {
            const Icon = iconMap[service.icon];
            return (
              <div key={service.id} className="service-card bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md group">
                <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-ecotone-green mb-3 group-hover:bg-ecotone-green group-hover:text-white transition-colors">
                  {Icon && <Icon className="w-4 h-4" />}
                </div>
                <h3 className="text-sm font-bold font-oswald uppercase mb-1">{lang === 'fr' ? service.title : service.titleEn}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{lang === 'fr' ? service.desc : service.descEn}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
