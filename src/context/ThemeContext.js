import { createContext, useEffect, useState } from "react";
import { KEYS, load, save } from "../utils/storage";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => load(KEYS.theme, "light"));

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    save(KEYS.theme, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
