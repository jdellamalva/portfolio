import React from "react";
import Image from "next/image";

import type { ProjectCardProps } from "./";
import styles from "./ProjectCard.module.css";

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  mediaType = "none",
  mediaSrc,
  videoUrl,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ""} ${
        mediaType === "none" ? styles.noMedia : ""
      }`}
      onClick={onClick}
    >
      {mediaType !== "none" && mediaSrc && (
        <div className={styles.mediaContainer}>
          {mediaType === "image" || mediaType === "gif" ? (
            <Image src={mediaSrc} alt={title} layout="fill" objectFit="cover" />
          ) : mediaType === "video" && videoUrl ? (
            <div>
              <button
                className={styles.videoButton}
                onClick={() => window.open(videoUrl, "_blank")}
              >
                Play Video
              </button>
            </div>
          ) : null}
        </div>
      )}
      <div className={styles.caption}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
