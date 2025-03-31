"use client";

import { useState, useEffect } from "react";
import ProjectCard from "../ProjectCard";
import styles from "./ProjectGrid.module.css";
import type { ProjectGridProps } from "./ProjectGrid.types";
import type { ProjectCardProps } from "../ProjectCard";

const ProjectGrid: React.FC<ProjectGridProps> = () => {
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data: ProjectCardProps[]) => setProjects(data));
  }, []);

  useEffect(() => {
    setFade(true);
  }, []);

  const handleCardClick = (id: number) => {
    setSelectedProject(selectedProject === id ? null : id);
  };

  return (
    <div
      className={`${styles.grid} ${fade ? styles.fadeIn : styles.fadeOut} ${
        selectedProject !== null ? styles.focusMode : ""
      }`}
    >
      {projects.map((project) => (
        <div
          key={project.id}
          className={`${styles.gridItem} ${
            selectedProject === project.id ? styles.selected : ""
          }`}
          //   onClick={() => handleCardClick(project.id)}
        >
          <ProjectCard {...project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
