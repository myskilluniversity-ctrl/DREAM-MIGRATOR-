import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, FileText, Send, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import LeadCaptureModal from '../components/LeadCaptureModal';

export default function SOPReviewer() {
  const [sop, setSop] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const analyzeSop = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setScore(Math.floor(Math.random() * 30) + 65);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-xs font-black uppercase tracking-widest mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Analysis
              </div>
              <h1 className="text-5xl font-display font-black text-slate-900 mb-6 tracking-tight uppercase">
                SOP <span className="text-emerald-600">Analyzer</span>
              </h1>
              <p className="text-lg text-slate-600 font-medium max-w-2xl">
                Upload or paste your Statement of Purpose (SOP). Our AI evaluates structure, tone, and impact against top university patterns.
              </p>
            </div>

            <div className="surface bg-white p-8">
              <textarea
                placeholder="Paste your Statement of Purpose here..."
                className="w-full h-96 p-6 border-2 border-slate-100 rounded-2xl outline-none focus:border-brand-500 transition-all font-sans text-slate-700 font-medium leading-relaxed resize-none"
                value={sop}
                onChange={(e) => setSop(e.target.value)}
              />
              <div className="mt-6 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {sop.split(/\s+/).filter(Boolean).length} Words Detectected
                </p>
                <button
                  onClick={analyzeSop}
                  disabled={sop.length < 100 || isAnalyzing}
                  className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:bg-brand-500 hover:text-slate-900 transition-all disabled:opacity-50 flex items-center gap-3"
                >
                  {isAnalyzing ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                      Crunching Data...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Run AI Scan
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 self-start sticky top-32">
            <AnimatePresence mode="wait">
              {score === null ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="surface bg-slate-900 text-white p-8 text-center"
                >
                  <FileText className="w-16 h-16 text-slate-700 mx-auto mb-6" />
                  <h3 className="text-xl font-display font-black mb-4 uppercase tracking-tight">Ready for Scan</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    Once you submit your SOP, we will provide a comprehensive "Dream Score" based on:
                  </p>
                  <ul className="mt-8 space-y-4 text-left">
                    {['Narrative Flow', 'Intent Clarity', 'Grammar & Tone', 'Engagement Score'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                        <div className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="surface bg-white p-8 border border-slate-100 shadow-2xl"
                >
                   <div className="text-center mb-10">
                      <div className="relative w-32 h-32 mx-auto mb-6">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-50" />
                          <motion.circle 
                            cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                            strokeDasharray={364}
                            initial={{ strokeDashoffset: 364 }}
                            animate={{ strokeDashoffset: 364 - (364 * score / 100) }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                            className="text-brand-500" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-display font-black text-slate-900 tracking-tighter">{score}</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">% Score</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-display font-black text-slate-900 uppercase">Analysis Complete</h3>
                      <p className="text-sm font-medium text-slate-500 mt-2">Recommended for tier-2 universities</p>
                   </div>

                   <div className="space-y-6">
                      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-widest mb-2">
                           <CheckCircle2 className="w-4 h-4" /> Strengths
                        </div>
                        <p className="text-xs text-emerald-600 font-medium font-sans">Excellent career progression narrative and clear financial intent.</p>
                      </div>

                      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                        <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-widest mb-2">
                           <AlertCircle className="w-4 h-4" /> Weakness
                        </div>
                        <p className="text-xs text-amber-600 font-medium font-sans">Academic motivation needs more specific university research to reach 90%+.</p>
                      </div>
                   </div>

                   <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-4 bg-brand-500 text-slate-900 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-brand-400 transition-all mt-10 shadow-lg shadow-brand-500/20"
                   >
                      Expert Human Edit (₹999)
                   </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <LeadCaptureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(data) => {
          console.log('Lead Captured:', data);
          alert('Your request for Expert SOP Edit has been received! A counselor will call you shortly to discuss next steps.');
        }}
        title="Professional SOP Editing"
        description="Get your SOP polished by former university admissions officers. 100% success rate for targeted universities."
      />
    </div>
  );
}
