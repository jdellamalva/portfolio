import Image from "next/image";
import styles from "./page.module.css";

const data = {
  summary: "IT & education professional with a background in team management, software solutions, business operations and curriculum design. Skilled in Agile project management, full-stack development, and fostering communication to achieve success in challenging environments. Recognized for leadership, adaptability, attention to detail and drive.",
  experience: [
    {
      title: "Business Analyst",
      employer: "Applied Imagination",
      location: "Norcross, GA (Remote)",
      start: "September 2021",
      end: "January 2025",
      bulletPoints: [
        "Contributed over 40 projects as Senior Business Analyst, UI/UX Designer & QA, driving $3M+ in revenue",
        "Supported a range of clients, from startups to globally recognized brands, spanning industries such as manufacturing, e-commerce, education, HR, engineering, research & social media",
        "Translated client requirements into full design systems, componentized wireframes, and interactive prototypes using Figma, improving stakeholder alignment and reducing development iteration time",
        "Leveraged Waterfall & Agile (Scrum) methodologies and tools like Jira, Confluence, and Asana to prioritize stakeholder needs effectively, groom backlogs, bridge gaps, organize sprints, and resolve blockers",
        "Collaborated with cross-functional teams at all stages in the Software Development Life Cycle (SDLC) to deliver custom mobile and web applications, WordPress sites, and legacy software support",
        "Defined and executed comprehensive test cases and led User Acceptance Testing workshops",
        "Earned consistent commendations from clients and colleagues for exceptional attention to detail, strong interpersonal skills, and proactive problem-solving, even in challenging project environments"
      ]
    }
  ]
}

export default function Home() {
  return (
    <div className={styles.page}>
      <div>My Resume</div>
      <div className={styles.title}>{ data.experience[0].title }</div>
      <div className={styles.row} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <div className={styles.employer}>{ data.experience[0].employer }</div>
        <div style={{ display: "flex", gap: "8px" }}>
          <div className={styles.start}>{ data.experience[0].start }</div> to
          <div className={styles.end}>{ data.experience[0].end }</div>
        </div>
        
      </div>
      <ul className={styles.bulletPoints}>
        {data.experience[0].bulletPoints.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
