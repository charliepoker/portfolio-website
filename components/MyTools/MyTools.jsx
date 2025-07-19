'use client'
import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { Assets } from '@/lib/Assets';

const firstSliderTools = [
  Assets.terraform,
  Assets.Ansible,
  Assets.AWS,
  Assets.Bitbucket,
  Assets.Circleci,
  Assets.Docker
];

const secondSliderTools = [
  Assets.Gitlab,
  Assets.Grafana,
  Assets.Jenkins,
  Assets.Kubernetes,
  Assets.python,
  Assets.Github
];

function MyTools() {
  return (
    <div className={styles.toolsCtn}>

      <div className={styles.toolsSliderCtn}>

        <h3>Tools and Software</h3>


      {/* First Marquee */}
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          {firstSliderTools.map((tool, index) => (
            <div className={styles.tool} key={`first-${index}`}>
              <Image src={tool} height={55} width={167} alt='Logo' />
            </div>
          ))}
          {/* Duplicate for seamless looping */}
          {firstSliderTools.map((tool, index) => (
            <div className={styles.tool} key={`first-dupe-${index}`} aria-hidden="true">
              <Image src={tool} height={55} width={167} alt='' />
            </div>
          ))}
        </div>
      </div>

      {/* Second Marquee */}
      <div className={styles.marquee}>
        <div className={styles.marqueeContentReverse}>
          {secondSliderTools.map((tool, index) => (
            <div className={styles.tool} key={`second-${index}`}>
              <Image src={tool} height={55} width={147} alt='Logo' />
            </div>
          ))}
          {/* Duplicate for seamless looping */}
          {secondSliderTools.map((tool, index) => (
            <div className={styles.tool} key={`second-dupe-${index}`} aria-hidden="true">
              <Image src={tool} height={55} width={147} alt='' />
            </div>
          ))}
        </div>
      </div>
    </div>
          </div>
  )
}

export default MyTools;