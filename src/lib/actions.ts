"use server";

import ContactFormEmail from "@/components/email/ContactFormEmail";
import { z } from "zod";
import { ContactFormSchema } from "./schemas";

// Mock email service
const mockEmailService = {
  emails: {
    send: async (emailData: any) => {
      console.log("Mock email service called with:", emailData);
      return { 
        data: { id: "mock-email-id" }, 
        error: null 
      };
    }
  }
};

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (result.error) {
    return { error: result.error.format() };
  }

  try {
    const { name, email, message } = result.data;
    console.log(`Mock sending email from ${email} (${name}): ${message}`);
    
    // Use mock service instead of Resend
    const { data, error } = await mockEmailService.emails.send({
      from: `Contact Form <noreply@example.com>`,
      to: "sayanmaity600@gmail.com",
      replyTo: [email],
      cc: [email],
      subject: `New message from ${name}!`,
      text: `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`,
      // react: ContactFormEmail({ name, email, message }),
    });

    if (!data || error) {
      console.error(error ? (error as any).message || 'Unknown error' : 'Unknown error');
      throw new Error("Failed to send email!");
    }

    return { success: true };
  } catch (error) {
    return { error };
  }
}
