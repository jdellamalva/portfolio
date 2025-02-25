"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ul>
        <li className={pathname === "/resume" ? styles.active : ""}>
          <Link href="/resume">Resume</Link>
        </li>
        <li className={pathname === "/about" ? styles.active : ""}>
          <Link href="/about">About</Link>
        </li>
        <li className={pathname === "/projects" ? styles.active : ""}>
          <Link href="/projects">Projects</Link>
        </li>
        <li className={pathname === "/contact" ? styles.active : ""}>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
