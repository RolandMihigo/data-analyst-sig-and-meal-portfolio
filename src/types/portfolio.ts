export type Language = 'en' | 'fr';

export interface LocalizedString {
  en: string;
  fr: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  kaggle?: string;
  twitter?: string;
  website?: string;
  email: string;
  phone?: string;
  location?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  category: 'meal_analytics' | 'sig_gis' | 'kobo_field' | 'bi_dataviz' | 'database_sql' | 'humanitarian_gov' | 'languages';
  icon?: string;
}

export interface ProjectItem {
  id: string;
  title: LocalizedString;
  shortDesc: LocalizedString;
  fullDesc: LocalizedString;
  category: 'meal' | 'bi' | 'gis' | 'data_analysis' | 'humanitarian';
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  kaggleUrl?: string;
  featured?: boolean;
  metrics?: LocalizedString;
  highlights?: {
    en: string[];
    fr: string[];
  };
}

export interface EducationItem {
  id: string;
  degree: LocalizedString;
  institution: LocalizedString;
  period: string;
  location: LocalizedString;
  description: LocalizedString;
  honors?: LocalizedString;
}

export interface CertificationItem {
  id: string;
  name: LocalizedString;
  issuer: string;
  credentialUrl?: string;
  year?: string;
  badge?: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  role: LocalizedString;
  organization: string;
  email: string;
  phone: string;
}

export interface ExperienceItem {
  id: string;
  role: LocalizedString;
  company: string;
  period: string;
  location: LocalizedString;
  description: LocalizedString;
  responsibilities: {
    en: string[];
    fr: string[];
  };
  technologies: string[];
}

export interface BlogPostItem {
  id: string;
  title: LocalizedString;
  slug: string;
  date: string;
  readTime: LocalizedString;
  category: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  tags: string[];
  author: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: LocalizedString;
    bio: LocalizedString;
    about: LocalizedString;
    avatarUrl: string;
    contact: SocialLinks;
    availableForHire: boolean;
    yearsOfExperience: number;
    projectsCompleted: number;
    satisfiedClients: number;
    hobbies?: LocalizedString[];
  };
  skills: SkillItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  references: ReferenceItem[];
  experience: ExperienceItem[];
  blog: BlogPostItem[];
}
