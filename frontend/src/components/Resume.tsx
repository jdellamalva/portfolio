"use client";

import { useEffect, useState } from "react";
import TitleBar from "./TitleBar";
import Experience from "./ExperienceItem";
import { ResumeData } from "../types";
import styles from "./Resume.module.css";

export default function Resume() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    fetch("/resume.json") // Simulate fetching from a server
      .then((res) => res.json())
      .then((data) => setResumeData(data));
  }, []);

  const handleClick = (index: number) => {
    if (index === currentIndex) return; // Prevent unnecessary state updates
    setFade(false); // Start fade-out animation

    setTimeout(() => {
      setCurrentIndex(index);
      setFade(true); // Start fade-in animation
    }, 300); // Adjust timing to match CSS transition
  };

  if (!resumeData) return <></>;

  return (
    <div className={styles.resume}>
      {resumeData && (
        <>
          <TitleBar
            name={resumeData.name}
            headline={resumeData.headline}
            location={resumeData.location}
            email={resumeData.email}
            phone={resumeData.phone}
            website={resumeData.website}
          />
          <div className={styles.resumeNav}>
            {resumeData.experience.map((_, i) => (
              <div
                key={i}
                className={`${styles.resumeItem} ${
                  i === currentIndex ? styles.active : ""
                }`}
                onClick={() => handleClick(i)}
              ></div>
            ))}
          </div>
          <div
            className={`${styles.experienceContainer} ${
              fade ? styles.fadeIn : styles.fadeOut
            }`}
          >
            <Experience data={resumeData.experience[currentIndex]} />
          </div>
        </>
      )}
    </div>
  );
}
