import React from "react";
import Logo from "../../assets/images/logo.svg";
import "./Sidebar.css";
import MyDocuments from "./MyDocuments";
import DarkLightToggle from "../DarkLightToggle/DarkLightToggle";

type Props = {
  showSidebar: boolean;
};

const Sidebar = ({ showSidebar }: Props) => {
  return (
    <div className={`sidebar${showSidebar ? " open" : ""}`}>
      <div className="sidebar-top">
        <img className="logo-show" src={Logo} alt="Markdown" />
        <MyDocuments />
      </div>
      <DarkLightToggle />
    </div>
  );
};

export default Sidebar;
