import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLang } from '../context/LanguageContext';
import { BLOG_POSTS } from '../data/blog';

export default function Intel() {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState('all');

  const filters = [
    { key: 'all', label: t.blog.all },
    { key: 'fishing', label: t.blog.fishing },
    { key: 'hunting', label: t.blog.hunting },
    { key: 'hiking', label: t.blog.hiking },
    { key: 'camping', label: t.blog.camping }
  ];

  const filtered = BLOG_POSTS.filter(p => filter === 'all' || p.blogCat === filter);

  return (
    <>
      <SEOHead page="intel" />
      <section className="py-8 min-h-screen">
        <div className="max-w-5xl mx-auto px-4">
          <Breadcrumbs items={[
            { label: lang === 'fr' ? 'Accueil' : 'Home', href: '/' },
            { label: 'Outdoor Intel' }
          ]} />

          <div className="flex items-center justify-between mb-6 mt-4">
            <h1 className="text-2xl font-bold font-oswald uppercase tracking-tight">Outdoor Intel</h1>
            <div className="flex gap-1.5 flex-wrap">
              {filters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded transition-colors ${filter === f.key ? 'bg-ecotone-green text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(post => (
              <Link key={post.id} to={`/intel/${post.slug}`} className="blog-card group cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={post.img} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={lang === 'fr' ? post.title : post.titleEn} />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[8px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{t.blog[post.blogCat] || post.blogCat}</span>
                    <span className="text-[9px] font-medium text-gray-400 tracking-wider uppercase">{post.date}</span>
                  </div>
                  <h2 className="text-sm font-bold text-ecotone-dark group-hover:text-ecotone-green transition-colors leading-tight">{lang === 'fr' ? post.title : post.titleEn}</h2>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">{(lang === 'fr' ? post.content : post.contentEn).split('\n\n')[0].slice(0, 120)}...</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
