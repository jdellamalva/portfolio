export interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  mediaType?: "image" | "gif" | "video" | "none";
  mediaSrc?: string;
  videoUrl?: string;
  isSelected: boolean;
  onClick: () => void;
}