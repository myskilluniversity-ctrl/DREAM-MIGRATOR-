import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  FileCode, 
  Plus, 
  BookOpen, 
  Link as LinkIcon, 
  Edit, 
  Trash2, 
  Image as ImageIcon, 
  Cpu, 
  Code, 
  Tag, 
  RefreshCw, 
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  getBlogs, 
  saveBlogPost, 
  updateBlogPost, 
  deleteBlogPost, 
  getSEOConfig, 
  saveSEOConfig, 
  getPagesMeta, 
  savePageMeta,
  generateSitemapXML,
  BlogPost,
  PageMeta,
  SEOConfig 
} from '../services/seoService';

export default function SeoPanel() {
  const { profile } = useAuth();
  
  // Dynamic SEO states
  const [seoBlogs, setSeoBlogs] = useState<BlogPost[]>([]);
  const [seoConfig, setSeoConfig] = useState<SEOConfig>(getSEOConfig());
  const [pagesMeta, setPagesMeta] = useState<PageMeta[]>(getPagesMeta());
  
  // Custom Meta Edits
  const [selectedMetaPath, setSelectedMetaPath] = useState<string>('/');
  const [metaEditForm, setMetaEditForm] = useState<Partial<PageMeta>>({
    title: '', description: '', keywords: '', schemaType: 'WebPage', schemaData: ''
  });

  // Media Library Alt Text States
  const [mediaAltUrl, setMediaAltUrl] = useState('');
  const [mediaAltValue, setMediaAltValue] = useState('');

  // Blog Upload states
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({
    title: '', slug: '', content: '', category: 'Healthcare', author: '', image: '', imageAlt: '', ctaType: 'lead_capture', keywords: '', metaTitle: '', metaDescription: '', schemaJson: ''
  });

  useEffect(() => {
    setSeoBlogs(getBlogs());
    const loadedConfig = getSEOConfig();
    setSeoConfig(loadedConfig);
    const loadedMeta = getPagesMeta();
    setPagesMeta(loadedMeta);

    // Populate Meta edit form initially with root path meta
    const defaultMeta = loadedMeta.find(m => m.path === '/') || {
      path: '/', title: '', description: '', keywords: '', schemaType: 'WebPage', schemaData: ''
    };
    setMetaEditForm(defaultMeta);
  }, []);

  // SEO & Content Master Handlers
  const handleSavePageMetaState = (e: React.FormEvent) => {
    e.preventDefault();
    if (!metaEditForm.path) return;
    savePageMeta({
      path: metaEditForm.path,
      title: metaEditForm.title || '',
      description: metaEditForm.description || '',
      keywords: metaEditForm.keywords || '',
      schemaType: metaEditForm.schemaType as any || 'WebPage',
      schemaData: metaEditForm.schemaData || ''
    });
    setPagesMeta(getPagesMeta());
    alert(`Meta tags and Structured Schema JSON deployed successfully for path: ${metaEditForm.path}`);
  };

  const handleSaveGlobalSeoSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seoConfig) return;
    saveSEOConfig(seoConfig);
    alert('Global tracking console tags, robots directives and caching variables synchronized successfully!');
  };

  const handleSaveBlogForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.slug) return;

    const fields = {
      title: blogForm.title,
      slug: blogForm.slug,
      content: blogForm.content || '',
      category: blogForm.category || 'Healthcare',
      author: blogForm.author || 'Senior Advisor',
      image: blogForm.image || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000',
      imageAlt: blogForm.imageAlt || blogForm.title,
      ctaType: blogForm.ctaType as any || 'none',
      keywords: blogForm.keywords || 'healthcare, study abroad',
      metaTitle: blogForm.metaTitle || blogForm.title,
      metaDescription: blogForm.metaDescription || blogForm.title,
      schemaJson: blogForm.schemaJson || ''
    };

    if (editingBlogId) {
      updateBlogPost(editingBlogId, fields);
      alert('Insight article updated successfully!');
    } else {
      saveBlogPost(fields);
      alert('Insight article published successfully and registered in the sitemap!');
    }

    setSeoBlogs(getBlogs());
    setIsBlogModalOpen(false);
    setBlogForm({
      title: '', slug: '', content: '', category: 'Healthcare', author: '', image: '', imageAlt: '', ctaType: 'lead_capture', keywords: '', metaTitle: '', metaDescription: '', schemaJson: ''
    });
    setEditingBlogId(null);
  };

  const handleEditBlogClick = (b: BlogPost) => {
    setEditingBlogId(b.id);
    setBlogForm(b);
    setIsBlogModalOpen(true);
  };

  const handleDeleteBlogClick = (id: string) => {
    if (window.confirm('Do you want to permanently delete this insight article and remove its URL mapping from the sitemap?')) {
      deleteBlogPost(id);
      setSeoBlogs(getBlogs());
    }
  };

  const handleSaveImgAlt = (urlKey: string, altVal: string) => {
    const updated = { ...seoConfig };
    updated.imageAlts[urlKey] = altVal;
    saveSEOConfig(updated);
    setSeoConfig(updated);
    alert('Alternate text descriptions mapped successfully in accessibility index!');
  };

  const downloadSitemapFile = () => {
    const xml = generateSitemapXML();
    const blob = new Blob([xml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
      
      {/* Header Status Card */}
      <div className="surface bg-slate-950 p-10 text-white rounded-[40px] border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[120px] rounded-full -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-[0.2em] rounded-md mb-4 animate-pulse">
              <Globe className="w-3.5 h-3.5" /> Direct Workspace Connection — 2026 Ready
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight uppercase">Search Engine Optimization</h2>
            <p className="text-slate-400 font-medium max-w-2xl mt-2 text-sm leading-relaxed">
              Verify metadata, deploy custom JSON-LD schema plugs, write interlinked blogs, configure dynamic crawler policies, and change image fallback alt text instantly.
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={downloadSitemapFile}
              className="px-6 py-3.5 bg-emerald-500 text-slate-900 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-xl shadow-emerald-500/10"
            >
              <FileCode className="w-4 h-4" />
              Download Sitemap
            </button>
            <button 
              onClick={() => {
                setBlogForm({
                  title: '', slug: '', content: '', category: 'Healthcare', author: profile?.displayName || 'Senior Advisor', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000', imageAlt: '', ctaType: 'lead_capture', keywords: '', metaTitle: '', metaDescription: '', schemaJson: ''
                });
                setEditingBlogId(null);
                setIsBlogModalOpen(true);
              }}
              className="px-6 py-3.5 bg-white text-slate-950 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-emerald-500" />
              Publish Article
            </button>
          </div>
        </div>
      </div>

      {/* Core SEO Sub-Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Wing Options (Blogs, Alts, and Bots) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. Blog Uploading & Management Module with W3Validation warnings and CTA form tags */}
          <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900">
                  <BookOpen className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-black text-slate-900 uppercase tracking-tight text-lg">W3 Validated Articles</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase">Dynamic Blog Publishing & Interlinking Control</p>
                </div>
              </div>
              <span className="text-[10px] font-black bg-slate-900 text-emerald-400 px-3 py-1 rounded-full uppercase tracking-wider">
                {seoBlogs.length} Live Items
              </span>
            </div>

            {/* Interlinking Hint block */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 mb-6 flex gap-3">
              <LinkIcon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="font-black text-slate-950 uppercase block mb-0.5">W3 Validation & Interlinking Guidelines</span>
                Ensure content has precise Semantic headings (## Title, ### Subtopic) and active helper linkages. Use <code className="bg-slate-200 text-slate-800 px-1 py-0.5 rounded font-mono font-bold">[Link Text](/route)</code> to build organic keyword rank!
              </div>
            </div>

            {/* Blog Cards list */}
            <div className="space-y-4">
              {seoBlogs.map(b => {
                const hasAlt = !!b.imageAlt;
                const sizeWarning = b.content.length < 500;
                return (
                  <div key={b.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-slate-300 transition-all">
                    <div className="flex items-start gap-4">
                      <img src={b.image} alt={b.imageAlt} className="w-20 h-14 object-cover rounded-xl bg-slate-200 border border-slate-200" referrerPolicy="no-referrer" />
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-[8px] font-black uppercase rounded">
                            {b.category}
                          </span>
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase rounded">
                            CTA: {b.ctaType}
                          </span>
                          {!hasAlt && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[8px] font-black uppercase rounded animate-pulse">
                              No image alt tag
                            </span>
                          )}
                          {sizeWarning && (
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[8px] font-black uppercase rounded">
                              Short content
                            </span>
                          )}
                        </div>
                        <h4 className="font-display font-black text-slate-900 text-sm tracking-tight uppercase line-clamp-1">{b.title}</h4>
                        <p className="text-[11px] text-slate-400 font-bold uppercase truncate max-w-md">Slug: <span className="text-emerald-600">/blog/{b.slug}</span></p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEditBlogClick(b)}
                        className="p-2.5 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-100 transition-colors"
                        title="Edit Content"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteBlogClick(b.id)}
                        className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Media Image registry & Custom Alt Texts management */}
          <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-black text-slate-900 uppercase tracking-tight text-lg">Media Library Alt-Tags</h3>
                <p className="text-xs text-slate-400 font-bold uppercase">Image Override alt descriptions & Custom Assets</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-medium mb-6">
              Configure high-contrast alt text mappings for any static image URL used on the website. This registry automatically feeds the DOM tags, satisfying the search Console and WCAG accessibility standards.
            </p>

            <div className="space-y-4">
              {Object.entries(seoConfig.imageAlts).map(([imgUrl, altValue]) => (
                <div key={imgUrl} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                  <div className="flex items-center gap-4">
                    <img src={imgUrl} alt={altValue} className="w-16 h-12 object-cover rounded-xl bg-slate-200 border border-slate-100 flex-shrink-0" referrerPolicy="no-referrer" />
                    <div className="overflow-hidden min-w-0 flex-1">
                      <span className="font-mono text-[9px] text-slate-400 block truncate">{imgUrl}</span>
                      <span className="text-xs font-black text-slate-500 block uppercase tracking-wider">Active Alt Text:</span>
                      <p className="text-xs font-bold text-slate-800 italic">"{altValue}"</p>
                    </div>
                  </div>

                  {/* Direct Inline Edit form */}
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="Type optimized ALT text representation..."
                      defaultValue={altValue}
                      id={`alt-input-${imgUrl}`}
                      className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-emerald-500 transition-colors"
                    />
                    <button 
                      onClick={() => {
                        const input = document.getElementById(`alt-input-${imgUrl}`) as HTMLInputElement;
                        if (input) handleSaveImgAlt(imgUrl, input.value);
                      }}
                      className="px-4 py-2 bg-slate-900 hover:bg-emerald-500 hover:text-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all"
                    >
                      Save Alt
                    </button>
                  </div>
                </div>
              ))}

              {/* Form to insert new image alt overrides */}
              <div className="p-6 bg-slate-50/50 border border-dashed border-slate-200 rounded-3xl space-y-4">
                <span className="text-xs font-black uppercase text-slate-900 block tracking-widest">Register Alternate Asset Alt Metadata</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Image URL (e.g. /healthcare-nurse.jpg)"
                    value={mediaAltUrl}
                    onChange={(e) => setMediaAltUrl(e.target.value)}
                    className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:border-emerald-500"
                  />
                  <input 
                    type="text" 
                    placeholder="Localized descriptive Alt-text values..."
                    value={mediaAltValue}
                    onChange={(e) => setMediaAltValue(e.target.value)}
                    className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:border-emerald-500"
                  />
                </div>
                <button 
                  onClick={() => {
                    if (!mediaAltUrl || !mediaAltValue) return alert('Both URL and Alt-text parameters are required!');
                    handleSaveImgAlt(mediaAltUrl, mediaAltValue);
                    setMediaAltUrl('');
                    setMediaAltValue('');
                  }}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-slate-900 transition-all"
                >
                  Map Alt Description
                </button>
              </div>
            </div>
          </div>

          {/* 3. Crawlers authority (robots.txt & llm.txt) */}
          <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-black text-slate-900 uppercase tracking-tight text-lg">Bots Authority Files</h3>
                <p className="text-xs text-slate-400 font-bold uppercase">Dynamic robots.txt and llm.txt setups</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-medium mb-6">
              Configure active crawl regulations for standard index engines and modern large language training bots (like ClaudeBot, GPTBot, Gemini-crawler).
            </p>

            <form onSubmit={handleSaveGlobalSeoSettings} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-black uppercase text-slate-900 tracking-wider">robots.txt Directives</label>
                    <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">Active</span>
                  </div>
                  <textarea 
                    rows={12}
                    value={seoConfig?.robotsTxt || ''}
                    onChange={(e) => setSeoConfig(prev => prev ? { ...prev, robotsTxt: e.target.value } : prev)}
                    className="w-full bg-slate-900 text-slate-100 font-mono text-[11px] p-4 rounded-2xl outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-black uppercase text-slate-900 tracking-wider">llm.txt training guide</label>
                    <span className="text-[9px] font-bold text-brand-500 uppercase tracking-widest bg-brand-50 px-2 py-0.5 rounded">Machine Readable</span>
                  </div>
                  <textarea 
                    rows={12}
                    value={seoConfig?.llmTxt || ''}
                    onChange={(e) => setSeoConfig(prev => prev ? { ...prev, llmTxt: e.target.value } : prev)}
                    className="w-full bg-slate-900 text-slate-100 font-mono text-[11px] p-4 rounded-2xl outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-500 hover:text-slate-900 transition-all shadow-xl shadow-slate-900/10"
              >
                Update Bots Regulations & Directives
              </button>
            </form>
          </div>

        </div>

        {/* Right Wing Options (Meta, Analytics, Sitemap prioritising) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* A. Core Meta Setup & JSON-LD Plugs */}
          <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900">
                <Code className="w-5 h-5 text-emerald-600 animate-pulse animate-duration-2000" />
              </div>
              <div>
                <h3 className="font-display font-black text-slate-900 uppercase tracking-tight text-sm">Meta & Schema Plugs</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase">Structured data validation</p>
              </div>
            </div>

            {/* Page selector */}
            <div className="mb-6">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2">Select Target Page Node</label>
              <select 
                value={selectedMetaPath}
                onChange={(e) => {
                  const path = e.target.value;
                  setSelectedMetaPath(path);
                  const matched = pagesMeta.find(m => m.path === path) || {
                    path, title: '', description: '', keywords: '', schemaType: 'WebPage', schemaData: ''
                  };
                  setMetaEditForm(matched);
                }}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl text-xs font-bold outline-none"
              >
                <option value="/">Home Page (/)</option>
                <option value="/healthcare">Healthcare Support (/healthcare)</option>
                <option value="/ausbildung">German Ausbildung (/ausbildung)</option>
                <option value="/resources">Resources (/resources)</option>
                <option value="/compare">Eligibility Assessment (/compare)</option>
                <option value="/sop-analyzer">SOP Analyzer (/sop-analyzer)</option>
              </select>
            </div>

            <form onSubmit={handleSavePageMetaState} className="space-y-4">
               <div>
                 <label className="text-[10px] font-black uppercase text-slate-950 tracking-wider block mb-1">Meta Title Extension</label>
                 <input 
                   required
                   type="text"
                   value={metaEditForm.title || ''}
                   onChange={(e) => setMetaEditForm({ ...metaEditForm, title: e.target.value })}
                   className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl text-xs font-bold outline-none focus:border-slate-900 mt-1"
                 />
               </div>

               <div>
                 <label className="text-[10px] font-black uppercase text-slate-950 tracking-wider block mb-1">Meta Description</label>
                 <textarea 
                   required
                   rows={3}
                   value={metaEditForm.description || ''}
                   onChange={(e) => setMetaEditForm({ ...metaEditForm, description: e.target.value })}
                   className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs font-bold outline-none focus:border-slate-900 mt-1"
                 />
               </div>

               <div>
                 <label className="text-[10px] font-black uppercase text-slate-950 tracking-wider block mb-1">Target Keywords</label>
                 <input 
                   required
                   type="text"
                   value={metaEditForm.keywords || ''}
                   onChange={(e) => setMetaEditForm({ ...metaEditForm, keywords: e.target.value })}
                   placeholder="e.g. BTEC Level 5, Germany Nursing"
                   className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl text-xs font-bold outline-none focus:border-slate-900 mt-1"
                 />
               </div>

               <div>
                 <label className="text-[10px] font-black uppercase text-slate-950 tracking-wider block mb-1">Schema Type Markup</label>
                 <select 
                   value={metaEditForm.schemaType || 'WebPage'}
                   onChange={(e) => setMetaEditForm({ ...metaEditForm, schemaType: e.target.value as any })}
                   className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl text-xs font-bold mt-1"
                 >
                   <option value="WebPage">WebPage schema</option>
                   <option value="Organization">Organization schema</option>
                   <option value="Course">Course schema</option>
                   <option value="FAQPage">FAQs schema</option>
                 </select>
               </div>

               <div>
                 <label className="text-[10px] font-black uppercase text-slate-950 tracking-wider block mb-1">JSON-LD Structured Data Script</label>
                 <textarea 
                   required
                   rows={6}
                   value={metaEditForm.schemaData || ''}
                   onChange={(e) => setMetaEditForm({ ...metaEditForm, schemaData: e.target.value })}
                   className="w-full bg-slate-900 text-emerald-400 font-mono text-[10px] p-4 rounded-xl mt-1 outline-none"
                 />
               </div>

               <button 
                 type="submit"
                 className="w-full py-4.5 bg-slate-950 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-slate-950 transition-all mt-4"
               >
                 Deploy Meta & Schema Plugs
               </button>
            </form>
          </div>

          {/* B. Dynamic Sitemap Priority Setup */}
          <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900">
                <Tag className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-display font-black text-slate-900 uppercase tracking-tight text-sm">Sitemap Optimizer</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase">Priority & Change Frequency Settings</p>
              </div>
            </div>

            <div className="space-y-6">
              {Object.entries(seoConfig.sitemaps).map(([routePath, entry]) => (
                <div key={routePath} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl block text-xs space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 block truncate max-w-[180px]">{routePath}</span>
                    <span className="text-[10px] font-black text-emerald-600 block uppercase">Weight: {entry.priority.toFixed(1)}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400 font-black uppercase leading-none">
                      <span>Change Frequency:</span>
                      <span>{entry.changefreq}</span>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      {/* Sliders or simple button sets */}
                      <input 
                        type="range" 
                        min="0.1" 
                        max="1.0" 
                        step="0.1"
                        value={entry.priority}
                        onChange={(e) => {
                          const targetWeight = parseFloat(e.target.value);
                          const updated = { ...seoConfig };
                          updated.sitemaps[routePath].priority = targetWeight;
                          setSeoConfig(updated);
                          saveSEOConfig(updated);
                        }}
                        className="w-full accent-slate-900 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={downloadSitemapFile}
                className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-emerald-605" />
                Recompile & Test XML
              </button>
            </div>
          </div>

          {/* C. Tracking Access & Optimization Settings */}
          <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-950">
                  <Cpu className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-display font-black text-slate-950 uppercase tracking-tight text-sm">Tracking Analytics</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase">Consoles and GTM tags</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveGlobalSeoSettings} className="space-y-4">
               <div>
                 <label className="text-[10px] font-black uppercase text-slate-900 tracking-wider">Google Analytics ID (G-XXXXX)</label>
                 <input 
                   required
                   type="text"
                   value={seoConfig?.analyticsId || ''}
                   onChange={(e) => setSeoConfig(prev => prev ? { ...prev, analyticsId: e.target.value } : prev)}
                   className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs font-bold outline-none focus:border-emerald-500 font-mono mt-1"
                 />
               </div>

               <div>
                 <label className="text-[10px] font-black uppercase text-slate-900 tracking-wider">Google Tag Manager Container (GTM-XXXXX)</label>
                 <input 
                   required
                   type="text"
                   value={seoConfig?.tagManagerId || ''}
                   onChange={(e) => setSeoConfig(prev => prev ? { ...prev, tagManagerId: e.target.value } : prev)}
                   className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs font-bold outline-none focus:border-indigo-500 font-mono mt-1"
                 />
               </div>

               <div>
                 <label className="text-[10px] font-black uppercase text-slate-900 tracking-wider">Google Search Console Verification Key</label>
                 <input 
                   required
                   type="text"
                   value={seoConfig?.searchConsoleId || ''}
                   onChange={(e) => setSeoConfig(prev => prev ? { ...prev, searchConsoleId: e.target.value } : prev)}
                   className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs font-bold outline-none focus:border-purple-500 font-mono mt-1"
                 />
               </div>

               <div>
                 <label className="text-[10px] font-black uppercase text-slate-900 tracking-wider block mb-1">Caching Control Presets (Header Caching)</label>
                 <div className="grid grid-cols-3 gap-2">
                   {['aggressive', 'standard', 'off'].map(prof => (
                     <button
                       key={prof}
                       type="button"
                       onClick={() => setSeoConfig(prev => prev ? { ...prev, cachingProfile: prof as any } : prev)}
                       className={`py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                         seoConfig?.cachingProfile === prof 
                           ? 'bg-slate-900 text-emerald-400 border-slate-900'
                           : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'
                       }`}
                     >
                       {prof}
                     </button>
                   ))}
                 </div>
                 
                 <div className="pt-2">
                   <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-1">TTL expiration (seconds): 86400</span>
                   <input 
                     type="range"
                     min="3600"
                     max="2592000"
                     step="3600"
                     value={seoConfig?.cachingDuration || 86400}
                     onChange={(e) => {
                       const ttl = parseInt(e.target.value);
                       setSeoConfig(prev => prev ? { ...prev, cachingDuration: ttl } : prev);
                     }}
                     className="w-full accent-slate-950 h-1.5 bg-slate-100 rounded-lg cursor-pointer appearance-none mt-1"
                   />
                 </div>
               </div>

               <button 
                 type="submit"
                 className="w-full py-4.5 bg-slate-900 hover:bg-emerald-500 text-white hover:text-slate-950 rounded-2xl text-xs font-black uppercase tracking-widest transition-all mt-4"
               >
                 Apply Tracking & Caching Config
               </button>
            </form>
          </div>

        </div>

      </div>

      {/* Comprehensive Blog Creator Modal Form */}
      <AnimatePresence>
        {isBlogModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-905/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBlogModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-y-auto max-h-[85vh] border border-slate-100"
            >
              <div className="p-8 md:p-12 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
                  <div>
                    <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight uppercase">
                      {editingBlogId ? 'Modify Insight Article' : 'Publish New Insight Article'}
                    </h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider block mt-1">SEO Validated Content Configurator</p>
                  </div>
                  <button onClick={() => setIsBlogModalOpen(false)} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveBlogForm} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-900 tracking-wider">Article Title</label>
                      <input 
                        required
                        type="text"
                        value={blogForm.title || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                          setBlogForm({ ...blogForm, title: val, slug: generatedSlug, metaTitle: val + ' | Dream Migrator' });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl mt-1.5 focus:border-emerald-500 outline-none text-xs font-bold"
                        placeholder="e.g. Pearson BTEC Healthcare Level 5 Demand"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-900 tracking-wider">Dynamic URL Slug</label>
                      <div className="flex mt-1.5 gap-2">
                        <input 
                          required
                          type="text"
                          value={blogForm.slug || ''}
                          onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                          className="flex-1 bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:border-emerald-500 outline-none text-xs font-bold font-mono"
                          placeholder="pearson-btec-healthcare"
                        />
                        <button 
                          type="button"
                          onClick={() => {
                            if (blogForm.title) {
                              const computed = blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                              setBlogForm({ ...blogForm, slug: computed });
                            }
                          }}
                          className="px-4 py-3 bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700 hover:bg-slate-200"
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-900 tracking-wider">Featured Image Cover (URL)</label>
                      <input 
                        required
                        type="text"
                        value={blogForm.image || ''}
                        onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl mt-1.5 focus:border-emerald-500 outline-none text-xs font-bold"
                        placeholder="e.g. https://images.unsplash.com/..."
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-900 tracking-wider">Cover Image Alt Tag text</label>
                      <input 
                        required
                        type="text"
                        value={blogForm.imageAlt || ''}
                        onChange={(e) => setBlogForm({ ...blogForm, imageAlt: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl mt-1.5 focus:border-emerald-500 outline-none text-xs font-bold"
                        placeholder="Describe the clinical setup seen or students speaking..."
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-900 tracking-wider">Author Name & Credentials</label>
                      <input 
                        required
                        type="text"
                        value={blogForm.author || ''}
                        onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl mt-1.5 focus:border-emerald-500 outline-none text-xs font-bold"
                        placeholder="Dr. Evelyn Martinez"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-900 tracking-wider">Primary Category Badge</label>
                      <select 
                        value={blogForm.category || 'Healthcare'}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl text-xs font-bold mt-1.5"
                      >
                        <option value="Healthcare">Healthcare Speciality</option>
                        <option value="German Migration">German Migration</option>
                        <option value="SOP & Advice">SOP & Advisory Panels</option>
                        <option value="Student Life">Student Life</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-900 tracking-wider">CTA leadPreseting capture Form</label>
                      <select 
                        value={blogForm.ctaType || 'lead_capture'}
                        onChange={(e) => setBlogForm({ ...blogForm, ctaType: e.target.value as any })}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl text-xs font-bold mt-1.5"
                      >
                        <option value="lead_capture">Lead Capture Sidebar (Standard)</option>
                        <option value="healthcare_counseling">Healthcare Counseling Speciality (Medical assessment source)</option>
                        <option value="standard_assessment">Standard Assessment Form</option>
                        <option value="none">No CTA sidebar (Direct educational read)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-900 tracking-wider">SEO Meta Title Override</label>
                      <input 
                        required
                        type="text"
                        value={blogForm.metaTitle || ''}
                        onChange={(e) => setBlogForm({ ...blogForm, metaTitle: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl mt-1.5 focus:border-emerald-500 outline-none text-xs font-bold"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-900 tracking-wider">SEO Meta Description Override</label>
                      <textarea 
                        required
                        rows={2}
                        value={blogForm.metaDescription || ''}
                        onChange={(e) => setBlogForm({ ...blogForm, metaDescription: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl mt-1.5 outline-none focus:border-emerald-500 text-xs font-bold"
                        placeholder="Keep under 160 characters for high search Console ranking."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-900 tracking-wider">SEO Core Keywords List (comma-separated)</label>
                      <input 
                        required
                        type="text"
                        value={blogForm.keywords || ''}
                        onChange={(e) => setBlogForm({ ...blogForm, keywords: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl mt-1.5 focus:border-emerald-500 outline-none text-xs font-bold"
                        placeholder="Pearson level 4, Germany nurse salary, BTEC study"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-black uppercase text-slate-900 tracking-wider">Rich Text Content editor (Markdown-aligned)</label>
                        <span className="text-[9px] font-bold text-slate-400">Heading markers like ##, and links like [Text](/route) are converted natively</span>
                      </div>
                      <textarea 
                        required
                        rows={10}
                        value={blogForm.content || ''}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-emerald-500 text-xs font-bold font-mono"
                        placeholder="## Getting Started..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-900 tracking-wider">Advanced article JSON-LD Schema (Course, FAQ or Posting JSON)</label>
                      <textarea 
                        rows={4}
                        value={blogForm.schemaJson || ''}
                        onChange={(e) => setBlogForm({ ...blogForm, schemaJson: e.target.value })}
                        className="w-full bg-slate-900 text-emerald-400 font-mono text-[9px] p-4 rounded-2xl mt-1.5 outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "BlogPosting"\n}`}
                      />
                    </div>

                  </div>

                  <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                    <button 
                      type="button"
                      onClick={() => setIsBlogModalOpen(false)}
                      className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest"
                    >
                      Discard
                    </button>
                    <button 
                      type="submit"
                      className="px-8 py-3.5 bg-slate-950 hover:bg-emerald-500 hover:text-slate-950 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                    >
                      {editingBlogId ? 'Save Changes' : 'Publish Article'}
                    </button>
                  </div>
                </form>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
