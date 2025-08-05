"use client";

import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { NavLink } from '../NavLinks';
import Link from 'next/link';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <div className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <Link href='/'>
          <span>
            <span style={{ color: '#69FFAA' }}>{'{'}</span>
            DEV.OBINNA
            <span style={{ color: '#69FFAA' }}>{'}'}</span>
          </span>
        </Link>
      </div>

      <div className={styles.links}>
        <ul>
          {NavLink.map((link, i)=>(
            <li 
              className={ link.colored ? `${styles.link} ${styles.colored}` : styles.link } 
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
