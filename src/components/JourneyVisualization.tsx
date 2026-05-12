import { motion } from 'motion/react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { JOURNEY_STEPS } from '../constants';

export default function JourneyVisualization() {
  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-4">Relocation Architecture</h3>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            The Structured <span className="text-brand-600">Strategic Roadmap</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Transparency is our core principle. Track every stage of your global transition with precision analytics and real-time milestones.
          </p>
        </div>

        <div className="relative bg-slate-900 p-12 rounded-[40px] shadow-2xl overflow-hidden">
          {/* Decorative Grain */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
          
          <div className="relative z-10">
            {/* Desktop Horizontal Line */}
            <div className="absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-slate-800 hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {JOURNEY_STEPS.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Circle Marker */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all duration-300 relative z-10 ${
                    step.status === 'completed' ? 'bg-brand-600 shadow-lg shadow-brand-500/40 scale-110' : 
                    step.status === 'active' ? 'bg-brand-600 ring-4 ring-brand-500/10' : 
                    'bg-slate-800 border border-slate-700'
                  }`}>
                    {step.status === 'completed' && <Check className="text-white w-6 h-6" />}
                    {step.status === 'active' && <Clock className="text-white w-6 h-6 animate-pulse" />}
                    {step.status === 'pending' && <span className="text-slate-500 font-bold">{step.id}</span>}
                  </div>

                  <div>
                    <h3 className={`font-bold mb-2 uppercase text-xs tracking-widest transition-colors ${
                       step.status === 'pending' ? 'text-slate-500' : 'text-white'
                    }`}>
                      {step.title}
                    </h3>
                    <div className="text-slate-500 text-[10px] mb-3 font-bold uppercase tracking-tighter flex items-center justify-center gap-1">
                      {step.expectedDuration}
                    </div>
                    <p className="text-slate-400 text-[10px] leading-relaxed max-w-[140px] mx-auto font-medium">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
