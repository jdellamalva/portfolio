"use client";

import React from "react";
import { FaLinkedin } from "react-icons/fa";

import styles from "./TitleBar.module.css";
import { TitleBarProps } from ".";

export default function TitleBar({
  name,
  headline,
  location,
  email,
  phone,
  website,
}: TitleBarProps) {
  return (
    <div className={styles.titleBar}>
      <div className={styles.nameContainer}>
        <h1 className={styles.name}>{name}</h1>
        <h2 className={styles.headline}>{headline}</h2>
      </div>
      <ul className={styles.details}>
        <li className={styles.location}>{location}</li>
        <li className={styles.email}>{email}</li>
        <li className={styles.phone}>{phone}</li>
        <li className={styles.website}>
          <a
            href={website.startsWith("http") ? website : `https://${website}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.websiteText}>{website}</span>
            <FaLinkedin size={24} className={styles.websiteIcon} />
          </a>
        </li>
      </ul>
    </div>
  );
}
