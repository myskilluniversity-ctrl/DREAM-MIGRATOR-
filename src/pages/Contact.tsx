import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Linkedin, Twitter, Instagram } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 bg-white">
      <SEO 
        title="Contact Our Advisors"
        description="Get in touch with Dream Migrator's expert advisors in Chanakyapuri, New Delhi. Request a personalized career roadmap for your global journey."
        keywords="contact us, study abroad help, migration counseling, Chanakyapuri office, career roadmap request"
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest mb-6">
              <MessageSquare className="w-4 h-4" />
              Contact Our Advisors
            </div>
            <h1 className="text-5xl font-display font-bold text-slate-900 mb-8 leading-tight">
              Let's Map Your <br/> <span className="text-brand-700 italic">Global Journey.</span>
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-12">
              Whether you're a skilled professional or a student looking for training abroad, our advisors are here to provide data-driven clarity. Visit our headquarters in Chanakyapuri.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-700 flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">Email Us</div>
                  <div className="text-slate-900 font-bold">info@dreammigrator.com</div>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-700 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">Call Support</div>
                  <div className="text-slate-900 font-bold">+91 97810 97806</div>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-700 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">Headquarters</div>
                  <div className="text-slate-900 font-bold text-sm">2, Chandragupta Marg, Opp. Russian Embassy, Chanakyapuri, New Delhi - 110021</div>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-100">
               <div className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-6 italic">Follow the Journey</div>
               <div className="flex gap-4">
                  {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                    <button key={i} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-brand-500 hover:bg-brand-50 transition-all border border-slate-100">
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50 border border-slate-200 rounded-[40px] p-8 md:p-12 shadow-sm"
          >
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-8">Personalized Roadmap Request</h2>
            <form 
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for your request! Your personalized roadmap is being generated. Our senior advisor will reach out to you within 24 hours.');
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-500 text-xs uppercase font-bold px-1">Full Name</label>
                  <input required type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-500 transition-colors shadow-sm" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-slate-500 text-xs uppercase font-bold px-1">Email Address</label>
                  <input required type="email" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-500 transition-colors shadow-sm" placeholder="john@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-500 text-xs uppercase font-bold px-1">Phone Number</label>
                  <input required type="tel" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-500 transition-colors shadow-sm" placeholder="+91..." />
                </div>
                <div className="space-y-2">
                  <label className="text-slate-500 text-xs uppercase font-bold px-1">Target Country</label>
                  <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-500 transition-colors shadow-sm">
                    <option>Germany</option>
                    <option>United Kingdom</option>
                    <option>USA / Canada</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                  <label className="text-slate-500 text-xs uppercase font-bold px-1">Current Profile (Brief)</label>
                  <textarea required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-500 transition-colors min-h-[120px] shadow-sm" placeholder="Briefly describe your education and experience..." />
              </div>
              <button 
                type="submit" 
                className="w-full py-5 bg-brand-500 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-brand-400 transition-all shadow-xl shadow-brand-500/20"
              >
                Get My Career Roadmap
                <Send className="w-5 h-5" />
              </button>
              <p className="text-center text-slate-500 text-xs italic">
                By clicking, you agree to our privacy policy regarding data evaluation.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
