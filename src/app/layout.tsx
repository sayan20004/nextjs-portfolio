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
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sayanmaity.me"),
  title: {
    default: "Sayan Maity | Full-Stack Developer & UI/UX Designer",
    template: "%s | Sayan Maity",
  },
  description:
    "Sayan Maity is a Full-Stack Web Developer and UI/UX Designer from India, specializing in Next.js, React, Node.js, MongoDB, and iOS (SwiftUI). Building high-impact products and open-source projects.",
  keywords: [
    "Sayan Maity",
    "sayanmaity",
    "Sayan Maity developer",
    "Sayan Maity portfolio",
    "Full Stack Developer India",
    "Next.js developer",
    "React developer",
    "UI/UX Designer India",
    "iOS developer SwiftUI",
    "CCLMS BCA developer",
    "Web developer West Bengal",
    "TechInnovator developer",
  ],
  authors: [{ name: "Sayan Maity", url: "https://sayanmaity.me" }],
  creator: "Sayan Maity",
  publisher: "Sayan Maity",
  alternates: {
    canonical: "https://sayanmaity.me",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sayanmaity.me",
    siteName: "Sayan Maity",
    title: "Sayan Maity | Full-Stack Developer & UI/UX Designer",
    description:
      "Full-Stack Web Developer from India building with Next.js, React, Node.js, and SwiftUI. Open source contributor. View projects and get in touch.",
    images: [
      {
        url: "/sayanmaity.jpg",
        width: 1200,
        height: 630,
        alt: "Sayan Maity – Full-Stack Developer & UI/UX Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sayanwas",
    creator: "@sayanwas",
    title: "Sayan Maity | Full-Stack Developer & UI/UX Designer",
    description:
      "Full-Stack Web Developer from India building with Next.js, React, Node.js, and SwiftUI. Open source contributor.",
    images: ["/sayanmaity.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.gif",
  },
  verification: {
    google: "eKIwccxdRm_LEYKYKG5fJbqW5-i4EP2h66w_YH46MaM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sayan Maity",
              url: "https://sayanmaity.me",
              image: "https://sayanmaity.me/sayanmaity.jpg",
              sameAs: [
                "https://github.com/sayan20004",
                "https://www.linkedin.com/in/sayan-maitydev/",
                "https://x.com/sayanwas",
              ],
              jobTitle: "Full-Stack Web Developer & UI/UX Designer",
              worksFor: {
                "@type": "Organization",
                name: "TechInnovator",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Contai College of Learning and Management Science (CCLMS)",
              },
              knowsAbout: [
                "Next.js", "React", "Node.js", "MongoDB", "SwiftUI", "UI/UX Design", "Full Stack Development",
              ],
              nationality: "Indian",
            }),
          }}
        />
      </head>
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
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}