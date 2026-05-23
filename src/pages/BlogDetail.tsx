import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight,
  Calendar, 
  User, 
  BookOpen, 
  ChevronRight, 
  HeartPulse, 
  FileText, 
  CheckCircle2, 
  Share2, 
  Sparkles,
  ClipboardCheck,
  Building
} from 'lucide-react';
import { getBlogs, getImageAlt, BlogPost } from '../services/seoService';
import { saveLead } from '../services/leadService';
import SEO from '../components/SEO';
import LeadCaptureModal from '../components/LeadCaptureModal';

// Helper to chunk blog post into logical sections based on main content headings
const parseBlogIntoSections = (text: string) => {
  const lines = text.split('\n');
  const sections: { heading: string; lines: string[] }[] = [];
  let currentSection: { heading: string; lines: string[] } = { heading: '', lines: [] };

  lines.forEach((line) => {
    // Treat h2 and h3 elements as section-dividers to embed dynamic stickies
    if (line.startsWith('## ') || line.startsWith('### ')) {
      if (currentSection.lines.length > 0) {
        sections.push(currentSection);
      }
      currentSection = { heading: line, lines: [line] };
    } else {
      currentSection.lines.push(line);
    }
  });
  if (currentSection.lines.length > 0) {
    sections.push(currentSection);
  }
  return sections;
};

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Qualifications Intake Form');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    targetCountry: 'Germany'
  });

  const blog = useMemo(() => {
    const blogs = getBlogs();
    return blogs.find(b => b.slug === slug);
  }, [slug]);

  // Dynamic content splitter for conversions
  const sections = useMemo(() => {
    if (!blog) return [];
    return parseBlogIntoSections(blog.content);
  }, [blog]);

  const handleModalSuccess = async (data: { name: string; email: string; phone: string }) => {
    const lead = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      source: 'contact' as const,
      details: {
        country: 'Germany',
        originatingBlog: blog?.title || 'Unknown Post',
        originatingSlug: blog?.slug || 'unknown-post',
        ctaTriggered: 'blog_inline_sticky_cta'
      }
    };
    const res = await saveLead(lead);
    if (res.success) {
      alert('Thank you! Your eligibility criteria have been registered successfully.');
    }
  };

  // Recommended Articles selection
  const recommendations = useMemo(() => {
    if (!blog) return [];
    const blogs = getBlogs();
    return blogs.filter(b => b.id !== blog.id).slice(0, 2);
  }, [blog]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <div className="text-center max-w-sm p-8 bg-white rounded-3xl border border-slate-100">
          <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Article Not Found</h2>
          <p className="text-slate-500 mb-6 font-medium">The requested node did not resolve to a recognized slug.</p>
          <Link to="/blog" className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-500 transition-all">
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  // Parses markdown headers and interlinks inside our text statically
  const parseBlogContent = (textOrLines: string | string[]) => {
    const lines = Array.isArray(textOrLines) ? textOrLines : textOrLines.split('\n');
    return lines.map((line, idx) => {
      // Heading level 2
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-2xl md:text-3xl font-display font-black text-slate-900 mt-10 mb-4 uppercase tracking-tight">{line.replace('## ', '')}</h2>;
      }
      // Heading level 3
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-xl font-display font-black text-slate-800 mt-8 mb-3 uppercase tracking-tight">{line.replace('### ', '')}</h3>;
      }
      // Heading level 4
      if (line.startsWith('#### ')) {
        return <h4 key={idx} className="text-lg font-display font-bold text-slate-800 mt-6 mb-2 uppercase tracking-tight">{line.replace('#### ', '')}</h4>;
      }
      // Unordered lists
      if (line.startsWith('* ')) {
        const itemText = line.replace('* ', '');
        return (
          <ul key={idx} className="list-disc pl-6 mb-3 text-slate-600 font-medium space-y-1">
            <li>{parseInlineLinks(itemText)}</li>
          </ul>
        );
      }
      if (line.startsWith('- ')) {
        const itemText = line.replace('- ', '');
        return (
          <ul key={idx} className="list-disc pl-6 mb-3 text-slate-600 font-medium space-y-1">
            <li>{parseInlineLinks(itemText)}</li>
          </ul>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-4" />;
      }
      // Regular paragraph
      return <p key={idx} className="text-slate-600 text-base md:text-lg leading-relaxed mb-4 font-medium">{parseInlineLinks(line)}</p>;
    });
  };

  // Automated custom parser mapping Markdown link patterns [Text](/route) to React router DOM components
  const parseInlineLinks = (txt: string) => {
    // Regex for [Link Text](URL)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(txt)) !== null) {
      const matchIndex = match.index;
      // Add preceding plain text
      if (matchIndex > lastIndex) {
        parts.push(txt.slice(lastIndex, matchIndex));
      }
      const label = match[1];
      const dest = match[2];

      if (dest.startsWith('/')) {
        parts.push(
          <Link key={matchIndex} to={dest} className="text-emerald-600 font-black hover:underline decoration-emerald-500/50 underline-offset-4">
            {label}
          </Link>
        );
      } else {
        parts.push(
          <a key={matchIndex} href={dest} target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-black hover:underline">
            {label}
          </a>
        );
      }
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < txt.length) {
      parts.push(txt.slice(lastIndex));
    }

    return parts.length > 0 ? parts : txt;
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const lead = {
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      source: 'contact' as const,
      details: {
        country: formState.targetCountry,
        originatingBlog: blog.title,
        originatingSlug: blog.slug,
        ctaTriggered: blog.ctaType
      }
    };

    const res = await saveLead(lead);
    if (res.success) {
      setSuccessMsg(true);
      setFormState({ name: '', email: '', phone: '', targetCountry: 'Germany' });
      setTimeout(() => setSuccessMsg(false), 5000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-slate-50 min-h-screen"
    >
      <SEO 
        title={blog.metaTitle}
        description={blog.metaDescription}
        keywords={blog.keywords}
        image={blog.image}
        schemaOverride={blog.schemaJson}
      />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Back Link Nav */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-xs font-black uppercase text-slate-500 hover:text-emerald-600 transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Insights Directory
        </Link>

        {/* Dynamic Schema-Compliant Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Article Container - W3C Semantic Hierarchy */}
          <article className="lg:col-span-8 bg-white rounded-[40px] border border-slate-100 p-8 md:p-14 shadow-sm">
            {/* Meta tags header */}
            <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs font-semibold mb-6">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 font-black uppercase tracking-widest rounded-lg">
                {blog.category}
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <User className="w-3.5 h-3.5" />
                Authored by {blog.author}
              </span>
              <span className="w-1.5 h-1.5 bg-slate-100 rounded-full" />
              <span className="flex items-center gap-1.5 font-bold">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            {/* Title - Mandatory H1 */}
            <h1 className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight uppercase mb-8">
              {blog.title}
            </h1>

            {/* Featured Image with custom Alt tags */}
            <div className="rounded-[32px] overflow-hidden aspect-[21/10] bg-slate-100 mb-10 border border-slate-50">
              <img 
                src={blog.image} 
                alt={getImageAlt(blog.image, blog.imageAlt)} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Main Rich text body organized by semantic sections with embedded conversion triggers */}
            <div className="prose max-w-none text-slate-700 space-y-6">
              {sections.map((section, sIdx) => (
                <div key={sIdx} className="relative pb-4">
                  {parseBlogContent(section.lines)}
                  
                  {/* Sticky interactive conversion CTA at the end of the section */}
                  {sIdx < sections.length - 1 && (
                    <div className="sticky bottom-6 z-20 my-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950 border border-slate-800 p-6 md:p-8 rounded-[28px] overflow-hidden relative flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Decorative backdrop glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full -mr-10 -mt-10" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 blur-[50px] rounded-full -ml-10 -mb-10" />
                        
                        <div className="relative z-10 flex items-center gap-4 text-left">
                          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-6 h-6 animate-pulse text-emerald-400" />
                          </div>
                          <div>
                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em] block mb-1">
                              Milestone Assessment — {Math.round(((sIdx + 1) / sections.length) * 100)}% Complete
                            </span>
                            <h4 className="font-display font-black text-white text-base md:text-lg uppercase tracking-tight leading-snug">
                              Qualifying for 2026 {blog.category} Intake?
                            </h4>
                            <p className="text-slate-400 text-xs font-medium mt-0.5">
                              Check BTEC credentials status, German language prerequisites, and career entry pathways dynamically.
                            </p>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => {
                            setModalTitle(`Apply for 2026 ${blog.category} Intake`);
                            setIsModalOpen(true);
                          }}
                          className="relative z-10 w-full md:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/15 group shrink-0 active:scale-95 cursor-pointer"
                        >
                          <span>Check My Eligibility</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Share / Social trigger mock */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
              <div className="text-slate-400 text-xs font-black uppercase tracking-widest">
                Keyword Stack: {blog.keywords}
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Article Link Copied to Clipboard!');
                }}
                className="inline-flex items-center gap-2 text-xs font-black text-slate-900 hover:text-emerald-500 uppercase tracking-widest pointer-events-auto"
              >
                <Share2 className="w-4 h-4 text-emerald-500" />
                Copy Article Reference
              </button>
            </div>
          </article>

          {/* Sidebar Area including requested Lead capture CTA Forms */}
          <aside className="lg:col-span-4 space-y-8 sticky top-24">
            
            {/* CTA form dynamically selected for this blog */}
            {blog.ctaType !== 'none' && (
              <div className="p-8 bg-slate-900 rounded-[36px] text-white border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px] -mr-8 -mt-8 rounded-full" />
                <div className="relative z-10">
                   
                   {blog.ctaType === 'healthcare_counseling' ? (
                     <>
                        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/10">
                          <HeartPulse className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-display font-black tracking-tight mb-2 uppercase">BTEC Counseling Intake</h3>
                        <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">
                          Apply for special eligibility under our Level 4 and Level 5 Pearson program recognized across German/UK clinics.
                        </p>
                     </>
                   ) : (
                     <>
                        <div className="w-12 h-12 bg-brand-500/15 text-brand-400 rounded-2xl flex items-center justify-center mb-6 border border-brand-500/10">
                          <ClipboardCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-display font-black tracking-tight mb-2 uppercase">Priority Placement</h3>
                        <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">
                          Lock in a personalized assessment regarding local opportunities, language schools, and visa requirements.
                        </p>
                     </>
                   )}

                   <AnimatePresence>
                     {successMsg ? (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="p-6 bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 rounded-3xl text-center"
                       >
                          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                          <div className="font-bold text-sm mb-1 uppercase tracking-wider">Submission Approved</div>
                          <p className="text-[10px] leading-relaxed">Our senior advisors have logged your details. An assessment pipeline has been initiated.</p>
                       </motion.div>
                     ) : (
                       <form onSubmit={handleLeadSubmit} className="space-y-4">
                          <div>
                            <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Candidate Name</label>
                            <input 
                              required
                              type="text" 
                              placeholder="e.g., Jane Smith"
                              value={formState.name}
                              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none font-bold text-white transition-all placeholder:text-slate-600 mt-1"
                            />
                          </div>

                          <div>
                            <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Email Address</label>
                            <input 
                              required
                              type="email" 
                              placeholder="jane@healthcare.com"
                              value={formState.email}
                              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none font-bold text-white transition-all placeholder:text-slate-600 mt-1"
                            />
                          </div>

                          <div>
                            <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Contact Number</label>
                            <input 
                              required
                              type="tel" 
                              placeholder="+91-xxxx-xxxx"
                              value={formState.phone}
                              onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none font-bold text-white transition-all placeholder:text-slate-600 mt-1"
                            />
                          </div>

                          <div>
                            <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Target Region</label>
                            <select 
                              value={formState.targetCountry}
                              onChange={(e) => setFormState({ ...formState, targetCountry: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none font-bold text-white mt-1"
                            >
                              <option value="Germany" className="text-slate-900">Germany (Ausbildung)</option>
                              <option value="United Kingdom" className="text-slate-900">United Kingdom (NHS)</option>
                              <option value="United States" className="text-slate-900">United States (Clinical)</option>
                              <option value="Canada" className="text-slate-900">Canada</option>
                            </select>
                          </div>

                          <button 
                            type="submit" 
                            className="w-full py-4 bg-emerald-500 text-slate-900 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
                          >
                            Submit Application Info
                          </button>
                       </form>
                     )}
                   </AnimatePresence>
                </div>
              </div>
            )}

            {/* Course Information Widget */}
            <div className="p-8 bg-white rounded-[36px] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <Building className="w-5 h-5" />
                 </div>
                 <h4 className="font-display font-black text-slate-900 uppercase tracking-tight text-sm">Course Affiliations</h4>
              </div>
              <p className="text-slate-500 text-xs font-medium leading-relaxed mb-4">
                Both credentials support instant transfer mapping across the German ZAB (Zentralstelle für ausländisches Bildungswesen) or the UK ENIC database.
              </p>
              <Link to="/healthcare" className="text-xs font-black text-emerald-600 hover:underline uppercase tracking-widest inline-flex items-center gap-1.5">
                Overview of Syllabus <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Recommendations stack */}
            {recommendations.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-display font-black text-slate-950 uppercase tracking-widest text-xs px-2">Related Briefs</h4>
                <div className="space-y-4">
                   {recommendations.map(rec => (
                     <Link 
                       key={rec.id}
                       to={`/blog/${rec.slug}`}
                       className="block p-5 bg-white border border-slate-100 rounded-3xl hover:border-emerald-500 hover:shadow-md transition-all group"
                     >
                       <span className="text-[9px] font-black uppercase text-emerald-500 tracking-wider block mb-1">{rec.category}</span>
                       <h5 className="font-bold text-slate-900 text-sm line-clamp-2 uppercase group-hover:text-emerald-600 tracking-tight transition-colors">{rec.title}</h5>
                     </Link>
                   ))}
                </div>
              </div>
            )}

          </aside>

        </div>

      </div>

      <LeadCaptureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
        title={modalTitle}
        description="Join thousands of students and vocational professionals who secured direct recognition and clinical placements in Germany."
      />
    </motion.div>
  );
}
