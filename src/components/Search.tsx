import { useTheme } from "next-themes";
import React, { useEffect } from "react";

export default function Search() {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    if (theme === null) {
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? setTheme("dark")
        : setTheme("light");
    }
  }, [theme, setTheme]);

  return <>The current theme is: {theme}</>;
}
