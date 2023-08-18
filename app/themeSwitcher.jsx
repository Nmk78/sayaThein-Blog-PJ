"use client";

import { useTheme } from 'next-themes'
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)


  const initialTheme = theme || "light";

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);


  const themeChanger = () => {
    setTheme(theme === undefined || theme === "light" ? "dark" : "light");
  };

    // useEffect only runs on the client, so now we can safely show the UI to avoid hydration error
    useEffect(() => {
      setMounted(true)
    }, [])
  
    if (!mounted) {
      return null
    }
  return (
    <div>
      <label className="relative inline-flex items-center cursor-pointer"> 
      <input
        type="checkbox"
        value={theme}
        onChange={themeChanger}
        checked={theme === "dark"}
        className="sr-only peer"
      />


       <div className="hidden w-14 h-7 bg-gray-400 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-lg font-medium text-gray-800 dark:text-gray-300 p-3 items-center">
          {theme == 'light' ? '🌤️' : '🌛'}
        </span>
      </label> 
    </div>
  );
};

export default ThemeSwitcher;
