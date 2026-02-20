import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Truck, MapPin } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { useLang } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ALL_PRODUCTS } from '../data/products';

const BASE = 'https://ecotone-gatineau.vercel.app';

export default function ProductDetail() {
  const { id } = useParams();
  const { lang, t } = useLang();
  const { addToCart } = useCart();
  const product = useMemo(() => ALL_PRODUCTS.find(p => p.id === parseInt(id)), [id]);

  if (!product) return (
    <div className="py-20 text-center min-h-screen">
      <p className="text-gray-400">{lang === 'fr' ? 'Produit introuvable' : 'Product not found'}</p>
      <Link to="/boutique" className="text-ecotone-green text-sm mt-4 inline-block hover:underline">{t.common.back}</Link>
    </div>
  );

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ecotone Gatineau', item: BASE },
      { '@type': 'ListItem', position: 2, name: lang === 'fr' ? 'Boutique' : 'Shop', item: `${BASE}/boutique` },
      { '@type': 'ListItem', position: 3, name: t.categories[product.category], item: `${BASE}/boutique/${product.category}` },
      { '@type': 'ListItem', position: 4, name: lang === 'fr' ? product.name : product.nameEn }
    ]
  };

  return (
    <>
      <SEOHead page="product" product={product} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <section className="py-8 min-h-screen">
        <div className="max-w-5xl mx-auto px-4">
          <Breadcrumbs items={[
            { label: lang === 'fr' ? 'Accueil' : 'Home', href: '/' },
            { label: lang === 'fr' ? 'Boutique' : 'Shop', href: '/boutique' },
            { label: t.categories[product.category], href: `/boutique/${product.category}` },
            { label: lang === 'fr' ? product.name : product.nameEn, active: true }
          ]} />
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-100 max-w-md">
              <img src={product.image} className="w-full h-full object-cover" alt={lang === 'fr' ? product.name : product.nameEn} />
            </div>
            <div className="space-y-5">
              <div>
                <p className="text-[10px] font-medium text-ecotone-green uppercase tracking-wider mb-1.5">{t.categories[product.category]}</p>
                <h1 className="text-xl lg:text-2xl font-bold font-oswald uppercase text-gray-900 leading-tight">{lang === 'fr' ? product.name : product.nameEn}</h1>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-xl font-bold text-ecotone-dark">${product.price.toFixed(2)}</p>
                  {product.originalPrice && <p className="text-gray-300 text-sm line-through">${product.originalPrice.toFixed(2)}</p>}
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{lang === 'fr' ? product.desc : (product.descEn || product.desc)}</p>
              <button onClick={() => addToCart(product)} className="w-full bg-ecotone-dark text-white py-3.5 rounded-lg font-semibold uppercase tracking-wider hover:bg-ecotone-green transition-colors text-xs">{t.cart.add}</button>
              <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-5">
                <div>
                  <h4 className="text-[10px] font-semibold uppercase tracking-wider mb-3 text-ecotone-dark">{t.product.specs}</h4>
                  <ul className="space-y-1.5 text-xs text-gray-400">
                    {(product.specs || []).map((s, i) => <li key={i} className="flex items-center gap-1.5"><span className="w-1 h-1 bg-ecotone-green rounded-full"></span>{s}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-semibold uppercase tracking-wider mb-3 text-ecotone-dark">Service</h4>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-ecotone-green" />{t.product.shipping}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-1.5"><MapPin className="w-3.5 h-3.5 text-ecotone-green" />{t.product.inStock}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
