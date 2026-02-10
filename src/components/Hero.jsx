import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="hero-video-container">
      <video autoPlay loop muted playsInline><source src="/assets/ecotone-hero-upscaled.mp4" type="video/mp4" /></video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-white text-4xl md:text-6xl font-extrabold font-oswald leading-none mb-5 italic tracking-tighter"
        >
          {t.hero.title} <span className="text-ecotone-green">{t.hero.subtitle}</span>
        </motion.h1>
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
