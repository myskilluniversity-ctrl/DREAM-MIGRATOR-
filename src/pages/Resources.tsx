import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, FileText, Lock, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';
import { RESOURCE_GUIDES } from '../constants';
import SEO from '../components/SEO';
import LeadCaptureModal from '../components/LeadCaptureModal';
import { useAuth } from '../context/AuthContext';
import { saveLead } from '../services/leadService';

export default function Resources() {
  const { user, profile } = useAuth();
  const [selectedGuide, setSelectedGuide] = useState<typeof RESOURCE_GUIDES[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const triggerDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = url.split('/').pop() || 'guide.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadClick = async (guide: typeof RESOURCE_GUIDES[0]) => {
    if (user) {
      setSuccessId(guide.id);
      
      // Attempt download
      triggerDownload(guide.downloadUrl);
      
      try {
        await saveLead({
          name: profile?.displayName || 'Auth User',
          email: user?.email || '',
          phone: 'N/A',
          source: 'download',
          userId: user.uid,
          details: { guide: guide.title, guideId: guide.id }
        });
        
        setTimeout(() => setSuccessId(null), 2000);
      } catch (error) {
        console.error("Download log error:", error);
      }
    } else {
      setSelectedGuide(guide);
      setIsModalOpen(true);
    }
  };

  const handleDownloadSuccess = async (leadData: any) => {
    if (selectedGuide) {
      setSuccessId(selectedGuide.id);
      
      // Attempt download
      triggerDownload(selectedGuide.downloadUrl);

      try {
        await saveLead({
          ...leadData,
          source: 'download',
          details: { guide: selectedGuide.title, guideId: selectedGuide.id }
        });
        
        setTimeout(() => setSuccessId(null), 2000);
      } catch (error) {
        console.error("Lead save error:", error);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-slate-50"
    >
      <SEO 
        title="Migration Resources & Guides"
        description="Download free expert-authored guides on global migration, German Ausbildung, and international careers. Data-backed resources for students."
        keywords="migration guides, study abroad resources, free pdf downloads, Ausbildung handbook, global career guide"
      />

      <LeadCaptureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleDownloadSuccess}
        title={selectedGuide?.title || 'Unlock Guide Access'}
        description={selectedGuide ? `To download the "${selectedGuide.title}", please provide your details for the migration advisor.` : undefined}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-[10px] font-black uppercase tracking-widest mb-6">
              Knowledge Hub
           </div>
           <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 mb-6">Download Our Free <br/> <span className="text-brand-500">Expert Migration Guides</span></h1>
           <p className="text-slate-600 text-lg max-w-2xl mx-auto">Master the intricacies of global migration with our comprehensive, data-backed guidebooks. Written by senior counselors and visa experts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {RESOURCE_GUIDES.map((guide, i) => {
             const isDownloading = downloadingId === guide.id;
             const isSuccess = successId === guide.id;

             return (
              <motion.div 
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all group border border-slate-100"
              >
                 <div className="relative h-64 overflow-hidden">
                    <img 
                     src={guide.image} 
                     alt={guide.title} 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-brand-500 text-white rounded-full text-[10px] font-black uppercase">
                       {guide.category}
                    </div>
                    <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white">
                       <FileText className="w-5 h-5 text-brand-400" />
                       <span className="font-bold underline decoration-brand-400">PDF Guide</span>
                    </div>
                 </div>
                 <div className="p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors uppercase tracking-tight">{guide.title}</h3>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">{guide.description}</p>
                    
                    {isSuccess ? (
                      <div className="space-y-4">
                        <button 
                          disabled
                          className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all bg-emerald-500 text-white border-emerald-500"
                        >
                           <CheckCircle2 className="w-5 h-5" />
                           Access Authorized
                        </button>
                        <a 
                          href={guide.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-brand-600 font-bold text-sm hover:underline"
                        >
                          Didn't start? Click here to download manually
                        </a>
                      </div>
                    ) : (
                      <button 
                       onClick={() => handleDownloadClick(guide)}
                       disabled={isDownloading}
                       className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all bg-slate-50 border border-slate-200 text-slate-900 hover:bg-brand-500 hover:text-white hover:border-brand-500"
                      >
                         {isDownloading ? (
                           <Loader2 className="w-5 h-5 animate-spin" />
                         ) : (
                           <>
                             <Download className="w-5 h-5" />
                             Download Guide
                           </>
                         )}
                      </button>
                    )}
                 </div>
              </motion.div>
             );
           })}
        </div>

        <div className="mt-24 p-12 bg-brand-900 rounded-[48px] relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[80px] -mr-20 -mt-20 rounded-full" />
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                 <h2 className="text-3xl font-display font-black mb-4 underline decoration-brand-500 decoration-8 underline-offset-[12px]">Premium Resource Access</h2>
                 <p className="text-slate-400">Enroll in our counseling sessions to unlock exclusive access to templates, employer lists, and country-specific salary benchmarking tools.</p>
              </div>
              <div className="flex gap-4">
                 <div className="px-6 py-4 bg-white/5 rounded-2xl flex items-center gap-4 border border-white/10">
                    <div className="w-10 h-10 bg-brand-500/20 text-brand-400 rounded-lg flex items-center justify-center">
                       <Lock className="w-5 h-5" />
                    </div>
                    <div>
                       <div className="text-xs font-bold text-slate-400 uppercase">Premium Guides</div>
                       <div className="font-bold">12+ Locked</div>
                    </div>
                 </div>
                 <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-brand-50 transition-all flex items-center gap-2 shadow-xl shadow-white/5">
                    Unlock All
                    <ChevronRight className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
