import { Globe, ArrowUpRight, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-8 group">
              <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-brand-500/20">
                <Globe className="text-slate-900 w-6 h-6" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-slate-900">
                DREAM<span className="text-brand-700">MIGRATOR</span>
              </span>
            </Link>
            <p className="text-slate-500 text-lg max-w-sm mb-10 leading-relaxed font-medium">
              India's most trusted data-driven study abroad platform. Helping millions achieve their global dreams.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-700 hover:border-brand-500 transition-all">
                   <Icon className="w-5 h-5" />
                 </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-8 uppercase tracking-[0.2em] text-xs">Pathways</h4>
            <ul className="space-y-4">
              <li><Link to="/ausbildung" className="text-slate-500 hover:text-brand-700 text-sm font-semibold transition-colors">German Ausbildung</Link></li>
              <li><Link to="/healthcare" className="text-slate-500 hover:text-brand-700 text-sm font-semibold transition-colors">Healthcare Professionals</Link></li>
              <li><Link to="/programs" className="text-slate-500 hover:text-brand-700 text-sm font-semibold transition-colors">Global Programs</Link></li>
              <li><Link to="/compare" className="text-slate-500 hover:text-brand-700 text-sm font-semibold transition-colors">Comparison Tool</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-8 uppercase tracking-[0.2em] text-xs">Resources</h4>
            <ul className="space-y-4">
              <li><Link to="/resources" className="text-slate-500 hover:text-brand-700 text-sm font-semibold transition-colors">Knowledge Hub</Link></li>
              <li><Link to="/faq" className="text-slate-500 hover:text-brand-700 text-sm font-semibold transition-colors">FAQ</Link></li>
              <li><Link to="/team" className="text-slate-500 hover:text-brand-700 text-sm font-semibold transition-colors">Our Leadership</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-brand-700 text-sm font-semibold transition-colors">Contact Support</Link></li>
              <li><a href="#" className="text-slate-500 hover:text-brand-700 text-sm font-semibold transition-colors">News & Updates</a></li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 py-12 border-y border-slate-100">
           <div>
              <h5 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Global Locations</h5>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-tighter mb-2">New Delhi, India</p>
              <p className="text-[10px] text-slate-500 leading-tight">2, Chandragupta Marg, Chanakyapuri</p>
           </div>
           <div>
              <h5 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Support Line</h5>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-tighter mb-2">+91 97810 97806</p>
              <p className="text-[10px] text-slate-500 leading-tight">Monday - Saturday, 9am - 6pm</p>
           </div>
           <div className="lg:col-span-2">
              <h5 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Affiliations</h5>
              <div className="flex flex-wrap gap-4 opacity-40 grayscale">
                 <span className="text-[10px] font-black uppercase">PEARSON</span>
                 <span className="text-[10px] font-black uppercase">BRITISH COUNCIL</span>
                 <span className="text-[10px] font-black uppercase">IDP AUSTRALIA</span>
                 <span className="text-[10px] font-black uppercase">PRIMUS</span>
              </div>
           </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} DREAM MIGRATOR GLOBAL EDUCATION.
          </p>
          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            ISO 27001 Certified Trust
          </div>
        </div>
      </div>
    </footer>
  );
}

import { ShieldCheck } from 'lucide-react';
