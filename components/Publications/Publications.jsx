"use client";

<<<<<<< HEAD
const articles = [
    {
        title: 'Solving Kubernetes Scheduling Challenges with Taints and Toleration',
        date: 'April 4th 2025',
        banner: Assets.banner
    },
    {
        title: 'Solving Kubernetes Scheduling Challenges with Taints and Tolerations',
        date: 'April 4th 2025',
        banner: Assets.banner
    },
    {
        title: 'Solving Kubernetes Scheduling Challenges with Taints and Tolerations',
        date: 'April 4th 2025',
        banner: Assets.banner
    },
    {
        title: 'Solving Kubernetes Scheduling Challenges with Taints and Tolerations',
        date: 'April 4th 2025',
        banner: Assets.banner
    },
=======
import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { Assets } from "@/lib/Assets";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
>>>>>>> dev-leslie

gsap.registerPlugin(ScrollTrigger);

function Publications({ articles, isBlogPage }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.pub}`,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: isBlogPage
            ? false // On blog page → animate immediately
            : {
                trigger: containerRef.current,
                start: "top 80%",
              },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isBlogPage]);

  return (
    <div className={styles.pubCtn} ref={containerRef}>
      {articles.map((item, i) => (
        <a href={item.url} key={i} className={styles.pub}>
          <div className={styles.banner}>
            <Image src={item.banner} alt="Banner" height={160} width={160} />
          </div>
          <div className={styles.content}>
            <h4>{item.title}</h4>
            <p>{item.date}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default Publications;
