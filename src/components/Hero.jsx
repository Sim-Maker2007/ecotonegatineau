import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      <img
        src="/assets/hero-hunting.jpg"
        alt="Hunter overlooking mountain landscape at sunset"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <motion.button
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
          onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-ecotone-dark px-7 py-2.5 rounded-full font-semibold uppercase tracking-[0.1em] hover:scale-105 transition-all text-xs"
        >
          {t.hero.cta}
        </motion.button>
      </div>
    </section>
  );
}
