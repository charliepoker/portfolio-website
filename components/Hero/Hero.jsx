import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { Assets } from '@/lib/Assets';
import Link from 'next/link';
import { GoArrowUpRight } from "react-icons/go";

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={ `${styles.card} ${styles.first}`}>
        <h1>OBINNA<br/> IHEANACHO</h1>

          <ul className={styles.socials}>
            <li><a href="/">LINKEDIN   <GoArrowUpRight color='#62EFA0'/></a></li>
            <li><a href="/">GITHUB  <GoArrowUpRight color='#62EFA0'/></a></li>
            <li><a href="/">HASNODE  <GoArrowUpRight color='#62EFA0'/></a></li>
          </ul>
      </div>
      <div className={ `${styles.card} ${styles.second}`}>
        <Image src={Assets.charlie} alt='Obinna Photo' height='680' width='518'/>
      </div>
      <div className={`${styles.card} ${styles.third}`}>
        <h2>DevOps & NodeOps Engineer</h2>
        <p>Deployment, management, and optimization of blockchain nodes to ensure high availability, security, and scalability in decentralized networks.</p>
        <Link href='/'> <span>
      <span style={{ color: '#69FFAA' }}>{'{'}</span>
      READ MORE
      <span style={{ color: '#69FFAA' }}>{'}'}</span>
    </span></Link>

     <ul className={styles.socialsBottom}>
            <li><a href="/">LINKEDIN   <GoArrowUpRight  color='#62EFA0'/></a></li>
            <li><a href="/">GITHUB  <GoArrowUpRight  color='#62EFA0'/></a></li>
            <li><a href="/">HASNODE  <GoArrowUpRight  color='#62EFA0'/></a></li>
          </ul>
      </div>
    </div>
  )
}

export default Hero