'use client'
import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

function MyTools({ toolsData }) {
  if (!toolsData) {
    return <div>Loading tools...</div>;
  }

  const { sectionTitle, firstMarquee, secondMarquee } = toolsData;

  return (
    <div className={styles.toolsCtn}>
      <div className={styles.toolsSliderCtn}>
        <h3>{sectionTitle}</h3>
        
        {/* First Marquee */}
        {firstMarquee && firstMarquee.length > 0 && (
          <div className={styles.marquee}>
            <div className={styles.marqueeContent}>
              {firstMarquee.map((tool, index) => (
                <div className={styles.tool} key={`first-${index}`}>
                  <Image 
                    src={urlFor(tool)
                      .width(500)   // request bigger image
                      .height(165)  // 3x target height
                      .quality(100) // max quality
                      .url()} 
                    height={55} 
                    width={167} 
                    alt="Logo" 
                  />
                </div>
              ))}
              {/* Duplicate for seamless looping */}
              {firstMarquee.map((tool, index) => (
                <div className={styles.tool} key={`first-dupe-${index}`} aria-hidden="true">
                  <Image 
                    src={urlFor(tool)
                      .width(500)
                      .height(165)
                      .quality(100)
                      .url()} 
                    height={55} 
                    width={167} 
                    alt="Logo"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Second Marquee */}
        {secondMarquee && secondMarquee.length > 0 && (
          <div className={styles.marquee}>
            <div className={styles.marqueeContentReverse}>
              {secondMarquee.map((tool, index) => (
                <div className={styles.tool} key={`second-${index}`}>
                  <Image 
                    src={urlFor(tool)
                      .width(450)   // request bigger image
                      .height(165)  // 3x target height
                      .quality(100) 
                      .url()} 
                    height={55} 
                    width={147} 
                    alt="Logo"
                  />
                </div>
              ))}
              {/* Duplicate for seamless looping */}
              {secondMarquee.map((tool, index) => (
                <div className={styles.tool} key={`second-dupe-${index}`} aria-hidden="true">
                  <Image 
                    src={urlFor(tool)
                      .width(450)
                      .height(165)
                      .quality(100)
                      .url()} 
                    height={55} 
                    width={147} 
                    alt="Logo" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyTools;
