import { useContext } from "react";
import { ThemeContext } from "../../context";

export const DarkLightSwitch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={theme === "dark" ? false : true}
        onChange={toggleTheme}
      />
      <span className="switch" />
    </label>
  );
};
