"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        size="icon"
        variant="ghost"
        disabled
        aria-label="Loading theme"
      >
        <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
      </Button>
    );
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-4 w-4 text-orange-300" />
      ) : (
        <MoonIcon className="h-4 w-4 text-indigo-500" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
