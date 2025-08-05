'use client'
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css'
import SkillsAccordion from '../SkillsAccordion/SkillsAccordion';
import SayHello from '../SayHello/SayHello';


const skillsData = [
  { label: "Blockchain Node Operations", content: "Manage and maintain blockchain nodes effectively." },
  { label: "Automation", content: "Streamline workflows using advanced automation tools." },
  { label: "Containerization", content: "Deploy apps in isolated, lightweight containers." },
  { label: "Cloud Infrastructure", content: "Design and scale infrastructure for the cloud." },
  { label: "CI/CD", content: "Implement continuous integration and deployment pipelines." },
  { label: "Monitoring & Debugging", content: "Monitor and troubleshoot complex systems." },
  { label: "Collaboration", content: "Work effectively in cross-functional teams." },
];

const employmentHistory = [
  { index: "2012 - 2013", label: "Junior Developer at XYZ", content: "Worked on front-end features and debugging." },
  { index: "2014 - 2016", label: "Software Engineer at ABC", content: "Led backend development projects." },
  { index: "2017 - 2020", label: "Team Lead at DEF Corp", content: "Managed a team of 6 developers." },
];

const educationHistory = [
  { 
    index: "2008 - 2012", 
    label: "B.Sc. Computer Science, University of Lagos", 
    content: "Focused on software development, algorithms, and data structures. Graduated with honors." 
  },
  { 
    index: "2013 - 2014", 
    label: "M.Sc. Information Technology, University of Ibadan", 
    content: "Specialized in cloud computing and advanced database systems." 
  },
  { 
    index: "2015 - 2016", 
    label: "Postgraduate Diploma in Project Management, Lagos Business School", 
    content: "Learned project management methodologies and leadership skills." 
  },
];

function ResumeDetails() {
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const handleScroll = () => {
      let current = "intro"; // default to first
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) { // 100px from the top (adjust for your header)
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <ul>
            <li className={activeSection === "intro" ? styles.active : ""}>
              <a href="#intro">Introduction</a>
            </li>
            <li className={activeSection === "skills" ? styles.active : ""}>
              <a href="#skills">Skills</a>
            </li>
            <li className={activeSection === "employment" ? styles.active : ""}>
              <a href="#employment">Employment History</a>
            </li>
            <li className={activeSection === "education" ? styles.active : ""}>
              <a href="#education">Education and Certifications</a>
            </li>
          </ul>
        </div>

        <div className={styles.main}>
          <section
            id='intro'
            className={`${styles.card} ${activeSection === "intro" ? styles.activeCard : ""}`}
            >
            <h3>Obinna Iheanacho</h3>
            <p>A seasoned DevOps Engineer specializing in blockchain infrastructure, cloud engineering, and Web3 node operations. With extensive experience managing large-scale systems on GCP and AWS, he has collaborated with industry leaders like Supra Oracles, Nethermind, and Alphaday.</p>
            <p>He also leads Sunset Digital Studios, a platform offering free digital assets, and is building the NodeOps Syndicate to bridge DevOps and blockchain expertise.</p>
            </section>

            <section
            id='skills'
            className={`${styles.card} ${activeSection === "skills" ? styles.activeCard : ""}`}
            >
            <h3>Skills</h3>
            <SkillsAccordion items={skillsData} />
            </section>

            <section
            id='employment'
            className={`${styles.card} ${activeSection === "employment" ? styles.activeCard : ""}`}
            >
            <h3>Employment History</h3>
            <SkillsAccordion items={employmentHistory} />
            </section>

            <section
            id='education'
            className={`${styles.card} ${activeSection === "education" ? styles.activeCard : ""}`}
            >
            <h3>Education and Certification</h3>
            <SkillsAccordion items={educationHistory} />
            </section>

        </div>
      </div>
      <SayHello />
    </>
  );
}

export default ResumeDetails;