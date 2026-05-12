import { motion } from 'motion/react';
import { Linkedin, Mail, BadgeCheck, Quote } from 'lucide-react';
import { TEAM_MEMBERS } from '../constants';
import SEO from '../components/SEO';

export default function Team() {
  const director = TEAM_MEMBERS.find(m => m.id === 'director');
  const leaders = TEAM_MEMBERS.filter(m => m.id !== 'director');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-white"
    >
      <SEO 
        title="Our Leadership Team"
        description="Meet the visionaries behind Dream Migrator. Our leadership team brings decades of experience in global education, strategic design, and government relations."
        keywords="leadership, team members, Parul Mahajan, Rajkaran Batth, study abroad experts"
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-[10px] font-black uppercase tracking-widest mb-6">
              Leadership
           </div>
           <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 mb-8 lowercase tracking-tighter">
             The minds behind your <br/> <span className="text-brand-500 underline decoration-6 underline-offset-8">global journey.</span>
           </h1>
           <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
             Our leadership team brings together decades of experience in global education, government advocacy, and strategic design to empower the next generation of international students.
           </p>
        </div>

        {/* Dynamic Leaders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
           {leaders.map((leader, i) => (
             <motion.div 
               key={leader.id}
               initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="bg-slate-50 rounded-[48px] p-8 md:p-12 flex flex-col md:flex-row gap-12 border border-slate-200 hover:border-brand-300 transition-all group"
             >
                <div className="w-full md:w-64 flex-shrink-0">
                   <div className="relative aspect-square rounded-[32px] overflow-hidden group-hover:scale-105 transition-all duration-700 shadow-2xl border-4 border-white">
                      <img 
                        src={leader.image} 
                        alt={leader.name} 
                        className="w-full h-full object-cover"
                      />
                   </div>
                </div>
                <div className="flex-grow pt-4">
                   <div className="text-brand-600 font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                     <BadgeCheck className="w-4 h-4" />
                     {leader.role}
                   </div>
                   <h2 className="text-4xl font-display font-bold text-slate-900 mb-6">{leader.name}</h2>
                   <p className="text-slate-500 text-lg leading-relaxed mb-8 font-medium">
                      {leader.bio}
                   </p>
                   <div className="flex gap-4">
                      <a href="#" className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-600 transition-all cursor-pointer">
                         <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="#" className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-600 transition-all cursor-pointer">
                         <Mail className="w-5 h-5" />
                      </a>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Legacy Section - Director */}
        {director && (
          <div className="relative">
             <div className="absolute inset-0 bg-brand-900 rounded-[64px] scale-[1.02] blur-sm opacity-10" />
             <div className="relative bg-brand-900 rounded-[60px] p-12 md:p-24 text-white overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                   <Quote className="w-64 h-64" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                   <div className="lg:col-span-4">
                      <div className="relative rounded-[40px] overflow-hidden shadow-3xl border-8 border-white group">
                         <img 
                            src={director.image} 
                            alt={director.name} 
                            className="w-full aspect-[4/5] object-cover group-hover:scale-110 transition-transform duration-1000"
                         />
                      </div>
                   </div>
                   <div className="lg:col-span-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-400 text-[10px] font-black uppercase tracking-widest mb-8">
                         Founder's Legacy
                      </div>
                      <h2 className="text-4xl md:text-5xl font-display font-black mb-8 leading-tight">
                         {director.name}
                      </h2>
                      <div className="space-y-8 mb-12">
                         <p className="text-xl md:text-2xl text-slate-300 italic font-medium leading-relaxed">
                            "{director.bio}"
                         </p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
                         <div>
                            <div className="text-2xl font-display font-black text-white">Academia</div>
                            <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Focus Area</div>
                         </div>
                         <div>
                            <div className="text-2xl font-display font-black text-white">Strategy</div>
                            <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Leadership</div>
                         </div>
                         <div>
                            <div className="text-2xl font-display font-black text-white">Innovation</div>
                            <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Impact</div>
                         </div>
                         <div>
                            <div className="text-2xl font-display font-black text-white">Global</div>
                            <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Network</div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
