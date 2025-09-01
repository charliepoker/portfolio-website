'use client';

import { useState } from 'react';
import styles from './styles.module.css';
import Socials from '@/components/Socials/Socials';
import { sendEmail } from '../actions/sendEmail';
import Preloader from '@/components/Preloader/Preloader';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    const response = await sendEmail(formData);

    if (response.success) {
      setStatus('Message sent successfully!✅');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('Failed to send message. Please try again.🥺');
    }
  };

  return (
    <>
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Have a question? Get in Touch</h1>
        <a className={styles.link} href="mailto:hello@iheanacho.io">hello@iheanacho.io</a>
    <Socials socials={["github", "linkedin", "hashnode"]} />
      </div>
    
      <div className={styles.formCtn}>
        <h3>Send Message</h3>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
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

          <button type="submit">Send Message</button>
        </form>
        {status && <p className={styles.status}>{status}</p>}
      </div>
    </div>

    <Preloader text="{DEV.OBINNA.CONTACT}"/>

        </>
  );
}
