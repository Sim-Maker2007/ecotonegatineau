import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

export default function ProductCard({ product }) {
  const { lang } = useLang();
  return (
    <Link to={`/produit/${product.id}`} className="product-card bg-white p-2.5 rounded-lg border border-gray-100 cursor-pointer group block">
      <div className="relative aspect-square rounded-md overflow-hidden mb-2.5 bg-gray-50">
        <img src={product.image} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" alt={lang === 'fr' ? product.name : product.nameEn} />
        {product.originalPrice && (
          <div className="absolute top-1.5 left-1.5 bg-ecotone-green text-white text-[9px] font-semibold px-2 py-0.5 rounded">
            {lang === 'fr' ? 'Promo' : 'Sale'}
          </div>
        )}
      </div>
      <h3 className="font-medium text-xs text-ecotone-dark line-clamp-2 leading-snug mb-1">{lang === 'fr' ? product.name : product.nameEn}</h3>
      <div className="flex gap-1.5 items-baseline">
        <span className="text-ecotone-dark font-bold text-sm">${product.price.toFixed(2)}</span>
        {product.originalPrice && <span className="text-gray-300 text-[10px] line-through">${product.originalPrice.toFixed(2)}</span>}
      </div>
    </Link>
  );
}
