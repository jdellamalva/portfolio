"use client";

import { useRef, useEffect } from "react";
import styles from "./Experience.module.css";
import BulletPoint from "../BulletPoint";
import type { ExperienceProps } from ".";

export default function Experience({ data }: { data: ExperienceProps }) {
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = 0;
    }
  }, [data]);

  return (
    <div className={styles.resumeEntry}>
      <div className={`${styles.titleRow}`}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.jobInfoContainer}>
          <div className={styles.employer}>{data.employer}</div>
          <div className={styles.location}>{data.location}</div>
          <div className={styles.dateContainer}>
            <div
              className={styles.start}
              data-full={data.start}
              data-short={`${data.start.slice(0, 3)} ${data.start.slice(-4)}`}
            ></div>
            to
            <div
              className={styles.end}
              data-full={data.end}
              data-short={`${data.end.slice(0, 3)} ${data.end.slice(-4)}`}
            ></div>
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.scrollable}>
        <ul className={styles.bulletPoints}>
          {data.bulletPoints.map((point, index) => {
            const bullet = (
              <BulletPoint
                key={`${data.id}-${index}`}
                text={point.text}
                highlights={point.highlights}
                emphasisDelay={700 + index * 100}
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              />
            );
            return bullet;
          })}
        </ul>
      </div>
    </div>
  );
}
