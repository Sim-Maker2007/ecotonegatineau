import React from 'react';
import { blogPosts } from '../data/blogPosts';

export const IntelHub = () => {
  return (
    <section className="bg-white py-24 px-6" id="intel-hub">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-[#1A1C19] text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Outdoor <span className="text-ecotone-green">Intel</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              Conseils d'experts, guides techniques et récits d'aventures pour maîtriser le terrain.
            </p>
          </div>
          <button className="text-sm font-bold uppercase tracking-widest text-[#1A1C19] border-b-2 border-ecotone-green pb-1 hover:text-ecotone-green transition-all pb-2">
            Voir tout le blog
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[16/9] mb-6 rounded-lg shadow-sm border border-gray-100">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1A1C19] text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-opacity-90">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                <span>{post.date}</span>
                <span className="w-1 h-1 bg-ecotone-green rounded-full" />
                <span>{post.readTime} de lecture</span>
              </div>
              
              <h3 className="text-xl font-bold text-[#1A1C19] mb-3 group-hover:text-ecotone-green transition-colors leading-tight">
                {post.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 font-medium">
                {post.excerpt}
              </p>
              
              <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1A1C19] group-hover:gap-4 transition-all duration-300">
                Lire la suite <span className="text-ecotone-green text-lg">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
