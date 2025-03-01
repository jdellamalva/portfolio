import type { Metadata } from "next";

import NavBar from "@/components/NavBar";
import DotGrid from "@/components/About/DotGrid/DotGrid";

export const metadata: Metadata = {
  title: "JDM | About",
  description: "About Joseph D. Della Malva",
};

export default function AboutPage() {
  return <DotGrid />;
}
