import React from 'react';
import styles from './styles.module.css'
import { Assets } from '@/lib/Assets';
import Image from 'next/image';


function Publications({articles}) {
  return (
    <div className={styles.pubCtn}>

        {
            articles.map((item, i)=>(
            <a href={item.url} key={i} className={styles.pub}>
                <div className={styles.banner}><Image src={item.banner} alt='Banner' height='160' width='160'/></div>
                <div className={styles.content}>
                    <h4>{item.title}</h4>
                    <p>{item.date}</p>
                </div>
            </a>
            ))
        }
      
    </div>
  )
}

export default Publications