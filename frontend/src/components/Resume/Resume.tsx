"use client";

import { useEffect, useState } from "react";
import TitleBar from "./TitleBar/TitleBar";
import Experience from "./Experience/Experience";
import styles from "./Resume.module.css";
import type { ResumeProps } from "./"

export default function Resume() {
  const [resumeData, setResumeData] = useState<ResumeProps | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    fetch("/resume.json") // Simulate fetching from a server
      .then((res) => res.json())
      .then((data) => setResumeData(data));
  }, []); // fetch data

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
        // Swiped left (next item)
        handleClick((currentIndex + 1) % resumeData.experience.length);
      } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swiped right (previous item)
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
    if (index === currentIndex) return; // Prevent unnecessary state updates
    setFade(false); // Start fade-out animation

    setTimeout(() => {
      setCurrentIndex(index);
      setFade(true); // Start fade-in animation
    }, 300); // Adjust timing to match CSS transition
  };

  if (!resumeData) return <></>;

  return (
    <main className={styles.main}>
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
    </main>
  );
}
