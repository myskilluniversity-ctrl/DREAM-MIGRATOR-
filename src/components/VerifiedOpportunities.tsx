import { motion } from 'motion/react';
import { Briefcase, MapPin, BadgeCheck, ExternalLink } from 'lucide-react';

const JOBS = [
  { title: "Senior Software Engineer", location: "Munich, Germany", salary: "€75,000 - €95,000", visa: "Blue Card Eligible", tags: ["Remote Friendly", "Relocation Support"] },
  { title: "Registered Nurse (ICU)", location: "London, UK", salary: "£38,000 - £48,000", visa: "Health & Care Worker Visa", tags: ["Bonus Included", "Housing Provided"] },
  { title: "Mechatronics Technician", location: "Stuttgart, Germany", salary: "€45,000 - €55,000", visa: "Skilled Worker Pathway", tags: ["Ausbildung Grads Welcome", "Direct Placement"] }
];

export default function VerifiedOpportunities() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
              <BadgeCheck className="w-4 h-4" />
              Direct Employer Feed
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
              Verified <span className="text-brand-400">Opportunities</span>
            </h2>
          </div>
          <button className="text-brand-400 flex items-center gap-2 font-bold hover:underline">
            View All 1,200+ Jobs <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {JOBS.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-3xl glass border border-white/5 hover:border-brand-500/50 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-brand-400 transition-colors">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter bg-emerald-400/5 px-2 py-1 rounded border border-emerald-400/10">Verified by GP</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">{job.title}</h3>
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-brand-500/10 text-brand-400 text-[10px] rounded italic">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
                  <div className="text-slate-500 text-[10px] uppercase mb-1">Visa Status</div>
                  <div className="text-white text-sm font-medium">{job.visa}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white font-bold">{job.salary}</span>
                <button className="text-brand-400 text-sm font-bold flex items-center gap-1 group/link">
                  Apply Now <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from 'lucide-react';
