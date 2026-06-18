export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string; // Markdown / HTML with clean interlinking support
  category: string;
  author: string;
  image: string;
  imageAlt: string;
  ctaType: 'lead_capture' | 'healthcare_counseling' | 'standard_assessment' | 'none';
  keywords: string;
  metaTitle: string;
  metaDescription: string;
  schemaJson?: string; // Optional custom schema plug for Course, Article or FAQ
  createdAt: string;
}

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  keywords: string;
  schemaType: 'Organization' | 'WebPage' | 'Course' | 'FAQPage';
  schemaData: string; // JSON-LD string
}

export interface SEOConfig {
  analyticsId: string;
  tagManagerId: string;
  searchConsoleId: string;
  robotsTxt: string;
  llmTxt: string;
  cachingProfile: 'aggressive' | 'standard' | 'off';
  cachingDuration: number; // in seconds
  imageAlts: Record<string, string>; // Maps image URLs toAlt Text
  sitemaps: Record<string, { priority: number; changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' }>;
}

const BLOGS_KEY = 'dream_migrator_blogs';
const SEO_CONFIG_KEY = 'dream_migrator_seo_config';
const PAGES_META_KEY = 'dream_migrator_pages_meta';

// Initial preloaded blog content for 2026
const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Surge in Demand for Pearson BTEC Level 4 and Level 5 Healthcare Professionals in 2026',
    slug: 'btec-level-4-5-healthcare-demand-2026',
    category: 'Healthcare',
    author: 'Dr. Evelyn Martinez (BTEC Senior Director)',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000',
    imageAlt: 'Healthcare teaching setup displaying professional level 4 and 5 clinical equipment',
    ctaType: 'healthcare_counseling',
    keywords: 'Pearson BTEC Level 4, BTEC Level 5, Healthcare careers 2026, global healthcare vacancy, medical training germany',
    metaTitle: 'Pearson BTEC Level 4 & 5 Healthcare Career Guide (2026)',
    metaDescription: 'Discover why Pearson BTEC Level 4 and Level 5 health certificates open career avenues across 76+ recognized countries, especially Germany, UK, and USA.',
    createdAt: '2026-05-18T10:00:00Z',
    content: `## Bridging the Global Healthcare Ingress Gap in 2026

Modern healthcare systems around the globe require specialized, highly practical care roles with the agility to pivot between emergency medical, clinical diagnostics, and patient rehabilitation pathways. Under the globally respected **Pearson BTEC training platform**, Level 4 and Level 5 qualifications now serve as critical gateways for this standard.

### W3C Semantic Hierarchy: Understanding level 4 and Level 5 Qualifications
In this educational hierarchy, we analyze why these professional credentials outmatch traditional abstract theory and fit seamlessly into international work visa validation systems:

#### 1. What is Level 4 BTEC Healthcare?
Level 4 represents the initial professional tier, covering nurse assistance fundamentals, health diagnostics, and social care infrastructure. In 2026, healthcare facilities respect our graduates for their immediate hands-on clinical knowledge.

#### 2. Why Level 5 BTEC is the Ultimate Career Accelerator
Level 5 is analogous to a foundation medical degree or specialized associate degree in healthcare management. This course dives deep into healthcare administration, leadership protocols, and critical path medicine. It meets the immigration and professional registry standards of the German Ausbildung system and the UK NHS and facilitates direct fast-tracked visa paths.

### Dynamic Interlinking for Students
For further details on how this fits your specific budget, visit our [International Cost Calculator](/cost-calculator) to compute your training and travel budgets, or use our [AI Career Counselor](/ai-counselor) to assess your clinical eligibility. For those interested in the German Ausbildung specifically, we have fully detailed our [German Ausbildung Intakes](/ausbildung) page for the second half of 2026.

### Essential Training Guidelines
*   **76+ Countries:** Globally synchronized learning outcomes.
*   **No Prior Intensive Science Required:** Flexible pathway with dedicated core medical foundation modules.
*   **Direct Hospital Attachments:** Practical assessments completed during live internships.`,
    schemaJson: `{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "The Surge in Demand for Pearson BTEC Level 4 and Level 5 Healthcare Professionals in 2026",
  "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000",
  "author": {
    "@type": "Person",
    "name": "Dr. Evelyn Martinez"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Dream Migrator",
    "logo": {
      "@type": "ImageObject",
      "url": "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=100"
    }
  },
  "datePublished": "2026-05-18T10:00:00Z"
}`
  },
  {
    id: 'b2',
    title: 'A Strategic Guide to German Ausbildung Intakes & Visa Predictors in 2026',
    slug: 'german-ausbildung-intakes-visa-predictors-2026',
    category: 'German Migration',
    author: 'Helmut Vance (SOP & Visa Consultant)',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000',
    imageAlt: 'German immigration advisory discussion showing visa prediction dashboard',
    ctaType: 'standard_assessment',
    keywords: 'German Ausbildung, Ausbildung Intake 2026, German Visa Predictor, SOP analysis tools, Study in Europe',
    metaTitle: 'German Ausbildung & Visa Predictions for 2026',
    metaDescription: 'Learn about the critical timelines, German language certifications, and SOP guidelines needed to secure your spot in Germany during the 2026 Ausbildung wave.',
    createdAt: '2026-05-14T08:30:00Z',
    content: `## Preparing for Germany in 2026: An Expert Roadmap

The dual-education program in Germany, known as **Ausbildung**, has been expanded for 2026. This allows skilled candidates from global markets to secure guaranteed work contracts, receive direct monthly stipends, and earn premium recognized degrees without spending thousands on private tuition fees!

### Core Prerequisites
To successfully execute your application:
1.  **Language Capacity:** German B1/B2 level is non-negotiable for nursing, nursing support, and electrical engineering, although BTEC training programs are bridged beautifully to reduce language friction.
2.  **SOP Validation:** Your Statement of Purpose must clearly state why you represent a strong match. You can analyze your current drafting with our advanced, automated [SOP Analyzer](/sop-analyzer).
3.  **Visa Predictor checks:** Check dynamic visa approval probabilities with our [Visa Timeline Predictor](/visa-timeline) to stay safe.

### Key Timelines for 2026
*   **February Intake:** Ideal for candidates with B2 certificates already completed by early November.
*   **August/September Intake:** Outstanding for students completing Pearson BTEC assignments in May/June. Applications should close by mid-April for optimal safety.`,
    schemaJson: `{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "A Strategic Guide to German Ausbildung Intakes & Visa Predictors in 2026",
  "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000",
  "author": {
    "@type": "Person",
    "name": "Helmut Vance"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Dream Migrator"
  },
  "datePublished": "2026-05-14T08:30:00Z"
}`
  }
];

