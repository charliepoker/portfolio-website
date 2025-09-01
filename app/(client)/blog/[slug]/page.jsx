import React from "react";
import Image from "next/image";
import { client } from "@/lib/sanity"; // adjust to your setup
import { PortableText } from "@portabletext/react";
import styles from "./styles.module.css";

// ✅ GROQ query with resolved image URL
const query = `
  *[_type == "blog" && slug.current == $slug][0]{
    title,
    date,
    "banner": banner.asset->url,
    excerpt,
    content,
    slug
  }
`;

// ✅ PortableText custom renderers
const components = {
  types: {
    image: ({ value }) => (
      <div className={styles.blogImage}>
        <Image
          src={value.asset?.url || ""}
          alt={value.alt || "Blog image"}
          width={800}
          height={500}
        />
      </div>
    ),
    code: ({ value }) => (
      <pre className={styles.codeBlock}>
        <code>{value.code}</code>
      </pre>
    ),
    embed: ({ value }) => (
      <div className={styles.embed}>
        <iframe
          src={value.url}
          width="100%"
          height="400"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

// ✅ Function to calculate reading time
function calculateReadTime(content) {
  if (!content) return 1;

  // Extract words from text blocks
  const text = content
    .filter((block) => block._type === "block")
    .map((block) => block.children.map((child) => child.text).join(" "))
    .join(" ");

  const words = text.trim().split(/\s+/).length;

  // Base time (200 words per minute)
  let minutes = Math.ceil(words / 200);

  // Add extra time for images, code blocks, and embeds
  const extraTime =
    content.filter((block) => block._type === "image").length * 0.2 + // +12s per image
    content.filter((block) => block._type === "code").length * 0.5 + // +30s per code
    content.filter((block) => block._type === "embed").length * 0.5; // +30s per embed

  minutes += Math.ceil(extraTime);

  return minutes || 1; // at least 1 min
}

export default async function BlogPage({ params }) {
  const { slug } = params;

  // Fetch blog from Sanity
  const blog = await client.fetch(query, { slug });

  if (!blog) {
    return <div className={styles.notFound}>Blog not found</div>;
  }

  // ✅ Calculate read duration
  const readTime = calculateReadTime(blog.content);

  return (
    <>
      <div className={styles.header}>
        <span>By Obinna Iheanacho</span>
        <div className={styles.headerTitle}>
          <h1>{blog.title}</h1>
        </div>
        <div className={styles.headerMeta}>
          <ul>
            <li className={styles.date}>
              {new Date(blog.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </li>
            <li className={styles.duration}>{readTime} mins Read</li>
          </ul>
        </div>
        {blog.banner && (
          <div className={styles.headerBanner}>
            <Image
              src={blog.banner}
              alt={blog.title}
              width={1200}
              height={600}
              priority
            />
          </div>
        )}
      </div>

      <div className={styles.content}>
        <PortableText value={blog.content} components={components} />
      </div>
    </>
  );
}
