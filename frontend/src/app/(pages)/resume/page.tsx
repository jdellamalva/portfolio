import type { Metadata } from "next";

import Resume from "@/app/components/Resume/Resume";

export const metadata: Metadata = {
  title: "JDM | Resume",
  description: "Joseph D. Della Malva's resume",
};

export default function ResumePage() {
  return (
    <div className="container">
      <Resume />
    </div>
  );
}
