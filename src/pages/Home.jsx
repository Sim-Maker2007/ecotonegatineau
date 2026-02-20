import SEOHead from '../components/SEOHead';
import Hero from '../components/Hero';
import TrustBadges from '../components/TrustBadges';
import Categories from '../components/Categories';
import Promos from '../components/Promos';
import ProductCard from '../components/ProductCard';
import BlogSection from '../components/BlogSection';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import { useLang } from '../context/LanguageContext';
import { ALL_PRODUCTS } from '../data/products';
import { Link } from 'react-router-dom';

export default function Home() {
  const { t } = useLang();
  return (
    <>
      <SEOHead page="home" />
      <Hero />
      <TrustBadges />
      <Categories />
      <Promos />

      {/* Best Sellers */}
      <section className="py-8 bg-gray-50/60 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold font-oswald uppercase tracking-tight">{t.sections.sellers}</h2>
            <Link to="/boutique" className="text-ecotone-green font-medium text-[11px] uppercase tracking-wider cursor-pointer hover:underline">{t.common.viewAll}</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">
            {ALL_PRODUCTS.slice(0, 5).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <BlogSection />
      <Services />
      <Testimonials />
    </>
  );
}
