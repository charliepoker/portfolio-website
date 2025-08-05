'use client';

import { useState } from 'react';
import styles from './styles.module.css';
import Socials from '@/components/Socials/Socials';


export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form handling logic here (e.g. POST to API)
  };

  return (

    <div className={styles.container}>
    <div className={styles.content}>
        <h1>Have a question?  Let's Get in Touch</h1>
        <a className={styles.link} href="mailto:hello@iheanacho.io">hello@iheanacho.io</a>

        <Socials/>

    </div>
    
    <div className={styles.formCtn}>
        <h3>Send Message</h3>
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      {/* Name Field */}
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Enter Your Name..."
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email Field */}
      <div className={styles.formGroup}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter Your Email..."
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Message Field */}
      <div className={styles.formGroup}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Write Message..."
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      {/* Submit Button */}
      
        <button type="submit">Send Message</button>

    </form>
</div>
        </div>
  );
}
