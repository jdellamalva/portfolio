"use client";

import { useEffect, useState } from "react";

import styles from "./Resume.module.css";
import type { ResumeProps } from "./";

import TitleBar from "./TitleBar/TitleBar";
import Experience from "./Experience/Experience";

export default function Resume() {
  const [resumeData, setResumeData] = useState<ResumeProps | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [experienceFade, setExperienceFade] = useState(true);

  useEffect(() => {
    fetch("/resume.json")
      .then((res) => res.json())
      .then((data) => setResumeData(data));
  }, []); // load data

  useEffect(() => {
    setTimeout(() => setFade(true), 25);
  }, []); // fade in effect with small delay to account for data loading

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!resumeData) return;

      if (event.key === "d" || event.key === "ArrowRight") {
        handleClick((currentIndex + 1) % resumeData.experience.length);
      } else if (event.key === "a" || event.key === "ArrowLeft") {
        handleClick(
          (currentIndex - 1 + resumeData.experience.length) %
            resumeData.experience.length
        );
      }
    };

    let touchStartX: number;
    let touchEndX: number;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0].clientX;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      touchEndX = event.changedTouches[0].clientX;
      handleSwipe();
    };

    const handleSwipe = () => {
      if (!resumeData) return;

      const swipeThreshold = 50; // Minimum distance for a swipe to register
      if (touchStartX - touchEndX > swipeThreshold) {
        handleClick((currentIndex + 1) % resumeData.experience.length);
      } else if (touchEndX - touchStartX > swipeThreshold) {
        handleClick(
          (currentIndex - 1 + resumeData.experience.length) %
            resumeData.experience.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [resumeData, currentIndex]); // navigation event listeners

  const handleClick = (index: number) => {
    if (index === currentIndex) return;

    setExperienceFade(false);

    setTimeout(() => {
      setCurrentIndex(index);
      setExperienceFade(true);
    }, 300);
  };

  if (!resumeData) return <></>;

  return (
    <div className={`${styles.resume} ${fade ? "fadeIn" : "fadeOut"}`}>
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
              experienceFade ? "fadeIn" : "fadeOut"
            }`}
          >
            <Experience data={resumeData.experience[currentIndex]} />
          </div>
        </>
      )}
    </div>
  );
}
