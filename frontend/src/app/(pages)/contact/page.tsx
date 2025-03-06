import type { Metadata } from "next";

import Contact from "@/app/components/Contact/Contact";

export const metadata: Metadata = {
  title: "JDM | Contact",
  description: "How to contact me",
};

export default function ContactPage() {
  return (
    <div className="container">
      <h1>Hey There</h1>
      <p>
        The contact component contacts OpenAI and returns a recipe for
        guacamole. But that costs me money which is why I'm showing you this
        instead. For now...
      </p>
    </div>
  );
}
