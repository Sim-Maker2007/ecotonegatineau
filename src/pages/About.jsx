import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useLang } from '../context/LanguageContext';

export default function About() {
  const { t } = useLang();
  return (
    <>
      <SEOHead page="about" />
      <section className="py-10 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/" className="text-[10px] font-medium uppercase text-gray-400 hover:text-ecotone-green flex items-center gap-1.5 mb-6 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> {t.common.back}
          </Link>
          <h1 className="text-2xl font-bold font-oswald uppercase tracking-tight mb-6">{t.about.title}</h1>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-lg overflow-hidden aspect-[4/3] bg-gray-100">
              <img src="/assets/store-front.jpg" className="w-full h-full object-cover" alt="Ecotone Gatineau Storefront" />
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">{t.about.p1}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{t.about.p2}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { num: '600+', label: t.about.stats.brands },
              { num: '4', label: t.about.stats.services }
            ].map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold font-oswald text-ecotone-green">{s.num}</p>
                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-ecotone-dark rounded-lg p-6 text-center">
            <h3 className="text-white font-bold font-oswald uppercase text-lg mb-2">{t.about.mission}</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto">{t.about.missionText}</p>
          </div>
        </div>
      </section>
    </>
  );
}
