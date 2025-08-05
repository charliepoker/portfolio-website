import React from 'react';
import styles from './styles.module.css'
import { GoArrowUpRight } from "react-icons/go";


function Socials() {
  return (
    <div>
                 <ul className={styles.socials}>
            <li><a href="/">LINKEDIN   <GoArrowUpRight color='#62EFA0'/></a></li>
            <li><a href="/">GITHUB  <GoArrowUpRight color='#62EFA0'/></a></li>
            <li><a href="/">HASNODE  <GoArrowUpRight color='#62EFA0'/></a></li>
          </ul>
    </div>
  )
}

export default Socials