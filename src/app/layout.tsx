import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Calistoga, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Sayan Maity | Full-Stack Web Developer & UI/UX Designer Portfolio",
  description: "Sayan Maity is a Full-Stack Web Developer and UI/UX Designer (Next.js, React, MongoDB, Express) building high-impact projects. View his work, experience, and development philosophy here.",
  icons: {
    icon: "/favicon.gif",
  },
   verification: {
    google: "<meta name="google-site-verification" content="ykMn9LjBw33SJS2TIVtgvLmf0xgrSR9_oeR7n1DpXRo" />", // Replace with the actual code Google gives you
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
          calistoga.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
