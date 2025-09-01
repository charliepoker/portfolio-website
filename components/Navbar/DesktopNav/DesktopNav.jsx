"use client";
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { getNavLinks, NavLink } from '../NavLinks';
import Link from 'next/link';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [navLinks, setNavLinks] = useState(NavLink); // Start with default

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch the updated NavLinks with blog count
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

  return (
    <div className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <Link href='/'>
          <span>
            <span style={{ color: 'var(--green)' }}>{'{'}</span>
            DEV.OBINNA
            <span style={{ color: 'var(--green)' }}>{'}'}</span>
          </span>
        </Link>
      </div>
      <div className={styles.links}>
        <ul>
          {navLinks.map((link, i) => (
            <li
              className={link.colored ? `${styles.link} ${styles.colored}` : styles.link}
              key={i}
            >
              <Link href={link.url}>
                {link.label}{link.count ? <span>{link.count}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Navbar;