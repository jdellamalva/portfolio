import styles from "./page.module.css";
import React from "react";

export const metadata = {
  title: "JDM | Home",
  description: "Home page for Joseph D. Della Malva's portfolio site",
};

export default function Home() {
  const numPairs = 6;
  return (
    <div
      className={styles.container}
      style={{ "--num-pairs": numPairs } as React.CSSProperties}
    >
      <div className={styles.shapePairs}>
        {[...Array(numPairs)].map((_, index) => (
          <div
            key={index}
            className={styles.shapePair}
            style={{ "--index": index } as React.CSSProperties}
          >
            <div className={styles.shape}></div>
            <div className={styles.shape}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
