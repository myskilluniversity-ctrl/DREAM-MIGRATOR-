import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plane, CheckCircle2, Clock, MapPin, FileText, Smartphone, ArrowRight } from 'lucide-react';
import LeadCaptureModal from '../components/LeadCaptureModal';

const TIMELINE = [
  { id: 1, title: 'Document Prep', duration: '2 weeks', status: 'completed', desc: 'Passport, Academic Records, Reference Letters' },
  { id: 2, title: 'University Offer', duration: '4-8 weeks', status: 'current', desc: 'Conditional or Unconditional Offer Letter receipt' },
  { id: 3, title: 'I-20 / CAS / GTE', duration: '2 weeks', status: 'upcoming', desc: 'Financial verification and university sponsorship' },
  { id: 4, title: 'Visa Application', duration: '3 weeks', status: 'upcoming', desc: 'Fee payment, Appointment booking, Biometrics' },
  { id: 5, title: 'Mock Interview', duration: '1 week', status: 'upcoming', desc: 'Dream Migrator expert training & prep' },
  { id: 6, title: 'Departure', duration: '2 weeks', status: 'upcoming', desc: 'Flight booking, Insurance, Pre-departure briefing' },
];

export default function VisaPredictor() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 rounded-full text-brand-700 text-xs font-black uppercase tracking-widest mb-6">
            <Plane className="w-4 h-4" />
            Visa Intelligence
          </div>
          <h1 className="text-6xl font-display font-black text-slate-900 mb-6 tracking-tighter uppercase italic">
            Timeline <span className="text-brand-600">Architect</span>
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
            Real-time projection of your migration journey. Based on current consulate processing times and our success data.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Timeline Visualizer */}
          <div className="lg:col-span-2 space-y-8">
            {TIMELINE.map((step, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={step.id} 
                className={`relative flex gap-8 p-10 rounded-3xl border-2 transition-all group ${
                  step.status === 'completed' ? 'bg-slate-50 border-slate-100 cursor-default' :
                  step.status === 'current' ? 'bg-white border-brand-500 shadow-2xl shadow-brand-500/10' :
                  'bg-white border-slate-100 opacity-60 grayscale'
                }`}
              >
                {/* Connector Line */}
                {i < TIMELINE.length - 1 && (
                  <div className="absolute left-[3.25rem] top-[6.5rem] bottom-[-2rem] w-1 border-l-2 border-dashed border-slate-200" />
                )}

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 font-display font-black text-2xl ${
                  step.status === 'completed' ? 'bg-slate-900 text-white' :
                  step.status === 'current' ? 'bg-brand-500 text-slate-900' :
                  'bg-slate-100 text-slate-300'
                }`}>
                  {step.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : step.id}
                </div>

                <div className="flex-1">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-display font-black text-slate-900 uppercase tracking-tight">{step.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{step.duration} Period</span>
                        </div>
                      </div>
                      {step.status === 'current' && (
                        <div className="px-3 py-1 bg-brand-100 text-brand-700 text-[10px] font-black uppercase tracking-widest animate-pulse rounded-lg">
                          Active Phase
                        </div>
                      )}
                   </div>
                   <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
                     {step.desc}
                   </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-8">
            <div className="surface bg-slate-900 text-white p-10 sticky top-32">
               <div className="flex items-center justify-between mb-12">
                  <div className="w-16 h-16 bg-brand-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-brand-500/20">
                    <Smartphone className="w-8 h-8 text-slate-900" />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-brand-500 uppercase tracking-widest">Protocol Version</span>
                    <p className="text-sm font-bold">V-MIGRATE.4.0</p>
                  </div>
               </div>

               <div className="space-y-10">
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">Current Success Probability</span>
                    <div className="text-6xl font-display font-black text-brand-500 tracking-tighter">98.4%</div>
                    <p className="text-sm text-slate-400 font-medium mt-2">Based on your current academic & financial profile.</p>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Total Time</span>
                      <p className="text-xl font-display font-black">22 WEEKS</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Risk Level</span>
                      <p className="text-xl font-display font-black text-emerald-500 uppercase">LOW</p>
                    </div>
                  </div>
               </div>

               <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-brand-500 transition-all mt-12 group"
               >
                  Book Strategy Call
                  <ArrowRight className="w-4 h-4 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>

            <div className="surface bg-brand-50 p-8 border border-brand-100">
               <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <FileText className="w-4 h-4 text-brand-600" /> Critical Alert
               </h4>
               <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-tighter">
                 Consulate processing for USA has increased by 15% this month. We recommend starting your I-20 process earlier to maintain this timeline.
               </p>
            </div>
          </div>
        </div>
      </div>

      <LeadCaptureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(data) => {
          console.log('Lead Captured:', data);
          alert('Strategy call booked! One of our senior visa experts will reach out to you within 24 hours.');
        }}
        title="Visa Strategy Call"
        description="Schedule a 1-on-1 session with our senior migration architect to secure your visa approval."
      />
    </div>
  );
}
