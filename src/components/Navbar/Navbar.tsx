import React, { SetStateAction } from "react";
import SidebarMenuBtn from "../Sidebar/SidebarMenuBtn";
import TrashLogo from "../../assets/images/icon-delete.svg";
import Logo from "../../assets/images/logo.svg";
import SaveLogo from "../../assets/images/icon-save.svg";
import useNavbar from "./hooks/useNavbar";
import FileTitle from "./FileTitle";
import "./Navbar.css";
import { LuFileDown } from "react-icons/lu";

type Props = {
  fileTitle: string;
  setFileTitle: React.Dispatch<SetStateAction<string>>;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
  showSidebar: boolean;
  setShowDeleteWarning: React.Dispatch<SetStateAction<boolean>>;
  markdown: string;
  currentFile: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
  };
  setCurrentFile: React.Dispatch<
    SetStateAction<{
      id: string;
      title: string;
      content: string;
      createdAt: string;
    }>
  >;
  files: { content: string; id: string; title: string; createdAt: string }[];
  setFiles: React.Dispatch<
    SetStateAction<
      { content: string; id: string; title: string; createdAt: string }[]
    >
  >;
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
}: Props) => {
  const { handleDelete, handleSave, handleDownload } = useNavbar({
    setShowDeleteWarning,
    currentFile,
    setCurrentFile,
    files,
    setFiles,
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
        <button className="download-btn" onClick={handleDownload}>
          <LuFileDown />
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          <img src={TrashLogo} alt="Trash" />
        </button>
        <button
          className="save-btn reg-button"
          onClick={() => handleSave(currentFile, fileTitle, markdown)}
        >
          <img src={SaveLogo} alt="Save" />
          <span className="save-btn-text">Save Changes</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
