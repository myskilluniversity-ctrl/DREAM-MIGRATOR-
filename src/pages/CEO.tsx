import { motion } from 'motion/react';
import { Quote, ShieldCheck, Zap, Award, CheckCircle } from 'lucide-react';
import { TEAM_MEMBERS } from '../constants';
import SEO from '../components/SEO';

export default function CEO() {
  const member = TEAM_MEMBERS.find(m => m.id === 'ceo');

  if (!member) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-white"
    >
      <SEO 
        title={`${member.name} | Chief Executive Officer`}
        description={`Meet ${member.name}, CEO of Dream Migrator. Visionary leader with expertise in international diplomacy and global skill advocacy.`}
        keywords="Parul Mahajan, CEO Dream Migrator, global advocacy, education leadership"
      />
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative mb-20">
           <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-3xl border-[16px] border-slate-50 relative group">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent" />
              <div className="absolute bottom-12 left-12">
                 <div className="text-brand-400 font-black text-sm uppercase tracking-widest mb-2">Chief Executive Officer</div>
                 <h1 className="text-5xl font-display font-black text-white">{member.name}</h1>
              </div>
           </div>
        </div>

        <div className="prose prose-lg max-w-none text-slate-600">
           <div className="bg-brand-50 p-12 rounded-[40px] border border-brand-100 mb-16">
              <h2 className="text-3xl font-display font-black text-slate-900 mb-6 underline decoration-brand-500 decoration-4">Strategic Leadership</h2>
              <p className="text-xl font-bold leading-relaxed text-slate-800">
                {member.bio}
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                 <h3 className="text-2xl font-display font-black text-slate-900 mb-6 flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-brand-500" />
                    Our Mission
                 </h3>
                 <p className="font-medium text-sm leading-relaxed">
                    At the heart of Dream Migrator's vision stands a leader who believes in creating opportunities that transform lives. Ms. Parul Mahajan is dynamic professional with strong background in government and international relations.
                 </p>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                 <h3 className="text-2xl font-display font-black text-slate-900 mb-6 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-brand-500" />
                    Why Students Trust
                 </h3>
                 <p className="font-medium text-sm leading-relaxed">
                    She advocacy for skill development and her experience in diplomatic circles ensure that students have a high-tier path to global success.
                 </p>
              </div>
           </div>

           <div className="p-12 bg-slate-900 rounded-[40px] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 blur-3xl" />
              <Quote className="w-12 h-12 text-brand-500 mb-8" />
              <h2 className="text-3xl font-display font-black mb-6">CEO's Message</h2>
              <p className="text-xl font-medium text-slate-300 italic mb-8">
                "We don't just process visas; we design destinies. Our commitment is to ensure that every student's ambition finds a matching global opportunity."
              </p>
              <div className="flex gap-4">
                 {[Award, Zap].map((Icon, i) => (
                   <div key={i} className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-brand-400">
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
