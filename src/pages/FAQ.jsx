import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLang } from '../context/LanguageContext';
import { FAQ_DATA } from '../data/faq';

const CATS = ['all', 'store', 'shipping', 'returns', 'products'];

const CAT_LABELS = {
  fr: { all: 'Tout', store: 'Magasin', shipping: 'Livraison', returns: 'Retours', products: 'Produits' },
  en: { all: 'All', store: 'Store', shipping: 'Shipping', returns: 'Returns', products: 'Products' }
};

export default function FAQ() {
  const { lang, t } = useLang();
  const [activeCat, setActiveCat] = useState('all');
  const [openId, setOpenId] = useState(null);

  const filtered = activeCat === 'all' ? FAQ_DATA : FAQ_DATA.filter(f => f.cat === activeCat);

  // FAQPage schema — Google can show these directly in search results
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map(faq => ({
      '@type': 'Question',
      name: lang === 'fr' ? faq.questionFr : faq.questionEn,
      acceptedAnswer: {
        '@type': 'Answer',
        text: lang === 'fr' ? faq.answerFr : faq.answerEn
      }
    }))
  };

  return (
    <>
      <SEOHead page="faq" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <section className="py-8 min-h-screen">
        <div className="max-w-3xl mx-auto px-4">
          <Breadcrumbs items={[
            { label: lang === 'fr' ? 'Accueil' : 'Home', href: '/' },
            { label: 'FAQ', active: true }
          ]} />

          <h1 className="text-2xl md:text-3xl font-bold font-oswald uppercase text-ecotone-dark mb-2">
            {lang === 'fr' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            {lang === 'fr' ? 'Trouvez rapidement les réponses à vos questions.' : 'Quickly find answers to your questions.'}
          </p>

          {/* Category Filters */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {CATS.map(c => (
              <button
                key={c}
                onClick={() => { setActiveCat(c); setOpenId(null); }}
                className={`text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors ${
                  activeCat === c ? 'bg-ecotone-dark text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {CAT_LABELS[lang][c]}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="space-y-2">
            {filtered.map(faq => (
              <div key={faq.id} className="border border-gray-100 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-ecotone-dark pr-4">
                    {lang === 'fr' ? faq.questionFr : faq.questionEn}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${openId === faq.id ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">
                        {lang === 'fr' ? faq.answerFr : faq.answerEn}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-10 text-center bg-gray-50 rounded-lg p-6">
            <p className="text-sm font-semibold text-ecotone-dark mb-1">
              {lang === 'fr' ? 'Vous ne trouvez pas votre réponse ?' : "Can't find your answer?"}
            </p>
            <p className="text-xs text-gray-400 mb-3">
              {lang === 'fr' ? 'Notre équipe est là pour vous aider.' : 'Our team is here to help.'}
            </p>
            <a href="tel:8192436665" className="inline-block bg-ecotone-dark text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-lg hover:bg-ecotone-green transition-colors">
              (819) 243-6665
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
