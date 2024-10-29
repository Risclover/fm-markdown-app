import React, { SetStateAction } from "react";
import { FaCheck } from "react-icons/fa6";
import { LuFileDown } from "react-icons/lu";
import { SidebarMenuBtn, FileTitle } from "../../components";
import { useNavbar } from "./hooks";
import { Logos } from "../../assets";
import type { MarkdownFile } from "../../hooks";
import "./Navbar.css";

type Props = {
  fileTitle: string;
  setFileTitle: React.Dispatch<SetStateAction<string>>;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
  showSidebar: boolean;
  setShowDeleteWarning: React.Dispatch<SetStateAction<boolean>>;
  markdown: string;
  currentFile: MarkdownFile | null;
  setCurrentFile: React.Dispatch<SetStateAction<MarkdownFile | null>>;
  files: MarkdownFile[];
  setFiles: React.Dispatch<SetStateAction<MarkdownFile[]>>;
  setShowIdenticalTitleWarning: React.Dispatch<SetStateAction<boolean>>;
  changesSaved: boolean;
  setChangesSaved: React.Dispatch<SetStateAction<boolean>>;
  setWarningType: React.Dispatch<SetStateAction<string>>;
};

export const Navbar = ({
  fileTitle,
  setFileTitle,
  setShowSidebar,
  showSidebar,
  setShowDeleteWarning,
  currentFile,
  setCurrentFile,
  markdown,
  files,
  setFiles,
  setShowIdenticalTitleWarning,
  changesSaved,
  setChangesSaved,
  setWarningType,
}: Props) => {
  const { handleDelete, handleSave, handleDownload, savedText } = useNavbar({
    setShowDeleteWarning,
    currentFile,
    setCurrentFile,
    files,
    setFiles,
    setShowIdenticalTitleWarning,
    fileTitle,
    changesSaved,
    setChangesSaved,
    setWarningType,
  });
  return (
    <div className="navbar-container">
      <div className="navbar-container-left">
        <SidebarMenuBtn
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
        />
        <img className="navbar-logo" src={Logos.Logo} alt="Markdown" />
        <FileTitle fileTitle={fileTitle} setFileTitle={setFileTitle} />
      </div>
      <div className="navbar-container-right">
        {currentFile?.id !== "" && (
          <div className="navbar-little-btns">
            <button
              title="Download file"
              className="download-btn"
              onClick={handleDownload}
            >
              <LuFileDown />
            </button>
            <button
              title="Delete file"
              className="delete-btn"
              onClick={handleDelete}
            >
              <img src={Logos.IconDelete} alt="Trash" />
            </button>
          </div>
        )}
        <button
          className="save-btn reg-button"
          onClick={() => handleSave(currentFile, fileTitle.trim(), markdown)}
        >
          {savedText === "Saved!" ? (
            <FaCheck />
          ) : (
            <img src={Logos.IconSave} alt="Save" />
          )}
          <span className="save-btn-text">{savedText}</span>
          {savedText === "Saved!" && <div></div>}
        </button>
      </div>
    </div>
  );
};