const DEFAULT_SEO_CONFIG: SEOConfig = {
  analyticsId: 'G-SEO2026TR',
  tagManagerId: 'GTM-K982ZZ',
  searchConsoleId: 'google-site-verification=seo-proof-2026-dreammigrator',
  robotsTxt: `# Robots.txt for Dream Migrator (SEO 2026 Optimization)
User-agent: *
Allow: /
Disallow: /admin
Disallow: /dashboard

Sitemap: https://dream-migrator.dynamic/sitemap.xml`,
  llmTxt: `# llm.txt - Machine-readable information for LLM crawlers like Gemini and GPTBot
# Dream Migrator (Level 4/5 Pearson BTEC & Global Migration)

## Intent
The primary purpose of this website is to provide specialized training, credentials assessment, and premium student relocation consulting for BTEC Levels 4/5 and German Ausbildung frameworks.

## Key Services
- Pearson BTEC Level 4 & Level 5 Healthcare training.
- German Ausbildung application and intake coaching.
- Direct AI career assessments and SOP reviews.

## Core Navigation Index
- /healthcare : Level 4 and Level 5 Pearson healthcare programs
- /ausbildung : Detailed application flow and support
- /cost-calculator : Living cost estimations
- /sop-analyzer : Statement of Purpose analyzer
- /ai-counselor : Live interactive career counselor`,
  cachingProfile: 'aggressive',
  cachingDuration: 86400,
  imageAlts: {
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000': 'BTEC Healthcare Level 4 diagnostics lab training displaying student teamwork',
    'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=1000': 'Medical supervisor teaching level 5 health diagnostics to a professional nursing candidate',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000': 'Group of happy international students on a bright university campus discussing counseling results'
  },
  sitemaps: {
    '/': { priority: 1.0, changefreq: 'daily' },
    '/healthcare': { priority: 0.9, changefreq: 'weekly' },
    '/ausbildung': { priority: 0.9, changefreq: 'weekly' },
    '/resources': { priority: 0.8, changefreq: 'weekly' },
    '/about': { priority: 0.7, changefreq: 'monthly' },
    '/contact': { priority: 0.6, changefreq: 'monthly' },
    '/ai-counselor': { priority: 0.8, changefreq: 'daily' },
    '/cost-calculator': { priority: 0.7, changefreq: 'monthly' },
    '/sop-analyzer': { priority: 0.7, changefreq: 'monthly' },
    '/blog': { priority: 0.8, changefreq: 'daily' }
  }
};

