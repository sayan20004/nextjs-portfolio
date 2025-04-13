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
  title: "Sayan Maity",
  description: "My personal site to showcase my developer work and opinions.",
  icons: {
    icon: "/favicon.gif",
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
