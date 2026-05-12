import { motion } from 'motion/react';
import { Zap, Search, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  const diffs = [
    { title: "Traditional Consultancy", fear: "Selling false dreams for fees", result: "High rejection, hidden costs", color: "bg-red-500/10 text-red-500" },
    { title: "Dream Migrator", fear: "Data-driven honest analysis", result: "98.4% Success, total transparency", color: "bg-emerald-500/10 text-emerald-400" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-white"
    >
      <SEO 
        title="About Our Mission"
        description="Dream Migrator replaces outdated consultancy models with data-driven pathway systems. Learn why we have a 98.4% success rate in global student migration."
        keywords="about us, study abroad consultancy, migration success, transparent migration, data-driven pathways"
      />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 mb-8 tracking-tight">
            We are the <span className="text-brand-700 italic">Antidote</span> <br/> to Migration Guesswork.
          </h1>
          <p className="text-slate-600 text-xl leading-relaxed">
            Dream Migrator was founded with a singular purpose: to replace the outdated, opaque consultancy model with a modern, data-driven pathway system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          {diffs.map((d, i) => (
            <div key={i} className={`p-10 rounded-[40px] border ${i === 1 ? 'bg-brand-50 border-brand-200' : 'bg-slate-50 border-slate-200'}`}>
              <h3 className={`text-2xl font-bold mb-6 ${i === 1 ? 'text-brand-700' : 'text-slate-900'}`}>{d.title}</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-slate-400 border border-slate-200">?</div>
                  <p className="text-slate-600 font-medium">{d.fear}</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-brand-700 border border-brand-100">→</div>
                  <p className={`text-xl font-bold ${i === 1 ? 'text-emerald-600' : 'text-red-500'}`}>{d.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="p-8 surface">
              <Zap className="w-10 h-10 text-brand-700 mb-6" />
              <h4 className="text-slate-900 font-bold mb-4">Precision Vetting</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Our AI engine scans 1,000+ data points for every applicant to ensure we only take on cases with a high success probability.</p>
           </div>
           <div className="p-8 surface">
              <ShieldCheck className="w-10 h-10 text-emerald-600 mb-6" />
              <h4 className="text-slate-900 font-bold mb-4">Verified Outcomes</h4>
              <p className="text-slate-500 text-sm leading-relaxed">We don't just find visas; we find careers. Every job offer in our system is pre-vetted by our international legal teams.</p>
           </div>
           <div className="p-8 surface">
              <Search className="text-brand-700 w-10 h-10 mb-6" />
              <h4 className="text-slate-900 font-bold mb-4">Total Transparency</h4>
              <p className="text-slate-500 text-sm leading-relaxed">View your roadmap, step duration, and costs in real-time. No hidden milestones, no surprise fees.</p>
           </div>
        </div>

        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-black text-slate-900 opacity-20 uppercase tracking-[0.3em]">Our Global Network</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale">
            <div className="text-2xl font-black text-slate-900">PEARSON</div>
            <div className="text-2xl font-black text-slate-900">PRIMUS HOSPITAL</div>
            <div className="text-2xl font-black text-slate-900 tracking-tighter italic">Google</div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">Microsoft</div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
