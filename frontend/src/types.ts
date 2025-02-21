export interface ExperienceItem {
    id: string;
    category: string;
  title: string;
  employer: string;
  location: string;
  start: string;
  end: string;
  bulletPoints: BulletPoint[];
}

export interface BulletPoint {
  text: string;
  highlights: string[];
}

export interface ResumeData {
  summary: string;
  experience: ExperienceItem[];
}