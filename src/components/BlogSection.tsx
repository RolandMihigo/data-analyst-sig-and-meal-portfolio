import React, { useState } from 'react';
import { Language, BlogPostItem } from '../types/portfolio';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Tag, 
  ArrowRight, 
  X, 
  Share2, 
  Check, 
  BookMarked,
  Sparkles 
} from 'lucide-react';

interface BlogSectionProps {
  blog: BlogPostItem[];
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  blog,
  lang,
  onLanguageChange,
}) => {
  const [activeArticle, setActiveArticle] = useState<BlogPostItem | null>(null);
  const [copied, setCopied] = useState(false);
  const isEn = lang === 'en';

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="blog" className="py-20 border-t border-slate-900 bg-slate-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-xs font-semibold text-indigo-400 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isEn ? 'Technical Publications' : 'Articles & Publications'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {isEn ? 'Engineering Blog & Insights' : 'Blog d\'Ingénierie & Analyses'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {isEn
              ? 'Deep dives into semantic HTML5, modern CSS architectures, multimodal AI extraction, and high-performance distributed systems.'
              : 'Analyses approfondies sur HTML5 sémantique, le CSS moderne, l\'extraction IA multimodale et les systèmes distribués haute performance.'}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blog.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/90 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Meta Top */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800/60">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-950/70 border border-indigo-800/50 text-indigo-300 font-semibold text-[11px]">
                  {post.category[lang]}
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{post.readTime[lang]}</span>
                </span>
              </div>

              {/* Title & Excerpt */}
              <div className="flex-1 space-y-3 mb-6">
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                  {post.title[lang]}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-4">
                  {post.excerpt[lang]}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {post.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800/80 text-[10px] font-mono text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer Date & Read Action */}
              <div className="pt-4 border-t border-slate-800/70 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </span>

                <button
                  type="button"
                  onClick={() => setActiveArticle(post)}
                  className="font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  <span>{isEn ? 'Read article' : 'Lire l\'article'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70 sticky top-0 z-10 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[11px] font-semibold">
                  {activeArticle.category[lang]}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {activeArticle.readTime[lang]} • {activeArticle.date}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Language Switch within reader */}
                <button
                  type="button"
                  onClick={() => onLanguageChange(lang === 'en' ? 'fr' : 'en')}
                  className="px-2.5 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
                >
                  {lang === 'en' ? '🇫🇷 Lire en Français' : '🇬🇧 Read in English'}
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title={isEn ? 'Share link' : 'Partager le lien'}
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-10 max-h-[75vh] overflow-y-auto space-y-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {activeArticle.title[lang]}
              </h1>

              {/* Author Row */}
              <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
                <div className="w-9 h-9 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center font-bold text-white text-xs">
                  {activeArticle.author.charAt(0)}
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {activeArticle.author}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {isEn ? 'Author & Software Engineer' : 'Auteur & Ingénieur Logiciel'}
                  </span>
                </div>
              </div>

              {/* Formatted Text Body */}
              <div className="prose prose-invert prose-slate max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-4">
                {activeArticle.content[lang].split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={pIdx} className="text-xl font-bold text-white pt-4 pb-1 border-b border-slate-800/80">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('#### ')) {
                    return (
                      <h4 key={pIdx} className="text-base font-bold text-indigo-300 pt-3">
                        {paragraph.replace('#### ', '')}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n- ');
                    return (
                      <ul key={pIdx} className="list-disc pl-5 space-y-1.5 text-slate-300">
                        {items.map((it, iIdx) => (
                          <li key={iIdx}>{it.replace(/^- /, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={pIdx}>{paragraph}</p>;
                })}
              </div>

              {/* Article Tags */}
              <div className="pt-8 border-t border-slate-800 flex flex-wrap gap-2">
                {activeArticle.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                {isEn ? 'Thank you for reading.' : 'Merci pour votre lecture.'}
              </span>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors"
              >
                {isEn ? 'Back to Blog' : 'Retour aux Articles'}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
