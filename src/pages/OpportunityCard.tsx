import { motion } from 'motion/react';
import { Globe, MapPin, CheckCircle, Info, ArrowRight, Zap, Target, ClipboardList, Clock, Search, BookOpen, UserPlus, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

export default function OpportunityCard() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const points = [
    { title: "Academic Degree", val: "Up to 4 Points", desc: "Recognized foreign university degree or vocational qualification." },
    { title: "Work Experience", val: "Up to 3 Points", desc: "Professional experience in a related field within the last 7 years." },
    { title: "Language Skills", val: "Up to 3 Points", desc: "German (A1-B2) or English (B2) proficiency levels." },
    { title: "Personal Ties", val: "1 Point", desc: "Previous legal residence in Germany for at least 6 months." },
    { title: "Age Limit", val: "Up to 2 Points", desc: "Points awarded for candidates under 35 or 40 years old." },
    { title: "Spouse Accompanying", val: "1 Point", desc: "Extra point if your partner also qualifies for the card." }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-slate-50"
    >
      <SEO 
        title="Germany Opportunity Card (Chancenkarte)"
        description="Learn about the Germany Opportunity Card (Chancenkarte). A points-based entry system for skilled workers to hunt for jobs in Europe's largest economy."
        keywords="Opportunity Card Germany, Chancenkarte, work in Germany, points based immigration, job seeker visa Germany"
      />
      <div className="max-w-7xl mx-auto px-6">
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                Chancenkarte Germany
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 leading-[1] mb-8">
                Your Job Hunt <br/> <span className="text-brand-500">Shortcut to Germany</span>
              </h1>
              <p className="text-slate-600 text-xl leading-relaxed mb-10 max-w-2xl font-medium">
                The Opportunity Card (Chancenkarte) allows skilled workers from non-EU countries to enter Germany for up to one year to find a suitable job. No permanent employment contract required at the time of application.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                 <div className="flex items-center gap-2 text-slate-900 font-bold px-4 py-2 bg-white rounded-full border border-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Points-based Entry
                 </div>
                 <div className="flex items-center gap-2 text-slate-900 font-bold px-4 py-2 bg-white rounded-full border border-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    1 Year Validity
                 </div>
                 <div className="flex items-center gap-2 text-slate-900 font-bold px-4 py-2 bg-white rounded-full border border-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Secondary Job Access
                 </div>
              </div>

              <div className="flex flex-wrap gap-3 p-2 bg-slate-100 rounded-2xl inline-flex w-full md:w-auto">
                 <button onClick={() => scrollToSection('points-deep-dive')} className="px-5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-brand-600 hover:bg-white rounded-xl transition-all">Points System</button>
                 <button onClick={() => scrollToSection('visa-process')} className="px-5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-brand-600 hover:bg-white rounded-xl transition-all">Visa Process</button>
                 <button onClick={() => scrollToSection('job-search')} className="px-5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-brand-600 hover:bg-white rounded-xl transition-all">Job Search</button>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
               <div className="p-8 bg-white rounded-[40px] shadow-2xl border border-slate-100 relative z-10">
                  <div className="text-center mb-8">
                     <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center text-brand-500 mx-auto mb-4">
                        <Target className="w-10 h-10" />
                     </div>
                     <h3 className="text-2xl font-black text-slate-900">Points Calculator</h3>
                     <p className="text-slate-500 text-sm">Need at least 6 points to qualify</p>
                  </div>
                  <div className="space-y-4 mb-8">
                     <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                        <span className="text-slate-600 font-bold">Minimum Score</span>
                        <span className="text-brand-600 font-black text-xl">6 Pts</span>
                     </div>
                     <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                        <span className="text-slate-600 font-bold">Your Potential</span>
                        <span className="text-slate-400 font-bold italic">Checking...</span>
                     </div>
                  </div>
                  <button 
                    onClick={() => {
                      window.location.href = '/#eligibility-checker';
                    }}
                    className="w-full py-4 bg-brand-500 text-white rounded-xl font-black uppercase text-sm tracking-widest hover:bg-brand-600 transition-all shadow-lg hover:-translate-y-1"
                  >
                     Start Free Assessment
                  </button>
               </div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-500/10 blur-[100px] -z-10 rounded-full" />
            </div>
          </div>
        </section>

        <section id="points-deep-dive" className="mb-32">
          <div className="text-center mb-16">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center mx-auto mb-6">
               <ClipboardList className="w-6 h-6" />
            </div>
            <h2 className="text-4xl font-display font-black text-slate-900 mb-4 tracking-tighter">Points System Deep Dive</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">To qualify as a non-EU skilled worker, you must score at least 6 points based on the following criteria.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {points.map((p, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-1 rounded uppercase">{p.val}</span>
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">{p.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-brand-50 rounded-3xl border border-brand-100">
             <div className="flex gap-6 items-start">
                <div className="w-10 h-10 bg-brand-600 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                   <Target className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="text-lg font-bold text-slate-900 mb-2">Strategy Note</h4>
                   <p className="text-slate-600 text-sm leading-relaxed">
                      Dream Migrator advisors specialize in mapping your existing profile to these points. Even if you're short on points, we can advise on rapid language skill acquisition or spouse qualification strategies to bridge the gap.
                   </p>
                </div>
             </div>
          </div>
        </section>

        {/* Visa Processing Section */}
        <section id="visa-process" className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div>
                <h2 className="text-4xl font-display font-black text-slate-900 mb-6 tracking-tighter">Visa Processing & Timeline</h2>
                <div className="space-y-8">
                   {[
                     { step: "Step 1: Document Verification", time: "2-4 Weeks", desc: "Equivalency checking of your degrees via Anabin/ZKAB and gathering essential documents." },
                     { step: "Step 2: Consular Appointment", time: "Varies", desc: "Booking your appointment at the German Mission. We assist with priority scheduling where possible." },
                     { step: "Step 3: Visa Approval", time: "4-8 Weeks", desc: "The Federal Employment Agency (BA) and local authorities process your card application." }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-6">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 font-black text-lg flex-shrink-0">
                           {i + 1}
                        </div>
                        <div>
                           <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-lg font-bold text-slate-900">{item.step}</h4>
                              <span className="text-[10px] font-black uppercase text-brand-600 flex items-center gap-1">
                                 <Clock className="w-3 h-3" /> {item.time}
                              </span>
                           </div>
                           <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="bg-slate-900 p-12 rounded-[60px] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 blur-[100px]" />
                <h3 className="text-2xl font-display font-black mb-6">Application Checklist</h3>
                <ul className="space-y-4 mb-8">
                   {[
                     "Valid Passport & 2 Biometric Photos",
                     "Proof of Financial Means (€10,000+)",
                     "Health Insurance for Germany",
                     "Degree Equivalence Certificates",
                     "Documentary Proof of Points Scored"
                   ].map((doc, i) => (
                     <li key={i} className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                        <div className="w-2 h-2 rounded-full bg-brand-500" />
                        {doc}
                     </li>
                   ))}
                </ul>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2 italic text-center">Dream Migrator Premium</p>
                   <p className="text-sm text-white font-medium text-center leading-relaxed">
                      We handle the entire dossier preparation to ensure 0% rejection rates based on documentation errors.
                   </p>
                </div>
             </div>
          </div>
        </section>

        {/* Job Search Section */}
        <section id="job-search" className="mb-32">
          <div className="text-center mb-16">
            <div className="w-12 h-12 bg-brand-500 text-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-500/20">
               <Search className="w-6 h-6" />
            </div>
            <h2 className="text-4xl font-display font-black text-slate-900 mb-4 tracking-tighter">Job Search Mastery in Germany</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Once you land on a Chancenkarte, the real work begins. We provide the ecosystem for your success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { icon: Globe, title: "English-Speaking Jobs", desc: "We map tech and engineering roles that don't require C1 German." },
               { icon: BookOpen, title: "CV Optimization", desc: "Adapting your profile to the 'Lebenslauf' standard recruiters expect." },
               { icon: UserPlus, title: "Networking Hub", desc: "Access to our community of previous successful migrators." },
               { icon: ShieldCheck, title: "Probation Support", desc: "Legal advisory during your initial 2-week trial shifts." }
             ].map((item, i) => (
               <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:border-brand-500 transition-all">
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 mb-6">
                     <item.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-md font-black text-slate-900 mb-3">{item.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">{item.desc}</p>
               </div>
             ))}
          </div>
        </section>

        <section className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-2xl">
           <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 md:p-20">
                 <h2 className="text-4xl font-display font-black text-slate-900 mb-8 lowercase tracking-tighter">
                   Working with <span className="text-brand-500 underline">Chancenkarte</span> in Germany
                 </h2>
                 <ul className="space-y-6">
                    {[
                      "Up to 20 hours per week of secondary employment allowed while searching.",
                      "Probationary work for up to two weeks (for each employer).",
                      "Opportunity to transition into a permanent work residence permit.",
                      "Access to the world's 4th largest economy and robust job market."
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4">
                         <div className="w-6 h-6 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center flex-shrink-0 mt-1">
                            <Info className="w-4 h-4" />
                         </div>
                         <p className="text-slate-600 font-medium">{item}</p>
                      </li>
                    ))}
                 </ul>
                 <div className="mt-12">
                   <button className="flex items-center gap-4 text-brand-600 font-black uppercase text-xs tracking-[0.2em] group">
                      Download Full Policy Guide
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                   </button>
                 </div>
              </div>
              <div className="relative h-64 lg:h-auto">
                 <img 
                    src="https://images.unsplash.com/photo-1467226632440-65f0b4957403?auto=format&fit=crop&q=80&w=1000" 
                    alt="Berlin Skyline" 
                    className="w-full h-full object-cover"
                 />
              </div>
           </div>
        </section>
      </div>
    </motion.div>
  );
}
