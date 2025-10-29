"use client";

import { sendEmail } from "@/lib/actions";
import { ContactFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner"; // Import toast
import { z } from "zod";
import { Button } from "@/components/ui/Button"; // Corrected path using alias
import { Input } from "@/components/ui/Input";   // Assuming Input is also needed
import { Textarea } from "@/components/ui/Textarea";

type Inputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await sendEmail(data);

    // Check if the server action returned a specific error message
    if (!result.success) {
      // Display validation errors specifically if they exist
      if (result.errors) {
         // Optionally, you could display specific validation errors here
         // For now, using a general failure message for any !result.success
         toast.error("Message failed to send. Please check your input and try again.");
      } else {
        // Use the generic error message from the server action or a default
        toast.error(result.error || "Message failed to send. Please try again later.");
      }
      return; // Stop execution if there was an error
    }

    // --- SUCCESS MESSAGE ---
    toast.success("Success! If you don't see the confirmation email, please check your spam folder.");
    reset(); // Reset the form on success
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {/* Name Input */}
        <div className="h-16">
          <Input
            id="name"
            type="text"
            placeholder="Name"
            autoComplete="given-name"
            {...register("name")}
            aria-invalid={errors.name ? "true" : "false"} // Accessibility
          />
          {errors.name?.message && (
            <p className="input-error">{errors.name.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="h-16">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"} // Accessibility
          />
          {errors.email?.message && (
            <p className="input-error">{errors.email.message}</p>
          )}
        </div>

        {/* Message Textarea */}
        <div className="h-32 sm:col-span-2">
          <Textarea
            id="message" // Added id for better accessibility/labeling if needed
            rows={4}
            placeholder="Leave feedback about the site, career opportunities or just to say hello etc."
            autoComplete="off" // Usually off for message boxes
            className="resize-none"
            {...register("message")}
            aria-invalid={errors.message ? "true" : "false"} // Accessibility
          />
          {errors.message?.message && (
            <p className="input-error">{errors.message.message}</p>
          )}
        </div>
      </div>
      <div className="mt-2">
        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full disabled:opacity-50"
          aria-live="polite" // Announce changes for screen readers
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <span>Sending...</span>
              <ReloadIcon className="ml-2 animate-spin" />
            </div>
          ) : (
            <div className="flex items-center">
              <span>Send Message</span>
              <PaperPlaneIcon className="ml-2" />
            </div>
          )}
        </Button>
        {/* Privacy Policy Link */}
        <p className="mt-4 text-xs text-muted-foreground">
          By submitting this form, I agree to the{" "}
          <Link href="/privacy" className="link font-semibold">
            privacy&nbsp;policy.
          </Link>
        </p>
      </div>
    </form>
  );
}