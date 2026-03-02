"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Linkedin, Github, Twitter, Mail } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();

  const navLink = (href: string, icon: React.ReactNode, label: string) => {
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return (
      <li className="link">
        <Link
          href={href}
          className={
            isActive
              ? "flex items-center gap-2 rounded-md bg-secondary/80 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              : "flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          }
        >
          {icon}
          {label}
        </Link>
      </li>
    );
  };

  return (
    <header className="sticky top-0 z-50 py-6 bg-background">
      <nav className="flex items-center justify-between">
        <ul className="flex items-center gap-6">
          {navLink("/", <Home className="size-4" />, "Home")}
          {navLink("/blog", <FileText className="size-4" />, "Blog")}
        </ul>
        <div className="flex items-center gap-5">
          <ThemeToggle />
          <a
            href="https://www.linkedin.com/in/sayan-maitydev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="size-4" />
          </a>
          <a
            href="https://github.com/sayan20004"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="sr-only">GitHub</span>
            <Github className="size-4" />
          </a>
          <a
            href="https://x.com/sayanwas?s=21"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="sr-only">Twitter</span>
            <Twitter className="size-4" />
          </a>
          <a
            href="mailto:sayanmaity600@gmail.com"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="sr-only">Email</span>
            <Mail className="size-4" />
          </a>
        </div>
      </nav>
    </header>
  );
}
