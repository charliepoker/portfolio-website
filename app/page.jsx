'use client'

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from "@/components/Hero/Hero";
import styles from "./page.module.css";
import MyTools from "@/components/MyTools/MyTools";
import Publications from "@/components/Publications/Publications";
import { Assets } from "@/lib/Assets";
import SayHello from "@/components/SayHello/SayHello";
import Preloader from "@/components/Preloader/Preloader";

gsap.registerPlugin(ScrollTrigger);

const articles = [
    { title: 'Solving Kubernetes Scheduling Challenges with Taints and Toleration', date: 'April 4th 2025', banner: Assets.banner, url: "/" },
    { title: 'A Deep Dive into Kubernetes Networking for Scalable Applications', date: 'April 5th 2025', banner: Assets.banner, url: "/" },
    { title: 'Managing Secrets in Kubernetes: Best Practices', date: 'April 6th 2025', banner: Assets.banner, url: "/" },
    { title: 'Optimizing Kubernetes Cluster Performance: Key Strategies', date: 'April 7th 2025', banner: Assets.banner, url: "/" },
];

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  const sectionRef = useRef(null);
  const listItemsRef = useRef([]);
  const statItemsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate each technical proficiency item
      gsap.from(listItemsRef.current, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animate stats (count up)
      statItemsRef.current.forEach((el) => {
        const endValue = parseInt(el.innerText);
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: endValue,
            duration: 3,
            ease: "power1.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Hero/>

      {/* TECHNICAL PROFICIENCY */}
      <div className={styles.tech} ref={sectionRef}>
        <div className={styles.techData}>
          <h3>Technical Proficiencies</h3>
          <ul>
            {[
              { num: "01", title: "NodeOps (Blockchain)", desc: "Deployment, management, and optimization of blockchain nodes to ensure high availability, security, and scalability in decentralized networks." },
              { num: "02", title: "Infrastructure as Code (IAC)", desc: "Managing and provisioning computing infrastructure through machine-readable configuration files instead of manual processes." },
              { num: "03", title: "CI/CD Pipelines", desc: "Automated processes that allow for the continuous integration, testing, and delivery of software changes to a production environment." },
              { num: "04", title: "Containerization", desc: "Software development and deployment approach that involves packaging applications and their dependencies into containers." },
            ].map((item, i) => (
              <li key={i} ref={(el) => (listItemsRef.current[i] = el)}>
                <div className={styles.techDataTitle}>
                  <span>{item.num}</span> <h4>{item.title}</h4>
                </div>
                <p>{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.techStats}>
          <ul>
            {[
              { value: 15, label: "PROJECTS COMPLETED" },
              { value: 27, label: "articles published" },
              { value: 207, label: "GITHUB CONTRIBUTIONS" },
            ].map((stat, i) => (
              <li key={i}>
                <span ref={(el) => (statItemsRef.current[i] = el)}>{stat.value}</span>
                <h4>{stat.label}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* TOOLS AND SOFTWARE */}
      <div>
        <MyTools/>
      </div>

      {/* LATEST PUBLICATIONS */}
      <div className={styles.publications}>
        <div><h3>Latest Publications</h3></div>
        <Publications articles={articles}/>
      </div>

      {/* SAY HELLO */}
      <SayHello/>

      {showPreloader && (
        <Preloader 
          text="{DEV.OBINNA}" 
        />
      )}
    </>
  );
}
