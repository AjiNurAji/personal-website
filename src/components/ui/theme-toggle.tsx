"use client";
import { useTheme } from "next-themes";
import { Button } from "./button";
import { RiMoonFill, RiSunFill } from "@remixicon/react";

export const ThemeToggle = () => {
  const { setTheme } = useTheme();

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  return (
    <Button
      variant="outline"
      size="icon-lg"
      className="rounded-full"
      onClick={toggleTheme}
    >
      <span className="sr-only">Toggle theme</span>
      <RiMoonFill className="rotate-0 scale-100 transition-all hover:text-slate-900 dark:-rotate-90 dark:scale-0 dark:hover:text-slate-100" />
      <RiSunFill className="absolute rotate-90 scale-0 transition-all hover:text-slate-900 dark:rotate-0 dark:scale-100 dark:hover:text-slate-100" />
    </Button>
  );
};
