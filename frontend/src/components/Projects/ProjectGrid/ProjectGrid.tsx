"use client";

import { useState, useEffect } from "react";
import ProjectCard from "../ProjectCard";

import styles from "./ProjectGrid.module.css";
import type { ProjectGridProps } from "./ProjectGrid.types";
import type { ProjectCardProps } from "../ProjectCard"

const dummyProjects: ProjectCardProps[] = [
    {
      title: "Project Alpha",
      description: "An experimental project exploring new concepts.",
      mediaType: "none",
    },
    {
      title: "Beta Initiative",
      description: "A deep dive into the future of web technologies.",
      mediaType: "none",
    },
    {
      title: "Gamma Framework",
      description: "Building a lightweight, efficient, and scalable framework.",
      mediaType: "none",
    },
    {
      title: "Delta Analytics",
      description: "A data-driven project providing insights on trends.",
      mediaType: "none",
    }
  ];

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {

// const [projectData, setProjectData] = useState([]);

//   useEffect(() => {
//     fetch("/projects.json") // Simulate fetching from a server
//       .then((res) => res.json())
//       .then((data) => setProjectData(data));
//   }, []); // fetch data


  return (
    <div className={styles.grid}>
      {dummyProjects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  );
};

export default ProjectGrid;