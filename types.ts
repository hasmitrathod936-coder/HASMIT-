export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Remote';
  postedAt: string;
  description: string;
  requirements: string[];
  benefits: string[];
  logoSeed?: number; // For consistent random images
  matchScore?: number; // AI calculated match score
}

export interface JobFilter {
  query: string;
  location: string;
  type?: string;
}

export interface CoverLetterRequest {
  jobTitle: string;
  companyName: string;
  candidateName: string;
  skills: string;
  experience: string;
}

export interface JobAlert {
  id: string;
  query: string;
  location: string;
  email: string;
  frequency: 'Daily' | 'Weekly';
  createdAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  qualification: string;
  university: string;
  skills: string;
  biodata: string;
}