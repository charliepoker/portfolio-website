"use client";
import { useState } from "react";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaWhatsapp, FaLink, FaShareAlt } from "react-icons/fa";
import styles from "./styles.module.css";

export default function Share({ url = "", title = "" }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url || (typeof window !== "undefined" ? window.location.href : ""));
  const encodedTitle = encodeURIComponent(title || document?.title || "");

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: url || window.location.href });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <div className={styles.shareContainer}>
      <h4>Share this article:</h4>
      <div className={styles.buttons}>
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className={styles.twitter}>
          <FaTwitter /> Twitter
        </a>
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className={styles.facebook}>
          <FaFacebookF /> Facebook
        </a>
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkedin}>
          <FaLinkedinIn /> LinkedIn
        </a>
        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.whatsapp}>
          <FaWhatsapp /> WhatsApp
        </a>
        <button onClick={handleCopy} className={styles.copy}>
          <FaLink /> {copied ? "Copied!" : "Copy Link"}
        </button>
        <button onClick={handleNativeShare} className={styles.native}>
          <FaShareAlt /> Share
        </button>
      </div>
    </div>
  );
}
