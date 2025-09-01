'use client'
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './styles.module.css';
import { getNavLinks, NavLink } from '../NavLinks';
import Link from 'next/link';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState(NavLink); // Start with default
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const dotRef = useRef(null);

  // Initial setup - hide menu on mount
  useEffect(() => {
    gsap.set(menuRef.current, {
      opacity: 0,
      scale: 0,
      transformOrigin: "top right",
      visibility: "hidden"
    });
    gsap.set(linksRef.current, { opacity: 0, x: 30 });
  }, []);

  // Fetch nav links with blog count
  useEffect(() => {
    const fetchNavLinks = async () => {
      try {
        const updatedNavLinks = await getNavLinks();
        setNavLinks(updatedNavLinks);
      } catch (error) {
        console.error('Error fetching nav links:', error);
        // Keep using the default NavLink array
      }
    };

    fetchNavLinks();
  }, []);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      // Open menu animation
      gsap.set(menuRef.current, { visibility: "visible" });
      gsap.to(menuRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(linksRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.1,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0
      });
      // Dot pulse animation
      gsap.to(dotRef.current, {
        scale: 1.3,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    } else {
      // Close menu animation
      gsap.to(linksRef.current, {
        opacity: 0,
        x: 30,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.in"
      });
      gsap.to(menuRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.in",
        delay: 0.1,
        onComplete: () => {
          gsap.set(menuRef.current, { visibility: "hidden" });
        }
      });
    }
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <Link href='/'>
          <span>
            <span style={{ color: 'var(--green)' }}>{'{ '}</span>
            DEV.OBINNA
            <span style={{ color: 'var(--green)' }}>{' }'}</span>
          </span>
        </Link>
      </div>
     
      <div className={styles.menu} onClick={toggleMenu}>
        <span ref={dotRef}></span>
        {isMenuOpen ? 'Close' : 'Menu'}
      </div>
     
      <div className={styles.links} ref={menuRef}>
        <ul>
          {navLinks.map((link, i) => (
            <li
              ref={el => linksRef.current[i] = el}
              className={link.colored ? `${styles.link} ${styles.colored}` : styles.link}
              key={i}
              onClick={toggleMenu} // Close menu when link is clicked
            >
              <Link href={link.url}>
                {link.label}
                {link.count ? <span>{link.count}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;