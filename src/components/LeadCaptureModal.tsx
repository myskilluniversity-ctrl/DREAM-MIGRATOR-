import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Phone, Download } from 'lucide-react';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
  title: string;
  description?: string;
}

export default function LeadCaptureModal({ isOpen, onClose, onSuccess, title, description }: LeadCaptureModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[40px] shadow-3xl z-[101] overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-brand-500" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-10 pt-16">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-3xl flex items-center justify-center mx-auto mb-6 transform -rotate-3">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-black text-slate-900 mb-2 leading-tight">
                  {title}
                </h3>
                <p className="text-slate-500 text-sm font-medium">
                  {description || "Provide your details to unlock this expert-authored resource."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-brand-500 outline-none transition-all font-medium text-slate-900"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-brand-500 outline-none transition-all font-medium text-slate-900"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-brand-500 outline-none transition-all font-medium text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-brand-500 text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-400 transition-all shadow-xl shadow-brand-500/20"
                >
                  Download Now
                  <Download className="w-5 h-5" />
                </button>
              </form>

              <p className="mt-6 text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                By downloading, you agree to receive expert advice <br /> on your global migration journey.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
