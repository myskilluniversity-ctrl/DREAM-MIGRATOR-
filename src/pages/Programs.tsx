import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import ProgramCard from '../components/ProgramCard';
import { PROGRAMS } from '../constants';
import { Globe2, Search, Filter, BarChart3, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function Programs() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-slate-50"
    >
      <SEO 
        title="Explore Our Programs"
        description="Structured global migration pathways for high-tier professionals. Explore our specialized programs for Germany, UK, USA, Canada, and Australia."
        keywords="migration programs, study abroad pathways, skilled migration, Germany Ausbildung, medical nursing UK, nursing Germany"
      />
      <div className="max-w-7xl mx-auto px-6">
        {/* Comparison Banner */}
        <div className="mb-20 p-8 bg-brand-900 rounded-[40px] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 blur-[100px] rounded-full -mr-32 -mt-32" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 border border-accent-500/30 text-accent-400 text-[10px] font-black uppercase tracking-widest mb-4">
                <BarChart3 className="w-3.5 h-3.5 text-accent-500" />
                Featured Intelligence
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-4 leading-tight">
                Can't decide? Compare <br/> <span className="text-accent-500">Pathways Side-by-Side</span>
              </h2>
              <p className="text-slate-400 font-medium font-sans">Use our comparison engine to benchmark costs, timelines, and legal outcomes across 5+ global territories.</p>
            </div>
            <Link 
              to="/compare"
              className="px-8 py-5 bg-accent-500 text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-accent-600 transition-all shadow-xl shadow-accent-500/20 flex items-center gap-3 group/btn"
            >
              Launch Comparison Engine
              <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-500 text-xs font-bold uppercase tracking-widest mb-6">
              <Globe2 className="w-4 h-4" />
              Strategic Growth Index
            </div>
            <h1 className="text-5xl font-display font-bold text-slate-900 mb-6 leading-tight font-sans">
              Specialized <br/> <span className="text-brand-700">Global Migration Pathways.</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Explore our structured programs designed for specific labor market demands in top global destinations. Calculated pathways for high-tier professionals.
            </p>
          </div>

          <div className="flex gap-4">
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-500" />
                <input 
                  type="text" 
                  placeholder="Search countries..." 
                  className="bg-white border border-slate-200 rounded-xl pl-12 pr-6 py-4 text-slate-900 focus:outline-none focus:border-brand-500 transition-all w-64 shadow-sm"
                />
             </div>
             <button className="p-4 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-brand-500 transition-colors shadow-sm">
                <Filter className="w-5 h-5" />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.map(program => (
            <ProgramCard key={program.id} program={program} />
          ))}
          
          <div className="p-8 rounded-[32px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center opacity-60">
             <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-6">
                <Globe2 className="w-8 h-8" />
             </div>
             <h3 className="text-slate-900 font-bold mb-2 uppercase tracking-tight">Expansion in Progress</h3>
             <p className="text-slate-500 text-sm font-medium">Australia Skilled Migration Hub <br/>v4.3 scheduled for Q4 2026.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
