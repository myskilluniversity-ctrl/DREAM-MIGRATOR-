import { motion } from 'motion/react';
import { ShieldCheck, GraduationCap, Globe, BookOpen, ArrowRight, HeartPulse } from 'lucide-react';
import SEO from '../components/SEO';

export default function Healthcare() {
  const courses = [
    {
      level: "Level 4",
      title: "Pearson BTEC International Higher National Certificate in Healthcare Practice",
      path: "(Healthcare Management)",
      duration: "1 Year",
      details: "Foundational knowledge in healthcare systems, professional practice, and patient-centered care."
    },
    {
      level: "Level 5",
      title: "Pearson BTEC International Higher National Diploma in Healthcare Practice",
      path: "(Healthcare Management)",
      duration: "2 Years",
      details: "Advanced management skills for healthcare leadership roles in global institutions."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-white"
    >
      <SEO 
        title="Global Healthcare Practice Courses"
        description="Launch your international healthcare career with Pearson BTEC qualifications. Recognized in UK, USA, Australia, and 70+ countries."
        keywords="healthcare practice, Pearson BTEC, healthcare management, nursing courses, global healthcare education"
      />
      <div className="max-w-7xl mx-auto px-6">
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-8">
                <HeartPulse className="w-4 h-4" />
                Pearson BTEC Qualified
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 leading-tight mb-8">
                Global Healthcare <br/> <span className="text-brand-700">Practice Courses</span>
              </h1>
              <p className="text-slate-600 text-xl leading-relaxed mb-12">
                Take the first step towards international opportunities in healthcare with our globally recognized Pearson BTEC qualifications. Designed collaboratively with subject experts to meet global industry standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-5 bg-brand-500 text-slate-900 rounded-2xl font-bold text-lg hover:bg-brand-400 transition-all shadow-xl shadow-brand-500/20">
                  Join Next Batch
                </button>
                <button className="px-8 py-5 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                  Download Prospectus
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
                alt="Healthcare Practice" 
                className="rounded-[40px] shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 p-8 bg-white rounded-3xl shadow-2xl border border-slate-50 max-w-xs">
                <div className="flex gap-2 mb-4">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-6 h-1.5 bg-emerald-500 rounded-full" />)}
                </div>
                <div className="text-slate-900 font-bold mb-1">Global Recognition</div>
                <div className="text-slate-500 text-sm">Valid in UK, USA, Australia, and 70+ countries.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-black text-slate-900 mb-4">Our BTEC Programs</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Structured pathways to healthcare management excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[40px] border border-slate-200 hover:border-brand-300 transition-all group">
                <div className="text-brand-700 font-black text-sm uppercase tracking-widest mb-4">{course.level}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{course.title}</h3>
                <div className="text-brand-700 font-bold mb-6 italic">{course.path}</div>
                <p className="text-slate-500 mb-8 font-medium leading-relaxed">{course.details}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-900 font-bold">{course.duration}</span>
                  </div>
                  <ArrowRight className="w-6 h-6 text-brand-700 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-brand-900 rounded-[60px] p-12 md:p-24 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 blur-[100px]" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-black mb-8">Why Pearson BTEC?</h2>
              <div className="space-y-6">
                {[
                  { title: "Collaborative Design", desc: "Developed with subject experts and industry partners." },
                  { title: "Global Transfer", desc: "Credits are transferrable to universities worldwide." },
                  { title: "Skill-Based", desc: "Practical orientation ensuring you are job-ready from day one." },
                  { title: "Career Ready", desc: "Preferred by top international healthcare groups and hospitals." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-6 h-6 text-brand-400" />
                    </div>
                    <div>
                      <div className="text-lg font-bold mb-1">{item.title}</div>
                      <div className="text-slate-400 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
               <h4 className="text-2xl font-bold mb-8">Enquire Now</h4>
               <form className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Full Name</label>
                    <input type="text" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-brand-500" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Email Address</label>
                    <input type="email" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-brand-500" placeholder="john@example.com" />
                  </div>
                  <button className="w-full py-5 bg-brand-500 text-slate-900 rounded-xl font-bold hover:bg-brand-400 transition-all shadow-lg shadow-brand-500/20">Submit Application</button>
               </form>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
