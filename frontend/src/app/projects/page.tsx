import type { Metadata } from "next";

import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "JDM | Projects",
  description: "My Projects",
};

export default function ProjectsPage() {
  return (
    <div className="container">
      <NavBar />
      <h1>Projects Page</h1>
    </div>
  );
}
