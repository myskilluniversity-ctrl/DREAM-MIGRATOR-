import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, GraduationCap, MapPin, Star, Building2, Filter, ArrowRight } from 'lucide-react';
import LeadCaptureModal from '../components/LeadCaptureModal';

const UNIVERSITIES = [
  { id: 1, name: 'University of Oxford', location: 'United Kingdom', rank: 1, type: 'Public Research', programs: ['Computer Science', 'Business', 'Law'] },
  { id: 2, name: 'Harvard University', location: 'USA', rank: 2, type: 'Private Ivy', programs: ['Medicine', 'Business', 'Politics'] },
  { id: 3, name: 'Technical University of Munich', location: 'Germany', rank: 49, type: 'Public Research', programs: ['Engineering', 'Data Science', 'Informatics'] },
  { id: 4, name: 'University of Toronto', location: 'Canada', rank: 18, type: 'Public Research', programs: ['AI', 'Engineering', 'Social Sciences'] },
  { id: 5, name: 'University of Melbourne', location: 'Australia', rank: 33, type: 'Public Research', programs: ['Medicine', 'Engineering', 'Arts'] },
];

export default function UniversityFinder() {
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetUni, setTargetUni] = useState<string | null>(null);

  const filtered = UNIVERSITIES.filter(u => {
    const matchesQuery = u.name.toLowerCase().includes(query.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || u.location === selectedCountry;
    return matchesQuery && matchesCountry;
  });

  const handleViewCourses = (name: string) => {
    setTargetUni(name);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 rounded-full text-brand-700 text-xs font-black uppercase tracking-widest mb-6">
                <GraduationCap className="w-4 h-4" />
                University Directory
              </div>
              <h1 className="text-5xl font-display font-black text-slate-900 mb-6 tracking-tight">
                Global <span className="text-brand-600">Institution</span> Search
              </h1>
              <p className="text-xl text-slate-600 font-medium max-w-2xl">
                Explore thousands of verified universities across Dream Migrator's partner network.
              </p>
            </div>
            
            <div className="w-full md:w-96">
               <div className="relative group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search by name or program..."
                    className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-bold text-slate-900"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
               </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="surface bg-white p-8 sticky top-32">
               <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 mb-6">
                  <Filter className="w-4 h-4" /> Filters
               </div>
               
               <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">By Country</label>
                    <div className="space-y-2">
                       {['All', 'USA', 'United Kingdom', 'Germany', 'Canada', 'Australia'].map((c) => (
                         <button
                           key={c}
                           onClick={() => setSelectedCountry(c)}
                           className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                             selectedCountry === c ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-600 hover:bg-slate-50'
                           }`}
                         >
                           {c}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div>
                     <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">University Type</label>
                     <div className="space-y-4">
                        {['Public', 'Private', 'Technical'].map(type => (
                           <label key={type} className="flex items-center gap-3 cursor-pointer group">
                             <input type="checkbox" className="w-5 h-5 border-2 border-slate-200 rounded text-brand-500 focus:ring-brand-500" />
                             <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{type}</span>
                           </label>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 space-y-6">
             <div className="flex items-center justify-between px-2 mb-4">
               <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{filtered.length} Universities Found</span>
             </div>

             <div className="grid grid-cols-1 gap-4">
                {filtered.map((u, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={u.id}
                    className="surface bg-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:shadow-2xl hover:shadow-brand-500/5 transition-all border border-slate-50 hover:border-brand-200"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                        <Building2 className="w-10 h-10 text-slate-200" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight group-hover:text-brand-600 transition-colors">{u.name}</h3>
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded text-[10px] font-black text-slate-500 uppercase">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            World #{u.rank}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4 items-center">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                             <MapPin className="w-4 h-4" /> {u.location}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                             <GraduationCap className="w-4 h-4" /> {u.type}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                           {u.programs.map(p => (
                             <span key={p} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black uppercase text-slate-500 tracking-widest">
                               {p}
                             </span>
                           ))}
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleViewCourses(u.name)}
                      className="w-full md:w-auto px-8 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-500 hover:text-slate-900 transition-all flex items-center justify-center gap-3 whitespace-nowrap shadow-xl shadow-slate-900/10"
                    >
                      View Courses
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </div>

      <LeadCaptureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(data) => {
          console.log('Lead Captured:', data);
          alert(`Course catalog for ${targetUni} is being prepared! We'll email it to you shortly along with scholarship options.`);
        }}
        title={`Course Catalog: ${targetUni}`}
        description="Get the full list of programs, intake dates, and entry requirements for your selected university."
      />
    </div>
  );
}
