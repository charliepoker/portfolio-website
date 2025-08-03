import React from 'react';
import styles from './styles.module.css'

function SayHello() {
  return (
      <div className={styles.hello}>
        <p>Say Hello 👋</p>
        <a href="mailto:hello@iheanacho.io">hello@iheanacho.io</a>
      </div>
  )
}

export default SayHello