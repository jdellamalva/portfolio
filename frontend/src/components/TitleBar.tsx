"use client";

import React, { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";

import { TitleBarProps } from "@/types";

import styles from "./TitleBar.module.css";

export default function TitleBar({
  name,
  headline,
  location,
  email,
  phone,
  website,
}: TitleBarProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 616);
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.titleBar}>
      <div className={styles.nameContainer}>
        <h1 className={styles.name}>{name}</h1>
        <h2 className={styles.headline}>{headline}</h2>
      </div>
      <ul className={styles.details}>
        <li className={styles.location}>{location}</li>
        <li className={styles.email}>{email}</li>
        <li className={styles.email}>{phone}</li>
        <li className={styles.website}>
          <a
            href={website.startsWith("http") ? website : `https://${website}`}
            target="_blank"
            rel="noreferrer"
          >
            {isSmallScreen ? <FaLinkedin size={24} /> : website}
          </a>
        </li>
      </ul>
    </div>
  );
}
