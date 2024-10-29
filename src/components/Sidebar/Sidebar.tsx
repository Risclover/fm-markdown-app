import React, { SetStateAction } from "react";
import Logo from "../../assets/images/logo.svg";
import "./Sidebar.css";
import MyDocuments, { MarkdownFile } from "./MyDocuments";
import DarkLightToggle from "../DarkLightToggle/DarkLightToggle";

type Props = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
  setFileTitle: React.Dispatch<SetStateAction<string>>;
  setMarkdown: React.Dispatch<SetStateAction<string>>;
  setCurrentFile: React.Dispatch<SetStateAction<MarkdownFile | null>>;
  files: MarkdownFile[];
  setFiles: React.Dispatch<SetStateAction<MarkdownFile[]>>;
  changesSaved: boolean;
  setShowChangesUnsavedWarning: React.Dispatch<SetStateAction<boolean>>;
  setPendingFile: React.Dispatch<SetStateAction<MarkdownFile | null>>;
  currentFile: MarkdownFile | null;
};

const Sidebar = ({
  showSidebar,
  setShowSidebar,
  setFileTitle,
  setMarkdown,
  setCurrentFile,
  files,
  setFiles,
  changesSaved,
  setShowChangesUnsavedWarning,
  setPendingFile,
  currentFile,
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
          files={files}
          setFiles={setFiles}
          changesSaved={changesSaved}
          setShowChangesUnsavedWarning={setShowChangesUnsavedWarning}
          setPendingFile={setPendingFile}
          currentFile={currentFile}
        />
      </div>
      <DarkLightToggle />
    </div>
  );
};

export default Sidebar;
