"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Analytics", href: "/dashboard/analytics" },
  { title: "Blog", href: "/dashboard/blog" },
  { title: "Homepage Intro", href: "/dashboard/homepage-intro" },
  { title: "Side Projects", href: "/dashboard/side-projects" },
  { title: "Projects", href: "/dashboard/projects" },
  { title: "Experience", href: "/dashboard/experience" },
  { title: "Socials", href: "/dashboard/socials" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0">
      {items.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
              isActive ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
