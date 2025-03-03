import type { Metadata } from "next";

import CanvasMapSquare from "@/components/About/CanvasMapSquare";
import DotGrid from "@/components/About/DotGrid";

import MapDots from "@/components/About/MapDots";

export const metadata: Metadata = {
  title: "JDM | About",
  description: "About Joseph D. Della Malva",
};

export default function AboutPage() {
  return <MapDots />;
}
