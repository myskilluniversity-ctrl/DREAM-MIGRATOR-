import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, GraduationCap, FileText, Globe, LifeBuoy } from 'lucide-react';
import SEO from '../components/SEO';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  key?: number | string;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <span className={`text-xl font-display font-black tracking-tight transition-colors ${isOpen ? 'text-brand-700' : 'text-slate-900 group-hover:text-brand-700'}`}>
          {question}
        </span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-brand-500 text-slate-900 rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'}`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-slate-600 font-medium leading-relaxed max-w-3xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    {
      id: 'general',
      name: 'General Migration',
      icon: Globe,
      questions: [
        {
          q: "What makes Dream Migrator different from traditional consultancies?",
          a: "Unlike consultancies that prioritize high-commission institutions, Dream Migrator is a data-driven migration architect. We focus on 'Global Evolution'—creating structured pathways like the German Ausbildung or Healthcare Practice programs that guarantee employment outcomes rather than just university admission."
        },
        {
          q: "Which countries do you specialize in?",
          a: "Our core expertise lies in Germany, the United Kingdom, USA, Australia, and Canada. We specialize in high-tier professional migration and vocational training tracks that lead to successful settlement."
        }
      ]
    },
    {
      id: 'visa',
      name: 'Visa & Process',
      icon: FileText,
      questions: [
        {
          q: "What is the success rate for visa approvals?",
          a: "We maintain a 98.4% visa success rate. This is achieved through our rigorous pre-screening process; we only accept students into our premium tracks once we've verified their documentary equivalency against host-country standards."
        },
        {
          q: "How long does the entire process usually take?",
          a: "Timelines vary by country and pathway. A typical university admission takes 4-6 months, while vocational training like the German Ausbildung may take 6-8 months including the required language training (B1/B2 level)."
        }
      ]
    },
    {
      id: 'programs',
      name: 'Specialized Programs',
      icon: GraduationCap,
      questions: [
        {
          q: "Tell me more about the Germany Opportunity Card (Chancenkarte).",
          a: "The Opportunity Card is a points-based system for non-EU skilled workers to enter Germany for job searching. You need 6 points to qualify (based on age, language, experience). We assist in profile mapping and embassy interview preparation for this specific track."
        },
        {
          q: "What is the Ausbildung program?",
          a: "Ausbildung is Germany's world-famous dual vocational training system. You 'Earn while you Learn' with a monthly stipend of €1,000–€1,300, zero tuition fees, and guaranteed employment after 3 years. It's the most secure pathway for high-school graduates."
        }
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-white min-h-screen"
    >
      <SEO 
        title="FAQ | Migration Knowledge Hub"
        description="Frequently asked questions about global migration, student visas, German Ausbildung, and Dream Migrator's unique approach to global education."
        keywords="migration faq, study abroad help, visa questions, Ausbildung info, Chancenkarte help"
      />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-[10px] font-black uppercase tracking-widest mb-6">
                 <HelpCircle className="w-3 h-3" /> Knowledge base
              </div>
              <h1 className="text-6xl font-display font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
                Common <br />
                <span className="text-brand-700 italic">Questions.</span>
              </h1>
              <p className="text-slate-500 font-medium mb-12 max-w-sm">
                Everything you need to know about starting your global journey. If you can't find what you're looking for, our advisors are just a message away.
              </p>

              <div className="p-8 bg-slate-900 rounded-[40px] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/20 blur-3xl" />
                <h3 className="text-lg font-bold mb-4">Still have questions?</h3>
                <p className="text-slate-400 text-sm mb-6">Talk to a human. Our advisors in Delhi are ready to help you map your journey.</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-brand-400 text-sm font-bold uppercase tracking-widest">
                    <LifeBuoy className="w-4 h-4" /> Support Hub
                  </div>
                  <div className="text-white font-display text-2xl font-black">+91 97810 97806</div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:w-2/3">
            <div className="space-y-20">
              {categories.map((category) => (
                <div key={category.id}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 border border-slate-100">
                      <category.icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">{category.name}</h2>
                  </div>
                  <div className="bg-white rounded-[40px] border border-slate-100 px-8 shadow-sm">
                    {category.questions.map((q, idx) => {
                      const globalIdx = categories.slice(0, categories.indexOf(category)).reduce((acc, c) => acc + c.questions.length, 0) + idx;
                      return (
                        <FAQItem
                          key={idx}
                          question={q.q}
                          answer={q.a}
                          isOpen={openIndex === globalIdx}
                          onClick={() => { setOpenIndex(openIndex === globalIdx ? null : globalIdx); }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
