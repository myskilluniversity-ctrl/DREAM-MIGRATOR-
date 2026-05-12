import { ReactNode } from 'react';
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
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { profile, logout } = useAuth();
  const location = useLocation();

  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-12 surface bg-white max-w-md">
          <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-black text-slate-900 mb-4">Access Denied</h2>
          <p className="text-slate-500 font-medium mb-8">
            The Governance Console is restricted to verified administrative personnel. Your credentials do not grant access to this sector.
          </p>
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-brand-500 hover:text-slate-900 transition-all"
          >
            Return to Student Portal
          </Link>
        </div>
      </div>
    );
  }

  const menuItems = [
    { label: 'Leads Management', icon: Users, path: '/admin' },
    { label: 'Financial Records', icon: CreditCard, path: '/admin/finances' },
    { label: 'Market Analytics', icon: BarChart3, path: '/admin/analytics' },
    { label: 'System Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
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
          {menuItems.map((item) => (
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
                <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${location.pathname === item.path ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100'}`} />
            </Link>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-white/5">
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl mb-4">
            <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-slate-900 font-bold">
              {profile.displayName.charAt(0)}
            </div>
            <div className="overflow-hidden">
               <div className="font-bold text-sm truncate">{profile.displayName}</div>
               <div className="text-[10px] text-white/40 font-black uppercase tracking-widest">Master Admin</div>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 p-4 text-white/60 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all font-bold text-xs uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4" />
            Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-80">
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <div className="lg:hidden w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center">
                 <Shield className="w-6 h-6 text-slate-900" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                 {menuItems.find(m => m.path === location.pathname)?.label || 'Console'}
              </h2>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end text-right">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">System Status</span>
                 <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Protocol Operational
                 </span>
              </div>
              <div className="h-10 w-[1px] bg-slate-100 hidden md:block" />
              <button className="px-5 py-2 bg-slate-900 text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-brand-500 hover:text-slate-900 transition-all shadow-lg active:scale-95">
                 <Plus className="w-4 h-4 inline mr-2" />
                 New Entry
              </button>
           </div>
        </header>

        <div className="p-8 max-w-7xl">
           {children}
        </div>
      </main>
    </div>
  );
}
