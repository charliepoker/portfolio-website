// components/SkillsAccordion/SkillsAccordion.js
"use client";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { PortableText } from '@portabletext/react';
import styles from "./styles.module.css";

export default function SkillsAccordion({ 
  title = "Accordion", 
  items = [], 
  isRichContent = false,
  portableTextComponents 
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.card}>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li 
            key={index} 
            className={`${styles.item} ${openIndex === index ? styles.active : ""}`}
            onClick={() => toggleItem(index)}
          >
            <div className={styles.itemHeader}>
              <span className={styles.index}>
                {item.index ?? String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.skill}>{item.label}</span>
              <IoAddCircleOutline className={styles.icon} />
            </div>
            {openIndex === index && (
              <div className={styles.content}>
                {isRichContent && Array.isArray(item.content) ? (
                  <div className="prose">
                    <PortableText 
                      value={item.content} 
                      components={portableTextComponents}
                    />
                  </div>
                ) : (
                  <p>{item.content}</p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}