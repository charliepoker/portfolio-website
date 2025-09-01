'use client'
import React, { useEffect, useState } from 'react';

import styles from './styles.module.css';
import Publications from '@/components/Publications/Publications';
import SayHello from '@/components/SayHello/SayHello';
import Preloader from '@/components/Preloader/Preloader';
import { client } from '../../../lib/sanity';

function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const query = `*[_type == "blog"] | order(date desc){
          _id,
          title,
          "banner": banner.asset->url,
          date,
          slug
        }`;

        const data = await client.fetch(query);

        const formatted = data.map((article) => ({
          title: article.title,
          date: article.date
            ? new Date(article.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })
            : 'Date not set',
          banner: article.banner,
          slug: article.slug,
        }));

        setArticles(formatted);
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <>
      <div className={styles.main}>
        <h1>PUBLICATIONS</h1>
        <div className={styles.posts}>
          <Publications articles={articles} />
        </div>
      </div>

      <SayHello />
      <Preloader text="{DEV.OBINNA.BLOG}" />
    </>
  );
}

export default Blog;