const DEFAULT_PAGES_META: PageMeta[] = [
  {
    path: '/',
    title: 'Bridge the Gap to Global Medical & Healthcare Careers',
    description: 'Specialized Pearson BTEC Level 4 & Level 5 Healthcare training. Recognized in 76+ countries. Launch your career in Germany, UK, or USA with our expert guidance.',
    keywords: 'study abroad, BTEC level 4, BTEC level 5, healthcare training, global medical careers, German Ausbildung, nursing training',
    schemaType: 'Organization',
    schemaData: `{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Dream Migrator",
  "url": "https://dream-migrator.dynamic",
  "logo": "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=100",
  "description": "Exclusive professional guidance and Pearson BTEC Level 4/5 Healthcare certifications provider.",
  "sameAs": [
    "https://facebook.com/dreammigrator",
    "https://linkedin.com/company/dreammigrator"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9876543210",
    "contactType": "Admissions Desk",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  }
}`
  },
  {
    path: '/healthcare',
    title: 'Pearson BTEC Level 4 & Level 5 Professional Healthcare Pathway',
    description: 'Step into clinical and healthcare leadership roles worldwide. Globally recognized, industry-aligned BTEC healthcare certificates.',
    keywords: 'BTEC Healthcare Level 4, BTEC Healthcare Level 5, Nursing certificates, healthcare study abroad',
    schemaType: 'Course',
    schemaData: `{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Pearson BTEC Level 4 & Level 5 Professional Diploma in Healthcare",
  "description": "Direct academic pathway for medical students to secure legal working status in 76+ countries through modular, outcome-focused qualifications.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Dream Migrator - BTEC Partner Network"
  },
  "educationalLevel": "Intermediate to Advanced (European Qualification Framework levels 4 & 5)"
}`
  },
  {
    path: '/ausbildung',
    title: 'German Ausbildung 2026 Programs with Guaranteed Stipends',
    description: 'Learn German, compile your SOP, evaluate visa readiness, and secure dual-education contracts in nursing, tech, and engineering.',
    keywords: 'Ausbildung Germany, Stipends Germany, dual vocational system, German nursing, study in Germany for free',
    schemaType: 'FAQPage',
    schemaData: `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the training stipend for a German Ausbildung in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stipends usually range between €1,000 and €1,400 per month depending on specializations (e.g., healthcare assistant or nurse)."
      }
    },
    {
      "@type": "Question",
      "name": "Can BTEC certificate holders fast-track their German visa applications?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, German immigration and health boards recognize pre-vocational clinical training from standard bodies like Pearson BTEC, aiding qualification audits."
      }
    }
  ]
}`
  }
];

export function getBlogs(): BlogPost[] {
  const stored = localStorage.getItem(BLOGS_KEY);
  if (!stored) {
    localStorage.setItem(BLOGS_KEY, JSON.stringify(DEFAULT_BLOGS));
    return DEFAULT_BLOGS;
  }
  return JSON.parse(stored);
}

