import type { BulletPointProps } from "../BulletPoint";

export interface ExperienceProps {
  id: string;
  category: string;
  title: string;
  employer: string;
  location: string;
  start: string;
  end: string;
  bulletPoints: BulletPointProps[];
}