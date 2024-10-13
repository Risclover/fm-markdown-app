import React from "react";

type Props = {};

const DarkLightSwitch = (props: Props) => {
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={theme === "light"}
        onChange={toggleTheme}
      />
      <span className="switch" />
    </label>
  );
};

export default DarkLightSwitch;
