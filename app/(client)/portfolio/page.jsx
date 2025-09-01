'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import SayHello from '@/components/SayHello/SayHello';
import { client, urlFor } from '@/lib/sanity';
import Preloader from '@/components/Preloader/Preloader';

const query = `*[_type == "portfolio"][0]{
  projects[]{
    title,
    description,
    image
  }
}`;

function Page() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(query);
      setProjects(data?.projects || []);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>PORTFOLIO</h1>
        </div>

        <div className={styles.cards}>
          {projects.map((project, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardImage}>
                {project.image && (
                  <Image
                    src={urlFor(project.image)
                      .width(1000)     // request larger width
                      .height(600)    // request larger height
                      .quality(100)   // highest quality
                      .url()}
                    alt={project.title}
                    width={800}
                    height={600}
                    className={styles.image}
                  />
                )}
              </div>
              <div className={styles.cardTexts}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SayHello />
          <Preloader text="{DEV.OBINNA.PORFOLIO}"/>

    </>
  );
}

export default Page;
