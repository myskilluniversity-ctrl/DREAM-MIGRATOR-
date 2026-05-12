import { motion } from 'motion/react';
import { TrendingUp, Users, CheckCircle, Clock } from 'lucide-react';
import { METRICS } from '../constants';

const icons = [Users, CheckCircle, TrendingUp, Clock];

export default function DashboardMetrics() {
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {METRICS.map((metric, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 surface hover:border-brand-500/50 transition-all flex flex-col items-center text-center hover:shadow-md"
              >
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-700 mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-display font-bold text-slate-900 tracking-tighter">
                      {metric.value.toLocaleString()}
                      {metric.suffix}
                    </span>
                    {metric.trend === 'up' && (
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                    )}
                  </div>
                  <span className="text-slate-500 text-xs font-bold mt-2 uppercase tracking-widest">
                    {metric.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
