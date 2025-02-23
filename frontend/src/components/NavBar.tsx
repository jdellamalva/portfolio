"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

import styles from "./NavBar.module.css";

export default function NavBar() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname(); // Get the current path for active styling

  return (
    <nav ref={navRef} className={styles.nav}>
      <ul>
        <li className={pathname === "/resume" ? "active" : ""}>
          <Link href="/resume">Resume</Link>
        </li>
        <li className={pathname === "/about" ? "active" : ""}>
          <Link href="/about">About</Link>
        </li>
        <li className={pathname === "/projects" ? "active" : ""}>
          <Link href="/projects">Projects</Link>
        </li>
        <li className={pathname === "/contact" ? "active" : ""}>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
