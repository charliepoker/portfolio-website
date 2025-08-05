import React from 'react';
<<<<<<< HEAD
import styles from './styles.module.css'

function Blog() {
  return (
    
    <>
    <div className={styles.hero}>
        <h1>PUBLICATIONS</h1>
    </div>
    
    </>
=======
import styles from './styles.module.css';
import { Assets } from '@/lib/Assets';
import Publications from '@/components/Publications/Publications';
import SayHello from '@/components/SayHello/SayHello';
import Preloader from '@/components/Preloader/Preloader';

const articles = [
    {
        title: 'Solving Kubernetes Scheduling Challenges with Taints and Toleration',
        date: 'April 4th 2025',
        banner: Assets.banner,
        url: "/"
    },
    {
        title: 'A Deep Dive into Kubernetes Networking for Scalable Applications',
        date: 'April 5th 2025',
        banner: Assets.banner,
        url: "/"
    },
    {
        title: 'Managing Secrets in Kubernetes: Best Practices',
        date: 'April 6th 2025',
        banner: Assets.banner,
        url: "/"
    },
    {
        title: 'Optimizing Kubernetes Cluster Performance: Key Strategies',
        date: 'April 7th 2025',
        banner: Assets.banner,
        url: "/"
    },
    {
        title: 'Using Helm Charts for Kubernetes Deployments Made Easy',
        date: 'April 8th 2025',
        banner: Assets.banner,
        url: "/"
    },
    {
        title: 'Kubernetes Monitoring with Prometheus and Grafana',
        date: 'April 9th 2025',
        banner: Assets.banner,
        url: "/"
    },
    {
        title: 'Building Resilient Microservices on Kubernetes',
        date: 'April 10th 2025',
        banner: Assets.banner,
        url: "/"
    },
    {
        title: 'Kubernetes Security Essentials: Protecting Your Cluster',
        date: 'April 11th 2025',
        banner: Assets.banner,
        url: "/"
    },
    {
        title: 'Deploying Stateful Applications in Kubernetes the Right Way',
        date: 'April 12th 2025',
        banner: Assets.banner,
        url: "/"
    },
    {
        title: 'Scaling Kubernetes Workloads Efficiently: What You Need to Know',
        date: 'April 13th 2025',
        banner: Assets.banner,
        url: "/"
    },
];


function Blog() {
  return (
    <>
    <div className={styles.main}>
        <h1>PUBLICATIONS</h1>
        <div className={styles.posts}>
            <Publications articles={articles}/>
        </div>

    </div>
        <SayHello/>

        <Preloader  text="{DEV.OBINNA.BLOG}" />
        </>
>>>>>>> dev-leslie
  )
}

export default Blog