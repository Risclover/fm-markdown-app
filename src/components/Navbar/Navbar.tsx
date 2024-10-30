import React, { SetStateAction } from "react";
import { FaCheck } from "react-icons/fa6";
import { LuFileDown } from "react-icons/lu";
import { SidebarMenuBtn, FileTitle } from "../../components";
import { useFile } from "../../context";
import { useNavbar } from "./hooks";
import { Logos } from "../../assets";
import "./Navbar.css";

type Props = {
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
  showSidebar: boolean;
  setShowDeleteWarning: React.Dispatch<SetStateAction<boolean>>;
  setShowIdenticalTitleWarning: React.Dispatch<SetStateAction<boolean>>;
  changesSaved: boolean;
  setChangesSaved: React.Dispatch<SetStateAction<boolean>>;
  setWarningType: React.Dispatch<SetStateAction<string>>;
};

export const Navbar = ({
  setShowSidebar,
  showSidebar,
  setShowDeleteWarning,
  setShowIdenticalTitleWarning,
  changesSaved,
  setChangesSaved,
  setWarningType,
}: Props) => {
  const { fileTitle, currentFile, setCurrentFile, files, setFiles, markdown } =
    useFile();

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
    <nav className="navbar-container">
      <div className="navbar-container-left">
        <SidebarMenuBtn
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
        />
        <img className="navbar-logo" src={Logos.Logo} alt="Markdown" />
        <FileTitle />
      </div>
      <div className="navbar-container-right">
        {currentFile && currentFile.id !== "" && (
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
    </nav>
  );
};
