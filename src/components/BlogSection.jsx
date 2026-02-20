import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { BLOG_POSTS } from '../data/blog';

function SmallCard({ post, lang, t }) {
  return (
    <Link to={`/intel/${post.slug}`} className="blog-card flex gap-3 group cursor-pointer items-start">
      <div className="w-20 h-14 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
        <img src={post.img} loading="lazy" className="w-full h-full object-cover" alt={lang === 'fr' ? post.title : post.titleEn} />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[7px] font-semibold uppercase tracking-wider px-1 py-0.5 rounded bg-gray-100 text-gray-500">{t.blog[post.blogCat] || post.blogCat}</span>
          <span className="text-[8px] font-medium text-gray-400 tracking-wider uppercase">{post.date}</span>
        </div>
        <h3 className="text-[10px] font-semibold text-ecotone-dark group-hover:text-ecotone-green transition-colors line-clamp-2 leading-tight">{lang === 'fr' ? post.title : post.titleEn}</h3>
      </div>
    </Link>
  );
}

export default function BlogSection() {
  const { lang, t } = useLang();
  const [blogFilter, setBlogFilter] = useState('all');

  const filters = [
    { key: 'all', label: t.blog.all },
    { key: 'fishing', label: t.blog.fishing },
    { key: 'hunting', label: t.blog.hunting },
    { key: 'hiking', label: t.blog.hiking },
    { key: 'camping', label: t.blog.camping }
  ];

  const filtered = BLOG_POSTS.filter(p => blogFilter === 'all' || p.blogCat === blogFilter);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section id="intel" className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-oswald uppercase tracking-tight">{t.sections.blog}</h2>
          <div className="flex gap-1.5 flex-wrap">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setBlogFilter(f.key)}
                className={`text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded transition-colors ${blogFilter === f.key ? 'bg-ecotone-green text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {featured && (
          <div className="grid lg:grid-cols-3 gap-3">
            {/* Featured large card */}
            <Link to={`/intel/${featured.slug}`} className="lg:col-span-2 blog-card group cursor-pointer relative rounded-lg overflow-hidden aspect-[2/1]">
              <img src={featured.img} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={lang === 'fr' ? featured.title : featured.titleEn} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[8px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/20 text-white backdrop-blur-sm">{t.blog[featured.blogCat] || featured.blogCat}</span>
                  <span className="text-[9px] font-medium text-white/70 tracking-wider uppercase">{featured.date}</span>
                </div>
                <h3 className="text-white text-base md:text-lg font-bold font-oswald uppercase leading-tight group-hover:text-ecotone-green transition-colors">{lang === 'fr' ? featured.title : featured.titleEn}</h3>
                <p className="text-white/60 text-xs mt-1.5 line-clamp-2 hidden md:block">{(lang === 'fr' ? featured.content : featured.contentEn).split('\n\n')[0].slice(0, 120)}...</p>
              </div>
            </Link>

            {/* Side stack of smaller cards */}
            <div className="flex flex-col gap-3 justify-between">
              {rest.slice(0, 4).map(post => (
                <SmallCard key={post.id} post={post} lang={lang} t={t} />
              ))}
            </div>
          </div>
        )}

        {/* Additional posts row */}
        {rest.length > 4 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
            {rest.slice(4).map(post => (
              <Link key={post.id} to={`/intel/${post.slug}`} className="blog-card flex flex-col gap-2 group cursor-pointer">
                <div className="aspect-[3/2] rounded-lg overflow-hidden bg-gray-100">
                  <img src={post.img} loading="lazy" className="w-full h-full object-cover" alt={lang === 'fr' ? post.title : post.titleEn} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{t.blog[post.blogCat] || post.blogCat}</span>
                  </div>
                  <h3 className="text-[11px] font-semibold text-ecotone-dark group-hover:text-ecotone-green transition-colors line-clamp-2 leading-tight mt-1">{lang === 'fr' ? post.title : post.titleEn}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
