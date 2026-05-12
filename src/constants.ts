import { Program, DifficultyLevel, JourneyStep, Metric, TeamMember, ResourceGuide } from './types';

export const PROGRAMS: Program[] = [
  {
    id: 'ger-ausbildung',
    title: 'Germany Ausbildung',
    country: 'Germany',
    description: 'Vocational training program with a guaranteed job and monthly stipend.',
    duration: '3 Years',
    outcome: 'German Certification + Permanent Job',
    difficulty: DifficultyLevel.MEDIUM,
    cost: '€0 (No Tuition)',
    successProbability: 92,
    tags: ['No Tuition', 'Stipend', 'Work-Study']
  },
  {
    id: 'ger-chancenkarte',
    title: 'Opportunity Card (Chancenkarte)',
    country: 'Germany',
    description: 'Points-based system for skilled workers to find employment in Germany.',
    duration: '1 Year (Job Search)',
    outcome: 'EU Blue Card / Work Permit',
    difficulty: DifficultyLevel.HIGH,
    cost: '€10,270 (Blocked Account)',
    successProbability: 78,
    tags: ['Points-based', 'Job Search', 'Skilled']
  },
  {
    id: 'healthcare-uk',
    title: 'UK Healthcare Support',
    country: 'United Kingdom',
    description: 'Accelerated pathway for qualified nurses and healthcare assistants.',
    duration: '6-12 Months',
    outcome: 'Health & Care Worker Visa',
    difficulty: DifficultyLevel.LOW,
    cost: '£5,000 (Relocation Package)',
    successProbability: 98,
    tags: ['Priority', 'Nursing', 'Sponsorship']
  },
  {
    id: 'canada-express',
    title: 'Canada Express Entry',
    country: 'Canada',
    description: 'Federal skilled worker program for high-tier professionals with strong language skills.',
    duration: '6-9 Months',
    outcome: 'Permanent Residency (PR)',
    difficulty: DifficultyLevel.HIGH,
    cost: 'CAD $15,000 (Settlement Funds)',
    successProbability: 65,
    tags: ['PR', 'Fast-track', 'Skilled']
  },
  {
    id: 'singapore-ep',
    title: 'Singapore Employment Pass',
    country: 'Singapore',
    description: 'Strategic pathway for foreign professionals, managers, and executives.',
    duration: '2-4 Weeks',
    outcome: 'Employment Pass (Long-term)',
    difficulty: DifficultyLevel.MEDIUM,
    cost: 'S$0 (Employer Sponsored)',
    successProbability: 85,
    tags: ['Fast-approval', 'Business Hub', 'Tech']
  }
];

export const JOURNEY_STEPS: JourneyStep[] = [
  { id: 1, title: 'Profile Evaluation', description: 'Data-driven assessment of your qualifications.', expectedDuration: '24-48 Hours', status: 'completed' },
  { id: 2, title: 'Skill Development', description: 'Targeted upskilling and language training.', expectedDuration: '3-6 Months', status: 'active' },
  { id: 3, title: 'Certification', description: 'Obtaining required international recognized credentials.', expectedDuration: '1-2 Months', status: 'pending' },
  { id: 4, title: 'Job Matching', description: 'Direct interviews with verified global employers.', expectedDuration: '2-4 Months', status: 'pending' },
  { id: 5, title: 'Visa Processing', description: 'Structured documentation and government filing.', expectedDuration: '1-3 Months', status: 'pending' },
  { id: 6, title: 'Relocation', description: 'Settling in with our on-ground support system.', expectedDuration: '2 Weeks', status: 'pending' }
];

export const METRICS: Metric[] = [
  { label: 'Total Students Enrolled', value: 12840, trend: 'up' },
  { label: 'Successful Placements', value: 9642, trend: 'up' },
  { label: 'Visa Approval Rate', value: 98.4, suffix: '%', trend: 'up' },
  { label: 'Avg. Time to Placement', value: 5.2, suffix: ' Months' }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'director',
    name: 'Late Prof. Dr. Jaideep Singh',
    role: 'Founder & Director',
    image: 'https://images.unsplash.com/photo-1544168190-79c17527004f?auto=format&fit=crop&q=80&w=800',
    bio: 'Late Prof. Dr. Jaideep Singh was a distinguished academician and global thought leader whose life\'s mission was to transform education into a journey of empowerment. With a PhD and decades of academic leadership, he pioneered institutional partnerships between Indian and international universities. His legacy of excellence and his commitment to ethical, data-driven student migration remains the cornerstone of Dream Migrator\'s philosophy.',
    legacy: true
  },
  {
    id: 'ceo',
    name: 'Ms. Parul Mahajan',
    role: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    bio: 'Ms. Parul Mahajan is a visionary leader with an extensive background in government relations, international diplomacy, and advocacy for global skill development. Before leading Dream Migrator, she held strategic positions where she influenced policy-making for overseas education and employment. Her expertise lies in navigating complex international regulatory frameworks to create seamless, high-success pathways for students and professionals looking to settle abroad.'
  },
  {
    id: 'coo',
    name: 'Mr. Rajkaran Batth',
    role: 'Chief Operating Officer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
    bio: 'Mr. Rajkaran Batth brings a unique blend of strategic design and operational architecture to the education sector. With a professional background in architecture and real estate development, he specializes in building robust infrastructure for global student services. At Dream Migrator, he oversees the execution of innovative vocational pathways like the German Ausbildung, ensuring every student has a structured, secure, and well-managed journey from enrollment to international placement.'
  }
];

