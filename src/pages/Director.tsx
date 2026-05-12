import { motion } from 'motion/react';
import { Quote, Award, BookOpen, GraduationCap, Globe } from 'lucide-react';
import { TEAM_MEMBERS } from '../constants';
import SEO from '../components/SEO';

export default function Director() {
  const member = TEAM_MEMBERS.find(m => m.id === 'director');

  if (!member) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-white"
    >
      <SEO 
        title={`${member.name} | Founder's Legacy`}
        description={`Learn more about the legacy of ${member.name}, Founder & Director of Dream Migrator and his mission to transform global education.`}
        keywords="Jaideep Singh, Dream Migrator founder, academic legacy, global education vision"
      />
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative mb-20">
           <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-3xl border-[16px] border-slate-50 relative group">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-12 left-12">
                 <div className="text-brand-400 font-black text-sm uppercase tracking-widest mb-2">Founder & Director</div>
                 <h1 className="text-5xl font-display font-black text-white">{member.name}</h1>
              </div>
           </div>
           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-500 rounded-full flex items-center justify-center text-slate-900 rotate-12 shadow-2xl">
              <Quote className="w-16 h-16 opacity-50" />
           </div>
        </div>

        <div className="prose prose-lg max-w-none text-slate-600">
           <div className="bg-slate-50 p-12 rounded-[40px] border border-slate-100 mb-16">
              <h2 className="text-3xl font-display font-black text-slate-900 mb-6 underline decoration-brand-500 decoration-4">The Vision</h2>
              <p className="text-xl font-medium leading-relaxed italic">
                "{member.bio}"
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                 <h3 className="text-2xl font-display font-black text-slate-900 mb-6 flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-brand-500" />
                    Academic Legacy
                 </h3>
                 <p className="font-medium">
                    Late Prof. Dr. Jaideep Singh was a distinguished academician and global thought leader. His extraordinary academic path and professional contributions continue to inspire us.
                 </p>
              </div>
              <div>
                 <h3 className="text-2xl font-display font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Globe className="w-6 h-6 text-brand-500" />
                    Global Mission
                 </h3>
                 <p className="font-medium">
                    His life's mission was to transform education into a journey of empowerment, bridging the gap between local talent and global opportunities.
                 </p>
              </div>
           </div>

           <div className="p-12 border-4 border-dashed border-slate-100 rounded-[40px] text-center">
              <h2 className="text-3xl font-display font-black text-slate-900 mb-4 lowercase tracking-tighter">Founder's Message</h2>
              <p className="text-lg font-medium opacity-80 leading-relaxed">
                "Education is not just about moving from one place to another; it's about evolving your perspective to meet the demands of a globalized world."
              </p>
              <div className="mt-8 flex justify-center gap-4">
                 {[Award, BookOpen, Globe].map((Icon, i) => (
                   <div key={i} className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-700">
                      <Icon className="w-6 h-6" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
