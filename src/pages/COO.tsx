import { motion } from 'motion/react';
import { Quote, Settings, Layout, Send, Target } from 'lucide-react';
import { TEAM_MEMBERS } from '../constants';
import SEO from '../components/SEO';

export default function COO() {
  const member = TEAM_MEMBERS.find(m => m.id === 'coo');

  if (!member) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-white"
    >
      <SEO 
        title={`${member.name} | Chief Operating Officer`}
        description={`Meet ${member.name}, COO of Dream Migrator. Specialist in operational architecture and strategic design for global student pathways.`}
        keywords="Rajkaran Batth, COO Dream Migrator, operational excellence, student success strategy"
      />
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative mb-20">
           <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-3xl border-[16px] border-slate-50 relative group">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-12 left-12">
                 <div className="text-orange-400 font-black text-sm uppercase tracking-widest mb-2">Chief Operating Officer</div>
                 <h1 className="text-5xl font-display font-black text-white">{member.name}</h1>
              </div>
           </div>
        </div>

        <div className="prose prose-lg max-w-none text-slate-600">
           <div className="bg-slate-50 p-12 rounded-[40px] border border-slate-100 mb-16">
              <h2 className="text-3xl font-display font-black text-slate-900 mb-6 underline decoration-orange-500 decoration-4">Operational Excellence</h2>
              <p className="text-xl font-bold leading-relaxed text-slate-800">
                {member.bio}
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div className="p-8 bg-orange-50/50 rounded-3xl border border-orange-100">
                 <h3 className="text-2xl font-display font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Layout className="w-6 h-6 text-orange-500" />
                    Strategic Design
                 </h3>
                 <p className="font-medium text-sm leading-relaxed">
                    Mr. Rajkaran Batth blends creativity with strategy to shape the future of global education. He brings rich expertise in Design and Architecture to student empowerment.
                 </p>
              </div>
              <div className="p-8 bg-orange-50/50 rounded-3xl border border-orange-100">
                 <h3 className="text-2xl font-display font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Target className="w-6 h-6 text-orange-500" />
                    Student Success
                 </h3>
                 <p className="font-medium text-sm leading-relaxed">
                    His focus on vocational training pathways, particularly for Germany, provides students with a robust foundation for their international careers.
                 </p>
              </div>
           </div>

           <div className="p-12 bg-orange-500 rounded-[40px] text-slate-900 relative overflow-hidden shadow-2xl">
              <Quote className="w-12 h-12 text-slate-900/40 mb-8" />
              <h2 className="text-3xl font-display font-black mb-6">COO's Message</h2>
              <p className="text-xl font-medium text-slate-900/90 italic mb-8">
                "We provide structure to dreams. By implementing efficient processes and innovative pathways, we ensure that the journey abroad is as rewarding as the destination."
              </p>
              <div className="flex gap-4">
                 {[Settings, Send].map((Icon, i) => (
                   <div key={i} className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white">
                      <Icon className="w-5 h-5" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
