'use client'

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from "@/components/Hero/Hero";
import styles from "./page.module.css";
import MyTools from "@/components/MyTools/MyTools";
import Publications from "@/components/Publications/Publications";
import SayHello from "@/components/SayHello/SayHello";
import Preloader from "@/components/Preloader/Preloader";
import { client } from '@/lib/sanity';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);
  const listItemsRef = useRef([]);
  const statItemsRef = useRef([]);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const query = `*[_type == "homePage"][0]{
          hero{
            firstName,
            lastName,
            role,
            description,
            heroImage,
            cta{
              text,
              url
            },
            socialLinks[]{
              platform,
              url
            }
          },
          technicalProficiencies{
            sectionTitle,
            proficiencies[]{
              num,
              title,
              description
            },
            stats[]{
              value,
              label
            }
          },
          toolsAndSoftware{
            sectionTitle,
            firstMarquee[]{
              asset->{
                _id,
                url
              }
            },
            secondMarquee[]{
              asset->{
                _id,
                url
              }
            }
          },
          latestPublications{
            sectionTitle,
            articles[]->{
              _id,
              title,
              date,
              slug,
              excerpt,
              "banner": banner.asset->url
            }
          }
        }`;
        
        const data = await client.fetch(query);

        // Format latestPublications dates
        if (data?.latestPublications?.articles) {
          data.latestPublications.articles = data.latestPublications.articles.map(article => ({
            ...article,
            date: article.date 
              ? new Date(article.date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "Date not set"
          }));
        }

        setHomeData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching home data:', error);
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !homeData?.technicalProficiencies) return;

    const ctx = gsap.context(() => {
      // Animate each technical proficiency item
      gsap.from(listItemsRef.current, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animate stats (count up)
      statItemsRef.current.forEach((el) => {
        const endValue = parseInt(el.innerText);
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: endValue,
            duration: 3,
            ease: "power1.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [homeData]);

  if (loading) {
    return (
      <div>
        {showPreloader && (
          <Preloader text="{DEV.OBINNA}" />
        )}
      </div>
    );
  }

  if (!homeData) {
    return <div>No data found</div>;
  }

  const { hero, technicalProficiencies, toolsAndSoftware, latestPublications } = homeData;

  return (
    <>
      <Hero heroData={hero} />

      {/* TECHNICAL PROFICIENCY */}
      {technicalProficiencies && (
        <div className={styles.tech} ref={sectionRef}>
          <div className={styles.techData}>
            <h3>{technicalProficiencies.sectionTitle}</h3>
            <ul>
              {technicalProficiencies.proficiencies?.map((item, i) => (
                <li key={i} ref={(el) => (listItemsRef.current[i] = el)}>
                  <div className={styles.techDataTitle}>
                    <span>{item.num}</span> <h4>{item.title}</h4>
                  </div>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.techStats}>
            <ul>
              {technicalProficiencies.stats?.map((stat, i) => (
                <li key={i}>
                  <span ref={(el) => (statItemsRef.current[i] = el)}>{stat.value}</span>
                  <h4>{stat.label}</h4>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TOOLS AND SOFTWARE */}
      {toolsAndSoftware && (
        <div>
          <MyTools toolsData={toolsAndSoftware} />
        </div>
      )}

      {/* LATEST PUBLICATIONS */}
      {latestPublications && (
        <div className={styles.publications}>
          <div><h3>{latestPublications.sectionTitle}</h3></div>
          <Publications articles={latestPublications.articles} />
        </div>
      )}

      {/* SAY HELLO */}
      <SayHello />

      {showPreloader && (
        <Preloader text="{DEV.OBINNA}" />
      )}
    </>
  );
}
