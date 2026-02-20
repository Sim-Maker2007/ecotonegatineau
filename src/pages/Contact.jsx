import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useLang } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLang();
  return (
    <>
      <SEOHead page="contact" />
      <section className="py-10 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/" className="text-[10px] font-medium uppercase text-gray-400 hover:text-ecotone-green flex items-center gap-1.5 mb-6 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> {t.common.back}
          </Link>
          <h1 className="text-2xl font-bold font-oswald uppercase tracking-tight mb-6">{t.contact.title}</h1>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-bold font-oswald uppercase mb-3">{t.contact.info}</h3>
                <div className="space-y-2.5 text-sm text-gray-600">
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-ecotone-green flex-shrink-0" /> 79 Boul. de la Gappe #4, Gatineau, QC J8T 0B5</p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-ecotone-green flex-shrink-0" /> (819) 243-6665</p>
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-ecotone-green flex-shrink-0" /> info@ecotonegatineau.com</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-bold font-oswald uppercase mb-3">{t.contact.hours}</h3>
                <div className="space-y-1.5 text-sm text-gray-600">
                  <div className="flex justify-between"><span>{t.contact.monWed}</span><span className="font-semibold">10h - 18h</span></div>
                  <div className="flex justify-between"><span>{t.contact.thuFri}</span><span className="font-semibold">10h - 20h</span></div>
                  <div className="flex justify-between"><span>{t.contact.saturday}</span><span className="font-semibold">9h - 17h</span></div>
                  <div className="flex justify-between"><span>{t.contact.sunday}</span><span className="font-semibold">10h - 17h</span></div>
                </div>
              </div>
              <div className="flex gap-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex-1 bg-ecotone-dark text-white py-2.5 rounded-lg text-center text-xs font-semibold uppercase tracking-wider hover:bg-ecotone-green transition-colors">Facebook</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex-1 bg-ecotone-dark text-white py-2.5 rounded-lg text-center text-xs font-semibold uppercase tracking-wider hover:bg-ecotone-green transition-colors">Instagram</a>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden bg-gray-100 min-h-[300px]">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.5!2d-75.6924!3d45.4851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce04e5c8f7c3f1%3A0x5b5e5f5c5c5c5c5c!2s79%20Boulevard%20de%20la%20Gappe%2C%20Gatineau%2C%20QC%20J8T%200B5!5e0!3m2!1sfr!2sca!4v1707000000000!5m2!1sfr!2sca" width="100%" height="100%" style={{ border: 0, minHeight: '300px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ecotone Gatineau Map"></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
