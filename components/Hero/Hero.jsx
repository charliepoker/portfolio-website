'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './styles.module.css';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import Link from 'next/link';
import { GoArrowUpRight } from "react-icons/go";

function Hero({ heroData }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const roleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const socialsTopRef = useRef([]);
  const socialsBottomRef = useRef([]);

  useEffect(() => {
    if (!heroData) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current], {
        opacity: 0,
        y: 30
      });

      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.95,
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
  }, [heroData]);

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

  if (!heroData) {
    return <div>Loading hero data...</div>;
  }

  const {
    firstName,
    lastName,
    role,
    description,
    heroImage,
    cta,
    socialLinks
  } = heroData;

  return (
    <div className={styles.hero} ref={heroRef}>
      <div className={`${styles.card} ${styles.first}`}>
        <h1 ref={titleRef}>
          {firstName?.toUpperCase()}<br/> {lastName?.toUpperCase()}
        </h1>
        <ul className={styles.socials}>
          {socialLinks?.slice(0, 3).map((social, index) => (
            <li key={index} ref={addToSocialsTop}>
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                {social.platform.toUpperCase()} <GoArrowUpRight color='var(--green)'/>
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      <div className={`${styles.card} ${styles.second}`}>
        {heroImage && (
          <Image 
            ref={imageRef}
            src={urlFor(heroImage).width(518).height(680).url()} 
            alt={`${firstName} ${lastName} Photo`} 
            height='680' 
            width='518'
          />
        )}
      </div>
      
      <div className={`${styles.card} ${styles.third}`}>
        <h2 ref={roleRef}>{role}</h2>
        <p ref={descriptionRef}>
          {description}
        </p>
        {cta && (
          <Link href={cta.url} ref={buttonRef}>
            <span>
              <span style={{ color: 'var(--green' }}>{'{'}</span>
              {cta.text.toUpperCase()}
              <span style={{ color: 'var(--green' }}>{'}'}</span>
            </span>
          </Link>
        )}
        <ul className={styles.socialsBottom}>
          {socialLinks?.slice(0, 3).map((social, index) => (
            <li key={index} ref={addToSocialsBottom}>
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                {social.platform.toUpperCase()} <GoArrowUpRight color='var(--green)'/>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Hero