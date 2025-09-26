import React from "react";
import Image from "next/image";
import { client } from "@/lib/sanity"; // adjust to your setup
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from '@sanity/image-url';
import styles from "./styles.module.css";

// Initialize the image URL builder
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
function urlFor(source) {
  return builder.image(source);
}

// ✅ Updated GROQ query with resolved image URLs in content
const query = `
  *[_type == "blog" && slug.current == $slug][0]{
    title,
    date,
    "banner": banner.asset->url,
    excerpt,
    content[]{
      ...,
      _type == "image" => {
        ...,
        "asset": asset->{
          _id,
          url,
          _ref
        },
        alt
      }
    },
    slug
  }
`;

// ✅ Updated PortableText custom renderers with proper image handling
const components = {
  types: {
    image: ({ value }) => {
      // Debug logging (remove in production)
      console.log('Image value:', value);
      
      // Try multiple ways to get the image URL
      let imageUrl = null;
      
      if (value.asset?.url) {
        // Direct URL from resolved asset
        imageUrl = value.asset.url;
      } else if (value.asset?._ref || value.asset?._id) {
        // Use image URL builder for asset reference
        try {
          imageUrl = urlFor(value).width(800).height(500).url();
        } catch (error) {
          console.error('Error building image URL:', error);
        }
      }
      
      console.log('Final image URL:', imageUrl);
      
      if (!imageUrl) {
        console.warn('No image URL could be resolved for:', value);
        return null;
      }
      
      return (
        <div className={styles.blogImage}>
          <Image
            src={imageUrl}
            alt={value.alt || "Blog image"}
            width={800}
            height={500}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      );
    },
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
  block: {
    // Optional: handle different block styles
    h1: ({ children }) => <h1 className={styles.heading1}>{children}</h1>,
    h2: ({ children }) => <h2 className={styles.heading2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.heading3}>{children}</h3>,
    blockquote: ({ children }) => <blockquote className={styles.blockquote}>{children}</blockquote>,
  },
};

// ✅ Function to calculate reading time (unchanged)
function calculateReadTime(content) {
  if (!content) return 1;
  
  // Extract words from text blocks
  const text = content
    .filter((block) => block._type === "block")
    .map((block) => {
      if (block.children && Array.isArray(block.children)) {
        return block.children.map((child) => child.text || '').join(" ");
      }
      return '';
    })
    .join(" ");
    
  const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  
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
  
  try {
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
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          )}
        </div>

        <div className={styles.contentCtn}>
        <div className={styles.content}>
          {blog.content && Array.isArray(blog.content) ? (
            <PortableText value={blog.content} components={components} />
          ) : (
            <p>No content available</p>
          )}
        </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error fetching blog:', error);
    return <div className={styles.notFound}>Error loading blog</div>;
  }
}