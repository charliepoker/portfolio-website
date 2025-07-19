import React from 'react';
import styles from './styles.module.css'
import { Assets } from '@/lib/Assets';
import Image from 'next/image';

const articles = [
    {
        title: 'Solving Kubernetes Scheduling Challenges with Taints and Toleration',
        date: 'April 4th 2025',
        banner: Assets.banner
    },
    {
        title: 'Solving Kubernetes Scheduling Challenges with Taints and Tolerations',
        date: 'April 4th 2025',
        banner: Assets.banner
    },
    {
        title: 'Solving Kubernetes Scheduling Challenges with Taints and Tolerations',
        date: 'April 4th 2025',
        banner: Assets.banner
    },
    {
        title: 'Solving Kubernetes Scheduling Challenges with Taints and Tolerations',
        date: 'April 4th 2025',
        banner: Assets.banner
    },

]

function Publications() {
  return (
    <div className={styles.pubCtn}>

        {
            articles.map((item, i)=>(
            <div key={i} className={styles.pub}>
                <div className={styles.banner}><Image src={item.banner} alt='Banner' height='160' width='160'/></div>
                <div className={styles.content}>
                    <h4>{item.title}</h4>
                    <p>{item.date}</p>
                </div>
            </div>
            ))
        }
      
    </div>
  )
}

export default Publications