import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Globe2, ShieldCheck, Sparkles, MessageCircle, Bot } from 'lucide-react';
import EligibilityChecker from '../components/EligibilityChecker';
import DashboardMetrics from '../components/DashboardMetrics';
import JourneyVisualization from '../components/JourneyVisualization';
import RealityCheck from '../components/RealityCheck';
import ProgramCard from '../components/ProgramCard';
import VerifiedOpportunities from '../components/VerifiedOpportunities';
import LeadCaptureModal from '../components/LeadCaptureModal';
import { PROGRAMS } from '../constants';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Connect with an Expert');

  const openCounseling = () => {
    setModalTitle('Book Free Counseling');
    setIsModalOpen(true);
  };

  const openExpertTalk = () => {
    setModalTitle('Talk to a Senior Expert');
    setIsModalOpen(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 bg-slate-50"
    >
      <SEO 
        title="Your Global Education Journey"
        description="Bridge the gap to your dream university with India's most trusted study abroad platform. Expert counseling, IELTS prep, and personalized roadmaps for students and professionals."
        keywords="study abroad, global education, student migration, counseling, IELTS prep, university admission, Germany, UK, USA, Australia"
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-50 blur-[150px] rounded-full opacity-50 -mr-96 -mt-96" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-50 blur-[120px] rounded-full opacity-40 -ml-48 -mb-48" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100 border border-accent-200 text-accent-700 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-4 h-4" />
                Empowering 2 Million+ Dreams
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 leading-[1.1] mb-8">
                Your Global Education <br/>
                <span className="text-brand-700">Journey Starts Here</span>
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                Bridge the gap to your dream university with India's most trusted study abroad platform. Expert counseling, IELTS prep, and more.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={openCounseling}
                  className="px-8 py-5 bg-brand-500 text-slate-900 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-brand-600 transition-all shadow-xl shadow-brand-500/20"
                >
                  Book Free Counseling
                  <ArrowRight className="w-5 h-5" />
                </button>
                <Link 
                  to="/programs"
                  className="px-8 py-5 bg-white border-2 border-slate-200 text-slate-900 rounded-xl font-bold text-lg flex items-center justify-center hover:bg-slate-50 transition-all"
                >
                  Explore Programs
                </Link>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-sm">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} alt="user" className="bg-slate-100" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-slate-900 font-bold">Excellent 4.8/5</div>
                  <div className="text-slate-500 text-sm">Rated by 50,000+ Students</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-[12px] border-white rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Student group" 
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="text-2xl font-bold mb-1">Meet our Alumni</div>
                  <div className="text-sm opacity-90">Studying in top universities worldwide</div>
                </div>
              </div>
              
              {/* Floating badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Visa Success</div>
                    <div className="text-lg font-black text-slate-900">99.2%</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -right-6 bg-accent-500 p-4 rounded-2xl shadow-xl border-4 border-white hidden md:block"
              >
                <div className="text-slate-900 font-black text-center">
                  <div className="text-2xl">800+</div>
                  <div className="text-[10px] uppercase tracking-tighter">Partner Universities</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid (IELTS, Consulting, etc) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-black text-slate-900 mb-4">Discover Our Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Comprehensive solutions for every step of your study abroad journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'IELTS Prep', val: 'Master the exam with top coaches', icon: Sparkles, bg: 'bg-brand-50', text: 'text-brand-600', link: '/programs' },
              { title: 'AI Assistant', val: '24/7 intelligent migration support', icon: MessageCircle, bg: 'bg-slate-900', text: 'text-brand-500', link: '/ai-counselor' },
              { title: 'Financing', val: 'Fastest Education Loans', icon: ShieldCheck, bg: 'bg-emerald-50', text: 'text-emerald-600', action: openCounseling },
              { title: 'Visa', val: 'End-to-end documentation support', icon: Globe2, bg: 'bg-indigo-50', text: 'text-indigo-600', link: '/visa-timeline' },
            ].map((s, i) => (
              <div 
                key={i} 
                onClick={() => s.action ? s.action() : window.location.href = s.link || '#'}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className={`w-14 h-14 ${s.bg} ${s.bg === 'bg-slate-900' ? 'text-brand-500' : s.text.replace('brand-600', 'brand-700')} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <s.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm mb-6">{s.val}</p>
                <div className="text-brand-700 font-bold text-sm flex items-center gap-2">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DashboardMetrics />

      <EligibilityChecker />

      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
               <span className="text-brand-700 font-black uppercase tracking-[0.2em] text-xs mb-4 block">Destination Hub</span>
               <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
                Choose your <br/> <span className="text-brand-700 italic">Preferred Destination</span>
               </h2>
            </div>
            <Link 
              to="/compare"
              className="px-8 py-4 border border-slate-200 text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-all mb-4 shadow-sm"
            >
              Compare All Countries
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMS.map(program => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      <JourneyVisualization />

      {/* AI Counselor Highlight Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden bg-slate-900 rounded-[60px] p-8 md:p-20">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-500 opacity-5 rounded-full blur-[120px] translate-x-1/2" />
            
            <div className="relative flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 rounded-full text-brand-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                  <Sparkles className="w-4 h-4" />
                  Next-Gen Migration Tech
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 tracking-tighter leading-tight">
                  Meet <span className="text-brand-500">Maya</span>. <br/>
                  Your Personal AI Migration Architect.
                </h2>
                <p className="text-slate-400 text-xl font-medium mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Trained on 10,000+ visa cases and global admissions data. Get instant, accurate answers about your international career in seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                  <Link 
                    to="/ai-counselor"
                    className="px-10 py-5 bg-brand-500 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-xl shadow-brand-500/20 group"
                  >
                    Start Chatting Now
                    <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <div className="flex items-center gap-4 px-6 py-4 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md">
                     <div className="flex -space-x-3">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i+50}`} alt="user" />
                          </div>
                        ))}
                     </div>
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                       <span className="text-white">400+</span> Online now
                     </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full max-w-md relative">
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-8 shadow-2xl relative z-10"
                >
                   <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center">
                        <Bot className="w-6 h-6 text-slate-900" />
                      </div>
                      <div>
                        <div className="text-brand-500 text-[10px] font-black uppercase tracking-widest">Maya Assistant</div>
                        <div className="text-white font-bold">Migration Strategy</div>
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-[10px] text-slate-400 font-medium">
                        "What is the visa success rate for Germany this year?"
                      </div>
                      <div className="p-5 bg-brand-500 rounded-2xl text-slate-900 text-xs font-bold leading-relaxed">
                        Currently, the success rate for Student Visas (Direct Entry) is approx 92%. However, for APS-related delays, expect...
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-[10px] text-slate-400 font-medium flex justify-end">
                        "How to apply for the Opportunity Card?"
                      </div>
                      <div className="flex justify-center pt-4">
                         <div className="flex gap-1.5">
                            <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                            <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                         </div>
                      </div>
                   </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VerifiedOpportunities />

      {/* Success Stories */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-black text-slate-900 mb-4">Real Students, Real <span className="text-brand-700">Success</span></h2>
            <p className="text-slate-500 font-medium tracking-tight">Hear from those who've achieved their study abroad dreams with us.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rahul Sharma', uni: 'University of Toronto', msg: 'The expert guidance for my SOP and visa was exceptional. I wouldn\'t have made it without Dream Migrator.', country: 'Canada' },
              { name: 'Priya Patel', uni: 'University of Manchester', msg: 'From IELTS prep to loan approval, everything was seamless. Highly recommend their end-to-end service.', country: 'UK' },
              { name: 'Aditya Rao', uni: 'Technical University of Munich', msg: 'Zero tuition fee dream came true thanks to their in-depth knowledge of German public universities.', country: 'Germany' }
            ].map((story, i) => (
              <div key={i} className="p-8 surface bg-slate-50 border-none shadow-none group hover:bg-brand-50 transition-all duration-500" onClick={openCounseling}>
                 <div className="w-16 h-16 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=student${i+10}`} alt="student" className="w-full h-full" />
                 </div>
                 <p className="text-slate-600 font-medium italic mb-6 leading-relaxed">"{story.msg}"</p>
                 <div className="pt-6 border-t border-slate-200">
                    <div className="font-black text-slate-900 tracking-tight">{story.name}</div>
                    <div className="text-xs text-brand-600 font-bold uppercase tracking-widest mt-1">{story.uni} • {story.country}</div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RealityCheck />

      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden group rounded-[48px] shadow-2xl">
            <div className="absolute inset-0 bg-slate-900" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=1200')] bg-cover opacity-30 group-hover:scale-105 transition-transform duration-700" />
            
            <div className="relative z-10 px-8 py-20 md:p-20 text-center md:text-left">
               <div className="max-w-2xl">
                 <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
                   Ready to Start Your <br/> Study Abroad Dream?
                 </h2>
                 <p className="text-slate-400 text-xl mb-12">
                   Don't wait for your dream university. Get expert guidance and start your application today.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                        onClick={openCounseling}
                        className="px-10 py-5 bg-brand-600 text-white rounded-2xl font-bold hover:bg-brand-700 transition-colors flex items-center justify-center gap-2 shadow-xl shadow-brand-500/20"
                     >
                       Book Profile Appraisal
                       <ArrowRight className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={openExpertTalk}
                      className="px-10 py-5 bg-white/10 text-white border border-white/20 backdrop-blur-md rounded-2xl font-bold hover:bg-white/20 transition-colors"
                    >
                       Talk to an Expert
                    </button>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-6 left-6 right-6 z-40 md:hidden">
        <button 
          onClick={() => document.getElementById('eligibility-checker')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full py-4 bg-brand-500 text-slate-900 rounded-2xl font-bold shadow-2xl flex items-center justify-center gap-2"
        >
          Start Analysis <MessageCircle className="w-5 h-5" />
        </button>
      </div>

      <LeadCaptureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(data) => {
          console.log('Lead Captured:', data);
          alert('Counseling session booked! An expert will call you shortly.');
        }}
        title={modalTitle}
        description="Join thousands of successful students who started their journey with a free expert session."
      />
    </motion.div>
  );
}
