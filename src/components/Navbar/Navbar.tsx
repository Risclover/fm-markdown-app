import React, { SetStateAction } from "react";
import SidebarMenuBtn from "../Sidebar/SidebarMenuBtn";
import TrashLogo from "../../assets/images/icon-delete.svg";
import Logo from "../../assets/images/logo.svg";
import useNavbar from "./hooks/useNavbar";
import "./Navbar.css";
import FileTitle from "./FileTitle";

type Props = {
  fileTitle: string;
  setFileTitle: React.Dispatch<SetStateAction<string>>;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
  showSidebar: boolean;
  setShowDeleteWarning: React.Dispatch<SetStateAction<boolean>>;
};

const Navbar = ({
  fileTitle,
  setFileTitle,
  setShowSidebar,
  showSidebar,
  setShowDeleteWarning,
}: Props) => {
  const { handleDelete } = useNavbar({ setShowDeleteWarning });
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
        <button className="delete-btn" onClick={handleDelete}>
          <img src={TrashLogo} alt="Trash" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
