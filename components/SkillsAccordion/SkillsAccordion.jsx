"use client";

import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import styles from "./styles.module.css";

export default function Accordion({ title = "Accordion", items = [] }) {
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
              {/* If item.index exists, use it; otherwise, use auto-numbering */}
              <span className={styles.index}>
                {item.index ?? String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.skill}>{item.label}</span>
              <IoAddCircleOutline className={styles.icon} />
            </div>
            {openIndex === index && (
              <div className={styles.content}>
                <p>{item.content}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
