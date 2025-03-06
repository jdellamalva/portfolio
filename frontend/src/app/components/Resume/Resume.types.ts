import type { ExperienceProps } from "./Experience";

export interface ResumeProps {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  summary: string;
  experience: ExperienceProps[];
}