import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useLang } from '../context/LanguageContext';
import { BLOG_POSTS } from '../data/blog';

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

  return (
    <>
      <SEOHead page="intel" post={post} />
      <section className="py-8 bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-4">
          <Link to="/" className="text-[10px] font-medium uppercase text-gray-400 hover:text-ecotone-green flex items-center gap-1.5 mb-5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> {t.common.back}
          </Link>
          <img src={post.img} className="w-full aspect-video object-cover rounded-lg mb-6" alt="" />
          <span className="text-[10px] font-medium text-ecotone-green tracking-wider uppercase mb-2 block">{post.date}</span>
          <h1 className="text-xl md:text-2xl font-bold font-oswald uppercase text-ecotone-dark leading-tight mb-5">{lang === 'fr' ? post.title : post.titleEn}</h1>
          <div className="text-gray-500 leading-relaxed text-sm">
            <p className="border-l-[3px] border-ecotone-green pl-4 py-2 bg-gray-50 rounded-r-lg">
              {lang === 'fr' ? post.content : post.contentEn}
            </p>
            <p className="text-xs text-gray-400 mt-4">— Équipe Ecotone Gatineau</p>
          </div>
        </div>
      </section>
    </>
  );
}
