"use client";

import React, { useState } from "react";
import styles from "./ExperienceItem.module.css";
import BulletPoint from "./BulletPoint";
import { ExperienceItem } from "../types";

export default function Experience({ data }: { data: ExperienceItem }) {
  return (
    <div className={styles.resumeEntry}>
      <div className={`${styles.titleRow}`} style={{ marginBottom: "8px" }}>
        <div className={styles.title}>{data.title}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className={styles.employer}>{data.employer}</div>
          <div className={styles.location}>{data.location}</div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div className={styles.start}>{data.start}</div> to
            <div className={styles.end}>{data.end}</div>
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
      <ul className={styles.bulletPoints}>
        {data.bulletPoints.map((point, index) => {
          const bullet = (
            <BulletPoint
              key={index}
              text={point.text}
              highlights={point.highlights}
              emphasisDelay={700 + index * 100} // Slight delay stagger
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            />
          );
          return bullet;
        })}
      </ul>
    </div>
  );
}
