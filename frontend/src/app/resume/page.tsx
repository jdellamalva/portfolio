import type { Metadata } from "next";

import NavBar from "@/components/NavBar";
import Resume from "@/components/Resume/Resume";

export const metadata: Metadata = {
  title: "JDM | Resume",
  description: "Joseph D. Della Malva's resume",
};

export default function ResumePage() {
  return (
    <div className="container">
      <NavBar />
      <Resume />
    </div>
  );
}
