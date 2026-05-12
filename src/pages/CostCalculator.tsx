import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, DollarSign, Home, Utensils, Bus, ShoppingBag, Globe } from 'lucide-react';
import LeadCaptureModal from '../components/LeadCaptureModal';

const COUNTRIES = [
  { name: 'United Kingdom', currency: 'GBP', multiplier: 1.2, symbol: '£' },
  { name: 'USA', currency: 'USD', multiplier: 1.5, symbol: '$' },
  { name: 'Germany', currency: 'EUR', multiplier: 1.0, symbol: '€' },
  { name: 'Canada', currency: 'CAD', multiplier: 1.1, symbol: 'C$' },
  { name: 'Australia', currency: 'AUD', multiplier: 1.3, symbol: 'A$' },
];

export default function CostCalculator() {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [baseHousing, setBaseHousing] = useState(800);
  const [baseFood, setBaseFood] = useState(300);
  const [baseTransport, setBaseTransport] = useState(100);
  const [basePersonal, setBasePersonal] = useState(200);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derived values based on country multiplier
  const housing = Math.round(baseHousing * selectedCountry.multiplier);
  const food = Math.round(baseFood * selectedCountry.multiplier);
  const transport = Math.round(baseTransport * selectedCountry.multiplier);
  const personal = Math.round(basePersonal * selectedCountry.multiplier);

  const total = housing + food + transport + personal;

  const handleDownload = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 rounded-full text-brand-700 text-xs font-black uppercase tracking-widest mb-6"
          >
            <Calculator className="w-4 h-4" />
            Financial Planner
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-display font-black text-slate-900 mb-6 tracking-tight"
          >
            Cost of Living <span className="text-brand-600">Calculator</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 font-medium max-w-2xl mx-auto"
          >
            Estimate your monthly expenses across global education hubs. Plan your future with financial clarity.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Controls */}
          <div className="surface bg-white p-8 space-y-8">
            <div>
              <label className="block text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Select Destination</label>
              <div className="grid grid-cols-2 gap-3">
                {COUNTRIES.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedCountry(c)}
                    className={`px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                      selectedCountry.name === c.name 
                        ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-md' 
                        : 'border-slate-100 text-slate-500 hover:border-brand-200'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold text-slate-900 uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Home className="w-4 h-4 text-slate-400" /> Housing</div>
                    <span className="text-brand-600">{selectedCountry.symbol}{housing}</span>
                  </div>
                  <input 
                    type="range" min="300" max="3000" step="50"
                    value={baseHousing} onChange={(e) => setBaseHousing(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-500"
                  />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold text-slate-900 uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Utensils className="w-4 h-4 text-slate-400" /> Food & Groceries</div>
                    <span className="text-brand-600">{selectedCountry.symbol}{food}</span>
                  </div>
                  <input 
                    type="range" min="100" max="1000" step="20"
                    value={baseFood} onChange={(e) => setBaseFood(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-500"
                  />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold text-slate-900 uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Bus className="w-4 h-4 text-slate-400" /> Transport</div>
                    <span className="text-brand-600">{selectedCountry.symbol}{transport}</span>
                  </div>
                  <input 
                    type="range" min="0" max="500" step="10"
                    value={baseTransport} onChange={(e) => setBaseTransport(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-500"
                  />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold text-slate-900 uppercase tracking-wider">
                    <div className="flex items-center gap-2"><ShoppingBag className="w-4 h-4 text-slate-400" /> Personal & Misc</div>
                    <span className="text-brand-600">{selectedCountry.symbol}{personal}</span>
                  </div>
                  <input 
                    type="range" min="50" max="1000" step="50"
                    value={basePersonal} onChange={(e) => setBasePersonal(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-500"
                  />
               </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedCountry.name + total}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-slate-900 text-white p-10 h-full flex flex-col justify-between rounded-3xl shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 opacity-10 rounded-full blur-3xl -mr-32 -mt-32" />
                
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-500 mb-2 block">Monthly Estimate</span>
                  <div className="text-7xl font-display font-black tracking-tight mb-4 flex items-baseline gap-1">
                    <span className="text-3xl text-brand-500">{selectedCountry.symbol}</span>
                    {total.toLocaleString()}
                  </div>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    The estimated cost of living in <span className="text-white font-bold">{selectedCountry.name}</span> for a student lifestyle. This includes housing, food, and basic necessities.
                  </p>
                </div>

                <div className="relative z-10 mt-12 pt-12 border-t border-white/10 space-y-4">
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Currency</span>
                      <span className="font-bold text-white">{selectedCountry.currency}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Est. Lifestyle Quality</span>
                      <span className="font-bold text-brand-500">Premium Student</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Visa Fund Requirement</span>
                      <span className="font-bold text-white">Required</span>
                   </div>
                </div>

                <button 
                  onClick={handleDownload}
                  className="relative z-10 w-full py-5 bg-brand-500 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-brand-400 transition-all mt-10 shadow-xl shadow-brand-500/20 active:scale-95"
                >
                  Download PDF Report
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <LeadCaptureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(data) => {
          console.log('Lead Captured:', data);
          alert('Check your email! Your customized cost report is on its way.');
        }}
        title={`Cost Report for ${selectedCountry.name}`}
        description="We'll send a detailed PDF breakdown of living costs and university fees to your inbox."
      />
    </div>
  );
}
