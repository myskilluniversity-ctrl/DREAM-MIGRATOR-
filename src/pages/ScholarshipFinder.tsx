import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Search, Landmark, Calendar, Percent, ArrowRight, ExternalLink } from 'lucide-react';
import LeadCaptureModal from '../components/LeadCaptureModal';

const SCHOLARSHIPS = [
  { id: 1, name: 'Chevening Scholarship', country: 'United Kingdom', amount: 'Full Funding', type: 'Government', deadline: 'Nov 2026' },
  { id: 2, name: 'DAAD Scholarship', country: 'Germany', amount: '€1,200/month', type: 'Academic', deadline: 'Oct 2026' },
  { id: 3, name: 'Fulbright Program', country: 'USA', amount: 'Full Funding', type: 'Excellence', deadline: 'Aug 2026' },
  { id: 4, name: 'Commonwealth Scholarship', country: 'United Kingdom', amount: 'Tuition + Stipend', type: 'Global', deadline: 'Dec 2026' },
  { id: 5, name: 'Vanier Canada Graduate', country: 'Canada', amount: '$50,000/year', type: 'Research', deadline: 'Nov 2026' },
];

export default function ScholarshipFinder() {
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<string | null>(null);

  const filtered = SCHOLARSHIPS.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.country.toLowerCase().includes(query.toLowerCase()));

  const handleApply = (name: string) => {
    setSelectedScholarship(name);
    setIsModalOpen(true);
  };

  const handleConsutation = () => {
    setSelectedScholarship(null);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full text-amber-700 text-xs font-black uppercase tracking-widest mb-6">
            <Gift className="w-4 h-4" />
            Funding Opportunities
          </div>
          <h1 className="text-5xl font-display font-black text-slate-900 mb-6 tracking-tight">
             Scholarship <span className="text-amber-600">Portal</span>
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
            Discover thousands of scholarships, grants, and bursaries to fund your international education journey.
          </p>
        </div>

        <div className="surface bg-white p-4 mb-12 max-w-2xl mx-auto shadow-2xl shadow-slate-200">
           <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
              <input
                type="text"
                placeholder="Search by country or scholarship name..."
                className="w-full pl-14 pr-6 py-5 bg-transparent rounded-2xl outline-none font-bold text-slate-900"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
           </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s, i) => (
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               key={s.id}
               className="surface bg-white p-8 border border-slate-100 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/5 transition-all group"
             >
                <div className="flex justify-between items-start mb-6">
                   <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 group-hover:bg-amber-100 transition-colors">
                      <Landmark className="w-6 h-6" />
                   </div>
                   <div className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {s.type}
                   </div>
                </div>

                <h3 className="text-xl font-display font-black text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">{s.name}</h3>
                
                <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-6">
                   <Percent className="w-4 h-4" />
                   {s.amount}
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-50">
                   <div className="flex justify-between items-center text-xs">
                      <span className="font-black text-slate-400 uppercase tracking-widest">Deadline</span>
                      <span className="font-bold text-slate-900">{s.deadline}</span>
                   </div>
                   <div className="flex justify-between items-center text-xs">
                      <span className="font-black text-slate-400 uppercase tracking-widest">Region</span>
                      <span className="font-bold text-slate-900">{s.country}</span>
                   </div>
                </div>

                <button 
                  onClick={() => handleApply(s.name)}
                  className="w-full mt-8 py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-amber-500 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
                >
                   Apply Now <ExternalLink className="w-3 h-3" />
                </button>
             </motion.div>
          ))}
        </div>

        <div className="mt-16 p-10 bg-slate-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 opacity-20 rounded-full blur-3xl -mr-32 -mt-32" />
           
           <div className="relative z-10">
              <h2 className="text-3xl font-display font-black mb-2 uppercase tracking-tight">Need expert help?</h2>
              <p className="text-slate-400 font-medium max-w-sm">Our scholarship specialists help you secure 50% - 100% funding.</p>
           </div>
           
           <button 
            onClick={handleConsutation}
            className="relative z-10 px-10 py-5 bg-amber-500 text-slate-900 font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-white transiton-all group"
           >
              Book Consultaion
              <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>

      <LeadCaptureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(data) => {
          console.log('Lead Captured:', data);
          alert('Request received! Our scholarship advisor will contact you shortly with the application guide.');
        }}
        title={selectedScholarship ? `Apply for ${selectedScholarship}` : "Scholarship Consultation"}
        description={selectedScholarship 
          ? "We'll help you prepare a winning application for this specific scholarship." 
          : "Book a free session to find funding opportunities tailored to your profile."}
      />
    </div>
  );
}
