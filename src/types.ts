export enum DifficultyLevel {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  ELITE = "Elite"
}

export interface Program {
  id: string;
  title: string;
  country: string;
  description: string;
  duration: string;
  outcome: string;
  difficulty: DifficultyLevel;
  cost: string;
  successProbability: number;
  tags: string[];
}

export interface JourneyStep {
  id: number;
  title: string;
  description: string;
  expectedDuration: string;
  status: 'pending' | 'active' | 'completed';
}

export interface Metric {
  label: string;
  value: string | number;
  suffix?: string;
  trend?: 'up' | 'neutral';
}

export interface CountryProfile {
  id: string;
  name: string;
  flag: string;
  heroImage: string;
  description: string;
  jobMarket: {
    title: string;
    description: string;
    trendingRoles: string[];
    salaryGrowth: { year: string; growth: number }[];
  };
  costOfLiving: {
    comparison: { item: string; value: number }[];
    index: number; // vs global average
  };
  visaRequirements: {
    type: string;
    processingTime: string;
    requirements: string[];
  }[];
  culturalInsights: {
    title: string;
    description: string;
    dos: string[];
    donts: string[];
  };
}

export interface ScoreResult {
  score: number;
  successProbability: number;
  recommendedCountries: string[];
  explanation: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  legacy?: boolean;
}

export interface ResourceGuide {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  category: string;
  image: string;
}
