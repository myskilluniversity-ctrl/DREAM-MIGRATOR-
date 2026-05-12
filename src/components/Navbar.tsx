import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Menu, X, ArrowRight, ChevronDown, User, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { user, profile } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuSections = [
    {
      name: 'Destinations',
      links: [
        { name: 'United Kingdom', path: '/countries/uk' },
        { name: 'USA', path: '/countries/usa' },
        { name: 'Germany', path: '/countries/germany' },
        { name: 'Canada', path: '/countries/canada' },
        { name: 'Australia', path: '/countries/australia' },
      ]
    },
    {
      name: 'Study Programs',
      links: [
        { name: 'Healthcare Support', path: '/healthcare' },
        { name: 'Opportunity Card', path: '/opportunity-card' },
        { name: 'Ausbildung Germany', path: '/ausbildung' },
        { name: 'All Programs', path: '/programs' },
      ]
    },
    {
      name: 'Dream Toolkit',
      links: [
        { name: 'AI Counselor', path: '/ai-counselor', isNew: true },
        { name: 'University Finder', path: '/university-finder' },
        { name: 'Scholarship Finder', path: '/scholarships' },
        { name: 'SOP Analyzer (AI)', path: '/sop-analyzer' },
        { name: 'Cost Calculator', path: '/cost-calculator' },
        { name: 'Visa Timeline', path: '/visa-timeline' },
        { name: 'Eligibility Check', path: '/compare' },
      ]
    },
    {
      name: 'Resources',
      links: [
        { name: 'Guides & PDFs', path: '/resources' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Our Team', path: '/team' },
        { name: 'Success Stories', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
      ]
    }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white border-b border-slate-200 py-3 shadow-md' : 'bg-white py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:bg-brand-400 transition-colors">
            <Globe className="text-slate-900 w-7 h-7" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display font-black text-2xl tracking-tighter text-slate-900 uppercase">
              Dream<span className="text-brand-700">Migrator</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Global Placements</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {menuSections.map((section) => (
            <div 
              key={section.name} 
              className="relative group py-2"
              onMouseEnter={() => setActiveDropdown(section.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-brand-500 transition-colors cursor-pointer">
                {section.name}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === section.name ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === section.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-64 bg-white border border-slate-100 shadow-2xl rounded-2xl p-4 mt-2"
                  >
                    <div className="flex flex-col gap-1">
                      {section.links.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${
                            location.pathname === link.path 
                              ? 'bg-brand-50 text-brand-600' 
                              : 'text-slate-600 hover:bg-slate-50 hover:text-brand-500'
                          }`}
                        >
                          {link.name}
                          {(link as any).isNew && (
                            <span className="text-[8px] font-black bg-brand-500 text-slate-900 px-1.5 py-0.5 rounded-md animate-pulse">AI</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          
          {user ? (
             <div className="flex items-center gap-3">
               {profile?.role === 'admin' && (
                 <Link 
                   to="/admin"
                   className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-500 hover:text-slate-900 transition-all shadow-md"
                 >
                   <Shield className="w-4 h-4" />
                   CRM
                 </Link>
               )}
               <Link 
                to="/dashboard"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${profile?.role === 'admin' ? 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100' : 'bg-brand-50 text-brand-600 border border-brand-100 hover:bg-brand-100'}`}
               >
                  <User className="w-4 h-4" />
                  {profile?.displayName.split(' ')[0]}
                  {profile?.role === 'admin' && <Shield className="w-3 h-3" />}
               </Link>
             </div>
          ) : (
            <Link 
              to="/login" 
              className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-black hover:bg-brand-500 hover:text-slate-900 transition-all shadow-lg active:scale-95"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-slate-200 shadow-2xl overflow-hidden lg:hidden"
          >
            <div className="p-6 flex flex-col gap-6">
              {menuSections.map((section) => (
                <div key={section.name}>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{section.name}</div>
                  <div className="flex flex-col gap-3">
                    {section.links.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-lg font-bold text-slate-900 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                             {link.name}
                             {(link as any).isNew && (
                               <span className="text-[10px] font-black bg-brand-500 text-slate-900 px-2 py-0.5 rounded-lg">AI</span>
                             )}
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-300" />
                        </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                {user ? (
                   <>
                    {profile?.role === 'admin' && (
                      <Link 
                        to="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full py-4 bg-slate-900 text-white rounded-xl text-center font-black uppercase tracking-widest text-sm"
                      >
                        CRM Console
                      </Link>
                    )}
                    <Link 
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-4 bg-brand-50 text-brand-600 border border-brand-100 rounded-xl text-center font-black uppercase tracking-widest text-sm"
                    >
                      My Dashboard
                    </Link>
                   </>
                ) : (
                  <Link 
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl text-center font-black uppercase tracking-widest text-sm"
                  >
                    Sign In
                  </Link>
                )}
                <Link 
                  to="/compare"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-4 bg-brand-500 text-slate-900 rounded-xl text-center font-black uppercase tracking-widest text-sm shadow-xl shadow-brand-500/20"
                >
                  Free Assessment
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
