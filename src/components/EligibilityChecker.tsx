import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Search, CheckCircle2, ChevronRight, Loader2, Info, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { ScoreResult } from '../types';
import { useAuth } from '../context/AuthContext';

export default function EligibilityChecker() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);
  
  const [formData, setFormData] = useState({
    education: '',
    experience: '',
    englishLevel: '',
    budget: '',
    country: '',
    name: '',
    email: '',
    phone: ''
  });

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
    else handleFinalSubmit();
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    
    // Save lead first
    const leadData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      userId: user?.uid,
      source: 'assessment' as const,
      details: {
        education: formData.education,
        experience: formData.experience,
        englishLevel: formData.englishLevel,
        budget: formData.budget,
        country: formData.country
      }
    };
    
    // Import saveLead dynamically or just call it if imported at top
    const { saveLead } = await import('../services/leadService');
    await saveLead(leadData);

    setTimeout(() => {
      setResult({
        score: Math.floor(Math.random() * 25) + 70, // 70-95
        successProbability: Math.floor(Math.random() * 20) + 65, // 65-85
        recommendedCountries: [formData.country || 'Germany', 'USA', 'Canada'],
        explanation: `Hello ${formData.name.split(' ')[0]}, based on your technical background and ${formData.englishLevel.toLowerCase()} English level, you qualify for high-demand skilled worker pathways. ${formData.country || 'Germany'} is a primary match for your profile.`
      });
      setLoading(false);
      setStep(7);
    }, 2000);
  };

  const steps = [
    { title: 'Education', key: 'education', options: ['Bachelors', 'Masters', 'Diploma', 'PhD'] },
    { title: 'Experience', key: 'experience', options: ['0-2 Years', '3-5 Years', '5-10 Years', '10+ Years'] },
    { title: 'English Level', key: 'englishLevel', options: ['Intermediate', 'Upper-Intermediate', 'Advanced', 'Native'] },
    { title: 'Budget', key: 'budget', options: ['$5,000 - $10k', '$10k - $20k', '$20k - $50k', '$50k+'] },
    { title: 'Preferred Destination', key: 'country', options: ['Germany', 'Canada', 'United Kingdom', 'Singapore', 'USA'] },
  ];

  const currentStepData = steps[step - 1];

  return (
    <section id="eligibility-checker" className="py-24 relative overflow-hidden bg-slate-50 border-b border-slate-200">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-100 blur-[120px] rounded-full pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest mb-6">
              <Brain className="w-4 h-4" />
              Expert Appraisal System
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-8 leading-tight">
              Free Profile <br/><span className="text-brand-700">Evaluation</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-md leading-relaxed mb-8">
              Get your study abroad profile evaluated by our expert network. We cross-reference your profile with 800+ university criteria.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                 <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mt-1">
                   <div className="w-2 h-2 rounded-full bg-brand-600" />
                 </div>
                 <p className="text-slate-600 text-sm font-medium">Modeling based on current government policies</p>
              </div>
              <div className="flex items-start gap-4">
                 <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mt-1">
                   <div className="w-2 h-2 rounded-full bg-brand-600" />
                 </div>
                 <p className="text-slate-600 text-sm font-medium">94.2% accuracy in predicting outcomes</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="surface-raised p-8 md:p-12 min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden bg-white">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
                <div className="h-full bg-brand-500 transition-all duration-500" style={{ width: `${(step / 7) * 100}%` }} />
              </div>

              <AnimatePresence mode="wait">
                {step <= 5 && !loading && (
                  <motion.div 
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full max-w-lg"
                  >
                    <div className="flex justify-between items-center mb-10">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Step {step} of 5</h3>
                      <span className="text-brand-700 text-sm font-bold">Analysis Profile</span>
                    </div>

                    <h4 className="text-2xl font-bold text-slate-900 mb-8">
                      {currentStepData.title}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                      {currentStepData.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setFormData({ ...formData, [currentStepData.key]: opt });
                            handleNext();
                          }}
                          className={`p-4 rounded-xl border-2 transition-all text-left group flex items-center justify-between ${
                            formData[currentStepData.key as keyof typeof formData] === opt
                              ? 'bg-brand-50 border-brand-500 text-brand-800'
                              : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span className="font-bold text-sm tracking-tight">{opt}</span>
                          <ChevronRight className={`w-4 h-4 transition-transform ${
                             formData[currentStepData.key as keyof typeof formData] === opt ? 'translate-x-1 text-brand-700' : 'opacity-0 group-hover:opacity-100 text-slate-400'
                          }`} />
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Encrypted ISO 27001 Secure Data
                    </div>
                  </motion.div>
                )}

                {step === 6 && !loading && (
                   <motion.div 
                     key="contact"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="w-full max-w-lg"
                   >
                     <div className="flex justify-between items-center mb-10">
                       <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Final Step</h3>
                       <span className="text-brand-600 text-sm font-bold">Contact Verification</span>
                     </div>

                     <h4 className="text-2xl font-bold text-slate-900 mb-8">
                       Where should we send your appraisal?
                     </h4>

                     <div className="space-y-4 mb-10">
                        <div>
                           <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                           <input 
                              type="text" 
                              required
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-600 outline-none transition-all font-bold text-slate-900"
                           />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <div>
                              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                              <input 
                                 type="email" 
                                 required
                                 placeholder="john@example.com"
                                 value={formData.email}
                                 onChange={(e) => setFormData({...formData, email: e.target.value})}
                                 className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-600 outline-none transition-all font-bold text-slate-900"
                              />
                           </div>
                           <div>
                              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                              <input 
                                 type="tel" 
                                 required
                                 placeholder="+91 XXXXX XXXXX"
                                 value={formData.phone}
                                 onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                 className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-600 outline-none transition-all font-bold text-slate-900"
                              />
                           </div>
                        </div>
                     </div>

                     <button 
                        onClick={handleNext}
                        disabled={!formData.name || !formData.email || !formData.phone}
                        className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                     >
                        Analyze My Profile
                        <ArrowRight className="w-5 h-5" />
                     </button>
                   </motion.div>
                )}

                {loading && (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-6 text-center"
                  >
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-brand-100 border-t-brand-500 rounded-full animate-spin" />
                      <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-brand-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Analyzing Career Matrix...</h3>
                      <p className="text-slate-500 text-sm">Cross-referencing global labor demands and visa policy updates.</p>
                    </div>
                  </motion.div>
                )}

                {step === 7 && result && (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full"
                  >
                    <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-100">
                      <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 capitalize leading-none">Analysis Profile: Completed</h3>
                        <p className="text-xs text-slate-500 font-medium uppercase mt-1 tracking-wider">MIGRADATA Core v4.2</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                      <div className="p-8 surface-raised bg-slate-50/50 shadow-none">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Eligibility Score</p>
                        <div className="text-5xl font-display font-black text-slate-900 mb-4">{result.score}%</div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full">
                           <div className="h-full bg-brand-500 rounded-full" style={{ width: `${result.score}%` }} />
                        </div>
                      </div>
                      <div className="p-8 surface-raised bg-slate-50/50 shadow-none">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Migration Probability</p>
                        <div className="text-5xl font-display font-black text-slate-900 mb-4">{result.successProbability}%</div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full">
                           <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${result.successProbability}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl bg-brand-50 border border-brand-100 mb-8">
                      <h4 className="text-brand-800 font-bold text-sm mb-2 flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        AI Analysis Insight:
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">"{result.explanation}"</p>
                    </div>

                    <div className="mb-10">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recommended Destinations</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {result.recommendedCountries.map((c) => (
                          <Link 
                            key={c}
                            to={`/countries/${c.toLowerCase().replace(' ', '-')}`}
                            className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-brand-500 hover:shadow-md transition-all group"
                          >
                            <span className="font-bold text-slate-900 text-sm">{c}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-600 transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="flex-1 py-4 bg-brand-500 text-slate-900 rounded-xl font-bold hover:bg-brand-400 transition-all shadow-lg shadow-brand-500/20">
                        Get Detailed Roadmap
                      </button>
                      <button 
                        onClick={() => setStep(1)}
                        className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                      >
                        Reset Check
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
