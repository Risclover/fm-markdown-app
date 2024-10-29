import { useContext } from "react";
import { Logos } from "../../assets";
import { DarkLightSwitch } from "./DarkLightSwitch";
import { ThemeContext } from "../../context";
import "./DarkLightToggle.css";

export const DarkLightToggle = () => {
  const { theme }: { theme: string } = useContext(ThemeContext);

  return (
    <div className="dark-light-toggle-container">
      <img
        className={`dark-mode-icon${theme === "dark" ? " active" : ""}`}
        src={Logos.IconDarkMode}
        alt="Dark mode"
      />
      <DarkLightSwitch />
      <img
        className={`light-mode-icon${theme === "light" ? " active" : ""}`}
        src={Logos.IconLightMode}
        alt="Light mode"
      />
    </div>
  );
};