export const RESOURCE_GUIDES: ResourceGuide[] = [
  {
    id: 'ausbildung-guide',
    title: 'Complete Guide: Ausbildung in Germany',
    description: 'Expert-authored handbook on vocational training (Ausbildung). Covers 200+ courses, stipends, and PR transition pathways for international students.',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1W9tHKBMTirE-ZtjpjuuBbh8LI6WvwAkX',
    category: 'Germany',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'chancenkarte-guide',
    title: 'Complete Guide: Opportunity Card',
    description: 'The definitive handbook for Germany\'s Chancenkarte (Opportunity Card). Learn how to live and work in Germany for 1 year without a job offer.',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1GajzTsMusyvBS8waLHHeOnLf6pTAFnXF',
    category: 'Germany',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'australia-sop-guide',
    title: 'Successful SOP Samples: Australia',
    description: 'A comprehensive collection of proven Statement of Purpose (SOP) samples that have secured admissions and visas for top Australian universities.',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1geziQPOas8kU2dhat2vG7ws5FoKVLdGN',
    category: 'Australia',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=400'
  }
];

export const COUNTRY_PROFILES: Record<string, any> = {
  'germany': {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    heroImage: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&q=80&w=1200',
    description: 'Europe\'s powerhouse with a massive demand for technical and healthcare talent.',
    jobMarket: {
      title: 'Industrial & Tech Dominance',
      description: 'Germany faces a demographic shift requiring 400,000 new migrants annually.',
      trendingRoles: ['Software Engineers', 'Mechanical Engineers', 'Nursing Specialists', 'Renewable Energy Tech'],
      salaryGrowth: [
        { year: '2023', growth: 4.8 },
        { year: '2024', growth: 5.2 },
        { year: '2025', growth: 5.5 },
        { year: '2026', growth: 5.8 }
      ]
    },
    costOfLiving: {
      comparison: [
        { item: 'Rent', value: 1100 },
        { item: 'Utilities', value: 250 },
        { item: 'Groceries', value: 400 },
        { item: 'Transport', value: 49 }
      ],
      index: 105
    },
    visaRequirements: [
      {
        type: 'Chancenkarte (Opportunity Card)',
        processingTime: '2-4 Months',
        requirements: ['Points-based criteria', 'Recognized degree', 'Basic German (A1) or English (B2)']
      },
      {
        type: 'EU Blue Card',
        processingTime: '1-2 Months',
        requirements: ['Work contract', 'Salary > €45k', 'Academic degree']
      }
    ],
    culturalInsights: {
      title: 'Punctuality & Precision',
      description: 'German work culture values direct communication and work-life boundaries.',
      dos: ['Be on time', 'Address people formally', 'Separate work and private life'],
      donts: ['Talk shop after hours', 'Litter', 'Be late for social calls']
    }
  },
  'canada': {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    heroImage: 'https://images.unsplash.com/photo-1503614472-8c97d45694ad?auto=format&fit=crop&q=80&w=1200',
    description: 'The world\'s most welcoming nations for skilled professionals and families.',
    jobMarket: {
      title: 'Stable Growth & Diversity',
      description: 'Vast opportunities in tech, healthcare, and construction sectors across provinces.',
      trendingRoles: ['Data Scientists', 'Full Stack Devs', 'Civil Engineers', 'Financial Analysts'],
      salaryGrowth: [
        { year: '2023', growth: 3.8 },
        { year: '2024', growth: 4.5 },
        { year: '2025', growth: 4.2 },
        { year: '2026', growth: 4.6 }
      ]
    },
    costOfLiving: {
      comparison: [
        { item: 'Rent', value: 1800 },
        { item: 'Utilities', value: 200 },
        { item: 'Groceries', value: 500 },
        { item: 'Transport', value: 120 }
      ],
      index: 115
    },
    visaRequirements: [
      {
        type: 'Express Entry',
        processingTime: '6-9 Months',
        requirements: ['Work experience', 'Language proficiency', 'ECA Certification']
      },
      {
        type: 'Provincial Nominee (PNP)',
        processingTime: '9-15 Months',
        requirements: ['Provincial nomination', 'Specific skills', 'Intent to reside']
      }
    ],
    culturalInsights: {
      title: 'Politeness & Multiculturalism',
      description: 'Canadian society is built on inclusivity and "mosaic" community values.',
      dos: ['Wait your turn', 'Acknowledge diversity', 'Value personal space'],
      donts: ['Forget to tip (15-20%)', 'Discuss politics aggressively', 'Underestimate the winter']
    }
  },
  'united-kingdom': {
    id: 'united-kingdom',
    name: 'United Kingdom',
    flag: '🇬🇧',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1200',
    description: 'Global financial hub with a robust post-Brexit demand for international talent.',
    jobMarket: {
      title: 'Financial & Healthcare Focus',
      description: 'Strong demand for tech practitioners and clinical staff in the NHS.',
      trendingRoles: ['Nursing staff', 'Cybersecurity experts', 'Accountants', 'Teachers'],
      salaryGrowth: [
        { year: '2023', growth: 5.5 },
        { year: '2024', growth: 4.2 },
        { year: '2025', growth: 4.8 },
        { year: '2026', growth: 5.2 }
      ]
    },
    costOfLiving: {
      comparison: [
        { item: 'Rent', value: 1600 },
        { item: 'Utilities', value: 300 },
        { item: 'Groceries', value: 450 },
        { item: 'Transport', value: 180 }
      ],
      index: 120
    },
    visaRequirements: [
      {
        type: 'Skilled Worker Visa',
        processingTime: '3-8 Weeks',
        requirements: ['Job offer/Sponsorship', 'English proficiency', 'Minimum salary threshold']
      },
      {
        type: 'Health & Care Visa',
        processingTime: '3 Weeks',
        requirements: ['Qualified healthcare role', 'NHS job offer', 'Lower fee']
      }
    ],
    culturalInsights: {
      title: 'Etiquette & Queuing',
      description: 'British culture is defined by understated humor and respect for procedures.',
      dos: ['Queue patiently', 'Use British "Polite" forms', 'Master small talk'],
      donts: ['Jump the queue', 'Be overly boisterous', 'Ignore local traditions']
    }
  },
  'singapore': {
    id: 'singapore',
    name: 'Singapore',
    flag: '🇸🇬',
    heroImage: 'https://images.unsplash.com/photo-1525625239513-35329b387d3a?auto=format&fit=crop&q=80&w=1200',
    description: 'Asia\'s premier business hub with zero tolerance for inefficiency and high rewards.',
    jobMarket: {
      title: 'High-Tech & FinTech Hub',
      description: 'Strategic gateway for multinational corporations in tech and trade.',
      trendingRoles: ['FinTech Devs', 'Supply Chain Managers', 'AI Researchers', 'Investment Bankers'],
      salaryGrowth: [
        { year: '2023', growth: 4.2 },
        { year: '2024', growth: 4.8 },
        { year: '2025', growth: 5.1 },
        { year: '2026', growth: 5.4 }
      ]
    },
    costOfLiving: {
      comparison: [
        { item: 'Rent', value: 3500 },
        { item: 'Utilities', value: 150 },
        { item: 'Groceries', value: 600 },
        { item: 'Transport', value: 100 }
      ],
      index: 160
    },
    visaRequirements: [
      {
        type: 'Employment Pass (EP)',
        processingTime: '2-4 Weeks',
        requirements: ['Minimum salary S$5k+', 'Strong credentials', 'COMPASS points']
      },
      {
        type: 'Personalized EP (PEP)',
        processingTime: '4-8 Weeks',
        requirements: ['High income history', 'Specific top-tier talent', 'Greater flexibility']
      }
    ],
    culturalInsights: {
      title: 'Efficiency & Meritocracy',
      description: 'A fast-paced environment where results and formal relationships matter.',
      dos: ['Exchange business cards formally', 'Respect laws strictly', 'Be efficient'],
      donts: ['Litter or chew gum', 'Discuss sensitive personal topics', 'Arrive casual']
    }
  },
  'usa': {
    id: 'usa',
    name: 'USA',
    flag: '🇺🇸',
    heroImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
    description: 'The land of boundless professional opportunity and innovative risk-taking.',
    jobMarket: {
      title: 'Innovation & Scale',
      description: 'Diverse landscape from Silicon Valley tech to Wall Street finance.',
      trendingRoles: ['AI Engineers', 'Product Managers', 'Biotech Scientists', 'Marketing Strategists'],
      salaryGrowth: [
        { year: '2023', growth: 4.5 },
        { year: '2024', growth: 4.2 },
        { year: '2025', growth: 4.8 },
        { year: '2026', growth: 4.4 }
      ]
    },
    costOfLiving: {
      comparison: [
        { item: 'Rent', value: 2500 },
        { item: 'Utilities', value: 250 },
        { item: 'Groceries', value: 600 },
        { item: 'Transport', value: 150 }
      ],
      index: 130
    },
    visaRequirements: [
      {
        type: 'H-1B Visa',
        processingTime: '3-6 Months',
        requirements: ['Specialty occupation', 'Employer sponsorship', 'Lottery system']
      },
      {
        type: 'O-1 (Extraordinary Ability)',
        processingTime: '2-4 Months',
        requirements: ['National/International acclaim', 'Field mastery', 'Sponsorship']
      }
    ],
    culturalInsights: {
      title: 'Ambition & Individualism',
      description: 'American work culture celebrates innovation, proactive networking, and speed.',
      dos: ['Network constantly', 'Be an "over-achiever"', 'Express confidence'],
      donts: ['Wait for instructions', 'Stay too quiet in meetings', 'Understate your wins']
    }
  }
};
