import React, { useContext } from "react";
import MoonIcon from "../../assets/images/icon-dark-mode.svg";
import SunIcon from "../../assets/images/icon-light-mode.svg";
import DarkLightSwitch from "./DarkLightSwitch";
import "./DarkLightToggle.css";
import { ThemeContext } from "../../context/ThemeContext";

const DarkLightToggle = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="dark-light-toggle-container">
      <img
        className={`dark-mode-icon${theme === "dark" ? " active" : ""}`}
        src={MoonIcon}
        alt="Dark mode"
      />
      <DarkLightSwitch />
      <img
        className={`light-mode-icon${theme === "light" ? " active" : ""}`}
        src={SunIcon}
        alt="Light mode"
      />
    </div>
  );
};

export default DarkLightToggle;
