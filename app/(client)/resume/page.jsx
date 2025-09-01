// page.js - Resume Page Component
import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { GoArrowUpRight } from "react-icons/go";
import ResumeDetails from '@/components/ResumeDetails/ResumeDetails';
import Preloader from '@/components/Preloader/Preloader';
import Socials from '@/components/Socials/Socials';
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';

// GROQ query for resume data
const resumeQuery = `*[_type == "resume" && isActive == true][0]{
  title,
  profileImage,
  preloaderText,
  personalInfo,
  navigationSections[] | order(order asc),
  skills,
  employmentHistory,
  education
}`;

async function ResumePage() {
  const resumeData = await client.fetch(resumeQuery);

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Resume data not found</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.hero}>
        <div className={`${styles.card} ${styles.first}`}>
          <h1>{resumeData.title}</h1>
        </div>
        <div className={`${styles.card} ${styles.second}`}>
          {resumeData.profileImage ? (
            <Image 
              src={urlFor(resumeData.profileImage).url()} 
              alt={resumeData.profileImage.alt || 'Profile Photo'} 
              fill
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <span>No Image</span>
            </div>
          )}
        </div>
        <div className={`${styles.card} ${styles.third}`}>
          <Socials socials={["github", "linkedin", "hashnode"]} />
        </div>
      </div>

      <ResumeDetails resumeData={resumeData} />

      <Preloader text={resumeData.preloaderText || "{DEV.OBINNA.RESUME}"} />
    </>
  );
}

export default ResumePage;