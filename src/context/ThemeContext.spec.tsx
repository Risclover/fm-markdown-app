// ThemeContext.spec.tsx
import React from "react";
import { render, act } from "@testing-library/react";
import { ThemeProvider, ThemeContext, ThemeContextType } from "./ThemeContext";

describe("ThemeContext", () => {
  beforeEach(() => {
    // Clear any saved theme before each test
    localStorage.clear();
    document.body.className = "";
    jest.resetModules(); // Clears any cached modules.
  });

  test("provides default theme as light when no saved theme", () => {
    let themeValue: ThemeContextType | undefined;

    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {(value) => {
            themeValue = value;
            return null;
          }}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    if (themeValue) {
      expect(themeValue.theme).toBe("light");
      expect(typeof themeValue.toggleTheme).toBe("function");
      expect(localStorage.getItem("theme")).toBe("light");
      expect(document.body.classList.contains("light")).toBe(true);
    } else {
      throw new Error("themeValue is undefined");
    }
  });

  test("initializes theme from localStorage", () => {
    localStorage.setItem("theme", "dark");

    let themeValue: ThemeContextType | undefined;

    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {(value) => {
            themeValue = value;
            return null;
          }}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    if (themeValue) {
      expect(themeValue.theme).toBe("dark");
      expect(localStorage.getItem("theme")).toBe("dark");
      expect(document.body.classList.contains("dark")).toBe(true);
    } else {
      throw new Error("themeValue is undefined");
    }
  });

  test("toggleTheme toggles theme and updates localStorage and body class", () => {
    let themeValue: ThemeContextType | undefined;

    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {(value) => {
            themeValue = value;
            return null;
          }}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    if (themeValue) {
      // Initial theme should be 'light'
      expect(themeValue.theme).toBe("light");

      act(() => {
        themeValue.toggleTheme();
      });

      // After toggling, theme should be 'dark'
      expect(themeValue.theme).toBe("dark");
      expect(localStorage.getItem("theme")).toBe("dark");
      expect(document.body.classList.contains("dark")).toBe(true);

      act(() => {
        themeValue.toggleTheme();
      });

      // After toggling again, theme should be 'light'
      expect(themeValue.theme).toBe("light");
      expect(localStorage.getItem("theme")).toBe("light");
      expect(document.body.classList.contains("light")).toBe(true);
    } else {
      throw new Error("themeValue is undefined");
    }
  });

  test("applies system preference theme if no saved theme", () => {
    // Mock window.matchMedia to return true for dark mode
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    let themeValue: ThemeContextType | undefined;

    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {(value) => {
            themeValue = value;
            return null;
          }}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    // Since useEffect runs after initial render, we need to wait for it
    act(() => {});

    if (themeValue) {
      expect(themeValue.theme).toBe("dark");
      expect(localStorage.getItem("theme")).toBe("dark");
      expect(document.body.classList.contains("dark")).toBe(true);
    } else {
      throw new Error("themeValue is undefined");
    }
  });
});
