import React, { SetStateAction } from "react";
import SidebarMenuBtn from "../Sidebar/SidebarMenuBtn";
import TrashLogo from "../../assets/images/icon-delete.svg";
import Logo from "../../assets/images/logo.svg";
import SaveLogo from "../../assets/images/icon-save.svg";
import useNavbar from "./hooks/useNavbar";
import FileTitle from "./FileTitle";
import "./Navbar.css";
import { LuFileDown } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { MarkdownFile } from "../Sidebar/MyDocuments";

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

const Navbar = ({
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
        <img className="navbar-logo" src={Logo} alt="Markdown" />
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
              <img src={TrashLogo} alt="Trash" />
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
            <img src={SaveLogo} alt="Save" />
          )}
          <span className="save-btn-text">{savedText}</span>
          {savedText === "Saved!" && <div></div>}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
