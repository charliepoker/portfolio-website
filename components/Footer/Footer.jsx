import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { Assets } from '@/lib/Assets';

function Footer() {
  return (
    <div className={styles.footer}>
        <div className={styles.socials}>
            <ul>
                <li><a href=""> LINKEDIN</a></li>
                <li><a href=""> GITHUB</a></li>
                <li><a href=""> X</a></li>
                <li><a href=""> INSTAGRAM</a></li>
            </ul>
        </div>
        <div className={styles.logo}>
            <Image src={Assets.footerLogo} alt='Logo' width='940' height='115'/>
        </div>
    </div>
  )
}

export default Footer