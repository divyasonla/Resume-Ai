export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  image?: string; // profile image url or base64
  github?: string;
  code?: string; // code portfolio url
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'basic' | 'conversational' | 'professional' | 'native';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface Interest {
  id: string;
  name: string;
  category: 'hobby' | 'sport' | 'art' | 'technology' | 'other';
}

export interface AIFeedback {
  overallScore: number;
  grammarScore: number;
  professionalScore: number;
  completenessScore: number;
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
  generatedAt: string;
}

export interface ResumeSettings {
  themeColor: string; // HSL format: "217 91% 60%"
  fontSize: number; // Base font size in pt
  fontFamily: string;
  fontSubset: string;
  fontVariants: string;
  lineHeight: number;
  hideIcons: boolean;
}

export interface ResumeData {
  id?: string;
  title: string;
  template: TemplateType;
  settings: ResumeSettings;
  personalInfo: PersonalInfo;
  careerObjective: string;
  education: Education[];
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
  languages: Language[];
  achievements: Achievement[];
  interests: Interest[];
  aiFeedback?: AIFeedback;
}

export type TemplateType = 'modern' | 'classic' | 'minimal' | 'creative' | 'ats' | 'simple' | 'elegant';

export type WizardStep = 
  | 'personal'
  | 'objective'
  | 'education'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'certifications'
  | 'languages'
  | 'achievements'
  | 'interests';

export const WIZARD_STEPS: { key: WizardStep; label: string; icon: string }[] = [
  { key: 'personal', label: 'Personal Info', icon: 'User' },
  { key: 'objective', label: 'Career Objective', icon: 'Target' },
  { key: 'education', label: 'Education', icon: 'GraduationCap' },
  { key: 'skills', label: 'Skills', icon: 'Wrench' },
  { key: 'projects', label: 'Projects', icon: 'FolderOpen' },
  { key: 'experience', label: 'Experience', icon: 'Briefcase' },
  { key: 'certifications', label: 'Certifications', icon: 'Award' },
  { key: 'languages', label: 'Languages', icon: 'Globe' },
  { key: 'achievements', label: 'Achievements', icon: 'Trophy' },
  { key: 'interests', label: 'Interests', icon: 'Heart' },
];

export const DEFAULT_SETTINGS: ResumeSettings = {
  themeColor: '217 91% 60%', // Default blue
  fontSize: 11,
  fontFamily: 'IBM Plex Serif',
  fontSubset: 'latin',
  fontVariants: 'regular, italic, 600',
  lineHeight: 1.5,
  hideIcons: false,
};

export const INITIAL_RESUME_DATA: ResumeData = {
  title: 'My Resume',
  template: 'modern',
  settings: DEFAULT_SETTINGS,
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    image: '',
    github: '',
    code: '',
  },
  careerObjective: '',
  education: [],
  skills: [],
  projects: [],
  experience: [],
  certifications: [],
  languages: [],
  achievements: [],
  interests: [],
};

// Theme color presets
export const THEME_COLORS = [
  { name: 'Blue', value: '217 91% 60%' },
  { name: 'Indigo', value: '239 84% 67%' },
  { name: 'Purple', value: '271 81% 56%' },
  { name: 'Pink', value: '330 81% 60%' },
  { name: 'Red', value: '0 84% 60%' },
  { name: 'Orange', value: '25 95% 53%' },
  { name: 'Amber', value: '38 92% 50%' },
  { name: 'Green', value: '142 76% 36%' },
  { name: 'Teal', value: '173 80% 40%' },
  { name: 'Cyan', value: '189 94% 43%' },
  { name: 'Gray', value: '220 9% 46%' },
  { name: 'Slate', value: '215 16% 47%' },
];
