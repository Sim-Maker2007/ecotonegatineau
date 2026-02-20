import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Facebook, Mail, Share2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import { useLang } from '../context/LanguageContext';
import { BLOG_POSTS } from '../data/blog';
import { ALL_PRODUCTS } from '../data/products';

const BASE = 'https://ecotone-gatineau.vercel.app';

const BLOG_TO_PRODUCT = { hunting: 'hunting', fishing: 'fishing', hiking: 'winter', camping: 'winter' };

export default function BlogPost() {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const post = useMemo(() => BLOG_POSTS.find(p => p.slug === slug), [slug]);

  if (!post) return (
    <div className="py-20 text-center min-h-screen">
      <p className="text-gray-400">{lang === 'fr' ? 'Article introuvable' : 'Post not found'}</p>
      <Link to="/" className="text-ecotone-green text-sm mt-4 inline-block hover:underline">{t.common.back}</Link>
    </div>
  );

  const title = lang === 'fr' ? post.title : post.titleEn;
  const shareUrl = `https://ecotone-gatineau.vercel.app/intel/${post.slug}`;
  const relatedPosts = BLOG_POSTS.filter(p => p.blogCat === post.blogCat && p.id !== post.id).slice(0, 3);
  const relatedProducts = ALL_PRODUCTS.filter(p => p.category === BLOG_TO_PRODUCT[post.blogCat]).slice(0, 4);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ecotone Gatineau', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Outdoor Intel', item: `${BASE}/intel` },
      { '@type': 'ListItem', position: 3, name: title }
    ]
  };

  return (
    <>
      <SEOHead page="intel" post={post} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <article className="py-8 bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-4">
          <Breadcrumbs items={[
            { label: lang === 'fr' ? 'Accueil' : 'Home', href: '/' },
            { label: 'Intel', href: '/#intel' },
            { label: t.blog[post.blogCat] || post.blogCat },
            { label: title, active: true }
          ]} />
          <img src={post.img} className="w-full aspect-video object-cover rounded-lg mb-6" alt={title} />
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-ecotone-green/10 text-ecotone-green">{t.blog[post.blogCat] || post.blogCat}</span>
            <span className="text-[10px] font-medium text-gray-400 tracking-wider uppercase">{post.date}</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-oswald uppercase text-ecotone-dark leading-tight mb-5">{title}</h1>
          <div className="text-gray-600 leading-relaxed text-sm space-y-4">
            {(lang === 'fr' ? post.content : post.contentEn).split('\n\n').map((paragraph, i) => (
              <p key={i} className={i === 0 ? "border-l-[3px] border-ecotone-green pl-4 py-2 bg-gray-50 rounded-r-lg text-gray-700 font-medium" : ""}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{lang === 'fr' ? 'Partager' : 'Share'}</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-ecotone-green hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href={`https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-ecotone-green hover:text-white transition-colors" aria-label="WhatsApp">
              <Share2 className="w-3.5 h-3.5" />
            </a>
            <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-ecotone-green hover:text-white transition-colors" aria-label="Email">
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-xs text-gray-400 mt-6">— Équipe Ecotone Gatineau</p>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="max-w-5xl mx-auto px-4 mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-lg font-bold font-oswald uppercase tracking-tight mb-4">{lang === 'fr' ? 'Produits Connexes' : 'Related Products'}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-5xl mx-auto px-4 mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-lg font-bold font-oswald uppercase tracking-tight mb-4">{lang === 'fr' ? 'Articles Connexes' : 'Related Posts'}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {relatedPosts.map(p => (
                <Link key={p.id} to={`/intel/${p.slug}`} className="group">
                  <div className="aspect-[3/2] rounded-lg overflow-hidden bg-gray-100 mb-2">
                    <img src={p.img} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={lang === 'fr' ? p.title : p.titleEn} />
                  </div>
                  <span className="text-[8px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{t.blog[p.blogCat] || p.blogCat}</span>
                  <h4 className="text-[11px] font-semibold text-ecotone-dark group-hover:text-ecotone-green transition-colors line-clamp-2 leading-tight mt-1">{lang === 'fr' ? p.title : p.titleEn}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
