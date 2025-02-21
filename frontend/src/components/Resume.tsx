"use client";

import { useEffect, useState } from "react";
import Experience from "./ExperienceItem";
import { ResumeData } from "../types";

export default function Resume() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    fetch("/resume.json") // Simulate fetching from a server
      .then((res) => res.json())
      .then((data) => setResumeData(data));
  }, []);

  if (!resumeData) return <></>;

  // Filter experiences based on selected category
  const filteredExperiences =
    selectedCategory === "All"
      ? resumeData.experience
      : resumeData.experience.filter(
          (exp) => exp.category === selectedCategory
        );

  const handleScrollToEntry = (id: string) => {
    const index = resumeData.experience.findIndex((exp) => exp.id === id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  return (
    <div>
      <Experience data={resumeData.experience[currentIndex]} />
    </div>
  );
}
