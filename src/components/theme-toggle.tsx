"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="size-[1.2rem] scale-100 transition-all dark:scale-0" />
      <Moon className="absolute size-[1.2rem] scale-0 transition-all dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
