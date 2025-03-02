import React from "react";
import Image from "next/image";

import type { ProjectCardProps } from './'
import styles from './ProjectCard.module.css'

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    mediaType = "none",
    mediaSrc,
    videoUrl,
  }) => {
    return (
      <div className={`${styles.card} ${mediaType === "none" ? styles.noMedia : ""}`}>
        {mediaType !== "none" && mediaSrc && (
          <div className={styles.mediaContainer}>
            {mediaType === "image" || mediaType === "gif" ? (
              <Image
                src={mediaSrc}
                alt={title}
                layout="fill"
                objectFit="cover"
                className={styles.mediaImage}
              />
            ) : mediaType === "video" && videoUrl ? (
              <div className={styles.videoContainer}>
                <button className={styles.videoButton} onClick={() => window.open(videoUrl, "_blank")}>Play Video</button>
              </div>
            ) : null}
          </div>
        )}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    );
  };
  
  export default ProjectCard;  