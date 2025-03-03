import type { Metadata } from "next";

import ProjectGrid from "@/components/Projects/ProjectGrid";

export const metadata: Metadata = {
  title: "JDM | Projects",
  description: "My Projects",
};

export default function ProjectsPage() {
  return (
    <div className="container">
      <ProjectGrid />
    </div>
  );
}
