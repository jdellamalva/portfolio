"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./NavBar.module.css";

export default function NavBar() {
  const pathname = usePathname(); // Get the current path for active styling

  return (
    <nav className={styles.nav}>
      <ul>
        <li className={pathname === "/" ? "active" : ""}>
          <Link href="/">Home</Link>
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