"use client";

import { useState, useEffect } from "react";

import styles from "./BulletPoint.module.css";
import type { BulletPointProps } from ".";

export default function BulletPoint({
  text,
  highlights,
  emphasisDelay = 500,
  style,
}: BulletPointProps) {
  const [emphasized, setEmphasized] = useState(false);

  // ✅ Apply emphasis after the delay
  useEffect(() => {
    const timer = setTimeout(() => setEmphasized(true), emphasisDelay);
    return () => clearTimeout(timer);
  }, [emphasisDelay]);

  // ✅ Convert ALL text (regular & highlighted) into spans for styling
  const formattedText = text.split(/(\{\d+\})/g).map((part, i) => {
    const match = part.match(/\{(\d+)\}/);
    if (match) {
      const highlightIndex = parseInt(match[1], 10);
      return (
        <span
          key={i}
          className={emphasized ? styles.emphasize : ""}
          style={{ "--i": i } as React.CSSProperties}
        >
          {highlights[highlightIndex]}
        </span>
      );
    }
    return <span key={`${text}-plain-${i}`}>{part}</span>; // ✅ Wrap regular text too
  });

  return (
    <li className={styles.bulletPoint} style={style}>
      {formattedText}
    </li>
  );
}
