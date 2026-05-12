import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { 
  Plus, 
  X, 
  BarChart3, 
  Globe, 
  Wallet, 
  Clock, 
  Trophy, 
  Zap, 
  Search,
  Filter,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { PROGRAMS } from '../constants';
import { Program, DifficultyLevel } from '../types';
import { saveLead } from '../services/leadService';
import { useAuth } from '../context/AuthContext';

export default function ComparisonTool() {
  const { user, profile } = useAuth();
  const [selectedPrograms, setSelectedPrograms] = useState<Program[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('All');
  const [budgetFilter, setBudgetFilter] = useState('All');
  const [simulatingProgram, setSimulatingProgram] = useState<Program | null>(null);
  const [simulationLoading, setSimulationLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const availableCountries = useMemo(() => 
    ['All', ...new Set(PROGRAMS.map(p => p.country))], 
  []);

  const filteredPrograms = useMemo(() => {
    return PROGRAMS.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry = countryFilter === 'All' || p.country === countryFilter;
      
      // Rough budget categorization logic
      const costValue = p.cost.replace(/[^0-9]/g, '');
      const parsedCost = costValue ? parseInt(costValue) : 0;
      let category = 'Low';
      if (parsedCost > 10000) category = 'High';
      else if (parsedCost > 0) category = 'Medium';
      
      const matchesBudget = budgetFilter === 'All' || category === budgetFilter;
      
      const isNotSelected = !selectedPrograms.some(sp => sp.id === p.id);
      return matchesSearch && matchesCountry && matchesBudget && isNotSelected;
    });
  }, [searchQuery, countryFilter, budgetFilter, selectedPrograms]);

  const toggleProgram = (program: Program) => {
    if (selectedPrograms.some(p => p.id === program.id)) {
      setSelectedPrograms(selectedPrograms.filter(p => p.id !== program.id));
    } else {
      if (selectedPrograms.length < 3) {
        setSelectedPrograms([...selectedPrograms, program]);
      }
    }
  };

  const handleSimulate = (program: Program) => {
    setSimulatingProgram(program);
    setSimulationLoading(true);
    setSaveSuccess(false);
    setError(null);
    const timer = setTimeout(() => {
      setSimulationLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  };

  const [error, setError] = useState<string | null>(null);

  const handleConfirmPathway = async () => {
    if (!simulatingProgram) return;
    
    setIsSaving(true);
    setError(null);
    try {
      await saveLead({
        name: profile?.displayName || 'Auth User',
        email: user?.email || 'authenticated@user.com',
        phone: 'N/A',
        source: 'simulation_confirm',
        userId: user?.uid,
        details: {
          programId: simulatingProgram.id,
          title: simulatingProgram.title,
          country: simulatingProgram.country,
          probability: simulatingProgram.successProbability,
          duration: simulatingProgram.duration,
          timestamp: new Date().toISOString()
        }
      });
      setSaveSuccess(true);
      setTimeout(() => {
        setSimulatingProgram(null);
        setSaveSuccess(false);
      }, 1500);
    } catch (err: any) {
      console.error("Error saving pathway:", err);
      setError("Unable to save selection. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const getDifficultyColor = (level: DifficultyLevel) => {
    switch (level) {
      case DifficultyLevel.LOW: return 'text-emerald-600 bg-emerald-50';
      case DifficultyLevel.MEDIUM: return 'text-amber-600 bg-amber-50';
      case DifficultyLevel.HIGH: return 'text-rose-600 bg-rose-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 bg-slate-50 min-h-screen"
    >
      <SEO 
        title="Pathway Comparison Engine"
        description="Compare global migration pathways side-by-side. Analyze costs, timelines, difficulty levels, and success probabilities for different countries."
        keywords="migration comparison, study abroad tool, visa comparison, career pathway analysis, global migration tracks"
      />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest mb-6">
            <BarChart3 className="w-4 h-4" />
            Decision Intelligence
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Pathway <span className="text-brand-600 font-black">Comparison Engine</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  selectedPrograms.length >= num ? 'bg-brand-600 scale-125' : 'bg-slate-200'
                }`}
              />
            ))}
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
              {selectedPrograms.length} of 3 Slots Active
            </span>
          </div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            Side-by-side analysis of global migration tracks. Select up to 3 programs to compare technical requirements, costs, and outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Controls & Selector */}
          <div className="lg:col-span-1 space-y-8">
            <div className="surface p-6 bg-white border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter block mb-2">Search Entry</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      type="text" 
                      placeholder="Program name..."
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:border-brand-500 transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter block mb-2">Target Territory</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:border-brand-500 transition-all appearance-none"
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                  >
                    {availableCountries.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter block mb-2">Investment Tier</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:border-brand-500 transition-all appearance-none"
                    value={budgetFilter}
                    onChange={(e) => setBudgetFilter(e.target.value)}
                  >
                    <option value="All">All Tiers</option>
                    <option value="Low">Low Commitment</option>
                    <option value="Medium">Medium Commitment</option>
                    <option value="High">Premium Selection</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="surface p-6 bg-white border-slate-200 overflow-hidden">
               <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Available Pathways</h3>
               <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredPrograms.map(p => (
                    <button
                      key={p.id}
                      onClick={() => toggleProgram(p)}
                      className="w-full text-left p-3 rounded-xl hover:bg-brand-50 border border-transparent hover:border-brand-200 transition-all group flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors shrink-0">
                         <Plus className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm leading-tight">{p.title}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mt-1">{p.country}</p>
                      </div>
                    </button>
                  ))}
                  {filteredPrograms.length === 0 && (
                    <p className="text-slate-400 text-xs italic py-4">No matching programs found.</p>
                  )}
               </div>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="lg:col-span-3">
             {selectedPrograms.length === 0 ? (
               <div className="h-full min-h-[400px] flex flex-col items-center justify-center surface bg-slate-100/50 border-dashed border-slate-300">
                  <BarChart3 className="w-12 h-12 text-slate-300 mb-4" />
                  <p className="text-slate-500 font-bold">Select programs from the list to start comparing.</p>
               </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
                  <AnimatePresence mode="popLayout">
                    {selectedPrograms.map((p) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        layout
                        className="surface bg-white border-slate-200 p-8 flex flex-col relative group overflow-hidden"
                      >
                        {/* Remove button */}
                        <button 
                          onClick={() => toggleProgram(p)}
                          className="absolute top-4 right-4 p-2 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all z-20"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        {/* Top Info */}
                        <div className="mb-8">
                           <div className="flex items-center gap-2 text-brand-600 mb-4">
                              <Globe className="w-4 h-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest">{p.country}</span>
                           </div>
                           <h3 className="text-2xl font-display font-black text-slate-900 leading-tight mb-2">{p.title}</h3>
                           <p className="text-slate-500 text-xs leading-relaxed font-medium line-clamp-2">
                             {p.description}
                           </p>
                        </div>

                        {/* Metrics Grid */}
                        <div className="space-y-6 flex-1">
                           <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                 <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span className="text-[10px] font-bold uppercase tracking-tighter">Timeline</span>
                                 </div>
                                 <p className="text-slate-900 font-black text-sm">{p.duration}</p>
                              </div>
                              <div className={`p-4 rounded-2xl border border-slate-100 ${getDifficultyColor(p.difficulty)}`}>
                                 <div className="flex items-center gap-2 opacity-60 mb-1">
                                    <Zap className="w-3.5 h-3.5" />
                                    <span className="text-[10px] font-bold uppercase tracking-tighter text-inherit">Difficulty</span>
                                 </div>
                                 <p className="font-black text-sm uppercase tracking-widest">{p.difficulty}</p>
                              </div>
                           </div>

                           <div className="p-4 bg-brand-50/50 border border-brand-100 rounded-2xl relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-16 h-16 bg-brand-500/5 -mr-8 -mt-8 rotate-12 blur-xl" />
                              <div className="flex items-center gap-2 text-brand-600 mb-1">
                                 <Wallet className="w-3.5 h-3.5" />
                                 <span className="text-[10px] font-black uppercase tracking-tighter">Investment (Est.)</span>
                              </div>
                              <p className="text-slate-900 font-black text-base">{p.cost}</p>
                           </div>

                           <div className="space-y-4">
                              <div>
                                 <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2 text-slate-400">
                                       <Trophy className="w-3.5 h-3.5" />
                                       <span className="text-[10px] font-bold uppercase tracking-tighter">Success Score</span>
                                    </div>
                                    <span className="text-slate-900 font-black text-xs">{p.successProbability}%</span>
                                 </div>
                                 <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${p.successProbability}%` }}
                                      className="h-full bg-emerald-500"
                                    />
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Key Outcome</div>
                                 <div className="flex items-start gap-2 text-slate-700 font-bold text-xs leading-4">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                                    {p.outcome}
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-8 pt-6 border-t border-slate-100">
                           <button 
                             onClick={() => handleSimulate(p)}
                             className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-600 transition-all flex items-center justify-center gap-2 group/btn"
                           >
                              Simulate My Migration
                              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                           </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
               </div>
             )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {simulatingProgram && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSimulatingProgram(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-full max-w-2xl bg-white rounded-[40px] shadow-3xl z-[101] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <button 
                onClick={() => setSimulatingProgram(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors z-10 bg-white/80 backdrop-blur-md rounded-full"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative p-8 md:p-12 overflow-y-auto custom-scrollbar">
                {simulationLoading ? (
                  <div className="py-20 flex flex-col items-center text-center">
                    <div className="relative mb-8">
                       <div className="w-24 h-24 border-4 border-brand-50 border-t-brand-600 rounded-full animate-spin" />
                       <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-brand-600" />
                    </div>
                    <h3 className="text-2xl font-display font-black text-slate-900 mb-2">Simulating Migration Track...</h3>
                    <p className="text-slate-500 font-medium tracking-tight">Processing technical thresholds and current labor capacity for {simulatingProgram.country}.</p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-3xl flex items-center justify-center">
                        <BarChart3 className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-1">MIGRADATA SIMULATION v2.1</div>
                        <h3 className="text-3xl font-display font-black text-slate-900 tracking-tighter">Migration Outcome</h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                      <div className="p-6 bg-slate-50 rounded-3xl">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Probability Analysis</p>
                        <div className="flex items-end gap-3 mb-4">
                           <div className="text-5xl font-display font-black text-slate-900">{simulatingProgram.successProbability}%</div>
                           <div className="text-emerald-600 font-bold text-sm pb-1 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> Optimized
                           </div>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${simulatingProgram.successProbability}%` }}
                             className="h-full bg-brand-600"
                           />
                        </div>
                      </div>

                      <div className="space-y-4">
                         <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                               <Plus className="w-4 h-4" />
                            </div>
                            <div>
                               <p className="text-sm font-bold text-slate-900">Immediate Potential</p>
                               <p className="text-xs text-slate-500">Your profile matches 88% of current demand keywords in {simulatingProgram.country}.</p>
                            </div>
                         </div>
                         <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                               <Clock className="w-4 h-4" />
                            </div>
                            <div>
                               <p className="text-sm font-bold text-slate-900">Timeline Forecast</p>
                               <p className="text-xs text-slate-500">Estimated processing: {simulatingProgram.duration} for full residency transition.</p>
                            </div>
                         </div>
                      </div>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600/20 blur-3xl -mr-16 -mt-16" />
                       <h4 className="text-xs font-black text-brand-400 uppercase tracking-[0.2em] mb-4">AI Advisor Verdict</h4>
                       <p className="text-lg font-medium leading-relaxed italic opacity-90 mb-6">
                         "The {simulatingProgram.title} track represents a high-efficiency entry point. By leveraging your current background, we anticipate a frictionless visa conversion within {simulatingProgram.duration}."
                       </p>
                       <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" /> Policy Compliance Verified: Q2 2026
                       </div>
                    </div>

                    {error && (
                      <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-[10px] font-black uppercase tracking-widest text-center">
                        {error}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                       <button 
                         onClick={handleConfirmPathway}
                         disabled={isSaving || saveSuccess}
                         className="flex-1 py-5 bg-brand-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/20 disabled:bg-emerald-500 disabled:opacity-100"
                       >
                          {isSaving ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : saveSuccess ? (
                            <>
                              <CheckCircle2 className="w-5 h-5" />
                              Confirmed & Saved
                            </>
                          ) : (
                            <>
                              Confirm Pathway Track
                              <ChevronRight className="w-5 h-5" />
                            </>
                          )}
                       </button>
                       {saveSuccess ? (
                         <Link 
                           to="/dashboard"
                           className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all text-center"
                         >
                            Go to Dashboard
                         </Link>
                       ) : (
                         <button 
                           onClick={() => setSimulatingProgram(null)}
                           className="px-10 py-5 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                         >
                            Recalibrate
                         </button>
                       )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
