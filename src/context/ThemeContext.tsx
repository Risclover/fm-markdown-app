// ThemeContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";

// Define the shape of the ThemeContext
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Create the ThemeContext with a default value
export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

type Props = {
  children: ReactNode; // Use ReactNode for better type safety
};

export const ThemeProvider = ({ children }: Props) => {
  // Initialize theme state with a function to avoid SSR issues
  const [theme, setTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  // Toggle between 'light' and 'dark' themes
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  // Save the user's theme preference to localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Apply the theme class to the document body
  useEffect(() => {
    document.body.className = ""; // Reset any existing classes
    document.body.classList.add(theme); // Add the current theme as a class
  }, [theme]);

  // Detect system preference on initial load if no theme is saved
  useEffect(() => {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (!localStorage.getItem("theme")) {
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
