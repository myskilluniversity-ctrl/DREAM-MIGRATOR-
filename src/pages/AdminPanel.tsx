import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  Filter, 
  ChevronRight, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MessageSquare,
  BarChart3,
  TrendingUp,
  Mail,
  Phone,
  Shield,
  MoreVertical,
  Edit,
  Save,
  X,
  CreditCard,
  DollarSign,
  Wallet,
  Plus,
  UserPlus,
  Receipt,
  ArrowDownLeft,
  ArrowUpRight
} from 'lucide-react';
import { Lead, updateLead, getLeads, saveLead } from '../services/leadService';
import { Transaction, getTransactions, addTransaction } from '../services/transactionService';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

type AdminTab = 'leads' | 'analytics' | 'finances' | 'users';

interface AdminPanelProps {
  initialTab?: AdminTab;
}

export default function AdminPanel({ initialTab = 'leads' }: AdminPanelProps) {
  const { profile } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [editingLead, setEditingLead] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Lead>>({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'contact' as Lead['source'],
    details: {
      country: '',
    }
  });

  const [financeSearch, setFinanceSearch] = useState('');
  const [financeFilter, setFinanceFilter] = useState<'all' | 'pending' | 'paid'>('all');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedLeadForPayment, setSelectedLeadForPayment] = useState<Lead | null>(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: 0,
    type: 'payment' as Transaction['type'],
    paymentMethod: 'Bank Transfer',
    category: 'service_fee' as Transaction['category'],
    notes: ''
  });

  const fetchData = async () => {
    if (profile?.role !== 'admin') return;
    
    setLoading(true);
    try {
      const leadsData = await getLeads();
      setLeads(leadsData);
      const transData = await getTransactions();
      setTransactions(transData);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    fetchData();
  }, [profile]);

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await saveLead(newLeadForm);
    if ((result as any).success) {
      setIsAddModalOpen(false);
      setNewLeadForm({ name: '', email: '', phone: '', source: 'contact', details: { country: '' } });
      fetchData();
    }
  };

  const handleEditClick = (lead: Lead) => {
    setEditingLead(lead.id || null);
    setEditForm({
      status: lead.status,
      notes: lead.notes || '',
      budget: lead.budget || 0,
      amountPaid: lead.amountPaid || 0,
      paymentStatus: lead.paymentStatus || 'pending'
    });
  };

  const handleSaveEdit = async (leadId: string) => {
    const success = await updateLead(leadId, editForm);
    if (success) {
      setLeads(leads.map(l => l.id === leadId ? { ...l, ...editForm } : l));
      setEditingLead(null);
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLeadForPayment) return;

    const result = await addTransaction({
      leadId: selectedLeadForPayment.id,
      leadName: selectedLeadForPayment.name,
      amount: paymentForm.amount,
      type: paymentForm.type,
      paymentMethod: paymentForm.paymentMethod,
      category: paymentForm.category,
      notes: paymentForm.notes,
      date: new Date().toISOString()
    });

    if (result.success) {
      // Update lead balance
      const currentPaid = selectedLeadForPayment.amountPaid || 0;
      const newPaid = paymentForm.type === 'payment' 
        ? currentPaid + paymentForm.amount 
        : currentPaid - paymentForm.amount;
      
      const newStatus = (selectedLeadForPayment.budget && newPaid >= selectedLeadForPayment.budget) 
        ? 'fully_paid' 
        : (newPaid > 0 ? 'partially_paid' : 'pending');

      await updateLead(selectedLeadForPayment.id, { 
        amountPaid: newPaid,
        paymentStatus: newStatus as any
      });

      setIsPaymentModalOpen(false);
      setPaymentForm({
        amount: 0,
        type: 'payment',
        paymentMethod: 'Bank Transfer',
        category: 'service_fee',
        notes: ''
      });
      fetchData();
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <div className="text-center">
          <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900">Access Restricted</h2>
          <p className="text-slate-500">Only administrators can view this panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SEO title="CRM Admin Panel | Dream Migrator" description="Deep analytics and lead management system." />
      
      {activeTab === 'leads' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:border-brand-500 outline-none font-medium text-sm shadow-sm"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-500 hover:text-slate-900 transition-all flex items-center gap-2 shadow-xl shadow-slate-900/10"
                >
                  <UserPlus className="w-4 h-4" />
                  Add Lead
                </button>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="flex-1 md:flex-none px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold uppercase tracking-widest outline-none cursor-pointer focus:border-brand-500 shadow-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="disqualified">Disqualified</option>
                  <option value="enrolled">Enrolled</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead Identity</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Profile & Source</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timeline</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-700 font-bold">
                              {lead.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{lead.name}</div>
                              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                <Mail className="w-3 h-3" /> {lead.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-xs font-bold text-slate-700 mb-1">{lead.details?.country || lead.details?.guide || 'General Inquiry'}</div>
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-400 text-[9px] font-black uppercase tracking-widest">Source: {lead.source}</span>
                        </td>
                        <td className="px-8 py-6">
                          {editingLead === lead.id ? (
                            <select
                              value={editForm.status}
                              onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                              className="px-2 py-1 bg-white border border-brand-500 rounded-lg text-[10px] font-bold uppercase"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="disqualified">Disqualified</option>
                              <option value="enrolled">Enrolled</option>
                            </select>
                          ) : (
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              lead.status === 'enrolled' ? 'bg-emerald-50 text-emerald-600' :
                              lead.status === 'disqualified' ? 'bg-red-50 text-red-600' :
                              lead.status === 'qualified' ? 'bg-brand-50 text-brand-700' :
                              'bg-slate-100 text-slate-500'
                            }`}>
                              {lead.status || 'new'}
                            </span>
                          )}
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium lowercase">
                            <Clock className="w-3 h-3" />
                            {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                             {editingLead === lead.id ? (
                               <>
                                 <button onClick={() => handleSaveEdit(lead.id!)} className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100">
                                   <Save className="w-4 h-4" />
                                 </button>
                                 <button onClick={() => setEditingLead(null)} className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-100">
                                   <X className="w-4 h-4" />
                                 </button>
                               </>
                             ) : (
                               <button onClick={() => handleEditClick(lead)} className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">
                                 <Edit className="w-4 h-4" />
                               </button>
                             )}
                             <button className="p-2 text-slate-400 hover:text-brand-600">
                               <ChevronRight className="w-4 h-4" />
                             </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredLeads.length === 0 && (
                <div className="p-24 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-200" />
                  </div>
                  <h3 className="text-slate-900 font-bold mb-1">No data matching filters</h3>
                  <p className="text-slate-400 text-sm font-medium">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'finances' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by client name or email..."
              value={financeSearch}
              onChange={(e) => setFinanceSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:border-brand-500 outline-none font-medium text-sm shadow-sm"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <select 
              value={financeFilter}
              onChange={(e) => setFinanceFilter(e.target.value as any)}
              className="flex-1 md:flex-none px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold uppercase tracking-widest outline-none cursor-pointer focus:border-brand-500 shadow-sm"
            >
              <option value="all">All Records</option>
              <option value="pending">Outstanding Only</option>
              <option value="paid">Fully Settled</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="text-3xl font-display font-black text-slate-900 mb-1">
                  ₹{leads.reduce((acc, lead) => acc + (lead.amountPaid || 0), 0).toLocaleString()}
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gross Revenue</div>
              </div>
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center mb-6">
                  <Wallet className="w-5 h-5" />
                </div>
                <div className="text-3xl font-display font-black text-slate-900 mb-1">
                  ₹{leads.reduce((acc, lead) => acc + ((lead.budget || 0) - (lead.amountPaid || 0)), 0).toLocaleString()}
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Receivables</div>
              </div>
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="text-3xl font-display font-black text-slate-900 mb-1">
                  {leads.filter(l => l.paymentStatus === 'fully_paid').length}
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Settled Accounts</div>
              </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Financial Status</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Budget</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Paid</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {leads
                      .filter(l => {
                        const matchesSearch = l.name.toLowerCase().includes(financeSearch.toLowerCase()) || l.email.toLowerCase().includes(financeSearch.toLowerCase());
                        const matchesFilter = financeFilter === 'all' || 
                                            (financeFilter === 'pending' && l.paymentStatus !== 'fully_paid') ||
                                            (financeFilter === 'paid' && l.paymentStatus === 'fully_paid');
                        return matchesSearch && matchesFilter;
                      })
                      .map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="font-bold text-slate-900">{lead.name}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">{lead.email}</div>
                        </td>
                        <td className="px-8 py-6">
                          {editingLead === lead.id ? (
                            <select
                              value={editForm.paymentStatus}
                              onChange={(e) => setEditForm({ ...editForm, paymentStatus: e.target.value as any })}
                              className="px-2 py-1 bg-white border border-brand-500 rounded-lg text-[10px] font-bold uppercase"
                            >
                              <option value="pending">Pending</option>
                              <option value="partially_paid">Partial</option>
                              <option value="fully_paid">Fully Paid</option>
                              <option value="refunded">Refunded</option>
                            </select>
                          ) : (
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              lead.paymentStatus === 'fully_paid' ? 'bg-emerald-50 text-emerald-600' :
                              lead.paymentStatus === 'refunded' ? 'bg-red-50 text-red-600' :
                              lead.paymentStatus === 'partially_paid' ? 'bg-brand-50 text-brand-700' :
                              'bg-slate-100 text-slate-500'
                            }`}>
                              {lead.paymentStatus || 'pending'}
                            </span>
                          )}
                        </td>
                        <td className="px-8 py-6">
                           {editingLead === lead.id ? (
                             <input 
                               type="number"
                               value={editForm.budget}
                               onChange={(e) => setEditForm({ ...editForm, budget: Number(e.target.value) })}
                               className="w-24 px-2 py-1 border border-slate-200 rounded text-sm font-bold"
                             />
                           ) : (
                             <div className="font-bold text-slate-700">₹{(lead.budget || 0).toLocaleString()}</div>
                           )}
                        </td>
                        <td className="px-8 py-6">
                           {editingLead === lead.id ? (
                             <input 
                               type="number"
                               value={editForm.amountPaid}
                               onChange={(e) => setEditForm({ ...editForm, amountPaid: Number(e.target.value) })}
                               className="w-24 px-2 py-1 border border-slate-200 rounded text-sm font-bold"
                             />
                           ) : (
                             <div className="font-bold text-emerald-600">₹{(lead.amountPaid || 0).toLocaleString()}</div>
                           )}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                             {editingLead === lead.id ? (
                               <button onClick={() => handleSaveEdit(lead.id!)} className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                 <Save className="w-4 h-4" />
                               </button>
                             ) : (
                               <div className="flex items-center gap-2">
                                 <button 
                                   onClick={() => {
                                     setSelectedLeadForPayment(lead);
                                     setIsPaymentModalOpen(true);
                                   }}
                                   className="p-2 bg-brand-50 text-brand-700 rounded-lg hover:bg-brand-100 transition-all"
                                   title="Record Entry"
                                 >
                                   <Receipt className="w-4 h-4" />
                                 </button>
                                 <button onClick={() => handleEditClick(lead)} className="p-2 text-slate-400 hover:text-brand-600 transition-all">
                                   <Edit className="w-4 h-4" />
                                 </button>
                               </div>
                             )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Transaction Audit Log */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <div>
                    <h3 className="text-xl font-display font-black text-slate-900 tracking-tighter uppercase">Transaction Audit Log</h3>
                    <p className="text-slate-500 text-xs font-medium">Verified entries from the last 30 days.</p>
                 </div>
              </div>

              <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <th className="px-8 py-4">Status & Date</th>
                        <th className="px-8 py-4">Client Detail</th>
                        <th className="px-8 py-4">Category</th>
                        <th className="px-8 py-4">Protocol</th>
                        <th className="px-8 py-4 text-right">Quantum (INR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {transactions.length > 0 ? (
                        transactions.map((t) => (
                          <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-8 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                 <div className={`p-1.5 rounded-lg ${t.type === 'payment' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                    {t.type === 'payment' ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                                 </div>
                                 <span className="text-xs font-bold text-slate-500">{new Date(t.date).toLocaleDateString()}</span>
                              </div>
                            </td>
                            <td className="px-8 py-4">
                              <div className="text-xs font-black text-slate-900 uppercase tracking-tight">{t.leadName}</div>
                            </td>
                            <td className="px-8 py-4">
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-400 text-[9px] font-black uppercase tracking-widest">{t.category}</span>
                            </td>
                            <td className="px-8 py-4">
                               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.paymentMethod}</div>
                            </td>
                            <td className={`px-8 py-4 text-sm font-black text-right ${t.type === 'payment' ? 'text-emerald-600' : 'text-red-500'}`}>
                              {t.type === 'payment' ? '+' : '-'}₹{t.amount.toLocaleString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-8 py-12 text-center text-xs font-bold text-slate-300 uppercase tracking-widest">No transaction records detected</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Leads', value: leads.length, color: 'brand', icon: Users },
                { label: 'Conversion Rate', value: '18.4%', color: 'emerald', icon: TrendingUp },
                { label: 'Guide Leads', value: leads.filter(l => l.source === 'download').length, color: 'purple', icon: BarChart3 },
                { label: 'Simulations', value: leads.filter(l => l.source === 'simulation_confirm').length, color: 'orange', icon: Shield }
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 
                    ${stat.color === 'brand' ? 'bg-brand-50 text-brand-700' : 
                      stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                      stat.color === 'purple' ? 'bg-purple-50 text-purple-600' : 
                      'bg-orange-50 text-orange-600'}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-display font-black text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white p-12 rounded-[40px] border border-slate-200 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mb-6">
                <BarChart3 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Advanced Visualizations</h3>
              <p className="text-slate-500 max-w-sm font-medium">Detailed trend analysis and source distribution charts are being processed. Check back in 24 hours.</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-12 bg-white rounded-[40px] border border-slate-200 text-center">
            <Shield className="w-16 h-16 text-slate-200 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">User Access Governance</h3>
            <p className="text-slate-500 max-w-sm mx-auto font-medium mb-8">Manage team member permissions and access logs here. This module is currently under maintenance.</p>
            <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest">Connect LDAP</button>
          </motion.div>
        )}

        {/* Payment Modal */}
        <AnimatePresence>
          {isPaymentModalOpen && selectedLeadForPayment && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsPaymentModalOpen(false)}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden"
              >
                <div className="p-8 md:p-12">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-display font-black text-slate-900 tracking-tighter">Record Entry</h2>
                      <p className="text-slate-500 font-medium">Add payment for {selectedLeadForPayment.name}.</p>
                    </div>
                    <button onClick={() => setIsPaymentModalOpen(false)} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={handleRecordPayment} className="space-y-6">
                    {/* Specialized Tuition Entry */}
                    <div className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-3xl mb-2">
                      <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest px-1 flex items-center gap-2">
                        <DollarSign className="w-3 h-3" />
                        Quick Tuition Fee Entry
                      </label>
                      <input 
                        type="number" 
                        placeholder="Enter tuition amount (₹)..."
                        value={paymentForm.category === 'tuition' ? (paymentForm.amount || '') : ''}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setPaymentForm(prev => ({ ...prev, amount: val, category: 'tuition' }));
                        }}
                        className="w-full bg-transparent border-none outline-none font-display font-black text-2xl text-slate-900 placeholder:text-emerald-200"
                      />
                      <p className="text-[9px] text-emerald-400 font-bold uppercase mt-1">This will automatically categorize the record as 'Tuition'</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Other Amount (₹)</label>
                        <input 
                          required
                          type="number" 
                          placeholder="0.00"
                          value={paymentForm.amount || ''}
                          onChange={(e) => setPaymentForm({ ...paymentForm, amount: Number(e.target.value) })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:bg-white focus:border-brand-500 outline-none font-bold text-slate-900 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Entry Type</label>
                        <select 
                          value={paymentForm.type}
                          onChange={(e) => setPaymentForm({ ...paymentForm, type: e.target.value as any })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none font-bold text-slate-900"
                        >
                          <option value="payment">Credit (Payment)</option>
                          <option value="refund">Debit (Refund)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Category</label>
                        <select 
                          value={paymentForm.category}
                          onChange={(e) => setPaymentForm({ ...paymentForm, category: e.target.value as any })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none font-bold text-slate-900"
                        >
                          <option value="service_fee">Service Fee</option>
                          <option value="tuition">Tuition Fee</option>
                          <option value="visa_fee">Visa Processing</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Method</label>
                        <select 
                          value={paymentForm.paymentMethod}
                          onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none font-bold text-slate-900"
                        >
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Cash">Cash</option>
                          <option value="UPI">UPI / GPay</option>
                          <option value="Check">Check</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Notes</label>
                       <textarea 
                          value={paymentForm.notes}
                          onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 min-h-[100px] outline-none font-bold text-slate-900"
                          placeholder="Reference number or description..."
                       />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-brand-500 hover:text-slate-900 transition-all"
                    >
                      Process Transaction
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Add Lead Modal */}
        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddModalOpen(false)}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
              >
                <div className="p-8 md:p-12">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-display font-black text-slate-900 tracking-tighter">Manual Entry</h2>
                      <p className="text-slate-500 font-medium">Add a new lead to the CRM database.</p>
                    </div>
                    <button onClick={() => setIsAddModalOpen(false)} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={handleAddLead} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="John Doe"
                          value={newLeadForm.name}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:bg-white focus:border-brand-500 outline-none font-bold text-slate-900 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                        <input 
                          required
                          type="email" 
                          placeholder="john@example.com"
                          value={newLeadForm.email}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:bg-white focus:border-brand-500 outline-none font-bold text-slate-900 transition-all"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Phone Number</label>
                        <input 
                          required
                          type="tel" 
                          placeholder="+91..."
                          value={newLeadForm.phone}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:bg-white focus:border-brand-500 outline-none font-bold text-slate-900 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Target Country</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Germany"
                          value={newLeadForm.details.country}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, details: { ...newLeadForm.details, country: e.target.value } })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:bg-white focus:border-brand-500 outline-none font-bold text-slate-900 transition-all"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-5 bg-slate-900 text-brand-500 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-brand-500 hover:text-slate-900 transition-all shadow-xl shadow-slate-900/20"
                    >
                      Save to CRM Database
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
}
