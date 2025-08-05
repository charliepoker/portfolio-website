import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { Assets } from '@/lib/Assets';
import Link from 'next/link';
import { GoArrowUpRight } from "react-icons/go";
import ResumeDetails from '@/components/ResumeDetails/ResumeDetails';
<<<<<<< HEAD
=======
import Preloader from '@/components/Preloader/Preloader';
>>>>>>> dev-leslie

function page() {
  return (
    <>
        <div className={styles.hero}>
      <div className={ `${styles.card} ${styles.first}`}>
        <h1>RESUME</h1>
      </div>
      <div className={ `${styles.card} ${styles.second}`}>
        <Image src={Assets.charlie} alt='Obinna Photo' fill/>
      </div>
      <div className={`${styles.card} ${styles.third}`}>
                  <ul className={styles.socials}>
            <li><a href="/">LINKEDIN   <GoArrowUpRight color='#62EFA0'/></a></li>
            <li><a href="/">GITHUB  <GoArrowUpRight color='#62EFA0'/></a></li>
            <li><a href="/">HASNODE  <GoArrowUpRight color='#62EFA0'/></a></li>
          </ul>
      </div>
    </div>

    <ResumeDetails/>
<<<<<<< HEAD
=======

     <Preloader text="{DEV.OBINNA.RESUME}" />
>>>>>>> dev-leslie
    </>

  )
}

export default page