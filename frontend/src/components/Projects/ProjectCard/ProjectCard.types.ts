export interface ProjectCardProps {
  title: string;
  description: string;
  mediaType?: "image" | "gif" | "video" | "none";
  mediaSrc?: string;
  videoUrl?: string;
}