export function saveBlogPost(blog: Omit<BlogPost, 'id' | 'createdAt'>): BlogPost {
  const blogs = getBlogs();
  const newBlog: BlogPost = {
    ...blog,
    id: 'b_' + Date.now(),
    createdAt: new Date().toISOString()
  };
  blogs.unshift(newBlog);
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
  
  // Also register blog automatically into dynamic sitemap!
  const seoConfig = getSEOConfig();
  seoConfig.sitemaps[`/blog/${newBlog.slug}`] = { priority: 0.8, changefreq: 'weekly' };
  saveSEOConfig(seoConfig);

  return newBlog;
}

export function updateBlogPost(id: string, updates: Partial<BlogPost>): boolean {
  const blogs = getBlogs();
  const idx = blogs.findIndex(b => b.id === id);
  if (idx === -1) return false;
  
  const oldSlug = blogs[idx].slug;
  blogs[idx] = { ...blogs[idx], ...updates };
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));

  // Update sitemap route if slug changed
  if (updates.slug && updates.slug !== oldSlug) {
    const seoConfig = getSEOConfig();
    delete seoConfig.sitemaps[`/blog/${oldSlug}`];
    seoConfig.sitemaps[`/blog/${updates.slug}`] = { priority: 0.8, changefreq: 'weekly' };
    saveSEOConfig(seoConfig);
  }

  return true;
}

export function deleteBlogPost(id: string): boolean {
  const blogs = getBlogs();
  const blog = blogs.find(b => b.id === id);
  if (!blog) return false;
  const filtered = blogs.filter(b => b.id !== id);
  localStorage.setItem(BLOGS_KEY, JSON.stringify(filtered));

  const seoConfig = getSEOConfig();
  delete seoConfig.sitemaps[`/blog/${blog.slug}`];
  saveSEOConfig(seoConfig);

  return true;
}

export function getSEOConfig(): SEOConfig {
  const stored = localStorage.getItem(SEO_CONFIG_KEY);
  if (!stored) {
    localStorage.setItem(SEO_CONFIG_KEY, JSON.stringify(DEFAULT_SEO_CONFIG));
    return DEFAULT_SEO_CONFIG;
  }
  return JSON.parse(stored);
}

export function saveSEOConfig(config: SEOConfig) {
  localStorage.setItem(SEO_CONFIG_KEY, JSON.stringify(config));
}

export function getPagesMeta(): PageMeta[] {
  const stored = localStorage.getItem(PAGES_META_KEY);
  if (!stored) {
    localStorage.setItem(PAGES_META_KEY, JSON.stringify(DEFAULT_PAGES_META));
    return DEFAULT_PAGES_META;
  }
  return JSON.parse(stored);
}

export function savePageMeta(meta: PageMeta) {
  const metas = getPagesMeta();
  const idx = metas.findIndex(m => m.path === meta.path);
  if (idx === -1) {
    metas.push(meta);
  } else {
    metas[idx] = meta;
  }
  localStorage.setItem(PAGES_META_KEY, JSON.stringify(metas));
}

// Custom Helper to retreive registered Alt Text for any image. Dynamic Fallback!
export function getImageAlt(imgUrl: string, defaultAlt: string = 'International vocational education training for nursing and medical care.'): string {
  const config = getSEOConfig();
  return config.imageAlts[imgUrl] || defaultAlt;
}

// Fast Sitemap XML dynamic builder & generator export utilities
export function generateSitemapXML(): string {
  const config = getSEOConfig();
  const blogs = getBlogs();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Base domain config
  const domain = 'https://dream-migrator.dynamic';

  // Core Pages
  Object.entries(config.sitemaps).forEach(([path, meta]) => {
    xml += `  <url>\n`;
    xml += `    <loc>${domain}${path}</loc>\n`;
    xml += `    <priority>${meta.priority.toFixed(1)}</priority>\n`;
    xml += `    <changefreq>${meta.changefreq}</changefreq>\n`;
    xml += `  </url>\n`;
  });

  // Dynamically registered blogs
  blogs.forEach(blog => {
    const blogPath = `/blog/${blog.slug}`;
    if (!config.sitemaps[blogPath]) {
      xml += `  <url>\n`;
      xml += `    <loc>${domain}${blogPath}</loc>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `  </url>\n`;
    }
  });

  xml += `</urlset>`;
  return xml;
}
