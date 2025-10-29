"use server";

import sgMail from '@sendgrid/mail';
import { render } from '@react-email/render'; // Ensure this import is correct
import { z } from "zod";

// Make absolutely sure this line is REMOVED:
// import ReactDOMServer from 'react-dom/server';

import ContactConfirmationEmail from '@/components/email/ContactConfirmationEmail';
import { ContactFormSchema } from "./schemas";

// --- SendGrid API Key setup remains the same ---
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn("SENDGRID_API_KEY is not set...");
}

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);
  
  if (!result.success) {
    return { success: false, errors: result.error.format() };
  }

  if (!process.env.SENDGRID_API_KEY) {
    console.error("Missing SENDGRID_API_KEY...");
    return { success: false, error: "Email configuration error." };
  }

  const { name, email, message } = result.data;
  const siteOwnerEmail = "sayanmaity600@gmail.com";
  const fromEmail = "sayanmaity600@gmail.com"; // Ensure verified

  try {
    console.log(`Attempting to send email via SendGrid from ${email} (${name})`);

    // Notification to owner (remains the same)
    const notificationEmail = {
      to: siteOwnerEmail,
      from: fromEmail,
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // --- Debugging Rendering ---
    let confirmationHtml: string;
    try {
      // Use await here because render is likely async
      confirmationHtml = await render(ContactConfirmationEmail({ name })); // <-- Add await here
      console.log("Rendered HTML for confirmation email:", confirmationHtml);
      if (typeof confirmationHtml !== 'string') {
          throw new Error('Render function did not return a string.');
      }
    } catch (renderError) {
      console.error("Error rendering email component:", renderError);
      return { success: false, error: "Failed to render confirmation email." };
    }
    // --- End Debugging ---


    const confirmationEmail = {
      to: email,
      from: fromEmail,
      subject: "Message Received - Sayan Maity Portfolio",
      html: confirmationHtml, // Now this will be a string
    };

    // Send emails
    await Promise.all([
      sgMail.send(notificationEmail),
      sgMail.send(confirmationEmail)
    ]);

    console.log(`Emails sent successfully to ${siteOwnerEmail} and ${email}`);
    return { success: true };

  } catch (error: any) {
    // Log the specific SendGrid error if available
    console.error("SendGrid Error:", error.response?.body?.errors || error.message || error);
    return { success: false, error: "Failed to send email. Please try again later." };
  }
}