import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, ShoppingBag, BookOpen } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export default function NotFound() {
  const { lang } = useLang();
  return (
    <>
    <Helmet>
      <title>{lang === 'fr' ? '404 — Page Introuvable | Ecotone Gatineau' : '404 — Page Not Found | Ecotone Gatineau'}</title>
      <meta name="robots" content="noindex, follow" />
    </Helmet>
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-extrabold font-oswald text-ecotone-green leading-none mb-2">404</p>
        <h1 className="text-xl font-bold font-oswald uppercase text-ecotone-dark mb-3">
          {lang === 'fr' ? 'Page introuvable' : 'Page Not Found'}
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          {lang === 'fr'
            ? "La page que vous cherchez n'existe pas ou a été déplacée."
            : "The page you're looking for doesn't exist or has been moved."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="flex items-center justify-center gap-2 bg-ecotone-dark text-white px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-ecotone-green transition-colors">
            <Home className="w-3.5 h-3.5" />
            {lang === 'fr' ? 'Accueil' : 'Home'}
          </Link>
          <Link to="/boutique" className="flex items-center justify-center gap-2 bg-gray-100 text-ecotone-dark px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-gray-200 transition-colors">
            <ShoppingBag className="w-3.5 h-3.5" />
            {lang === 'fr' ? 'Boutique' : 'Shop'}
          </Link>
          <Link to="/#intel" className="flex items-center justify-center gap-2 bg-gray-100 text-ecotone-dark px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-gray-200 transition-colors">
            <BookOpen className="w-3.5 h-3.5" />
            Intel
          </Link>
        </div>
      </div>
    </section>
    </>
  );
}
