import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ProductCard from '../components/ProductCard';
import { useLang } from '../context/LanguageContext';
import { ALL_PRODUCTS } from '../data/products';

export default function Catalogue() {
  const { category } = useParams();
  const { t } = useLang();
  const filter = category || 'all';
  const filtered = useMemo(() => filter === 'all' ? ALL_PRODUCTS : ALL_PRODUCTS.filter(p => p.category === filter), [filter]);
  const title = filter === 'all' ? 'Catalogue' : (t.categories[filter] || filter);

  return (
    <>
      <SEOHead page="shop" />
      <section className="py-8 px-4 max-w-7xl mx-auto min-h-screen">
        <Link to="/" className="text-[10px] font-medium uppercase mb-4 flex items-center gap-1.5 text-gray-400 hover:text-ecotone-green transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> {t.common.back}
        </Link>
        <h2 className="text-xl font-bold font-oswald uppercase mb-5 tracking-tight">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}
