// components/ResumeDetails/ResumeDetails.js
'use client'
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css'
import SkillsAccordion from '../SkillsAccordion/SkillsAccordion';
import SayHello from '../SayHello/SayHello';
import { PortableText } from '@portabletext/react';

function ResumeDetails({ resumeData }) {
  const [activeSection, setActiveSection] = useState("intro");

  // Fallback data if resumeData is not available
  const defaultData = {
    personalInfo: {
      fullName: "Obinna Iheanacho",
      introduction: []
    },
    navigationSections: [
      { id: "intro", label: "Introduction", order: 1 },
      { id: "skills", label: "Skills", order: 2 },
      { id: "employment", label: "Employment History", order: 3 },
      { id: "education", label: "Education and Certifications", order: 4 }
    ],
    skills: [],
    employmentHistory: [],
    education: []
  };

  const data = resumeData || defaultData;

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const handleScroll = () => {
      let current = data.navigationSections[0]?.id || "intro";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data.navigationSections]);

  // Custom components for PortableText
  const portableTextComponents = {
    block: {
      normal: ({ children }) => <p>{children}</p>,
      h4: ({ children }) => <h4 className="font-semibold mt-4 mb-2">{children}</h4>,
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc ml-4 space-y-1">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal ml-4 space-y-1">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
    },
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <ul>
            {data.navigationSections.map((section) => (
              <li key={section.id} className={activeSection === section.id ? styles.active : ""}>
                <a href={`#${section.id}`}>{section.label}</a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.main}>
          <section 
            id='intro' 
            className={`${styles.card} ${activeSection === "intro" ? styles.activeCard : ""}`}
          >
            <h3>{data.personalInfo.fullName}</h3>
            {data.personalInfo.introduction && (
              <div className="prose">
                <PortableText 
                  value={data.personalInfo.introduction} 
                  components={portableTextComponents}
                />
              </div>
            )}
          </section>

          <section 
            id='skills' 
            className={`${styles.card} ${activeSection === "skills" ? styles.activeCard : ""}`}
          >
            <h3>Skills</h3>
            <SkillsAccordion items={data.skills} />
          </section>

          <section 
            id='employment' 
            className={`${styles.card} ${activeSection === "employment" ? styles.activeCard : ""}`}
          >
            <h3>Employment History</h3>
            <SkillsAccordion 
              items={data.employmentHistory} 
              isRichContent={true}
              portableTextComponents={portableTextComponents}
            />
          </section>

          <section 
            id='education' 
            className={`${styles.card} ${activeSection === "education" ? styles.activeCard : ""}`}
          >
            <h3>Education and Certification</h3>
            <SkillsAccordion items={data.education} />
          </section>
        </div>
      </div>
      <SayHello />
    </>
  );
}

export default ResumeDetails;