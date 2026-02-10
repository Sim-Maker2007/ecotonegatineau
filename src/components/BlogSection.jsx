import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { BLOG_POSTS } from '../data/blog';

export default function BlogSection() {
  const { lang, t } = useLang();
  const [blogFilter, setBlogFilter] = useState('all');
  
  const filters = [
    { key: 'all', label: t.blog.all },
    { key: 'fishing', label: t.blog.fishing },
    { key: 'hunting', label: t.blog.hunting },
    { key: 'gear', label: t.blog.gear }
  ];

  const filtered = BLOG_POSTS.filter(p => blogFilter === 'all' || p.blogCat === blogFilter);

  return (
    <section id="intel" className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-oswald uppercase tracking-tight">{t.sections.blog}</h2>
          <div className="flex gap-1.5">
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {filtered.map(post => (
            <Link key={post.id} to={`/intel/${post.slug}`} className="blog-card flex flex-col gap-2 group cursor-pointer">
              <div className="aspect-[3/2] rounded-lg overflow-hidden bg-gray-100">
                <img src={post.img} className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                    {post.blogCat === 'fishing' ? t.blog.fishing : post.blogCat === 'hunting' ? t.blog.hunting : t.blog.gear}
                  </span>
                  <span className="text-[9px] font-medium text-gray-400 tracking-wider uppercase">{post.date}</span>
                </div>
                <h3 className="text-[11px] font-semibold text-ecotone-dark group-hover:text-ecotone-green transition-colors line-clamp-2 leading-tight mt-1">
                  {lang === 'fr' ? post.title : post.titleEn}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
