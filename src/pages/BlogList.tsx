import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Filter, BookOpen, Clock, User, ArrowRight, Sparkles } from 'lucide-react';
import { getBlogs, getImageAlt } from '../services/seoService';
import SEO from '../components/SEO';

export default function BlogList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const blogs = useMemo(() => {
    return getBlogs();
  }, []);

  const categories = useMemo(() => {
    const list = new Set(blogs.map(b => b.category));
    return ['All', ...Array.from(list)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(b => {
      const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            b.keywords.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            b.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [blogs, searchTerm, selectedCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-slate-50 min-h-screen"
    >
      <SEO 
        title="Migration & Professional BTEC Healthcare Insights"
        description="Explore expert-guided blogs, BTEC Level 4/5 qualification studies, and official German vocational recruitment updates for 2026."
        keywords="healthcare blog, BTEC level 5 medical, vocational training guide, german migration study, visa prediction advice"
      />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Decorative Header Block */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            Vetted Educational Insights — 2026 Edition
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-black text-slate-900 mb-6 tracking-tight">
            Dream <span className="text-emerald-600">Career Insights</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto font-medium">
            Step-by-step guides, BTEC course breakdowns, visa policy alerts, and certified vocational training guides curated by registered global counselors.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
          {/* Categories Tab */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  selectedCategory === cat 
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/15'
                    : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-800 border border-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search guides, keywords, or levels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:border-emerald-500 outline-none font-bold text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Editorial Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 group flex flex-col h-full"
              >
                {/* Visual Cover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img 
                    src={post.image} 
                    alt={getImageAlt(post.image, post.imageAlt)} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
                    {post.category || 'Healthcare'}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {post.author.split(' ')[0]}
                    </span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                    </span>
                  </div>

                  <h2 className="text-xl font-display font-black text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors tracking-tight line-clamp-2 uppercase">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6 line-clamp-3">
                    {post.metaDescription}
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Tags: {post.keywords.split(',')[0]}
                    </span>
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-widest hover:text-emerald-500 transition-colors"
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="bg-white p-20 rounded-[48px] border border-slate-100 text-center max-w-lg mx-auto">
            <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-6 animate-bounce" />
            <h3 className="text-xl font-black text-slate-900 mb-2 uppercase">No articles matched</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              No matching resources were found on this node. Try searching for other terms like level 4, level 5, BTEC, or Ausbildung.
            </p>
          </div>
        )}

      </div>
    </motion.div>
  );
}
