import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes"; // Correct import path assumption

import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Calistoga, Inter } from "next/font/google";
import "./globals.css";

// Import the Toaster component
import { Toaster } from "@/components/ui/Sonner"; // Make sure this path is correct

// Import the new Chatbot component
import Chatbot from "@/components/chat/Chatbot";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  // ... your metadata remains the same
  title: "Sayan Maity | Full-Stack Web Developer & UI/UX Designer Portfolio",
  description:
    "Sayan Maity is a Full-Stack Web Developer and UI/UX Designer (Next.js, React, MongoDB, Express) building high-impact projects. View his work, experience, and development philosophy here.",
  icons: {
    icon: "/favicon.gif",
  },
  verification: {
    google: "ykMn9LjBw33SJS2TIVtgvLmf0xgrSR9_oeR7n1DpXRo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "mx-auto flex min-h-screen max-w-3xl flex-col px-8 font-sans antialiased",
          inter.variable,
          calistoga.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
          
          {/* Add the Toaster component here */}
          <Toaster richColors position="top-right" />

          {/* Add the global Chatbot component here */}
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}