import React from "react";
import MoonIcon from "../../assets/images/icon-dark-mode.svg";
import SunIcon from "../../assets/images/icon-light-mode.svg";
import DarkLightSwitch from "./DarkLightSwitch";

type Props = {
  theme: string;
};

const DarkLightToggle = ({ theme }: Props) => {
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
