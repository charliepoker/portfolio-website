'use client'

import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { GoArrowUpRight } from "react-icons/go";
import { client } from "../../lib/sanity"; // adjust path

function Socials({ socials = [] }) {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const query = `*[_type == "socials"][0]{ links[]{name, url} }`;
        const data = await client.fetch(query);

        // Filter based on the socials prop
        const filtered = data?.links?.filter(link =>
          socials.includes(link.name.toLowerCase())
        ) || [];

        setLinks(filtered);
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchLinks();
  }, [socials]);

  return (
    <div>
      <ul className={styles.socials}>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.name} <GoArrowUpRight color='var(--green)' />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Socials;
