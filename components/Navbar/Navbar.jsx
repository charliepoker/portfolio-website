import React from 'react';
import styles from './styles.module.css';
import DesktopNav from './DesktopNav/DesktopNav';
import MobileNav from './MobileNav/MobileNav'


function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.desktopNav}>
        <DesktopNav/>
      </div>
      <div className={styles.mobileNav}>
        <MobileNav/>
      </div>
    </div>
  )
}

export default Navbar