import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";

type Props = {};

const DarkLightSwitch = (props: Props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  useEffect(() => {
    console.log("theme:", theme, toggleTheme);
  }, [theme, toggleTheme]);
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

export default DarkLightSwitch;
