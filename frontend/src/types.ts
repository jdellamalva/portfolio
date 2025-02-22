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
    name: string;
    headline: string;
    location: string;
    email: string;
    phone: string;
    website: string;
    summary: string;
    experience: ExperienceItem[];
}

export interface TitleBarProps {
    name: string;
    headline: string;
    location: string;
    email: string;
    phone: string;
    website: string;
}