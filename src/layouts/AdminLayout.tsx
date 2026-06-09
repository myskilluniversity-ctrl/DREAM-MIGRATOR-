import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  Shield, 
  CreditCard,
  ChevronRight,
  Menu,
  X,
  Plus,
  Globe,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { profile, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authenticate base access
  if (!profile || !['admin', 'crm', 'seo'].includes(profile.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="text-center p-12 surface bg-white max-w-md rounded-[40px] shadow-xl border border-slate-100">
          <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-black text-slate-900 mb-4 tracking-tight uppercase">Access Denied</h2>
          <p className="text-slate-500 font-medium mb-8">
            The Governance Console is restricted to verified administrative personnel. Your credentials do not grant access to this sector.
          </p>
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-brand-500 hover:text-slate-900 transition-all shadow-md"
          >
            Return to Student Portal
          </Link>
        </div>
      </div>
    );
  }

  // Define master configuration of menu items
  const menuItems = [
    { label: 'Leads Management', icon: Users, path: '/admin' },
    { label: 'Financial Records', icon: CreditCard, path: '/admin/finances' },
    { label: 'Market Analytics', icon: BarChart3, path: '/admin/analytics' },
    { label: 'SEO & Content Master', icon: Globe, path: '/admin/seo' },
    { label: 'Staff & Permissions', icon: Shield, path: '/admin/staff' },
    { label: 'System Settings', icon: Settings, path: '/admin/settings' },
  ];

  // Filter navigation items representing specific sections for specific people
  const filteredMenuItems = menuItems.filter(item => {
    if (profile.role === 'admin') return true;
    if (profile.role === 'crm') {
      return ['/admin', '/admin/finances', '/admin/analytics', '/admin/settings'].includes(item.path);
    }
    if (profile.role === 'seo') {
      return ['/admin/seo'].includes(item.path);
    }
    return false;
  });

  // Verify access legitimacy of currently loaded nested route path
  const isAuthorizedPath = (() => {
    if (profile.role === 'admin') return true;
    if (profile.role === 'crm') {
      return ['/admin', '/admin/finances', '/admin/analytics', '/admin/settings'].includes(location.pathname);
    }
    if (profile.role === 'seo') {
      return ['/admin/seo'].includes(location.pathname);
    }
    return false;
  })();

  const currentLabel = menuItems.find(m => m.path === location.pathname)?.label || 'Console';

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="w-80 bg-slate-900 text-white hidden lg:flex flex-col fixed h-screen z-50">
        <div className="p-8 border-b border-white/5">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
              <Shield className="text-slate-900 w-6 h-6" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-black text-xl tracking-tighter uppercase">
                Dream<span className="text-brand-500">Admin</span>
              </span>
              <span className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Control Matrix</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {filteredMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between p-4 rounded-xl transition-all group ${
                location.pathname === item.path 
                  ? 'bg-brand-500 text-slate-900 shadow-xl shadow-brand-500/10' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest leading-none">{item.label}</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${location.pathname === item.path ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100'}`} />
            </Link>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-white/5">
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 text-brand-500 border border-brand-500/30 flex items-center justify-center font-bold">
              {profile.displayName.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
               <div className="font-bold text-sm truncate">{profile.displayName}</div>
               <div className="text-[10px] text-brand-400 font-black uppercase tracking-widest">
                 {profile.role === 'admin' ? 'Super Admin' : profile.role === 'crm' ? 'CRM Manager' : 'SEO Creator'}
               </div>
            </div>
          </div>
          <button 
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 p-4 text-white/60 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all font-bold text-xs uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4" />
            Terminate Session
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar overlay & navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-slate-900 text-white p-6 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
                    <Shield className="text-slate-900 w-6 h-6" />
                  </div>
                  <span className="font-display font-black text-xl tracking-tighter uppercase">
                    Dream<span className="text-brand-500">Admin</span>
                  </span>
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-2 flex-1">
                {filteredMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                      location.pathname === item.path 
                        ? 'bg-brand-500 text-slate-900 font-bold' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                    </div>
                  </Link>
                ))}
              </nav>

              <div className="border-t border-white/5 pt-4">
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 text-brand-500 border border-brand-500/30 flex items-center justify-center font-bold">
                    {profile.displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                     <div className="font-bold text-sm truncate text-white">{profile.displayName}</div>
                     <div className="text-[10px] text-brand-400 font-bold uppercase tracking-widest">
                       {profile.role.toUpperCase()}
                     </div>
                  </div>
                </div>
                <button 
                  onClick={() => logout()}
                  className="w-full flex items-center justify-center gap-2 p-4 text-white/60 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all font-bold text-xs uppercase tracking-widest"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-80">
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden lg:block w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                 <Shield className="w-4 h-4 text-slate-400" />
              </div>
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                 {currentLabel}
              </h2>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end text-right">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 text-[8px]">Designated Access</span>
                 <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest leading-none flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                    {profile.role === 'admin' ? 'Master Access' : profile.role === 'crm' ? 'CRM Manager Mode' : 'SEO Editor Mode'}
                 </span>
              </div>
           </div>
        </header>

        <div className="p-8 max-w-7xl">
           {isAuthorizedPath ? (
             children
           ) : (
             <div className="p-12 text-center rounded-[32px] border bg-white border-slate-100 max-w-xl mx-auto my-12 shadow-sm">
               <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <Lock className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-display font-black text-slate-900 uppercase tracking-tight mb-2">Segment Restricted</h3>
               <p className="text-slate-500 text-sm font-medium mb-6">
                 This system area is locked to your administrative access group. Specifically designated personnel are assigned to individual zones only.
               </p>
               <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 font-mono text-left space-y-2">
                 <div><span className="font-bold text-slate-400">YOUR ACCOUNT:</span> {profile.displayName} ({profile.email})</div>
                 <div><span className="font-bold text-slate-400">ASSIGNED LEVEL:</span> {profile.role.toUpperCase()}</div>
                 <div><span className="font-bold text-slate-400">TARGET PATH:</span> {location.pathname}</div>
               </div>
               <div className="mt-8 flex justify-center gap-4">
                 <Link 
                   to={profile.role === 'seo' ? '/admin/seo' : '/admin'}
                   className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-sm"
                 >
                   Return to Approved Hub
                 </Link>
               </div>
             </div>
           )}
        </div>
      </main>
    </div>
  );
}
