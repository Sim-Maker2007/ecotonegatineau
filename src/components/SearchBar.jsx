import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { ALL_PRODUCTS } from '../data/products';
import { BLOG_POSTS } from '../data/blog';

export default function SearchBar() {
  const { lang, t } = useLang();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);

  const results = query.length >= 2 ? [
    ...ALL_PRODUCTS.filter(p => {
      const q = query.toLowerCase();
      return (p.name.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q) || p.category.includes(q));
    }).slice(0, 3).map(p => ({ type: 'product', id: p.id, title: lang === 'fr' ? p.name : p.nameEn, img: p.image, href: `/produit/${p.id}`, sub: t.categories[p.category] || p.category })),
    ...BLOG_POSTS.filter(p => {
      const q = query.toLowerCase();
      return (p.title.toLowerCase().includes(q) || p.titleEn.toLowerCase().includes(q) || p.blogCat.includes(q));
    }).slice(0, 3).map(p => ({ type: 'blog', id: p.id, title: lang === 'fr' ? p.title : p.titleEn, img: p.img, href: `/intel/${p.slug}`, sub: t.blog[p.blogCat] || p.blogCat }))
  ] : [];

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); } };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (href) => {
    setOpen(false);
    setQuery('');
    navigate(href);
  };

  return (
    <div ref={ref} className="relative">
      {!open ? (
        <button onClick={() => setOpen(true)} className="text-gray-400 hover:text-ecotone-green transition-colors" aria-label="Search">
          <Search className="w-4.5 h-4.5" />
        </button>
      ) : (
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-2.5 py-1.5 border border-gray-200">
          <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') { setOpen(false); setQuery(''); } }}
            placeholder={lang === 'fr' ? 'Rechercher...' : 'Search...'}
            className="bg-transparent text-xs text-ecotone-dark outline-none w-32 md:w-48 placeholder:text-gray-400"
          />
          <button onClick={() => { setOpen(false); setQuery(''); }} className="text-gray-400 hover:text-ecotone-dark">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {open && query.length >= 2 && (
        <div className="absolute top-full mt-2 right-0 w-72 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-[99999999]">
          {results.length === 0 ? (
            <div className="p-4 text-center text-xs text-gray-400">
              {lang === 'fr' ? 'Aucun résultat' : 'No results'}
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {results.map(r => (
                <button key={`${r.type}-${r.id}`} onClick={() => handleSelect(r.href)} className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0">
                  <img src={r.img} className="w-10 h-10 rounded object-cover flex-shrink-0 bg-gray-100" alt="" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-ecotone-dark line-clamp-1">{r.title}</p>
                    <p className="text-[9px] text-gray-400 uppercase tracking-wider">{r.type === 'product' ? (lang === 'fr' ? 'Produit' : 'Product') : 'Intel'} · {r.sub}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
