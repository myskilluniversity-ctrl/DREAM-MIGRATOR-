import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Loader2, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Login() {
  const { 
    user, 
    loginWithEmail, 
    registerWithEmail,
    loading: authLoading 
  } = useAuth();
  
  const [localLoading, setLocalLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState<string | null>(null);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);
    setError(null);
    try {
      if (isRegistering) {
        await registerWithEmail(formData.email, formData.password, formData.name);
      } else {
        await loginWithEmail(formData.email, formData.password);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 bg-brand-600 min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Abstract Background Design */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden text-white/5">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-full bg-current rounded-full blur-[100px] animate-pulse" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-full bg-slate-900/40 rounded-full blur-[100px]" />
      </div>

      <SEO 
        title="Access Portal | Dream Migrator"
        description="Sign in to your Dream Migrator account to access your guides and migration reports."
      />

      <div className="max-w-md w-full px-6 relative z-10">
        <div className="bg-white rounded-[60px] p-10 md:p-12 shadow-2xl overflow-hidden relative">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3 border border-brand-100">
              <Shield className="w-8 h-8" />
            </div>

            <h1 className="text-3xl font-display font-black text-slate-900 tracking-tighter mb-2 leading-none">
              Welcome to the <br />
              <span className="text-brand-500">Navigator.</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Access your personalized migration resources.
            </p>
          </div>

          <AnimatePresence mode="wait">
            <form onSubmit={handleEmailSubmit} className="space-y-4">
               {isRegistering && (
                 <motion.div
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="relative"
                 >
                   <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                   <input
                     required
                     type="text"
                     placeholder="Full Name"
                     value={formData.name}
                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                     className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-brand-500 outline-none transition-all font-medium text-slate-900"
                   />
                 </motion.div>
               )}

               <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                 <input
                   required
                   type="email"
                   placeholder="Email Address"
                   value={formData.email}
                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                   className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-brand-500 outline-none transition-all font-medium text-slate-900"
                 />
               </div>

               <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                 <input
                   required
                   type="password"
                   placeholder="Password"
                   value={formData.password}
                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                   className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-brand-500 outline-none transition-all font-medium text-slate-900"
                 />
               </div>

               {error && (
                 <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest text-center px-4">
                   {error}
                 </div>
               )}

               <button
                 type="submit"
                 disabled={localLoading}
                 className="w-full py-4 bg-brand-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/20 active:scale-95 disabled:opacity-50"
               >
                 {localLoading ? (
                   <Loader2 className="w-6 h-6 animate-spin" />
                 ) : (
                   isRegistering ? 'Create Student Account' : 'Sign In with Credentials'
                 )}
               </button>
             </form>
           </AnimatePresence>

           <div className="mt-8 text-center space-y-4">
             <button 
               onClick={() => setIsRegistering(!isRegistering)}
               className="text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
             >
               {isRegistering ? "Already have an account? Sign In" : "New student? Create an account"}
             </button>
             
             <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
               Secured Data Vault <br /> <span className="text-brand-500">Dream Migrator Platform</span>
             </p>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
