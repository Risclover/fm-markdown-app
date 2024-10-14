import React, { SetStateAction } from "react";
import Logo from "../../assets/images/logo.svg";
import "./Sidebar.css";
import MyDocuments from "./MyDocuments";
import DarkLightToggle from "../DarkLightToggle/DarkLightToggle";

type Props = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
  setFileTitle: React.Dispatch<SetStateAction<string>>;
  setMarkdown: React.Dispatch<SetStateAction<string>>;
  setCurrentFile: React.Dispatch<
    SetStateAction<{
      id: string;
      createdAt: string;
      title: string;
      content: string;
    }>
  >;
};

const Sidebar = ({
  showSidebar,
  setShowSidebar,
  setFileTitle,
  setMarkdown,
  setCurrentFile,
}: Props) => {
  return (
    <div className={`sidebar${showSidebar ? " open" : ""}`}>
      <div className="sidebar-top">
        <img className="logo-show" src={Logo} alt="Markdown" />
        <MyDocuments
          setCurrentFile={setCurrentFile}
          setMarkdown={setMarkdown}
          setFileTitle={setFileTitle}
          setShowSidebar={setShowSidebar}
        />
      </div>
      <DarkLightToggle />
    </div>
  );
};

export default Sidebar;
