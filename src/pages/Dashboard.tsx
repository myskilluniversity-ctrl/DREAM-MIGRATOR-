import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Users, 
  Download, 
  FileText, 
  Search, 
  Filter, 
  ChevronRight,
  ExternalLink,
  Shield,
  GraduationCap,
  Calendar,
  LogOut,
  Zap,
  CreditCard,
  DollarSign,
  Wallet,
  Receipt
} from 'lucide-react';
import { Lead, getLeads } from '../services/leadService';
import { Transaction, getTransactionsByLead } from '../services/transactionService';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

export default function Dashboard() {
  const { profile, logout } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [studentTransactions, setStudentTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchLeads() {
      if (!profile) return;
      
      setLoading(true);
      try {
        const allLeads = await getLeads();
        if (profile.role === 'admin') {
          setLeads(allLeads);
        } else {
          const userLeads = allLeads.filter(l => l.email === profile.email);
          setLeads(userLeads);
          
          if (userLeads.length > 0) {
            const trans = await getTransactionsByLead(userLeads[0].id);
            setStudentTransactions(trans);
          }
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, [profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      </div>
    );
  }

  const filteredLeads = leads.filter(lead => 
    lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.source?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 bg-slate-50 min-h-screen"
    >
      <SEO 
        title={profile?.role === 'admin' ? "Admin Console | Dream Migrator" : "Student Portal | Dream Migrator"}
        description="Manage your migration journey and access your resources."
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${profile?.role === 'admin' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-brand-50 text-brand-700 border border-brand-100'}`}>
                {profile?.role === 'admin' ? <Shield className="w-3 h-3 inline mr-1" /> : <GraduationCap className="w-3 h-3 inline mr-1" />}
                {profile?.role === 'admin' ? 'Administrator' : 'Student Account'}
              </div>
            </div>
            <h1 className="text-4xl font-display font-black text-slate-900 tracking-tighter">
              Welcome back, <span className="text-brand-700">{profile?.displayName.split(' ')[0]}</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <Link 
              to="/admin"
              className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-brand-500 hover:text-slate-900 transition-all shadow-lg shadow-slate-900/10"
            >
              <Shield className="w-4 h-4" />
              Open CRM Console
            </Link>
            <button 
              onClick={logout}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 hover:text-red-600 transition-all shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {profile?.role === 'admin' ? (
          /* ADMIN VIEW */
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-3xl font-display font-black text-slate-900 mb-1">{leads.length}</div>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">Total Leads Captured</div>
              </div>
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <Download className="w-5 h-5" />
                </div>
                <div className="text-3xl font-display font-black text-slate-900 mb-1">
                  {leads.filter(l => l.source === 'download').length}
                </div>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">Guide Downloads</div>
              </div>
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-3xl font-display font-black text-slate-900 mb-1">
                  {leads.filter(l => l.source === 'assessment').length}
                </div>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">Assessments Taken</div>
              </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Search by name, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:bg-white focus:border-brand-500 outline-none w-full md:w-64"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">User / Lead</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Source</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Details</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="font-bold text-slate-900">{lead.name}</div>
                          <div className="text-xs text-slate-500">{lead.email}</div>
                          <div className="text-[10px] text-slate-400 font-medium">{lead.phone}</div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            lead.source === 'assessment' ? 'bg-purple-50 text-purple-600' : 
                            lead.source === 'download' ? 'bg-emerald-50 text-emerald-600' : 
                            lead.source === 'simulation_confirm' ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' :
                            'bg-brand-50 text-brand-600'
                          }`}>
                            {lead.source === 'simulation_confirm' ? 'SIM CONFIRMED' : lead.source}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-xs text-slate-600 max-w-xs truncate font-medium">
                            {lead.details?.title ? `${lead.details.title} (${lead.details.country})` : 
                             lead.details?.guide || lead.details?.country || 'No details'}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                              <Calendar className="w-3 h-3" />
                              {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Recent'}
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="p-2 text-slate-400 hover:text-brand-600 transition-colors">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredLeads.length === 0 && (
                <div className="p-20 text-center text-slate-400 font-medium">
                  No records found matching your search.
                </div>
              )}
            </div>
          </div>
        ) : (
          /* STUDENT VIEW */
          <div className="space-y-12">
            {leads.some(l => l.budget || l.amountPaid) && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-slate-900">Financial Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center mb-6">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div className="text-3xl font-display font-black text-slate-900 mb-1">
                      ₹{(leads[0].budget || 0).toLocaleString()}
                    </div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">Enrollment Budget</div>
                  </div>
                  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm border-brand-100 ring-4 ring-brand-50">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div className="text-3xl font-display font-black text-slate-900 mb-1 text-emerald-600">
                      ₹{(leads[0].amountPaid || 0).toLocaleString()}
                    </div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">Total Amount Paid</div>
                  </div>
                  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div className="text-3xl font-display font-black text-slate-900 mb-1">
                      ₹{((leads[0].budget || 0) - (leads[0].amountPaid || 0)).toLocaleString()}
                    </div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">Outstanding Balance</div>
                  </div>
                </div>

                {studentTransactions.length > 0 && (
                   <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
                      <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                         <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                           <Receipt className="w-5 h-5 text-brand-600" />
                           Recent Receipts
                         </h3>
                         <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">Verified Log</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <tbody className="divide-y divide-slate-50">
                            {studentTransactions.map((t) => (
                              <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-5">
                                  <div className="text-sm font-bold text-slate-900">{t.category}</div>
                                  <div className="text-[10px] text-slate-400 font-bold uppercase">{new Date(t.date).toLocaleDateString()}</div>
                                </td>
                                <td className="px-8 py-5">
                                   <div className="text-xs font-medium text-slate-500 italic">{t.notes || t.paymentMethod}</div>
                                </td>
                                <td className={`px-8 py-5 text-right font-black ${t.type === 'payment' ? 'text-emerald-600' : 'text-red-500'}`}>
                                  {t.type === 'payment' ? '+' : '-'}₹{t.amount.toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                   </div>
                )}
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-8">My Resources</h2>
              {leads.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {leads.map((resource) => (
                    <div key={resource.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                      <div className="flex justify-between items-start mb-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          resource.source === 'download' ? 'bg-emerald-50 text-emerald-600' : 
                          resource.source === 'simulation_confirm' ? 'bg-brand-500 text-slate-900' :
                          'bg-purple-50 text-purple-600'
                        }`}>
                          {resource.source === 'download' ? <Download className="w-6 h-6" /> : 
                           resource.source === 'simulation_confirm' ? <Zap className="w-6 h-6" /> :
                           <FileText className="w-6 h-6" />}
                        </div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {resource.createdAt ? new Date(resource.createdAt).toLocaleDateString() : 'Just now'}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">
                        {resource.details?.title || resource.details?.guide || resource.details?.country || 'Migration Document'}
                      </h3>
                      <p className="text-slate-500 text-xs mb-8 leading-relaxed font-medium">
                        {resource.source === 'download' ? "Full PDF guide accessible for your reference." : 
                         resource.source === 'simulation_confirm' ? `Confirmed pathway for ${resource.details?.country}. Simulation: SUCCESS.` :
                         "Personalized eligibility report based on your assessment."}
                      </p>
                      <Link 
                        to={resource.source === 'simulation_confirm' ? "/compare" : "/"}
                        className="flex items-center gap-2 text-brand-600 text-sm font-bold group-hover:gap-3 transition-all"
                      >
                        {resource.source === 'download' ? "Download Again" : 
                         resource.source === 'simulation_confirm' ? "Simulate Again" :
                         "View Result"}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                  <div className="bg-slate-100 border border-dashed border-slate-300 rounded-3xl p-8 flex flex-col items-center justify-center text-center opacity-70">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 mb-4">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="text-slate-500 font-bold text-sm mb-1">More to come</div>
                    <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest">Unlocked as you progress</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No data yet</h3>
                  <p className="text-slate-500 max-w-sm mx-auto mb-8 font-medium">You haven't downloaded any guides or taken the assessment yet. Start your journey today!</p>
                  <a href="/compare" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 text-slate-900 rounded-full font-bold hover:bg-brand-400 transition-all shadow-lg shadow-brand-500/20">
                    Start Assessment
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
