'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './styles.module.css';
import Image from 'next/image';
import { Assets } from '@/lib/Assets';
import Link from 'next/link';
import { GoArrowUpRight } from "react-icons/go";

function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const roleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const socialsTopRef = useRef([]);
  const socialsBottomRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current], {
        opacity: 0,
        y: 30
      });
      // gsap.set([descriptionRef.current, buttonRef.current], {
      //   opacity: 0,
      // });

      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.95,
        // y: 20
      });

      gsap.set([...socialsTopRef.current, ...socialsBottomRef.current], {
        opacity: 0,
        x: -20
      });

      // Create timeline
      const tl = gsap.timeline();

      // Title animation with letter reveal effect
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        delay: 1,
        duration: .6,
        ease: "power3.out"
      })
      
      // Image animation
      .to(imageRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: .75,
        ease: "power2.out"
      }, "-=0.5")

      // Top social links with stagger
      .to(socialsTopRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out"
      }, "")

      // // Role title
      // .to(roleRef.current, {
      //   opacity: 1,
      //   y: 0,
      //   duration: 0.8,
      //   ease: "power3.out"
      // }, "-=0.4")




      // Bottom social links
      .to(socialsBottomRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Add refs to arrays for social links
  const addToSocialsTop = (el) => {
    if (el && !socialsTopRef.current.includes(el)) {
      socialsTopRef.current.push(el);
    }
  };

  const addToSocialsBottom = (el) => {
    if (el && !socialsBottomRef.current.includes(el)) {
      socialsBottomRef.current.push(el);
    }
  };

  return (
    <div className={styles.hero} ref={heroRef}>
      <div className={`${styles.card} ${styles.first}`}>
        <h1 ref={titleRef}>
          OBINNA<br/> IHEANACHO
        </h1>
        <ul className={styles.socials}>
          <li ref={addToSocialsTop}>
            <a href="/">LINKEDIN <GoArrowUpRight color='#62EFA0'/></a>
          </li>
          <li ref={addToSocialsTop}>
            <a href="/">GITHUB <GoArrowUpRight color='#62EFA0'/></a>
          </li>
          <li ref={addToSocialsTop}>
            <a href="/">HASNODE <GoArrowUpRight color='#62EFA0'/></a>
          </li>
        </ul>
      </div>
      
      <div className={`${styles.card} ${styles.second}`}>
        <Image 
          ref={imageRef}
          src={Assets.charlie} 
          alt='Obinna Photo' 
          height='680' 
          width='518'
        />
      </div>
      
      <div className={`${styles.card} ${styles.third}`}>
        <h2 ref={roleRef}>DevOps & NodeOps Engineer</h2>
        <p ref={descriptionRef}>
          Deployment, management, and optimization of blockchain nodes to ensure high availability, security, and scalability in decentralized networks.
        </p>
        <Link href='/' ref={buttonRef}>
          <span>
            <span style={{ color: '#69FFAA' }}>{'{'}</span>
            READ MORE
            <span style={{ color: '#69FFAA' }}>{'}'}</span>
          </span>
        </Link>
        <ul className={styles.socialsBottom}>
          <li ref={addToSocialsBottom}>
            <a href="/">LINKEDIN <GoArrowUpRight color='#62EFA0'/></a>
          </li>
          <li ref={addToSocialsBottom}>
            <a href="/">GITHUB <GoArrowUpRight color='#62EFA0'/></a>
          </li>
          <li ref={addToSocialsBottom}>
            <a href="/">HASNODE <GoArrowUpRight color='#62EFA0'/></a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Hero