import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, Globe } from 'lucide-react';
import { Program, DifficultyLevel } from '../types';

interface ProgramCardProps {
  program: Program;
  key?: React.Key;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const getDifficultyColor = (level: DifficultyLevel) => {
    switch (level) {
      case DifficultyLevel.LOW: return 'text-green-400 bg-green-400/10 border-green-400/20';
      case DifficultyLevel.MEDIUM: return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case DifficultyLevel.HIGH: return 'text-red-400 bg-red-400/10 border-red-400/20';
      case DifficultyLevel.ELITE: return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-full"
    >
      <div className="surface p-8 border-slate-200 hover:border-brand-500/50 transition-all h-full flex flex-col hover:shadow-2xl hover:-translate-y-2">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-brand-50 rounded-xl text-brand-500">
            <Globe className="w-6 h-6" />
          </div>
          <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-accent-100 border border-accent-200 text-accent-700">
            {program.difficulty} Level
          </div>
        </div>

        <Link to={`/countries/${program.country.toLowerCase().replace(' ', '-')}`} className="flex items-center gap-2 mb-3 group/country">
          <span className="text-xs font-black text-brand-700 uppercase tracking-widest group-hover/country:text-brand-800 transition-colors">{program.country}</span>
          <div className="h-[2px] flex-1 bg-slate-100 group-hover/country:bg-brand-200 transition-colors" />
        </Link>
        
        <h3 className="text-2xl font-display font-bold text-slate-900 mb-4 group-hover:text-brand-700 transition-colors">
          {program.title}
        </h3>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow font-medium">
          {program.description}
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between text-sm border-b border-slate-50 pb-3">
            <span className="text-slate-400 font-bold uppercase tracking-tight">Duration</span>
            <span className="text-slate-900 font-bold">{program.duration}</span>
          </div>
          <div className="flex items-center justify-between text-sm border-b border-slate-50 pb-3">
            <span className="text-slate-400 font-bold uppercase tracking-tight">Outcome</span>
            <span className="text-slate-900 font-bold">{program.outcome}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {program.tags.map(tag => (
            <span key={tag} className="px-3 py-1.5 bg-slate-50 text-[10px] text-slate-500 border border-slate-100 rounded-lg font-bold uppercase tracking-tight">
              {tag}
            </span>
          ))}
        </div>

        <Link 
          to={`/countries/${program.country.toLowerCase().replace(' ', '-')}`} 
          className="w-full py-4 bg-brand-500 hover:bg-brand-400 text-slate-900 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group/btn shadow-xl shadow-brand-500/10 active:scale-95 text-center"
        >
          View Detail Pathway
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
