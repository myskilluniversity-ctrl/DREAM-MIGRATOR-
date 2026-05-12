import React, { useMemo, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import SEO from '../components/SEO';
import { 
  ArrowLeft, 
  MapPin, 
  TrendingUp, 
  Wallet, 
  FileText, 
  Lightbulb, 
  CheckCircle2, 
  XCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  Globe,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  Cell
} from 'recharts';
import { COUNTRY_PROFILES } from '../constants';
import { CountryProfile } from '../types';
import LeadCaptureModal from '../components/LeadCaptureModal';

export default function CountryDetail() {
  const { id } = useParams<{ id: string }>();
  const country = useMemo(() => id ? COUNTRY_PROFILES[id] as CountryProfile : null, [id]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'policy' | 'probability'>('probability');
  const [selectedVisa, setSelectedVisa] = useState<string>('');

  if (!country) {
    return <Navigate to="/programs" replace />;
  }

  const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

  const openPolicyModal = (visaType: string) => {
    setSelectedVisa(visaType);
    setModalType('policy');
    setIsModalOpen(true);
  };

  const openProbabilityModal = () => {
    setModalType('probability');
    setIsModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-20 bg-slate-50 min-h-screen"
    >
      <SEO 
        title={`Migration Guide: ${country.name}`}
        description={`Comprehensive migration guide for ${country.name}. Explore job market trends, cost of living, visa requirements, and cultural insights for ${country.name}.`}
        keywords={`${country.name} migration, ${country.name} visa, work in ${country.name}, job market ${country.name}, study in ${country.name}`}
      />
      {/* Hero Header */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={country.heroImage} 
            alt={country.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <Link 
            to="/programs" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 group bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Registry
          </Link>
          
            <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">{country.flag}</span>
              <div className="h-12 w-[2px] bg-brand-500" />
              <div className="text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-500">Destination Profile</p>
                <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight flex items-center gap-4">
                  {country.name}
                  <span className="text-4xl md:text-6xl">{country.flag}</span>
                </h1>
              </div>
            </div>
            <p className="text-xl text-slate-200 leading-relaxed max-w-2xl">
              {country.description}
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Job Market Trends */}
            <section id="job-market">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-700">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold text-slate-900">Job Market Trends</h2>
                  <p className="text-slate-500 font-medium">{country.jobMarket.title}</p>
                </div>
              </div>
              
              <div className="surface p-8 mb-8">
                <p className="text-slate-600 leading-relaxed mb-8">
                  {country.jobMarket.description}
                </p>
                
                <div className="h-[300px] w-full mb-8">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">Annual Salary Growth (%)</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={country.jobMarket.salaryGrowth}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="year" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12 }} 
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="growth" 
                        stroke="#2563eb" 
                        strokeWidth={4} 
                        dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 8, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {country.jobMarket.trendingRoles.map((role, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="w-2 h-2 rounded-full bg-brand-600" />
                      <span className="text-slate-900 font-bold text-sm tracking-tight">{role}</span>
                      <span className="ml-auto text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-bold">High Demand</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Cost of Living */}
            <section id="cost-of-living">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold text-slate-900">Cost of Living Profile</h2>
                  <p className="text-slate-500 font-medium">Monthly baseline estimates (EUR)</p>
                </div>
              </div>

              <div className="surface p-8">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
                   <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Affordability Index</p>
                      <p className="text-3xl font-black text-slate-900">{country.costOfLiving.index} <span className="text-sm font-medium text-slate-400">/ 100 base</span></p>
                   </div>
                   <div className="text-right">
                      <div className={`px-4 py-2 rounded-full text-xs font-bold ${country.costOfLiving.index > 130 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                         {country.costOfLiving.index > 130 ? 'Premium Tier' : 'Tier 1 Standard'}
                      </div>
                   </div>
                </div>

                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={country.costOfLiving.comparison}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="item" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12 }} 
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                      />
                      <Tooltip 
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {country.costOfLiving.comparison.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* Cultural Insights */}
            <section id="culture">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold text-slate-900">Cultural Intelligence</h2>
                  <p className="text-slate-500 font-medium">{country.culturalInsights.title}</p>
                </div>
              </div>

              <div className="surface p-8 overflow-hidden relative border-none bg-white shadow-sm">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/30 blur-3xl -z-10 rounded-full -mr-32 -mt-32" />
                
                <p className="text-slate-600 leading-relaxed mb-10 text-lg font-medium">
                  {country.culturalInsights.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full w-fit">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="font-bold uppercase tracking-widest text-[10px]">Cultural Dos</span>
                    </div>
                    <div className="space-y-4">
                       {country.culturalInsights.dos.map((item, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="text-slate-700 font-semibold text-sm leading-tight pt-1.5">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 px-4 py-2 bg-rose-50 text-rose-700 rounded-full w-fit">
                      <ThumbsDown className="w-4 h-4" />
                      <span className="font-bold uppercase tracking-widest text-[10px]">Cultural Don'ts</span>
                    </div>
                    <div className="space-y-4">
                      {country.culturalInsights.donts.map((item, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0 group-hover:scale-110 transition-transform">
                            <XCircle className="w-4 h-4" />
                          </div>
                          <span className="text-slate-700 font-semibold text-sm leading-tight pt-1.5">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar / Visa Sticky */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-8">
             <div className="surface-raised p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Visa Tracks</h3>
                </div>

                <div className="space-y-6">
                  {country.visaRequirements.map((visa, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-brand-500/30 transition-all">
                       <h4 className="font-bold text-slate-900 mb-2 truncate">{visa.type}</h4>
                       <div className="flex items-center gap-2 text-xs text-brand-600 font-bold mb-4">
                          <Clock className="w-3.5 h-3.5" />
                          {visa.processingTime} processing
                       </div>
                       <ul className="space-y-3 mb-6">
                          {visa.requirements.map((req, ridx) => (
                            <li key={ridx} className="flex items-start gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5" />
                              {req}
                            </li>
                          ))}
                       </ul>
                       <button 
                        onClick={() => openPolicyModal(visa.type)}
                        className="w-full py-3 bg-white border border-slate-200 text-slate-900 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
                       >
                          View Detailed Policy
                          <ExternalLink className="w-3 h-3" />
                       </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                   <div className="flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Government Data Source
                   </div>
                   <button 
                    onClick={openProbabilityModal}
                    className="w-full py-4 bg-brand-500 text-slate-900 rounded-xl font-bold shadow-xl shadow-brand-500/20 hover:bg-brand-400 transition-all flex items-center justify-center gap-2"
                   >
                       Check My Probability
                       <TrendingUp className="w-4 h-4" />
                   </button>
                </div>
             </div>

             <div className="surface p-6 bg-slate-900 text-white border-none relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 blur-3xl rounded-full" />
                <h4 className="font-bold text-sm mb-2 flex items-center gap-2 relative z-10">
                   <Globe className="w-4 h-4 text-brand-400" />
                   Live Quota Alert
                </h4>
                <p className="text-white/60 text-xs leading-relaxed mb-4 relative z-10">
                   {country.name} immigration targets for Q2 2026 are 82% fulfilled. Rapid processing tracks are closing in June.
                </p>
                <div className="w-full bg-white/10 h-1 rounded-full relative z-10">
                   <div className="h-full bg-brand-500 w-[82%]" />
                </div>
             </div>
          </div>

        </div>
      </main>

      <LeadCaptureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(data) => {
          console.log('Lead Captured:', data);
          alert(modalType === 'policy' ? `Policy documents for ${selectedVisa} sent to your email!` : `Our experts are analyzing your profile for ${country.name}. Check your email in 5 minutes!`);
        }}
        title={modalType === 'policy' ? `Visa Policy Guide: ${selectedVisa}` : `Probability Scan: ${country.name}`}
        description={modalType === 'policy' ? "Download the official document checklist and policy guidelines for this visa track." : "Get a data-backed assessment of your chances based on current policy and quotas."}
      />
    </motion.div>
  );
}
