'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ name, email, message }) {
  try {
    await resend.emails.send({
      from: 'Website Contact <onboarding@resend.dev>',
      to: 'iheanachocharlie@gmail.com', // your email
      subject: `New Contact Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Resend error:', error);
    return { success: false, error: 'Failed to send message.' };
  }
}
