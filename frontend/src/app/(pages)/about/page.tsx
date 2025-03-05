import type { Metadata } from "next";

import MapDots from "@/components/About/MapDots";

export const metadata: Metadata = {
  title: "JDM | About",
  description: "About Joseph D. Della Malva",
};

export default function AboutPage() {
  return <MapDots />;
}
