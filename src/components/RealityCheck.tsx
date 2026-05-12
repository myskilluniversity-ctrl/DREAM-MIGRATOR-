import { motion } from 'motion/react';
import { ShieldAlert, Fingerprint, Construction, Scale, Clock } from 'lucide-react';

export default function RealityCheck() {
  const points = [
    {
      title: "The Time Commitment",
      description: "Migration isn't overnight. Expect a process of 8-14 months including language training and visa vetting.",
      icon: Clock,
      color: "text-amber-400"
    },
    {
      title: "Emotional Resilience",
      description: "Relocating alone to a new culture requires grit. We provide psychological support, but you provide the will.",
      icon: ShieldAlert,
      color: "text-brand-400"
    },
    {
      title: "Hard Skill Requirements",
      description: "Dreams don't get visas; certificates do. You must be willing to undergo rigorous testing and certification.",
      icon: Construction,
      color: "text-red-400"
    },
    {
      title: "Zero Transparency Gaps",
      description: "We disclose every cost and risk upfront. No hidden agency fees or surprise rejection causes.",
      icon: Scale,
      color: "text-emerald-400"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-widest mb-6">
              <Fingerprint className="w-4 h-4" />
              Strategic Integrity
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-8 leading-tight">
              Before You Begin, <br/> 
              <span className="text-brand-700">Understand the Reality.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Most consultancies sell the destination. We manage the journey. Studying abroad is a massive life decision that involves complex legal, financial, and emotional variables.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-slate-900 font-bold">
                <div className="w-2 h-2 rounded-full bg-brand-500" />
                94.2% success is achieved through strict student vetting.
              </div>
              <div className="flex items-center gap-4 text-slate-900 font-bold">
                <div className="w-2 h-2 rounded-full bg-brand-500" />
                We prioritize education quality over volume.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {points.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 surface bg-white group hover:shadow-2xl transition-all border-slate-100"
              >
                <div className={`w-12 h-12 rounded-xl bg-slate-50 border border-slate-50 flex items-center justify-center ${point.color.replace('brand-400', 'brand-500')} mb-6 group-hover:scale-110 transition-transform`}>
                  <point.icon className="w-6 h-6" />
                </div>
                <h3 className="text-slate-900 font-bold mb-3 tracking-tight">{point.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
