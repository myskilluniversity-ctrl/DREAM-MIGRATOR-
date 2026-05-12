import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Banknote, ShieldCheck, ArrowRight, UserCheck, Globe } from 'lucide-react';
import SEO from '../components/SEO';

export default function Ausbildung() {
  const benefits = [
    { title: "No Tuition Fees", desc: "You don't pay for your education. It's fully funded by the German state and employers.", icon: Banknote },
    { title: "Earn While Learning", desc: "Get monthly stipends starting from €1,100, which increase every year of training.", icon: UserCheck },
    { title: "Guaranteed Job", desc: "Upon completion, over 95% of students are absorbed into permanent roles by their sponsors.", icon: Briefcase },
    { title: "Permanent Residency", desc: "Special pathway to PR after working for 2 years post-qualification.", icon: Globe }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-white"
    >
      <SEO 
        title="Germany Ausbildung Program"
        description="Launch your career in Germany with the Ausbildung program. Earn a stipend while you learn, with zero tuition fees and guaranteed job placement."
        keywords="Ausbildung Germany, vocational training Germany, study and work in Germany, nursing Ausbildung, mechatronics Ausbildung"
      />
      <div className="max-w-7xl mx-auto px-6">
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-8">
                <GraduationCap className="w-4 h-4" />
                Work + Study Program
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 leading-tight mb-8">
                Germany <br/> <span className="text-brand-700">Ausbildung</span>
              </h1>
              <p className="text-slate-600 text-xl leading-relaxed mb-10">
                The Ausbildung is a unique German vocational training system that blends classroom learning with real-world work experience. Start your professional career in Europe's strongest economy with zero tuition and a guaranteed stipend.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                 <button className="px-10 py-5 bg-brand-500 text-slate-900 rounded-2xl font-black text-lg hover:bg-brand-400 transition-all shadow-2xl shadow-brand-500/20">
                    Apply for 2026 Intakes
                 </button>
                 <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                    Free Consultation
                    <ArrowRight className="w-5 h-5" />
                 </button>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
               <div className="relative rounded-[60px] overflow-hidden shadow-3xl border-[20px] border-slate-50">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" 
                    alt="Vocational Training" 
                    className="aspect-[4/5] object-cover"
                  />
               </div>
               <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent-500 rounded-full flex items-center justify-center text-slate-900 font-display font-black text-center rotate-12 shadow-2xl animate-float">
                  <div>
                    <div className="text-4xl">FREE</div>
                    <div className="text-xs uppercase">Education</div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-black text-slate-900 mb-4">Core Benefits</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Why thousands of international students choose the Ausbildung pathway every year.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="p-8 surface hover:shadow-2xl hover:-translate-y-2 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-700 mb-6 group-hover:scale-110 transition-all shadow-sm">
                   <b.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{b.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 bg-slate-900 rounded-[60px] text-white overflow-hidden relative">
           <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
           <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
              <h2 className="text-4xl md:text-6xl font-display font-black mb-8">Popular Streams</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                 {[
                   { name: "Nursing & Care", icon: ShieldCheck },
                   { name: "Mechatronics", icon: GraduationCap },
                   { name: "IT & Software", icon: Briefcase },
                   { name: "Hotel Management", icon: ShieldCheck },
                   { name: "Logistics", icon: GraduationCap },
                   { name: "Aviation Tech", icon: Briefcase }
                 ].map((stream, i) => (
                   <div key={i} className="px-6 py-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all cursor-pointer">
                      <stream.icon className="w-10 h-10 text-brand-400 mx-auto mb-4" />
                      <div className="font-bold text-lg">{stream.name}</div>
                   </div>
                 ))}
              </div>
              <p className="text-slate-400 text-lg mb-12">Dream Migrator has direct tie-ups with leading German employers in these sectors to ensure your placement.</p>
              <button className="px-12 py-6 bg-brand-500 text-slate-900 rounded-full font-black text-xl hover:bg-brand-400 transition-all shadow-2xl shadow-brand-500/50">
                 Speak to an Ausbildung Counselor
              </button>
           </div>
        </section>
      </div>
    </motion.div>
  );
}
